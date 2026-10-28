/**
 * PROVITECH INTEGRATORS — CENTRAL MOTION CONTROLLER
 * Phase 4.7: GSAP Animation Foundation & Motion Engine
 * 
 * Standards & Guardrails:
 * - GSAP Core + ScrollTrigger only (zero additional animation libraries).
 * - Shared-hosting static compatibility: No Node/npm/bundlers required.
 * - Non-blocking progressive enhancement: If GSAP or JS fails, all content remains 100% visible and functional.
 * - Strict reduced-motion compliance via window.matchMedia('(prefers-reduced-motion: reduce)').
 * - CSS handles Level 1 micro-interactions; GSAP handles Level 2 entrance & Level 3 storytelling.
 */

// ============================================================================
// 1. Centralized Motion Tokens (Single Source of Truth)
// ============================================================================
export const MOTION_TOKENS = Object.freeze({
  duration: {
    micro: 0.18,       // 180ms: UI micro-interactions, icons, arrows, indicators
    fast: 0.25,        // 250ms: Button hovers, mobile drawer toggle, fast cues
    standard: 0.40,    // 400ms: Standard scroll reveals, card entrances, layout shifts
    slow: 0.65,        // 650ms: Complex section reveals, background transitions
    story: 0.95        // 950ms: Controlled hero storytelling, sequence branding
  },
  ease: {
    standard: 'power2.out',       // Natural, smooth interface settling (CSS: cubic-bezier(0.25, 1, 0.5, 1))
    entrance: 'power3.out',       // Decisive deceleration for entering elements (CSS: cubic-bezier(0.16, 1, 0.3, 1))
    exit: 'power2.in',            // Prompt departure without lingering (CSS: cubic-bezier(0.4, 0, 1, 1))
    emphasis: 'power2.inOut'      // Symmetrical focus for bidirectional cues (CSS: cubic-bezier(0.65, 0, 0.35, 1))
  },
  distance: {
    sm: 12,            // 12px: Micro elements, badges, chips
    md: 24,            // 24px: Headings, paragraph blocks, service cards
    lg: 40             // 40px: Maximum entrance movement ceiling
  },
  stagger: {
    fast: 0.06,        // 0.06s: Rapid metrics, pill tags
    base: 0.08,        // 0.08s: Default card grids, service items
    slow: 0.12         // 0.12s: Storytelling sequence limit
  },
  scale: {
    press: 0.98,       // Active click compression
    hover: 1.02,       // Restrained card hover lift
    max: 1.03          // Maximum allowable non-disruptive scale
  }
});

// ============================================================================
// 2. Motion Engine State & Environment Detection
// ============================================================================
const state = {
  isJsAvailable: true,
  isGsapAvailable: false,
  isScrollTriggerAvailable: false,
  prefersReducedMotion: false,
  device: 'desktop', // 'desktop' | 'tablet' | 'mobile'
  isInitialized: false,
  version: '4.15.0'
};

/**
 * Detects current device tier based on content-driven responsive breakpoints.
 * Matches assets/css/responsive.css architecture.
 */
function getDeviceTier() {
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
}

/**
 * Checks system reduced-motion preference and establishes dynamic listener.
 */
function checkReducedMotion() {
  if (typeof window.matchMedia === 'function') {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    state.prefersReducedMotion = mq.matches;

    // Listen for live system changes
    if (mq.addEventListener) {
      mq.addEventListener('change', (e) => {
        state.prefersReducedMotion = e.matches;
        applyDocumentAttributes();
        if (state.isGsapAvailable && state.isScrollTriggerAvailable && window.ScrollTrigger) {
          window.ScrollTrigger.refresh();
        }
      });
    }
  } else {
    state.prefersReducedMotion = false;
  }
}

/**
 * Synchronizes runtime motion state with document attributes for CSS inspection.
 */
function applyDocumentAttributes() {
  const root = document.documentElement;
  root.setAttribute('data-js', 'true');
  root.setAttribute('data-reduced-motion', state.prefersReducedMotion ? 'true' : 'false');
  root.setAttribute('data-device', state.device);

  if (state.isGsapAvailable && state.isScrollTriggerAvailable && !state.prefersReducedMotion) {
    root.setAttribute('data-motion', 'gsap');
  } else {
    root.setAttribute('data-motion', 'fallback');
  }
}

// ============================================================================
// 3. Safe Dependency Registration & Engine Setup
// ============================================================================
function setupGsapEngine() {
  // Safe verification: GSAP Core
  if (typeof window.gsap === 'undefined') {
    console.warn('[PROVITECH Motion] GSAP Core not detected. Gracefully activating CSS/HTML native fallback.');
    state.isGsapAvailable = false;
    return false;
  }
  state.isGsapAvailable = true;

  // Safe verification: ScrollTrigger Plugin
  if (typeof window.ScrollTrigger === 'undefined') {
    console.warn('[PROVITECH Motion] GSAP ScrollTrigger not detected. Running without scroll triggers.');
    state.isScrollTriggerAvailable = false;
    return false;
  }
  state.isScrollTriggerAvailable = true;

  try {
    // Safely register plugin
    window.gsap.registerPlugin(window.ScrollTrigger);

    // Global ScrollTrigger defaults
    window.ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true
    });

    return true;
  } catch (err) {
    console.error('[PROVITECH Motion] Error registering GSAP ScrollTrigger:', err);
    state.isGsapAvailable = false;
    state.isScrollTriggerAvailable = false;
    return false;
  }
}

// ============================================================================
// 4. Section Motion Controllers (Phase 4.8 Header Active; 4.9–4.14 Reserved)
// ============================================================================

