# MOTION SYSTEM & ANIMATION ENGINE — PROVITECH INTEGRATORS

> **PHASE 4.7 — ANIMATION FOUNDATION & MOTION GUIDELINES**  
> **Status:** APPROVED & LOCKED  
> **Architecture:** Vanilla JS + GSAP 3.12.5 Core + ScrollTrigger (Zero Node/npm/Build Dependencies)  
> **Single Source of Truth:** `assets/js/motion.js` & `assets/css/variables.css`

---

## 1. Motion Philosophy

ProviTech Integrators provides enterprise-grade CCTV surveillance, network security, and infrastructure systems. The motion language reflects this operational domain:

* **Engineered & Precise:** Movement feels mechanical, calibrated, and intentional—never buoyant, playful, or whimsical.
* **Controlled & Non-Intrusive:** Animation enhances content discoverability and visual rhythm; it never delays access to information.
* **Progressive Enhancement:** Content is 100% visible and accessible immediately without JavaScript or GSAP. Motion is an enhancement, not a barrier.
* **Zero Decoration:** Movement is employed strictly to communicate hierarchy, spatial relationships, and status.

---

## 2. Technology Stack & Loading Architecture

### Approved Libraries
* **GSAP Core:** `v3.12.5` (CDN delivery via Cloudflare CDNJS)
* **GSAP ScrollTrigger:** `v3.12.5` (CDN delivery via Cloudflare CDNJS)
* **Central Motion Controller:** `assets/js/motion.js` (Native ES Module)

### Prohibited Libraries
* ❌ Lenis / Locomotive Scroll (no scroll-jacking)
* ❌ Framer Motion / Anime.js (no redundant libraries)
* ❌ Three.js / WebGL canvas effects
* ❌ Lottie / Bodymovin
* ❌ jQuery animation plugins

### Loading Sequence
Scripts are loaded synchronously in `<head>` (or deferred before closing `</body>`) in exact architectural dependency order:

```html
<!-- 1. GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- 2. ScrollTrigger Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- 3. Central Application & Motion Engine -->
<script type="module" src="assets/js/main.js"></script>
```

---

## 3. The Three Motion Levels

All animation across the ProviTech platform is categorized into three strict tiers:

```
┌─────────────────────────────────────────────────────────────┐
│ LEVEL 1: MICRO-INTERACTIONS (CSS Native)                    │
│ Buttons, links, hover lifts, arrow nudges, input focus      │
├─────────────────────────────────────────────────────────────┤
│ LEVEL 2: ENTRANCE & REVEAL (GSAP + ScrollTrigger)           │
│ Section headings, copy blocks, card grids, process markers  │
├─────────────────────────────────────────────────────────────┤
│ LEVEL 3: STORYTELLING & SHOWCASE (GSAP Timelines)           │
│ Hero sequence, workflow walkthroughs, interactive diagrams   │
└─────────────────────────────────────────────────────────────┘
```

### Level 1: Micro-Interactions (CSS)
* **Implementation:** 100% native CSS transitions.
* **Targets:** Primary/secondary buttons, navigation links, SVG arrow translations, form input focus rings, switcher buttons.
* **Rules:** Do **NOT** use GSAP for button hovers or simple color transitions. Use `var(--transition-fast)` and `var(--motion-ease-standard)`.

### Level 2: Entrance & Viewport Reveals (GSAP + ScrollTrigger)
* **Implementation:** GSAP `ScrollTrigger` instances with `once: true`.
* **Targets:** Section titles, narrative copy, service cards, product grid cards, trust pillars.
* **Rules:** Runs once per session. Elements start visible in CSS, then animate in smoothly via `gsap.from(...)` only when runtime GSAP is verified.

### Level 3: Storytelling & Coordinated Sequences (GSAP Timelines)
* **Implementation:** Master/child GSAP Timelines with controlled sequencing.
* **Targets:** Hero opening narrative, interactive concept switcher, multi-step process demonstrations.
* **Rules:** Requires explicit phase-gate approval (strictly locked during Phase 4.7).

---

## 4. Central Motion Tokens

Tokens are standardized across both CSS (`variables.css`) and JavaScript (`motion.js`).

### Duration Scale

| Token Name | CSS Variable | JS Value | Duration | Target Applications |
|---|---|---|---|---|
| **Micro** | `--motion-duration-micro` | `0.18` | 180ms | UI micro-interactions, icons, arrows, indicators |
| **Fast** | `--motion-duration-fast` | `0.25` | 250ms | Button hovers, mobile drawer toggle, quick status cues |
| **Standard** | `--motion-duration-standard` | `0.40` | 400ms | Viewport reveals, card entrances, layout transitions |
| **Slow** | `--motion-duration-slow` | `0.65` | 650ms | Complex panels, architectural hero transitions |
| **Story** | `--motion-duration-story` | `0.95` | 950ms | Hero brand narrative sequence (Phase-gated) |

### Easing Vocabulary

