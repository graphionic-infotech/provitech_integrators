/**
 * PROVITECH INTEGRATORS — Brand Guidelines Module
 * Handles clipboard copy for color swatches and Brand Guidelines mobile menu.
 */

export function initBrandGuidelines() {
  // 1. One-Click Copy HEX Functionality
  const copyButtons = document.querySelectorAll('.bg-copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const hex = btn.getAttribute('data-hex');
      if (!hex) return;

      let success = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(hex);
          success = true;
        } else {
          fallbackCopyText(hex);
          success = true;
        }
      } catch (err) {
        fallbackCopyText(hex);
        success = true;
      }

      if (success) {
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <svg class="icon icon--check" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5"></path>
          </svg> Copied
        `;
        btn.classList.add('is-copied');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('is-copied');
        }, 1500);
      }
    });
  });

  function fallbackCopyText(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  // 2. Brand Guidelines Mobile Navigation
  const bgMenuToggle = document.querySelector('.bg-menu-toggle');
  const bgNav = document.querySelector('.bg-nav');

  if (bgMenuToggle && bgNav) {
    let isBgMenuOpen = false;

    function toggleBgMenu(forceClose = false) {
      const nextState = forceClose ? false : !isBgMenuOpen;
      if (nextState === isBgMenuOpen) return;
      isBgMenuOpen = nextState;

      bgMenuToggle.setAttribute('aria-expanded', String(isBgMenuOpen));
      bgMenuToggle.classList.toggle('is-active', isBgMenuOpen);
      document.body.classList.toggle('menu-open', isBgMenuOpen);

      if (isBgMenuOpen) {
        bgNav.classList.add('is-open');
        if (window.PROVITECH_MOTION?.animateMobileMenu) {
          window.PROVITECH_MOTION.animateMobileMenu(true, bgNav);
        }
      } else {
        if (window.PROVITECH_MOTION?.animateMobileMenu) {
          window.PROVITECH_MOTION.animateMobileMenu(false, bgNav, () => {
            if (!isBgMenuOpen) {
              bgNav.classList.remove('is-open');
            }
          });
        } else {
          bgNav.classList.remove('is-open');
        }
      }
    }

    bgMenuToggle.addEventListener('click', () => toggleBgMenu());

    // Close on link click
    bgNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (isBgMenuOpen) {
          toggleBgMenu(true);
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isBgMenuOpen) {
        toggleBgMenu(true);
        bgMenuToggle.focus();
      }
    });

    // Reset on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && isBgMenuOpen) {
        isBgMenuOpen = false;
        bgNav.classList.remove('is-open');
        bgMenuToggle.classList.remove('is-active');
        bgMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        if (window.PROVITECH_MOTION?.resetMobileMenu) {
          window.PROVITECH_MOTION.resetMobileMenu(bgNav);
        }
      }
    }, { passive: true });
  }

  // 3. Interactive Navigation Specimen Replay
  const replayBtn = document.getElementById('btn-replay-nav-motion');
  const specimenStage = document.getElementById('nav-specimen-stage');

  if (replayBtn && specimenStage) {
    const specimenLinks = specimenStage.querySelectorAll('.bg-specimen-link');
    const specimenCta = specimenStage.querySelector('.bg-specimen-cta');

    replayBtn.addEventListener('click', () => {
      if (window.gsap) {
        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set([specimenLinks, specimenCta].filter(Boolean), { clearProps: 'all' });
          }
        });

        tl.fromTo(specimenLinks,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.25, stagger: 0.05 }
        );

        if (specimenCta) {
          tl.fromTo(specimenCta,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.25 },
            '-=0.15'
          );
        }
      }
    });
  }

  // 4. Interactive Hero Specimen Replay
  const replayHeroBtn = document.getElementById('btn-replay-hero-motion');
  const heroStage = document.getElementById('hero-specimen-stage');

  if (replayHeroBtn && heroStage) {
    const kickerLine = heroStage.querySelector('.bg-specimen-kicker-line');
    const kickerText = heroStage.querySelector('.bg-specimen-kicker-text');
    const titleLines = heroStage.querySelectorAll('.bg-specimen-title-line');
    const desc = heroStage.querySelector('.bg-specimen-desc');
    const primaryBtn = heroStage.querySelector('.bg-specimen-primary-btn');
    const linkCta = heroStage.querySelector('.bg-specimen-link-cta');

    replayHeroBtn.addEventListener('click', () => {
      if (window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set(
              [kickerText, ...titleLines, desc, primaryBtn, linkCta].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          }
        });

        if (kickerLine) {
          tl.fromTo(kickerLine,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.30 }
          );
        }
        if (kickerText) {
          tl.fromTo(kickerText,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35 },
            '-=0.15'
          );
        }
        if (titleLines.length >= 2) {
          tl.fromTo(titleLines[0],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.45 },
            '-=0.10'
          );
          tl.fromTo(titleLines[1],
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.45 },
            '-=0.20'
          );
        }
        if (desc) {
          tl.fromTo(desc,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.40 },
            '-=0.15'
          );
        }
        if (primaryBtn) {
          tl.fromTo(primaryBtn,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35 },
            '-=0.15'
          );
        }
        if (linkCta) {
          tl.fromTo(linkCta,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35 },
            '-=0.20'
          );
        }
      }
    });
  }

  // 5. Interactive About + Trust Specimen Replay
  const replayAboutBtn = document.getElementById('btn-replay-about-motion');
  const aboutStage = document.getElementById('about-specimen-stage');

  if (replayAboutBtn && aboutStage) {
    const eyebrow = aboutStage.querySelector('.bg-specimen-eyebrow');
    const heading = aboutStage.querySelector('.bg-specimen-about-h3');
    const paragraphs = Array.from(aboutStage.querySelectorAll('.bg-specimen-about-p'));
    const pillarsContainer = aboutStage.querySelector('.bg-about-specimen-pillars');
    const pillarItems = Array.from(aboutStage.querySelectorAll('.bg-about-specimen-pillar'));
    const link = aboutStage.querySelector('.bg-specimen-about-link');

    replayAboutBtn.addEventListener('click', () => {
      if (window.gsap) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.gsap.set(
            [eyebrow, heading, ...paragraphs, pillarsContainer, ...pillarItems, link].filter(Boolean),
            { clearProps: 'all' }
          );
          return;
        }

        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set(
              [eyebrow, heading, ...paragraphs, ...pillarItems, link].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          }
        });

        if (eyebrow) {
          tl.fromTo(eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.30 },
            0
          );
        }
        if (heading) {
          tl.fromTo(heading,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38 },
            0.08
          );
        }
        if (paragraphs.length) {
          tl.fromTo(paragraphs,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
            0.18
          );
        }
        if (pillarItems.length) {
          tl.fromTo(pillarItems,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.32, stagger: 0.06 },
            0.28
          );
        }
        if (link) {
          tl.fromTo(link,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.30 },
            0.40
          );
        }
      }
    });
  }

  // 6. Interactive Services Specimen Replay
  const replayServicesBtn = document.getElementById('btn-replay-services-motion');
  const servicesStage = document.getElementById('services-specimen-stage');

  if (replayServicesBtn && servicesStage) {
    const eyebrow = servicesStage.querySelector('.bg-specimen-eyebrow');
    const heading = servicesStage.querySelector('.bg-specimen-services-h3');
    const copy = servicesStage.querySelector('.bg-specimen-services-p');
    const serviceItems = Array.from(servicesStage.querySelectorAll('.bg-specimen-service-item'));

    replayServicesBtn.addEventListener('click', () => {
      if (window.gsap) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.gsap.set(
            [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
            { clearProps: 'all' }
          );
          return;
        }

        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set(
              [eyebrow, heading, copy, ...serviceItems].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          }
        });

        if (eyebrow) {
          tl.fromTo(eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.30 },
            0
          );
        }
        if (heading) {
          tl.fromTo(heading,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38 },
            0.08
          );
        }
        if (copy) {
          tl.fromTo(copy,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.18
          );
        }
        if (serviceItems.length) {
          tl.fromTo(serviceItems,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.38, stagger: 0.08 },
            0.28
          );
        }
      }
    });
  }

  // 7. Interactive Approach / Process Specimen Replay
  const replayApproachBtn = document.getElementById('btn-replay-approach-motion');
  const approachStage = document.getElementById('approach-specimen-stage');

  if (replayApproachBtn && approachStage) {
    const eyebrow = approachStage.querySelector('.bg-specimen-eyebrow');
    const heading = approachStage.querySelector('.bg-specimen-approach-h3');
    const copy = approachStage.querySelector('.bg-specimen-approach-p');
    const stepItems = Array.from(approachStage.querySelectorAll('.bg-specimen-approach-item'));
    const link = approachStage.querySelector('.bg-specimen-approach-link');

    replayApproachBtn.addEventListener('click', () => {
      if (window.gsap) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.gsap.set(
            [eyebrow, heading, copy, ...stepItems, link].filter(Boolean),
            { clearProps: 'all' }
          );
          return;
        }

        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set(
              [eyebrow, heading, copy, ...stepItems, link].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          }
        });

        if (eyebrow) {
          tl.fromTo(eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.30 },
            0
          );
        }
        if (heading) {
          tl.fromTo(heading,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38 },
            0.08
          );
        }
        if (copy) {
          tl.fromTo(copy,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.18
          );
        }
        if (stepItems.length) {
          tl.fromTo(stepItems,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.38, stagger: 0.08 },
            0.28
          );
        }
        if (link) {
          tl.fromTo(link,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.30 },
            0.48
          );
        }
      }
    });
  }

  // 8. Interactive Products Specimen Replay
  const replayProductsBtn = document.getElementById('btn-replay-products-motion');
  const productsStage = document.getElementById('products-specimen-stage');

  if (replayProductsBtn && productsStage) {
    const eyebrow = productsStage.querySelector('.bg-specimen-eyebrow');
    const heading = productsStage.querySelector('.bg-specimen-products-h3');
    const copy = productsStage.querySelector('.bg-specimen-products-p');
    const productCards = Array.from(productsStage.querySelectorAll('.bg-specimen-product-item'));

    replayProductsBtn.addEventListener('click', () => {
      if (window.gsap) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.gsap.set(
            [eyebrow, heading, copy, ...productCards].filter(Boolean),
            { clearProps: 'all' }
          );
          return;
        }

        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set(
              [eyebrow, heading, copy, ...productCards].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          }
        });

        if (eyebrow) {
          tl.fromTo(eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.30 },
            0
          );
        }
        if (heading) {
          tl.fromTo(heading,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38 },
            0.08
          );
        }
        if (copy) {
          tl.fromTo(copy,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.18
          );
        }
        if (productCards.length) {
          tl.fromTo(productCards,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38, stagger: 0.08 },
            0.28
          );
        }
      }
    });
  }

  // 9. Interactive Contact + Footer Specimen Replay
  const replayContactBtn = document.getElementById('btn-replay-contact-motion');
  const contactStage = document.getElementById('contact-specimen-stage');

  if (replayContactBtn && contactStage) {
    const eyebrow = contactStage.querySelector('.bg-specimen-eyebrow');
    const heading = contactStage.querySelector('.bg-specimen-contact-h3');
    const copy = contactStage.querySelector('.bg-specimen-contact-p');
    const channels = contactStage.querySelector('.bg-specimen-contact-channels');
    const formCard = contactStage.querySelector('.bg-specimen-form-card');
    const miniFooter = contactStage.querySelector('.bg-specimen-mini-footer');

    replayContactBtn.addEventListener('click', () => {
      if (window.gsap) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          window.gsap.set(
            [eyebrow, heading, copy, channels, formCard, miniFooter].filter(Boolean),
            { clearProps: 'all' }
          );
          return;
        }

        const tl = window.gsap.timeline({
          defaults: {
            ease: 'power3.out'
          },
          onComplete: () => {
            window.gsap.set(
              [eyebrow, heading, copy, channels, formCard, miniFooter].filter(Boolean),
              { clearProps: 'transform,opacity' }
            );
          }
        });

        if (eyebrow) {
          tl.fromTo(eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.30 },
            0
          );
        }
        if (heading) {
          tl.fromTo(heading,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38 },
            0.08
          );
        }
        if (formCard) {
          tl.fromTo(formCard,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.40 },
            0.15
          );
        }
        if (copy) {
          tl.fromTo(copy,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.18
          );
        }
        if (channels) {
          tl.fromTo(channels,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.26
          );
        }
        if (miniFooter) {
          tl.fromTo(miniFooter,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.35
          );
        }
      }
    });
  }
}


