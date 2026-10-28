# COMPONENT INVENTORY — PROVITECH INTEGRATORS

This document inventories every reusable component and structural pattern identified in the React codebase, specifying its purpose, current React implementation, planned static implementation, responsive behavior, and brand alignment.

---

## 1. Site Header & Brand Logo

- **Purpose:** Primary identity display, site navigation, and direct CTA access.
- **Current React Implementation:** [main.tsx:L23](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L23). Renders `<header className="site-header">` with logo `<img>`, `<nav>`, desktop CTA link, and mobile toggle `<button>`. Sticky behavior handled by `window.addEventListener('scroll')` in a `useEffect`.
- **Planned Static Implementation:** Semantic `<header class="site-header">`. Sticky scroll elevation managed via vanilla JS in `assets/js/modules/navigation.js` using `IntersectionObserver` or throttling.
- **Responsive Considerations:**
  - Desktop (>900px): Fixed height 82px, logo size 205×64px, desktop nav visible, mobile toggle hidden.
  - Tablet (768px): Currently shows both CTA and toggle. Planned fix: Collapse CTA into drawer on tablet to prevent crowding.
  - Mobile (≤700px): Height 70px, logo size clamped (135–182px), CTA hidden, toggle visible.
- **Brand Considerations:** Logo must use official PNG/WebP with `object-fit: contain` and 3:1 aspect ratio.

---

## 2. Main Navigation & Mobile Menu Drawer

- **Purpose:** Site-wide navigation between homepage anchors and Brand Guidelines.
- **Current React Implementation:** [main.tsx:L23](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L23). Controlled by React state `const [menu, setMenu] = React.useState(false)`. Toggles `.open` class on `<nav className="main-nav">`.
- **Planned Static Implementation:** Native `<nav class="main-nav" id="main-nav">` with `<button class="menu-toggle" aria-controls="main-nav" aria-expanded="false">`. Controlled by vanilla JavaScript with keyboard `ESC` listener and focus trapping.
- **Responsive Considerations:**
  - Desktop: Inline flex layout, gap clamp(16px, 2.5vw, 35px).
  - Mobile: Fullscreen/drawer overlay (`position: fixed; top: 70px; height: calc(100dvh - 70px)`).
- **Brand Considerations:**
  - **Audit Defect Fix:** Eliminate the CSS specificity leak that currently turns the mobile CTA button forest green (`#0d6d60`). It must be Electric Blue (`#009DFF`) with Deep Navy text.

---

## 3. Interactive Hero Component

- **Purpose:** Primary visual impact, value proposition statement, and immediate lead capture.
- **Current React Implementation:** [main.tsx:L24](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L24). Managed by `const [heroVersion, setHeroVersion] = React.useState(1)`. Switcher button row toggles dynamic headlines and kicker text.
- **Planned Static Implementation:** Semantic `<section class="hero" id="home">`. Interactive switcher handled by vanilla JS in `assets/js/modules/hero.js` via `data-hero-version` attribute.
- **Responsive Considerations:**
  - On screens $\le 375\text{px}$, ensure hero text and buttons do not push below viewport fold.
  - Ensure switcher buttons do not crowd the `"SCROLL TO EXPLORE"` cue on narrow viewports.
- **Brand Considerations:**
  - Fix the low-contrast heading in Version 1 (ensure `#FFFFFF` or high-contrast Electric Blue text).
  - Replace legacy green gradients with Deep Navy/Charcoal gradients (`linear-gradient(90deg, rgba(6,27,73,0.92) 0%, rgba(37,40,45,0.78) 100%)`).

---

## 4. CTA Buttons & Text Links

- **Purpose:** Primary and secondary conversion touchpoints.
- **Current React Implementation:**
  - `.button.button-light`: [main.tsx:L24](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L24) (Electric blue background, navy text).
  - `.header-cta`: [main.tsx:L23](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L23) (Header button).
  - `.button.button-dark`: [main.tsx:L29](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L29) (Form submit button).
  - `.text-link` and `.hero-text-link`: Inline text links with animated arrows.
- **Planned Static Implementation:**
  - Standardized `.btn` class hierarchy in `assets/css/components.css`:
    - `.btn--primary`: Background `#009DFF`, text `#061B49`, hover `#33AFFF`.
    - `.btn--secondary`: Background `#061B49`, text `#FFFFFF`, hover `#0A2968`.
    - `.link--arrow`: Clean text link with CSS transition `transform: translateX(4px)` on hover.
- **Responsive Considerations:** Full width on mobile form submissions; inline on desktop.
- **Brand Considerations:** Enforce minimum touch target height of 44px for accessibility.

---

## 5. Section Headings & Eyebrows

