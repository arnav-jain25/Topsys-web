import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { CapabilitiesBar } from "./CapabilitiesBar";
import { ProblemSection } from "./ProblemSection";
import { ApproachSteps } from "./ApproachSteps";
import { OutcomeSection } from "./OutcomeSection";
import { TechStack } from "./TechStack";

/* ── Static generation ─────────────────────────────────────────────────── */

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.lede,
  };
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      {/* ================================================================
          HERO — paper  (CSS animation on mount — always in view)
          ================================================================ */}
      <section className="bg-paper" style={{ padding: "5rem 0 4rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Work", href: "/work" },
              { label: cs.title },
            ]}
          />

          <p
            className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted mt-6 mb-4"
            style={{
              animation:
                "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 80ms both",
            }}
          >
            {cs.tag}
          </p>

          <h1
            className="font-display font-medium text-ink"
            style={{
              fontSize: "clamp(1.75rem, 3.8vw, 2.875rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.028em",
              maxWidth: "26ch",
              animation:
                "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 160ms both",
            }}
          >
            {cs.title}
          </h1>

          {/* Client callout */}
          <div
            className="border border-hairline rounded-card mt-6"
            style={{
              background: "var(--color-surface)",
              padding: "1rem 1.5rem",
              maxWidth: "52ch",
              animation:
                "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 240ms both",
            }}
          >
            <p className="text-body-xs text-ink-muted">
              <span className="font-semibold text-ink-2">Client:&nbsp;</span>
              {cs.client}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          CAPABILITIES BAR — inverted, staggered badges
          ================================================================ */}
      <CapabilitiesBar capabilities={cs.capabilities} />

      {/* ================================================================
          PROBLEM — paper, paragraphs reveal on scroll
          ================================================================ */}
      <ProblemSection problem={cs.problem} />

      {/* ================================================================
          APPROACH — surface, step cards stagger on scroll
          ================================================================ */}
      <ApproachSteps steps={cs.approach} />

      {/* ================================================================
          OUTCOME — inverted (only if present), count-up on reveal
          ================================================================ */}
      {cs.outcome !== null && <OutcomeSection outcome={cs.outcome} />}

      {/* ================================================================
          TECH FOOTER — paper, tags stagger on scroll
          ================================================================ */}
      <TechStack tech={cs.tech} metric={cs.metric} />

      <CTASection />
    </>
  );
}
