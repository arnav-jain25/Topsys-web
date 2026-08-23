# TOPSYS IT — Website Build

## What this is

A Next.js marketing site for TOPSYS IT Solutions LLC, a US technology delivery firm.
It replaces a WordPress site that reads as an IT staffing agency. The new site must read as a
**technology solutions and services company** — enterprise and government — with talent as one
capability among five, not the definition of the business.

Primary audience, in order: enterprise CIO/CTO → state government IT leadership → data/AI leaders
→ talent buyers → candidates.

**The positioning in one line:** we build the solution, we build the team, or both.
Never make that the hero headline. It is the underlying principle.

---

## Stack

- Next.js 15, App Router, TypeScript, **static generation** (no SSR runtime)
- Tailwind CSS with tokens in `tailwind.config.ts`
- Content: MDX under `/content` initially; Sanity later (see BUILD-PLAN)
- Deploy: Vercel or Netlify
- Fonts: `next/font` — Archivo (display), Public Sans (body), IBM Plex Mono (utility)

**Never** add: a UI kit (MUI, Chakra, Bootstrap), a chatbot, a carousel library, a cookie banner
beyond what law requires, WebGL beyond the single hero scene, or any animation library heavier
than what's already needed. Framer Motion is permitted only if used in three places or fewer.

---

## Visual reference

`/docs/homepage-reference.html` is the approved homepage design, signed off by the client.
It is the **visual source of truth**. Match it. When something in this file and the reference
disagree, the reference wins for appearance; this file wins for rules.

---

## Design tokens

Put these in `tailwind.config.ts` as the theme. **Disable arbitrary values** so nobody can write
`bg-[#8DC63E]` — the accessibility rules below depend on that.

### Colour

```
paper        #F8F7F3   page background (warm off-white, never pure white)
surface      #EFEDE6   raised regions
sunken       #E4E1D8   input fills
hairline     #D8D5CC   default 1px borders
hairlineStrong #B9B5A9 hover borders, emphasis rules

ink          #0E1A1F   primary text (petrol-tinted near-black)
ink2         #3C4A50   body text in dense passages
inkMuted     #667279   captions, metadata

teal         #0E5A66   interactive on light — links, primary buttons, focus
tealHover    #0A454E
tealTint     #E2EEEF   selected states, subtle fills

fieldDeep    #06232A   deepest ground — footer, closing CTA
field        #0B2F38   standard inverted section
fieldRaised  #123F4A   cards on field
fieldHairline rgba(255,255,255,.14)
onField      #EAF2F1   text on field
onField2     #A8BFBE   secondary text on field

signal       #8DC63E   interactive + accent ON FIELD ONLY (logo green)
signalHi     #A2D95A
```

**Signature gradient:** `linear-gradient(90deg,#0E5A66 0%,#2C8A6E 55%,#8DC63E 100%)`
Used in exactly four places: eyebrow dashes, nav active tick, card top-edge sweep on hover,
primary button hover fill. Nowhere else.

### Colour rules

1. **`signal` is banned on `paper` for anything meaningful.** It measures ~1.8:1 and fails AA.
   Permitted on light only as structural marks (nav ticks, hairline accents) that convey nothing.
2. **`teal` is for interaction only.** Links, buttons, focus rings. Never a decorative fill.
3. **The logo sits only on `paper` or `fieldDeep`.** On `fieldDeep` it goes on a white plate.
4. **Light sections explain. Inverted sections prove.** AI, case studies, insights, closing CTA
   are inverted. Everything else is paper.

### Type

| Role | Face | Weights |
|---|---|---|
| Display / headings | Archivo (Neue Montreal once licensed) | 400, 500, 600 |
| Body | Public Sans | 400, 600 |
| Utility — labels, ordinals, stats, code | IBM Plex Mono | 400, 500 |

- Headings **sentence case**, never Title Case
- Body measure capped at 68 characters
- **Statistics set in mono, never in display, never inside rings or donuts**
- Eyebrows: 12px mono, `letter-spacing: .1em`, uppercase via `text-transform`
- No italics anywhere

### Geometry and depth

