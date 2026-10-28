# DESIGN SYSTEM SPECIFICATION — PROVITECH INTEGRATORS
### Phase 2: Centralized Brand Design System (Locked Specification)

This document defines the centralized design tokens, variables, and component foundations established in Phase 2 for the static web architecture.

---

## 1. Official Color Tokens (`assets/css/variables.css`)

```css
:root {
  /* =========================
     OFFICIAL BRAND PALETTE
  ========================== */
  --color-charcoal: #25282D; /* Primary Charcoal: Dark foundations, footer, primary text */
  --color-blue:     #009DFF; /* Electric Blue: Primary actions, links, active states, highlights */
  --color-navy:     #061B49; /* Deep Navy: Premium dark sections, strong headings, technical accents */
  --color-white:    #FFFFFF; /* Pure White: Clean canvas, cards, text on dark backgrounds */
  --color-light:    #F1F5F9; /* Light Grey: Alternate sections, soft cards, subtle panels */
  --color-slate:    #374151; /* Slate Grey: Body text, secondary text, descriptions */

  /* =========================
     SEMANTIC COLOR TOKENS
  ========================== */
  --color-bg:               var(--color-white);
  --color-bg-alt:           var(--color-light);
  --color-bg-surface:       var(--color-white);
  --color-bg-dark:          var(--color-charcoal);
  --color-bg-navy:          var(--color-navy);
  --color-bg-input:         #F8FAFC;
  --color-bg-input-focus:   var(--color-white);
  --color-bg-badge:         #EFF9FF;

  --color-text:             var(--color-slate);
  --color-text-main:        var(--color-charcoal);
  --color-text-muted:       var(--color-slate);
  --color-text-inverse:     var(--color-white);
  --color-text-inverse-muted: #CBD5E1;
  --color-text-heading:     var(--color-charcoal);
  --color-text-navy:        var(--color-navy);
  --color-text-accent:      var(--color-blue);

  --color-primary:          var(--color-blue);
  --color-primary-hover:    #0082D6;
  --color-primary-light:    #33AFFF;
  --color-secondary:        var(--color-navy);
  --color-secondary-hover:  #0A2968;

  --color-border:           #E2E8F0;
  --color-border-subtle:    #D3DBE5;
  --color-border-strong:    #CBD5E1;
  --color-border-dark:      #374151;

  --color-dark-section:     var(--color-charcoal);
  --color-dark-section-alt: var(--color-navy);

  --color-focus:            var(--color-blue);
  --color-focus-ring:       rgba(0, 157, 255, 0.28);

  --color-error:            #EF4444;
  --color-error-bg:         #FEF2F2;
  --color-error-text:       #991B1B;
}
```

---

## 2. Typography System (Montserrat)

Montserrat is locked as the primary typeface with zero fallback dependencies on legacy fonts.

### Approved Weights
- **`400` Regular:** Body copy, secondary text, form placeholders
- **`500` Medium:** Topline badges, metadata tags, subtitles
- **`600` SemiBold:** Main navigation links, subsection titles (H4), form labels
- **`700` Bold:** Section titles (H2), card titles (H3), primary CTA buttons
- **`800` ExtraBold:** Hero display statements (H1), brand accents

### Hierarchy & Scale Tokens
```css
:root {
  --font-primary: "Montserrat", Arial, sans-serif;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-extrabold: 800;

  --font-size-xs:   0.75rem;    /* 12px */
  --font-size-sm:   0.875rem;   /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg:   1.125rem;   /* 18px */
  --font-size-xl:   1.25rem;    /* 20px */
  --font-size-2xl:  1.5rem;     /* 24px */
  --font-size-3xl:  1.75rem;    /* 28px */
  --font-size-4xl:  2.25rem;    /* 36px */
  --font-size-5xl:  3rem;       /* 48px */

  /* Line Heights */
  --line-height-display: 1.08;  /* Hero display: 1.05 – 1.12 */
  --line-height-heading: 1.2;   /* Headings: 1.1 – 1.25 */
  --line-height-snug:    1.35;
  --line-height-body:    1.65;  /* Body copy: 1.6 – 1.75 */
  --line-height-ui:      1.45;  /* Small UI elements: 1.4 – 1.5 */

  /* Letter Spacing */
  --letter-spacing-tight:   -0.03em;
  --letter-spacing-normal:  0;
  --letter-spacing-wide:    0.04em;
  --letter-spacing-eyebrow: 0.2em;
  --letter-spacing-kicker:  0.28em;
}
```

