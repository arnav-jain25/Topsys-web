import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { InsightsGrid } from "@/components/sections/InsightsGrid";

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
          EDITORIAL GRID — paper background
          ================================================================ */}
      <section style={{ padding: "5rem 0 8rem" }}>
        <div className="wrap">
          <InsightsGrid />
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

    </>
  );
}
