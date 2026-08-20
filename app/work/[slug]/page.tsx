import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/case-studies";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";

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
    title: `${cs.title} — TOPSYS IT`,
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
          HERO — paper
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
          CAPABILITIES BAR — inverted
          ================================================================ */}
      <section
        className="on-field"
        style={{ background: "var(--color-field)", padding: "2rem 0" }}
      >
        <div className="wrap">
          <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mb-3">
            Capabilities involved
          </p>
          <div className="flex flex-wrap gap-2">
            {cs.capabilities.map((cap) => (
              <span
                key={cap}
                className="font-mono text-mono-xs uppercase tracking-[.07em] text-on-field border border-field-hairline rounded-control px-3 py-1"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          PROBLEM — paper
          ================================================================ */}
      <section className="bg-paper" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div style={{ maxWidth: "68ch" }}>
            <h2
              className="font-display font-medium text-ink"
              style={{
                fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.022em",
                marginBottom: "1.75rem",
              }}
            >
              The problem
            </h2>
            {cs.problem.map((para, i) => (
              <p
                key={i}
                className="text-body text-ink-2"
                style={{ marginBottom: i < cs.problem.length - 1 ? "1.25rem" : 0 }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          APPROACH — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <h2
            className="font-display font-medium text-ink"
            style={{
              fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.022em",
              marginBottom: "2.5rem",
            }}
          >
            What we did
          </h2>

          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 26rem), 1fr))" }}
          >
            {cs.approach.map((step, i) => (
              <div
                key={i}
                className="bg-paper border border-hairline rounded-card"
                style={{ padding: "1.75rem 2rem" }}
              >
                <p
                  className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted mb-3"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className="font-display font-medium text-ink"
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.heading}
                </h3>
                <p className="text-body-xs text-ink-2">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          OUTCOME — inverted (only if present)
          ================================================================ */}
      {cs.outcome !== null && (
        <section
          className="on-field"
          style={{ background: "var(--color-field)", padding: "5rem 0" }}
        >
          <div className="wrap" style={{ maxWidth: "52ch" }}>
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mb-4">
              Outcome
            </p>
            <h2
              className="font-display font-medium text-on-field"
              style={{
                fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.022em",
              }}
            >
              {cs.outcome}
            </h2>
          </div>
        </section>
      )}

      {/* ================================================================
          TECH FOOTER — paper
          ================================================================ */}
      <section className="bg-paper" style={{ padding: "4rem 0" }}>
        <div className="wrap">
          <div className="border-t border-hairline pt-6">
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted mb-4">
              Technologies used
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {cs.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-mono-sm text-ink-2 border border-hairline rounded-control px-3 py-1"
                >
                  {t}
                </span>
              ))}
              {cs.metric && (
                <span
                  className="font-mono text-mono-sm font-medium text-teal border border-teal-tint rounded-control px-3 py-1 ml-2"
                >
                  {cs.metric}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