---

## 3. Spacing System (8-Point Harmonic Scale)

```css
:root {
  --space-1:  0.25rem;  /* 4px */
  --space-2:  0.5rem;   /* 8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  --section-pad-sm: clamp(3.5rem, 6vw, 4.5rem);  /* 56px–72px */
  --section-pad-lg: clamp(4.5rem, 8vw, 7.5rem);  /* 72px–120px */
}
```

---

## 4. Container & Layout System

```css
:root {
  --container-max: 1200px;
  --container-narrow: 840px;
  --header-height-desktop: 82px;
  --header-height-mobile:  70px;
  --topline-height:        32px;
}

.container {
  width: min(100% - 2rem, var(--container-max));
  margin-inline: auto;
}

.container--narrow {
  width: min(100% - 2rem, var(--container-narrow));
  margin-inline: auto;
}
```

---

## 5. Section Treatment System

```css
.section { padding: var(--section-pad-lg) 0; }
.section--white { background-color: var(--color-bg); color: var(--color-text); }
.section--light { background-color: var(--color-bg-alt); color: var(--color-text); }
.section--dark  { background-color: var(--color-dark-section); color: var(--color-white); }
.section--navy  { background-color: var(--color-dark-section-alt); color: var(--color-white); }
```

---

## 6. Button System

- **Primary CTA Foreground Rule:** **Electric Blue (`#009DFF`) background MUST ALWAYS use Pure White (`#FFFFFF`) text and Pure White (`#FFFFFF`) arrow icons.** Never use black or dark navy text/icons on the primary blue CTA.
- **Button Silhouette:** Inspired by the center-column silhouette of the capsule reference: clean, modern, strongly rounded continuous ends (capsule-inspired rectangle) without 3D bevels, gloss, red, or heavy glow. Flat and premium.
- **Size Variants:**
  - **Small (`.btn--sm`, `.header-cta`):** Height 42px, padding `10px 20px`, font-size `12px` (0.75rem), radius 20px (`var(--radius-control)`).
  - **Medium (`.btn`, `.btn--md`):** Height 48px, padding `13px 26px`, font-size `14px` (0.875rem), radius 24px (`var(--radius-btn)`).
  - **Large (`.btn--lg`, `.hero-btn-primary`):** Height 52px, padding `15px 32px`, font-size `15px` (0.9375rem), radius 26px (`var(--radius-btn-lg)`).
- **Typography:** Montserrat 700 uppercase with `letter-spacing: 0.05em–0.08em`.
- **Variants:**
  - `.btn--primary`: Electric Blue (`#009DFF`), Pure White text (`#FFFFFF`), Pure White icon (`#FFFFFF`). Hover: Deeper PROVITECH Blue (`#0082D6`), white text, subtle 2px lift, 3px right arrow slide, restrained shadow (`0 4px 14px rgba(0, 157, 255, 0.30)`). Active: `#0070BA`.
  - `.btn--secondary`: Deep Navy (`#061B49`), White text, hover `#0A2968`.
  - `.btn--light`: White (`#FFFFFF`), Deep Navy text, hover `#F1F5F9`.
  - `.btn--text`: Borderless text action with arrow and border-bottom accent.
- **Disabled State:** Accessible disabled state (`#88CEFF` background, `#FFFFFF` text, `opacity: 0.75`, `cursor: not-allowed`).

---

## 7. Card System

