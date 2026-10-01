import React, { useState } from 'react';
import { playSound } from '../utils/audio';
import styles from './Footer.module.css';

interface FooterProps {
  soundEnabled?: boolean;
}

const FAQ_ITEMS = [
  {
    q: 'HOW MANY PLAYERS CAN PLAY MADE YOU SAY IT?',
    a: 'The game is made for 3 to 8 players. (You deal 3 cards to each player at the start!) It is great for hangouts, road trips, parties, and any time friends get together!'
  },
  {
    q: 'IS IT SUITABLE FOR TEENAGERS AND FAMILIES?',
    a: 'Yes! The game is for ages 13 and up. All the cards are fun and friendly. Our Golden Rule lets you skip any card at any time - no pressure, no uncomfortable moments.'
  },
  {
    q: 'WHERE CAN I FIND THE COMPLETE GAME RULES?',
    a: 'The full rules are included inside the prototype card box! This website also features the complete How to Play guide right above so you can see how easy the game is to learn.'
  },
  {
    q: 'WHAT ARE THE 6 TYPES OF CARDS IN THE GAME?',
    a: '80 cards across 6 fun card types: GUESS (read the room), CREATE (be silly and creative), BATTLE (1-on-1 challenges), CHAOS (wild surprise twists), CONNECT (real honest stories), and LOVE (kind words and warm moments).'
  },
  {
    q: 'IS THIS WEBSITE A GAME YOU PLAY ONLINE?',
    a: 'No! This website is a visual showcase and preview for our physical card game. You can explore sample cards, see how the game works, and message the creator to get a free physical prototype deck to play with your friends in real life!'
  },
  {
    q: 'HOW DO I GET A FREE PROTOTYPE DECK?',
    a: 'Message Aaron Paul directly on Facebook! A limited batch of physical prototype decks are free for people who want to test the game with friends. Try it with your group and share your honest thoughts to help make the next version even better.'
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
              <span className={styles.bannerTag}>LIMITED FREE PROTOTYPE DECKS | WHILE SUPPLIES LAST</span>
              <h2 className={styles.bannerTitle}>WANT TO PLAYTEST THE GAME?</h2>
              <p className={styles.bannerDesc}>
                Gather your friends and have fun together. Physical prototype decks are free for playtesters in limited quantities—message Aaron Paul on Facebook to claim yours!
              </p>
            </div>
            <div className={styles.bannerActionCol}>
              <a
                href="https://www.facebook.com/aaronpaulcabagnan12"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bannerBtn}
              >
                MESSAGE ON FACEBOOK TO GET PROTOTYPE DECK →
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
                  src="/brand/logo.svg"
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
                <li><a href="#rules">How to Play</a></li>
                <li><a href="#story">Why I Created This Game</a></li>
                <li><a href="#feedback">Get a Deck &amp; Feedback</a></li>
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
            <div className={styles.legalLinks}>
              <span>3–8 PLAYERS</span>
              <span>|</span>
              <span>AGES 13+</span>
              <span>|</span>
              <span>20–30 MIN</span>
              <span>|</span>
              <span>80 CARDS</span>
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
