import React, { useState, useEffect } from 'react';
import type { GameCard } from '../types';
import { CARD_TYPES_INFO } from '../data/cards';
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
  const cardTypeFallback = CARD_TYPES_INFO[card.cardType]?.officialCardImage || '/cards/EXPOSE 1point.png';
  const initialImage = card.imageUrl || cardTypeFallback;
  const [currentImg, setCurrentImg] = useState<string>(initialImage);

  useEffect(() => {
    setCurrentImg(card.imageUrl || cardTypeFallback);
  }, [card.imageUrl, cardTypeFallback]);

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
      aria-label={`Card: ${card.cardType} - ${card.challenge || 'Sample Card'}`}
    >
      <div className={styles.cardInner}>
        {/* CARD FRONT — Pure High Quality Authentic Card Image */}
        <div className={styles.cardFrontImageWrapper}>
          <img
            src={currentImg}
            alt={card.challenge || `Card ${card.cardType}`}
            className={styles.cardFrontImage}
            loading="lazy"
            onError={() => {
              if (currentImg !== cardTypeFallback) {
                setCurrentImg(cardTypeFallback);
              }
            }}
          />
        </div>

        {/* CARD BACK — Authentic Official Signature Back Design */}
        <div className={styles.cardBack}>
          <img
            src="/cards/back design.png"
            alt="MADE YOU SAY IT official card back"
            className={styles.cardBackImage}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default CardView;