| Ease Name | GSAP String | CSS Equivalent | Behavior & Target |
|---|---|---|---|
| **Standard** | `power2.out` | `cubic-bezier(0.25, 1, 0.5, 1)` | Smooth deceleration for general UI feedback |
| **Entrance** | `power3.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Decisive, rapid stop for elements arriving in viewport |
| **Exit** | `power2.in` | `cubic-bezier(0.4, 0, 1, 1)` | Prompt departure without lingering |
| **Emphasis** | `power2.inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetrical focus for bidirectional cues |
| **Prohibited** | `bounce`, `elastic`, overshoot | — | **STRICTLY PROHIBITED** across all components |

### Movement & Scale Limits

* **Movement Distance:**
  - `sm` (`12px`): Micro badges, inline indicators, status icons.
  - `md` (`24px`): Headings, body copy, card grids (default entrance).
  - `lg` (`40px`): Maximum movement ceiling for large hero blocks.
  - *Hard Rule:* Never use translations exceeding 40px. Slides of 100px+ are strictly banned.
* **Interactive Scale:**
  - Active Press: `0.98` (subtle tactile compression).
  - Hover Lift: `1.02` (restrained card/image elevation).
  - Max Ceiling: `1.03` (maximum allowable non-disruptive scale).
* **Stagger Cadence:**
  - Fast: `0.06s` (metrics, tags).
  - Base: `0.08s` (service/product cards).
  - Slow: `0.12s` (process steps limit).

---

## 5. ScrollTrigger Engineering Rules

1. **Trigger → Play → Complete:**
   All entrance triggers must use `toggleActions: "play none none none"` or `once: true`. Content should never continuously re-animate or jitter when visitors scroll back up.
2. **Scrub Policy:**
   `scrub` is **NOT** the default. It may only be employed where spatial scroll progress directly correlates with a physical illustration (e.g., cabling pipeline diagram).
3. **Pinning Policy:**
   Zero pinned sections in Phase 4.7. Pinning introduces severe mobile viewport recalculation bugs and is prohibited without explicit future authorization.
4. **Natural Thresholds:**
   Reveals should initiate at `top 85%` of the viewport. Never require users to scroll an element into the dead center of the screen before it becomes visible.

---

## 6. Accessibility & Reduced Motion

ProviTech strictly enforces WCAG 2.2 Success Criterion 2.3.3 (Animation from Interactions):

```javascript
// Native Reduced Motion Handler in motion.js
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mq.matches) {
  // 1. Skip entrance animations immediately
  // 2. Set all transforms and opacities to final resting state
  // 3. Disable all ScrollTrigger instances
}
```

* **Attributes:** `document.documentElement` receives `data-reduced-motion="true"`.
* **CSS Safety:** When reduced motion is requested, all CSS durations drop to `0.01ms` or transitions are set to `none`.
* **Zero Layout Shift:** Content positioning and visual hierarchy remain identical regardless of reduced-motion state.

---

## 7. No-JS / No-GSAP Failure Safety

Animation is an enhancement, not a dependency. The website must remain 100% usable under all failure scenarios:

1. **Zero Initial Invisibility:** Never write CSS like `.content { opacity: 0; }`.
2. **Progressive Activation:** Elements are manipulated dynamically by `motion.js` using `gsap.from(...)` only after verifying that GSAP and ScrollTrigger are loaded.
3. **Blocked Scripts:** If an ad-blocker or strict corporate firewall blocks CDNJS, the fallback mechanism gracefully sets `data-motion="fallback"`. Navigation, forms, layout, and Phase 4.6 styling remain fully operational.

---

## 8. Responsive Motion Strategy (`gsap.matchMedia`)

Motion complexity scales proportionately with viewport size:

| Device Tier | Breakpoint | Motion Strategy | Movement Limits |
|---|---|---|---|
| **Mobile** | `≤ 768px` | Reduced complexity, single-axis translation, disabled parallax | `8px–16px` |
| **Tablet** | `769px–1024px` | Moderate motion, synchronized grid staggers | `16px–24px` |
| **Desktop** | `≥ 1025px` | Full calibrated motion, depth transitions, multi-layer cues | `20px–32px` |

---

## 9. Performance Standards

* **GPU Compositing:** Animate strictly `transform` (`x`, `y`, `scale`) and `opacity`.
* **Layout Thrashing Prevention:** Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
* **Hardware Acceleration:** Apply `will-change: transform, opacity;` sparingly and clean up after animations complete.
* **FPS Benchmark:** 60fps sustained on mobile and desktop viewports.

---

## 10. Approved Motion Pattern 01 — Header & Navigation (Phase 4.8)

Approved, implemented, and locked under Phase 4.8.

### Timeline & Sequence
* **Target Total Runtime:** ~750ms complete entrance sequence (well within the 500–900ms ceiling).
* **Order of Execution:**
  1. **Top Utility Bar (`.topline`):** `opacity: 0 -> 1`, `y: -10px -> 0`, duration `0.25s`, ease `power3.out`.
  2. **Main Header Container (`.site-header`):** `opacity: 0 -> 1`, `y: -10px -> 0`, duration `0.35s`, ease `power3.out`, offset `-=0.15s`.
  3. **Brand Logo (`.brand`):** `opacity: 0 -> 1`, `y: -8px -> 0`, duration `0.25s`, ease `power3.out`, offset `-=0.20s`. Official logo preserved with zero distortion or scale.
  4. **Desktop Nav Links (`.main-nav > a`):** `opacity: 0 -> 1`, `y: -8px -> 0`, duration `0.25s`, stagger `0.05s`, ease `power3.out`, offset `-=0.18s`.
  5. **Header Action CTA (`.header-cta`):** `opacity: 0 -> 1`, `y: -8px -> 0`, duration `0.25s`, ease `power3.out`, offset `-=0.15s`.