// Active mobile drawer timeline instance for rapid toggle collision protection
let mobileMenuTimeline = null;

/**
 * Animates the mobile drawer container, staggered nav links, and mobile CTA.
 * Protects against rapid toggle race conditions by cleanly overwriting/killing prior tweens.
 * 
 * @param {boolean} isOpen - Whether menu is transitioning to open or closed
 * @param {HTMLElement} mainNav - Navigation drawer element
 * @param {Function} [onComplete] - Optional completion callback for functional state updates
 */
export function animateMobileMenu(isOpen, mainNav, onComplete) {
  if (!mainNav) return;

  // Reduced motion or GSAP unavailable fallback
  if (state.prefersReducedMotion || !state.isGsapAvailable || !window.gsap) {
    if (window.gsap) {
      window.gsap.set(mainNav, { clearProps: 'all' });
      const items = mainNav.querySelectorAll('a');
      window.gsap.set(items, { clearProps: 'all' });
    }
    if (onComplete) onComplete();
    return;
  }

  // Kill running timeline immediately to prevent stacking/accumulation
  if (mobileMenuTimeline) {
    mobileMenuTimeline.kill();
    mobileMenuTimeline = null;
  }

  const links = mainNav.querySelectorAll('a:not(.nav-mobile-cta)');
  const mobileCta = mainNav.querySelector('.nav-mobile-cta');

  if (isOpen) {
    mobileMenuTimeline = window.gsap.timeline({
      onComplete: () => {
        window.gsap.set([mainNav, ...links, mobileCta].filter(Boolean), { clearProps: 'transform,opacity' });
        mobileMenuTimeline = null;
        if (onComplete) onComplete();
      }
    });

    // 1. Drawer container slides and fades in smoothly (280ms)
    mobileMenuTimeline.fromTo(mainNav,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.28, ease: MOTION_TOKENS.ease.entrance }
    );

    // 2. Nav links stagger in with subtle upward settling (220ms, 0.045s stagger)
    if (links.length) {
      mobileMenuTimeline.fromTo(links,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22, stagger: 0.045, ease: MOTION_TOKENS.ease.entrance },
        '-=0.18'
      );
    }

    // 3. Mobile CTA button enters last
    if (mobileCta) {
      mobileMenuTimeline.fromTo(mobileCta,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22, ease: MOTION_TOKENS.ease.entrance },
        '-=0.12'
      );
    }
  } else {
    // Fast, crisp exit (200ms)
    mobileMenuTimeline = window.gsap.timeline({
      onComplete: () => {
        window.gsap.set(mainNav, { clearProps: 'all' });
        const items = mainNav.querySelectorAll('a');
        window.gsap.set(items, { clearProps: 'all' });
        mobileMenuTimeline = null;
        if (onComplete) onComplete();
      }
    });

    mobileMenuTimeline.to(mainNav, {
      opacity: 0,
      y: -10,
      duration: 0.20,
      ease: MOTION_TOKENS.ease.exit
    });
  }
}

/**
 * Resets mobile drawer inline styles and kills pending animations.
 * Used during window resize from mobile to desktop.
 */
export function resetMobileMenu(mainNav) {
  if (mobileMenuTimeline) {
    mobileMenuTimeline.kill();
    mobileMenuTimeline = null;
  }
  if (window.gsap && mainNav) {
    window.gsap.set(mainNav, { clearProps: 'all' });
    const items = mainNav.querySelectorAll('a');
    window.gsap.set(items, { clearProps: 'all' });
  }
}

/**
 * Phase 4.8: Header & Navigation Motion Implementation.
 * Orchestrates subtle, non-intrusive initial page entrance and responsive navigation behavior.
 */
export function initHeaderMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const topline = document.querySelector('.topline');
  const siteHeader = document.querySelector('.site-header');
  const brand = document.querySelector('.site-header .brand');
  const navLinks = document.querySelectorAll('.site-header .main-nav > a:not(.nav-mobile-cta)');
  const headerCta = document.querySelector('.site-header .header-cta');

  // Also support Brand Guidelines header if on brand-guidelines.html
  const bgHeader = document.querySelector('.bg-header');
  const bgBrand = document.querySelector('.bg-header .bg-brand');
  const bgNavLinks = document.querySelectorAll('.bg-header .bg-nav > a');

  if (!siteHeader && !bgHeader) return null;

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Choreographed entrance sequence (~750ms total)
  mm.add('(min-width: 901px)', () => {
    if (siteHeader) {
      const tl = window.gsap.timeline({
        defaults: {
          ease: MOTION_TOKENS.ease.entrance
        },
        onComplete: () => {
          window.gsap.set([topline, siteHeader, brand, ...navLinks, headerCta].filter(Boolean), { clearProps: 'all' });
        }
      });

      // 1. Top utility bar settles
      if (topline) {
        tl.fromTo(topline,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.25 }
        );
      }

      // 2. Main header container settles into position
      tl.fromTo(siteHeader,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.35 },
        topline ? '-=0.15' : 0
      );

      // 3. Logo appears
      if (brand) {
        tl.fromTo(brand,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25 },
          '-=0.20'
        );
      }

      // 4. Desktop navigation links appear with small stagger (~0.05s)
      if (navLinks.length) {
        tl.fromTo(navLinks,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 },
          '-=0.18'
        );
      }

      // 5. Electric Blue CTA appears last
      if (headerCta) {
        tl.fromTo(headerCta,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25 },
          '-=0.15'
        );
      }
    } else if (bgHeader) {
      const tl = window.gsap.timeline({
        defaults: { ease: MOTION_TOKENS.ease.entrance },
        onComplete: () => {
          window.gsap.set([bgHeader, bgBrand, ...bgNavLinks].filter(Boolean), { clearProps: 'all' });
        }
      });
      tl.fromTo(bgHeader, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.35 });
      if (bgBrand) tl.fromTo(bgBrand, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.25 }, '-=0.20');
      if (bgNavLinks.length) tl.fromTo(bgNavLinks, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 }, '-=0.18');
    }

    return () => {
      if (siteHeader) {
        window.gsap.set([topline, siteHeader, brand, ...navLinks, headerCta].filter(Boolean), { clearProps: 'all' });
      }
      if (bgHeader) {
        window.gsap.set([bgHeader, bgBrand, ...bgNavLinks].filter(Boolean), { clearProps: 'all' });
      }
    };
  });

  // Tablet & Mobile (<= 900px): Streamlined header entrance (no desktop stagger)
  mm.add('(max-width: 900px)', () => {
    const targetHeader = siteHeader || bgHeader;
    const tl = window.gsap.timeline({
      defaults: { ease: MOTION_TOKENS.ease.entrance },
      onComplete: () => {
        window.gsap.set([topline, targetHeader].filter(Boolean), { clearProps: 'all' });
      }
    });

    if (topline) {
      tl.fromTo(topline,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22 }
      );
    }

    tl.fromTo(targetHeader,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 0.25 },
      topline ? '-=0.12' : 0
    );

    return () => {
      window.gsap.set([topline, targetHeader].filter(Boolean), { clearProps: 'all' });
    };
  });

  return mm;
}

