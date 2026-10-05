import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.add('no-motion');
    return () => {};
  }

  try {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      syncTouch: false,
    });

    lenisInstance = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  } catch (err) {
    console.warn('Lenis smooth scroll initialization skipped:', err);
    return () => {};
  }
}

export function scrollToSection(sectionIdOrElement: string | HTMLElement, offset = -64) {
  let target: HTMLElement | null = null;
  if (typeof sectionIdOrElement === 'string') {
    const cleanId = sectionIdOrElement.replace(/^#/, '');
    target = document.getElementById(cleanId);
  } else {
    target = sectionIdOrElement;
  }

  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.1 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
