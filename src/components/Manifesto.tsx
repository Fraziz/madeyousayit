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
            I created <strong>MADE YOU SAY IT</strong> because I wanted to make a game that helps friends spend more time together, laugh, and have fun without being on their phones all the time.
          </p>
          <p className={styles.bodyText}>
            I noticed that some games can be too complicated, too competitive, or focused too much on winning. I wanted to create something simple and easy to play—something where everyone can join, try different challenges, answer questions, be creative, and make funny moments together.
          </p>
          <p className={styles.bodyText}>
            <strong>MADE YOU SAY IT</strong> is still a prototype, so I’m still testing and improving it. I’m giving out free physical decks to people who are willing to play it with their friends.
          </p>
          <p className={styles.bodyText}>
            Play it, enjoy it, and give me your honest feedback. Your feedback will help me improve the game and make it better.
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
              No boring questions. The cards give you funny challenges, playful battles, and jokes your friends will talk about for a long time.
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
              <h3 className={styles.pillarTitle}>WIN TOGETHER</h3>
            </div>
            <p className={styles.pillarDesc}>
              You can play against each other, or work together to earn points for the whole group in team challenges.
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
              MESSAGE ME ON FACEBOOK FOR A FREE DECK →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