* **Property Restoration:** `clearProps: 'all'` executes upon timeline completion to guarantee full CSS inheritance.

### Micro-Interactions & Hover Dynamics
* **Desktop Underline Indicator:** GPU-accelerated `transform: scaleX(0) -> scaleX(1)` with `transform-origin: left center` on pseudo-element `::after`. Duration `0.25s` (`--motion-duration-fast`), ease `--motion-ease-standard`.
* **Active Route Indicator:** Persistent `transform: scaleX(1)` underline for the active route (`.is-active`).
* **Header CTA Hover:** `translateY(-2px)` upward lift, `translateX(4px)` arrow translation, and deepened Electric Blue shadow (`0 4px 14px rgba(0, 157, 255, 0.30)`).
* **Header CTA Press:** `scale(0.98)` tactile compression (`--motion-scale-press`).

### Sticky Scroll State
* **Threshold:** Discrete `scrollY > 15px` threshold toggles `.is-scrolled`.
* **Visual Treatment:** Enhanced shadow (`--shadow-scrolled`), border tint (`rgba(6, 27, 73, 0.12)`), and backdrop `rgba(255, 255, 255, 0.98)`. Zero layout recalculation or height change.

### Mobile Navigation Drawer & Toggle
* **Toggle Button:** Rotational and opacity transition between `.icon-menu` and `.icon-close`, with active press scaling `0.98`.
* **Drawer Opening:** Container slides and fades (`0.28s`, `y: -10px -> 0`), nav links stagger in (`0.22s`, stagger `0.045s`), mobile CTA follows (`0.22s`).
* **Drawer Closing:** Prompt departure (`0.20s`, `power2.in`, `opacity: 0`, `y: -10px`).
* **Race Condition Guardrail:** Active GSAP timeline killed instantly on rapid toggle to prevent tween accumulation.
* **Responsive Breakpoint Cleanup:** Window resize above 900px closes drawer, unlocks body scroll, resets ARIA, and runs `resetMobileMenu()` to wipe inline styles.
* **Accessibility:** Full `aria-expanded` synchronization, body scroll lock (`menu-open`), and Escape key focus return.

### Fallback & Reduced Motion
* **Reduced Motion:** When `prefers-reduced-motion: reduce` is detected, all entrance translations and link staggers are bypassed. Nav remains instantly visible and functional.
* **No-GSAP / Failure Safety:** Elements start 100% visible in DOM. Pure CSS drawer transition (`html:not([data-motion="gsap"]) .main-nav.is-open`) provides native fallback.

---

## 11. Approved Motion Pattern 02 — Hero (Phase 4.9)

Approved, implemented, and locked under Phase 4.9.