- **Base (`.card`):** Neutral border (`var(--color-border)`), 16px radius (`var(--radius-lg)`), 24px padding, smooth elevation hover.
- **Service Cards (`.card--service` / `.service-item`):** 16px radius (`var(--radius-lg)`), `overflow: hidden`, 12px icon wrap badge, navy heading, blue hover arrow.
- **Product Cards (`.card--product` / `.product-item`):** 16px radius (`var(--radius-lg)`), `overflow: hidden`, 12px media container, 12px top-left action badge.
- **Trust Pillars (`.intro-pillars`):** 12px radius (`var(--radius-md)`), 2-column highlight grid.

---

## 8. Form System

- **Input / Select / Textarea:** Height 48px, background `#F8FAFC`, border `#CBD5E1`, radius 12px (`var(--radius-md)`).
- **Focus state:** Background `#FFFFFF`, border `#009DFF`, box-shadow `0 0 0 3px rgba(0, 157, 255, 0.28)`.
- **Validation feedback:** Inline alert cards (`.form-feedback--info`, `.form-feedback--error`), radius 12px (`var(--radius-md)`).
- **Form Container (`.contact-form`):** Radius 20px (`var(--radius-xl)`), dual-layer soft elevation.

---

## 9. Elevation, Radius & Motion

```css
:root {
  /* Shadows */
  --shadow-sm:       0 1px 3px rgba(6, 27, 73, 0.06);
  --shadow-md:       0 4px 14px rgba(6, 27, 73, 0.08);
  --shadow-lg:       0 12px 30px rgba(6, 27, 73, 0.10);
  --shadow-scrolled: 0 8px 25px rgba(6, 27, 73, 0.08);
  --shadow-form:     0 20px 50px rgba(6, 27, 73, 0.07);

  /* Border Radii & Shape Language */
  --radius-xs:      4px;    /* Micro-indicators, dots, subtle borders */
  --radius-sm:      8px;    /* Badges, chips, small controls, number markers */
  --radius-md:      12px;   /* Form inputs, selects, textareas, trust pillars */
  --radius-lg:      16px;   /* Service cards, product cards, brand manual cards */
  --radius-xl:      20px;   /* Large cards, contact form container, approach image */
  --radius-2xl:     24px;   /* Medium buttons capsule-end, feature panels */
  --radius-control: 20px;   /* Small buttons, header CTA capsule silhouette */
  --radius-btn:     24px;   /* Medium/default button capsule radius (48px height) */
  --radius-btn-lg:  26px;   /* Large hero conversion CTA capsule radius (52px height) */
  --radius-pill:    999px;  /* Full pill badges, eyebrow chips, floating pills */
  --radius-full:    var(--radius-pill);

  /* Motion Duration Tokens (Phase 4.7) */
  --motion-duration-micro:    180ms; /* Micro-interactions, icons, arrows */
  --motion-duration-fast:     250ms; /* Button hovers, mobile drawer toggle */
  --motion-duration-standard: 400ms; /* Standard scroll reveals, card entrances */
  --motion-duration-slow:     650ms; /* Complex section reveals */
  --motion-duration-story:    950ms; /* Controlled hero storytelling */

  /* Easing Vocabulary */
  --motion-ease-standard: cubic-bezier(0.25, 1, 0.5, 1);  /* power2.out */
  --motion-ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);  /* power3.out */
  --motion-ease-exit:     cubic-bezier(0.4, 0, 1, 1);     /* power2.in */
  --motion-ease-emphasis: cubic-bezier(0.65, 0, 0.35, 1); /* power2.inOut */

  /* Motion Limits */
  --motion-distance-sm: 12px;
  --motion-distance-md: 24px;
  --motion-distance-lg: 40px;
  --motion-scale-press: 0.98;
  --motion-scale-hover: 1.02;
  --motion-scale-max:   1.03;

  /* Z-Index */
  --z-base:     1;
  --z-elevated: 10;
  --z-sticky:   50;
  --z-drawer:   60;
  --z-modal:    100;
}
```

---

## 10. PROVITECH Shape Language Specification

The official shape language of ProviTech Integrators establishes a modern, approachable, and technically refined aesthetic that eliminates harsh boxiness while maintaining industrial precision.

