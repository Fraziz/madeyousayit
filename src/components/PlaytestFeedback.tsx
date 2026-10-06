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
  cardType: string;
  thoughts: string;
}

const FEEDBACK_STORAGE_KEY = 'mysi_feedback_history_v2';
const MAX_MONTHLY_FEEDBACK = 5;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const GOOGLE_SHEETS_API_URL =
  'https://script.google.com/macros/s/AKfycbyo5cRws4wo7wZCg3CabmprCk-MB567wPl-spjnZqW8qHnP6ylLCMq9tYkrdl-t4Sjo/exec';

const CARD_TYPES = [
  'EXPOSE',
  'CREATE',
  'BATTLE',
  'CHAOS',
  'CONNECT',
  'LOVE',
];

const CARD_TYPE_OPTIONS: Record<string, string[]> = {
  CONNECT:  ['Good as it is', 'Deeper conversations', 'Lighter, easier questions', "Haven't tried it"],
  LOVE:     ['Good as it is', 'More questions about love & romance', 'More playful, flirty questions', 'Less personal questions', "Haven't tried it"],
  CHAOS:    ['Good as it is', 'Funnier challenges', 'Easier challenges', 'More interaction with other players', "Haven't tried it"],
  CREATE:   ['Good as it is', 'Funnier prompts', 'Easier things to come up with', 'More chances to be creative', "Haven't tried it"],
  EXPOSE:   ['Good as it is', 'More revealing questions', 'Less personal questions', 'More surprising questions', "Haven't tried it"],
  BATTLE:   ['Good as it is', 'More exciting challenges', 'Clearer instructions', 'Fairer challenges', "Haven't tried it"],
};

export type FeedbackType = 'GENERAL' | 'REPORT_BAD' | 'SUGGEST_NEW';

const getRecentSubmissions = (): number[] => {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) return [];
    const list: number[] = JSON.parse(raw);
    const now = Date.now();
    return list.filter((t) => typeof t === 'number' && now - t < THIRTY_DAYS_MS);
  } catch {
    return [];
  }
};

