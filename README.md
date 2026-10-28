# ProviTech Integrators

Modern, high-performance web platform for **ProviTech Integrators** — CCTV, surveillance, and enterprise security system integration in Surat, Gujarat.

## Tech Stack
- HTML5 / Vanilla CSS3 (Custom Design Tokens)
- Modern JavaScript (ES6+)
- GSAP 3.12.5 (ScrollTrigger animation system)

## Project Structure
```text
provitech_integrators/
├── provitech-static/          # Production-ready static web project
│   ├── assets/
│   │   ├── css/               # Core design tokens, layout & components
│   │   ├── js/                # Main controller, navigation & motion scripts
│   │   └── images/            # Brand assets and optimized photography
│   ├── docs/                  # Architecture & UX guidelines
│   ├── index.html             # Main entry point
│   └── brand-guidelines.html  # Interactive brand guideline & tokens viewer
├── release/                   # Versioned release archives
└── README.md
```

## Local Development
To preview the website locally:
```bash
cd provitech-static
python3 -m http.server 8000
# or
npx http-server -p 8000
```
Then visit `http://localhost:8000/`.
