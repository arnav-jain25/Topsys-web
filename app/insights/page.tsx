import type { Metadata } from "next";
import Link from "next/link";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { INSIGHTS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Technology perspectives from the TOPSYS IT delivery team on AI, data, cloud, cybersecurity, and application modernization.",
};

export default function InsightsPage() {
  return (
    <>
      {/* ================================================================
          HERO — paper
          ================================================================ */}
      <section className="relative overflow-hidden" style={{ padding: "6rem 0 5rem" }}>
        <span
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[120%] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(14,90,102,.07),rgba(141,198,62,.04) 45%,transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="wrap relative z-[1]">
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
        <ScrollReveal className="wrap">
          <StaggerReveal
            className="grid grid-cols-3 gap-8 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1"
            itemDelay={80}
          >
            {INSIGHTS.map((insight) => (
              <article
                key={insight.slug}
                className="group bg-white border border-hairline rounded-card flex flex-col overflow-hidden transition-all duration-base ease-standard hover:-translate-y-0.5 hover:shadow-e2 hover:border-transparent relative"
              >
                {/* Gradient top edge on hover — one of the four permitted uses */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 transition-transform duration-base ease-standard group-hover:scale-x-100 z-[1]"
                  aria-hidden="true"
                />

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
          </StaggerReveal>
        </ScrollReveal>
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
