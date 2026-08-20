import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Telecommunications | TOPSYS IT",
  description:
    "Subscriber analytics, OSS/BSS integration, and digital platform development for telecommunications providers managing network-scale data and complex legacy system landscapes.",
};

const CONTEXT = [
  {
    label: "OSS/BSS complexity",
    body: "Billing, provisioning, and network management systems that were built separately and never fully integrated. A subscriber event touches four systems before it becomes a record, and the joins between them are custom code nobody owns.",
  },
  {
    label: "Data volume at telco scale",
    body: "Network events, subscriber activity, usage data, and device telemetry at a scale where the data infrastructure is itself a core engineering problem. Batch jobs that took hours now have to run continuously.",
  },
  {
    label: "Legacy systems that predate the network",
    body: "Customer management and billing systems that predate the current network infrastructure, sometimes by fifteen years. They weren&rsquo;t designed for the data volumes, the API expectations, or the real-time reporting requirements they carry today.",
  },
];

const CAPABILITIES = [
  {
    title: "Data and analytics",
    body: "Subscriber analytics, network performance data platforms, and usage-based billing infrastructure. We build the data pipelines that make network and customer data usable at the speed the business requires.",
    tech: ["Kafka", "Spark", "Python", "AWS", "Azure", "Snowflake"],
  },
  {
    title: "Systems integration",
    body: "OSS/BSS integration, API strategy for partner and reseller ecosystems, and event-driven architecture that connects provisioning, billing, and network management without requiring a rip-and-replace.",
    tech: ["REST APIs", "GraphQL", "Java", ".NET", "Kafka", "AWS"],
  },
  {
    title: "Application development",
    body: "Customer-facing digital platforms built for real subscriber volumes, and internal tooling for NOC and SOC teams that need data at network speed. We build for the operational reality, not the demo environment.",
    tech: ["Java", "Python", ".NET", "REST APIs", "GraphQL", "AWS"],
  },
];

const APPROACH = [
  {
    title: "Integration before replacement",
    body: "OSS/BSS consolidation projects that start with replacement have a high failure rate. We start by mapping what exists, identifying the seams that can be opened with APIs, and moving data through them, before recommending any platform change.",
  },
  {
    title: "Data infrastructure as a product",
    body: "Telco data teams often have the data but not the infrastructure to act on it. We build streaming pipelines, subscriber data models, and analytics platforms that become the system of record, not the BI report that runs on Friday.",
  },
  {
    title: "Teams that understand the network",
    body: "Subscriber churn models, network KPIs, and capacity planning data mean different things in a telco context. The engineers we place understand OSS/BSS environments and the difference between what a billing system says and what the network actually did.",
  },
];

export default function TelecommunicationsPage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Telecommunications" },
            ]}
          />
          <Eyebrow className="mt-6">Telecommunications</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Network-scale data and the systems that have to keep up with it.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build subscriber analytics platforms, OSS/BSS integrations, and customer-facing digital products for telecommunications providers. The data volumes are large, the legacy systems are real, and the SLAs don&rsquo;t flex.
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
          <Eyebrow>The environment</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            What makes telecommunications technology harder than it looks
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Telco is one of the few verticals where the data infrastructure problem and the application problem are the same problem. You can&rsquo;t fix subscriber analytics without fixing the pipeline that feeds it.
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
            Where we work in telecommunications
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
            Connecting the systems that were never meant to talk
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