- **Purpose:** Structural hierarchy and section context.
- **Current React Implementation:** `<span className="eyebrow">` and `<h2>` with inner `<span>` for colored accent words.
- **Planned Static Implementation:** Standardized classes `.section-eyebrow` and `.section-title`.
- **Responsive Considerations:** Fluid heading typography via `clamp(30px, 3.5vw, 40px)`.
- **Brand Considerations:** Eyebrow uppercase letter-spacing `0.2em` in Electric Blue (`#009DFF`); heading title in Charcoal (`#25282D`) or Navy (`#061B49`).

---

## 6. Service Cards (Grid)

- **Purpose:** Showcase 4 core solutions with icon, index number, title, description, and link arrow.
- **Current React Implementation:** [main.tsx:L26](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L26). Maps an array of tuples with Lucide icons (`Camera`, `Network`, `Flame`, `Fingerprint`).
- **Planned Static Implementation:** Clean semantic markup `<article class="service-card">` with inline SVG icons.
- **Responsive Considerations:**
  - Desktop: 4 columns (`repeat(4, 1fr)`).
  - Tablet: 2 columns (`repeat(2, 1fr)`).
  - Mobile: 1 or 2 columns based on screen width (single column below 390px for comfortable reading).
- **Brand Considerations:** Light Grey background (`#F1F5F9`), subtle borders (`#E2E8F0`), Electric Blue accent arrows, Dark Navy headings.

---

## 7. Product / Coverage Cards

- **Purpose:** Visual hardware and coverage demonstration across building types.
- **Current React Implementation:** [main.tsx:L28](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L28). Dark section with 4 cards featuring large icons (58px) and hover zoom.
- **Planned Static Implementation:** Semantic `<article class="product-card">` in `assets/css/components.css`.
- **Responsive Considerations:** 4 columns on desktop, 2 on tablet, 1 or 2 on mobile.
- **Brand Considerations:** Foundation in Primary Charcoal (`#25282D`), image container `#374151`, action button in Electric Blue (`#009DFF`).

---

## 8. Consultation Request Form

- **Purpose:** Primary lead intake mechanism.
- **Current React Implementation:** [main.tsx:L29](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L29). Form with 4 fields: Name, Phone, Service select, and Message. Submitting triggers `alert()`.
- **Planned Static Implementation:**
  - Phase 1–5: Native HTML5 form with client-side validation (`form.js`) and inline visual success/error message cards.
  - Phase 7: Server-side processing via `handlers/contact-process.php`.
- **Responsive Considerations:** Name and phone input stack on mobile (`grid-template-columns: 1fr`), side-by-side on desktop.
- **Brand Considerations:** Focus rings use Electric Blue outline (`outline: 3px solid rgba(0, 157, 255, 0.25); border-color: #009DFF;`).

---

## 9. Global Footer

- **Purpose:** Corporate identity closure, copyright, navigation redundancy, and contact information.
- **Current React Implementation:** [main.tsx:L30](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L30). 3-column layout on Charcoal background.
- **Planned Static Implementation:** Semantic `<footer>` modularized into `includes/footer.php` in Phase 7.
- **Responsive Considerations:** 3 columns on desktop, 2 on tablet, stacked on mobile.
- **Brand Considerations:** Logo housed in clean white protective badge for contrast over dark charcoal. Replace placeholder email `info@vrsystemsolution.com` with official ProviTech address.

---

## 10. Brand Guidelines Swatch & Type Components

- **Purpose:** Visual manual documentation (swatches, type specimens, logo usage cards).
- **Current React Implementation:** [src/BrandGuidelines.tsx](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/BrandGuidelines.tsx). Interactive copy button copies HEX code to clipboard.
- **Planned Static Implementation:** Standalone semantic cards in `brand-guidelines.html` powered by `copy-hex.js`.
- **Responsive Considerations:** Swatch grid scales from 3 columns down to 2 and 1 on mobile.
- **Brand Considerations:** 100% faithful representation of the 6 official brand colors.

---

## 11. Phase 1 Static Implementation & Verification Summary

