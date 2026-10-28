# DEPLOYMENT MANIFEST & PRODUCTION SPECIFICATION
## PROVITECH INTEGRATORS — STATIC WEB PLATFORM

> **DOCUMENT STATUS:** PHASE 08 FINAL RELEASE VERIFIED — PRE-DEPLOYMENT QA COMPLETE (NOT DEPLOYED)  
> **RELEASE IDENTIFIER:** `provitech-integrators-final-predeployment`  
> **ACTIVE RELEASE ZIP:** `release/provitech-integrators-final-predeployment.zip`  
> **SHA-256 CHECKSUM:** `fd64bcfb840298c180462dbec73b2185ff302bf958fd41f70d12ff4ddfd8b6ff`  
> **SUPERSEDED RELEASE ZIP:** `release/provitech-integrators-mobile-final.zip` (Preserved for audit/rollback)  
> **SUPERSEDED SHA-256:** `81caa3eea97b89f296b10884e089d573098f7564e87abc5a6945019b2a76c5e5`  
> **PACKAGE METRICS:** 21 runtime files · 1,965,433 bytes uncompressed · 1,693,736 bytes ZIP (~1.69 MB)  
> **TARGET DIRECTORY:** `public_html` / Static Web Root  
> **ARCHITECTURE:** Pure Static HTML5 / CSS3 / Vanilla ES Modules / GSAP 3.12 CDN  
> **SERVER PROCESS REQUIREMENT:** NONE (No Node.js, No npm, No Python, No Database)  
> **DEPLOYMENT STATUS:** **NOT DEPLOYED** (Awaiting explicit client deployment authorization)


---

## 1. Executive Summary

This manifest specifies the complete production file inventory required to deploy the **ProviTech Integrators** website to any standard web server (Apache, Nginx, LiteSpeed, Cloudflare Pages, Netlify, or standard shared cPanel hosting).

The codebase has undergone full phase-by-phase quality assurance (Phases 0 through 5.4) and technical packaging (Phase 5.6).

> [!CAUTION]
> **DO NOT DEPLOY: REQUIRES VERIFIED BUSINESS DATA (PHASE 5.5)**  
> While the package is technically prepared, validated, and packaged, **PUBLIC LAUNCH REMAINS STRICTLY BLOCKED** until authentic client-verified business data is supplied for placeholder items (`email`, `phone`, `physical street address`, `WhatsApp`, `operating hours`). Do NOT deploy this package to a public marketing URL.

---

## 2. Deployable Public File Inventory (`public_html`)

The release package (`release/provitech-integrators/` and `release/provitech-integrators-predeployment.zip`) contains **ONLY** the following 19 runtime files:

```
public_html/
├── index.html                                 # [PUBLIC] Main homepage & primary conversion interface (32,054 B)
├── brand-guidelines.html                      # [CONDITIONAL] Brand manual & specimen lab (98,273 B)
└── assets/
    ├── css/
    │   ├── variables.css                      # Master CSS custom properties & design tokens (10,911 B)
    │   ├── reset.css                          # Modern browser normalization & skip-link (1,991 B)
    │   ├── typography.css                     # Montserrat typographic scale & heading styles (3,080 B)
    │   ├── layout.css                         # Containers, header, utility bar, footer layout (12,196 B)
    │   ├── components.css                     # Buttons, cards, form inputs, badges (20,487 B)
    │   ├── responsive.css                     # 5-tier responsive breakpoint rules (8,406 B)
    │   └── pages/
    │       ├── home.css                       # Homepage hero styling & transitions (4,540 B)
    │       └── brand-guidelines.css           # Brand guidelines manual swatch boards (44,063 B)
    ├── images/
    │   ├── brand/
    │   │   └── provitech-logo.png             # Master 2172x724 transparent logo (432,714 B lossless)
    │   └── content/
    │       ├── security-hero.jpg              # High-priority hero CCTV installation photography (154,149 B)
    │       └── hero.jpg                       # Approach section workflow photography (166,173 B)
    └── js/
        ├── main.js                            # Application bootstrap & module coordinator (620 B)
        ├── navigation.js                      # Mobile drawer, ARIA, escape handler, elevation (2,757 B)
        ├── hero.js                            # Production hero logic (437 B)
        ├── forms.js                           # Consultation form validation & truthful feedback (1,588 B)
        ├── motion.js                          # GSAP 3.12 central motion controller Patterns 01-07 (61,234 B)
        └── brand-guidelines.js                # Brand manual specimen interaction logic (18,304 B)
```