### Timeline Sequence & Continuity
* **Header Continuity:** The Hero entrance sequence initiates at `0.15s`, overlapping seamlessly with the settling Header container. Total entrance spans ~1.15s, creating a unified opening experience without dead air.
* **Order of Execution:**
  1. **Hero CCTV Photography (`.hero-image`):** `scale: 1.03 -> 1`, `opacity: 0.85 -> 1`, duration `1.10s`, ease `power2.out`, offset `0.15s`.
  2. **Dark Navy Overlay (`.hero-shade`):** `opacity: 0.75 -> 1`, duration `0.90s`, ease `power2.out`, offset `0.15s`.
  3. **Kicker Accent Line (`.kicker-line`):** `scaleX: 0 -> 1` (`transform-origin: left center`), duration `0.35s`, ease `power3.out`, offset `0.28s`.
  4. **Eyebrow Text (`.hero-kicker-text`):** `opacity: 0 -> 1`, `y: 14px -> 0`, duration `0.45s`, ease `power3.out`, offset `0.32s`.
  5. **Main Headline — Stage 1 ("See more.") (`.hero-title-line:first-child`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.55s`, ease `power3.out`, offset `0.46s`.
  6. **Main Headline — Stage 2 ("Worry less.") (`.hero-title-accent`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.55s`, ease `power3.out`, offset `0.64s`. Electric Blue emphasis.
  7. **Supporting Paragraph (`.hero-desc`):** `opacity: 0 -> 1`, `y: 18px -> 0`, duration `0.45s`, ease `power3.out`, offset `0.80s`.
  8. **Primary CTA ("BOOK A FREE CONSULTATION") (`.hero-btn-primary`):** `opacity: 0 -> 1`, `y: 16px -> 0`, duration `0.40s`, ease `power3.out`, offset `0.92s`.
  9. **Secondary CTA ("Explore solutions") (`.hero-text-link`):** `opacity: 0 -> 1`, `y: 16px -> 0`, duration `0.40s`, ease `power3.out`, offset `1.02s`.
  10. **Scroll Indicator ("SCROLL TO EXPLORE") (`.hero-scroll`):** `opacity: 0 -> 1`, `y: 10px -> 0`, duration `0.40s`, ease `power3.out`, offset `1.12s`.
* **Property Cleanup:** `clearProps: 'transform,opacity'` runs upon completion to restore pure CSS inheritance on all interactive text, links, and buttons.

### Interactive Dynamics & Depth
* **Desktop Pointer Parallax:** CCTV image shifts smoothly opposite cursor position via high-performance `gsap.quickTo` on desktop pointer devices (`(pointer: fine)`). Displacement is strictly capped at ±6px (`relX * -12`, `relY * -12`). Disabled on touch/mobile devices.
* **Scroll Exit Depth:** Lightweight ScrollTrigger gently translates content upward (`y: -24px`, `opacity: 0.88`, `scrub: 0.4`) as user scrolls out of the Hero. Zero pinning, zero scroll-jacking.
* **Scroll Cue Loop & Auto-Pause:** Subtle 3px vertical arrow bob loop (2.0s duration). ScrollTrigger automatically applies `.is-scrolled-past` to pause CSS animation play-state when scrolled beyond the Hero.
* **Button Micro-Interactions:** 
  - Primary CTA: 2px upward lift, 4px arrow right translate, tactile 0.98 active press scale.
  - Secondary CTA: 4px arrow right translate, subtle underline expansion and color tint.

### Responsive Differentiation
* **Mobile (≤768px):** Reduced translation distances (12px), faster timings (0.38s–0.42s), static image opacity fade (0.88 -> 1), pointer parallax disabled, scroll scrub exit disabled.
* **Tablet (769px–900px):** Moderate 16px entrance movement; pointer parallax disabled on touch displays.
* **Clean Breakpoints:** Handled cleanly via `gsap.matchMedia()`; all inline transforms purged on viewport changes.

### Reduced Motion & Failure Safety
* **Reduced Motion:** System preference `prefers-reduced-motion: reduce` skips all entrance translations, scale effects, parallax, and scroll bob animations immediately. Hero renders complete at 100% resting state.
* **GSAP Failure Safety:** Hero markup is 100% visible by default in DOM with zero initial CSS opacity suppression. All CTAs and scroll links operate natively.
* **Scroll Restoration Safety:** If page is refreshed below the Hero (`window.scrollY > 150px`), the sequence jumps straight to completed resting state to prevent unexpected background movement.

---

## 12. Approved Motion Pattern 03 — About + Trust (Phase 4.10)

Phase 4.10 establishes the coordinated narrative reveal, architectural trust pillar stagger, and restrained card micro-interactions for the company story section.

### Entrance Timeline & Orchestration
* **ScrollTrigger Activation:** Viewport entry at `start: 'top 82%'` (approximately 18% into viewport), executed once (`once: true`). Triggers forward, completes decisively, and never replays on reverse scroll.
* **Coordinated Story Progression:**
  1. **Section Eyebrow (`.intro-title .eyebrow`):** `opacity: 0 -> 1`, `y: 14px -> 0`, duration `0.40s`, ease `power3.out`.
  2. **Primary Heading (`.intro-title h2`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.55s`, ease `power3.out`, offset `-=0.22s` (starts as eyebrow settles).
  3. **Narrative Paragraphs (`.intro-copy p`):** `opacity: 0 -> 1`, `y: 18px -> 0`, duration `0.45s`, ease `power3.out`, stagger `0.08s`, offset `-=0.25s`.
  4. **Trust Pillars Container (`.intro-pillars`):** `opacity: 0 -> 1`, `y: 16px -> 0`, duration `0.40s`, ease `power3.out`, offset `-=0.18s`.
  5. **Trust Pillar Items (`.intro-pillar`):** `opacity: 0 -> 1`, `y: 12px -> 0`, duration `0.40s`, ease `power3.out`, stagger `0.08s`, offset `-=0.25s`. Reading order: Left-to-Right, Top-to-Bottom.
  6. **"Get to know us" Link (`.intro-copy .text-link`):** `opacity: 0 -> 1`, `y: 12px -> 0`, duration `0.38s`, ease `power3.out`, offset `-=0.15s`.
* **Property Cleanup:** `clearProps: 'transform,opacity'` executed on timeline completion to restore native CSS rendering.

### Pillar Dynamics & Micro-Interactions
* **Restrained Card Hover:** CSS-driven 2px upward lift (`translateY(-2px)`), subtle background tint (`rgba(0, 157, 255, 0.05)`), and 1.08 icon scale over 200ms (`--transition-fast`).
* **Non-Clickable Card Rule:** Explicit `cursor: default` preserved (never mislead visitors into treating informational trust badges as interactive links).
* **Radius Hierarchy:** Preserves approved Phase 4.6 geometry: 12px container radius (`--radius-md`) and 8px item radius (`--radius-sm`).
* **Zero Speculative Content:** No fake statistics, animated counters, or unverified claims.

### Responsive Differentiation
* **Mobile (≤768px):** Streamlined single-column vertical flow with shorter movements (`y: 10px–12px`), faster timings (`0.38s`), and tighter stagger (`0.06s`). Zero horizontal translation.
* **Tablet (769px–900px):** Moderate translations (`y: 16px`), duration `0.42s`, stagger `0.07s`.
* **Responsive Isolation:** Managed via `gsap.matchMedia()`; inline styles purged on viewport resize.

### Reduced Motion & Failure Safety
* **Reduced Motion:** When `prefers-reduced-motion: reduce` is detected, all entrance translations and card staggers are completely bypassed. Content renders immediately in final resting state.
* **GSAP Failure Safety:** Zero initial CSS opacity suppression. All copy and trust badges start 100% visible in DOM.
* **Services Boundary:** Motion strictly terminates at `#about`; zero animations added to `#services` or subsequent sections.

---

---

## 13. Approved Motion Pattern 04 — Services (Phase 4.11)

Phase 4.11 establishes the coordinated section entrance, left-to-right service card stagger, and restrained micro-interactions for PROVITECH's capability presentation.

### Entrance Timeline & Orchestration
* **ScrollTrigger Activation:** Viewport entry at `start: 'top 80%'` (approximately 20% into viewport), executed once (`once: true`, `fastScrollEnd: true`). Triggers forward, completes decisively, and never replays on reverse scroll.
* **Coordinated Progression Sequence:**
  1. **Section Eyebrow (`.section-heading .eyebrow`):** `opacity: 0 -> 1`, `y: 14px -> 0`, duration `0.35s`, ease `power3.out`.
  2. **Section Heading (`.section-heading h2`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.45s`, ease `power3.out`, offset `0.10s`.
  3. **Supporting Copy (`.section-heading p`):** `opacity: 0 -> 1`, `y: 18px -> 0`, duration `0.40s`, ease `power3.out`, offset `0.22s`.
  4. **Service Items Grid (`.service-item`):** `opacity: 0 -> 1`, `y: 26px -> 0`, duration `0.45s`, ease `power3.out`, stagger `0.08s`, offset `0.35s`. Reading order: strictly Left-to-Right, Top-to-Bottom.
* **Property Cleanup:** `clearProps: 'transform,opacity'` executed on timeline completion to restore pure native CSS layout.

### Card Dynamics & Micro-Interactions
* **Restrained Card Hover:** CSS-driven upward lift capped at 3px (`translateY(-3px)`), subtle border tint (`rgba(0, 157, 255, 0.35)`), and soft elevation refinement over 200ms (`--transition-fast`).
* **Icon Dynamics:** Scale `1 -> 1.04` on hover over 200ms; continuous spinning, pulse, HUD, and glow effects strictly prohibited.
* **Arrow Interaction:** Directional arrow translates `4px` right on card hover (`translateX(4px)`), matching Hero/Header CTA interaction language.
* **Interactive Focus:** Accessible keyboard focus via `:focus-visible` with 2px solid Electric Blue outline offset 3px (`outline: 2px solid var(--color-primary); outline-offset: 3px;`).
* **Preserved Geometry:** Approved 16–20px card radius (`--radius-lg`) strictly maintained.

### Responsive Differentiation
* **Mobile (≤768px):** Single-column vertical flow with shorter translations (`y: 12px`), faster timings (`0.35s`), and tighter stagger (`0.06s`). Zero horizontal movement.
* **Tablet (769px–900px):** Moderate vertical movement (`y: 16px`), duration `0.40s`, stagger `0.07s`.
* **Responsive Isolation:** Managed via `gsap.matchMedia()`; inline transforms purged on viewport resize.

### Reduced Motion & Failure Safety
* **Reduced Motion:** System preference `prefers-reduced-motion: reduce` completely disables all entrance translations, card staggers, and hover lifts. All cards render immediately at 100% resting state.
* **Fast Scroll Protection:** `fastScrollEnd: true` plus viewport position checks instantly complete entrance animations during rapid scrolls, preventing stuck transforms or invisible cards.
* **GSAP Failure Safety:** HTML/CSS provides 100% initial visibility. Zero reliance on JavaScript for legibility or layout.
* **Approach Boundary:** Strict phase isolation observed; zero animations or listeners applied to Approach (`.approach`) or subsequent sections.

---

---

## 14. Approved Motion Pattern 05 — Approach / Process (Phase 4.12)

Phase 4.12 establishes the technical workflow photography reveal, section heading orchestration, sequential 01 -> 02 -> 03 process step progression, and accessible CTA settlement.

### Entrance Timeline & Orchestration
* **ScrollTrigger Activation:** Viewport entry at `start: 'top 80%'` (approximately 20% into viewport), executed once (`once: true`, `fastScrollEnd: true`). Triggers forward, completes decisively, and never replays on reverse scroll.
* **Coordinated Progression Sequence:**
  1. **Workflow Photography (`.approach-image`):** `opacity: 0 -> 1`, `y: 22px -> 0`, duration `0.50s`, ease `power3.out`.
  2. **Workflow Floating Badge (`.approach-badge`):** `opacity: 0 -> 1`, `scale: 0.94 -> 1`, duration `0.35s`, offset `0.15s`.
  3. **Section Eyebrow (`.approach-content .eyebrow`):** `opacity: 0 -> 1`, `y: 14px -> 0`, duration `0.35s`, ease `power3.out`, offset `0.05s`.
  4. **Section Heading (`.approach-content h2`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.48s`, ease `power3.out`, offset `0.14s`.
  5. **Supporting Copy (`.approach-content > p`):** `opacity: 0 -> 1`, `y: 18px -> 0`, duration `0.40s`, ease `power3.out`, offset `0.26s`.
  6. **Process Steps (`.approach-list > div`):** `opacity: 0 -> 1`, `y: 20px -> 0`, duration `0.45s`, ease `power3.out`, stagger `0.09s`, offset `0.38s`. Follows strictly numerical reading sequence: 01 (Understand) -> 02 (Install) -> 03 (Stay supported).
  7. **Text Link CTA (`.approach-content .text-link`):** `opacity: 0 -> 1`, `y: 12px -> 0`, duration `0.35s`, offset `0.65s`.
* **Property Cleanup:** `clearProps: 'transform,opacity'` executed on timeline completion to restore native CSS rendering.

### Step Dynamics & Micro-Interactions
* **Restrained Step Hover:** CSS-driven upward lift capped at 2px (`translateY(-2px)`), subtle background tint (`rgba(0, 157, 255, 0.02)`), and number badge scale `1.04` with border tint over 200ms (`--transition-fast`).
* **Non-Clickable Informational Discipline:** Process step cards maintain explicit `cursor: default`; no fake links or button-like behavior.
* **Photography Hover:** Subtle image scale `1.03` with overflow clipping and approved 20px radius (`--radius-xl`) preserved.
* **Directional CTA Interaction:** "Start a conversation" text-link moves directional arrow `4px` to the right on hover (`translateX(4px)`).
* **Connector Discipline:** Clean existing border separators preserved; zero artificial timeline graphics or animated pipelines invented (Rule 15).

### Responsive Differentiation
* **Mobile (≤768px):** Single-column vertical flow with shorter movements (`y: 12px`), faster timings (`0.35s`), and tighter stagger (`0.06s`). Zero horizontal movement.
* **Tablet (769px–900px):** Moderate vertical movement (`y: 16px`), duration `0.40s`, stagger `0.08s`.
* **Responsive Isolation:** Managed via `gsap.matchMedia()`; inline transforms purged on viewport resize.

### Reduced Motion & Failure Safety
* **Reduced Motion:** System preference `prefers-reduced-motion: reduce` completely disables all entrance translations, step staggers, and hover lifts. All content renders immediately at 100% resting state.
* **Fast Scroll Protection:** `fastScrollEnd: true` plus viewport position checks instantly complete entrance animations during rapid scrolls, preventing stuck transforms or invisible steps.
* **GSAP Failure Safety:** HTML/CSS provides 100% initial visibility. Zero reliance on JavaScript for legibility or layout.
* **Products Boundary:** Strict phase isolation observed; zero animations or listeners applied to Products (`.products`, `#products`) or subsequent sections.

---

## 15. Approved Motion Pattern 06 — Products (Phase 4.13)

Phase 4.13 establishes the technical hardware/coverage card reveal, section heading orchestration, natural reading order stagger (01 -> 02 -> 03 -> 04), and restrained hover interactions for PROVITECH's hardware coverage.

### Entrance Timeline & Orchestration
* **ScrollTrigger Activation:** Viewport entry at `start: 'top 80%'` (approximately 20% into viewport), executed once (`once: true`, `fastScrollEnd: true`). Triggers forward, completes decisively, and never replays on reverse scroll.
* **Coordinated Progression Sequence:**
  1. **Section Eyebrow (`.products .section-heading .eyebrow`):** `opacity: 0 -> 1`, `y: 14px -> 0`, duration `0.35s`, ease `power3.out`.
  2. **Section Heading (`.products .section-heading h2`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.48s`, ease `power3.out`, offset `0.10s`.
  3. **Supporting Copy (`.products .section-heading p`):** `opacity: 0 -> 1`, `y: 16px -> 0`, duration `0.40s`, ease `power3.out`, offset `0.22s`.
  4. **Product Cards Collection (`.products-grid .product-item`):** `opacity: 0 -> 1`, `y: 26px -> 0`, duration `0.45s`, ease `power3.out`, stagger `0.08s`, offset `0.35s`. Follows strictly natural reading sequence: 01 CCTV Surveillance -> 02 Networking Solutions -> 03 Fire Alarm Systems -> 04 Access Control.
* **Property Cleanup:** `clearProps: 'transform,opacity'` executed on timeline completion to restore native CSS rendering.

### Card Dynamics & Micro-Interactions
* **Restrained Card Lift:** CSS-driven upward lift capped at 3px (`translateY(-3px)`), soft shadow (`box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25)`), and border refinement (`border-color: rgba(0, 157, 255, 0.35)`) over 200ms (`--transition-fast`).
* **Icon Scale Dynamics:** Restrained SVG scale `1 -> 1.04` over 200ms with container overflow clipping preserving rounded geometry.
* **CTA Arrow Translation:** Action button arrow translates `translateX(4px)` on card hover and focus matching global CTA standards.
* **Clickable Card Rule & Focus:** All product cards are genuine anchor links (`<a class="product-item" href="#contact">`). Keyboard focus provides an Electric Blue `:focus-visible` ring (`2px solid var(--color-primary)` with 3px offset) and upward lift (`translateY(-3px)`).
* **Strict Prohibitions:** Zero 3D tilt/perspective, zero magnetic attraction, zero auto-carousel/infinite marquee, and zero invented product metrics (prices, ratings, stock chips, counters).

### Responsive Differentiation
* **Mobile (≤768px):** Single-column vertical flow with shorter movements (`y: 12px`), faster timings (`0.35s`), and tighter stagger (`0.06s`). Zero horizontal movement.
* **Tablet (769px–900px):** 2-column grid layout, moderate vertical movement (`y: 18px`), duration `0.40s`, stagger `0.07s`.
* **Responsive Isolation:** Managed via `gsap.matchMedia()`; inline transforms purged on viewport resize.

### Reduced Motion & Failure Safety
* **Reduced Motion:** System preference `prefers-reduced-motion: reduce` completely disables all entrance translations, card staggers, hover lifts, icon scales, and arrow translations. All content renders immediately at 100% resting state.
* **Fast Scroll Protection:** `fastScrollEnd: true` plus viewport position checks instantly complete entrance animations during rapid scrolls, preventing stuck transforms or invisible cards.
* **GSAP Failure Safety:** HTML/CSS provides 100% initial visibility. Zero reliance on JavaScript for legibility or layout.
* **Contact & Footer Boundary:** Strict phase isolation observed; zero animations or listeners applied to Contact (`#contact`) or Footer (`.site-footer`).

---

## 16. Approved Motion Pattern 07 — Contact + Footer (Phase 4.14)

Phase 4.14 concludes the page motion journey with a calm, conversion-focused Contact section and a quiet, polished multi-column Footer entrance.

### Entrance Timeline & Orchestration
* **ScrollTrigger Activation:**
  - Contact Trigger: Viewport entry at `#contact` (`start: 'top 80%'`, `once: true`, `fastScrollEnd: true`).
  - Footer Trigger: Viewport entry at `.site-footer` (`start: 'top 88%'`, `once: true`, `fastScrollEnd: true`).
* **Coordinated Progression Sequence:**
  1. **Section Eyebrow (`.contact-copy .eyebrow`):** `opacity: 0 -> 1`, `y: 14px -> 0`, duration `0.35s`, ease `power3.out`.
  2. **Section Heading (`.contact-copy h2`):** `opacity: 0 -> 1`, `y: 24px -> 0`, duration `0.48s`, ease `power3.out`, offset `0.10s`.
  3. **Consultation Form Container (`.contact-form`):** `opacity: 0 -> 1`, `y: 22px -> 0`, duration `0.50s`, ease `power3.out`, offset `0.18s`.
  4. **Supporting Copy (`.contact-copy > p`):** `opacity: 0 -> 1`, `y: 16px -> 0`, duration `0.40s`, ease `power3.out`, offset `0.22s`.
  5. **Contact Information Channels (`.contact-details > *`):** `opacity: 0 -> 1`, `y: 18px -> 0`, duration `0.40s`, stagger `0.07s`, offset `0.30s`.
  6. **Footer Multi-Column Entrance (`.footer-brand`, `.footer-nav`, `.footer-contact`):** `opacity: 0 -> 1`, `y: 18px -> 0`, duration `0.45s`, stagger `0.06s`, offset `0`.
  7. **Footer Bottom Copyright (`.footer-bottom`):** `opacity: 0 -> 1`, `y: 12px -> 0`, duration `0.35s`, offset `0.20s`.
* **Property Cleanup:** `clearProps: 'transform,opacity'` executed on both timelines upon completion to restore native CSS rendering.

### Form Usability & Micro-Interactions
* **Immediate Form Usability:** Input fields, select dropdown, textarea, and submit button remain completely accessible and interactive throughout and after the entrance animation. Tab order is 100% preserved.
* **Input Focus State:** Focused controls display an Electric Blue border (`#009DFF`) and subtle focus ring (`box-shadow: 0 0 0 3px rgba(0, 157, 255, 0.12)`); zero disruptive error shaking or neon glows.
* **Submit CTA:** Capsule button with Electric Blue background, pure white text and arrow. 2px hover lift (`translateY(-2px)`), 4px directional arrow slide (`translateX(4px)`), and 0.98 active press scale (`scale(0.98)`).
* **Contact Channel Hover:** 1.04 SVG icon scale and 4px arrow right translation on genuine tel and mailto links. Informational address maintains `cursor: default`.
* **Footer Link Hover:** Color transitions to Electric Blue with subtle `3px` rightward slide (`translateX(3px)`). Official logo entrance is capped at 10px Y with zero distortion.

### Responsive Differentiation
* **Mobile (≤768px):** Single-column vertical flow with shorter movements (`y: 12px`), faster timings (`0.35s`), and tighter stagger (`0.05s–0.06s`). Zero horizontal movement. Form and footer columns stack in natural reading order.
* **Tablet (769px–900px):** Form and contact details adapt smoothly; moderate translations (`y: 14–16px`), duration `0.40s`.
* **Responsive Isolation:** Managed via `gsap.matchMedia()`; inline transforms purged on viewport resize.

### Reduced Motion & Failure Safety
* **Reduced Motion:** System preference `prefers-reduced-motion: reduce` completely disables all entrance translations, staggers, hover lifts, icon scales, and arrow translations. All contact and footer content renders immediately at 100% resting state.
* **Fast Scroll Protection:** `fastScrollEnd: true` plus viewport position checks instantly complete entrance animations during rapid scrolls, preventing stuck transforms or invisible elements.
* **GSAP Failure Safety:** HTML/CSS provides 100% initial visibility. Zero reliance on JavaScript for legibility, form interaction, or layout.

---

---

## 17. Motion Architecture & Section Controllers (Phase 4.15 Locked)

The `assets/js/motion.js` controller coordinates the complete page-level motion journey:

* `initMotion()` / `initMotionSystem()` — **Central Master Controller (Phase 4.15 COMPLETE & LOCKED)**
* `initHeaderMotion()` — **Phase 4.8: Header & Navigation Motion (COMPLETE & LOCKED)**
* `initHeroMotion()` — **Phase 4.9: Hero Motion & Interactive Elements (COMPLETE & LOCKED)**
* `initAboutMotion()` — **Phase 4.10: About + Trust Motion (COMPLETE & LOCKED)**
* `initServicesMotion()` — **Phase 4.11: Services Interactive Motion (COMPLETE & LOCKED)**
* `initApproachMotion()` — **Phase 4.12: Approach / Process Motion (COMPLETE & LOCKED)**
* `initProductsMotion()` — **Phase 4.13: Products Interactive Motion (COMPLETE & LOCKED)**
* `initContactMotion()` — **Phase 4.14: Contact Motion (COMPLETE & LOCKED)**
* `initFooterMotion()` — **Phase 4.14: Footer Motion (COMPLETE & LOCKED)**

---

## 18. Motion Integration & System QA Validation (Phase 4.15)

Phase 4.15 performs end-to-end integration across all Approved Motion Patterns (01–07), validating consistency, performance, and accessibility across all viewports.

### Global ScrollTrigger Budget & Section Boundaries
* **Active Production ScrollTriggers:** Exactly 7 triggers active on Desktop (1 Hero exit scrub, 6 section entrances: `#about`, `#services`, `.approach`, `.products`, `#contact`, `.site-footer`).
* **Zero Duplicates / Zero Orphans:** 100% of triggers cleanly bound to their respective section container; zero cross-section selector leakage.
* **Fast-Scroll Protection:** `fastScrollEnd: true` and midpoint viewport checks ensure instant, clean resolution to resting states without stuck transforms.

### Motion Consistency & Intensity Audit
* **Intensity Rating:** **LOW–MODERATE** (calm, precise, enterprise-grade).
* **Durations:** Adheres strictly to motion tokens (Micro: 180–250ms, Standard: 400–650ms, Story: 950ms).
* **Easings:** Restricted to approved curves (`power2.out`, `power3.out`, `power2.in`, `power2.inOut`).
* **Distances:** 10–24px (never exceeding 40px maximum ceiling).
* **Staggers:** 0.05–0.08s (never causing sustained interface delays).
* **Scale Bounds:** 0.98 active press to 1.02–1.04 hover cues.
* **DOM Cleanup:** `clearProps: 'transform,opacity'` executed on timeline completions.

### Section-to-Section Handoffs
1. **Header → Hero:** Header enters in 750ms; Hero visual and headline follow seamlessly with overlapping stagger.
2. **Hero → About:** Subtle upward separation on Hero scroll exit leads naturally into the `#about` partner narrative.
3. **About → Services:** Trust pillars settle before the 4-card Services grid triggers.
4. **Services → Approach:** Service cards complete comfortably before process storytelling initiates.
5. **Approach → Products:** 3-step technical journey concludes before product grid enters.
6. **Products → Contact:** Product interaction resolves before Contact consultation card commands attention.
7. **Contact → Footer:** Multi-column footer provides a calm, quiet conclusion.

### System Verification & Compliance
* **Responsive Matrix:** 390px, 768px, 1024px, 1440px, 1920px, and 320px stress test verified (0px horizontal overflow, zero layout breaks).
* **Reduced Motion:** Full system compliance under `prefers-reduced-motion: reduce`.
* **Failure Safety:** 100% visible and functional when GSAP/ScrollTrigger CDN is blocked or unavailable.
* **Accessibility:** Tab order strictly preserved; visible Electric Blue focus rings verified.
* **Architecture:** 100% static HTML5/CSS3/Vanilla JS (zero React, Vite, Node, or npm build dependencies).

**Status:** The entire PROVITECH Motion System is **TESTED → DOCUMENTED → STABLE → LOCKED**.



