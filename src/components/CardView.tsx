import React from 'react';
import type { GameCard } from '../types';
import styles from './CardView.module.css';

interface CardViewProps {
  card: GameCard;
  isFlipped?: boolean;
  onFlip?: () => void;
  scale?: number;
  interactive?: boolean;
}

export const CardView: React.FC<CardViewProps> = ({
  card,
  isFlipped = false,
  onFlip,
  scale = 1,
  interactive = true,
}) => {
  return (
    <div
      className={`${styles.cardContainer} ${isFlipped ? styles.flipped : ''} ${
        interactive ? styles.interactive : ''
      }`}
      onClick={interactive ? onFlip : undefined}
      style={{ transform: `scale(${scale})` }}
      role={interactive ? 'button' : 'figure'}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onFlip?.();
        }
      }}
      aria-label={`Card: ${card.category} - ${card.challenge || 'Classified'}`}
    >
      <div className={styles.cardInner}>
        {/* CARD FRONT — Pure High Quality Authentic Card Image or Classified Mystery State */}
        {card.imageUrl ? (
          <div className={styles.cardFrontImageWrapper}>
            <img
              src={card.imageUrl}
              alt={card.challenge || `Card ${card.category}`}
              className={styles.cardFrontImage}
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className={styles.cardFrontLocked}
            style={{
              borderColor: card.themeColor,
            }}
          >
            <div className={styles.lockedInner}>
              <div
                className={styles.lockedCategoryTag}
                style={{ backgroundColor: card.themeColor }}
              >
                <span>{card.category}</span>
              </div>

              <div className={styles.lockedIconCircle}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>

              <span className={styles.lockedBadge}>CARD CLASSIFIED</span>

              <div className={styles.redactedBars}>
                <span
                  className={styles.redactedBar}
                  style={{ backgroundColor: card.themeColor, width: '85%' }}
                />
                <span
                  className={styles.redactedBar}
                  style={{ backgroundColor: card.themeColor, width: '65%' }}
                />
                <span
                  className={styles.redactedBar}
                  style={{ backgroundColor: card.themeColor, width: '78%' }}
                />
              </div>

              <p className={styles.lockedSubtext}>
                DRAW TO REVEAL CARD
              </p>

              <div className={styles.lockedFooter}>
                <span className={styles.lockedTag}>75 AUTHENTIC CARDS</span>
              </div>
            </div>
          </div>
        )}

        {/* CARD BACK — Authentic Official Signature Back Design from User */}
        <div className={styles.cardBack}>
          <img
            src="/cards/card-back.png"
            alt="MADE YOU SAY IT official card back design"
            className={styles.cardBackImage}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default CardView;
