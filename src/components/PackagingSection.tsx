import React from 'react';
import { TOTAL_DECK_CARDS, TOTAL_DECK_POINTS } from '../data/cards';
import Box3D from './Box3D';
import styles from './PackagingSection.module.css';

interface CardTypeBadge {
  name: string;
  count: number;
  color: string;
}

const CARD_TYPES: CardTypeBadge[] = [
  { name: 'Expose', count: 10, color: 'var(--card-expose)' },
  { name: 'Create', count: 15, color: 'var(--card-create)' },
  { name: 'Battle', count: 15, color: 'var(--card-battle)' },
  { name: 'Chaos', count: 15, color: 'var(--card-chaos)' },
  { name: 'Connect', count: 15, color: 'var(--card-connect)' },
  { name: 'Love', count: 10, color: 'var(--card-love)' },
];

const PACKAGE_ITEMS = [
  {
    index: '01',
    title: `${TOTAL_DECK_CARDS} Playing Cards`,
    tag: `${TOTAL_DECK_POINTS} TOTAL POINTS`,
    desc: `The complete ${TOTAL_DECK_CARDS}-card prototype deck with ${TOTAL_DECK_POINTS} points across all 6 card types, made for laughs, genuine connection, and friendly competition.`,
    isDeck: true,
  },
  {
    index: '02',
    title: 'Simple Card Box for Prototype',
    tag: 'EASY TO CARRY',
    desc: 'A simple custom box to keep your cards safe. Take it anywhere: road trips, parties, get-togethers, or casual hangouts.',
    highlight: 'Pocket-sized and durable',
  },
  {
    index: '03',
    title: 'Simple Rule Sheet',
    tag: 'HOW TO PLAY',
    desc: 'A quick guide showing how to take turns, how to score points, and our easy rule: pass any card if you want to.',
    highlight: 'Learn in 1 minute',
  },
  {
    index: '04',
    title: 'Quick Helper Card',
    tag: 'FAST HELP',
    desc: 'Put this next to the card deck while playing so everyone knows what each card type means without stopping the game.',
    highlight: 'Quick guide for all players',
  },
];

const PackagingSection: React.FC = () => {
  return (
    <section id="packaging" className={styles.section}>
      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <div className={`${styles.header} reveal-item`}>
          <span className={styles.label}>WHAT'S IN THE BOX</span>
          <h2 className={styles.title}>
            WHAT YOU GET <span className={styles.highlight}>INSIDE</span>
          </h2>
          <p className={styles.subtext}>
            Everything inside your card box so you can start playing right away with friends and family.
          </p>
        </div>

        {/* Main Grid: 3D Box Showcase on Left, 2x2 Bento Inventory on Right */}
        <div className={styles.showcaseGrid}>
          {/* Left Column: 3D Tuck Box Display */}
          <div className={styles.boxColumn}>
            <div className={`${styles.boxCardContainer} reveal-item`} data-parallax="true">
              <div className={styles.boxTopBar}>
                <div className={styles.editionPill}>
                  <span>PROTOTYPE EDITION</span>
                </div>
                <span className={styles.boxTypeTag}>PROTOTYPE CARD BOX</span>
              </div>

              <div className={styles.boxImageStage}>
                <Box3D />
              </div>

              {/* Integrated Clean Box Specs Strip */}
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>{TOTAL_DECK_CARDS}</span>
                  <span className={styles.specLabel}>Cards</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>{TOTAL_DECK_POINTS}</span>
                  <span className={styles.specLabel}>Points</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>3–8</span>
                  <span className={styles.specLabel}>Players</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>15–45</span>
                  <span className={styles.specLabel}>Minutes</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>13+</span>
                  <span className={styles.specLabel}>Ages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: "What's Included in the Package" - 2x2 Bento Grid */}
          <div className={styles.inventoryColumn}>
            <div className={`${styles.inventoryHeader} reveal-item`}>
              <div>
                <span className={styles.inventorySub}>INSIDE THE BOX</span>
                <h3 className={styles.inventoryTitle}>WHAT YOU GET IN THE BOX</h3>
              </div>
              <span className={styles.inventoryBadge}>PROTOTYPE EDITION</span>
            </div>

            {/* 2x2 Bento Grid */}
            <div className={`${styles.inventoryGrid} reveal-group`}>
              {PACKAGE_ITEMS.map((item, idx) => (
                <div
                  key={item.index}
                  className={`${styles.inventoryCard} reveal-card card-hover-lift`}
                  style={{ '--reveal-delay': idx } as React.CSSProperties}
                >
                  <div>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIndex}>{item.index}</span>
                      <span className={styles.cardTag}>{item.tag}</span>
                    </div>

                    <h4 className={styles.itemName}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>

                  {item.isDeck ? (
                    <div className={styles.cardTypePills}>
                      {CARD_TYPES.map((cat) => (
                        <span key={cat.name} className={styles.cardTypePill}>
                          <span className={styles.cardTypeName}>{cat.name}</span>
                          <span className={styles.cardTypeCount}>{cat.count}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.cardFooterHighlight}>
                      <span>{item.highlight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prototype CTA Bar linking directly to Facebook */}
        <div className={`${styles.prototypeCtaBar} reveal-item`}>
          <div className={styles.prototypeCtaText}>
            <div className={styles.ctaBadge}>LIMITED FREE PROTOTYPE DECKS</div>
            <h4>Want to play the 80-card prototype with your friends?</h4>
            <p>Limited physical prototype copies are available for playtesting! Message Aaron Paul on Facebook to claim your deck while supplies last.</p>
          </div>
          <a
            href="https://www.facebook.com/aaronpaulcabagnan12"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.claimDeckBtn}
          >
            MESSAGE ON FACEBOOK TO GET PROTOTYPE DECK →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PackagingSection;