export const PlaytestFeedback: React.FC<PlaytestFeedbackProps> = ({ soundEnabled = true }) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('GENERAL');
  const [rating, setRating] = useState<number | null>(null);
  const [ratingError, setRatingError] = useState<boolean>(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [favoriteCardType, setfavoriteCardType] = useState<string>('BATTLE');
  const [cardTypeFeedback, setCardTypeFeedback] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  // Live Community Reviews State
  const [reviews, setReviews] = useState<CommunityReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);

  // Listen for direct suggestion clicks from Card Simulator
  useEffect(() => {
    const handleSuggestEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ cardType?: string }>;
      setFeedbackType('REPORT_BAD');
      if (customEvent.detail?.cardType && CARD_TYPES.includes(customEvent.detail.cardType.toUpperCase())) {
        setfavoriteCardType(customEvent.detail.cardType.toUpperCase());
      }
    };
    window.addEventListener('mysi_suggest_challenge', handleSuggestEvent);
    return () => {
      window.removeEventListener('mysi_suggest_challenge', handleSuggestEvent);
    };
  }, []);

  // Auto-detect player name from URL (?name=... or ?fb=...) or localStorage
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlName = urlParams.get('name') || urlParams.get('fb') || urlParams.get('user');
      if (urlName && urlName.trim()) {
        setContactInfo(urlName.trim());
        return;
      }
      const savedName = localStorage.getItem('mysi_player_name');
      if (savedName && savedName.trim()) {
        setContactInfo(savedName.trim());
      }
    } catch {
      // Safe fallback
    }
  }, []);

  // Check 5 submissions per device per month
  useEffect(() => {
    const recent = getRecentSubmissions();
    if (recent.length >= MAX_MONTHLY_FEEDBACK) {
      setAlreadySubmitted(true);
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

    if (!contactInfo.trim()) {
      return;
    }

    if (rating === null) {
      setRatingError(true);
      return;
    }

    setIsSubmitting(true);

    const playerName = contactInfo.trim();
    const playerReviewText = notes.trim();

    const prefix =
      feedbackType === 'REPORT_BAD'
        ? '[BAD CHALLENGE REPORT] '
        : feedbackType === 'SUGGEST_NEW'
        ? '[CHALLENGE SUGGESTION] '
        : '';
    const formattedThoughts = `${prefix}${playerReviewText}`;

    // Optimistically add review to live feed immediately
    const optimisticReview: CommunityReview = {
      id: `rev_${Date.now()}`,
      date: 'Just now',
      name: playerName,
      rating,
      cardType: favoriteCardType,
      thoughts: formattedThoughts,
    };
    setReviews((prev) => [optimisticReview, ...prev]);

    try {
      // Record submission timestamp on device (keep array for 5-per-month tracking)
      const existing = getRecentSubmissions();
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify([...existing, Date.now()]));
      if (playerName && playerName.trim()) {
        localStorage.setItem('mysi_player_name', playerName.trim());
      }

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
          cardType: favoriteCardType,
          category: favoriteCardType,
          thoughts: formattedThoughts,
          cardTypeFeedback: Object.entries(cardTypeFeedback)
            .filter(([, opts]) => opts.length > 0)
            .map(([type, opts]) => `${type}: ${opts.join(', ')}`)
            .join(' | '),
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
        <div className={`${styles.header} reveal-item`}>
          <span className={styles.tag}>SHARE YOUR THOUGHTS</span>
          <h2 className={styles.title}>
            GIVE YOUR <span className={styles.highlight}>FEEDBACK</span>
          </h2>
          <p className={styles.subtitle}>
            Did you play the cards with your friends? Tell us what you think below so we can make the game even better!
          </p>
        </div>

        {/* Creator Note Banner */}
        <div className={`${styles.creatorBanner} reveal-item`}>
          <div className={styles.creatorBannerLeft}>
            <span className={styles.creatorBadge}>HELP US IMPROVE THE CARDS</span>
            <p className={styles.creatorText}>
              <strong>I’m actively improving the challenges!</strong> If a card feels boring, awkward, confusing, or just isn't fun, tell me. Your feedback helps me improve the next version.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Minimalist Feedback Form */}
          <div className={`${styles.formCard} reveal-item`}>
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
                {/* Feedback Type Selector */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>FEEDBACK TYPE</label>
                  <div className={styles.typeSelectorRow}>
                    <button
                      type="button"
                      onClick={() => {
                        setFeedbackType('GENERAL');
                        if (soundEnabled) playSound('click');
                      }}
                      className={`${styles.typeBtn} ${feedbackType === 'GENERAL' ? styles.typeBtnActive : ''}`}
                    >
                      General Review
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFeedbackType('REPORT_BAD');
                        if (soundEnabled) playSound('click');
                      }}
                      className={`${styles.typeBtn} ${feedbackType === 'REPORT_BAD' ? styles.typeBtnActive : ''}`}
                    >
                      Report a Bad Challenge
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFeedbackType('SUGGEST_NEW');
                        if (soundEnabled) playSound('click');
                      }}
                      className={`${styles.typeBtn} ${feedbackType === 'SUGGEST_NEW' ? styles.typeBtnActive : ''}`}
                    >
                      Suggest a Challenge
                    </button>
                  </div>
                </div>

                {/* Rating 1-5 */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>OVERALL RATING</label>
                  <div
                    className={styles.ratingRow}
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    <div className={styles.starsGroup}>
                      {[1, 2, 3, 4, 5].map((val) => {
                        const currentVal = hoverRating !== null ? hoverRating : (rating ?? 0);
                        const isFilled = val <= currentVal;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => {
                              setRating(val);
                              setRatingError(false);
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
                      {hoverRating !== null
                        ? RATING_LABELS[hoverRating]
                        : rating !== null
                        ? RATING_LABELS[rating]
                        : 'Select a rating (1/5 · 2/5 · 3/5 · 4/5 · 5/5)'}
                    </span>
                  </div>
                  {ratingError && (
                    <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px', fontWeight: 600 }}>
                      Please select an overall rating (1–5 stars) before submitting.
                    </p>
                  )}
                </div>

                {/* Favorite Card Type */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="card-type-select">
                    {feedbackType === 'REPORT_BAD'
                      ? 'WHICH CARD TYPE HAD THE BAD CHALLENGE?'
                      : feedbackType === 'SUGGEST_NEW'
                      ? 'WHICH CARD TYPE IS YOUR CHALLENGE FOR?'
                      : 'FAVORITE CARD TYPE'}
                  </label>
                  <select
                    id="card-type-select"
                    value={favoriteCardType}
                    onChange={(e) => {
                      setfavoriteCardType(e.target.value);
                      if (soundEnabled) playSound('click');
                    }}
                    className={styles.cardTypeSelect}
                  >
                    {CARD_TYPES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Card Type Feedback */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>CARD TYPE FEEDBACK</label>
                  <p className={styles.cardTypeFeedbackHint}>What would you change? Choose all that apply.</p>
                  <div className={styles.cardTypeFeedbackGrid}>
                    {Object.entries(CARD_TYPE_OPTIONS).map(([type, opts]) => (
                      <div key={type} className={styles.ctfBlock}>
                        <span className={styles.ctfType}>{type}</span>
                        <div className={styles.ctfOptions}>
                          {opts.map((opt) => {
                            const checked = (cardTypeFeedback[type] ?? []).includes(opt);
                            return (
                              <label key={opt} className={styles.ctfLabel}>
                                <input
                                  type="checkbox"
                                  className={styles.ctfCheckbox}
                                  checked={checked}
                                  onChange={() => {
                                    setCardTypeFeedback((prev) => {
                                      const current = prev[type] ?? [];
                                      return {
                                        ...prev,
                                        [type]: checked
                                          ? current.filter((o) => o !== opt)
                                          : [...current, opt],
                                      };
                                    });
                                  }}
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specific Card Textarea */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>
                    {feedbackType === 'REPORT_BAD'
                      ? 'WHICH CHALLENGE WAS BAD & HOW CAN IT BE BETTER?'
                      : feedbackType === 'SUGGEST_NEW'
                      ? 'YOUR CHALLENGE IDEA'
                      : 'YOUR THOUGHTS & SUGGESTIONS'}
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      feedbackType === 'REPORT_BAD'
                        ? 'Tell us which challenge felt bad, boring, or awkward, and what you suggest changing to make it better...'
                        : feedbackType === 'SUGGEST_NEW'
                        ? 'Describe your challenge idea, rules, and how players should complete it...'
                        : 'What was the funniest part? Was anything hard to understand? Tell us what you liked or what to change...'
                    }
                    className={styles.textarea}
                    required
                  />
                </div>

                {/* Name / Contact */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-name" className={styles.fieldLabel}>
                    YOUR NAME OR NICKNAME
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Your name or Facebook / Instagram"
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

          {/* Right Column: Request Free 80-Card Prototype Deck & Share */}
          <div className={styles.sideCol}>
            <div className={styles.sideCard}>
              <span className={styles.sideTag}>LIMITED FREE PROTOTYPE DECKS</span>
              <h3 className={styles.sideTitle}>WANT A FREE 80-CARD PROTOTYPE DECK?</h3>
              <p className={styles.sideText}>
                I'm giving out <strong>free prototype decks</strong> to people who want to play it with their friends.
              </p>

              <div className={styles.keepOrReturnBox}>
                <span className={styles.keepOrReturnEmoji}>😄</span>
                <p className={styles.keepOrReturnText}>
                  If you enjoyed the game, you're welcome to keep it. If it wasn't for you, you can return it to me.
                </p>
              </div>

              <p className={styles.sideTextSmall}>
                Copies are limited. Message me on Facebook to claim yours!
              </p>

              <div className={styles.requestCtaBox}>
                <span className={styles.requestHeading}>MESSAGE ON FACEBOOK</span>
                <p className={styles.requestSubtext}>
                  Hit me up on Facebook — I'll sort you out with a free deck to try with your friends!
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
          <div className={`${styles.reviewsHeader} reveal-item`}>
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
            <div className={`${styles.reviewsGrid} reveal-group`}>
              {reviews.map((rev, idx) => (
                <div
                  key={rev.id}
                  className={`${styles.reviewCard} reveal-card card-hover-lift`}
                  style={{ '--reveal-delay': idx % 6 } as React.CSSProperties}
                >
                  <div className={styles.reviewCardTop}>
                    <div className={styles.reviewerMeta}>
                      <span className={styles.reviewerName}>{rev.name}</span>
                      <span className={styles.reviewDate}>{rev.date}</span>
                    </div>
                    <div className={styles.reviewCardBadges}>
                      <span className={styles.reviewCardTypePill}>
                        {rev.cardType}
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
