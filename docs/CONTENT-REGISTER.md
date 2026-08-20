# TOPSYS IT — Content Register

Every unverified fact on the site is a token. Supplying a value is a find-and-replace,
never a rewrite. **Nothing here may be invented, approximated, or filled with plausible copy.**

---

## Critical path — blocks launch

| Token | What's needed | Where it appears | Owner |
|---|---|---|---|
| `{{CASE-04}}` | **Public sector case study.** One paragraph: what the agency needed, what the team built, technologies, what changed. Anonymized is fine — "a state health and human services agency". Georgia DHS or Pennsylvania Corrections would both work. | `/public-sector`, homepage, `/work` | CEO |
| `{{METRIC-01}}` | **One quantified outcome** for the payments case study — reconciliation cycle time, error reduction, or hours recovered. A case study without a number reads as a capability description. Quadrant beats us on exactly this. | Homepage, `/work/payments-data` | CEO |
| `{{STAT-01}}` | **Final state count.** Has moved 14 → 23 → 30 across review rounds. A state agency checking whether it's listed is a plausible visitor. Lock it. | Homepage, `/public-sector` | CEO |
| `{{STAT-04}}` | AI and data engagements delivered, as a band (e.g. "20+") | Homepage AI section, `/capabilities/ai-and-data` | CEO |

---

## Proof and clients

| Token | What's needed | Owner |
|---|---|---|
| `{{PROOF-01}}` | One-line engagement descriptor for AT&T | CEO |
| `{{PROOF-02}}` | One-line engagement descriptor for T-Mobile | CEO |
| `{{PROOF-03}}` | Additional named direct clients for the proof row, if any | CEO |
| — | **Written permission on file** for each named client. Logo usage typically needs separate approval from name-only mention. | Legal / CEO |
| — | Client list split: direct clients / prime-sub / MSP-VMS placements. Primes go in a separately labelled "Partner and prime ecosystem" strip, never mixed with clients. | CEO |
| — | Morgan Stanley MSA check. Six rows in the client table run through Prolifics and Synechron; those agreements usually prohibit naming the end client. Client has approved naming — verify before launch. | Legal |

**Excluded by client decision:** Anthropic (not to be named) · Walmart metrics (removed — could not
be attributed to any known engagement) · contract vehicle detail beyond the DIR page.

---

## Credentials

| Token | What's needed | Owner |
|---|---|---|
| — | MBE certifying body and certificate number | CEO |
| — | SAM.gov UEI and CAGE codes | CEO |
| `{{PARTNER-01}}` | Partner tiers — AWS, Azure, Salesforce, Oracle OPN, UiPath. **The CEO's first answer was "I don't think we have any."** AWS APN Partner is the entry registration, so "AWS Partner" is displayable but a tier claim is not. Verify each or remove all. | CEO |

**Removed by client decision:** ISO, SOC 2, and CMMI tokens. Only MBE ships as a certification.

---

## Capability verification

Only capabilities TOPSYS can staff on Monday go on the site.

| Token | What's needed |
|---|---|
| `{{CAP-AI-01..07}}` | Confirm each of: AI advisory · generative AI · intelligent automation · machine learning · data platforms · analytics · AI governance. Anything not delivered in production comes out. |
| `{{CAP-STACK}}` | Named platforms, models and tools for the AI page technology section |
| `{{CAP-03}}` | Do recruiters work alongside delivery teams, or is recruiting separate? This is the central claim of `/technology-talent`. If it isn't true, the page needs a different differentiator. |

---

## Insights

Five pieces are written and approved (agentic AI, conversational AI, data, cloud, cybersecurity).

| Token | What's needed | Owner |
|---|---|---|
| `{{AUTHOR}}` | Named authors for each piece. Author attribution matters more than the prose — it proves there are practitioners behind the firm. | CEO |

**Cadence commitment:** one piece per month. An insights section with four posts from eighteen
months ago is worse than no insights section.

---

## Company

| Token | What's needed | Status |
|---|---|---|
| — | Years experience: 20+ | ✅ approved |
| — | Countries: 4 (US, Canada, Dubai, India) | ✅ approved |
| `{{BIO-01}}` | Founder bio + photo — Abhishek Reddy Baddam, 25+ years, M.S. Computer Science, CUNY | ✅ approved, needs photo |
| — | Additional leadership bios | Optional |

**Withheld by client decision:** headcount, revenue, delivery-location split, team sizes,
contract values.

---

## Case studies — approved

| ID | Title | Status |
|---|---|---|
| `{{CASE-01}}` | Cross-processor payment intelligence — anonymized as "a global payments technology company" | Written, needs `{{METRIC-01}}` |
| `{{CASE-02}}` | Unified revenue intelligence across five GTM systems — must run anonymous since the client is not named | Written |
| `{{CASE-03}}` | Real-time data platform under a 40ms latency SLA — Capital One, client approved naming | Written |
| `{{CASE-04}}` | Public sector engagement | **Missing — critical path** |
| — | Morgan Stanley engagement scope, now that naming is approved | Requested |

**One thing to agree internally:** which case studies are SOW-based and which are placement.
CS-03 describes placing engineers who then built the platform — legitimate and impressive, but
different from owning the deliverable. An evaluator may ask.