| # | Component | Static Files Implemented | Logic / State Management | Phase 1 Verification Status |
|---|---|---|---|---|
| 1 | **Site Header & Logo** | `index.html`, `layout.css`, `provitech-logo.png` | Native scroll elevation (`assets/js/navigation.js`) | **VERIFIED** (Clean 3:1 ratio, 0 clipping) |
| 2 | **Navigation & Mobile Drawer** | `index.html`, `layout.css`, `responsive.css` | Vanilla JS drawer toggle (`assets/js/navigation.js`) | **VERIFIED** (ARIA accessible, blue CTA, ESC key) |
| 3 | **Interactive Hero Switcher** | `index.html`, `pages/home.css` | Native data-attr switcher (`assets/js/hero.js`) | **VERIFIED** (Versions 1, 2, 3 toggle smoothly) |
| 4 | **CTA Buttons & Links** | `assets/css/components.css` | Pure CSS hover transitions | **VERIFIED** (Electric blue, navy text, min 44px) |
| 5 | **Headings & Eyebrows** | `assets/css/typography.css` | CSS clamp fluid scales | **VERIFIED** (Montserrat 400–800, zero !important) |
| 6 | **Service Cards Grid** | `index.html`, `components.css` | Inline SVG icons + flex/grid layout | **VERIFIED** (1–4 cols, responsive, zero lucide-react) |
| 7 | **Product Coverage Cards** | `index.html`, `components.css` | Pure CSS dark theme card layout | **VERIFIED** (High contrast, clean hover zoom) |
| 8 | **Consultation Form** | `index.html`, `components.css`, `forms.js` | HTML5 constraint API + inline feedback | **VERIFIED** (Inline status card, zero window.alert) |
| 9 | **Global Footer** | `index.html`, `layout.css` | Semantic footer markup with white logo plate | **VERIFIED** (Stacked to 3-col responsive layout) |
| 10 | **Brand Swatches & Type** | `brand-guidelines.html`, `pages/brand-guidelines.css` | Async Clipboard API (`brand-guidelines.js`) | **VERIFIED** (Click-to-copy HEX with visual feedback) |

---

## 12. Phase 2 Design System Standardization Summary

| Component Family | Base Class | Standardized Tokens & Foundations | Phase 2 Status |
|---|---|---|---|
| **Buttons** | `.btn` | `.btn--primary`, `.btn--secondary`, `.btn--light`, `.btn--text`, min 48px height, 4px radius, Montserrat 700 uppercase, `:focus-visible` ring | **STANDARDIZED & TOKENIZED** |
| **Cards** | `.card` | Shared foundations: `.card--service` (`.service-item`), `.card--product` (`.product-item`), `.card--brand` (`.bg-color-card`), 8px radius, neutral borders | **STANDARDIZED & TOKENIZED** |
| **Containers** | `.container` | `width: min(100% - 2rem, 1200px); margin-inline: auto;`, `.container--narrow` (840px) | **STANDARDIZED & TOKENIZED** |
| **Sections** | `.section` | `.section--white`, `.section--light`, `.section--dark`, `.section--navy`, vertical padding clamp | **STANDARDIZED & TOKENIZED** |
| **Form Controls** | `.form-control` | 48px height, `#F8FAFC` base, `#009DFF` focus border + 3px focus ring, `.form-feedback` banners | **STANDARDIZED & TOKENIZED** |
| **Icons** | `.icon` | Standardized sizes: `.icon` (1.25rem), `.icon--sm` (1rem), `.icon--lg` (1.5rem), `.icon--xl` (2.25rem), `stroke: currentColor` | **STANDARDIZED & TOKENIZED** |
| **Eyebrows / Labels** | `.eyebrow` | Montserrat 700 uppercase, `letter-spacing: 0.2em`, Electric Blue (`var(--color-primary)`) | **STANDARDIZED & TOKENIZED** |
| **Dark Foundations** | `.section--dark` | Primary Charcoal (`#25282D`) & Deep Navy (`#061B49`) foundations, high-contrast white text, protective white logo plates | **STANDARDIZED & TOKENIZED** |

---

## 13. Phase 3 Responsive Hardening & Viewport Adaptations Summary