| Radius Token | Value | Target Components | Design Rationale |
|---|---|---|---|
| `--radius-sm` | `8px` | `.approach-list-num`, `.menu-toggle`, `.bg-copy` | Compact controls; subtle curvature without losing technical density. |
| `--radius-md` | `12px` | `.form-control`, `.intro-pillars`, `.service-icon-wrap` | Form inputs and trust cards; ergonomic and clean. |
| `--radius-lg` | `16px` | `.service-item`, `.product-item`, `.bg-color-card`, `.bg-ui-card` | Primary content cards; distinct surfaces with refined corners. |
| `--radius-xl` | `20px` | `.contact-form`, `.approach-image`, `.bg-logo-hero` | High-prominence focal containers; creates clear visual hierarchy. |
| `--radius-control` | `20px` | `.btn--sm`, `.header-cta` (42px height) | Small button capsule silhouette with strongly rounded continuous ends. |
| `--radius-btn` | `24px` | `.btn`, `.btn--md` (48px height) | Medium button capsule-inspired silhouette; 24px perfectly rounds 48px ends. |
| `--radius-btn-lg` | `26px` | `.btn--lg`, `.hero-btn-primary`, `.nav-mobile-cta` (52px) | Large hero conversion button; smooth continuous capsule curves. |
| `--radius-pill` | `999px` | `.approach-badge`, status badges, floating indicator chips | Human-scale pill geometry reserved strictly for status chips. |

### Shape Rules & Motion Stability
1. **Button vs Card vs Pill Differentiation:**
   - **Buttons:** Strongly rounded capsule-inspired rectangles (`20px–26px`).
   - **Cards:** Premium rounded rectangles (`16px–20px`). Cards are **NOT** pills.
   - **Chips:** Full pill geometry (`999px`). Reserved strictly for single-line status badges and chips.
2. **Parent-Child Overflow Protection:** Always set `overflow: hidden` on cards with child images or background fills (`.service-item`, `.product-item`, `.approach-image`). This guarantees that future GSAP scale/hover transforms will never bleed square image pixels outside curved container bounds.
3. **When NOT to Use Rounded Geometry:**
   - **Full-Width Section Banners:** Sections (`.hero`, `.services`, `.products`, `.contact`, `.site-footer`) remain 0px straight architectural bands across the full viewport.
   - **No Deep Nesting:** Never place a rounded card inside another rounded card with conflicting corner radii.
   - **No Pill Content Cards:** Never convert large paragraph or content cards into pills; pills are strictly for single-line badges and chips.

---

## 11. PROVITECH Motion Engine & Interaction Architecture (Phase 4.7)

The official ProviTech motion system is established as an engineered progressive enhancement powered by **GSAP Core 3.12.5** and **ScrollTrigger 3.12.5** without build tooling dependencies.

### Motion Levels

1. **Level 1 — Micro-Interactions (Pure CSS):**
   - Applies to buttons, links, form focus states, and arrow nudges.
   - Driven by native CSS transitions (`var(--transition-fast)`).
   - Zero JavaScript runtime overhead.
2. **Level 2 — Entrance & Reveal (GSAP + ScrollTrigger):**
   - Viewport-aware content reveals triggered once per session (`once: true`).
   - Standard 400ms duration, `power3.out` deceleration ease, 12px–24px vertical translations.
   - Elements are 100% visible by default; animated via runtime `gsap.from(...)`.
3. **Level 3 — Storytelling & Narrative (GSAP Timelines):**
   - Reserved strictly for high-impact brand sequences (Hero narrative, process walkthroughs).
   - Requires explicit phase-gate approval (strictly locked during Phase 4.7).

### Universal Guardrails
* **Reduced Motion:** Mandatory `prefers-reduced-motion: reduce` compliance skips all animations immediately.
* **Failure Safety:** If GSAP or JavaScript is disabled or fails to load, all content remains 100% readable and all forms/navigation remain completely operational.
* **Performance:** Strictly animate GPU-composited properties (`transform`, `opacity`). Never animate layout box metrics (`width`, `height`, `margin`, `padding`).
* **Detailed Manual:** Refer to [`docs/MOTION-SYSTEM.md`](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/MOTION-SYSTEM.md) for complete technical specifications.


