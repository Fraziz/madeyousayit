import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';
import styles from './PlaytestFeedback.module.css';

interface PlaytestFeedbackProps {
  soundEnabled?: boolean;
}

export interface CommunityReview {
  id: string;
  date: string;
  name: string;
  rating: number;
  category: string;
  thoughts: string;
}

const FEEDBACK_STORAGE_KEY = 'mysi_feedback_last_submitted';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const GOOGLE_SHEETS_API_URL =
  'https://script.google.com/macros/s/AKfycbyo5cRws4wo7wZCg3CabmprCk-MB567wPl-spjnZqW8qHnP6ylLCMq9tYkrdl-t4Sjo/exec';

const CATEGORIES = [
  'GUESS',
  'CREATE',
  'BATTLE',
  'CHAOS',
  'TOGETHER',
  'CONNECT',
  'LOVE',
];

export const PlaytestFeedback: React.FC<PlaytestFeedbackProps> = ({ soundEnabled = true }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [favoriteCategory, setFavoriteCategory] = useState<string>('BATTLE');
  const [notes, setNotes] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  // Live Community Reviews State
  const [reviews, setReviews] = useState<CommunityReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);

  // 1. Silent 1-week per-device check
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      if (saved) {
        const timestamp = parseInt(saved, 10);
        const elapsed = Date.now() - timestamp;
        if (elapsed < ONE_WEEK_MS) {
          setAlreadySubmitted(true);
        } else {
          localStorage.removeItem(FEEDBACK_STORAGE_KEY);
        }
      }
    } catch {
      // local storage unavailable fallback
    }
  }, []);

  // 2. Fetch live reviews from Google Sheets on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        setIsLoadingReviews(true);
        const res = await fetch(GOOGLE_SHEETS_API_URL);
        const data = await res.json();
        if (isMounted && data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.warn('Could not load live reviews from Google Sheet', err);
      } finally {
        if (isMounted) setIsLoadingReviews(false);
      }
    }

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const RATING_LABELS: Record<number, string> = {
    1: '1/5 — Needs work',
    2: '2/5 — Fair',
    3: '3/5 — Good fun!',
    4: '4/5 — Really great!',
    5: '5/5 — Loved it!',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const playerName = contactInfo.trim() || 'Anonymous Player';
    const playerReviewText = notes.trim();

    // Optimistically add review to live feed immediately
    const optimisticReview: CommunityReview = {
      id: `rev_${Date.now()}`,
      date: 'Just now',
      name: playerName,
      rating,
      category: favoriteCategory,
      thoughts: playerReviewText,
    };
    setReviews((prev) => [optimisticReview, ...prev]);

    try {
      // Record 1-week cooldown timestamp on device
      localStorage.setItem(FEEDBACK_STORAGE_KEY, Date.now().toString());

      // Save directly to Aaron's Google Sheet
      await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: playerName,
          rating,
          category: favoriteCategory,
          thoughts: playerReviewText,
        }),
      });
    } catch (err) {
      console.warn('Google Sheet submission note', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setAlreadySubmitted(true);
      if (soundEnabled) playSound('score');

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#5170FF', '#3b57e6', '#728cff', '#0a0a0c'],
      });
    }
  };

  const handleCopyLink = () => {
    if (soundEnabled) playSound('click');
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  // Calculate live stats
  const totalReviewsCount = reviews.length;
  const averageRating =
    totalReviewsCount > 0
      ? (
          reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) /
          totalReviewsCount
        ).toFixed(1)
      : '5.0';

  return (
    <section className={styles.feedbackSection} id="feedback">
      <div className={`container ${styles.container}`}>
        {/* Clean Minimalist Header */}
        <div className={styles.header}>
          <span className={styles.tag}>SHARE YOUR THOUGHTS</span>
          <h2 className={styles.title}>
            GIVE YOUR <span className={styles.highlight}>FEEDBACK</span>
          </h2>
          <p className={styles.subtitle}>
            Did you play the cards with your friends? Tell us what you think below so we can make the game even better!
          </p>
        </div>

        <div className={styles.grid}>
          {/* Minimalist Feedback Form */}
          <div className={styles.formCard}>
            {alreadySubmitted || submitted ? (
              <div className={styles.successState}>
                <div className={styles.successCheck}>FEEDBACK RECORDED</div>
                <h3 className={styles.successTitle}>THANK YOU FOR YOUR FEEDBACK!</h3>
                <p className={styles.successDesc}>
                  We received your playtest notes and added them to the community reviews wall below. Your honest thoughts help Aaron improve <strong>MADE YOU SAY IT</strong> and make it even better.
                </p>
                <a
                  href="https://www.facebook.com/aaronpaulcabagnan12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directChatBtn}
                >
                  <span>HAVE MORE THOUGHTS? MESSAGE ON FACEBOOK</span>
                  <span>→</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                {/* Rating 1-5 */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>OVERALL RATING</label>
                  <div
                    className={styles.ratingRow}
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    <div className={styles.starsGroup}>
                      {[1, 2, 3, 4, 5].map((val) => {
                        const currentVal = hoverRating !== null ? hoverRating : rating;
                        const isFilled = val <= currentVal;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setRating(val);
                              if (soundEnabled) playSound('click');
                            }}
                            onMouseEnter={() => setHoverRating(val)}
                            className={`${styles.starBtn} ${
                              isFilled ? styles.starFilled : styles.starEmpty
                            }`}
                            aria-label={`Rate ${val} out of 5 stars`}
                          >
                            <svg
                              className={styles.starSvg}
                              viewBox="0 0 24 24"
                              width="30"
                              height="30"
                              fill={isFilled ? 'currentColor' : 'none'}
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                    <span className={styles.ratingLabel}>
                      {RATING_LABELS[hoverRating !== null ? hoverRating : rating]}
                    </span>
                  </div>
                </div>

                {/* Favorite Category */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>FAVORITE CARD TYPE</label>
                  <div className={styles.categoryPills}>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setFavoriteCategory(cat);
                          if (soundEnabled) playSound('click');
                        }}
                        className={`${styles.categoryPill} ${
                          favoriteCategory === cat ? styles.categoryPillActive : ''
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thoughts and Observations */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>YOUR THOUGHTS</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What was the funniest part? Was anything hard to understand? Tell us what you liked or what to change..."
                    className={styles.textarea}
                    required
                  />
                </div>

                {/* Name / Contact */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    YOUR NAME OR NICKNAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Your name or Instagram"
                    className={styles.input}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? 'SENDING FEEDBACK...' : 'SEND FEEDBACK'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Request Free Physical Deck & Share */}
          <div className={styles.sideCol}>
            <div className={styles.sideCard}>
              <span className={styles.sideTag}>FREE CARDS</span>
              <h3 className={styles.sideTitle}>WANT A FREE CARD DECK?</h3>
              <p className={styles.sideText}>
                MADE YOU SAY IT is made for laughing together and having fun without phones.
              </p>
              <p className={styles.sideText}>
                We are giving out free card decks to people who want to play with their friends.
              </p>

              <div className={styles.requestCtaBox}>
                <span className={styles.requestHeading}>MESSAGE ON FACEBOOK</span>
                <p className={styles.requestSubtext}>
                  Send Aaron Paul a message on Facebook to ask for a free card deck for your next game night!
                </p>
                <a
                  href="https://www.facebook.com/aaronpaulcabagnan12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.requestEmailBtn}
                >
                  MESSAGE AARON ON FACEBOOK →
                </a>
              </div>

              <div className={styles.shareRow}>
                <span className={styles.shareText}>Share this game with friends:</span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={styles.copyBtn}
                >
                  {linkCopied ? 'LINK COPIED' : 'COPY LINK'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            LIVE COMMUNITY PLAYTEST REVIEWS WALL (Synced with Google Sheets)
            ============================================================ */}
        <div className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <div className={styles.reviewsTitleGroup}>
              <span className={styles.reviewsTag}>COMMUNITY VOICES</span>
              <h3 className={styles.reviewsTitle}>WHAT PLAYTESTERS ARE SAYING</h3>
            </div>

            <div className={styles.reviewsStatsPill}>
              <div className={styles.avgRatingStars}>
                <span>★</span>
                <span>{averageRating}</span>
              </div>
              <span className={styles.statsDivider} />
              <span className={styles.statsCount}>
                {totalReviewsCount} {totalReviewsCount === 1 ? 'Review' : 'Reviews'}
              </span>
            </div>
          </div>

          {isLoadingReviews ? (
            <div className={styles.emptyReviewsPrompt}>
              Loading community playtest reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className={styles.emptyReviewsPrompt}>
              No reviews published yet. Be the first to play and share your review above!
            </div>
          ) : (
            <div className={styles.reviewsGrid}>
              {reviews.map((rev) => (
                <div key={rev.id} className={styles.reviewCard}>
                  <div className={styles.reviewCardTop}>
                    <div className={styles.reviewerMeta}>
                      <span className={styles.reviewerName}>{rev.name}</span>
                      <span className={styles.reviewDate}>{rev.date}</span>
                    </div>
                    <div className={styles.reviewCardBadges}>
                      <span className={styles.reviewCategoryPill}>
                        {rev.category}
                      </span>
                    </div>
                  </div>

                  <div className={styles.reviewStarsRow}>
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <span
                        key={starVal}
                        style={{
                          opacity: starVal <= (Number(rev.rating) || 5) ? 1 : 0.25,
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className={styles.reviewText}>{rev.thoughts}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlaytestFeedback;
