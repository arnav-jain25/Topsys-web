import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { INSIGHTS } from "@/lib/insights";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = INSIGHTS.find((i) => i.slug === slug);
  if (!insight) return {};
  return {
    title: `${insight.title} — TOPSYS IT`,
    description: insight.summary,
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = INSIGHTS.find((i) => i.slug === slug);
  if (!insight) notFound();

  return (
    <>
      {/* ================================================================
          HERO — paper
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Insights", href: "/insights" },
              { label: insight.topic },
            ]}
          />
          <Eyebrow className="mt-6">{insight.topic}</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.8vw, 3rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "24ch",
            }}
          >
            {insight.title}
          </h1>
          <p className="font-mono text-mono-xs text-ink-muted mt-6 tracking-[.06em]">
            {insight.readTime} &middot; {insight.published}
          </p>
        </div>
      </section>

      {/* ================================================================
          ARTICLE BODY — paper
          ================================================================ */}
      <article aria-label={insight.title}>
        <div className="wrap" style={{ paddingBottom: "6rem" }}>
          {insight.content.map((block, i) => (
            <div key={i} className="mt-8">
              {block.heading && (
                <h2
                  className="font-display font-medium text-ink mb-3"
                  style={{
                    fontSize: "clamp(1.1rem, 1.8vw, 1.375rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                  }}
                >
                  {block.heading}
                </h2>
              )}
              <p
                className="text-body text-ink-2"
                style={{ maxWidth: "68ch" }}
              >
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* ================================================================
          RELATED CAPABILITIES — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted mb-6">
            Explore related capabilities
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button href="/capabilities/ai-and-data" variant="secondary">
              AI &amp; data
            </Button>
            <Button href="/capabilities/cybersecurity" variant="secondary">
              Cybersecurity
            </Button>
            <Button
              href="/capabilities/applications-and-modernization"
              variant="secondary"
            >
              Applications &amp; modernization
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
