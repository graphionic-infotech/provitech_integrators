# MIGRATION PLAN: REACT/VITE → CLEAN STATIC FRONTEND

This document maps the exact migration strategy from the legacy React/Vite implementation (`../`) to the static HTML5/CSS3/JavaScript web architecture (`provitech-static/`).

---

## 1. Component & Syntax Translation Matrix

| React / Vite Feature | Implementation in React | Static Equivalent (Phase 1) | Phase 1 Status | Future PHP Target (Phase 7) |
|---|---|---|---|---|
| **Entry Point** | `src/main.tsx` + `index.html` | `index.html` | **COMPLETED** | `index.php` |
| **Brand Manual** | `src/BrandGuidelines.tsx` | `brand-guidelines.html` | **COMPLETED** | `brand-guidelines.php` |
| **Header Layout** | JSX `<header className="site-header">` | Semantic `<header class="site-header">` | **COMPLETED** | `includes/header.php` |
| **Navigation Menu** | `<nav className={`main-nav ${menu?'open':''}`}>` | `<nav class="main-nav" id="main-nav">` | **COMPLETED** | `includes/navigation.php` |
| **Footer Layout** | JSX `<footer className="footer">` | Semantic `<footer class="footer">` | **COMPLETED** | `includes/footer.php` |
| **Routing** | `window.location.pathname === '/brand-guidelines'` | Real HTML file links: `<a href="brand-guidelines.html">` | **COMPLETED** | Clean URL `.htaccess` routing |
| **Mobile State** | `const [menu, setMenu] = React.useState(false)` | Vanilla JS drawer in `navigation.js` | **COMPLETED** | Unchanged (Client-side JS) |
| **Hero Version State** | `const [heroVersion, setHeroVersion] = React.useState(1)` | Vanilla JS switcher in `hero.js` | **COMPLETED** | Unchanged or server-rendered |
| **Scroll Elevation** | `React.useEffect(() => { ... window.addEventListener('scroll') })` | Vanilla JS scroll listener in `navigation.js` | **COMPLETED** | Unchanged (Client-side JS) |
| **Lucide React Icons** | `import { Camera, Network, Flame, Fingerprint, ... } from 'lucide-react'` | Clean, optimized inline `<svg>` elements | **COMPLETED** | Inline SVG or SVG sprite |
| **Form Handling** | `onSubmit={e => { e.preventDefault(); alert(...); }}` | Native HTML validation + async JS handler (`forms.js`) | **COMPLETED** | Server-side `handlers/contact.php` |
| **Asset Paths** | Root-absolute `/images/provitech-logo.png` | Relative `assets/images/brand/provitech-logo.png` | **COMPLETED** | Dynamic `<?= BASE_URL ?>/assets/images/...` |
| **CSS System** | Vite `@tailwindcss/vite` + 5 overlapping CSS files | Clean modular CSS (`variables.css`, `layout.css`, etc.) | **COMPLETED** | Unchanged (Standard static CSS) |

---

## 2. Icon Migration Strategy (Lucide React → Inline SVG)

The React project imported 13 Lucide icons in [main.tsx](file:///Users/laynaik/Downloads/provitech_integrators/src/main.tsx#L3) and [BrandGuidelines.tsx](file:///Users/laynaik/Downloads/provitech_integrators/src/BrandGuidelines.tsx#L2):
- `ArrowRight`, `ArrowDown`, `Camera`, `Network`, `Flame`, `Fingerprint`, `Menu`, `X`, `Phone`, `Mail`, `MapPin`, `Check`, `Copy`, `Shield`.

**Migration Plan:**
1. Extract the raw SVG paths from the Lucide icons directly.
2. Embed the SVG markup cleanly into the static HTML with standard attributes:
   ```html
   <svg class="icon icon--arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <path d="M5 12h14"></path>
     <path d="m12 5 7 7-7 7"></path>
   </svg>
   ```
3. This eliminates the entire `lucide-react` npm package and 1,900+ transformed bundler modules while preserving identical vector sharpness.

---

## 3. CSS Migration & De-Tailwinding Strategy

- The React project included `@import "tailwindcss";` in `index.css` alongside 44KB of compiled CSS.
- An audit of `src/main.tsx` revealed that Tailwind utility classes were **barely used** in the JSX; the layout relied almost exclusively on custom semantic classes (`.container`, `.site-header`, `.hero-text`, `.services-grid`, `.approach-grid`, `.contact-form`, `.footer`).
- **Migration Plan:**
  - Build clean, hand-crafted native CSS based on custom properties (`--brand-blue`, etc.).
  - Avoid compiling Tailwind via npm/Node.
  - Eliminate the ~44KB bundle bloat in favor of a lean ~12KB custom stylesheet.

---

## 4. Form Handling Evolution

### Phase 1–5: Client-Side Interactive Form
- Fields: `name` (text, required), `phone` (tel, required), `service` (select dropdown), `message` (textarea).
- Browser validation using HTML5 constraint attributes (`required`, `pattern`).
- Vanilla JavaScript prevents default submit, validates inputs, and renders an elegant inline feedback card (no browser `alert()`).

### Phase 7: PHP Server-Side Processing
- Form `action` updates to `handlers/contact-process.php` with `method="POST"`.
- Backend sanitizes inputs (`htmlspecialchars`, `strip_tags`), validates email/phone format, verifies a CSRF token, and sends an HTML email via PHP `mail()` or SMTP.

---

## 5. Absolute Preservation Checklist

During migration, the following elements from the verified React baseline must be **100% preserved**:

- [x] **Core Content & Copy:** All headline variations, kicker text, Surat business narrative, 4 service descriptions, and 3 approach steps.
- [x] **Visual Layout:** Exact grid proportions, section sequencing, image placements, and spacing rhythm.
- [x] **Brand Mark:** The official 2172×724 ProviTech logo without distortion, recoloring, or clipping.
- [x] **Brand Color Tokens:** Exact hex values: `#25282D`, `#009DFF`, `#061B49`, `#FFFFFF`, `#F1F5F9`, `#374151`.
- [x] **Typography:** Montserrat webfont across all headings, controls, and body text.
- [x] **Photography:** High-resolution building security hero and installation technician imagery.
- [x] **SEO Foundation:** Accurate title, meta description, heading hierarchy, and alt tags.
- [x] **Accessibility Semantics:** Landmarks, skip-link, labels, and aria attributes.
