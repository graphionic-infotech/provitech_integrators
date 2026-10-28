# STRUCTURED DATA TEMPLATE — PROVITECH INTEGRATORS

> [!WARNING]
> **DO NOT COPY TO PRODUCTION UNTIL BUSINESS DATA IS VERIFIED.**  
> This structured data template is a staged Schema.org schema definition. It must **NOT** be injected into live production HTML (`index.html`) until official business data (commercial telephone, verified domain mailbox, registered street address, and verified operating hours) has been verified and provided by the business owners.

---

## 1. Overview & Purpose

This template provides the verified target Schema.org JSON-LD structured data graph for **ProviTech Integrators**.

- **Primary Schema Types:** `LocalBusiness`, `SecuritySystemInstaller`
- **Target Location in Code:** `<head>` of `index.html` (once client verification is complete)
- **Status:** **DOCUMENTATION-ONLY (PHASE 5.8 AUDITED) — PENDING CLIENT BUSINESS DATA**
- **Production Injection:** **BLOCKED** — In accordance with Phase 5.8 Section 25–28 rules, live injection remains blocked until verified business data is supplied. Zero unverified schema in production HTML.

---

## 2. Staged JSON-LD Schema (Future-Ready)

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SecuritySystemInstaller"],
  "@id": "https://provitech.in/#localbusiness",
  "name": "PROVITECH INTEGRATORS",
  "alternateName": "ProviTech Integrators",
  "legalName": "PROVITECH INTEGRATORS",
  "url": "https://provitech.in/",
  "logo": "https://provitech.in/assets/images/brand/provitech-logo.png",
  "image": "https://provitech.in/assets/images/content/security-hero.jpg",
  "description": "ProviTech Integrators provides professional CCTV surveillance, networking solutions, fire alarm systems, and access control integration across Surat and South Gujarat.",
  "priceRange": "$$",
  
  "telephone": "+91 98250 12345",
  "email": "info@provitech.in",
  
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  
  "areaServed": [
    {
      "@type": "City",
      "name": "Surat"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Gujarat"
    }
  ],
  
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Security & Technology Integration Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CCTV Surveillance",
          "description": "Clear visibility, dependable recording and remote monitoring for complete peace of mind."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Networking Solutions",
          "description": "Reliable structured cabling and network infrastructure built around your space."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fire Alarm Systems",
          "description": "Early warning systems designed to help protect people, property and operations."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Access Control",
          "description": "Manage who enters your premises with secure, convenient access solutions."
        }
      }
    ]
  }
}
```

---

## 3. Required Data Checklist Before Production Injection

Before copying this script into `provitech-static/index.html`:

| Required Field | Code Placeholder Token | Client Data Needed | Verification Status |
|---|---|---|---|
| **Official Phone** | `+91 98250 12345` | Direct commercial telephone contact number | **VERIFIED** — Approved by client |
| **Official Email** | `info@provitech.in` | Official domain mailbox | **VERIFIED** — Approved by client |
| **Address Policy** | Regional: Surat, Gujarat, India | Option B: Regional territory confirmed | **VERIFIED** — Regional policy confirmed |
| **WhatsApp Business** | Omitted | Option: WhatsApp Not Required | **VERIFIED** — Client confirmed not required |
| **Operating Hours** | Omitted | Option: Hours Not Required | **VERIFIED** — Client confirmed not required |
| **Canonical Domain** | `https://provitech.in/` | Confirmed live production domain | **PENDING DNS CONFIRMATION** — Live schema injection held until live domain confirmed |

---

## 4. SEO & Verification Guardrails

1. **Zero Placeholder Injection:** Live HTML must remain clean without pseudo-values or unverified schema.
2. **No Fake Review / AggregateRating:** Do NOT add fake star ratings or fabricated customer reviews.
3. **Google Rich Results Validation:** When data is verified, validate the resulting payload in the [Google Rich Results Test](https://search.google.com/test/rich-results) prior to deployment.
