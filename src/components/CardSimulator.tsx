import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CURATED_SAMPLE_CARDS,
  CARD_TYPES_INFO,
  TOTAL_SAMPLE_CARDS,
  TOTAL_DECK_CARDS,
  TOTAL_DECK_POINTS,
} from '../data/cards';
import { CardView } from './CardView';
import { playSound } from '../utils/audio';
import type { CardType, GameCard } from '../types';
import styles from './CardSimulator.module.css';

interface CardSimulatorProps {
  soundEnabled?: boolean;
}

export const CardSimulator: React.FC<CardSimulatorProps> = ({ soundEnabled = true }) => {
  const [deck, setDeck] = useState<GameCard[]>(CURATED_SAMPLE_CARDS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedCardType, setselectedCardType] = useState<string>('ALL');
  const [scorePilePoints, setScorePilePoints] = useState<number>(0);
  const [scorePileCount, setScorePileCount] = useState<number>(0);
  const [discardCount, setDiscardCount] = useState<number>(0);

  const activeCards =
    selectedCardType === 'ALL'
      ? deck
      : deck.filter((c) => c.cardType === selectedCardType);

  const currentCard = activeCards[currentIndex % (activeCards.length || 1)] || CURATED_SAMPLE_CARDS[0];

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
      colors: ['#5170FF', '#768eff', '#fde047', '#ffffff'],
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
    const shuffled = [...CURATED_SAMPLE_CARDS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleCardTypeFilter = (catKey: string) => {
    if (soundEnabled) playSound('click');
    setselectedCardType(catKey);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentTypeInfo =
    CARD_TYPES_INFO[currentCard.cardType as CardType] || CARD_TYPES_INFO.CONNECT;

  return (
    <section className={styles.simulatorSection} id="simulator">
      <div className={`container ${styles.simContainer}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>3 SAMPLE CARDS PER CARD TYPE · {TOTAL_SAMPLE_CARDS} ONLINE</div>
          <h2 className={styles.sectionTitle}>
            TEST SAMPLE CARDS. <span className={styles.titleHighlight}>HAVE FUN.</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Experience how the game feels! Draw from 18 sample cards across all 6 card types. The complete 80-card prototype deck contains {TOTAL_DECK_CARDS} cards and {TOTAL_DECK_POINTS} points.
          </p>
        </div>

        {/* Creator Improvement Notice Banner */}
        <div className={styles.improvingCallout}>
          <div className={styles.improvingLeft}>
            <span className={styles.improvingBadge}>HELP US IMPROVE THE CARDS</span>
            <p className={styles.improvingText}>
              <strong>I’m actively improving the challenges!</strong> If a card feels boring, awkward, confusing, or just isn't fun, tell me. Your feedback helps me improve the next version.
            </p>
          </div>
          <a
            href="#feedback"
            className={styles.improvingBtn}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>GIVE A SUGGESTION</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Card Type Filter Bar */}
        <div className={styles.cardTypeFilters}>
          <button
            onClick={() => handleCardTypeFilter('ALL')}
            className={`${styles.filterPill} ${selectedCardType === 'ALL' ? styles.filterPillActive : ''}`}
          >
            ALL SAMPLES ({TOTAL_SAMPLE_CARDS})
          </button>
          {(Object.keys(CARD_TYPES_INFO) as CardType[]).map((catKey) => {
            const info = CARD_TYPES_INFO[catKey];
            const isSelected = selectedCardType === catKey;
            return (
              <button
                key={catKey}
                onClick={() => handleCardTypeFilter(catKey)}
                className={`${styles.filterPill} ${isSelected ? styles.filterPillActive : ''}`}
                style={isSelected ? { backgroundColor: info.color, borderColor: info.color, color: '#ffffff' } : undefined}
              >
                <span>{catKey} ({info.sampleCount})</span>
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
              <span className={styles.ruleLabel}>CARD TYPE RULE</span>
              <div>
                <p>{currentTypeInfo.rule}</p>
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

            {/* Quick Challenge Feedback Prompt */}
            <div className={styles.challengeFeedbackPrompt}>
              <span className={styles.promptHint}>Think this challenge is bad, awkward, or too easy?</span>
              <a
                href="#feedback"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(
                    new CustomEvent('mysi_suggest_challenge', {
                      detail: { CardType: currentCard.cardType },
                    })
                  );
                }}
                className={styles.promptLink}
              >
                Give a suggestion →
              </a>
            </div>
          </div>

          {/* Right Column: Card Insight & Card Type Info */}
          <div className={styles.insightCard}>
            <div className={styles.cardTypeBadge} style={{ backgroundColor: currentTypeInfo.color }}>
              {currentCard.cardType}
            </div>

            <h4 className={styles.cardTypeTitle}>{currentTypeInfo.name}</h4>
            <p className={styles.cardTypeTagline}>{currentTypeInfo.tagline}</p>

            <div className={styles.specsList}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>CARD VALUE</span>
                <span className={styles.specVal}>★ {currentCard.points} {currentCard.points === 1 ? 'Point' : 'Points'}</span>
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
                ONLINE SAMPLER (21 CARDS)
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                Testing 3 sample cards PER CARD TYPE. The 80-card prototype deck contains all {TOTAL_DECK_CARDS} cards & {TOTAL_DECK_POINTS} points!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSimulator;