// Active Hero motion instances for cleanup / reinit protection
let heroMatchMedia = null;

/**
 * Phase 4.9: Hero Motion & Interactive Elements Implementation.
 * Orchestrates cinematic opening sequence, two-stage headline reveal,
 * desktop pointer-based CCTV depth parallax, and discrete scroll exit.
 */
export function initHeroMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const hero = document.querySelector('#home.hero');
  if (!hero) return null;

  // Clean up any previous hero motion instance to prevent duplicate timelines
  if (heroMatchMedia) {
    heroMatchMedia.revert();
    heroMatchMedia = null;
  }

  const heroImage = hero.querySelector('.hero-image');
  const heroShade = hero.querySelector('.hero-shade');
  const kickerLine = hero.querySelector('.kicker-line');
  const kickerText = hero.querySelector('.hero-kicker-text');
  const titleLines = Array.from(hero.querySelectorAll('.hero-title-line'));
  const heroDesc = hero.querySelector('.hero-desc');
  const primaryCta = hero.querySelector('.hero-btn-primary');
  const secondaryCta = hero.querySelector('.hero-text-link');
  const heroScroll = hero.querySelector('.hero-scroll');
  const heroContent = hero.querySelector('.hero-content');

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Cinematic choreographed opening + subtle pointer depth
  mm.add('(min-width: 901px)', () => {
    // Refresh safety: If browser restores scroll position below hero on page load,
    // skip entrance animation so no unexpected movement occurs outside viewport.
    if (window.scrollY > 150) {
      window.gsap.set(
        [heroImage, heroShade, kickerLine, kickerText, ...titleLines, heroDesc, primaryCta, secondaryCta, heroScroll, heroContent].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      onComplete: () => {
        window.gsap.set(
          [kickerText, ...titleLines, heroDesc, primaryCta, secondaryCta, heroScroll].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Hero visual & dark navy overlay establishment (cinematic scale 1.03 -> 1 & subtle fade)
    if (heroImage) {
      tl.fromTo(heroImage,
        { scale: 1.03, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' },
        0.15 // Overlaps smoothly with header entrance
      );
    }
    if (heroShade) {
      tl.fromTo(heroShade,
        { opacity: 0.75 },
        { opacity: 1, duration: 0.90, ease: 'power2.out' },
        0.15
      );
    }

    // 2. Kicker accent line and eyebrow text
    if (kickerLine) {
      tl.fromTo(kickerLine,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.35, ease: 'power3.out' },
        0.28
      );
    }
    if (kickerText) {
      tl.fromTo(kickerText,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.32
      );
    }

    // 3. Main Headline Two-Stage Reveal
    // Line 1: "See more."
    // Line 2: "Worry less." (Electric Blue accent)
    if (titleLines.length >= 2) {
      tl.fromTo(titleLines[0],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.46
      );
      tl.fromTo(titleLines[1],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55 },
        0.64
      );
    } else {
      const heroTitle = hero.querySelector('.hero-title');
      if (heroTitle) {
        tl.fromTo(heroTitle,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.60 },
          0.46
        );
      }
    }

    // 4. Supporting paragraph
    if (heroDesc) {
      tl.fromTo(heroDesc,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.80
      );
    }

    // 5. Coordinated CTA Group
    if (primaryCta) {
      tl.fromTo(primaryCta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.40 },
        0.92
      );
    }
    if (secondaryCta) {
      tl.fromTo(secondaryCta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.40 },
        1.02
      );
    }

    // 6. Scroll indicator ("SCROLL TO EXPLORE")
    if (heroScroll) {
      tl.fromTo(heroScroll,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.40 },
        1.12
      );
    }

    // Desktop Pointer Parallax on CCTV Image (pointer: fine only)
    let cleanupParallax = null;
    if (window.matchMedia('(pointer: fine)').matches && heroImage) {
      const xTo = window.gsap.quickTo(heroImage, 'x', { duration: 0.8, ease: 'power2.out' });
      const yTo = window.gsap.quickTo(heroImage, 'y', { duration: 0.8, ease: 'power2.out' });

      const onMouseMove = (e) => {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        // Strictly constrained subtle displacement (max 6px)
        xTo(relX * -12);
        yTo(relY * -12);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      hero.addEventListener('mousemove', onMouseMove, { passive: true });
      hero.addEventListener('mouseleave', onMouseLeave);

      cleanupParallax = () => {
        hero.removeEventListener('mousemove', onMouseMove);
        hero.removeEventListener('mouseleave', onMouseLeave);
        window.gsap.set(heroImage, { x: 0, y: 0 });
      };
    }

    // Discrete Scroll Exit: Upward depth separation + pause scroll indicator
    let scrollTriggerInstance = null;
    if (state.isScrollTriggerAvailable && window.ScrollTrigger && heroContent) {
      scrollTriggerInstance = window.ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.4,
        animation: window.gsap.to(heroContent, {
          y: -24,
          opacity: 0.88,
          ease: 'none'
        }),
        onUpdate: (self) => {
          hero.classList.toggle('is-scrolled-past', self.progress > 0.8);
        }
      });
    }

    return () => {
      tl.kill();
      if (cleanupParallax) cleanupParallax();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      window.gsap.set(
        [heroImage, heroShade, kickerLine, kickerText, ...titleLines, heroDesc, primaryCta, secondaryCta, heroScroll, heroContent].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Streamlined entrance without pointer parallax or scrub
  mm.add('(max-width: 900px)', () => {
    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 16;
    const durScale = isMobile ? 0.38 : 0.42;

    if (window.scrollY > 150) {
      window.gsap.set(
        [heroImage, heroShade, kickerLine, kickerText, ...titleLines, heroDesc, primaryCta, secondaryCta, heroScroll].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      onComplete: () => {
        window.gsap.set(
          [kickerText, ...titleLines, heroDesc, primaryCta, secondaryCta, heroScroll].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // Subtle image establishment (no heavy scale on mobile)
    if (heroImage) {
      tl.fromTo(heroImage,
        { opacity: 0.88 },
        { opacity: 1, duration: 0.75, ease: 'power2.out' },
        0.10
      );
    }

    // Kicker
    if (kickerLine) {
      tl.fromTo(kickerLine,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.30, ease: 'power3.out' },
        0.20
      );
    }
    if (kickerText) {
      tl.fromTo(kickerText,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: durScale },
        0.25
      );
    }

    // Headline
    if (titleLines.length >= 2) {
      tl.fromTo(titleLines[0],
        { opacity: 0, y: yDist + 4 },
        { opacity: 1, y: 0, duration: durScale + 0.08 },
        0.36
      );
      tl.fromTo(titleLines[1],
        { opacity: 0, y: yDist + 4 },
        { opacity: 1, y: 0, duration: durScale + 0.08 },
        0.50
      );
    } else {
      const heroTitle = hero.querySelector('.hero-title');
      if (heroTitle) {
        tl.fromTo(heroTitle,
          { opacity: 0, y: yDist + 4 },
          { opacity: 1, y: 0, duration: durScale + 0.1 },
          0.36
        );
      }
    }

    // Paragraph
    if (heroDesc) {
      tl.fromTo(heroDesc,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: durScale },
        0.64
      );
    }

    // CTAs
    if (primaryCta) {
      tl.fromTo(primaryCta,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: durScale },
        0.74
      );
    }
    if (secondaryCta) {
      tl.fromTo(secondaryCta,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: durScale },
        0.82
      );
    }

    // Scroll Indicator
    if (heroScroll) {
      tl.fromTo(heroScroll,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: durScale },
        0.90
      );
    }

    // Pause scroll indicator when scrolled past
    let scrollTriggerInstance = null;
    if (state.isScrollTriggerAvailable && window.ScrollTrigger) {
      scrollTriggerInstance = window.ScrollTrigger.create({
        trigger: hero,
        start: 'bottom 80%',
        onUpdate: (self) => {
          hero.classList.toggle('is-scrolled-past', self.progress > 0.5);
        }
      });
    }

    return () => {
      tl.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      window.gsap.set(
        [heroImage, heroShade, kickerLine, kickerText, ...titleLines, heroDesc, primaryCta, secondaryCta, heroScroll].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  heroMatchMedia = mm;
  return mm;
}

// Active About motion instance for cleanup / reinit protection
let aboutMatchMedia = null;
let aboutHasAnimated = false;

/**
 * Phase 4.10: About + Trust Motion Implementation.
 * Orchestrates narrative text reveal and coordinated architectural trust pillars
 * using viewport-aware ScrollTrigger with responsive adaptation.
 */
export function initAboutMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const about = document.querySelector('#about');
  if (!about) return null;

  // Clean up any previous about motion instance to prevent duplicate triggers
  if (aboutMatchMedia) {
    aboutMatchMedia.revert();
    aboutMatchMedia = null;
  }

  const eyebrow = about.querySelector('.intro-title .eyebrow');
  const heading = about.querySelector('.intro-title h2');
  const paragraphs = Array.from(about.querySelectorAll('.intro-copy p'));
  const pillarItems = Array.from(about.querySelectorAll('.intro-pillar'));
  const textLink = about.querySelector('.intro-copy .text-link');

  // If already animated or if page loaded well past about section, settle immediately
  const isPastAbout = window.scrollY > (about.offsetTop + about.offsetHeight / 2);
  if (aboutHasAnimated || isPastAbout) {
    aboutHasAnimated = true;
    window.gsap.set(
      [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
      { clearProps: 'all' }
    );
    return null;
  }

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Coordinated narrative entrance + left-to-right pillar stagger
  mm.add('(min-width: 901px)', () => {
    if (aboutHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: about,
        start: 'top 82%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && self.progress === 1) {
            tl.progress(1);
          }
        }
      },
      onComplete: () => {
        aboutHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Eyebrow section label
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35 },
        0
      );
    }

    // 2. Primary Heading ("Technology that makes you feel right at home.")
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.10
      );
    }

    // 3. Narrative body paragraphs (subtle stagger 0.07s)
    if (paragraphs.length) {
      tl.fromTo(paragraphs,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.40, stagger: 0.07 },
        0.22
      );
    }

    // 4. Coordinated trust pillars (stagger 0.07s, Left -> Right reading order)
    if (pillarItems.length) {
      tl.fromTo(pillarItems,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.38, stagger: 0.07 },
        0.35
      );
    }

    // 5. "Get to know us" text-link
    if (textLink) {
      tl.fromTo(textLink,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        0.50
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Streamlined single-column vertical sequence
  mm.add('(max-width: 900px)', () => {
    if (aboutHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 16;
    const dur = isMobile ? 0.35 : 0.40;

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: about,
        start: 'top 85%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && self.progress === 1) {
            tl.progress(1);
          }
        }
      },
      onComplete: () => {
        aboutHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: yDist + 6 },
        { opacity: 1, y: 0, duration: dur + 0.06 },
        0.08
      );
    }

    if (paragraphs.length) {
      tl.fromTo(paragraphs,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur, stagger: 0.06 },
        0.18
      );
    }

    if (pillarItems.length) {
      tl.fromTo(pillarItems,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur, stagger: 0.06 },
        0.28
      );
    }

    if (textLink) {
      tl.fromTo(textLink,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0.42
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, ...paragraphs, ...pillarItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  aboutMatchMedia = mm;
  return mm;
}

// Active Services motion instance for cleanup / reinit protection
let servicesMatchMedia = null;
let servicesHasAnimated = false;

/**
 * Phase 4.11: Services Interactive Motion Implementation.
 * Orchestrates section heading reveal, balanced card grid entrance stagger,
 * and clean responsive adaptation via viewport-aware ScrollTrigger.
 */
export function initServicesMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const services = document.querySelector('#services');
  if (!services) return null;

  // Clean up any previous services motion instance to prevent duplicate triggers
  if (servicesMatchMedia) {
    servicesMatchMedia.revert();
    servicesMatchMedia = null;
  }

  const eyebrow = services.querySelector('.section-heading .eyebrow');
  const heading = services.querySelector('.section-heading h2');
  const copy = services.querySelector('.section-heading p');
  const serviceItems = Array.from(services.querySelectorAll('.service-item'));

  // If already animated or if page loaded well past services section, settle immediately
  const isPastServices = window.scrollY > (services.offsetTop + services.offsetHeight / 2);
  if (servicesHasAnimated || isPastServices) {
    servicesHasAnimated = true;
    window.gsap.set(
      [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
      { clearProps: 'all' }
    );
    return null;
  }

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Coordinated heading reveal + left-to-right service card stagger
  mm.add('(min-width: 901px)', () => {
    if (servicesHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: services,
        start: 'top 80%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && self.progress === 1) {
            tl.progress(1);
          }
        }
      },
      onComplete: () => {
        servicesHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Eyebrow section label ("WHAT WE DO")
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35 },
        0
      );
    }

    // 2. Section Heading ("Security, made simple.")
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.10
      );
    }

    // 3. Supporting copy
    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.40 },
        0.22
      );
    }

    // 4. Service items grid (stagger 0.08s, Left -> Right reading order)
    if (serviceItems.length) {
      tl.fromTo(serviceItems,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
        0.35
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Streamlined vertical sequence
  mm.add('(max-width: 900px)', () => {
    if (servicesHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 16;
    const dur = isMobile ? 0.35 : 0.40;
    const stagger = isMobile ? 0.06 : 0.07;

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: services,
        start: 'top 85%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && self.progress === 1) {
            tl.progress(1);
          }
        }
      },
      onComplete: () => {
        servicesHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: yDist + 6 },
        { opacity: 1, y: 0, duration: dur + 0.06 },
        0.08
      );
    }

    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0.18
      );
    }

    if (serviceItems.length) {
      tl.fromTo(serviceItems,
        { opacity: 0, y: yDist + 8 },
        { opacity: 1, y: 0, duration: dur + 0.05, stagger: stagger },
        0.28
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  servicesMatchMedia = mm;
  return mm;
}

// Active Approach motion instance for cleanup / reinit protection
let approachMatchMedia = null;
let approachHasAnimated = false;

/**
 * Phase 4.12: Approach / Process Motion Implementation.
 * Orchestrates technical workflow image establishment, section heading reveal,
 * sequential 01/02/03 process step progression, and accessible CTA settlement.
 */
export function initApproachMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const approach = document.querySelector('.approach, section.approach, #approach');
  if (!approach) return null;

  // Clean up any previous approach motion instance to prevent duplicate triggers
  if (approachMatchMedia) {
    approachMatchMedia.revert();
    approachMatchMedia = null;
  }

  const approachImage = approach.querySelector('.approach-image');
  const approachBadge = approach.querySelector('.approach-badge');
  const eyebrow = approach.querySelector('.approach-content .eyebrow');
  const heading = approach.querySelector('.approach-content h2');
  const copy = approach.querySelector('.approach-content > p');
  const stepItems = Array.from(approach.querySelectorAll('.approach-list > div'));
  const textLink = approach.querySelector('.approach-content .text-link');

  // If already animated or if page loaded well past approach section, settle immediately
  const isPastApproach = window.scrollY > (approach.offsetTop + approach.offsetHeight / 2);
  if (approachHasAnimated || isPastApproach) {
    approachHasAnimated = true;
    window.gsap.set(
      [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
      { clearProps: 'all' }
    );
    return null;
  }

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Coordinated 2-column entrance (image + workflow sequence 01 -> 02 -> 03)
  mm.add('(min-width: 901px)', () => {
    if (approachHasAnimated) {
      window.gsap.set(
        [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: approach,
        start: 'top 80%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && self.progress === 1) {
            tl.progress(1);
          }
        }
      },
      onComplete: () => {
        approachHasAnimated = true;
        window.gsap.set(
          [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Workflow photography container establish
    if (approachImage) {
      tl.fromTo(approachImage,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.50 },
        0
      );
    }

    // 2. Integration workflow floating badge
    if (approachBadge) {
      tl.fromTo(approachBadge,
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.35 },
        0.15
      );
    }

    // 3. Section Eyebrow ("A BETTER WAY TO PROTECT")
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35 },
        0.05
      );
    }

    // 4. Section Heading ("From first visit to final check.")
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.48 },
        0.14
      );
    }

    // 5. Supporting Copy
    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.40 },
        0.26
      );
    }

    // 6. Sequential process steps (01 -> 02 -> 03)
    if (stepItems.length) {
      tl.fromTo(stepItems,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.09 },
        0.38
      );
    }

    // 7. "Start a conversation" text-link CTA
    if (textLink) {
      tl.fromTo(textLink,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        0.65
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Streamlined single-column vertical sequence
  mm.add('(max-width: 900px)', () => {
    if (approachHasAnimated) {
      window.gsap.set(
        [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 16;
    const dur = isMobile ? 0.35 : 0.40;
    const stagger = isMobile ? 0.06 : 0.08;

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: approach,
        start: 'top 85%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && self.progress === 1) {
            tl.progress(1);
          }
        }
      },
      onComplete: () => {
        approachHasAnimated = true;
        window.gsap.set(
          [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: yDist + 6 },
        { opacity: 1, y: 0, duration: dur + 0.06 },
        0.08
      );
    }

    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0.18
      );
    }

    if (stepItems.length) {
      tl.fromTo(stepItems,
        { opacity: 0, y: yDist + 6 },
        { opacity: 1, y: 0, duration: dur + 0.05, stagger: stagger },
        0.28
      );
    }

    if (textLink) {
      tl.fromTo(textLink,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0.48
      );
    }

    if (approachImage) {
      tl.fromTo(approachImage,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur + 0.05 },
        0.58
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [approachImage, approachBadge, eyebrow, heading, copy, ...stepItems, textLink].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  approachMatchMedia = mm;
  return mm;
}

// Active Products motion instance for cleanup / reinit protection
let productsMatchMedia = null;
let productsHasAnimated = false;

/**
 * Phase 4.13: Products Interactive Motion Implementation.
 * Orchestrates technical hardware/coverage card reveal, section heading reveal,
 * natural reading order stagger (01 -> 02 -> 03 -> 04), and restrained hover interactions.
 */
export function initProductsMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const products = document.querySelector('.products, section.products, #products');
  if (!products) return null;

  // Clean up any previous products motion instance to prevent duplicate triggers
  if (productsMatchMedia) {
    productsMatchMedia.revert();
    productsMatchMedia = null;
  }

  const eyebrow = products.querySelector('.section-heading .eyebrow');
  const heading = products.querySelector('.section-heading h2');
  const copy = products.querySelector('.section-heading p');
  const productCards = Array.from(products.querySelectorAll('.products-grid .product-item, .products-grid .card--product'));

  // If already animated or if page loaded well past products section, settle immediately
  const isPastProducts = window.scrollY > (products.offsetTop + products.offsetHeight / 2);
  if (productsHasAnimated || isPastProducts) {
    productsHasAnimated = true;
    window.gsap.set(
      [eyebrow, heading, copy, ...productCards].filter(Boolean),
      { clearProps: 'all' }
    );
    return null;
  }

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Coordinated collection entrance (eyebrow -> heading -> copy -> 4 cards staggered)
  mm.add('(min-width: 901px)', () => {
    if (productsHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, copy, ...productCards].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: products,
        start: 'top 80%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && (self.progress === 1 || self.scroll() >= (products.offsetTop + products.offsetHeight / 2))) {
            tl.progress(1);
          }
        },
        onLeave: () => {
          tl.progress(1);
        }
      },
      onComplete: () => {
        productsHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, copy, ...productCards].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Section Eyebrow ("PROTECT WHAT MATTERS")
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35 },
        0
      );
    }

    // 2. Section Heading ("One team. Complete cover.")
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.48 },
        0.10
      );
    }

    // 3. Supporting Copy ("Integrated solutions for homes, offices and commercial properties.")
    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.40 },
        0.22
      );
    }

    // 4. Product Cards Collection (Staggered in natural left-to-right reading order: 01 -> 02 -> 03 -> 04)
    if (productCards.length) {
      tl.fromTo(productCards,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
        0.35
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, copy, ...productCards].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Streamlined responsive entrance
  mm.add('(max-width: 900px)', () => {
    if (productsHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, copy, ...productCards].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 18;
    const dur = isMobile ? 0.35 : 0.40;
    const stagger = isMobile ? 0.06 : 0.07;

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: products,
        start: 'top 80%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && (self.progress === 1 || self.scroll() >= (products.offsetTop + products.offsetHeight / 2))) {
            tl.progress(1);
          }
        },
        onLeave: () => {
          tl.progress(1);
        }
      },
      onComplete: () => {
        productsHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, copy, ...productCards].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: isMobile ? 10 : 14 },
        { opacity: 1, y: 0, duration: dur },
        0
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: yDist + 4 },
        { opacity: 1, y: 0, duration: dur + 0.05 },
        0.08
      );
    }

    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0.18
      );
    }

    if (productCards.length) {
      tl.fromTo(productCards,
        { opacity: 0, y: yDist + 6 },
        { opacity: 1, y: 0, duration: dur + 0.05, stagger: stagger },
        0.28
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, copy, ...productCards].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  productsMatchMedia = mm;
  return mm;
}

