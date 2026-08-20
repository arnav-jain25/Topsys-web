import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export const metadata: Metadata = {
  title: "How to work with us",
  description:
    "Procurement paths, contract vehicles, and program engagement for state and local government agencies working with TOPSYS IT.",
};

const PROCUREMENT_PATHS = [
  {
    title: "DIR cooperative contract",
    body: "Texas state and local government entities can use DIR-CPO-5671 (ITSAC) without a full RFP. The cooperative contract is already in place. Procurement is a quote, not a solicitation. Fastest path for most Texas agencies.",
    cta: { label: "View contract details", href: "/contract-vehicles" },
  },
  {
    title: "Existing prime vehicles",
    body: "For agencies where we&rsquo;re not yet a direct vendor of record, we work as a subcontractor under existing primes. Bring us the scope and we&rsquo;ll identify the right prime arrangement and confirm the path.",
    cta: { label: "Talk to us", href: "/contact?re=public-sector" },
  },
  {
    title: "Direct contract",
    body: "For agencies that want a direct vendor relationship, we support the full procurement process from capability briefing through award: RFP responses, oral presentations, and scope negotiations.",
    cta: { label: "Request a briefing", href: "/contact?re=public-sector" },
  },
];

/* ---- Step icons — thin monoline, 20x20, mirrors the icon set already
   established in SiteHeader, ServicesShowcase, and the AI & data page ---- */
const IconBriefing = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2.5 4.5h13v8h-8L4 15v-2.5H2.5v-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.5 7.5h7M5.5 10h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconAlignment = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6 9l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconProposal = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4.5 2h6l3 3v11h-9V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M10.5 2v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M6.5 9.5h5M6.5 12h5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

const STEPS = [
  {
    ord: "01",
    title: "Capability briefing",
    body: "A 30-minute call covering your program, your timeline, and which procurement path fits. No proposal required, no commitment on either side. We ask specific questions about the work; you ask specific questions about us.",
    Icon: IconBriefing,
  },
  {
    ord: "02",
    title: "Scope alignment",
    body: "We review the requirements in detail and confirm whether the DIR contract, a prime arrangement, or a direct procurement is the right path. If it&rsquo;s DIR, we can issue a quote within days. If it&rsquo;s a prime or direct path, we outline next steps.",
    Icon: IconAlignment,
  },
  {
    ord: "03",
    title: "Proposal or quote",
    body: "Depending on the path: a quote under the DIR cooperative contract for Texas agencies, a teaming agreement if we&rsquo;re working through a prime, or a full proposal for a direct competitive procurement.",
    Icon: IconProposal,
  },
];

const CERTIFICATIONS = [
  {
    label: "MBE certified",
    body: "Minority Business Enterprise certification satisfies supplier diversity mandates in enterprise procurement and preference requirements in state government contracting.",
  },
  {
    label: "SAM.gov registered",
    body: "Active registration with UEI and CAGE code on file. Satisfies federal and state pre-qualification requirements for government contracting.",
  },
  {
    label: "D&B registered",
    body: "Registered with Dun & Bradstreet. Satisfies supplier registration requirements across enterprise and government procurement systems.",
  },
];

export default function HowToWorkWithUsPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden" style={{ padding: "6rem 0 5rem" }}>
        <span
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[120%] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(14,90,102,.07),rgba(141,198,62,.04) 45%,transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="wrap relative z-[1]">
          <Breadcrumb
            items={[
              { label: "Public sector", href: "/public-sector" },
              { label: "How to work with us" },
            ]}
          />
          <Eyebrow className="mt-6">Procurement</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "26ch",
            }}
          >
            Procurement doesn&rsquo;t have to be the hard part.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            State and local agencies have options beyond a full RFP. We hold a DIR cooperative contract for Texas, and we work through existing prime contractor vehicles for agencies where we&rsquo;re not yet a vendor of record. Most programs find a workable path faster than they expect.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=public-sector">Request a capability briefing</Button>
            <Button href="/contract-vehicles" variant="secondary">
              View DIR contract
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROCUREMENT PATHS — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Procurement paths</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Three ways to engage
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            The right path depends on your agency&rsquo;s vendor registration, timeline, and procurement authority. We work through whichever route is fastest and most defensible for your program.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12 max-[767px]:grid-cols-1">
            {PROCUREMENT_PATHS.map(({ title, body, cta }) => (
              <div key={title} className="border-t border-field-hairline pt-5 flex flex-col">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-on-field-2 flex-1">{body}</p>
                <a
                  href={cta.href}
                  className="font-mono text-mono-sm text-signal uppercase tracking-[.06em] hover:underline underline-offset-4 mt-5 inline-block"
                >
                  {cta.label} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          GETTING STARTED — paper, 3 steps
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Getting started</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Three steps from first contact to contract
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            Government procurement moves at government speed. We design our process to stay useful across the months it takes to get to contract, not just the first call.
          </p>

          <StaggerReveal
            className="grid grid-cols-3 gap-6 mt-10 max-[767px]:grid-cols-1"
            itemDelay={100}
          >
            {STEPS.map(({ ord, title, body, Icon }) => (
              <div
                key={ord}
                className="group bg-white border border-hairline rounded-card px-7 py-7 relative overflow-hidden transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-e2 hover:border-transparent"
              >
                {/* Gradient top edge on hover — one of the four permitted uses */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 transition-transform duration-base ease-standard group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="text-teal transition-colors duration-fast ease-standard">
                    <Icon />
                  </span>
                  <span className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.1em]">
                    {ord}
                  </span>
                </div>
                <h3 className="font-display font-medium text-heading-4 text-ink mt-4 mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2">{body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================
          CERTIFICATIONS BAR — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <Eyebrow>Registrations</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              letterSpacing: "-0.018em",
            }}
          >
            Certifications and supplier registrations
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-8 max-[767px]:grid-cols-1">
            {CERTIFICATIONS.map(({ label, body }) => (
              <div key={label} className="border-t-2 border-teal pt-5">
                <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                  {label}
                </h3>
                <p className="text-body-xs text-ink-2">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-body-xs text-ink-muted mt-8 max-w-[62ch]">
            These registrations satisfy supplier diversity mandates, pre-qualification requirements, and standard government supplier database requirements across enterprise and state procurement programs.
          </p>
        </div>
      </section>

      {/* ================================================================
          CTA
          ================================================================ */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap items-center justify-between">
            <div>
              <p className="font-display font-medium text-heading-4 text-ink">
                Ready to start the conversation?
              </p>
              <p className="text-body-sm text-ink-2 mt-1 max-w-[52ch]">
                A capability briefing is 30 minutes. No proposal required. We&rsquo;ll tell you which path makes sense for your program.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="/contact?re=public-sector">Request a capability briefing</Button>
              <Button href="/contract-vehicles" variant="secondary">View DIR contract</Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
