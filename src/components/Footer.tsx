import React, { useState } from 'react';
import { playSound } from '../utils/audio';
import styles from './Footer.module.css';

interface FooterProps {
  soundEnabled?: boolean;
}

const FAQ_ITEMS = [
  {
    q: 'HOW MANY PLAYERS CAN PLAY MADE YOU SAY IT?',
    a: 'The game works for 2 to 8 players. It is great for game nights, hangouts, road trips, and any time friends get together!'
  },
  {
    q: 'IS IT SUITABLE FOR TEENAGERS AND FAMILIES?',
    a: 'Yes! The game is for ages 13 and up. All the cards are fun and friendly. Our Golden Rule lets you skip any card at any time - no pressure, no uncomfortable moments.'
  },
  {
    q: 'WHERE CAN I FIND THE COMPLETE GAME RULES?',
    a: 'The full rules are included inside the physical card box! This website gives you the quick 6-step rules so you can see how easy the game is to play.'
  },
  {
    q: 'WHAT ARE THE 7 TYPES OF CARDS IN THE GAME?',
    a: '75 cards across 7 fun types: GUESS (read the room), CREATE (be silly and creative), BATTLE (1-on-1 challenges), CHAOS (wild surprise twists), TOGETHER (everyone plays at once), CONNECT (real honest stories), and LOVE (kind words and warm moments).'
  },
  {
    q: 'IS THIS WEBSITE A GAME YOU PLAY ONLINE?',
    a: 'No! This website is a visual showcase and preview for our physical card game. You can explore sample cards, see how the game works, and message the creator to get a free physical deck to play with your friends in real life!'
  },
  {
    q: 'HOW DO I GET A FREE CARD DECK?',
    a: 'Message Aaron Paul directly on Facebook! The cards are free for people who want to test the game. Try it with your friends and share your honest thoughts to help make the game even better.'
  }
];

const Footer: React.FC<FooterProps> = ({ soundEnabled = false }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const toggleFaq = (idx: number) => {
    if (soundEnabled) playSound('click');
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (soundEnabled) playSound('score');
    }
  };

  return (
    <footer id="faq" className={styles.footer}>
      {/* FAQ Section */}
      <div className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <span className={styles.faqLabel}>QUESTIONS &amp; ANSWERS</span>
            <h3 className={styles.faqTitle}>COMMON QUESTIONS</h3>
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemActive : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className={styles.faqQuestion}>
                  <span className={styles.faqQText}>{item.q}</span>
                  <span className={styles.faqIcon}>{openFaq === idx ? '-' : '+'}</span>
                </div>
                {openFaq === idx && <p className={styles.faqAnswer}>{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Banner (No Price / No Buying) */}
      <div className={styles.bannerSection}>
        <div className={styles.container}>
          <div className={styles.bannerBox}>
            <div className={styles.bannerTextCol}>
              <span className={styles.bannerTag}>FREE CARDS | TRY IT WITH YOUR FRIENDS</span>
              <h2 className={styles.bannerTitle}>WANT TO TRY THE GAME?</h2>
              <p className={styles.bannerDesc}>
                Gather your friends and have fun together. Message Aaron Paul on Facebook to get a free card deck!
              </p>
            </div>
            <div className={styles.bannerActionCol}>
              <a
                href="https://www.facebook.com/aaronpaulcabagnan12"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bannerBtn}
              >
                MESSAGE ON FACEBOOK TO GET DECK →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Brand column */}
            <div className={styles.brandCol}>
              <div className={styles.brandTitleRow}>
                <img
                  src="/brand/logo.png"
                  alt="MADE YOU SAY IT official logo"
                  className={styles.footerLogoImg}
                />
                <h2 className={styles.brandLogo}>MADE YOU SAY IT</h2>
              </div>
              <p className={styles.brandTagline}>THE PARTY GAME THAT MAKES YOU SAY IT.</p>
              <p className={styles.brandMission}>
                A fun and easy card game for friends who want to laugh, connect, and make memories together.
              </p>
            </div>

            {/* Quick links */}
            <div className={styles.linksCol}>
              <span className={styles.colTitle}>QUICK LINKS</span>
              <ul className={styles.linkList}>
                <li><a href="https://www.facebook.com/aaronpaulcabagnan12" target="_blank" rel="noopener noreferrer">Message Aaron on Facebook</a></li>
                <li><a href="#gallery">Sample Cards by Type</a></li>
                <li><a href="#rules">6 Easy Rules</a></li>
                <li><a href="#story">Why I Created This Game</a></li>
                <li><a href="#feedback">Get Free Deck &amp; Feedback</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className={styles.newsletterCol}>
              <span className={styles.colTitle}>STAY UPDATED</span>
              <p className={styles.newsletterDesc}>
                Get updates when new card packs come out and hear about new games first.
              </p>

              {subscribed ? (
                <div className={styles.subscribedMsg}>
                  YOU ARE ON THE LIST! THANK YOU.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="ENTER YOUR EMAIL"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterSubmit}>
                    JOIN
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <div style={{ width: '100%', marginBottom: '12px', padding: '12px 16px', background: '#f8f9fe', borderRadius: '10px', border: '1px solid var(--border-medium)', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-blue)', display: 'block', marginBottom: '3px', letterSpacing: '0.04em' }}>
                PROTOTYPE - FOR TESTING ONLY
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Please do not copy or share the card designs without asking first.
              </span>
            </div>
            <div className={styles.legalLinks}>
              <span>3–8 PLAYERS</span>
              <span>|</span>
              <span>AGES 13+</span>
              <span>|</span>
              <span>20–30 MIN</span>
              <span>|</span>
              <span>PROTOTYPE TEST EDITION</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
