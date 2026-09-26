import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={styles.topAnnouncementBar}>
        <div className={styles.announcementTicker}>
          <span>MADE YOU SAY IT</span>
          <span>FREE CARD DECKS AVAILABLE TO TRY</span>
          <span>75 CARDS · 7 FUN CATEGORIES</span>
          <span>2-8 PLAYERS · 15-45 MINS · AGES 13+</span>
          <span>PLAY A CARD. MAKE A MEMORY.</span>
          <span>MADE YOU SAY IT</span>
          <span>FREE CARD DECKS AVAILABLE TO TRY</span>
          <span>75 CARDS · 7 FUN CATEGORIES</span>
          <span>2-8 PLAYERS · 15-45 MINS · AGES 13+</span>
          <span>PLAY A CARD. MAKE A MEMORY.</span>
        </div>
      </div>

      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Brand Wordmark & Official Squircle Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('hero');
            }}
            className={styles.brand}
            aria-label="MADE YOU SAY IT Home"
          >
            <img
              src="/brand/logo.png"
              alt="MADE YOU SAY IT logo"
              className={styles.brandLogoImg}
            />
            <span className={styles.brandName}>MADE YOU SAY IT</span>
          </a>

          {/* Desktop Navigation with Spaced Items */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <button
              onClick={() => handleLinkClick('gallery')}
              className={styles.navLink}
            >
              SAMPLE CARDS
            </button>
            <button
              onClick={() => handleLinkClick('packaging')}
              className={styles.navLink}
            >
              WHAT'S IN THE BOX
            </button>
            <button
              onClick={() => handleLinkClick('rules')}
              className={styles.navLink}
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => handleLinkClick('story')}
              className={styles.navLink}
            >
              WHY I MADE THIS
            </button>
            <button
              onClick={() => handleLinkClick('feedback')}
              className={styles.navLink}
            >
              FEEDBACK
            </button>
          </nav>

          {/* Right Action Utilities */}
          <div className={styles.rightActions}>
            <button
              onClick={() => handleLinkClick('feedback')}
              className={styles.buyButton}
            >
              <span>GET FREE DECK</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`${styles.burgerLine} ${mobileMenuOpen ? styles.burgerLine1 : ''}`} />
              <span className={`${styles.burgerLine} ${mobileMenuOpen ? styles.burgerLine2 : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
          <div className={styles.mobileDrawerInner}>
            <button onClick={() => handleLinkClick('gallery')} className={styles.mobileNavLink}>
              SAMPLE CARDS (7 TYPES)
            </button>
            <button onClick={() => handleLinkClick('packaging')} className={styles.mobileNavLink}>
              WHAT'S IN THE BOX
            </button>
            <button onClick={() => handleLinkClick('rules')} className={styles.mobileNavLink}>
              HOW IT WORKS (6 RULES)
            </button>
            <button onClick={() => handleLinkClick('story')} className={styles.mobileNavLink}>
              WHY I CREATED THIS GAME
            </button>
            <button onClick={() => handleLinkClick('feedback')} className={styles.mobileNavLink}>
              GIVE FEEDBACK &amp; GET FREE DECK
            </button>

            <div className={styles.mobileDrawerFooter}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick('feedback');
                }}
                className={styles.mobileBuyBtn}
              >
                ASK FOR A FREE DECK
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
