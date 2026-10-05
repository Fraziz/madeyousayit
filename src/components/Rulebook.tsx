import React, { useState } from 'react';
import { RULEBOOK_TRANSLATIONS, RULE_LANGUAGES } from '../data/rules';
import type { RuleLanguage } from '../data/rules';
import { sound } from '../utils/audio';
import styles from './Rulebook.module.css';

interface RulebookProps {
  soundEnabled?: boolean;
}

export const Rulebook: React.FC<RulebookProps> = ({ soundEnabled = true }) => {
  const [currentLang, setCurrentLang] = useState<RuleLanguage>('en');
  const [activeSoloCardIndex, setActiveSoloCardIndex] = useState<number>(0);
  const [sampleIndices, setSampleIndices] = useState<Record<string, number>>({
    guess: 0,
    battle: 0,
  });

  const handleNextSample = (typeId: string, maxSamples: number) => {
    if (soundEnabled) sound.playClick();
    setSampleIndices((prev) => ({
      ...prev,
      [typeId]: ((prev[typeId] || 0) + 1) % maxSamples,
    }));
  };

  const currentRules = RULEBOOK_TRANSLATIONS[currentLang];
  const { setup, yourTurn, points, cardTypes, passOrFail, thePiles, endOfGame, goldenRule, specs, subtitle, quickNote, quickNoteLabel } = currentRules;

  return (
    <section className={styles.rulebookSection} id="rules">
      <div className={styles.rulebookContainer}>
        {/* Section Header */}
        <div className={`${styles.sectionHeader} reveal-item`}>
          {/* Exact Specs Capsule */}
          <div className={styles.specsCapsule}>
            <span>RULEBOOK</span>
            <span className={styles.specDot}>•</span>
            <span>{specs.players}</span>
            <span className={styles.specDot}>•</span>
            <span>{specs.ages}</span>
            <span className={styles.specDot}>•</span>
            <span>{specs.duration}</span>
          </div>

          <h2 className={styles.sectionTitle}>
            HOW TO <span className={styles.titleHighlight}>PLAY</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            {subtitle}
          </p>

          {/* Minimalist Language Switcher */}
          <div className={styles.langSelectorRow}>
            <div className={styles.langSwitcher} role="tablist" aria-label="Translate Rulebook">
              {RULE_LANGUAGES.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.langBtn} ${isActive ? styles.langBtnActive : ''}`}
                    onClick={() => {
                      if (soundEnabled) sound.playClick();
                      setCurrentLang(lang.code);
                    }}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minimalist Wide Document Canvas */}
        <div className={styles.rulebookCanvas}>
          {/* Quick Note Banner */}
          <p className={`${styles.quickNote} reveal-item`}>
            <strong>{quickNoteLabel}</strong> {quickNote}
          </p>

          {/* 1. SETUP — Visual Step-by-Step Illustrated Guide */}
          <div className={styles.sectionBlock}>
            <div className={`${styles.sectionHeadingRow} reveal-item`}>
              <h3 className={styles.sectionHeading}>{setup.title}</h3>
            </div>

            <div className={`${styles.setupGrid} reveal-group`}>
              {setup.steps?.map((st, idx) => (
                <div
                  key={st.number}
                  className={`${styles.setupStepCard} reveal-card card-hover-lift`}
                  style={{ '--reveal-delay': idx } as React.CSSProperties}
                >
                  <div className={styles.setupImageWrapper}>
                    <img
                      src={st.image}
                      alt={st.alt}
                      className={styles.setupImage}
                      loading="lazy"
                    />
                    <div className={styles.setupStepBadge}>
                      <span className={styles.stepNum}>{st.number}</span>
                    </div>
                  </div>
                  <div className={styles.setupStepContent}>
                    <h4 className={styles.setupStepTitle}>{st.title}</h4>
                    <p className={styles.setupStepAction}>{st.action}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>

          <div className={styles.divider} />

          {/* 2. YOUR TURN — Visual Illustrated Turn Stepper */}
          <div className={styles.sectionBlock}>
            <div className={`${styles.sectionHeadingRow} reveal-item`}>
              <h3 className={styles.sectionHeading}>{yourTurn.title}</h3>
            </div>

            <div className={`${styles.turnStepperGrid} reveal-group`}>
              {yourTurn.steps.map((st, idx) => (
                <div
                  key={st.name}
                  className={`${styles.turnStepCard} reveal-card card-hover-lift`}
                  style={{ '--reveal-delay': idx } as React.CSSProperties}
                >
                  <div className={styles.turnImageWrapper}>
                    {st.image ? (
                      <img
                        src={st.image}
                        alt={st.alt || st.name}
                        className={styles.turnImage}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.turnImagePlaceholder}>
                        <div className={styles.placeholderCardShape}>
                          <span className={styles.placeholderCardBack}>MADE YOU SAY IT</span>
                        </div>
                      </div>
                    )}
                    <div className={styles.turnStepBadge}>
                      <span className={styles.turnStepNum}>{idx + 1}</span>
                    </div>
                  </div>

                  <div className={styles.turnCardBody}>
                    <span className={styles.turnTagName}>{st.name}</span>
                    {st.reminder && (
                      <p className={styles.turnReminderText}>{st.reminder}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* 3. POINTS — Clean Minimalist Section */}
          <div className={`${styles.sectionBlock} reveal-item`}>
            <div className={styles.sectionHeadingRow}>
              <h3 className={styles.sectionHeading}>{points.title}</h3>
            </div>
            <p className={styles.pointsText}>{points.text}</p>
          </div>

          <div className={styles.divider} />

          {/* 4. CARD TYPES — Formal, Compact & Clickable */}
          <div className={styles.sectionBlock}>
            <h3 className={`${styles.sectionHeading} reveal-item`}>{cardTypes.title}</h3>

            <div className={`${styles.cardTypesGrid} reveal-group`}>
              {cardTypes.types.map((type, idx) => {
                const isSolo = type.id === 'solo';
                const currentCardImg = isSolo
                  ? type.subTypes?.[activeSoloCardIndex]?.image || '/cards/chaos 2 point hero.png'
                  : type.samples?.[sampleIndices[type.id] || 0] || '/cards/guess  1point hero.png';

                const cardAlt = isSolo
                  ? `${type.subTypes?.[activeSoloCardIndex]?.name || 'Card'} official card`
                  : `${type.name || 'Card'} sample card`;

                return (
                  <div
                    key={idx}
                    className={`${styles.cardTypeCard} reveal-card card-hover-lift`}
                    style={{ '--reveal-delay': idx } as React.CSSProperties}
                  >
                    {/* Compact Formal Card Image on Top — Clickable to flip/cycle */}
                    <div className={styles.cardDisplayArea}>
                      <div
                        className={styles.cardPreviewWrapper}
                        onClick={() => {
                          if (isSolo) {
                            if (soundEnabled) sound.playClick();
                            setActiveSoloCardIndex((prev) => (prev + 1) % (type.subTypes?.length || 4));
                          } else if (type.samples) {
                            handleNextSample(type.id, type.samples.length);
                          }
                        }}
                        title={
                          isSolo
                            ? 'Click card to view next solo card type'
                            : `Click card to view next ${type.name} card (${(sampleIndices[type.id] || 0) + 1}/${type.samples?.length || 3})`
                        }
                      >
                        <img
                          src={currentCardImg}
                          alt={cardAlt}
                          className={styles.compactCardImg}
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Pill Buttons directly under card — Clean, Same & Clickable */}
                    <div className={styles.cardTypePillsBar}>
                      {isSolo && type.subTypes ? (
                        type.subTypes.map((c, cIdx) => {
                          const isSelected = activeSoloCardIndex === cIdx;
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                if (soundEnabled) sound.playClick();
                                setActiveSoloCardIndex(cIdx);
                              }}
                              className={`${styles.cardTypePill} ${isSelected ? styles.cardTypePillActive : ''}`}
                              style={
                                isSelected
                                  ? {
                                      backgroundColor: c.color,
                                      color: c.textColor || '#ffffff',
                                      borderColor: c.color,
                                      boxShadow: `0 3px 12px ${c.color}66`,
                                    }
                                  : undefined
                              }
                              title={`Show ${c.name} card`}
                            >
                              {c.name}
                            </button>
                          );
                        })
                      ) : type.name && type.samples ? (
                        <button
                          type="button"
                          onClick={() => handleNextSample(type.id, type.samples!.length)}
                          className={`${styles.cardTypePill} ${styles.cardTypePillActive}`}
                          style={{
                            backgroundColor: type.color,
                            color: type.textColor || '#ffffff',
                            borderColor: type.color,
                            boxShadow: `0 3px 12px ${type.color}66`,
                          }}
                          title={`Click to view next ${type.name} card (${(sampleIndices[type.id] || 0) + 1}/${type.samples.length})`}
                        >
                          {type.name}
                        </button>
                      ) : null}
                    </div>

                    {/* Rule Text Under Pills — NO duplicate heading! */}
                    <p className={styles.cardTypeRuleUnder}>{type.rule}</p>
                  </div>
                );
              })}
            </div>

          </div>

          <div className={styles.divider} />

          {/* 5. PASS OR FAIL */}
          <div className={`${styles.sectionBlock} reveal-item`}>
            <h3 className={styles.sectionHeading}>{passOrFail.title}</h3>
            <div className={styles.passFailList}>
              {passOrFail.items.map((it) => (
                <div key={it.label} className={styles.passFailRow}>
                  <span className={styles.passFailBadge}>{it.label}</span>
                  <p className={styles.passFailText}>{it.desc}</p>
                </div>
              ))}
            </div>
            <span className={styles.passAlwaysCallout}>{passOrFail.callout}</span>
          </div>

          <div className={styles.divider} />

          {/* 6. THE PILES */}
          <div className={`${styles.sectionBlock} reveal-item`}>
            <h3 className={styles.sectionHeading}>{thePiles.title}</h3>

            {/* Table layout image & piles explanation */}
            {thePiles.image && (
              <div className={`${styles.pilesHeroWrapper} reveal-item`} data-parallax="true">
                <img
                  src={thePiles.image}
                  alt={thePiles.alt}
                  className={styles.pilesHeroImage}
                  loading="lazy"
                />
                <div className={styles.compactPilesGrid}>
                  {thePiles.piles.map((p) => (
                    <div key={p.name} className={styles.compactPileItem}>
                      <span className={styles.compactPileName}>{p.name}</span>
                      <p className={styles.compactPileDesc}>{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.divider} />

          {/* 7. END OF GAME */}
          <div className={`${styles.sectionBlock} reveal-item`}>
            <h3 className={styles.sectionHeading}>{endOfGame.title}</h3>
            <p className={styles.endGameCondition}>{endOfGame.condition}</p>
            <div className={styles.formulaBarCompact}>
              <span className={styles.formulaItem}>Score Pile Points</span>
              <span className={styles.formulaOp}>=</span>
              <span className={styles.formulaOutcome}>Final Score</span>
            </div>
            <p className={styles.winnerLine}>{endOfGame.winner}</p>
            <p className={styles.endGameCondition}>{endOfGame.dare}</p>
          </div>

          <div className={styles.divider} />

          {/* 8. GOLDEN RULE — Compact Note */}
          <div className={`${styles.goldenCard} reveal-item`}>
            <h4 className={styles.goldenTitle}>{goldenRule.title}</h4>
            <p className={styles.goldenText}>{goldenRule.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rulebook;
