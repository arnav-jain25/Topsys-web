import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Engineering delivery, platform and DevOps, and data infrastructure for technology companies building products that engineers will read, operate, and depend on.",
};

const CONTEXT = [
  {
    label: "Technical debt accumulates faster",
    body: "Technology companies move faster than other verticals, and accumulate technical debt proportionally. The architecture that worked at fifty engineers breaks at two hundred. The shortcuts taken to ship v1 become the incidents that wake teams up at 3am.",
  },
  {
    label: "Internal tooling becomes critical infrastructure",
    body: "The deployment system that one engineer built over a weekend becomes the system the entire engineering org depends on. Platform teams that were never formally resourced are now responsible for developer productivity at scale.",
  },
  {
    label: "Scaling an engineering org is harder than scaling the product",
    body: "Adding engineers doesn&rsquo;t add proportional output. Onboarding time grows, context is duplicated, and the systems that held institutional knowledge, if they existed, break down. Scaling engineering is an organizational and technical problem.",
  },
];

const CAPABILITIES = [
  {
    title: "Engineering delivery",
    body: "Embedded senior engineers who raise the engineering bar, not just fill the headcount gap. We place engineers who will write code your team is glad exists, review PRs that improve the team&rsquo;s standards, and take ownership of outcomes.",
    tech: ["Python", "Java", "TypeScript", "React", "Kafka", "AWS", "GCP"],
  },
  {
    title: "Platform and DevOps",
    body: "Internal developer platforms, CI/CD pipelines, observability stacks, and developer experience improvements that reduce the distance from commit to production. Infrastructure your teams can operate without heroics.",
    tech: ["Kubernetes", "Terraform", "GitHub Actions", "AWS", "GCP", "Prometheus", "Grafana"],
  },
  {
    title: "Data and AI",
    body: "Data infrastructure, ML pipelines, and analytics engineering built for production, not for the notebook. Data that runs in scheduled jobs, not Jupyter cells. Models that are monitored, versioned, and retrained without manual intervention.",
    tech: ["Python", "Spark", "Kafka", "dbt", "Snowflake", "AWS", "GCP"],
  },
];

const APPROACH = [
  {
    title: "Engineers who read before they write",
    body: "The fastest way to slow down a codebase is to add engineers who don&rsquo;t understand it. We take time to understand the architecture, the team conventions, and the production constraints before writing the first line.",
  },
  {
    title: "Platform work done properly",
    body: "Developer platforms, CI/CD systems, and observability infrastructure are real products. They need product thinking, documentation, and an adoption plan. We treat internal platforms with the same rigor we apply to customer-facing products.",
  },
  {
    title: "Data for production, not for demos",
    body: "A data pipeline that runs in a notebook is a prototype. We build data systems that run on a schedule, handle late-arriving data, alert on failures, and produce results the business can act on, not results that look right until someone looks closely.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Technology" },
            ]}
          />
          <Eyebrow className="mt-6">Technology</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Building for engineers who will read your code, not just run it.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We embed senior engineers, build internal developer platforms, and deliver production-ready data infrastructure for technology companies. The bar is engineers who raise the team&rsquo;s standards, not ones who fill a seat.
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
            What makes technology companies a distinct delivery context
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Technology companies have higher engineering standards, faster cycles, and more opinionated teams than most other verticals. External engineers who can&rsquo;t keep up slow things down. The ones who can move faster make the whole team faster.
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
            Where we work in technology companies
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
            Engineering that raises the bar, not just the headcount
          </h2>
          <IndustryItemGrid
            items={APPROACH.map(({ title, body }) => ({ heading: title, body }))}
            scheme="light"
            className="mt-10"
          />
          <div className="mt-12 flex gap-3 flex-wrap">
            <Button href="/contact?re=enterprise">Talk to us</Button>
            <Button href="/capabilities/technology-talent" variant="secondary">Technology talent</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
