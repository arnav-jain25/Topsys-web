import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DualModel, HowWeWork } from "@/components/sections";
import { CyclingModelHeading } from "@/components/sections/CyclingModelHeading";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How TOPSYS IT structures delivery: build the solution, build the team, or both — and the engagement principles that hold regardless of which door you take.",
};

const JUMP_LINKS = [
  { label: "The model", href: "#model" },
  { label: "Engagement principles", href: "#how-we-work" },
];

export default function ApproachPage() {
  return (
    <>
      {/* ================================================================
          HERO — paper
          ================================================================ */}
      <section className="relative overflow-hidden" style={{ padding: "6rem 0 4rem" }}>
        <span
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[120%] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(14,90,102,.07),rgba(141,198,62,.04) 45%,transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="wrap relative z-[1]">
          <Breadcrumb items={[{ label: "Approach" }]} />
          <Eyebrow className="mt-6">Approach</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            How we structure delivery.
          </h1>
          <p className="text-lede text-ink-2 max-w-[62ch] mt-6">
            A consultancy scopes and staffs with people you didn&rsquo;t pick. A staffing vendor sends résumés and disappears at onboarding. We do both — and a third thing neither does: deploy an engineer who owns the outcome in your environment, not ours.
          </p>

          {/* Jump nav — this page has two long sections, so wayfinding earns its keep */}
          <nav aria-label="On this page" className="flex flex-wrap gap-x-8 gap-y-2 mt-10 pt-6 border-t border-hairline">
            {JUMP_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-[.08em] text-ink-muted hover:text-teal transition-colors duration-fast ease-standard"
              >
                <span className="font-mono text-mono-xs text-hairline-strong">{String(i + 1).padStart(2, "0")}</span>
                {label}
                <span aria-hidden="true" className="transition-transform duration-fast ease-standard group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ================================================================
          THE MODEL — inverted
          ================================================================ */}
      <section id="model" className="on-field" style={{ padding: "5rem 0 6rem", scrollMarginTop: "100px" }}>
        <div className="wrap">
          <Eyebrow dark>The model</Eyebrow>
          <CyclingModelHeading />
          <p className="text-lede text-on-field-2 font-medium max-w-[64ch] mt-6">
            Most firms make you choose. A consultancy scopes and staffs with people you didn&rsquo;t pick. A staffing vendor sends résumés and disappears at onboarding. We do both — and a third thing neither does: deploy an engineer who owns the outcome in your environment, not ours.
          </p>
          <DualModel />
        </div>
      </section>

      {/* ================================================================
          HOW WE WORK — paper
          ================================================================ */}
      <section id="how-we-work" className="bg-surface" style={{ padding: "6rem 0 8rem", scrollMarginTop: "100px" }}>
        <div className="wrap">
          <Eyebrow>Engagement principles</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", letterSpacing: "-0.028em" }}
          >
            How engagements run
          </h2>
          <HowWeWork />
        </div>
      </section>
    </>
  );
}
