import React, { useState, useEffect, useRef } from 'react';
import styles from './Box3D.module.css';

interface Box3DProps {
  initialAngle?: number;
  autoRotateSpeed?: number; // degrees per second
}

export const Box3D: React.FC<Box3DProps> = ({
  initialAngle = 0,
  autoRotateSpeed = 22, // formal, stately rotation: ~16.3 seconds per 360 deg
}) => {
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const rotYRef = useRef<number>(initialAngle);
  const rotXRef = useRef<number>(10); // subtle formal downward pitch to view top & depth

  // Drag interaction state
  const isDraggingRef = useRef<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartAngle = useRef<{ rotX: number; rotY: number }>({ rotX: 10, rotY: 0 });
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Continuous Seamless 360 Turntable Animation Loop
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      // Clamp delta to prevent erratic jumps if the browser tab was hidden
      const delta = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      if (isAutoSpinning && !isDraggingRef.current) {
        // Monotonically advance rotY so it seamlessly loops forever without snapping or reversing
        rotYRef.current += autoRotateSpeed * delta;
        if (boxRef.current) {
          boxRef.current.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isAutoSpinning, autoRotateSpeed]);

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
    const newRotY = dragStartAngle.current.rotY + dx * 0.6;
    const newRotX = Math.max(-28, Math.min(28, dragStartAngle.current.rotX - dy * 0.4));

    rotYRef.current = newRotY;
    rotXRef.current = newRotX;

    if (boxRef.current) {
      boxRef.current.style.transform = `rotateX(${newRotX}deg) rotateY(${newRotY}deg)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      lastTimeRef.current = performance.now();
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const handleToggleSpin = () => {
    setIsAutoSpinning((prev) => {
      const next = !prev;
      if (next) {
        lastTimeRef.current = performance.now();
      }
      return next;
    });
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
        role="region"
        aria-label="Interactive 3D Card Box, drag to rotate or inspect all sides"
      >
        <div
          ref={boxRef}
          className={styles.box}
          style={{
            transform: `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`,
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

      {/* Clean Minimalist 360 Indicator & Toggle */}
      <button
        type="button"
        className={styles.minimalPill}
        onClick={handleToggleSpin}
        title={isAutoSpinning ? "Click to pause rotation" : "Click to auto rotate"}
      >
        <span>360° {isAutoSpinning ? 'SPIN' : 'PAUSED'}</span>
      </button>
    </div>
  );
};

export default Box3D;
