# PROJECT BLUEPRINT — PROVITECH INTEGRATORS

This document serves as the master engineering specification for the static web architecture of ProviTech Integrators.

---

## 1. Proposed Directory Structure

The project is structured for clean modularity, transparent maintainability, and seamless shared-hosting deployment:

```
provitech-static/
├── assets/
│   ├── css/
│   │   ├── variables.css      # CSS custom properties (colors, typography, spacing, shadows)
│   │   ├── reset.css          # Modern CSS reset and box-sizing rules
│   │   ├── typography.css     # Font-face loading, heading scales, body styles
│   │   ├── layout.css         # Container, grid system, section wrappers, header & footer
│   │   ├── components.css     # Buttons, cards, form inputs, swatches, modals
│   │   ├── pages.css          # Page-specific rules (home hero, brand guidelines manual)
│   │   └── main.css           # Master entry aggregator linking all stylesheets
│   ├── js/
│   │   ├── modules/
│   │   │   ├── navigation.js  # Mobile drawer menu toggle, scroll states, active links
│   │   │   ├── hero.js        # Interactive hero version switcher logic
│   │   │   ├── form.js        # Contact form validation and submission handler
│   │   │   └── copy-hex.js    # Clipboard interaction for Brand Guidelines swatches
│   │   └── main.js            # Main script entry initializing components on DOMContentLoaded
│   └── images/
│       ├── brand/             # Official logo in optimized PNG, WebP, and SVG formats
│       ├── content/           # Hero background, approach photography, product graphics
│       └── icons/             # Custom SVG icons, security symbols, favicon files
├── docs/                      # Architectural specifications, governance, and QA protocols
├── includes/                  # PHP partials for Phase 7 (header.php, nav.php, footer.php)
├── index.html                 # Homepage (HTML5)
├── brand-guidelines.html      # Brand Guidelines Manual (HTML5)
├── robots.txt                 # Search crawler instructions
├── sitemap.xml                # XML sitemap for search engines
└── .htaccess                  # Apache shared-hosting server configuration (caching, security, rewrites)
```

---

## 2. Page Architecture

### A. Phase 1–6 Static Page Model
- **`index.html` (Homepage):** Single-page anchor-based layout with hash links (`#home`, `#about`, `#services`, `#contact`). Contains the complete customer journey from hero to consultation booking.
- **`brand-guidelines.html` (Brand Manual):** Dedicated secondary page detailing the visual identity system, official color swatches, logo usage specifications, typography hierarchies, and UI application previews.

### B. Navigation & URL Strategy
- Clean, relative URL links: `<a href="index.html#services">Services</a>` and `<a href="brand-guidelines.html">Brand Guidelines</a>`.
- When deployed with `.htaccess` rewrite rules, pages can be accessed cleanly without `.html` extensions (`/` and `/brand-guidelines`).

---

## 3. Asset Architecture

### A. Image Storage & Naming Standards
- All brand marks reside in `assets/images/brand/` with descriptive kebab-case naming:
  - `provitech-logo-full.webp` / `.png` (Master full logo with camera mark and typography)
  - `provitech-mark-only.svg` (Isolated camera/shield glyph for favicon and badges)
- Content images reside in `assets/images/content/`:
  - `hero-cctv-building.webp` (Primary hero photography)
  - `approach-technician.webp` (Installation technician photography)
- Explicit HTML sizing attributes (`width="205" height="64"`) must be included on all `<img>` tags to eliminate Cumulative Layout Shift (CLS).

### B. Vector Icon Strategy
- Rather than importing heavy icon libraries, icons are embedded as clean, accessible inline SVGs or defined via an SVG sprite in `assets/images/icons/sprite.svg`.
- Every icon contains `aria-hidden="true"` and an optional screen-reader title when used standalone.

---

## 4. CSS Architecture

### A. Modular File Separation
To prevent the cascading override nightmare identified in the React audit (where 6 overlapping stylesheets competed for specificity), CSS is organized strictly into single-responsibility files:

1. **`variables.css`:** Central repository for all tokens. Contains ZERO visual rules—only `:root` definitions.
2. **`reset.css`:** Modern browser normalization; eliminates browser margin/padding discrepancies.
3. **`typography.css`:** Implements Montserrat webfont hierarchy, line heights, and letter spacing.
4. **`layout.css`:** Core structural scaffolds (`.container`, `.grid-2`, `.grid-4`, `.site-header`, `.footer`).
5. **`components.css`:** Reusable UI controls (`.btn`, `.btn-primary`, `.card-service`, `.form-group`).
6. **`pages.css`:** Specific layouts unique to the Hero variations and the Brand Guidelines swatches.
7. **`main.css`:** Master stylesheet importing all layers via `@import` during development, or concatenated for production.

