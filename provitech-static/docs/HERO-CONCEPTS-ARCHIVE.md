# HERO CONCEPTS ARCHIVE — PROVITECH INTEGRATORS

> **ARCHIVED / DESIGN REFERENCE — NOT PRODUCTION UI**  
> **Status:** ARCHIVED (Retired from production in Phase 4.7)  
> **Purpose:** Historical preservation of the exploratory Hero concepts developed during Phase 0–4 for Arena AI evaluation.

---

## 1. Selected Production Hero (Concept 01 — ACTIVE)

* **Design Tone:** High-contrast cinematic enterprise security narrative over security hero CCTV photography with multi-stop dark navy gradient.
* **Kicker:** `SECURITY, BUILT AROUND YOU`
* **Headline:** `See more. Worry less.`
* **Description:** `Smarter security and technology solutions to help protect your people, property and peace of mind.`
* **Primary CTA:** `BOOK A FREE CONSULTATION` (`.btn--primary`, Electric Blue `#009DFF`, Pure White text and arrow)
* **Secondary Action:** `Explore solutions` (`.hero-text-link`, White text with SVG arrow)
* **Status:** **Active in Production DOM (`index.html`)**.

---

## 2. Archived Concept 02 (Brand Pillar Focus)

* **Design Tone:** Architectural left accent bar with deep navy-to-transparent gradient emphasizing round-the-clock protection.
* **Kicker:** `PROTECTION THAT NEVER BLINKS`
* **Headline:** `Your world, in safe hands.`
* **Description:** `Always-on visibility. Thoughtful technology. A team you can count on when it matters most.`
* **CSS Reference:**
  ```css
  /* Concept 02 Styling (Archived) */
  .hero-concept-02 .hero-shade {
    background: linear-gradient(90deg,
      rgba(6, 27, 73, 0.94) 0%,
      rgba(6, 27, 73, 0.79) 44%,
      rgba(6, 27, 73, 0.18) 100%
    );
  }

  .hero-concept-02 .hero-text {
    border-left: 2px solid #009DFF;
    padding-left: clamp(16px, 3.5vw, 28px);
  }
  ```

---

## 3. Archived Concept 03 (Light Modern Inversion)

* **Design Tone:** Light grey/white frosted overlay exploring high daytime contrast for corporate commercial sites.
* **Kicker:** `SMART SECURITY. LOCAL EXPERTS.`
* **Headline:** `Confidence starts here.`
* **Description:** `Surat’s trusted team for CCTV, access control and connected security—planned around your property.`
* **CSS Reference:**
  ```css
  /* Concept 03 Styling (Archived) */
  .hero-concept-03 .hero-shade {
    background: linear-gradient(90deg,
      rgba(241, 245, 249, 0.97) 0%,
      rgba(241, 245, 249, 0.91) 37%,
      rgba(241, 245, 249, 0.55) 58%,
      rgba(6, 27, 73, 0.12) 100%
    );
  }

  .hero-concept-03 h1 {
    color: #25282D;
  }

  .hero-concept-03 .hero-text > p {
    color: #4A5568;
  }
  ```

---

## 4. Reason for Removal from Production DOM

The review switcher widget (`.hero-version-switch`, with 01/02/03 toggles) was built strictly as an internal development comparison utility during early design phases. It has fulfilled its review purpose and has been completely retired from the customer-facing website to maintain a clean, unencumbered enterprise presentation.
