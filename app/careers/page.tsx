import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Careers — TOPSYS IT",
  description:
    "Open roles at TOPSYS IT Solutions. Engineering and delivery positions across enterprise technology programs.",
};

const WHAT_IT_MEANS = [
  {
    title: "You work on real programs",
    body: "Not internal tooling or a proof of concept that never ships. Systems under production load with actual SLAs, real stakeholders, and consequences when something breaks.",
  },
  {
    title: "Technical bar, not recruiter bar",
    body: "Interviews run by engineers who have done the work. No generic HR scorecards. You talk to the people you would work with — before we make any decision.",
  },
  {
    title: "Delivery accountability",
    body: "You own the outcome, not just the ticket. We don&rsquo;t measure by story points or hours billed. We measure by whether the program moved forward.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Careers" }]} />
          <Eyebrow className="mt-6">Careers</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Build things that run in production.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We hire engineers who&rsquo;ve done it, not engineers who&rsquo;ve described it. Technical screens are run by practitioners. Roles are embedded in real programs — not staffing benches.
          </p>
        </div>
      </section>

      {/* ================================================================
          WHAT WORKING HERE MEANS — inverted, 3 columns
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>What to expect</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            What working here means
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-10 max-[767px]:grid-cols-1">
            {WHAT_IT_MEANS.map(({ title, body }) => (
              <div key={title} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CURRENT OPENINGS — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Open roles</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Current openings
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            Roles are posted as programs open. There is no standing bench. If there&rsquo;s no open role below that fits, submit a general application — when a matching program starts, we review the pipeline first.
          </p>

          <div className="mt-10 border border-hairline rounded-card px-7 py-8 bg-white">
            <p className="text-body text-ink-2">
              No open roles posted at this time. Submit your resume for future consideration — we&rsquo;ll reach out when a relevant program opens.
            </p>
            <div className="flex gap-3 flex-wrap mt-6">
              <Button href="/contact?re=careers">Submit your resume</Button>
              <Button
                href="https://linkedin.com/company/topsys-it"
                variant="secondary"
              >
                Follow us on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA STRIP — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap items-center justify-between">
            <div>
              <p className="font-display font-medium text-heading-4 text-ink">
                Ready to apply?
              </p>
              <p className="text-body-sm text-ink-2 mt-1 max-w-[52ch]">
                Tell us what you&rsquo;ve built, what you&rsquo;ve shipped, and where you want to work next.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="/contact?re=careers">Submit your resume</Button>
              <Button
                href="https://linkedin.com/company/topsys-it"
                variant="secondary"
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
