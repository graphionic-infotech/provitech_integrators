# PROVITECH INTEGRATORS — UI/UX GUIDELINES

## 1. Visual Direction & Identity

PROVITECH INTEGRATORS is an architectural security and systems engineering integrator specializing in enterprise surveillance, access control, fire protection, and structured network infrastructure.

The visual direction is anchored in nine core tenets:
- **Premium**: Bespoke architectural quality with deliberate composition and visual gravity.
- **Technical**: Engineered precision, systematic layout lines, and calibrated alignment.
- **Architectural**: Strong structural relationships between headlines, containers, and imagery.
- **Professional**: Uncompromised visual discipline, free of consumer gimmicks or flashy decorations.
- **Secure**: Reassuring stability conveyed through solid foundations, deep contrast, and structured surfaces.
- **Modern**: Clean geometric typography, subtle backdrop blurs, and refined micro-interactions.
- **Precise**: 1px fine hairline borders, exact grid increments, and unified component geometry.
- **Minimal**: Purposeful whitespace, concise copy blocks, and zero decorative clutter.
- **Enterprise-Grade**: Capable of winning high-stakes industrial, corporate, and infrastructure bids.

---

## 2. Color Palette & Tone Balance

The brand palette is strictly locked to the approved Phase 2 tokens:

| Token / Role | Hex Value | Primary Application |
|---|---|---|
| **Primary Charcoal** | `#25282D` | Dark section backgrounds, primary typography, topline utility bar |
| **Deep Navy** | `#061B49` | Hero overlays, architectural transition strip, secondary headings, footer accents |
| **Electric Blue** | `#009DFF` | Primary CTA backgrounds, active indicators, focus rings, technical badges, icon accents |
| **Electric Blue Light** | `#33B1FF` | Hover states, kickers on dark backdrops, subtle glow accents |
| **White** | `#FFFFFF` | Core surface background, service card background, form surface, dark-mode text |
| **Light Grey** | `#F1F5F9` | Alternating section backgrounds, input fields, badge containers |
| **Slate Grey** | `#374151` | Body paragraphs, secondary descriptions, neutral borders |

### Color Rules:
- **Electric Blue is an Accent**: Never flood large container surfaces with blue. It is strictly reserved for primary actions, active navigational states, technical badges, and focus rings.
- **Deep Navy provides Structural Anchor**: Used for high-impact cinematic contrast (hero overlays, transition strips, footer).
- **No Green/Teal Branding**: Maintain absolute fidelity to the core security blue and navy system.

---

## 3. Typography Architecture

- **Primary Font Family**: `Montserrat, sans-serif` (Google Fonts, weights 400 to 800).
- **Weight Hierarchy**:
  - `800 (ExtraBold)`: Hero title H1, process step counters (`01`, `02`, `03`).
  - `700 (Bold)`: Section H2 headings, product titles, primary button labels, eyebrow kickers.
  - `600 (SemiBold)`: Card titles (H3), navigation links, input labels, form buttons.
  - `500 (Medium)`: Hero switcher meta, sub-labels, badge metadata.
  - `400 (Regular)`: Body paragraphs, secondary notes, form inputs.
- **Line Heights**:
  - Headings: `1.1` to `1.25` for tight, cohesive typographic lockups.
  - Body copy: `1.6` to `1.8` for optimal readability and eye tracking.
  - UI Labels: `1.0` to `1.2` for vertically centered button and badge labels.

---

## 4. Section Composition & Rhythm

The page composition guides the visitor from high-impact brand confidence down to conversion:

```
1. Topline Utility Bar (Surat, Gujarat • Corporate Notice)
2. Sticky Header (Logo • Navigation • Active Underline • "LET'S TALK" CTA)
3. Cinematic Hero (Dark Navy/Charcoal Gradient • High-Contrast Title & Desc • "BOOK A FREE CONSULTATION" • Discreet Review Switcher)
4. Architectural Transition Strip (Certified Security Integration Status Dot • Capability Markers)
5. About / Introduction (Local Partner Story • 4 Architectural Trust Pillars)
6. Services Section (Light Grey Background • 4 Elevated White Technical Cards with Icon Badges)
7. Approach Section (Architectural Workflow Badge & Image • 01/02/03 Numbered Process Steps)
8. Products & Hardware (Dark Charcoal Section • Standardized 16:10 Cards • Action Buttons)
9. Contact / Consultation (Surat Location Info • Verified Data Placeholders • Soft-Shadow Form • Custom Native Select)
10. Global Footer (Primary Charcoal Foundation • White Logo Badge • Column Links • Copyright)
```

