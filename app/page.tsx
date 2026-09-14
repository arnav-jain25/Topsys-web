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
            /* Cross-fades the paper color in over the navy ground rather than
               interpolating between hex stops — a hue ramp through a handful
               of waypoints reads as a visible seam where the steps are large.
               Sized to a fixed 240px physical band (see backgroundSize/
               backgroundPosition below) instead of a percentage of the whole
               section: tying the fade's PHYSICAL length to a percentage of a
               ~700-800px section only gave it ~85px of real screen distance
               to complete in, which reads as an edge no matter how the alpha
               curve is shaped — the eye needs actual pixels to see "gradual". */
            "linear-gradient(to bottom, rgba(248,247,243,0) 0%, rgba(248,247,243,0.1) 20%, rgba(248,247,243,0.35) 40%, rgba(248,247,243,0.65) 60%, rgba(248,247,243,0.9) 80%, rgba(248,247,243,1) 100%)",
            "radial-gradient(ellipse 55% 70% at 100% 100%, rgba(13,82,120,0.35), transparent 100%)",
          ].join(", "),
          backgroundSize: ["100% 240px", "100% 100%"].join(", "),
          backgroundPosition: ["left bottom", "left top"].join(", "),
          backgroundRepeat: "no-repeat",
        }}
        aria-label="Hero"
      >
        <div className="wrap relative z-[2] w-full">
          {/* Both tracks are minmax(0, Nfr) — a 60/40 split of the row that
              holds at any viewport width (a fixed right-hand px column drifts
              toward giving the text MORE than 60% as the viewport widens,
              since the left track keeps growing while a fixed one doesn't).
              The 0 floor is what keeps it immune to content: a track can't
              grow past its fr share to fit a sibling's content, so the
              headline cycling through phrases of different lengths never
              resizes the capability web. */}
          <div className="grid grid-cols-1 gap-10 items-center min-[1180px]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] min-[1180px]:items-start min-[1180px]:gap-16">
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

            {/* Nudged up to cancel the eyebrow row's own height, which sits
                above the SVG and would otherwise push the top node below the
                headline's cap-height. The node-to-headline alignment itself
                is now baked into the SVG's viewBox (see ServicesShowcase),
                so this fixed offset stays correct at any column width. */}
            <div className="min-[1180px]:-mt-7">
              <ServicesShowcase dark />
            </div>
          </div>
        </div>

        {/* Run-out matched to the 240px fade band above — long enough that
            the transition has real physical distance to read as gradual,
            and sized so the band starts right where content ends rather
            than washing over the button. */}
        <div aria-hidden="true" style={{ height: "240px", flexShrink: 0 }} />
      </section>

      {/* ================================================================
          METRICS BAND — four figures spread across the full width
          ================================================================ */}
      <section aria-label="Track record" style={{ padding: "2.25rem 0 2.5rem" }}>
        <div className="wrap">
          <StatBar layout="band" />
        </div>
      </section>

      {/* ================================================================
          TRUSTED BY — enterprise clients
          ================================================================ */}
      <ClientProofStrip />

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
      <section id="public-sector" className="bg-surface" style={{ padding: "3.5rem 0 4rem" }}>
        <div className="wrap">
          <Eyebrow>Public sector</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)", letterSpacing: "-0.028em", maxWidth: "22ch" }}
          >
            Government technology, delivered to the standard it demands.
          </h2>

          <div className="grid grid-cols-[1.35fr_.65fr] gap-12 items-start mt-8 max-[1023px]:grid-cols-1">
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
