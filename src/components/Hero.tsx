import React, { useState } from 'react';
import { TOTAL_DECK_POINTS, TOTAL_DECK_CARDS } from '../data/cards';
import { sound } from '../utils/audio';
import styles from './Hero.module.css';

interface HeroProps {
  onOpenRules?: () => void;
  onOpenGallery?: () => void;
  onOpenPackaging?: () => void;
}

interface ShowcaseCard {
  id: string;
  name: string;
  color: string;
  src: string;
  angle: number;
  x: number;
  y: number;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  { id: 'guess', name: 'GUESS', color: '#5170FF', src: '/cards/guess  1point hero.png', angle: -20, x: -100, y: 18 },
  { id: 'battle', name: 'BATTLE', color: '#5170FF', src: '/cards/battle 2 points hero.png', angle: -12, x: -60, y: 7 },
  { id: 'create', name: 'CREATE', color: '#5170FF', src: '/cards/create 1 point hero.png', angle: -4, x: -20, y: 1 },
  { id: 'chaos', name: 'CHAOS', color: '#5170FF', src: '/cards/chaos 2 point hero.png', angle: 4, x: 20, y: 1 },
  { id: 'connect', name: 'CONNECT', color: '#5170FF', src: '/cards/connect 3 point hero.png', angle: 12, x: 60, y: 7 },
  { id: 'love', name: 'LOVE', color: '#5170FF', src: '/cards/love 2  point hero.png', angle: 20, x: 100, y: 18 },
];

export const Hero: React.FC<HeroProps> = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(3);
  // Default: isFlipped is false, meaning all cards display their CARD BACK design!
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const activeCard = SHOWCASE_CARDS[activeCardIndex] || SHOWCASE_CARDS[3];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    // Formal, subtle 3D tilt (max 1.5deg)
    e.currentTarget.style.setProperty('--tilt-x', `${-y * 1.5}deg`);
    e.currentTarget.style.setProperty('--tilt-y', `${x * 1.5}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-x', '0deg');
    e.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  const handleCardClick = (idx: number) => {
    if (activeCardIndex !== idx) {
      // Switching to another card in the fan and flipping it to reveal its front
      setActiveCardIndex(idx);
      setIsFlipped(true);
      sound.playDraw();
    } else {
      // Toggle flip on current card between front and back
      setIsFlipped((prev) => !prev);
      sound.playFlip();
    }
  };

  const handleToggleFlipBtn = () => {
    setIsFlipped((prev) => !prev);
    sound.playFlip();
  };

  const handleScrollToFeedback = () => {
    document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.heroSection} id="hero">
      <div className={styles.backgroundAura} />
      <div className={styles.backgroundGrid} />

      <div className={`container ${styles.heroContainer}`}>
        {/* Left Column: Bold Typographic Statement & Core Information */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            MADE YOU <br className={styles.breakTitle} />
            <span className={styles.titleHighlight}>SAY IT</span>
          </h1>

          <p className={styles.heroTagline}>PLAY A CARD. MAKE A MEMORY.</p>

          <p className={styles.heroDescription}>
            A fun and easy card game for friends who want to laugh, connect, and make memories together.
          </p>

          {/* Spacious Horizontal Game Specs Capsule */}
          <div className={styles.specsRow}>
            <div className={styles.specBadge}>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>PLAYERS</span>
                <span className={styles.specValue}>3–8</span>
              </div>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.specBadge}>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>TIME</span>
                <span className={styles.specValue}>20–30 MIN</span>
              </div>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.specBadge}>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>AGES</span>
                <span className={styles.specValue}>13+</span>
              </div>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.specBadge}>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>DECK</span>
                <span className={styles.specValue}>{TOTAL_DECK_CARDS} CARDS</span>
              </div>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.specBadge}>
              <div className={styles.specMeta}>
                <span className={styles.specLabel}>POINTS</span>
                <span className={styles.specValue}>{TOTAL_DECK_POINTS}</span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className={styles.actionButtonsRow}>
            <button
              onClick={handleScrollToFeedback}
              className={styles.primaryDemoBtn}
            >
              <span>GET A DECK</span>
              <span className={styles.btnArrow}>→</span>
            </button>
            <div className={styles.limitedDeckNote}>
              <span className={styles.limitedBadge}>LIMITED PROTOTYPE</span>
              <span>Free while copies last</span>
            </div>
          </div>

          {/* Playtest Callout */}
          <div className={styles.playtestCallout}>
            <span className={styles.calloutText}>
              Played the game with friends?{' '}
              <button onClick={handleScrollToFeedback} className={styles.calloutLink}>
                Give me your feedback →
              </button>
            </span>
          </div>
        </div>

        {/* Right Column: 3D Interactive Card Fan (Starts all at card back, click to flip) */}
        <div className={styles.heroVisualArea}>
          <div
            className={styles.cardStageWrapper}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Dynamic Card Fan - 7 Cards */}
            <div className={styles.cardFanContainer}>
              {SHOWCASE_CARDS.map((card, idx) => {
                const isSelected = activeCardIndex === idx;
                const isThisFlipped = isSelected && isFlipped;
                const baseZIndex = isSelected ? 40 : 10 + idx;

                return (
                  <div
                    key={card.id}
                    className={`${styles.fannedCardItem} ${isSelected ? styles.fannedCardSelected : ''}`}
                    style={{
                      '--base-x': `${card.x}px`,
                      '--base-y': `${card.y}px`,
                      '--base-angle': `${card.angle}deg`,
                      '--card-z': baseZIndex,
                    } as React.CSSProperties}
                    onClick={() => handleCardClick(idx)}
                    title={`Click to flip ${card.name} card`}
                  >
                    <div className={`${styles.cardInnerFlipper} ${isThisFlipped ? styles.isFlipped : ''}`}>
                      {/* DEFAULT RESTING FACE (0deg): Authentic Card Back */}
                      <div className={styles.cardFaceBackDesign}>
                        <img
                          src="/cards/back design.png"
                          alt="MADE YOU SAY IT official card back"
                          className={styles.cardImage}
                          loading="eager"
                        />
                      </div>

                      {/* FLIPPED FACE (180deg): Clean High-Res Front Challenge */}
                      <div className={styles.cardFaceChallenge}>
                        <img
                          src={card.src}
                          alt={`${card.name} card`}
                          className={styles.cardImage}
                          loading="eager"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Card Action Bar */}
            <div className={styles.cardControlsRow}>
              <button
                className={styles.flipBtn}
                style={{ borderColor: activeCard.color, color: activeCard.color }}
                onClick={handleToggleFlipBtn}
              >
                <span>CLICK A CARD TO FLIP</span>
              </button>

              {/* 7 Card Type Indicator Pills */}
              <div className={styles.cardTypeIndicators}>
                {SHOWCASE_CARDS.map((c, i) => {
                  const isActive = activeCardIndex === i;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCardIndex(i);
                        setIsFlipped(true); // reveals that card type's card front
                        sound.playDraw();
                      }}
                      className={`${styles.catIndicatorDot} ${isActive ? styles.catIndicatorActive : ''}`}
                      style={
                        isActive
                          ? { backgroundColor: c.color, borderColor: c.color, color: '#ffffff' }
                          : { '--cat-color': c.color } as React.CSSProperties
                      }
                      title={`View ${c.name} card type`}
                    >
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
