# LEGACY ARENA REACT / VITE REFERENCE ARCHIVE

> [!CAUTION]
> **DO NOT DEPLOY THIS FOLDER TO PRODUCTION HOSTING**
> This directory contains the original, frozen React/Vite/Tailwind prototype imported from Arena AI.
> It is strictly preserved for historical and reference purposes.
>
> **The active, production-ready static website is located at: `provitech-static/`**

---

## Purpose of this Archive

During Phases 0 through 4 of the PROVITECH INTEGRATORS project, this prototype was fully analyzed and migrated into a completely independent, standards-compliant static web platform (`provitech-static/`) built with:
- HTML5
- CSS3 (Vanilla design tokens, zero Tailwind runtime)
- Vanilla JavaScript (ES modules, zero React/Vite runtime)
- Standard static assets

This static platform is designed for direct shared-hosting deployment (`public_html/`) without requiring Node.js, npm, or build servers.

---

## Archive Contents

- `src/main.tsx` — Original React homepage prototype.
- `src/BrandGuidelines.tsx` — Original React brand guidelines prototype.
- `src/*.css` — Original Tailwind and component style sheets.
- `public/` — Original public images.
- `dist/` — Original Vite production build bundle.
- `vite.config.ts`, `tsconfig.json` — Vite and TypeScript configuration files.
- `package.json`, `package-lock.json` — Original npm dependencies (`react`, `react-dom`, `lucide-react`, `tailwindcss`, `vite`).

---

## Running the Archived Prototype (Optional / Developer Reference)

If a developer ever needs to run this archived React prototype locally:

```bash
cd _archive/arena-react-reference
npm install
npm run dev
```

*Note: The production project `provitech-static/` does NOT use any code from this folder.*
