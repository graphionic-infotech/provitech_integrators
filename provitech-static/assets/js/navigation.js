/**
 * PROVITECH INTEGRATORS — Navigation Module
 * Handles mobile drawer toggle, ARIA states, keyboard traps, sticky header elevation,
 * and seamless coordination with the motion controller.
 */

export function initNavigation() {
  const siteHeader = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!menuToggle || !mainNav) return;

  let isMenuOpen = false;

  function toggleMenu(forceClose = false) {
    const nextState = forceClose ? false : !isMenuOpen;
    if (nextState === isMenuOpen) return;
    isMenuOpen = nextState;

    // 1. Accessibility & ARIA updates
    menuToggle.classList.toggle('is-active', isMenuOpen);
    menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
    document.body.classList.toggle('menu-open', isMenuOpen);

    // 2. Coordinated Animation & Functional State
    if (isMenuOpen) {
      mainNav.classList.add('is-open');
      if (window.PROVITECH_MOTION?.animateMobileMenu) {
        window.PROVITECH_MOTION.animateMobileMenu(true, mainNav);
      }
    } else {
      if (window.PROVITECH_MOTION?.animateMobileMenu) {
        window.PROVITECH_MOTION.animateMobileMenu(false, mainNav, () => {
          if (!isMenuOpen) {
            mainNav.classList.remove('is-open');
          }
        });
      } else {
        mainNav.classList.remove('is-open');
      }
    }
  }

  // Hamburger button click
  menuToggle.addEventListener('click', () => toggleMenu());

  // Close menu on link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu(true);
      }
    });
  });

  // Close on Escape key and return focus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu(true);
      menuToggle.focus();
    }
  });

  // Responsive breakpoint reset (>900px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && isMenuOpen) {
      isMenuOpen = false;
      mainNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (window.PROVITECH_MOTION?.resetMobileMenu) {
        window.PROVITECH_MOTION.resetMobileMenu(mainNav);
      }
    }
  }, { passive: true });

  // Sticky header scroll elevation
  if (siteHeader) {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      siteHeader.classList.toggle('is-scrolled', isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }
}
