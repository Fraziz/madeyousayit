/**
 * Smooth Scroll & Motion Controller
 * Handles:
 * 1. Intersection-based one-time soft fade & upward scroll reveals (~0.7s)
 * 2. Sequential card & feature item stagger (0.1s delay between items)
 * 3. Parallax scroll effect for large product images (limited to ~30px, subtle)
 * 4. Desktop card hover lift (4px) & gentle image enlargement
 * 5. Reduced-motion settings & small-screen movement reduction
 * 6. Progressive enhancement: keeps content visible if scripts fail
 */

export function initScrollAnimations(): () => void {
  if (typeof window === 'undefined') return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.classList.add('no-motion');
    document.querySelectorAll('.reveal-item, .reveal-card, .reveal-banner').forEach((el) => {
      el.setAttribute('data-revealed', '');
    });
    return () => {};
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-item, .reveal-card, .reveal-banner').forEach((el) => {
      el.setAttribute('data-revealed', '');
    });
    return () => {};
  }

  let rafId: number;
  let observer: IntersectionObserver | null = null;
  let mutationObserver: MutationObserver | null = null;
  let watchdogTimer: ReturnType<typeof setInterval> | null = null;
  let destroyed = false;

  // Step 1: Add motion-ready class to trigger CSS hidden state
  document.documentElement.classList.add('motion-ready');

  const createObserver = () => {
    return new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.06,
      }
    );
  };

  // Tag inner text/images of lower sections so they animate individually (staggered)
  const tagInnerElements = () => {
    const selector = 'h2, h3, h4, p, li, img, label';
    const excluded =
      'header, .reveal-card, [class*="cardWrapper"], [class*="lightbox"], [class*="CardView"], form, [data-no-reveal]';
    document.querySelectorAll<HTMLElement>('main > section:not(:first-child), footer').forEach((section) => {
      const counters = new Map<Element, number>();
      section.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (el.closest(excluded)) return;
        if (el.matches('.reveal-item, .reveal-card, .reveal-banner, [data-reveal-auto]')) return;
        if (el.closest('[data-parallax="true"]')) return;
        const parent = el.parentElement as Element;
        const n = counters.get(parent) ?? 0;
        counters.set(parent, n + 1);
        el.setAttribute('data-reveal-auto', '');
        el.classList.add('reveal-item');
        el.style.setProperty('--reveal-delay', String(Math.min(n, 5)));
      });
    });
  };

  tagInnerElements();

  const observeElements = (obs: IntersectionObserver) => {
    tagInnerElements();
    const targets = document.querySelectorAll(
      '.reveal-item:not([data-revealed]), .reveal-card:not([data-revealed]), .reveal-banner:not([data-revealed])'
    );
    targets.forEach((el) => obs.observe(el));
  };

  // Step 2: Wait TWO animation frames so browser paints the opacity:0 state
  // before we start observing (prevents flash of invisible content)
  rafId = requestAnimationFrame(() => {
    rafId = requestAnimationFrame(() => {
      if (destroyed) return;

      observer = createObserver();
      observeElements(observer);

      // Watch for DOM changes (tab switches, filter changes showing new cards)
      mutationObserver = new MutationObserver(() => {
        if (observer) observeElements(observer);
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      // Safety net: only reveal elements already in or above the viewport that the
      // observer may have missed (fast jumps). Never reveals content below the fold.
      watchdogTimer = setInterval(() => {
        const vh = window.innerHeight;
        document
          .querySelectorAll('.reveal-item:not([data-revealed]), .reveal-card:not([data-revealed]), .reveal-banner:not([data-revealed])')
          .forEach((el) => {
            if (el.getBoundingClientRect().top < vh * 0.9) el.setAttribute('data-revealed', '');
          });
      }, 1000);
    });
  });

  return () => {
    destroyed = true;
    cancelAnimationFrame(rafId);
    if (watchdogTimer) clearInterval(watchdogTimer);
    if (observer) observer.disconnect();
    if (mutationObserver) mutationObserver.disconnect();
    // Clean up motion-ready so re-mount starts fresh
    document.documentElement.classList.remove('motion-ready');
  };
}

export function initParallax(): () => void {
  if (typeof window === 'undefined') return () => {};

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return () => {};

  let ticking = false;

  const update = () => {
    const isMobile = window.innerWidth <= 768;
    const maxShift = isMobile ? 10 : 30;
    const vh = window.innerHeight;

    const elements = document.querySelectorAll<HTMLElement>('[data-parallax="true"]');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      const elementCenter = rect.top + rect.height / 2;
      const progress = (elementCenter - vh / 2) / (vh / 2);
      const shift = Math.max(-maxShift, Math.min(maxShift, progress * (maxShift * 0.75)));
      el.style.setProperty('--parallax-y', `${shift.toFixed(1)}px`);
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
