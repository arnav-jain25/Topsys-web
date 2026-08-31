import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroFork } from "@/components/sections/HeroFork";
import { HeroGround } from "@/components/sections/HeroGround";
import {
  StatBar,
  ServicesShowcase,
  DualModel,
  USMap,
  HowWeWork,
  CareerStrip,
  TestimonialsStrip,
  ClientProofStrip,
} from "@/components/sections";
import { HeroHeading } from "@/components/sections/HeroHeading";
import { CyclingModelHeading } from "@/components/sections/CyclingModelHeading";

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="on-field-deep relative flex flex-col justify-center overflow-hidden"
        style={{
          minHeight: "78vh",
          padding: "5.5rem 0 3.5rem",
          backgroundImage: [
            "linear-gradient(to bottom, transparent 65%, #061C32 100%)",
            "radial-gradient(ellipse 42% 55% at 100% 100%, rgba(141,198,62,0.28), transparent 100%)",
          ].join(", "),
        }}
        aria-label="Hero"
      >
        {/* The stack we work in, legacy to modern — silent ground, upper right */}
        <HeroGround />

        <div className="wrap relative z-[2] w-full">
          <div className="max-w-[72rem]">
            <HeroHeading dark />
            <p className="text-lede-lg text-on-field-2 font-medium max-w-[54ch]">
              Modernization, AI, and the engineers who ship it. TOPSYS IT builds and runs critical systems for enterprises and government agencies across the United States.
            </p>

            {/* Build the solution, build the team, or both — the two doors */}
            <HeroFork />

            <div className="mt-10 pt-6 border-t border-field-hairline flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
              <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-mono-sm uppercase tracking-[.06em] text-lavender">
                <span>20+ years</span>
                <span>30 state engagements</span>
                <span>4 countries</span>
                <span>MBE certified</span>
              </div>
              <Button
                href="/contact"
                className="max-[600px]:w-full !bg-signal !text-field-deep hover:!bg-signal-hi before:!hidden"
              >
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient bridge — field-deep dissolves into the paper body below */}
      <div
        aria-hidden="true"
        style={{
          height: "260px",
          marginTop: "-2px",
          backgroundImage: [
            "radial-gradient(ellipse 42% 55% at 100% 0%, rgba(141,198,62,0.10), transparent 65%)",
            "linear-gradient(180deg, #061C32 0%, #0C2D48 12%, #163D5C 25%, #234E72 38%, rgba(40,95,135,0.80) 50%, rgba(80,150,185,0.42) 64%, rgba(165,210,225,0.15) 80%, transparent 100%)",
          ].join(", "),
        }}
      />

      {/* ================================================================
          PROOF BAR — showcase left, stats right, side-by-side
          ================================================================ */}
      <section style={{ padding: "2.5rem 0 3rem" }}>
        <div className="wrap">
          <div className="grid gap-4 items-center max-[1023px]:block" style={{ gridTemplateColumns: "1fr 380px" }}>
            <ServicesShowcase />
            <div className="max-[1023px]:mt-10 max-[1023px]:pt-8 max-[1023px]:border-t max-[1023px]:border-hairline">
              <StatBar layout="column" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CLIENT PROOF STRIP — enterprise clients, tech platforms, certs
          ================================================================ */}
      <ClientProofStrip />

      {/* ================================================================
          DUAL MODEL — build the solution / build the team
          ================================================================ */}
      <section className="on-field" style={{ padding: "4rem 0 6rem" }}>
        <div className="wrap">
          <Eyebrow dark>The model</Eyebrow>
          <CyclingModelHeading />
          <p className="text-lede text-on-field-2 font-medium max-w-[64ch] mt-6">
            Most firms make you choose. A consultancy scopes and staffs with people you didn't pick. A staffing vendor sends résumés and disappears at onboarding. We do both — and a third thing neither does: deploy an engineer who owns the outcome in your environment, not ours.
          </p>
          <DualModel />
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
                We work with state agencies on modernization, data, security and the specialized staff these programs run on. Long procurement cycles, accessibility requirements, audit exposure, systems older than the people maintaining them: we've worked inside all of it.
              </p>
              <dl className="mt-8 space-y-0">
                <dt className="font-mono text-[0.9375rem] uppercase tracking-[.08em] border-t border-hairline pt-4 mt-4" style={{ color: "#6D28D9" }}>
                  Agency types served
                </dt>
                <dd className="text-body-sm text-ink-2 mt-1">
                  Health & human services · Corrections · Transportation · General services · Department of Homeland Security (DHS) · Department of Administrative Services (DOAS) · Department of Labor (DOL) · DOR (Revenue) · DOIT · DOE (Education) · D.O.Tech (Technology)
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
          CLIENT TESTIMONIALS
          ================================================================ */}
      <TestimonialsStrip />

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
