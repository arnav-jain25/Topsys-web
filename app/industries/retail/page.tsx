import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Retail",
  description:
    "Omnichannel commerce platforms, inventory and supply chain data, and PCI-DSS-scoped payment integration for retailers operating across store, web, and marketplace channels.",
};

const CONTEXT = [
  {
    label: "Inventory truth across channels",
    body: "Store, web, and marketplace inventory drift out of sync the moment they're maintained separately. A sale on one channel has to reduce availability everywhere else, in seconds, or the business oversells.",
  },
  {
    label: "Seasonal load that isn't gradual",
    body: "Traffic during a peak sale event isn't a scaled-up version of a normal day. It's a different load profile entirely, and systems built for average traffic fail exactly when the business needs them most.",
  },
  {
    label: "Payment scope across every surface",
    body: "POS terminals, e-commerce checkout, mobile apps, and stored payment methods all carry PCI-DSS scope. Each new channel is another place cardholder data can leak if the architecture doesn't isolate it.",
  },
];

const CAPABILITIES = [
  {
    title: "Commerce platforms",
    body: "POS and e-commerce integration, order management, and inventory synchronization across store and digital channels. We build the middleware that keeps availability and pricing consistent everywhere a customer looks.",
    tech: ["Node.js", "GraphQL", "Kafka", "Redis", "AWS", "Azure"],
  },
  {
    title: "Data platforms",
    body: "Customer data platforms, supply chain and inventory data pipelines, and demand forecasting infrastructure. We build for the throughput of transactional retail data, not for a reporting-only workload.",
    tech: ["Kafka", "Spark", "Snowflake", "Python", "dbt"],
  },
  {
    title: "Technology staff",
    body: "Engineers who have shipped through a peak sale event and know what breaks under real load: connection pools, cache invalidation, third-party API rate limits. Not just engineers who've read about it.",
    tech: ["Node.js", "Java", "React", "Python", "AWS"],
  },
];

const APPROACH = [
  {
    title: "Architecture for peak, not average",
    body: "We size for the traffic spike, not the daily mean. Load testing runs against realistic peak scenarios before the event, not after a postmortem following an outage.",
  },
  {
    title: "Integrate before you replace",
    body: "Most retailers run a legacy POS or ERP that isn't going away this year. We build integration layers that let modern storefronts and data platforms sit on top of what's already there, then replace pieces on a schedule the business controls.",
  },
  {
    title: "PCI scope as a design constraint",
    body: "The fewer systems that touch raw cardholder data, the smaller the audit and the smaller the breach surface. We isolate payment handling early so the rest of the commerce platform is out of scope by design.",
  },
];

export default function RetailPage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Retail" },
            ]}
          />
          <Eyebrow className="mt-6">Retail</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Commerce platforms that hold up on the one day they can&rsquo;t fail.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build and integrate omnichannel commerce platforms, inventory and supply chain data infrastructure, and PCI-DSS-scoped payment systems for retailers running across store, web, and marketplace channels.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=enterprise">Talk to us</Button>
            <Button href="/capabilities" variant="secondary">Our capabilities</Button>
          </div>
        </div>
      </section>

      {/* CONTEXT — inverted */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow dark>The environment</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            What makes retail technology different
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Retail systems are judged on the worst hour of the year, not the average day. Inventory accuracy, payment scope, and peak load all have to hold at once, across every channel a customer might use.
          </p>
          <IndustryItemGrid
            items={CONTEXT.map(({ label, body }) => ({ heading: label, body }))}
            scheme="field"
            className="mt-12"
          />
        </div>
      </section>

      {/* WHAT WE DO — paper */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>What we do</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Where we work in retail
          </h2>
          <IndustryCapabilityGrid capabilities={CAPABILITIES} />
        </div>
      </section>

      {/* APPROACH — surface */}
      <section className="bg-surface" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>How we approach it</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "30ch",
            }}
          >
            Built to hold under peak load
          </h2>
          <IndustryItemGrid
            items={APPROACH.map(({ title, body }) => ({ heading: title, body }))}
            scheme="light"
            className="mt-10"
          />
          <div className="mt-12 flex gap-3 flex-wrap">
            <Button href="/contact?re=enterprise">Talk to us</Button>
            <Button href="/capabilities/ai-and-data" variant="secondary">AI &amp; data capability</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
