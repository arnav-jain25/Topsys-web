import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroSceneLoader } from "@/components/sections/HeroSceneLoader";
import {
  StatBar,
  ServicesShowcase,
  DualModel,
  CapabilityGrid,
  AIArc,
  USMap,
  CaseStudyGrid,
  HowWeWork,
  InsightsAccordion,
  CareerStrip,
  CTASection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="relative flex flex-col justify-center overflow-hidden"
        style={{ minHeight: "78vh", padding: "5.5rem 0 3.5rem" }}
        aria-label="Hero"
      >
        {/* Particle canvas — fills the section, pointer-events none */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Ambient glow behind the canvas */}
          <span
            className="absolute z-0 pointer-events-none"
            style={{
              left: "40%", top: "0%", width: "68%", height: "100%",
              background: "radial-gradient(circle,rgba(14,90,102,.12),rgba(141,198,62,.08) 42%,transparent 68%)",
            }}
            aria-hidden="true"
          />
          {/* Secondary glow, low-left, balances the composition without added WebGL cost */}
          <span
            className="absolute z-0 pointer-events-none"
            style={{
              left: "-8%", bottom: "-15%", width: "38%", height: "60%",
              background: "radial-gradient(circle,rgba(14,90,102,.06),transparent 70%)",
            }}
            aria-hidden="true"
          />
          <HeroSceneLoader />
        </div>

        <div className="wrap relative z-[2] hero-copy-grid w-full">
          <div className="hero-copy">
            <h1
              className="font-display font-medium text-ink mb-6"
              style={{ fontSize: "clamp(2.25rem, 5.4vw, 5.5rem)", lineHeight: 1.02, letterSpacing: "-0.035em" }}
            >
              <span className="block whitespace-nowrap">Technology</span>
              <span className="block whitespace-nowrap">
                that{" "}
                <span className="text-signature">has to work.</span>
              </span>
            </h1>
            <p
              className="text-ink-2 max-w-[54ch] mb-10"
              style={{ fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)", lineHeight: 1.6 }}
            >
              Modernization, AI, and the engineers who ship it. TOPSYS IT builds and runs critical systems for enterprises and government agencies across the United States.
            </p>
            <div className="flex gap-3 flex-wrap max-[600px]:[&>a]:w-full">
              <Button href="/contact" className="min-[1440px]:h-[56px] min-[1440px]:px-8 min-[1440px]:text-[16px]">Talk to us</Button>
              <Button href="/capabilities" variant="secondary" className="min-[1440px]:h-[56px] min-[1440px]:px-8 min-[1440px]:text-[16px]">
                Explore services
              </Button>
            </div>
            <div className="mt-10 pt-6 border-t border-hairline flex flex-wrap gap-x-8 gap-y-2 font-mono text-mono-sm min-[1440px]:text-[15px] text-ink-muted uppercase tracking-[.06em]">
              <span>20+ years</span>
              <span>30 states served</span>
              <span>4 countries</span>
              <span>MBE certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          PROOF BAR — stats + client grid
          ================================================================ */}
      <section className="border-t border-hairline" style={{ padding: "4rem 0 3rem" }}>
        <div className="wrap">
          <StatBar />
          <ServicesShowcase />
        </div>
      </section>

      {/* ================================================================
          DUAL MODEL — build the solution / build the team
          ================================================================ */}
      <section style={{ padding: "4rem 0 8rem" }}>
        <div className="wrap">
          <Eyebrow>The model</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em", maxWidth: "18ch" }}
          >
            Build the solution. Build the team. Or both.
          </h2>
          <p className="text-lede text-ink-2 max-w-[64ch] mt-6">
            Most firms make you choose. A consultancy scopes your program and staffs it with people you didn't pick. A staffing vendor sends résumés and steps back at onboarding. We do both, with the same engineering standard and the same accountability, as one firm.
          </p>
          <DualModel />
        </div>
      </section>

      {/* ================================================================
          CAPABILITIES
          ================================================================ */}
      <section id="services" style={{ paddingBottom: "8rem" }}>
        <div className="wrap">
          <Eyebrow>Services</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em" }}
          >
            What we build
          </h2>
          <CapabilityGrid />
        </div>
      </section>

      {/* ================================================================
          AI & DATA — inverted
          ================================================================ */}
      <section id="ai" className="on-field" style={{ padding: "8rem 0" }}>
        <div className="wrap">
          <Eyebrow>AI & data</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em", maxWidth: "20ch" }}
          >
            AI that survives data contact with production.
          </h2>
          <p className="text-lede text-on-field-2 max-w-[64ch] mt-6">
            Most enterprise AI stalls in the same place: a pilot works in a notebook, then meets real data, real users and real compliance requirements. We start further back. What's the workflow, what does it cost you today, and is the data underneath it good enough to trust?
          </p>

          <AIArc />

          <div className="grid grid-cols-3 gap-6 mt-24 max-[1023px]:grid-cols-1">
            {[
              { title: "Automate knowledge-heavy work", body: "Document-intensive processes, case handling and review workflows where the bottleneck is reading, not deciding." },
              { title: "Make institutional knowledge searchable", body: "Retrieval systems over the documents, policies and records your teams already can't find." },
              { title: "Turn data into decisions", body: "Models and analytics tied to a specific decision, with a defined owner and a defined measure." },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="border-t border-field-hairline pt-4 transition-colors duration-base ease-standard hover:border-signal"
              >
                <h4 className="font-display font-medium text-heading-4 text-on-field mb-2">{title}</h4>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Button href="/capabilities/ai-and-data">Discuss your AI use case</Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          PUBLIC SECTOR
          ================================================================ */}
      <section id="public-sector" style={{ padding: "8rem 0" }}>
        <div className="wrap">
          <Eyebrow>Public sector</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em", maxWidth: "22ch" }}
          >
            Government technology, delivered to the standard it demands.
          </h2>

          <div className="grid grid-cols-[1.35fr_.65fr] gap-16 items-start mt-12 max-[1023px]:grid-cols-1">
            <USMap />
            <div>
              <p className="text-body text-ink-2">
                We work with state agencies on modernization, data, security and the specialized staff these programs run on. Long procurement cycles, accessibility requirements, audit exposure, systems older than the people maintaining them: we've worked inside all of it.
              </p>
              <dl className="mt-8 space-y-0">
                <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-ink-muted border-t border-hairline pt-4 mt-4">
                  Agency types served
                </dt>
                <dd className="text-body-sm text-ink-2 mt-1">
                  Health & human services · Corrections · Transportation · General services · Department of Homeland Security (DHS) · Department of Administrative Services (DOAS) · Department of Labor (DOL) · Job and Family Services (JFS)
                </dd>
                <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-ink-muted border-t border-hairline pt-4 mt-4">
                  States served
                </dt>
                <dd className="text-body-sm text-ink-2 mt-1">30</dd>
              </dl>
              <div className="mt-8 flex gap-3 flex-wrap">
                <Button href="/contact">Request a capability briefing</Button>
                <Button href="/public-sector/how-to-work-with-us" variant="secondary">
                  How to work with us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CASE STUDIES — inverted
          ================================================================ */}
      <section id="work" className="on-field" style={{ padding: "8rem 0" }}>
        <div className="wrap">
          <Eyebrow>Case studies</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em" }}
          >
            Proof, not positioning.
          </h2>
          <CaseStudyGrid limit={3} />
          <div className="mt-10 flex justify-end">
            <Button href="/work" variant="secondary" className="!border-on-field-2/40 !text-on-field hover:!border-signal hover:!text-signal">View all case studies →</Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW WE WORK
          ================================================================ */}
      <section style={{ padding: "8rem 0" }}>
        <div className="wrap">
          <Eyebrow>How we work</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em" }}
          >
            How engagements run
          </h2>
          <HowWeWork />
        </div>
      </section>

      {/* ================================================================
          INSIGHTS — inverted (deep)
          ================================================================ */}
      <section id="insights" className="on-field-deep" style={{ padding: "8rem 0" }}>
        <div className="wrap">
          <Eyebrow>Insights</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em" }}
          >
            What we're arguing about internally
          </h2>
          <InsightsAccordion limit={3} />
          <div className="mt-10 flex justify-end">
            <Button href="/insights" variant="secondary" className="!border-on-field-2/40 !text-on-field hover:!border-signal hover:!text-signal">View all insights →</Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          CAREERS STRIP
          ================================================================ */}
      <section style={{ padding: "0" }}>
        <div className="wrap">
          <CareerStrip />
        </div>
      </section>

      {/* ================================================================
          CLOSING CTA — deep inverted
          ================================================================ */}
      <CTASection />
    </>
  );
}
