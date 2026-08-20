# TOPSYS IT — Build Plan

## Sitemap

```
/                                       homepage — approved, see reference
/capabilities                           overview + how engagements work
  /capabilities/ai-and-data             ★ flagship hub
    /ai-advisory  /generative-ai  /intelligent-automation
    /machine-learning  /data-platforms  /analytics  /ai-governance
  /capabilities/applications-and-modernization
    /custom-application-development  /legacy-modernization
    /integration-and-apis  /application-support
  /capabilities/cloud-and-platform-engineering
    /cloud-migration  /devops-and-devsecops  /platform-engineering
  /capabilities/cybersecurity
    /security-assessments  /identity-and-access  /compliance-and-risk
  /capabilities/technology-talent
    /staff-augmentation  /project-teams  /specialist-recruiting
/industries
  /financial-services  /telecommunications  /healthcare  /technology
/public-sector                          ★ top-level
  /state-and-local  /modernization  /how-to-work-with-us
/contract-vehicles                      DIR compliance requirement — footer + public sector only
/work                                   case studies
  /work/[slug]
/insights
  /insights/[slug]
/about
  /leadership  /how-we-work  /clients
/careers
  /open-roles
/contact
/legal/privacy  /legal/terms  /legal/security  /legal/subprocessors
```

**Primary nav (6):** Capabilities · Industries · Public sector · Case studies · Insights · About
**Utility:** Search (⌘K) · Careers · Talk to us

Careers is deliberately NOT primary — it's what made the old site read as a staffing agency.
Contract vehicles is deliberately NOT primary — required by DIR, but it's a staff-aug vehicle
and doesn't belong in a solutions nav.

---

## Page specifications

### `/` Homepage
Built and approved. See `/docs/homepage-reference.html`.
Section order: hero → proof bar → dual model → capabilities → AI (inverted) → public sector →
case studies (inverted) → how we work + credentials → insights (inverted) → careers strip →
closing CTA → footer.

### `/capabilities/ai-and-data` — flagship
1. Hero: *AI is an engineering problem before it's a model problem*
2. **Where enterprise AI stalls** — data quality, integration, ownership, governance. Naming the
   failure modes is the strongest credibility move available and costs nothing.
3. Seven capability blocks — each gated on `{{CAP-AI-01..07}}` verification
4. Engagement arc — Strategy → Use case → Data → Build → Integrate → Govern → Scale, expanded
5. Technology stack, named — `{{CAP-STACK}}`
6. Use cases by industry
7. `{{CASE-01}}` (payments) or `{{CASE-02}}` (revenue intelligence)
8. CTA — *Discuss your AI use case*

### `/public-sector`
1. Hero in agency vocabulary, not enterprise marketing register
2. Map + `{{STAT-01}}` (30 states)
3. What we do for agencies — modernization, data, security, talent
4. **"We understand the constraints"** — procurement timelines, accessibility, records retention,
   audit, legacy integration, workforce continuity. This section is where you either sound like
   you've done it or you don't.
5. `{{CASE-04}}` — **currently missing, highest-priority content gap**
6. How to work with us → links to `/contract-vehicles`
7. CTA — *Request a capability briefing*

### `/capabilities/technology-talent`
Must earn its place without dragging the brand back to staffing.
1. Hero: *Engineers who vet engineers*
2. The market's failure mode: résumé volume, no technical screening, no post-placement accountability
3. **How we're different** — recruiters work alongside delivery teams. Gated on `{{CAP-03}}`
4. Three models: embedded specialists · project pods · specialist recruiting
5. Skills coverage — named technologies, not "IT professionals"
6. **MSP / workforce program logos live here and nowhere else**
7. The bridge: *many clients start with a team and end with a program*
8. CTA — *Tell us what you need to staff*

### `/about`
Founder bio (Abhishek Reddy Baddam — 25+ years, M.S. Computer Science, CUNY), how we work,
credentials, offices. Mission/vision/values reduced to three lines maximum — it's table stakes,
not persuasion.

### `/contact`
Routed intake: enterprise engagement · public sector briefing · talent requirement · careers.
Different forms, different fields, different destinations. Never one generic "Contact us".

---

## Build order

**Phase 1 — Foundation**
Scaffold, Tailwind theme from CLAUDE.md tokens, fonts via `next/font`, base layout,
typography scale, colour tokens verified against contrast table.

**Phase 2 — Components**
Buttons, datum-rule nav + capability mega-panel, command bar (⌘K), capability card, case study
card, stat display, client card, US map, tabs, accordion, forms, CTA band, footer, breadcrumb.
Build in isolation. Pages compose them.

**Phase 3 — Homepage**
Match `/docs/homepage-reference.html` exactly. Port the three.js hero scene, the pre-projected
map, the interactive AI arc, and the how-we-work selector.

**Phase 4 — Priority pages**
`/capabilities/ai-and-data` → `/public-sector` → `/capabilities` → `/capabilities/technology-talent`
→ `/about` → `/contact`

**Phase 5 — Remaining pages**
Industries, sub-capability pages, `/work`, `/insights`, `/careers`, `/contract-vehicles`, legal

**Phase 6 — Content layer**
MDX for case studies and insights first. Move to Sanity when the client confirms who edits the
site — this decision is still open and it matters more than it looks. A Next.js repo means every
content change is a pull request unless planned for, and that is what kills redesigns.

**Phase 7 — Launch**
Accessibility audit (axe + manual keyboard pass), Lighthouse, redirect map, metadata, sitemap,
`robots.txt`, structured data, analytics, form endpoints.

---

## Redirects

The current WordPress site has existing rankings and a DIR-required contract page.
Build a redirect map **before cutover** or the accumulated authority is lost.

Known old URLs to map:
```
/who-we-are/            → /about
/services/ai-ml/        → /capabilities/ai-and-data
/services/cloud/        → /capabilities/cloud-and-platform-engineering
/services/[others]      → matching new capability page
/dir-contract/          → /contract-vehicles     (must remain reachable — DIR requirement)
/careers/               → /careers
```
Crawl the live site for the complete inventory. Anything with inbound links or impressions gets a
301. Do not 404 the DIR page under any circumstances.

---

## SEO

Highest-value untapped intent: **state-level modernization and procurement searches.** Nobody in
the competitive set writes well for these, and TOPSYS has the state footprint to support it.

- One `<h1>` per page matching search intent
- Metadata per route, no templated duplicates
- `Organization` and `BreadcrumbList` structured data; `Article` on insights
- Internal linking: capability pages ↔ case studies ↔ industries
- No keyword stuffing. Depth ranks; repetition doesn't.

---

## Launch checklist

- [ ] All `{{TOKENS}}` resolved or the section removed — no tokens ship to production
- [ ] Written client permission on file for every named client
- [ ] State count reconciled and locked (it has moved 14 → 23 → 30 across review rounds)
- [ ] Partner logos verified — the CEO's first answer was "I don't think we have any"
- [ ] `/contract-vehicles` live and DIR-compliant
- [ ] Zero fabricated content anywhere
- [ ] axe clean, manual keyboard pass, reduced-motion verified
- [ ] Lighthouse ≥ 95 performance and accessibility
- [ ] Redirects tested
- [ ] Forms tested end to end, spam protection without a CAPTCHA that blocks screen readers
