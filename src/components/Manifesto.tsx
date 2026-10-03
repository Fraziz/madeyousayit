import React from 'react';
import styles from './Manifesto.module.css';

const Manifesto: React.FC = () => {
  return (
    <section className={styles.section} id="story">
      <div className={`container ${styles.container}`}>
        <div className={styles.labelWrapper}>
          <span className={styles.label}>CREATOR'S MISSION</span>
          <span className={styles.year}>1ST EDITION PROTOTYPE</span>
        </div>

        <div className={styles.statement}>
          <h2 className={styles.largeText}>
            WHY I CREATED THIS GAME
          </h2>
          <blockquote className={styles.italicHighlight}>
            "Sometimes the best memories happen when we simply spend time together, have fun, and enjoy the moment."
          </blockquote>
          <p className={styles.bodyText}>
            I created <strong>MADE YOU SAY IT</strong> after seeing my friend enjoy creating and playing card games filled with challenges and funny moments. It inspired me to create my own game.
          </p>
          <p className={styles.bodyText}>
            I’m also an introvert, and sometimes I don’t know how to start conversations or interact with others. I wanted to create something that could make it easier for friends to <strong>talk, laugh, play, and enjoy the moment together.</strong>
          </p>
          <p className={styles.bodyText}>
            <strong>MADE YOU SAY IT</strong> is still a prototype, and I’m continuously testing and improving it. That’s why I’m sharing it with people who are willing to play, have fun, and give honest feedback.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarHeader}>
              <span className={styles.pillarIndex}>01</span>
              <h3 className={styles.pillarTitle}>REAL LAUGHS</h3>
            </div>
            <p className={styles.pillarDesc}>
              Cards made to get people talking, trying funny challenges, and sharing genuine laughs together.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarHeader}>
              <span className={styles.pillarIndex}>02</span>
              <h3 className={styles.pillarTitle}>NO PRESSURE</h3>
            </div>
            <p className={styles.pillarDesc}>
              Anyone can pass on any card at any time. No penalties, no explanations needed. Just have fun and be comfortable.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarHeader}>
              <span className={styles.pillarIndex}>03</span>
              <h3 className={styles.pillarTitle}>MAKE A MEMORY</h3>
            </div>
            <p className={styles.pillarDesc}>
              Compete to stack points in your Score Pile or just play casually for laughs. Win or lose, everyone walks away with great memories.
            </p>
          </div>
        </div>

        <div className={styles.footerQuote}>
          <p className={styles.bigTagline}>PLAY A CARD. MAKE A MEMORY.</p>
          <div className={styles.manifestoAction}>
            <a
              href="https://www.facebook.com/aaronpaulcabagnan12"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.joinBtn}
            >
              MESSAGE ME ON FACEBOOK TO PLAYTEST →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
