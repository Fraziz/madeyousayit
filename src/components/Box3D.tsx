import React, { useState, useEffect, useRef } from 'react';
import styles from './Box3D.module.css';

interface Box3DProps {
  initialAngle?: number;
  autoRotateSpeed?: number; // degrees per second
}

export const Box3D: React.FC<Box3DProps> = ({
  initialAngle = 0,
  autoRotateSpeed = 22, // formal, stately rotation: ~16 seconds per 360 deg
}) => {
  const [rotY, setRotY] = useState<number>(initialAngle);
  const [rotX, setRotX] = useState<number>(10); // subtle formal downward pitch to view top & depth
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<'360' | 'front' | 'right' | 'back' | 'custom'>('360');

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartAngle = useRef<{ rotX: number; rotY: number }>({ rotX: 10, rotY: 0 });
  const rotYRef = useRef<number>(initialAngle);
  const rotXRef = useRef<number>(10);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Keep refs synchronized
  useEffect(() => {
    rotYRef.current = rotY;
  }, [rotY]);

  useEffect(() => {
    rotXRef.current = rotX;
  }, [rotX]);

  // Smooth 360 Turntable Animation Loop
  useEffect(() => {
    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (isAutoSpinning && !isDraggingRef.current && !isHovered) {
        setRotY((prev) => (prev + autoRotateSpeed * delta) % 360);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isAutoSpinning, isHovered, autoRotateSpeed]);

  // Pointer Drag Handlers (touch & mouse unified)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartAngle.current = { rotX: rotXRef.current, rotY: rotYRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;

    // Fluid drag sensitivity
    const newRotY = (dragStartAngle.current.rotY + dx * 0.6) % 360;
    const newRotX = Math.max(-28, Math.min(28, dragStartAngle.current.rotX - dy * 0.4));

    setRotY(newRotY);
    setRotX(newRotX);
    setActivePreset('custom');
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  // Preset Angle Selectors
  const selectPreset = (preset: '360' | 'front' | 'right' | 'back') => {
    setActivePreset(preset);
    if (preset === '360') {
      setIsAutoSpinning(true);
      setRotX(10);
    } else {
      setIsAutoSpinning(false);
      setRotX(8);
      if (preset === 'front') setRotY(0);
      if (preset === 'right') setRotY(-90);
      if (preset === 'back') setRotY(180);
    }
  };

  return (
    <div className={styles.container}>
      {/* 3D Scene */}
      <div
        className={styles.scene}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="region"
        aria-label="Interactive 3D Card Box, drag to rotate or inspect all sides"
      >
        <div
          className={styles.box}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: isDraggingRef.current
              ? 'none'
              : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* 1. FRONT FACE (3.5" x 2.5") */}
          <div className={`${styles.face} ${styles.faceFront}`}>
            <img
              src="/brand/box-face-front.png"
              alt="MADE YOU SAY IT Box Front"
              className={styles.faceImg}
              draggable={false}
            />
            <div className={styles.faceShine} />
          </div>

          {/* 2. BACK FACE (3.5" x 2.5") */}
          <div className={`${styles.face} ${styles.faceBack}`}>
            <img
              src="/brand/box-face-back.png"
              alt="MADE YOU SAY IT Box Back - Game Description"
              className={styles.faceImg}
              draggable={false}
            />
            <div className={styles.faceShine} />
          </div>

          {/* 3. RIGHT SPINE (Specs: 3-8 Players, 15-45 Minutes, Ages 13+) */}
          <div className={`${styles.face} ${styles.faceRight}`}>
            <img
              src="/brand/box-face-right.png"
              alt="MADE YOU SAY IT Box Right Spine - Player Specs"
              className={styles.faceImg}
              draggable={false}
            />
            <div className={styles.faceShine} />
          </div>

          {/* 4. LEFT SPINE */}
          <div className={`${styles.face} ${styles.faceLeft}`}>
            <img
              src="/brand/box-face-left.png"
              alt="MADE YOU SAY IT Box Left Spine"
              className={styles.faceImg}
              draggable={false}
            />
            <div className={styles.faceShine} />
          </div>

          {/* 5. TOP FLAP */}
          <div className={`${styles.face} ${styles.faceTop}`}>
            <img
              src="/brand/box-face-top.png"
              alt="MADE YOU SAY IT Box Top Flap"
              className={styles.faceImg}
              draggable={false}
            />
          </div>

          {/* 6. BOTTOM FLAP */}
          <div className={`${styles.face} ${styles.faceBottom}`}>
            <img
              src="/brand/box-face-bottom.png"
              alt="MADE YOU SAY IT Box Bottom Flap"
              className={styles.faceImg}
              draggable={false}
            />
          </div>
        </div>

        {/* Dynamic Floor Shadow */}
        <div className={styles.groundShadow} />
      </div>

      {/* Formal Interactive Toolbar */}
      <div className={styles.controlsToolbar}>
        <div className={styles.hintRow}>
          {isAutoSpinning && !isHovered && <span className={styles.spinPulseDot} />}
          <span>
            {isHovered
              ? 'PAUSED (DRAG TO ROTATE 360°)'
              : isAutoSpinning
              ? '360° TURNTABLE SPIN'
              : 'DRAG TO ROTATE 360°'}
          </span>
        </div>

        {/* View Angle Preset Pills */}
        <div className={styles.presetButtonsRow}>
          <button
            type="button"
            className={`${styles.presetBtn} ${activePreset === '360' && isAutoSpinning ? styles.presetBtnActive : ''}`}
            onClick={() => selectPreset('360')}
            title="Continuous 360 rotation"
          >
            <span>🔄 360° Spin</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${activePreset === 'front' ? styles.presetBtnActive : ''}`}
            onClick={() => selectPreset('front')}
            title="View Front Face"
          >
            <span>Front</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${activePreset === 'right' ? styles.presetBtnActive : ''}`}
            onClick={() => selectPreset('right')}
            title="View Spine & Specs"
          >
            <span>Spine &amp; Specs</span>
          </button>
          <button
            type="button"
            className={`${styles.presetBtn} ${activePreset === 'back' ? styles.presetBtnActive : ''}`}
            onClick={() => selectPreset('back')}
            title="View Back Face"
          >
            <span>Back</span>
          </button>
        </div>

        <div className={styles.dimensionBadge}>
          3.5&quot; × 2.5&quot; POCKET TUCK BOX • 80 CARDS
        </div>
      </div>
    </div>
  );
};

export default Box3D;
