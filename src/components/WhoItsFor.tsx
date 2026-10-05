import React from 'react';
import { scrollToSection } from '../utils/smoothScroll';
import styles from './WhoItsFor.module.css';

interface WhoItsForProps {
  onNavigateToFeedback?: () => void;
}

const NOT_FOR_POINTS = [
  {
    num: '01',
    title: "You'd Rather Stay on Your Phone",
    desc: "If you'd rather scroll social media than talk, laugh, and play with the people around you, this game probably isn't your thing.",
  },
  {
    num: '02',
    title: "You Don't Like Being Silly",
    desc: "You might make animal sounds, do funny impressions, or try goofy mini-challenges. If you're not comfortable laughing at yourself, you might want to skip this one!",
  },
  {
    num: '03',
    title: 'You Want a Deep Strategy Game',
    desc: "There are no complicated rules or long setup steps. Learn it in one minute and start playing. If you want a heavy 3-hour strategy game, this isn't it.",
  },
  {
    num: '04',
    title: "You Don't Want Deep Connection or Questions About You",
    desc: "Many cards ask about your thoughts, feelings, and real stories. If you don't want deep connection or you don't like answering questions about yourself, this game isn't for you.",
  },
];

const FOR_POINTS = [
  {
    num: '01',
    title: 'You Want Real Laughs With Friends',
    desc: "Made for road trips, parties, get-togethers, or whenever you're hanging out and want to create genuinely fun moments together.",
  },
  {
    num: '02',
    title: 'You Like Deep Talks & Meaningful Questions',
    desc: 'If you enjoy deep talks, thoughtful questions, sharing genuine stories, and getting closer to people without pressure, you will love this game.',
  },
  {
    num: '03',
    title: 'You Want Zero Pressure & Easy Fun',
    desc: 'Anyone can jump in immediately. Pass anytime with no penalties, no forced answers, and no awkward stress. Play at your own comfort level.',
  },
  {
    num: '04',
    title: 'You Want to Make Great Memories',
    desc: 'Put the phones down, laugh until your stomach hurts, and create funny inside jokes and memories you will still talk about later.',
  },
];

export const WhoItsFor: React.FC<WhoItsForProps> = ({ onNavigateToFeedback }) => {
  const handleCtaClick = () => {
    if (onNavigateToFeedback) {
      onNavigateToFeedback();
    } else {
      scrollToSection('feedback', -60);
    }
  };

  return (
    <section className={styles.section} id="who-its-for">
      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <div className={`${styles.header} reveal-item`}>
          <span className={styles.tag}>HONEST FIT CHECK</span>
          <h2 className={styles.title}>
            IS THIS GAME <span className={styles.titleHighlight}>FOR YOU?</span>
          </h2>
          <p className={styles.subtitle}>
            A quick, honest check before you claim a prototype deck. See if it fits your group!
          </p>
        </div>

        {/* 2-Column Comparison Cards - Clean & Icon-Free */}
        <div className={`${styles.comparisonGrid} reveal-group`}>
          {/* Column 1: THIS GAME MIGHT NOT BE FOR YOU IF... */}
          <div className={`${styles.columnCard} ${styles.notForCard} reveal-item`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.columnTitle}>
                THIS GAME MIGHT NOT BE FOR YOU IF...
              </h3>
            </div>

            <div className={styles.itemList}>
              {NOT_FOR_POINTS.map((item, idx) => (
                <div
                  key={item.num}
                  className={`${styles.itemRow} reveal-card card-hover-lift`}
                  style={{ '--reveal-delay': idx } as React.CSSProperties}
                >
                  <span className={`${styles.itemNumber} ${styles.notForNumber}`}>
                    {item.num}
                  </span>
                  <div className={styles.itemContent}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: THIS GAME IS FOR YOU IF... */}
          <div className={`${styles.columnCard} ${styles.forCard} reveal-item`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.columnTitle}>
                THIS GAME IS FOR YOU IF...
              </h3>
            </div>

            <div className={styles.itemList}>
              {FOR_POINTS.map((item, idx) => (
                <div
                  key={item.num}
                  className={`${styles.itemRow} reveal-card card-hover-lift`}
                  style={{ '--reveal-delay': idx } as React.CSSProperties}
                >
                  <span className={`${styles.itemNumber} ${styles.forNumber}`}>
                    {item.num}
                  </span>
                  <div className={styles.itemContent}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className={`${styles.bottomCallout} reveal-item`}>
          <div className={styles.calloutTextGroup}>
            <h4 className={styles.calloutHeading}>Sounds like your kind of game?</h4>
            <p className={styles.calloutSub}>
              Limited physical prototype decks are available free for playtesters. Try it with your friends!
            </p>
          </div>
          <button
            onClick={handleCtaClick}
            className={styles.ctaBtn}
          >
            <span>GET A FREE DECK</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
