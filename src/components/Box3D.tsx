import React, { useState } from 'react';
import styles from './Box3D.module.css';

export const Box3D: React.FC = () => {
  const [rotateY, setRotateY] = useState(15);
  const [rotateX, setRotateX] = useState(10);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateY(x * 0.12);
    setRotateX(-y * 0.12);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateY(15);
    setRotateX(10);
  };

  return (
    <div
      className={styles.scene}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.box}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Front Face */}
        <div className={`${styles.face} ${styles.faceFront}`}>
          <div className={styles.notch} />
          <div className={styles.frontContent}>
            <div className={styles.badgeTop}>FIRST EDITION</div>
            <h1 className={styles.brandTitle}>
              MADE
              <br />
              YOU
              <br />
              SAY IT
            </h1>
            <p className={styles.tagline}>THE PARTY GAME THAT MAKES YOU SAY IT.</p>
          </div>
        </div>

        {/* Back Face */}
        <div className={`${styles.face} ${styles.faceBack}`}>
          <div className={styles.backHeader}>MADE YOU SAY IT</div>
          <p className={styles.backDescription}>
            The ultimate card game that brings people closer. Answer, challenge, create, and connect—because the best moments aren&apos;t planned: they&apos;re played.
          </p>
          <div className={styles.specsRow}>
            <div className={styles.specItem}>
              <span className={styles.specVal}>3–8</span>
              <span className={styles.specKey}>PLAYERS</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specVal}>20–30</span>
              <span className={styles.specKey}>MINUTES</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specVal}>13+</span>
              <span className={styles.specKey}>AGES</span>
            </div>
          </div>
          <div className={styles.barcodeArea}>
            <div className={styles.barcodeLines} />
            <span className={styles.barcodeNum}>MADE-IN-PH • 75 CARDS • 7 CATEGORIES</span>
          </div>
        </div>

        {/* Right Spine Face */}
        <div className={`${styles.face} ${styles.faceRight}`}>
          <div className={styles.spineText}>MADE YOU SAY IT</div>
          <div className={styles.spineIcons}>
            <span>3–8 PLAYERS</span>
            <span>20–30 MIN</span>
            <span>AGES 13+</span>
          </div>
        </div>

        {/* Left Spine Face */}
        <div className={`${styles.face} ${styles.faceLeft}`}>
          <div className={styles.spineText}>THE PARTY GAME THAT MAKES YOU SAY IT.</div>
        </div>

        {/* Top Face */}
        <div className={`${styles.face} ${styles.faceTop}`}>
          <span>MADE YOU SAY IT</span>
        </div>

        {/* Bottom Face */}
        <div className={`${styles.face} ${styles.faceBottom}`}>
          <span>75 PREMIUM LINEN CARDS</span>
        </div>
      </div>

      <div className={styles.shadow} />
    </div>
  );
};

export default Box3D;
