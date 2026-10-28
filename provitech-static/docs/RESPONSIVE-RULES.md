# RESPONSIVE ARCHITECTURE & VIEWPORT RULES — PROVITECH INTEGRATORS

This specification defines the mobile-first responsive architecture and viewport hardening standards established and verified during **Phase 3**.

---

## 1. Strategy & Philosophy

- **Mobile-First Progressive Enhancement:** Base styles represent the smallest practical mobile layouts (280px–480px). Media queries progressively adapt and expand layouts as viewport real estate expands.
- **Zero Horizontal Overflow:** Every viewport from 280px to 2560px must strictly satisfy `scrollWidth <= innerWidth`.
- **Touch Target Integrity:** All interactive elements (links, buttons, form controls, hamburger toggles, hero switcher tabs, copy buttons) meet the minimum accessible touch target area of **44 × 44 px**.
- **Content-Driven Breakpoints:** Transitions occur where content natural geometry demands adaptation, not based on arbitrary device models.

---

## 2. Breakpoint Architecture & Hierarchy

| Breakpoint Tier | Media Query | Key Layout & Component Transformations |
|---|---|---|
| **Tier 1: Desktop Standard & Ultra-Wide** | `> 1024px` | 4-column services grid, 4-column products grid, full horizontal desktop navigation (848px total width requirement), topline bar active, max container width capped at 1200px. |
| **Tier 2: Tablet Landscape & Small Laptops** | `≤ 1024px` | Section headings wrap vertically with aligned paragraph, 2-column services grid, 2-column products grid, footer gap tightened to 40px. |
| **Tier 3: Header Nav Switch & Content Grid Collapse** | `≤ 900px` | Desktop nav converts to full-height mobile drawer (activated where 848px required header width exceeds container space), hamburger menu toggle visible, intro/about grid single column, approach grid single column, contact grid single column, footer transitions to 2-column grid. |
| **Tier 4: Tablet Portrait & Handheld Devices** | `≤ 768px` | Topline utility bar hidden, header height adapts to 70px (`--header-height-mobile`), fluid section padding (`--section-pad-sm`), hero natural height flow with 96px reserved clearance for switcher dock, approach image height 380px. |
| **Tier 5: Mobile Standard & Narrow Phones** | `≤ 540px` | Services grid transitions to 1 column, products grid transitions to 1 column with 16:9 image aspect ratio, hero action buttons stack full-width, contact form row stacks to 1 column, footer collapses to single column, centered hero switcher dock. |
| **Tier 6: Ultra-Compact Safety Tier** | `≤ 360px` | Brand logo clamped to 130px, hero H1 minimum clamp protection against word overflow (`clamp(1.625rem, 7.5vw, 2rem)`), switcher buttons compact width (62px), contact form padding 20px 14px, approach image height 260px, 0px overflow guaranteed down to 280px. |

---

## 3. Container & Gutter System

A unified fluid container gutter system eliminates edge-touching content without abrupt jumps:

```css
:root {
  --page-gutter: clamp(1rem, 3.5vw, 2rem); /* 16px on mobile, scales to 32px on desktop */
  --container-max: 1200px;
  --container-narrow: 840px;
}

.container {
  width: min(calc(100% - (2 * var(--page-gutter))), var(--container-max));
  margin-inline: auto;
}

.container--narrow {
  width: min(calc(100% - (2 * var(--page-gutter))), var(--container-narrow));
  margin-inline: auto;
}
```

- **At 280px (Galaxy Fold):** Gutter is 16px per side (`248px` available width).
- **At 375px (iPhone SE/mini):** Gutter is 16px per side (`343px` available width).
- **At 768px (iPad Portrait):** Gutter is ~27px per side (`714px` available width).
- **At 1200px+ (Desktop):** Gutter is 32px per side, locking to `1200px` container max-width.

---

## 4. Header & Navigation Mode Switch

### Exact Mode Switch Transition (900px Boundary)
- **Required Desktop Header Space:**
  - Brand Logo: 142px
  - Navigation Links (5 links): 420px
  - Header CTA ("LET'S TALK"): 135px
  - Intersperse Gaps (clamp 16px–35px): ~150px
  - **Total Minimum Width Required:** **848px**.
