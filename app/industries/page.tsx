import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryIndexGrid } from "./_components/IndustryIndexGrid";
import { ClientShowcase } from "./_components/ClientShowcase";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "TOPSYS IT delivers technology programs across financial services, telecommunications, healthcare, state government, technology, retail, and insurance.",
};

const INDUSTRIES = [
  {
    slug: "financial-services",
    label: "Financial services",
    body:
      "Payment systems, capital markets data, regulatory reporting, and application modernization under compliance constraints.",
    tags: ["Kafka", "Spark", "Snowflake", "Spring Boot", "PCI-DSS", "SOX"],
  },
  {
    slug: "telecommunications",
    label: "Telecommunications",
    body:
      "OSS/BSS integration, network performance analytics, subscriber data infrastructure, and customer-facing digital platforms at telco scale.",
    tags: ["Kafka", "Python", "Java", "GraphQL", "OSS/BSS"],
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    body:
      "HL7/FHIR data pipelines, clinical data warehousing, HIPAA-aligned security posture, and care management application development.",
    tags: ["FHIR", "HL7", "dbt", "Snowflake", "Azure Health", "HIPAA-aligned"],
  },
  {
    slug: "technology",
    label: "Technology",
    body:
      "Engineering delivery, internal developer platforms, data and AI infrastructure, and CI/CD for technology companies building at scale.",
    tags: ["Kubernetes", "Terraform", "GitHub Actions", "Python", "React", "GCP"],
  },
  {
    slug: "retail",
    label: "Retail",
    body:
      "Omnichannel commerce platforms, inventory and supply chain data, and PCI-DSS-scoped payment integration across store, web, and marketplace channels.",
    tags: ["Node.js", "GraphQL", "Kafka", "Snowflake", "PCI-DSS", "AWS"],
  },
  {
    slug: "insurance",
    label: "Insurance",
    body:
      "Claims processing systems, underwriting and actuarial data platforms, and policy administration modernization under NAIC and state reporting requirements.",
    tags: ["Java", "Spring Boot", "Kafka", "Snowflake", "NAIC", "SQL"],
  },
  {
    slug: "luxury",
    label: "Luxury",
    body:
      "Digital commerce, clienteling platforms, and supply chain visibility for luxury brands managing global operations, brand integrity, and high-value customer relationships.",
    tags: ["Salesforce", "SAP", "Node.js", "GraphQL", "Azure", "Snowflake"],
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "5rem 0 4rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Industries" }]} />
          <Eyebrow className="mt-6">Industries</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Where we deliver.
          </h1>
        </div>
      </section>

      {/* ================================================================
          CLIENT SHOWCASE
          ================================================================ */}
      <ClientShowcase />

      {/* ================================================================
          INDUSTRY GRID
          ================================================================ */}
      <section style={{ padding: "6rem 0 8rem" }}>
        <div className="wrap">
          <div className="mb-10">
            <Eyebrow>Sectors</Eyebrow>
            <h2
              className="font-display font-medium text-ink mt-4"
              style={{ fontSize: "clamp(1.875rem, 3.8vw, 3.75rem)", letterSpacing: "-0.028em", lineHeight: 1.1 }}
            >
              The sectors we work in.
            </h2>
            <p className="text-body text-ink-2 mt-5 max-w-[58ch]">
              Technology delivery looks different depending on the regulatory environment, the data constraints, and the systems already in place. We work across six verticals where we&rsquo;ve built programs that run in production.
            </p>
          </div>

          <IndustryIndexGrid industries={INDUSTRIES} />

          <div className="mt-10 border-t border-hairline pt-8">
            <p className="text-body-xs text-ink-muted">
              State and local government is covered under{" "}
              <Link href="/public-sector" className="text-teal hover:underline underline-offset-4">
                Public sector
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          CROSS-LINKS
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap">
            <Button href="/capabilities">View all capabilities</Button>
            <Button href="/contact" variant="secondary">Talk to us</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
