import React, { useState } from 'react';
import {
  CURATED_SAMPLE_CARDS,
  CARD_TYPES_INFO,
  TOTAL_DECK_CARDS,
  TOTAL_DECK_POINTS,
} from '../data/cards';
import { CardView } from './CardView';
import { playSound } from '../utils/audio';
import type { CardType, GameCard } from '../types';
import styles from './CardGallery.module.css';

interface CardGalleryProps {
  soundEnabled?: boolean;
}

export const CardGallery: React.FC<CardGalleryProps> = ({ soundEnabled = true }) => {
  const [activeCardType, setActiveCardType] = useState<CardType>('GUESS');
  const [pointFilter, setPointFilter] = useState<'ALL' | 1 | 2 | 3>('ALL');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [zoomModalCard, setZoomModalCard] = useState<GameCard | null>(null);

  const handleCardFlip = (cardId: string) => {
    if (soundEnabled) playSound('flip');
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const filteredCards = CURATED_SAMPLE_CARDS.filter((c) => {
    const matchesCat = c.cardType === activeCardType;
    const matchesPoint = pointFilter === 'ALL' || c.points === pointFilter;
    return matchesCat && matchesPoint;
  });

  const activeCard: GameCard | null =
    filteredCards.find((c) => c.id === selectedCardId) || filteredCards[0] || null;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomModalCard(null);
      }
    };
    if (zoomModalCard) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [zoomModalCard]);

  const currentCardTypeInfo = CARD_TYPES_INFO[activeCardType];

  const handleTabChange = (cat: CardType) => {
    if (soundEnabled) playSound('draw');
    setActiveCardType(cat);
    setSelectedCardId(null);
  };

  const handlePointChange = (p: 'ALL' | 1 | 2 | 3) => {
    if (soundEnabled) playSound('click');
    setPointFilter(p);
    setSelectedCardId(null);
  };

  return (
    <section className={styles.gallerySection} id="gallery">
      <div className={`container ${styles.galleryContainer}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>3 SAMPLE CARDS PER CARD TYPE</div>
          <h2 className={styles.sectionTitle}>
            SAMPLE <span className={styles.titleHighlight}>CARDS</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Previewing 3 SAMPLE CARDS PER CARD TYPE. The complete {TOTAL_DECK_CARDS}-card prototype deck contains {TOTAL_DECK_POINTS} points, funny challenges, and plenty of opportunities for laughs. Click any card to flip it!
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

        {/* Card Type Tabs: Exactly 3 cards per card type */}
        <div className={styles.tabNav}>
          {(Object.keys(CARD_TYPES_INFO) as CardType[]).map((catKey) => {
            const info = CARD_TYPES_INFO[catKey];
            const isActive = activeCardType === catKey;

            return (
              <button
                key={catKey}
                onClick={() => handleTabChange(catKey)}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                style={
                  isActive
                    ? {
                        backgroundColor: info.color,
                        borderColor: info.color,
                        color: '#ffffff',
                        boxShadow: `0 4px 14px ${info.color}55`,
                      }
                    : undefined
                }
              >
                <span>{catKey} ({info.sampleCount})</span>
              </button>
            );
          })}
        </div>

        {/* Active Card Type Banner */}
        <div
          className={styles.manifestoBanner}
          style={{
            borderColor: currentCardTypeInfo.color,
            background: `linear-gradient(135deg, ${currentCardTypeInfo.color}10 0%, #ffffff 100%)`,
          }}
        >
          <div className={styles.bannerLeft}>
            <span
              className={styles.bannerCardTypeTag}
              style={{
                backgroundColor: currentCardTypeInfo.color,
              }}
            >
              {activeCardType} · 3 SAMPLES ({currentCardTypeInfo.count} IN FULL DECK)
            </span>
            <h3 className={styles.bannerTagline}>
              {currentCardTypeInfo.tagline}
            </h3>
            <p className={styles.bannerRule}>
              {currentCardTypeInfo.rule} (Showing 3 preview cards. Full deck has {currentCardTypeInfo.count} cards worth {currentCardTypeInfo.totalPoints} points.)
            </p>
          </div>

          <div className={styles.bannerRight}>
            <span className={styles.countBadge}>
              {filteredCards.length} SAMPLES · {currentCardTypeInfo.count} CARDS ({currentCardTypeInfo.totalPoints} PTS) IN FULL DECK
            </span>
            {/* Points Filter Chips: ALL, 1 POINT, 2 POINTS, 3 POINTS */}
            <div className={styles.filterPills}>
              {(['ALL', 1, 2, 3] as const).map((p) => {
                const label = p === 'ALL' ? 'ALL' : p === 1 ? '1 POINT' : `${p} POINTS`;
                return (
                  <button
                    key={p}
                    onClick={() => handlePointChange(p)}
                    className={`${styles.filterPill} ${pointFilter === p ? styles.filterPillActive : ''}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cards Grid: Clean Pure Card Images (Click image to flip, no badges or colored glow) */}
        {filteredCards.length > 0 ? (
          <>
            <div className={styles.cardsGrid}>
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.cardWrapper} ${activeCard?.id === card.id ? styles.cardWrapperActive : ''}`}
                  onClick={() => {
                    setSelectedCardId(card.id);
                  }}
                >
                  <CardView
                    card={card}
                    isFlipped={!!flippedCards[card.id]}
                    interactive={true}
                    onFlip={() => {
                      setSelectedCardId(card.id);
                      handleCardFlip(card.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyFilterState}>
            <h4 className={styles.emptyFilterTitle}>
              NO {pointFilter === 1 ? '1 POINT' : `${pointFilter} POINTS`} CARDS IN {activeCardType}
            </h4>
            <p className={styles.emptyFilterText}>
              In the 80-card deck, {activeCardType} cards have specific point values. Try selecting another point level or view all {activeCardType} cards!
            </p>
            <button
              onClick={() => handlePointChange('ALL')}
              className={styles.resetFilterBtn}
            >
              Show All {activeCardType} Cards
            </button>
          </div>
        )}

        {/* Physical 80-Card Playtest Banner */}
        <div className={styles.playtestBanner}>
          <div className={styles.playtestText}>
            <span className={styles.playtestTag}>UNLOCK ALL {TOTAL_DECK_CARDS} CARDS & {TOTAL_DECK_POINTS} POINTS</span>
            <h4 className={styles.playtestTitle}>WANT TO PLAY THE FULL PHYSICAL GAME?</h4>
            <p className={styles.playtestDesc}>
              You are viewing 3 sample cards per card type. The 80-card prototype deck features all {TOTAL_DECK_CARDS} cards with {TOTAL_DECK_POINTS} points, custom prototype card box, and complete rulebook. Get your free prototype copy or share your playtest thoughts!
            </p>
            <div className={styles.playtestNoticeFoot}>
              <span className={styles.playtestNoticeTag}>
                PROTOTYPE EDITION
              </span>
              <span className={styles.playtestNoticeLegal}>
                {TOTAL_DECK_CARDS} Cards · {TOTAL_DECK_POINTS} Points · 6 Card Types · 3–8 Players · 20–30 Min
              </span>
            </div>
          </div>
          <div className={styles.playtestActions}>
            <button
              onClick={() => {
                if (soundEnabled) playSound('click');
                document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={styles.playtestPrimaryBtn}
            >
              SHARE PLAYTEST FEEDBACK
            </button>
            <button
              onClick={() => {
                document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={styles.playtestSecondaryBtn}
            >
              HOW IT WORKS
            </button>
          </div>
        </div>
      </div>

      {/* High-Definition Lightbox Zoom Modal for Mobile and Desktop inspection */}
      {zoomModalCard && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setZoomModalCard(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.lightboxModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.lightboxHeader}>
              <div className={styles.lightboxMeta}>
                <span
                  className={styles.lightboxCatBadge}
                  style={{ backgroundColor: zoomModalCard.themeColor }}
                >
                  {zoomModalCard.cardType}
                </span>
                <span className={styles.lightboxPointsBadge}>
                  ★ {zoomModalCard.points} {zoomModalCard.points === 1 ? 'POINT' : 'POINTS'}
                </span>
              </div>
              <button
                onClick={() => setZoomModalCard(null)}
                className={styles.lightboxCloseBtn}
                aria-label="Close zoomed view"
              >
                ✕
              </button>
            </div>

            <div className={styles.lightboxCardStage}>
              <CardView
                card={zoomModalCard}
                isFlipped={!!flippedCards[zoomModalCard.id]}
                interactive={true}
                onFlip={() => handleCardFlip(zoomModalCard.id)}
              />
            </div>

            <p className={styles.lightboxTapHint}>
              Tap card to flip between front and back
            </p>

            <div className={styles.lightboxChallengeBox}>
              <span className={styles.lightboxChallengeLabel}>CHALLENGE</span>
              <p className={styles.lightboxChallengeText}>
                {zoomModalCard.challenge}
              </p>
            </div>

            <div className={styles.lightboxNavRow}>
              <button
                onClick={() => {
                  const idx = filteredCards.findIndex((c) => c.id === zoomModalCard.id);
                  if (idx > 0) {
                    setZoomModalCard(filteredCards[idx - 1]);
                    setSelectedCardId(filteredCards[idx - 1].id);
                    if (soundEnabled) playSound('draw');
                  }
                }}
                disabled={filteredCards.findIndex((c) => c.id === zoomModalCard.id) <= 0}
                className={styles.lightboxNavBtn}
              >
                ‹ Prev Card
              </button>
              <button
                onClick={() => {
                  const idx = filteredCards.findIndex((c) => c.id === zoomModalCard.id);
                  if (idx < filteredCards.length - 1) {
                    setZoomModalCard(filteredCards[idx + 1]);
                    setSelectedCardId(filteredCards[idx + 1].id);
                    if (soundEnabled) playSound('draw');
                  }
                }}
                disabled={
                  filteredCards.findIndex((c) => c.id === zoomModalCard.id) >=
                  filteredCards.length - 1
                }
                className={styles.lightboxNavBtn}
              >
                Next Card ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CardGallery;

