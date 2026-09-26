import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { OFFICIAL_DECK, CARD_CATEGORIES_INFO } from '../data/cards';
import { CardView } from './CardView';
import { playSound } from '../utils/audio';
import type { CardCategory, GameCard } from '../types';
import styles from './CardSimulator.module.css';

interface CardSimulatorProps {
  soundEnabled?: boolean;
}

export const CardSimulator: React.FC<CardSimulatorProps> = ({ soundEnabled = true }) => {
  const [deck, setDeck] = useState<GameCard[]>(OFFICIAL_DECK);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [scorePilePoints, setScorePilePoints] = useState<number>(0);
  const [scorePileCount, setScorePileCount] = useState<number>(0);
  const [discardCount, setDiscardCount] = useState<number>(0);

  const activeCards =
    selectedCategory === 'ALL'
      ? deck
      : deck.filter((c) => c.category === selectedCategory);

  const currentCard = activeCards[currentIndex % (activeCards.length || 1)] || OFFICIAL_DECK[0];

  const handleDrawNext = () => {
    if (soundEnabled) playSound('draw');
    setIsFlipped(false);
    if (activeCards.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % activeCards.length);
    }
  };

  const handleCardFlip = () => {
    if (soundEnabled) playSound('flip');
    setIsFlipped(!isFlipped);
  };

  const handleScore = () => {
    if (soundEnabled) playSound('score');
    setScorePilePoints((prev) => prev + currentCard.points);
    setScorePileCount((prev) => prev + 1);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#5170FF', '#fde047', '#006826', '#ff751f', '#ff3131'],
    });

    handleDrawNext();
  };

  const handlePass = () => {
    if (soundEnabled) playSound('pass');
    setDiscardCount((prev) => prev + 1);
    handleDrawNext();
  };

  const handleShuffle = () => {
    if (soundEnabled) playSound('draw');
    const shuffled = [...OFFICIAL_DECK].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleCategoryFilter = (catKey: string) => {
    if (soundEnabled) playSound('click');
    setSelectedCategory(catKey);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentCatInfo =
    CARD_CATEGORIES_INFO[currentCard.category as CardCategory] || CARD_CATEGORIES_INFO.CONNECT;

  return (
    <section className={styles.simulatorSection} id="simulator">
      <div className={`container ${styles.simContainer}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>TRY SAMPLE CARDS ONLINE</div>
          <h2 className={styles.sectionTitle}>
            TEST SAMPLE CARDS. <span className={styles.titleHighlight}>HAVE FUN.</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Want to see how the game feels? Draw cards right here on your phone or computer! Try 14 sample cards across all 7 categories with your friends.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className={styles.categoryFilters}>
          <button
            onClick={() => handleCategoryFilter('ALL')}
            className={`${styles.filterPill} ${selectedCategory === 'ALL' ? styles.filterPillActive : ''}`}
          >
            ALL SAMPLES ({OFFICIAL_DECK.length})
          </button>
          {(Object.keys(CARD_CATEGORIES_INFO) as CardCategory[]).map((catKey) => {
            const info = CARD_CATEGORIES_INFO[catKey];
            const isSelected = selectedCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => handleCategoryFilter(catKey)}
                className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ''}`}
                style={isSelected ? { backgroundColor: info.color, borderColor: info.color, color: '#ffffff' } : undefined}
              >
                <span className={styles.pillDot} style={{ backgroundColor: info.color }} />
                <span>
                  {catKey} ({info.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Simulator Workspace */}
        <div className={styles.workspaceGrid}>
          {/* Left Column: Game Piles & Stats */}
          <div className={styles.pilesCard}>
            <h3 className={styles.pilesHeading}>CURRENT SESSION</h3>

            <div className={styles.pileItem}>
              <div className={styles.pileMeta}>
                <span className={styles.pileName}>DRAW PILE</span>
                <span className={styles.pileCount}>{activeCards.length} Cards</span>
              </div>
              <p className={styles.pileDesc}>Next up to be drawn.</p>
            </div>

            <div className={styles.pileItemActive}>
              <div className={styles.pileMeta}>
                <span className={styles.pileName}>YOUR SCORE PILE</span>
                <span className={styles.scoreHighlight}>+{scorePilePoints} PTS</span>
              </div>
              <p className={styles.pileDesc}>{scorePileCount} completed challenges</p>
            </div>

            <div className={styles.pileItem}>
              <div className={styles.pileMeta}>
                <span className={styles.pileName}>DISCARD PILE</span>
                <span className={styles.pileCount}>{discardCount} Passed</span>
              </div>
              <p className={styles.pileDesc}>Passed or uncompleted cards (0 pts)</p>
            </div>

            <div className={styles.ruleReminderBox}>
              <span className={styles.ruleLabel}>CATEGORY RULE</span>
              <div>
                <p>{currentCatInfo.rule}</p>
              </div>
            </div>
          </div>

          {/* Center Column: The Live 3D Card Display */}
          <div className={styles.cardDisplayArea}>
            <div className={styles.cardInteractiveStage}>
              <CardView
                card={currentCard}
                isFlipped={isFlipped}
                onFlip={handleCardFlip}
                interactive={true}
              />
            </div>

            <p className={styles.flipInstruction}>
              {isFlipped ? 'Click card to view front challenge' : 'Click card to flip to signature back'}
            </p>

            {/* Play/Pass Action Bar */}
            <div className={styles.controlsBar}>
              <button onClick={handlePass} className={styles.passBtn} title="Pass this card (0 points)">
                <span>PASS (0 PT)</span>
              </button>

              <button onClick={handleDrawNext} className={styles.drawBtn} title="Draw next card from deck">
                <span>DRAW NEXT</span>
              </button>

              <button onClick={handleScore} className={styles.scoreBtn} title="Mark as completed & earn points">
                <span>COMPLETE (+{currentCard.points} PT)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Card Insight & Category Info */}
          <div className={styles.insightCard}>
            <div className={styles.categoryBadge} style={{ backgroundColor: currentCatInfo.color }}>
              {currentCard.category}
            </div>

            <h4 className={styles.categoryTitle}>{currentCatInfo.name}</h4>
            <p className={styles.categoryTagline}>{currentCatInfo.tagline}</p>

            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>DIFFICULTY</span>
                <span className={styles.specVal}>{currentCard.difficulty}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>POINTS REWARD</span>
                <span className={styles.specVal}>+{currentCard.points} Points</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>CARD NUMBER</span>
                <span className={styles.specVal}>
                  #{((currentIndex % (activeCards.length || 1)) + 1)} of {activeCards.length}
                </span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>CARD SOURCE</span>
                <span className={styles.specVal}>
                  Sample Prototype Card
                </span>
              </div>
            </div>

            <button onClick={handleShuffle} className={styles.shuffleBtn}>
              <span>SHUFFLE DECK</span>
            </button>

            <div style={{ marginTop: '16px', padding: '10px 12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.04em', marginBottom: '2px' }}>
                PROTOTYPE - FOR PLAYTESTING ONLY
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                Please do not reproduce, distribute, or publish the cards without permission.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSimulator;
