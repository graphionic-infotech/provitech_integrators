# PROVITECH INTEGRATORS — Static Web Platform

Welcome to the official static repository for **ProviTech Integrators** (Surat, Gujarat, India).

This project represents the clean, production-grade frontend rebuilt from the ground up for standard Linux/Apache shared hosting environments, without requiring Node.js runtime, npm dependencies, or JavaScript framework runtimes.

---

## 1. Project Overview

- **Brand:** PROVITECH INTEGRATORS
- **Industry:** CCTV Surveillance, Structured Cabling & Networking, Fire Alarm Systems, Access Control Integration
- **Headquarters:** Surat, Gujarat, India
- **Hosting Target:** Conventional Shared Hosting (cPanel / Apache / DirectAdmin)
- **Technical Architecture:** Semantic HTML5, Native CSS3 (Custom Properties), Vanilla JavaScript (ES6+), Optional jQuery, SVG Icons, Montserrat Web Typography. Future upgrade path to modular PHP.
- **Reference / Legacy Source:** The original Arena AI React/Vite implementation located in the parent directory (`../`) is preserved strictly as a read-only visual, content, and functional reference.

---

## 2. Locked Frontend Stack

| Layer | Standard | Details |
|---|---|---|
| **Markup** | HTML5 | Semantic, accessible, SEO-optimized markup |
| **Styles** | CSS3 | Native CSS custom properties, BEM/utility-hybrid, zero Tailwind dependency |
| **Scripting** | Vanilla JavaScript | Standards-compliant ES6+, zero build step required |
| **Libraries** | jQuery (Conditional) | Permitted only for specific lightweight DOM plugins if genuinely useful |
| **Typography** | Montserrat | Official Google Font weights: 400, 500, 600, 700, 800 |
| **Icons** | Inline / External SVG | Crisp vector icons replacing `lucide-react` component imports |
| **Backend Target** | Modular PHP | Planned for Phase 7 (contact form processing, modular header/footer includes) |

---

## 3. Directory Layout

```
provitech-static/
├── assets/
│   ├── css/                  # Centralized stylesheets (variables, base, components, responsive)
│   ├── js/                   # Vanilla JavaScript modules (navigation, hero, form, interactions)
│   └── images/
│       ├── brand/            # Official master logos & brand marks
│       ├── content/          # Photography & section imagery
│       └── icons/            # SVG vector symbols & favicon
├── docs/                     # Governance, architecture, guidelines & roadmaps
├── includes/                 # Future PHP partials (header, nav, footer, config)
├── index.html                # Main homepage (to be built in Phase 1)
└── brand-guidelines.html     # Brand Guidelines manual (to be built in Phase 1)
```

---

## 4. Documentation Index

The `docs/` folder contains comprehensive specifications governing all phases of this project:

1. [ROADMAP.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/ROADMAP.md) — Locked 9-phase execution roadmap and governance rules.
2. [PROJECT-BLUEPRINT.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/PROJECT-BLUEPRINT.md) — Master technical specification and architecture plan.
3. [DESIGN-SYSTEM.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/DESIGN-SYSTEM.md) — Official CSS tokens, color variables, spacing scale, and shadows.
4. [BRAND-GUIDELINES.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/BRAND-GUIDELINES.md) — Brand identity manual, logo rules, clear space, and palette usage.
5. [RESPONSIVE-RULES.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/RESPONSIVE-RULES.md) — Mobile-first viewport matrices (320px–1920px) and layout rules.
6. [COMPONENT-INVENTORY.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/COMPONENT-INVENTORY.md) — Component breakdown, states, and static mapping.
7. [PAGE-INVENTORY.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/PAGE-INVENTORY.md) — Existing page and section audit with future IA roadmap.
8. [MIGRATION-PLAN.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/MIGRATION-PLAN.md) — React/TSX to static HTML/JS conversion mappings.
9. [CHANGELOG.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/CHANGELOG.md) — Chronological history of project changes.
10. [QA-CHECKLIST.md](file:///Users/laynaik/Downloads/provitech_integrators/provitech-static/docs/QA-CHECKLIST.md) — Verification protocols across 16 quality dimensions.

---

## 5. Development & Serving Instructions

Because this project is 100% native static web code, it can be tested locally using any standard HTTP static file server, for example:

```bash
# Using Python 3 built-in server
cd provitech-static
python3 -m http.server 8080

# Or using PHP built-in server
php -S localhost:8080

# Or deployed directly into an Apache/Nginx htdocs/www directory
```

No `npm install`, `node_modules`, or compilation builds are required.
