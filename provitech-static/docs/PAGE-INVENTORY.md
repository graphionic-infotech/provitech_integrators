# PAGE & SECTION INVENTORY — PROVITECH INTEGRATORS

This document inventories every existing page and section present in the legacy React prototype, evaluates its current purpose, and establishes the architectural recommendation for whether each section should remain on the single-page homepage or eventually become an independent subpage.

---

## 1. Current Page Inventory

| # | Current Route | Component | Page Type | Status in React | Static Implementation (Phase 1) | Verification Status |
|---|---|---|---|---|---|---|
| 1 | `/` | `App` ([src/main.tsx](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx)) | Landing Page / Homepage | Active (Single-page scroll) | `provitech-static/index.html` | **VERIFIED OPERATIONAL** (0 errors, 9 viewports tested) |
| 2 | `/brand-guidelines` | `BrandGuidelines` ([src/BrandGuidelines.tsx](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/BrandGuidelines.tsx)) | Brand Manual / Identity System | Active (Conditional render) | `provitech-static/brand-guidelines.html` | **VERIFIED OPERATIONAL** (0 errors, 9 viewports tested) |

---

## 2. Homepage Section Breakdown ([src/main.tsx](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx))

### Section 1: Topline Utility Bar
- **Current Location:** [main.tsx:L22](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L22)
- **Content:** Brand motto: `"SECURITY · NETWORKING · PEACE OF MIND"` and location badge: `"Surat, Gujarat"`.
- **Styling:** Height 32px, background `#25282D` (overridden from `#103d38`), hidden below 700px viewport.
- **Recommendation:** **Retain as Homepage / Global Header Component.** Essential for establishing local credibility in Surat.

---

### Section 2: Header & Main Navigation
- **Current Location:** [main.tsx:L23](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L23)
- **Content:** ProviTech logo link (`#home`), navigation links (`#home`, `#services`, `#about`, `#contact`, `/brand-guidelines`), mobile drawer CTA button, desktop CTA button (`"LET'S TALK"`), and mobile hamburger toggle button.
- **Behavior:** Sticky on scroll with dynamic `.scrolled` box-shadow class added via scroll listener.
- **Recommendation:** **Retain as Global Header.** When Phase 7 is reached, this will become `includes/header.php`.

---

### Section 3: Hero Section
- **Current Location:** [main.tsx:L24](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L24)
- **Content:**
  - Background imagery (`security-hero.jpg` with dark gradient overlay).
  - Version switcher allowing toggling between 3 copy variations:
    - Version 1: *"See more. Worry less."* (Kicker: `SECURITY, BUILT AROUND YOU`)
    - Version 2: *"Your world, in safe hands."* (Kicker: `PROTECTION THAT NEVER BLINKS`)
    - Version 3: *"Confidence starts here."* (Kicker: `SMART SECURITY. LOCAL EXPERTS.`)
  - Primary CTA button (`"EXPLORE SOLUTIONS"`) and secondary text link (`"Talk to our team"`).
  - Scroll indicator cue (`"SCROLL TO EXPLORE"`).
- **Recommendation:** **Retain as Homepage Hero.** During Phase 4, the prototype 3-version switcher widget should be evaluated for whether to keep as a presentation tool or consolidate into a single locked production headline.

---

### Section 4: About / Introduction Section (`#about`)
- **Current Location:** [main.tsx:L25](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L25)
- **Content:**
  - Eyebrow: `"YOUR LOCAL SECURITY PARTNER"`.
  - Heading: `"Technology that makes you feel right at home."`.
  - Body copy detailing ProviTech's services in Surat, Gujarat.
  - Link: `"Get to know us ->"` targeting `#contact`.
- **Architectural Analysis:**
  - *Current role:* High-level introduction explaining who ProviTech is.
  - *Recommendation:* **Keep as Homepage Section for now.** In future expansions, this can optionally link to an in-depth `about.html` company profile, but for Phase 1–5 it should remain on `index.html`.

---

