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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

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
      {/* Moving Clean Top Announcement Bar */}
      <div className={styles.topAnnouncementBar} aria-label="Announcement">
        <div className={styles.tickerTrack}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.tickerItem} aria-hidden={i > 1 ? 'true' : undefined}>
              <span>LIMITED FREE PROTOTYPE DECKS AVAILABLE</span>
              <span className={styles.tickerDot} />
              <span>80 CARDS · 6 CARD TYPES · 3–8 PLAYERS · 20–30 MIN · AGES 13+</span>
              <span className={styles.tickerDot} />
            </div>
          ))}
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
              src="/brand/logo.svg"
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
              SAMPLE CARDS (7 CARD TYPES)
            </button>
            <button onClick={() => handleLinkClick('packaging')} className={styles.mobileNavLink}>
              WHAT'S IN THE BOX
            </button>
            <button onClick={() => handleLinkClick('rules')} className={styles.mobileNavLink}>
              HOW IT WORKS
            </button>
            <button onClick={() => handleLinkClick('story')} className={styles.mobileNavLink}>
              WHY I CREATED THIS GAME
            </button>
            <button onClick={() => handleLinkClick('feedback')} className={styles.mobileNavLink}>
              GIVE FEEDBACK
            </button>

            <div className={styles.mobileDrawerFooter}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLinkClick('feedback');
                }}
                className={styles.mobileBuyBtn}
              >
                GET A DECK →
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