---

## 5. CTA Hierarchy

Visual priority must never be ambiguous:

1. **Tier 1 (Primary Conversion CTA)**:
   - Example: Hero `BOOK A FREE CONSULTATION`, Header `LET'S TALK`, Contact `SEND ENQUIRY`.
   - Treatment: Background `#009DFF`, Text `#061B49` (Bold Montserrat), 48px min height, 4px border radius.
   - Hover: Background `#33B1FF`, subtle -2px lift, `box-shadow: 0 4px 14px rgba(0, 157, 255, 0.35)`.
2. **Tier 2 (Secondary Navigation CTA)**:
   - Example: Hero `Explore solutions`.
   - Treatment: Quiet text link, high contrast, bottom border underline, arrow slide on hover.
3. **Tier 3 (Subtle In-Card Links)**:
   - Example: Service card `Explore service →`, About `Get to know us →`.
   - Treatment: Electric Blue color, 16px arrow, smooth 4px translation on hover.

---

## 6. Card & Container Architecture

- **Service Cards**:
  - Background: Solid White (`#FFFFFF`).
  - Border: 1px subtle neutral border (`#E2E8F0`).
  - Elevation: Resting `0 1px 3px rgba(6, 27, 73, 0.03)`; Hover `-4px` lift with `0 12px 28px rgba(6, 27, 73, 0.08)` and border tint `rgba(0, 157, 255, 0.35)`.
  - Icon Badges: Dedicated 48x48px container with `rgba(0, 157, 255, 0.08)` background and 1px border. Inverts to Electric Blue fill on card hover.
- **Product Cards**:
  - Background: `rgba(255, 255, 255, 0.03)` on dark section.
  - Border: 1px subtle light border (`rgba(255, 255, 255, 0.08)`).
  - Image Container: Standardized `16 / 10` aspect ratio with rounded corners.
  - Action Badge: Crisp white square at bottom-right, transitioning to Electric Blue on card hover.
- **Form Container**:
  - Dual-layer soft shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 16px 36px -4px rgba(6, 27, 73, 0.08)`.
  - 1px neutral border, 12px border radius.
  - Custom Native `<select>`: CSS SVG chevron data URI for seamless cross-platform styling while keeping native accessibility and mobile wheel controls intact.

---

## 7. Image Treatment & Framing

- **Hero Image (`security-hero.jpg`)**:
  - Centered object positioning.
  - Multi-stop gradient overlay: `rgba(6, 27, 73, 0.96)` to `0.38` ensuring >10:1 WCAG contrast on text while preserving the CCTV camera installation in view.
- **Approach Image (`hero.jpg`)**:
  - Architectural framing with 1px neutral border, 8px radius, and elevated shadow.
  - Floating technical badge (`.approach-badge`): Frosted dark navy backing with glowing Electric Blue status dot ("INTEGRATION WORKFLOW").
  - Subtle hover zoom capped at `1.02` to prevent dramatic distraction.
- **Product Images**:
  - Centered SVG technical silhouettes with uniform stroke weights.

---

## 8. Interaction & Motion Rules

- **Restrained Motion**: Transitions strictly bounded between `150ms` and `300ms` using cubic bezier easing.
- **Hover Lifts**: Maximum 2px to 4px translateY for buttons and cards.
- **Arrow Transitions**: Smooth horizontal translateX of 3px to 4px on hover.
- **Focus States**: High-contrast 3px Electric Blue ring (`rgba(0, 157, 255, 0.18)` to `rgba(0, 157, 255, 0.5)`) with 2px offset.
- **Reduced Motion**: Mandatory `@media (prefers-reduced-motion: reduce)` support instantly zeroing transitions and animations.

---

## 9. Content Integrity & Business Honesty

- **Zero Fabricated Claims**: No artificial establishment years, customer counts, warranty periods, or unverifiable awards.
- **Contact Data Honesty**: Flag any unverified phone numbers or email addresses with `REQUIRES VERIFIED BUSINESS DATA`.
- **Accurate Scope**: Clearly communicate core capabilities: CCTV surveillance, access control, fire alarm systems, and networking solutions in Surat and Gujarat.