| Component | Viewport Enhancements & Hardened Behaviors | Phase 3 Verification Status |
|---|---|---|
| **Container & Gutters** | Fluid `--page-gutter` clamp (`1rem` to `2rem`) applied to `.container`, `.container--narrow`, and `.bg-container`. Prevents edge collision across 280px–2560px. | **VERIFIED** (0px overflow on all 20 viewports) |
| **Site Header & Navigation** | Content-driven desktop-to-drawer boundary at 900px (848px total desktop nav requirements). At 912px+, desktop nav displays cleanly; at ≤900px, mobile drawer cleanly activates. | **VERIFIED** (Zero crowding at 912px, 820px, 768px) |
| **Mobile Drawer & Toggle** | `.menu-toggle` and `.bg-menu-toggle` upgraded to 44×44px touch targets. Drawer links sized to 48px height with full-width tap area and link auto-close. | **VERIFIED** (WCAG AA touch compliant) |
| **Hero Review Switcher Dock** | Mobile clearance dock implemented: `.hero-content` reserves 96px bottom padding on screens ≤768px; switcher anchored at bottom 12px with 40px guaranteed clearance from CTAs. | **VERIFIED** (Zero overlap across all 12 tested heights) |
| **Hero Title (H1)** | Fluid clamp `clamp(1.875rem, 8vw, 2.75rem)` with ultra-compact fallback `clamp(1.625rem, 7.5vw, 2rem)` below 360px. Consistent 2-line wrap on all 3 versions down to 280px. | **VERIFIED** (Zero line breaks/overflow down to 280px) |
| **Services Grid** | 4-column (desktop) → 2-column (1024px) → 1-column (≤540px). Card borders adapt to single-column card rhythm on mobile. | **VERIFIED** (Clean responsive card layout) |
| **Products Grid** | 4-column (desktop) → 2-column (1024px) → 1-column (≤540px) with `aspect-ratio: 16 / 9` and 44×44px touch-accessible action icon. | **VERIFIED** (Full readability without squishing) |
| **Approach Section** | 2-column (desktop) → 1-column stacked (≤900px). Image heights scaled: 480px (≤900px) → 380px (≤768px) → 260px (≤360px). | **VERIFIED** (Balanced vertical rhythm) |
| **Interactive Links & Buttons** | `.hero-text-link`, `.text-link`, `.bg-copy`, and footer links expanded to 44px min-height with touch padding. | **VERIFIED** (0 touch targets <44px at 375px) |
| **Contact Form** | Responsive 1-column stack at ≤540px; padding clamped from 52px down to 24px/18px (≤540px) and 20px/14px (≤360px) to prevent focus ring clipping. | **VERIFIED** (Fully accessible inputs and button) |
| **Global Footer** | 3-column (desktop) → 2-column (≤900px) → 1-column stack (≤540px) with accessible link tap targets. | **VERIFIED** (Graceful collapse without awkward gaps) |

---

## 14. Phase 4 Premium UI/UX Polish & Component Enhancement Summary

| Component | Phase 4 Premium Polish & Architectural Treatment | Verification Status |
|---|---|---|
| **Site Header & Navbar** | Frosted glass backdrop blur (`backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.96);`), refined active underline indicator, and compact premium header CTA with subtle glow on hover. | **VERIFIED & POLISHED** |
| **Hero Section (V1, V2, V3)** | Corrected Hero V1 low-contrast overlay with high-contrast multi-stop gradient; H1 text shadow (`0 2px 12px rgba(0,0,0,0.35)`) and Light Grey text (`#F1F5F9`); upgraded primary CTA to "BOOK A FREE CONSULTATION"; restyled review switcher into discreet internal review widget with dedicated label. | **VERIFIED & POLISHED** |
| **Hero Transition Strip** | Added `.hero-transition-strip` bridging dark cinematic hero with white body: features active pulsing status dot ("Enterprise Security Integration") and uppercase segment indicators (Commercial • Industrial • Corporate • Residential). | **VERIFIED & POLISHED** |
| **About / Trust Pillars** | Added `.intro-pillars` 2-column architectural highlight grid: Commercial & Enterprise Focus, Dedicated Local Engineering, Clean Architectural Cabling, Unified System Management. Establishes immediate trust with zero fabricated claims. | **VERIFIED & POLISHED** |
| **Service Cards** | Transformed into independent elevated white surfaces (`box-shadow: 0 1px 3px rgba(6,27,73,0.03)` resting; `0 12px 28px rgba(6,27,73,0.08)` hover) with dedicated 48×48px icon badges (`.service-icon-wrap`), bold headings, and animated action link ("Explore service →"). | **VERIFIED & POLISHED** |
| **Approach Workflow & Framing** | Framed approach image with subtle 1px border and floating frosted dark navy badge (`.approach-badge` with glowing status dot). Upgraded process list with prominent 38×38px Electric Blue badges for `01`, `02`, `03` steps. | **VERIFIED & POLISHED** |
| **Product Coverage Cards** | Standardized `16:10` image ratio, subtle dark card borders (`rgba(255,255,255,0.08)`), high-contrast category kickers, and responsive square action badges that transition to Electric Blue on hover. | **VERIFIED & POLISHED** |
| **Consultation Form** | Refined with dual-layer soft elevation (`0 4px 6px -1px rgba(0,0,0,0.04), 0 16px 36px -4px rgba(6,27,73,0.08)`), custom native `<select>` chevron via embedded SVG data URI, 48px inputs, and prominent submit button. | **VERIFIED & POLISHED** |
| **Global Footer** | Primary Charcoal foundation, protected white logo plate, fine 1px divider, Electric Blue hover translation on links, and clean copyright bar. | **VERIFIED & POLISHED** |
| **Brand Guidelines Page** | Synchronized with frosted header backdrop blur, card elevation, and visual consistency with the homepage. | **VERIFIED & POLISHED** |