### Section 5: Services Grid Section (`#services`)
- **Current Location:** [main.tsx:L26](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L26)
- **Content:**
  - Section heading: `"Security, made simple."`
  - 4 Core Service Cards:
    1. `CCTV Surveillance`: Clear visibility, dependable recording and remote monitoring.
    2. `Networking Solutions`: Structured cabling and network infrastructure.
    3. `Fire Alarm Systems`: Early warning systems for commercial & residential property.
    4. `Access Control`: Secure premises entry solutions.
- **Architectural Analysis:**
  - *Current role:* Concise summary of the 4 primary business verticals.
  - *Recommendation:* **Keep on Homepage.** Future Phase 7/8 expansion may create dedicated landing pages (`cctv-surveillance.html`, etc.) for local SEO ranking, but the homepage summary grid is essential for user conversion.

---

### Section 6: Approach / Customer Journey Section
- **Current Location:** [main.tsx:L27](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L27)
- **Content:**
  - Split grid: Left column features installation photography (`hero.jpg`); right column outlines the 3-step installation workflow:
    - Step 01: *Understand your needs*
    - Step 02: *Install with care*
    - Step 03: *Stay supported*
- **Recommendation:** **Keep on Homepage.** Excellent trust-building component that bridges service offerings with the contact form.

---

### Section 7: Products / Coverage Section
- **Current Location:** [main.tsx:L28](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L28)
- **Content:**
  - Dark-themed section (`#25282D`) titled `"One team. Complete cover."`.
  - 4 graphic cards representing integrated hardware coverage across homes, offices, and commercial sites.
- **Recommendation:** **Keep on Homepage.** Provides dark-mode visual contrast and reinforces hardware versatility.

---

### Section 8: Contact & Consultation Booking Section (`#contact`)
- **Current Location:** [main.tsx:L29](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L29)
- **Content:**
  - Left column: Direct phone link, email link, and geographic service area text (`Surat and surrounding areas, Gujarat`).
  - Right column: Interactive form with Name, Phone, Service selection dropdown, and Project Message textarea.
- **Recommendation:** **Keep on Homepage.** Primary lead generation funnel. In Phase 7, will connect to server-side PHP mailer.

---

### Section 9: Footer
- **Current Location:** [main.tsx:L30](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/main.tsx#L30)
- **Content:** Brand mark with white plate, slogan, column of internal navigation links, direct email link, and current year copyright line (`© 2026 ProviTech Integrators`).
- **Recommendation:** **Keep as Global Footer.** Modularized in Phase 7 as `includes/footer.php`.

---

## 3. Brand Guidelines Page Breakdown ([src/BrandGuidelines.tsx](file:///Users/laynaik/Downloads/provitech_integrators/_archive/arena-react-reference/src/BrandGuidelines.tsx))

The Brand Guidelines page is a self-contained brand manual containing 6 comprehensive sections:
1. **Brand Overview:** Mission statement, core positioning, and identity philosophy.
2. **Color System:** 6 interactive color swatches with one-click copy HEX actions.
3. **Official Logo:** Master artwork showcase across white, light grey, and charcoal contrast panels, plus clear-space specifications.
4. **Logo Usage Rules:** Side-by-side "Correct usage" vs. "Never do this" rules.
5. **Typography:** Specimen display of Montserrat with weight comparisons (400, 500, 600, 700, 800) and hierarchy samples.
6. **UI Application:** Button states, service card previews, form field focus states, and mini-dark footer preview.

- **Recommendation:** **Migrate to `brand-guidelines.html`.** This page serves as a valuable design token reference, stakeholder demonstration, and internal brand manual.

---

## 4. Architectural Recommendation Summary

> [!TIP]
> **Strict Phase 0 Directive:**
> Do **NOT** create additional standalone pages (e.g. `services.html`, `about.html`, `contact.html`) during Phase 1.
> The initial static conversion will map 1:1 with the existing verified React architecture:
> - **`index.html`** (Complete single-page landing site with hash sections)
> - **`brand-guidelines.html`** (Complete Brand Guidelines manual)
>
> Once Phase 1–6 are stabilized, additional dedicated SEO landing pages may be proposed for Phase 7/8.