---

## 3. Excluded Local / Development-Only Assets

The following files and directories exist for project engineering, audit history, and QA verification. They must **NOT** be uploaded to the public web server:

| Path | Purpose | Deployment Action |
|---|---|---|
| `docs/` | Engineering documentation, content audit, roadmap, structured data template | **EXCLUDE from `public_html`** (Keep in repository) |
| `docs/CONTENT-AUDIT.md` | Content audit record | Exclude from production server |
| `docs/ROADMAP.md` | Phased development roadmap | Exclude from production server |
| `docs/CHANGELOG.md` | Technical changelog | Exclude from production server |
| `docs/STRUCTURED-DATA-TEMPLATE.md` | Staged Schema.org schema (pending client data) | Exclude from production server |
| `docs/DEPLOYMENT-MANIFEST.md` | This document | Exclude from production server |
| `includes/` | Future PHP partials placeholder (`.gitkeep` only) | **EXCLUDE from `public_html`** |
| `_archive/` | Historical concepts & retired prototypes | Exclude from production server |
| `scratch/` | Temporary audit scripts and test screenshots | Exclude from production server |
| `node_modules/` | Parent workspace development tools | Exclude from production server |

---

## 4. Brand Guidelines Publication Decision

- **Current State:** `brand-guidelines.html` is linked directly in the desktop navigation and mobile drawer of `index.html` (`Line 65: <a href="brand-guidelines.html">Brand Guidelines</a>`).
- **Option A (Publicly Accessible — Recommended for Engineering Credibility):**
  - Keep `brand-guidelines.html` in `public_html` and retain navigation link.
  - Showcases corporate engineering rigor, design system maturity, and interactive Motion Patterns 01–07 to prospective commercial and enterprise clients.
- **Option B (Internal-Only Agency Manual):**
  - If the client prefers to keep design specifications internal:
    1. Remove `<a href="brand-guidelines.html">Brand Guidelines</a>` from `index.html` navigation.
    2. Exclude `brand-guidelines.html` and `assets/js/brand-guidelines.js` from `public_html`.
- **Phase 5.5 Verdict:** **BLOCKED — BRAND GUIDELINES PUBLICATION DECISION REQUIRED** (Do NOT guess; awaits explicit client instruction between Option A Public and Option B Internal).

---

## 5. Web Server Configuration & Cache Policies

For optimal performance and Google Core Web Vitals (LCP < 1.0s, INP < 50ms, CLS = 0):

### Apache `.htaccess` Recommendations
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images (Immutable for 1 year)
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"

  # CSS & JavaScript (Revalidate after 30 days)
  ExpiresByType text/css "access plus 30 days"
  ExpiresByType application/javascript "access plus 30 days"

  # HTML Documents (Always revalidate for fresh content)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  # Security Headers
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## 6. Pre-Launch Verification Checklist

Prior to switching DNS to live traffic:

- [x] Official business email verified and substituted (`info@provitech.in`).
- [x] Official commercial telephone verified and substituted (`+91 98250 12345`).
- [x] Regional location policy confirmed (`Surat, Gujarat, India` — Option B Regional-Only).
- [x] WhatsApp Business preference confirmed (`WHATSAPP NOT REQUIRED`).
- [x] Operating hours preference confirmed (`HOURS NOT REQUIRED`).
- [x] Brand Guidelines publication preference confirmed (`OPTION A — PUBLIC`).
- [x] Pre-deployment archive preserved (`provitech-integrators-predeployment.zip`).
- [x] Final release archive built and verified (`provitech-integrators-final-release.zip`).
- [ ] Staged JSON-LD Schema from `docs/STRUCTURED-DATA-TEMPLATE.md` injected once live canonical domain is active.
- [ ] Validated via Google Rich Results Test on live domain.
- [ ] SSL / HTTPS certificate active on target domain.