- **Container Space at 912px (Surface Pro):** 880px available width. Desktop navigation fits with 32px breathing room.
- **Container Space at 900px:** 868px available width. Margin drops below safe threshold.
- **Decision:** Breakpoint is strictly set at `@media (max-width: 900px)` for the mobile navigation drawer. At 912px, desktop navigation is displayed without clipping; at 900px, the mobile drawer smoothly activates.

---

## 5. Hero Responsiveness & Review Switcher Dock

### Hero Sizing & Fluid Typography
- **Desktop/Tablet (> 768px):** `min-height: min(750px, calc(100svh - 114px));`, content centered vertically.
- **Mobile (≤ 768px):** `min-height: auto; padding-top: var(--space-8); padding-bottom: var(--space-8);` allowing natural content expansion.
- **Hero H1 Fluid Typography:** `clamp(1.875rem, 8vw, 2.75rem)` (with ultra-compact fallback `clamp(1.625rem, 7.5vw, 2rem)` below 360px) ensuring titles never exceed 2 lines and never overflow.

### Hero Switcher Overlap Resolution
- In Phase 0/1/2, absolute positioning on mobile caused `.hero-version-switch` to overlap `.hero-actions` CTA buttons on short viewports.
- **Phase 3 Resolution:** `.hero-content` reserves `padding-bottom: 96px; position: relative;` on screens ≤ 768px.
- The switcher is anchored with `position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); max-width: calc(100% - 24px);`.
- Top of switcher sits at `12px + 44px = 56px` from container bottom; bottom of CTA sits at `96px` from container bottom.
- **Guaranteed separation:** `40px` buffer at all times across all mobile heights (tested 568px to 932px).

---

## 6. Grid Scaling & Responsive Transitions

### A. Services Grid
- **`> 1024px`:** 4 columns (`repeat(4, 1fr)`).
- **`541px – 1024px`:** 2 columns (`repeat(2, 1fr)`).
- **`≤ 540px`:** 1 column (`1fr`), left border reset and individual card bordered for clean mobile card rhythm.

### B. Products Grid
- **`> 1024px`:** 4 columns (`repeat(4, 1fr)`).
- **`541px – 1024px`:** 2 columns (`repeat(2, 1fr)`).
- **`≤ 540px`:** 1 column (`1fr`), `aspect-ratio: 16 / 9` on image preview, full title readability, 44×44px action icon.

### C. Approach & About Grids
- **`> 900px`:** 2 columns side-by-side (`1fr 1fr`).
- **`≤ 900px`:** 1 column stacked (image on top, copy underneath; image height 480px at ≤ 900px, 380px at ≤ 768px, 260px at ≤ 360px).

### D. Footer Grid
- **`> 900px`:** 3 columns (`1.7fr 0.9fr 1fr`).
- **`541px – 900px`:** 2 columns (brand 1 / -1 full width, nav & contact side-by-side).
- **`≤ 540px`:** 1 column vertical stack with centered/left-aligned spacing.

---

## 7. Touch Target & Accessibility Compliance

Every interactive element satisfies the **44 × 44 px** minimum target:
- `.menu-toggle`: `min-width: 44px; min-height: 44px;`
- `.bg-menu-toggle`: `min-width: 44px; min-height: 44px;`
- `.hero-text-link`: `min-height: 44px; padding: 10px 0;`
- `.text-link`: `min-height: 44px; padding: 10px 0;`
- `.footer-nav a`: `min-height: 44px; padding: 4px 0; display: inline-flex; align-items: center;`
- `.footer-contact a`: `min-height: 44px; padding: 4px 0; display: inline-flex; align-items: center;`
- `.hero-version-switch button`: `min-height: 44px;`
- `.bg-copy`: `min-height: 44px;`
- `.btn`: `min-height: 48px;`
- `.form-control`: `min-height: 48px;`

---

## 8. Orientation & Ultra-Wide Rules

- **Phone Landscape (e.g. 844 × 390):** Uses mobile drawer, header remains compact (70px or 82px), hero height uses dynamic svh units without cutting off text.
- **Tablet Landscape (1024 × 768):** Full desktop layout with 2-column grids and horizontal navigation.
- **Ultra-Wide (1920px & 2560px):** Background surfaces span 100% of the viewport; container strictly enforces `max-width: 1200px` centered via `margin-inline: auto`. Body copy reading widths remain bounded at ≤ 600px.
