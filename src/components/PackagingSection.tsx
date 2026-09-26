import React from 'react';
import styles from './PackagingSection.module.css';

interface CategoryBadge {
  name: string;
  count: number;
  color: string;
}

const CATEGORIES: CategoryBadge[] = [
  { name: 'Guess', count: 7, color: 'var(--card-guess)' },
  { name: 'Create', count: 15, color: 'var(--card-create)' },
  { name: 'Battle', count: 15, color: 'var(--card-battle)' },
  { name: 'Chaos', count: 15, color: 'var(--card-chaos)' },
  { name: 'Together', count: 10, color: 'var(--card-together)' },
  { name: 'Connect', count: 8, color: 'var(--card-connect)' },
  { name: 'Love', count: 5, color: 'var(--card-love)' },
];

const PACKAGE_ITEMS = [
  {
    index: '01',
    title: '75 Playing Cards',
    tag: '7 FUN CATEGORIES',
    desc: 'A full deck of 75 challenge cards made for quick laughs, fun talks, and good times with no boring moments.',
    isDeck: true,
  },
  {
    index: '02',
    title: 'Blue Card Box',
    tag: 'EASY TO CARRY',
    desc: 'A strong blue box to keep your cards safe. Take it anywhere: on trips, to parties, or family hangouts.',
    highlight: 'Pocket-sized and durable',
  },
  {
    index: '03',
    title: 'Simple Rule Sheet',
    tag: '6 EASY STEPS',
    desc: 'A quick guide showing how to take turns, how to score points, and our easy rule: pass any card if you want to.',
    highlight: 'Learn in 1 minute',
  },
  {
    index: '04',
    title: 'Quick Helper Card',
    tag: 'FAST HELP',
    desc: 'Put this next to the card deck while playing so everyone knows what each card type means without stopping the game.',
    highlight: 'Quick guide for the table',
  },
];

const PackagingSection: React.FC = () => {
  return (
    <section id="packaging" className={styles.section}>
      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <div className={styles.header}>
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
            <div className={styles.boxCardContainer}>
              <div className={styles.boxTopBar}>
                <div className={styles.editionPill}>
                  <span className={styles.pulseDot} />
                  <span>PROTOTYPE EDITION</span>
                </div>
                <span className={styles.boxTypeTag}>CUSTOM TUCK BOX</span>
              </div>

              <div className={styles.boxImageStage}>
                <div className={styles.boxBackdropGlow} />
                <img
                  src="/brand/box-mockup.png"
                  alt="MADE YOU SAY IT official cobalt card box"
                  className={styles.boxMockupImg}
                />
              </div>

              <div className={styles.boxCaptionPill}>
                <span>PLAY A CARD. MAKE A MEMORY.</span>
              </div>

              {/* Integrated Clean Box Specs Strip */}
              <div className={styles.specsGrid}>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>75</span>
                  <span className={styles.specLabel}>Cards</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>3–8</span>
                  <span className={styles.specLabel}>Players</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specValue}>20–30</span>
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
            <div className={styles.inventoryHeader}>
              <div>
                <span className={styles.inventorySub}>INSIDE THE BOX</span>
                <h3 className={styles.inventoryTitle}>WHAT YOU GET IN THE BOX</h3>
              </div>
              <span className={styles.inventoryBadge}>COMPLETE SET</span>
            </div>

            {/* 2x2 Bento Grid */}
            <div className={styles.inventoryGrid}>
              {PACKAGE_ITEMS.map((item) => (
                <div key={item.index} className={styles.inventoryCard}>
                  <div>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIndex}>{item.index}</span>
                      <span className={styles.cardTag}>{item.tag}</span>
                    </div>

                    <h4 className={styles.itemName}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>

                  {item.isDeck ? (
                    <div className={styles.categoryPills}>
                      {CATEGORIES.map((cat) => (
                        <span key={cat.name} className={styles.categoryPill}>
                          <span
                            className={styles.categoryDot}
                            style={{ backgroundColor: cat.color }}
                          />
                          <span className={styles.categoryName}>{cat.name}</span>
                          <span className={styles.categoryCount}>{cat.count}</span>
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
        <div className={styles.prototypeCtaBar}>
          <div className={styles.prototypeCtaText}>
            <div className={styles.ctaBadge}>FREE CARDS TO TRY</div>
            <h4>Want to play the card game with your friends?</h4>
            <p>Message Aaron Paul on Facebook to get a free deck!</p>
          </div>
          <a
            href="https://www.facebook.com/aaronpaulcabagnan12"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.claimDeckBtn}
          >
            MESSAGE ON FACEBOOK TO GET DECK →
          </a>
        </div>
      </div>
    </section>
  );
};

export default PackagingSection;