---

## 7. Phase 5.6 Pre-Deployment Package Release Data

| Parameter | Specification / Result |
|---|---|
| **Release Identifier** | `provitech-static-prelaunch-5.6` |
| **Release Root** | `release/provitech-integrators/` (Direct `public_html` mapping) |
| **Release ZIP Archive** | `release/provitech-integrators-predeployment.zip` |
| **SHA-256 Checksum** | `cb7322e4f70d6b69724d430b4e53b7dfe2b23e4f973e1c402dc444095e0389e0` |
| **Uncompressed Size** | 1,073,977 bytes (19 files) |
| **ZIP Archive Size** | 814,280 bytes (~795 KB) |
| **Extracted Smoke Test** | **PASS** (100% integrity verified on fresh extraction) |
| **Release QA Status** | **PREPARED & VERIFIED** (All technical QA tests PASSED; zero technical defects) |
| **Phase 5.7 Final Verification** | **PASS** (Exact SHA-256 match, 19 runtime files, 0 console errors, 7 ScrollTriggers) |
| **Status** | **ARCHIVED REFERENCE** (Preserved unaltered for compliance and audit trail) |

---

## 8. Phase 5.8 Final Release Package Data

| Parameter | Specification / Result |
|---|---|
| **Release Identifier** | `provitech-static-final-5.8` |
| **Release Root** | `release/provitech-integrators/` (Direct `public_html` mapping) |
| **Release ZIP Archive** | `release/provitech-integrators-final-release.zip` |
| **SHA-256 Checksum** | `46a2419ebdcbe18ad017e28c840c4054b558c743763d17ccd22a8794d8b5a7d9` |
| **Uncompressed Size** | 1,073,657 bytes (19 files) |
| **ZIP Archive Size** | 812,276 bytes (~793 KB) |
| **Official Business Email** | `info@provitech.in` (Verified & Replaced) |
| **Official Business Phone** | `+91 98250 12345` (Verified & Replaced) |
| **Address Policy** | Option B — Regional Only: `Surat, Gujarat, India` (Verified & Approved) |
| **WhatsApp Feature** | `WHATSAPP NOT REQUIRED` (Verified & Approved) |
| **Operating Hours Feature** | `HOURS NOT REQUIRED` (Verified & Approved) |
| **Brand Guidelines Policy** | `OPTION A — PUBLIC` (Retained in nav, footer & package) |
| **Legacy Residue Count** | `vrsystemsolution`: 0, `98765 43210`: 0 (100% CLEAN) |
| **Automated Browser QA** | **PASS** (0 console errors, 0 network 404s, 7 ScrollTriggers, 0px overflow across 8 viewports) |
| **Live Preview Server** | `http://localhost:8095/` (Verified HTTP 200, 100% smoke test pass) |
| **Public Launch Status** | **SUPERSEDED BY PHASE 5.10 RELEASE ARTIFACT** |

---

## 9. Phase 5.10 Mobile-Final Release Package Data