### B. Specificity & Methodology
- Avoid `!important` declarations entirely.
- Adopt a clean, modified BEM (Block-Element-Modifier) naming scheme:
  ```css
  .service-card { ... }
  .service-card__icon { ... }
  .service-card__title { ... }
  .service-card--featured { ... }
  ```
- **Zero Tailwind Build Step:** All utility-like classes (`.text-blue`, `.mt-4`) are curated manually in CSS variables/utilities without requiring Node.js PostCSS processing.

---

## 5. JavaScript Architecture

### A. Execution Model
- Native ES6+ JavaScript organized as standard browser scripts or ES modules (`<script defer src="assets/js/main.js"></script>`).
- Zero build tools (no Webpack, Vite, Babel, or Rollup).
- Uses standard modern browser APIs:
  - `document.querySelector` / `addEventListener`
  - `IntersectionObserver` for scroll reveal animations and header sticky shadow states
  - `navigator.clipboard` for one-click color HEX copying
  - Native Form Validation API (`input.checkValidity()`)

### B. jQuery Guideline
- jQuery is **NOT** bundled by default.
- It is only permitted if a third-party, client-requested widget (such as a legacy slider or lightbox) explicitly demands it. Otherwise, 100% vanilla JavaScript is preferred for maximum performance.

---

## 6. Component Patterns

Every reusable pattern must satisfy:
1. **Semantic Foundation:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
2. **Independent State:** Interactive elements must toggle clean CSS state classes (e.g., `.is-active`, `.is-open`, `.is-scrolled`).
3. **Keyboard Accessibility:** All interactive elements must be focusable via `Tab` key, have visible `:focus-visible` rings, and support `Enter` / `Space` activation.

---

## 7. Naming Conventions

- **Directories & Files:** Kebab-case, lowercase only (`brand-guidelines.html`, `security-hero.webp`).
- **CSS Classes:** Kebab-case BEM-inspired (`.site-header`, `.main-nav__link`, `.btn--primary`).
- **CSS Variables:** Pre-fixed with `--brand-` or property category (`--brand-blue`, `--space-4`, `--radius-md`).
- **JavaScript Variables & Functions:** CamelCase (`isMenuOpen`, `toggleMobileNav()`).
- **Data Attributes:** Kebab-case prefixed with `data-` (`data-hero-version="1"`, `data-hex="#009DFF"`).

---

## 8. Responsive Strategy

- **Approach:** Mobile-first design system (`min-width` media queries).
- **Tested Breakpoint Scale:**
  - Extra Small Mobile: `320px`
  - Standard Mobile: `375px`, `390px`
  - Large Mobile: `430px`
  - Tablet Portrait: `768px`
  - Tablet Landscape / Small Laptop: `1024px`
  - Standard Laptop: `1280px`
  - Large Desktop: `1440px`
  - Ultra-Wide Desktop: `1920px`
- **Fluid Typography:** Clamp functions (`font-size: clamp(2rem, 5vw, 3.5rem)`) to eliminate jagged jump points between screens.

---

## 9. Future PHP Architecture (Phase 7 Specification)

When transitioning to PHP in Phase 7:
1. Files will simply be renamed from `.html` to `.php` (e.g., `index.php`).
2. Global layout pieces will be extracted into the `includes/` folder:
   - `includes/header.php` (Head tags, meta, logo, desktop navigation)
   - `includes/navigation.php` (Navigation menu arrays and drawer)
   - `includes/footer.php` (Footer columns, copyright, bottom scripts)
3. Dynamic settings will be managed in `config/config.php`:
   ```php
   <?php
   define('SITE_NAME', 'ProviTech Integrators');
   define('SITE_EMAIL', 'info@provitech.in');
   define('SITE_PHONE', '+91 98765 43210');
   ?>
   ```
4. Contact form submission will target `handlers/contact-process.php` with server-side validation and sanitization.

---

## 10. Shared-Hosting Requirements

The output is engineered to run seamlessly on budget Linux shared hosting (cPanel, Hostinger, GoDaddy, Bluehost, Namecheap, Apache):
- **Server:** Apache 2.4+ (or Nginx reverse proxy)
- **PHP Version:** PHP 8.0+ (when Phase 7 is initiated)
- **Dependencies:** None. No Node.js process, no PM2, no npm runtime.
- **Upload Mechanism:** Standard cPanel File Manager zip extraction or SFTP/FTP upload directly into `public_html/`.
