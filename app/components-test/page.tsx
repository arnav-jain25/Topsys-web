/**
 * Component showcase — Phase 2 review.
 * Remove before launch.
 */
export const metadata = {
  title: "Components",
  robots: { index: false, follow: false },
};

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button, TextLink } from "@/components/ui/Button";
import { ContentToken } from "@/components/ui/ContentToken";
import { StatBar } from "@/components/sections/StatBar";
import { ClientGrid } from "@/components/sections/ClientGrid";
import { DualModel } from "@/components/sections/DualModel";
import { CapabilityGrid } from "@/components/sections/CapabilityGrid";
import { AIArc } from "@/components/sections/AIArc";
import { USMap } from "@/components/sections/USMap";
import { CaseStudyGrid } from "@/components/sections/CaseStudyGrid";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { InsightsAccordion } from "@/components/sections/InsightsAccordion";
import { CareerStrip } from "@/components/sections/CareerStrip";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

function Divider({ label }: { label: string }) {
  return (
    <div className="wrap py-8 border-t border-hairline mt-16 first:mt-0 first:border-0">
      <p className="font-mono text-mono-sm uppercase tracking-[.1em] text-ink-muted mb-6">
        {label}
      </p>
    </div>
  );
}

export default function ComponentsTestPage() {
  return (
    <>
      {/* ---- Buttons --------------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-8">Buttons &amp; links</Eyebrow>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Button href="/contact" variant="primary">Talk to us</Button>
            <Button href="/capabilities" variant="secondary">Explore capabilities</Button>
            <TextLink href="/work">Read the case</TextLink>
          </div>
          {/* On field */}
          <div className="on-field rounded-panel px-8 py-8 flex flex-wrap gap-4 items-center">
            <Button href="/contact" variant="primary">Talk to us</Button>
            <Button href="/capabilities" variant="secondary">Explore capabilities</Button>
            <TextLink href="/work">Read the case</TextLink>
          </div>
        </div>
      </section>

      {/* ---- Eyebrow --------------------------------------------------- */}
      <section className="bg-surface py-16">
        <div className="wrap">
          <p className="font-mono text-mono-sm text-ink-muted mb-6 uppercase tracking-widest">Eyebrow</p>
          <Eyebrow>Public sector</Eyebrow>
          <div className="on-field rounded-panel px-8 py-8 mt-4">
            <Eyebrow>AI &amp; data</Eyebrow>
          </div>
        </div>
      </section>

      {/* ---- Content token --------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <p className="font-mono text-mono-sm text-ink-muted mb-4 uppercase tracking-widest">Content tokens</p>
          <p className="text-body text-ink-2">
            The confirmed state count is <ContentToken id="STAT-01" /> states.
            The payments case metric: <ContentToken id="METRIC-01" />.
          </p>
        </div>
      </section>

      {/* ---- Breadcrumb ------------------------------------------------ */}
      <section className="bg-surface py-16">
        <div className="wrap">
          <p className="font-mono text-mono-sm text-ink-muted mb-4 uppercase tracking-widest">Breadcrumb</p>
          <Breadcrumb
            items={[
              { label: "Capabilities", href: "/capabilities" },
              { label: "AI & data" },
            ]}
          />
        </div>
      </section>

      {/* ---- Stat bar -------------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-8">Stat bar · count-up on scroll</Eyebrow>
          <StatBar />
        </div>
      </section>

      {/* ---- Client grid ----------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-0">Client grid</Eyebrow>
          <ClientGrid />
        </div>
      </section>

      {/* ---- Dual model ------------------------------------------------ */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-4">The model</Eyebrow>
          <h2
            className="font-display font-medium text-ink"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", maxWidth: "18ch" }}
          >
            Build the solution. Build the team. Or both.
          </h2>
          <DualModel />
        </div>
      </section>

      {/* ---- Capability grid ------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-4">Capabilities</Eyebrow>
          <h2
            className="font-display font-medium text-ink"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)" }}
          >
            What we build
          </h2>
          <CapabilityGrid />
        </div>
      </section>

      {/* ---- AI arc ---------------------------------------------------- */}
      <section className="on-field py-32">
        <div className="wrap">
          <Eyebrow className="mb-4">AI &amp; data</Eyebrow>
          <h2
            className="font-display font-medium text-on-field"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", maxWidth: "20ch" }}
          >
            AI that survives contact with production.
          </h2>
          <AIArc />
        </div>
      </section>

      {/* ---- US map ---------------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-4">Public sector</Eyebrow>
          <h2
            className="font-display font-medium text-ink mb-8"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)", maxWidth: "22ch" }}
          >
            Government technology, delivered to the standard it demands.
          </h2>
          <div className="max-w-[640px]">
            <USMap />
          </div>
        </div>
      </section>

      {/* ---- Case study grid ------------------------------------------- */}
      <section className="on-field py-32">
        <div className="wrap">
          <Eyebrow className="mb-4">Case studies</Eyebrow>
          <h2
            className="font-display font-medium text-on-field"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)" }}
          >
            Proof, not positioning.
          </h2>
          <CaseStudyGrid />
        </div>
      </section>

      {/* ---- How we work ----------------------------------------------- */}
      <section className="bg-paper py-16">
        <div className="wrap">
          <Eyebrow className="mb-4">How we work</Eyebrow>
          <h2
            className="font-display font-medium text-ink"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)" }}
          >
            How engagements run
          </h2>
          <HowWeWork />
        </div>
      </section>

      {/* ---- Insights accordion ---------------------------------------- */}
      <section className="on-field-deep py-32">
        <div className="wrap">
          <Eyebrow className="mb-4">Insights</Eyebrow>
          <h2
            className="font-display font-medium text-on-field"
            style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)" }}
          >
            What we're arguing about internally
          </h2>
          <InsightsAccordion />
        </div>
      </section>

      {/* ---- Career strip ---------------------------------------------- */}
      <section className="bg-paper py-0">
        <div className="wrap">
          <CareerStrip />
        </div>
      </section>

      {/* ---- CTA section ----------------------------------------------- */}
      <CTASection />
    </>
  );
}