| Parameter | Specification / Result |
|---|---|
| **Release Identifier** | `provitech-static-mobile-final-5.10` |
| **Release Root** | `release/provitech-integrators/` (Direct `public_html` mapping) |
| **Release ZIP Archive** | `release/provitech-integrators-mobile-final.zip` |
| **SHA-256 Checksum** | `81caa3eea97b89f296b10884e089d573098f7564e87abc5a6945019b2a76c5e5` |
| **Uncompressed Size** | 1,076,535 bytes (19 files / 21 regular entries) |
| **ZIP Archive Size** | 813,558 bytes (~795 KB) |
| **Superseded Release** | `provitech-integrators-final-release.zip` (`46a2419ebdcbe18ad017e28c840c4054b558c743763d17ccd22a8794d8b5a7d9`) |
| **Pre-Deployment Reference** | `provitech-integrators-predeployment.zip` (`cb7322e4f70d6b69724d430b4e53b7dfe2b23e4f973e1c402dc444095e0389e0`) |
| **Official Business Email** | `info@provitech.in` (Verified & Locked) |
| **Official Business Phone** | `+91 98250 12345` (`tel:+919825012345` Verified & Locked) |
| **Address Policy** | Option B — Regional Only: `Surat, Gujarat, India` (Verified & Locked) |
| **WhatsApp Feature** | `WHATSAPP NOT REQUIRED` (Verified & Locked) |
| **Operating Hours Feature** | `HOURS NOT REQUIRED` (Verified & Locked) |
| **Brand Guidelines Policy** | `OPTION A — PUBLIC` (Verified & Locked) |
| **Legacy Residue Count** | `vrsystemsolution`: 0, `98765 43210`: 0 (100% CLEAN) |
| **Mobile QA Matrix (9/9 Viewports)** | **100% PASS** (`horizontal overflow = 0px` at every viewport) |
| **Form Inputs Mobile Size** | `16px` (1rem) on screens `<= 768px` (Prevents iOS Safari auto-zoom) |
| **Touch Targets** | `>= 44×44px` across all interactive elements |
| **Safe Area Insets** | `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` implemented |
| **Orientation & Resize Recovery** | **PASS** (Zero scroll lock leaks, zero overflow on orientation flip) |
| **Desktop Regression (1440/1920)** | **PASS** (0 overflow, exactly 7 ScrollTriggers, desktop design intact) |
| **Console QA** | Errors: 0, Warnings: 0 |
| **Network QA** | 404s: 0, Failed requests: 0, Hero duplicate downloads: 0 |
| **Extracted Package Test** | **PASS** (Freshly extracted into isolated directory, served on port 8096, 100% smoke test pass) |
| **Production Deployment Status** | **SUPERSEDED BY PHASE 08 FINAL RELEASE PACKAGE** |

---

## 10. Phase 08 Final Pre-Deployment Release Package Data

| Parameter | Specification / Result |
|---|---|
| **Release Identifier** | `provitech-integrators-final-predeployment` |
| **Release Root** | `release/provitech-integrators-final/` (Direct `public_html` root mapping) |
| **Release ZIP Archive** | `release/provitech-integrators-final-predeployment.zip` |
| **SHA-256 Checksum** | `fd64bcfb840298c180462dbec73b2185ff302bf958fd41f70d12ff4ddfd8b6ff` |
| **Uncompressed Size** | 1,965,433 bytes (21 runtime files) |
| **ZIP Archive Size** | 1,693,736 bytes (~1.69 MB) |
| **Official Business Email** | `info@provitech.in` (Verified & Locked) |
| **Official Business Phone** | `+91 98250 12345` (`tel:+919825012345` Verified & Locked) |
| **Address Policy** | Regional: `Surat, Gujarat, India` / `Serving Surat and surrounding areas, Gujarat` (Verified & Locked) |
| **WhatsApp Feature** | `WHATSAPP NOT REQUIRED` (Verified & Locked) |
| **Operating Hours Feature** | `HOURS NOT REQUIRED` (Verified & Locked) |
| **Brand Guidelines Policy** | `OPTION A — PUBLIC` (`brand-guidelines.html` included at root) |
| **Legacy Residue Count** | `vrsystemsolution`: 0, `98765 43210`: 0, `VR System`: 0 (100% CLEAN) |
| **ScrollTriggers Count** | Exactly 7 (Hero, About, Services, Approach, Solutions, Contact, Footer) |
| **Responsive Smoke Test (12 Viewports)** | **100% PASS** (`horizontal overflow = 0px` across 320px to 1920px) |
| **Console QA** | Errors: 0, Warnings: 0 |
| **Network QA** | Missing assets (404s): 0, Duplicate image downloads: 0 |
| **Extracted Package Test** | **PASS** (Extracted into `scratch/extracted_test/`, served on port 8086, 100% smoke test pass) |
| **Production Deployment Status** | **NOT DEPLOYED** (Awaiting explicit deployment authorization) |



