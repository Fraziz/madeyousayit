import React from 'react';
import { RULEBOOK_DATA } from '../data/rules';
import styles from './Rulebook.module.css';

interface RulebookProps {
  soundEnabled?: boolean;
}

export const Rulebook: React.FC<RulebookProps> = () => {
  const { setup, yourTurn, cardTypes, points, passOrFail, thePiles, endOfGame, goldenRule, specs } = RULEBOOK_DATA;

  return (
    <section className={styles.rulebookSection} id="rules">
      <div className={`container ${styles.rulebookContainer}`}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>OFFICIAL RULEBOOK</span>
          <h2 className={styles.sectionTitle}>
            HOW TO <span className={styles.titleHighlight}>PLAY</span>
          </h2>
          <p className={styles.sectionTagline}>{specs.tagline}</p>

          <div className={styles.specsPill}>
            <span>{specs.players}</span>
            <span className={styles.specDot}>•</span>
            <span>{specs.ages}</span>
            <span className={styles.specDot}>•</span>
            <span>{specs.duration}</span>
          </div>
        </div>

        {/* Minimalist Unified Document Canvas */}
        <div className={styles.rulebookCanvas}>

          {/* 1. SETUP */}
          <div className={styles.ruleRow}>
            <div className={styles.ruleRowHeader}>
              <span className={styles.ruleIndex}>01</span>
              <div>
                <h3 className={styles.ruleRowTitle}>{setup.title}</h3>
                <p className={styles.ruleRowSubtitle}>{setup.fullText}</p>
              </div>
            </div>

            <div className={styles.setupList}>
              {setup.bullets.map((b, idx) => (
                <div key={idx} className={styles.setupItem}>
                  <span className={styles.setupBulletDot} />
                  <div>
                    <span className={styles.setupItemLabel}>{b.label}: </span>
                    <span className={styles.setupItemText}>{b.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* 2. YOUR TURN */}
          <div className={styles.ruleRow}>
            <div className={styles.ruleRowHeader}>
              <span className={styles.ruleIndex}>02</span>
              <div>
                <h3 className={styles.ruleRowTitle}>{yourTurn.title}</h3>
                <p className={styles.ruleRowSubtitle}>Take turns in clockwise order following these simple steps.</p>
              </div>
            </div>

            {/* Clean Turn Flow Sequence */}
            <div className={styles.flowStrip}>
              {yourTurn.flow.map((step, idx) => (
                <React.Fragment key={step}>
                  <div className={styles.flowNode}>
                    <span className={styles.flowNum}>{idx + 1}</span>
                    <span className={styles.flowLabel}>{step}</span>
                  </div>
                  {idx < yourTurn.flow.length - 1 && (
                    <span className={styles.flowChevron}>→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 6 Clean Step Cards */}
            <div className={styles.stepsGrid}>
              {yourTurn.steps.map((st) => (
                <div key={st.step} className={styles.stepItem}>
                  <div className={styles.stepItemTop}>
                    <span className={styles.stepNumTag}>STEP {st.step}</span>
                    <h4 className={styles.stepItemName}>{st.name}</h4>
                  </div>
                  <p className={styles.stepItemAction}>{st.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* 3. CARD TYPES */}
          <div className={styles.ruleRow}>
            <div className={styles.ruleRowHeader}>
              <span className={styles.ruleIndex}>03</span>
              <div>
                <h3 className={styles.ruleRowTitle}>{cardTypes.title}</h3>
                <p className={styles.ruleRowSubtitle}>How each card category works when played on your turn.</p>
              </div>
            </div>

            <div className={styles.cardTypesGrid}>
              {cardTypes.types.map((type, idx) => (
                <div key={idx} className={styles.cardTypeRow}>
                  <div className={styles.cardTypeMeta}>
                    <span className={styles.cardTypeTag}>{type.tag}</span>
                    <h4 className={styles.cardTypeNames}>{type.categories}</h4>
                  </div>
                  <p className={styles.cardTypeInstruction}>{type.rule}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* 4. POINTS & 5. PASS OR FAIL */}
          <div className={styles.splitRow}>
            {/* 4. POINTS */}
            <div className={styles.splitCol}>
              <div className={styles.ruleRowHeader}>
                <span className={styles.ruleIndex}>04</span>
                <div>
                  <h3 className={styles.ruleRowTitle}>{points.title}</h3>
                  <p className={styles.ruleRowSubtitle}>{points.note}</p>
                </div>
              </div>

              <div className={styles.pointsList}>
                {points.tiers.map((t) => (
                  <div key={t.name} className={styles.pointRow}>
                    <span className={styles.pointTierName}>{t.name}</span>
                    <span className={styles.pointTierBadge}>
                      {t.points} {t.points === 1 ? 'POINT' : 'POINTS'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. PASS OR FAIL */}
            <div className={styles.splitCol}>
              <div className={styles.ruleRowHeader}>
                <span className={styles.ruleIndex}>05</span>
                <div>
                  <h3 className={styles.ruleRowTitle}>{passOrFail.title}</h3>
                  <span className={styles.passNoteBadge}>{passOrFail.goldenCallout}</span>
                </div>
              </div>

              <div className={styles.passFailList}>
                {passOrFail.rules.map((r) => (
                  <div key={r.type} className={styles.passFailItem}>
                    <span className={styles.passFailLabel}>{r.type}</span>
                    <p className={styles.passFailText}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          {/* 6. THE PILES */}
          <div className={styles.ruleRow}>
            <div className={styles.ruleRowHeader}>
              <span className={styles.ruleIndex}>06</span>
              <div>
                <h3 className={styles.ruleRowTitle}>{thePiles.title}</h3>
                <p className={styles.ruleRowSubtitle}>Four distinct areas for cards during and after play.</p>
              </div>
            </div>

            <div className={styles.pilesGrid}>
              {thePiles.piles.map((pile) => (
                <div key={pile.name} className={styles.pileItem}>
                  <div className={styles.pileMeta}>
                    <span className={styles.pileName}>{pile.name}</span>
                    <span className={styles.pileRole}>{pile.badge}</span>
                  </div>
                  <p className={styles.pileDetails}>{pile.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* 7. END OF GAME */}
          <div className={styles.ruleRow}>
            <div className={styles.ruleRowHeader}>
              <span className={styles.ruleIndex}>07</span>
              <div>
                <h3 className={styles.ruleRowTitle}>{endOfGame.title}</h3>
                <p className={styles.ruleRowSubtitle}>{endOfGame.condition}</p>
              </div>
            </div>

            <div className={styles.endGameStrip}>
              <div className={styles.formulaLine}>
                <span className={styles.formulaItem}>Score Pile</span>
                <span className={styles.formulaSymbol}>+</span>
                <span className={styles.formulaItem}>Team Pile</span>
                <span className={styles.formulaSymbol}>=</span>
                <span className={styles.formulaOutcome}>Final Score</span>
              </div>
              <p className={styles.winnerDeclaration}>{endOfGame.winner}</p>
            </div>
          </div>

          <div className={styles.divider} />

          {/* 8. GOLDEN RULE */}
          <div className={styles.goldenRuleBlock}>
            <div className={styles.goldenContent}>
              <div className={styles.goldenBadgeLine}>
                <span className={styles.goldenNumber}>08</span>
                <span className={styles.goldenTag}>SAFETY & COMFORT FIRST</span>
              </div>
              <h3 className={styles.goldenTitle}>{goldenRule.title}</h3>
              <p className={styles.goldenText}>{goldenRule.text}</p>
            </div>

            <div className={styles.goldenAction}>
              <a
                href="https://www.facebook.com/aaronpaulcabagnan12"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.goldenButton}
              >
                <span>MESSAGE ON FACEBOOK TO GET DECK</span>
                <span>→</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Brand Sign-off */}
        <div className={styles.rulebookFooterStamp}>
          <span>MADE YOU SAY IT</span>
          <span className={styles.stampDot}>•</span>
          <span>PLAY A CARD. MAKE A MEMORY.</span>
        </div>

      </div>
    </section>
  );
};

export default Rulebook;
