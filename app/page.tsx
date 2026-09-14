import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroFork } from "@/components/sections/HeroFork";
import {
  StatBar,
  ServicesShowcase,
  USMap,
  CareerStrip,
  TestimonialsStrip,
  ClientProofStrip,
  PlatformsCredentials,
  DeliveryModel,
} from "@/components/sections";
import { HeroHeading } from "@/components/sections/HeroHeading";

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO — claim and fork at left, the capability web at right
          ================================================================ */}
      <section
        className="on-field-deep relative flex flex-col justify-center overflow-hidden"
        style={{
          minHeight: "78vh",
          padding: "5.5rem 0 0",
          backgroundImage: [
            "linear-gradient(to bottom, transparent 55%, #061C32 68%, #0C2D48 78%, #0E2F3A 88%, #F8F7F3 100%)",
            "radial-gradient(ellipse 55% 70% at 100% 100%, rgba(13,82,120,0.35), transparent 100%)",
          ].join(", "),
        }}
        aria-label="Hero"
      >
        <div className="wrap relative z-[2] w-full">
          <div className="grid grid-cols-[1.02fr_.98fr] gap-14 items-center max-[1023px]:grid-cols-1 max-[1023px]:gap-10">
            <div>
              <HeroHeading dark />
              <p className="text-lede-lg text-on-field-2 font-medium max-w-[54ch]">
                Modernization, AI, and the engineers who ship it. TOPSYS IT builds and runs critical systems for enterprises and government agencies across the United States.
              </p>

              {/* Build the solution, build the team, or both — the two doors */}
              <HeroFork />

              <div className="mt-10">
                <Button
                  href="/contact"
                  className="max-[600px]:w-full !bg-signal !text-field-deep hover:!bg-signal-hi before:!hidden"
                >
                  Talk to us
                </Button>
              </div>
            </div>

            <ServicesShowcase dark />
          </div>
        </div>

        {/* Empty run-out so the fade above resolves to paper within this
            same box — no seam from stacking a second gradient element. */}
        <div aria-hidden="true" style={{ height: "130px", flexShrink: 0 }} />
      </section>

      {/* ================================================================
          METRICS BAND — four figures spread across the full width
          ================================================================ */}
      <section aria-label="Track record" style={{ padding: "4rem 0 4.5rem" }}>
        <div className="wrap">
          <StatBar layout="band" />
        </div>
      </section>

      {/* ================================================================
          TRUSTED BY — enterprise clients
          ================================================================ */}
      <ClientProofStrip />

      {/* ================================================================
          PLATFORMS & CREDENTIALS — inverted; the things a buyer verifies
          ================================================================ */}
      <PlatformsCredentials />

      {/* ================================================================
          HOW WE DELIVER — the model, given a section
          ================================================================ */}
      <DeliveryModel />

      {/* ================================================================
          CLIENT TESTIMONIALS
          ================================================================ */}
      <TestimonialsStrip />

      {/* ================================================================
          PUBLIC SECTOR
          ================================================================ */}
      <section id="public-sector" className="bg-surface" style={{ padding: "5rem 0 8rem" }}>
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
                We work with state agencies on modernization, data, security and the specialized staff these programs run on. Long procurement cycles, accessibility requirements, audit exposure, systems older than the people maintaining them: we&apos;ve worked inside all of it.
              </p>
              <dl className="mt-8 space-y-0">
                <dt className="font-mono text-[0.9375rem] uppercase tracking-[.08em] border-t border-hairline pt-4 mt-4" style={{ color: "#6D28D9" }}>
                  Agency types served
                </dt>
                <dd className="text-body-sm text-ink-2 mt-1">
                  Health &amp; human services · Corrections · Transportation · General services · Department of Homeland Security (DHS) · Department of Administrative Services (DOAS) · Department of Labor (DOL) · DOR (Revenue) · DOIT · DOE (Education) · D.O.Tech (Technology)
                </dd>
                <dd className="font-mono text-mono-xs text-ink-muted mt-2 tracking-[.04em]">
                  Among many others
                </dd>
                <dt className="font-mono text-[0.9375rem] uppercase tracking-[.08em] border-t border-hairline pt-4 mt-4" style={{ color: "#6D28D9" }}>
                  State engagements
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
          CAREERS STRIP
          ================================================================ */}
      <section style={{ padding: "0" }}>
        <div className="wrap">
          <CareerStrip />
        </div>
      </section>

    </>
  );
}