// Active Contact motion instance for cleanup / reinit protection
let contactMatchMedia = null;
let contactHasAnimated = false;

/**
 * Phase 4.14: Contact Motion Implementation.
 * Orchestrates conversion headline, supporting copy, contact channels,
 * and unified consultation form container reveal.
 */
export function initContactMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const contact = document.querySelector('.contact, section.contact, #contact');
  if (!contact) return null;

  // Clean up any previous contact motion instance
  if (contactMatchMedia) {
    contactMatchMedia.revert();
    contactMatchMedia = null;
  }

  const eyebrow = contact.querySelector('.contact-copy .eyebrow');
  const heading = contact.querySelector('.contact-copy h2');
  const copy = contact.querySelector('.contact-copy > p');
  const contactItems = Array.from(contact.querySelectorAll('.contact-details > a, .contact-details > div'));
  const formContainer = contact.querySelector('.contact-form');

  // If already animated or if page loaded past contact section, settle immediately
  const isPastContact = window.scrollY > (contact.offsetTop + contact.offsetHeight / 2);
  if (contactHasAnimated || isPastContact) {
    contactHasAnimated = true;
    window.gsap.set(
      [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
      { clearProps: 'all' }
    );
    return null;
  }

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): Coordinated 2-column layout (copy/details + composed form)
  mm.add('(min-width: 901px)', () => {
    if (contactHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: contact,
        start: 'top 80%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && (self.progress === 1 || self.scroll() >= (contact.offsetTop + contact.offsetHeight / 2))) {
            tl.progress(1);
          }
        },
        onLeave: () => {
          tl.progress(1);
        }
      },
      onComplete: () => {
        contactHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Eyebrow ("LET'S TALK SECURITY")
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35 },
        0
      );
    }

    // 2. Heading ("Ready to feel more secure?")
    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.48 },
        0.10
      );
    }

    // 3. Form container arrives smoothly alongside heading as composed interface
    if (formContainer) {
      tl.fromTo(formContainer,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.50 },
        0.18
      );
    }

    // 4. Supporting Copy
    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.40 },
        0.22
      );
    }

    // 5. Contact information channels (Call, Email, Serving Surat)
    if (contactItems.length) {
      tl.fromTo(contactItems,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.40, stagger: 0.07 },
        0.30
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Sequential vertical flow
  mm.add('(max-width: 900px)', () => {
    if (contactHasAnimated) {
      window.gsap.set(
        [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 16;
    const dur = isMobile ? 0.35 : 0.40;

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: contact,
        start: 'top 80%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && (self.progress === 1 || self.scroll() >= (contact.offsetTop + contact.offsetHeight / 2))) {
            tl.progress(1);
          }
        },
        onLeave: () => {
          tl.progress(1);
        }
      },
      onComplete: () => {
        contactHasAnimated = true;
        window.gsap.set(
          [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    if (eyebrow) {
      tl.fromTo(eyebrow,
        { opacity: 0, y: isMobile ? 10 : 14 },
        { opacity: 1, y: 0, duration: dur },
        0
      );
    }

    if (heading) {
      tl.fromTo(heading,
        { opacity: 0, y: yDist + 4 },
        { opacity: 1, y: 0, duration: dur + 0.05 },
        0.08
      );
    }

    if (copy) {
      tl.fromTo(copy,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur },
        0.18
      );
    }

    if (contactItems.length) {
      tl.fromTo(contactItems,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur, stagger: 0.06 },
        0.26
      );
    }

    if (formContainer) {
      tl.fromTo(formContainer,
        { opacity: 0, y: yDist + 6 },
        { opacity: 1, y: 0, duration: dur + 0.05 },
        0.36
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [eyebrow, heading, copy, ...contactItems, formContainer].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  contactMatchMedia = mm;
  return mm;
}

// Active Footer motion instance for cleanup / reinit protection
let footerMatchMedia = null;
let footerHasAnimated = false;

/**
 * Phase 4.14: Footer Motion Implementation.
 * Orchestrates calm conclusion to page journey with multi-column reveal
 * (brand, navigation, contact, and copyright bottom bar).
 */
export function initFooterMotion() {
  if (!state.isGsapAvailable || state.prefersReducedMotion || !window.gsap) {
    return null;
  }

  const footer = document.querySelector('.site-footer, footer');
  if (!footer) return null;

  // Clean up any previous footer motion instance
  if (footerMatchMedia) {
    footerMatchMedia.revert();
    footerMatchMedia = null;
  }

  const footerBrand = footer.querySelector('.footer-brand');
  const footerNav = footer.querySelector('.footer-nav');
  const footerContact = footer.querySelector('.footer-contact');
  const footerBottom = footer.querySelector('.footer-bottom');
  const columns = [footerBrand, footerNav, footerContact].filter(Boolean);

  // If already animated or if page loaded past footer, settle immediately
  const isPastFooter = window.scrollY > (footer.offsetTop + footer.offsetHeight / 2);
  if (footerHasAnimated || isPastFooter) {
    footerHasAnimated = true;
    window.gsap.set(
      [...columns, footerBottom].filter(Boolean),
      { clearProps: 'all' }
    );
    return null;
  }

  const mm = window.gsap.matchMedia();

  // Desktop (>= 901px): 3-column coordinated entrance + copyright bottom bar
  mm.add('(min-width: 901px)', () => {
    if (footerHasAnimated) {
      window.gsap.set(
        [...columns, footerBottom].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: footer,
        start: 'top 88%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && (self.progress === 1 || self.scroll() >= (footer.offsetTop + footer.offsetHeight / 2))) {
            tl.progress(1);
          }
        },
        onLeave: () => {
          tl.progress(1);
        }
      },
      onComplete: () => {
        footerHasAnimated = true;
        window.gsap.set(
          [...columns, footerBottom].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    // 1. Multi-column group entrance
    if (columns.length) {
      tl.fromTo(columns,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 },
        0
      );
    }

    // 2. Footer bottom copyright bar
    if (footerBottom) {
      tl.fromTo(footerBottom,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        0.20
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [...columns, footerBottom].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  // Tablet & Mobile (<= 900px): Vertical stack entrance
  mm.add('(max-width: 900px)', () => {
    if (footerHasAnimated) {
      window.gsap.set(
        [...columns, footerBottom].filter(Boolean),
        { clearProps: 'all' }
      );
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const yDist = isMobile ? 12 : 14;
    const dur = isMobile ? 0.35 : 0.40;

    const tl = window.gsap.timeline({
      defaults: {
        ease: MOTION_TOKENS.ease.entrance
      },
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        once: true,
        fastScrollEnd: true,
        onEnter: (self) => {
          if (self && (self.progress === 1 || self.scroll() >= (footer.offsetTop + footer.offsetHeight / 2))) {
            tl.progress(1);
          }
        },
        onLeave: () => {
          tl.progress(1);
        }
      },
      onComplete: () => {
        footerHasAnimated = true;
        window.gsap.set(
          [...columns, footerBottom].filter(Boolean),
          { clearProps: 'transform,opacity' }
        );
      }
    });

    if (columns.length) {
      tl.fromTo(columns,
        { opacity: 0, y: yDist },
        { opacity: 1, y: 0, duration: dur, stagger: 0.05 },
        0
      );
    }

    if (footerBottom) {
      tl.fromTo(footerBottom,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: dur },
        0.18
      );
    }

    return () => {
      tl.kill();
      window.gsap.set(
        [...columns, footerBottom].filter(Boolean),
        { clearProps: 'all' }
      );
    };
  });

  footerMatchMedia = mm;
  return mm;
}

// ============================================================================
// 5. Main Initialization Controller
// ============================================================================
export function initMotion() {
  if (state.isInitialized) return state;

  try {
    // 1. Detect environment and user preferences
    state.device = getDeviceTier();
    checkReducedMotion();

    // 2. Setup GSAP & ScrollTrigger with safe fallback
    setupGsapEngine();

    // 3. Bind resize listener for device tier updates
    window.addEventListener('resize', () => {
      const newDevice = getDeviceTier();
      if (newDevice !== state.device) {
        state.device = newDevice;
        applyDocumentAttributes();
      }
    }, { passive: true });

    // 4. Update document state
    applyDocumentAttributes();

    // 5. Initialize active Phase 4.8 Header & Navigation Motion
    initHeaderMotion();

    // 6. Initialize active Phase 4.9 Hero Motion & Interactive Elements
    initHeroMotion();

    // 7. Initialize active Phase 4.10 About + Trust Motion
    initAboutMotion();

    // 8. Initialize active Phase 4.11 Services Interactive Motion
    initServicesMotion();

    // 9. Initialize active Phase 4.12 Approach / Process Motion
    initApproachMotion();

    // 10. Initialize active Phase 4.13 Products Interactive Motion
    initProductsMotion();

    // 11. Initialize active Phase 4.14 Contact + Footer Motion
    initContactMotion();
    initFooterMotion();

    state.isInitialized = true;

    // Log foundation status (silent in production, informative in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.info(
        `%c[PROVITECH Motion]%c Complete Motion System Initialized & Locked (Phase 4.15). GSAP: ${state.isGsapAvailable ? 'v' + window.gsap.version : 'NO'}, ScrollTrigger: ${state.isScrollTriggerAvailable ? 'YES' : 'NO'}, Reduced-Motion: ${state.prefersReducedMotion ? 'ACTIVE' : 'NO'}, Device: ${state.device}`,
        'color: #009DFF; font-weight: bold;',
        'color: inherit;'
      );
    }
  } catch (error) {
    // Catch-all safety: Ensure failure NEVER prevents website operation
    console.error('[PROVITECH Motion] Unexpected error during motion initialization:', error);
    state.isGsapAvailable = false;
    state.isScrollTriggerAvailable = false;
    applyDocumentAttributes();
  }

  return state;
}

export const initMotionSystem = initMotion;

// ============================================================================
// 6. Central Public API Namespace (Exposed on window.PROVITECH_MOTION)
// ============================================================================
export const PROVITECH_MOTION = Object.freeze({
  get state() { return { ...state }; },
  tokens: MOTION_TOKENS,
  init: initMotion,
  initMotionSystem: initMotion,
  // Section module controllers
  initHeaderMotion,
  animateMobileMenu,
  resetMobileMenu,
  initHeroMotion,
  initAboutMotion,
  initServicesMotion,
  initApproachMotion,
  initProductsMotion,
  initContactMotion,
  initFooterMotion
});

// Attach single public namespace for browser access and testing
if (typeof window !== 'undefined') {
  window.PROVITECH_MOTION = PROVITECH_MOTION;
}

export default PROVITECH_MOTION;
