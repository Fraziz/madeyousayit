import React, { useState } from 'react';
import { OFFICIAL_DECK, CARD_CATEGORIES_INFO } from '../data/cards';
import { CardView } from './CardView';
import { playSound } from '../utils/audio';
import type { CardCategory } from '../types';
import styles from './CardGallery.module.css';

interface CardGalleryProps {
  soundEnabled?: boolean;
}

type FilterCategory = 'ALL' | CardCategory;

export const CardGallery: React.FC<CardGalleryProps> = ({ soundEnabled = true }) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('CONNECT');
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'EASY' | 'FUN' | 'WILD'>('ALL');

  const filteredCards = OFFICIAL_DECK.filter((c) => {
    const matchesCat = activeCategory === 'ALL' || c.category === activeCategory;
    const matchesDiff = difficultyFilter === 'ALL' || c.difficulty === difficultyFilter;
    return matchesCat && matchesDiff;
  });

  const currentCategoryInfo = activeCategory !== 'ALL' ? CARD_CATEGORIES_INFO[activeCategory] : null;

  const handleTabChange = (cat: FilterCategory) => {
    if (soundEnabled) playSound('draw');
    setActiveCategory(cat);
  };

  const handleDifficultyChange = (diff: 'ALL' | 'EASY' | 'FUN' | 'WILD') => {
    if (soundEnabled) playSound('click');
    setDifficultyFilter(diff);
  };

  return (
    <section className={styles.gallerySection} id="gallery">
      <div className={`container ${styles.galleryContainer}`}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>SEE THE 7 CARD TYPES</div>
          <h2 className={styles.sectionTitle}>
            SAMPLE <span className={styles.titleHighlight}>CARDS</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Here are sample cards from all 7 types: GUESS, CREATE, BATTLE, CHAOS, TOGETHER, CONNECT, and LOVE. Click any card to see both sides!
          </p>
        </div>

        {/* Category Tabs: Includes ALL (14) + 7 Individual Types */}
        <div className={styles.tabNav}>
          <button
            onClick={() => handleTabChange('ALL')}
            className={`${styles.tabBtn} ${activeCategory === 'ALL' ? styles.tabBtnActive : ''}`}
            style={activeCategory === 'ALL' ? { borderBottomColor: 'var(--brand-blue)' } : undefined}
          >
            <span className={styles.tabDot} style={{ backgroundColor: 'var(--brand-blue)' }} />
            <span>ALL CARDS ({OFFICIAL_DECK.length})</span>
          </button>

          {(Object.keys(CARD_CATEGORIES_INFO) as CardCategory[]).map((catKey) => {
            const info = CARD_CATEGORIES_INFO[catKey];
            const isActive = activeCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => handleTabChange(catKey)}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                style={isActive ? { borderBottomColor: info.color } : undefined}
              >
                <span className={styles.tabDot} style={{ backgroundColor: info.color }} />
                <span>{catKey} ({info.count})</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Manifesto Banner */}
        <div
          className={styles.manifestoBanner}
          style={{
            borderColor: currentCategoryInfo ? currentCategoryInfo.color : 'var(--brand-blue)',
            background: currentCategoryInfo
              ? `linear-gradient(135deg, ${currentCategoryInfo.color}15 0%, #ffffff 100%)`
              : 'linear-gradient(135deg, rgba(81, 112, 255, 0.08) 0%, #ffffff 100%)',
          }}
        >
          <div className={styles.bannerLeft}>
            <span
              className={styles.bannerCategoryTag}
              style={{
                backgroundColor: currentCategoryInfo ? currentCategoryInfo.color : 'var(--brand-blue)',
              }}
            >
              {activeCategory === 'ALL' ? 'ALL CARDS' : activeCategory} | {activeCategory === 'ALL' ? OFFICIAL_DECK.length : currentCategoryInfo?.count} CARDS
            </span>
            <h3 className={styles.bannerTagline}>
              {currentCategoryInfo ? currentCategoryInfo.tagline : 'DIFFERENT CARDS FOR DIFFERENT KINDS OF FUN.'}
            </h3>
            <p className={styles.bannerRule}>
              {currentCategoryInfo
                ? currentCategoryInfo.rule
                : 'Includes GUESS, CREATE, BATTLE, CHAOS, TOGETHER, CONNECT, and LOVE cards. Take turns and see what each type feels like!'}
            </p>
          </div>

          <div className={styles.bannerRight}>
            <span className={styles.countBadge}>
              SHOWING {filteredCards.length} OF {activeCategory === 'ALL' ? OFFICIAL_DECK.length : currentCategoryInfo?.count} CARDS
            </span>
            {/* Difficulty Filter Chips */}
            <div className={styles.filterPills}>
              {(['ALL', 'EASY', 'FUN', 'WILD'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDifficultyChange(d)}
                  className={`${styles.filterPill} ${difficultyFilter === d ? styles.filterPillActive : ''}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid: Displays Curated Sample Cards Only */}
        <div className={styles.cardsGrid}>
          {filteredCards.map((card) => (
            <div key={card.id} className={styles.cardWrapper}>
              <CardView
                card={card}
                interactive={true}
                onFlip={() => {
                  if (soundEnabled) playSound('flip');
                }}
              />
            </div>
          ))}
        </div>

        {/* Coming Soon Teaser Banner */}
        <div className={styles.playtestBanner}>
          <div className={styles.playtestText}>
            <span className={styles.playtestTag}>FULL DECK COMING SOON</span>
            <h4 className={styles.playtestTitle}>THE FULL 75-CARD DECK IS STILL BEING MADE.</h4>
            <p className={styles.playtestDesc}>
              Right now I am testing with a small set of sample cards. Try these with your friends and let me know what you think - your feedback helps make the final game better!
            </p>
            <div className={styles.playtestNoticeFoot}>
              <span className={styles.playtestNoticeTag}>
                PROTOTYPE — FOR PLAYTESTING ONLY
              </span>
              <span className={styles.playtestNoticeLegal}>
                Please do not reproduce, distribute, or publish the cards without permission.
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
    </section>
  );
};

export default CardGallery;

