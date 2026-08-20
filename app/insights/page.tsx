import type { Metadata } from "next";
import Link from "next/link";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { INSIGHTS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | TOPSYS IT",
  description:
    "Technology perspectives from the TOPSYS IT delivery team on AI, data, cloud, cybersecurity, and application modernization.",
};

export default function InsightsPage() {
  return (
    <>
      {/* ================================================================
          HERO — paper
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Insights" }]} />
          <Eyebrow className="mt-6">Insights</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "24ch",
            }}
          >
            What we&rsquo;re arguing about internally.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            Perspectives from the delivery team. Things worth saying because they&rsquo;re specific.
          </p>
        </div>
      </section>

      {/* ================================================================
          CARD GRID — surface background
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <div className="grid grid-cols-3 gap-8 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1">
            {INSIGHTS.map((insight) => (
              <article
                key={insight.slug}
                className="group bg-white border border-hairline rounded-card flex flex-col overflow-hidden transition-all duration-base ease-standard hover:-translate-y-0.5 hover:shadow-e2 hover:border-teal"
              >
                {/* Top teal accent on hover */}
                <div className="h-0.5 w-full bg-teal opacity-0 group-hover:opacity-100 transition-opacity duration-base ease-standard" />

                <div className="p-7 flex flex-col flex-1">
                  {/* Topic */}
                  <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-teal mb-3">
                    {insight.topic}
                  </p>

                  {/* Title */}
                  <h2
                    className="font-display font-medium text-ink"
                    style={{
                      fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.2,
                    }}
                  >
                    {insight.title}
                  </h2>

                  {/* Summary */}
                  <p
                    className="text-body-xs text-ink-2 mt-3 flex-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {insight.summary}
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-5 border-t border-hairline flex items-center justify-between gap-4 flex-wrap">
                    <p className="font-mono text-mono-xs text-ink-muted">
                      {insight.readTime} &middot; {insight.published}
                    </p>
                    <TextLink href={`/insights/${insight.slug}`}>
                      Read the full piece &rarr;
                    </TextLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CROSS-LINK CTA — paper
          ================================================================ */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap items-center justify-between">
            <div>
              <p className="font-display font-medium text-heading-4 text-ink">
                More interested in capability than content?
              </p>
              <p className="text-body-sm text-ink-2 mt-1 max-w-[52ch]">
                See what we build and how engagements work.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="/capabilities">View capabilities</Button>
              <Button href="/contact" variant="secondary">Get in touch</Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