- Radius: `2px` for buttons/inputs/tags, `4–8px` for cards, `0` for rules. No pills except tags.
- Shadows permitted, but structural only: elevation on interactive cards, glow **only inside
  inverted sections**. No shadows on static content, no glow on paper.
- Motion easing: `cubic-bezier(.2,0,0,1)` everywhere. Durations 180 / 280 / 500ms.
- Motion vocabulary: lines extend, rules unfold, content registers to grid, values count up once.
  Nothing bounces, parallaxes, or fades up from below.

---

## The O-mark

The abbreviated logo is a filled droplet with a circular counter — pointed top, round bottom,
hole punched through with `fill-rule: evenodd`.

It appears in exactly **one** place: as inverted map pins on the public sector map (point down,
circle head up, hole preserved), in `signal`, with a pulse halo and the state abbreviation below.

**Do not** add it to bullets, icons, dividers, loaders, or section markers. A motif used
everywhere stops being a signature. If a new use is proposed, it needs client sign-off.

---

## Content rules

**Never invent** a client name, statistic, case study, testimonial, certification, partnership,
award, contract, or outcome. Not as placeholder copy, not as lorem, not as "example" content.

Unresolved facts are tokens: `{{METRIC-01}}`, `{{CASE-04}}`, `{{PROOF-01}}` etc. Render them
visibly styled so they're obvious in review. Full list in `/docs/CONTENT-REGISTER.md`.

If content is missing for a section, leave the token or fill it with a plausible filler.

**Voice:** short declarative sentences. Concrete nouns. Name technologies. Quantify or say nothing.
Address the skeptic. Banned: "leading provider", "cutting-edge", "seamless", "empower", "unlock",
"revolutionize", "in today's fast-paced digital landscape", exclamation marks.

**The test for every sentence:** could a competitor put their logo on it and have it still be true?
If yes, it's filler. Delete or make it specific.

---

## Accessibility — WCAG 2.2 AA, non-negotiable

- Visible focus, 2px ring, 3px offset, never clipped by the sticky header
  (`scroll-padding-top: 100px`)
- 24×24px minimum targets; 44px for primary CTAs and mobile nav
- One `<h1>` per page, no skipped heading levels, landmark regions
- `prefers-reduced-motion` respected globally — the hero renders a static state
- Every SVG has `role="img"` + accessible label, or `aria-hidden` if decorative
- Forms: persistent visible labels, errors in text with `aria-describedby`, no placeholder-only
- Decorative map paths are `aria-hidden`; a visually-hidden list of served states precedes the map

---

## Performance budget

- LCP under 2.0s on 4G, CLS under 0.05
- No runtime `fetch()` for content that can be static. **The US map geometry is pre-projected and
  imported, not fetched** — the previous CDN version failed on `file://` and added a network hop.
- Total JS under 180KB gzipped excluding the hero scene
- Hero scene (three.js) lazy-loaded, skipped entirely under reduced-motion
- Images: `next/image`, AVIF/WebP, explicit dimensions

Government visitors run locked-down browsers on older hardware. A site that stutters reads as
amateur regardless of how it looks on a designer's monitor.

---

## Never do

Recorded so these don't creep back in during the build.

| Never | Why |
|---|---|
| State seals | Many states restrict commercial use; the map is stronger anyway |
| Stock or AI-generated photography | The tell that there was nothing real to show |
| Fabricated testimonials | Fails diligence |
| Ring / donut statistics | Template pattern from the old deck |
| Staffing boilerplate in the footer | The single worst thing about the old site |
| MSP logos on the homepage | Signals "staffing supplier" to a CIO. They belong on `/technology-talent` only |
| "Quality IT" tagline | "Quality" is a staffing promise |
| Chatbot | The nav's intent routing solves it better |
| Client logo wall with no context | Names need a one-line descriptor or they're noise |
| Mixing clients and primes in one grid | Reads as subcontractor |

---

## Working style

- Small commits, one concern each
- Build components before pages; pages compose, they don't define styles
- No inline styles in components except computed values
- Ask before adding a dependency
- When a design decision isn't covered here or in the reference, ask rather than guess —
  this project has had eight rounds of client iteration and the decisions are deliberate

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
