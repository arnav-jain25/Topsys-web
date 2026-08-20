import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryIndexGrid } from "./_components/IndustryIndexGrid";

export const metadata: Metadata = {
  title: "Industries | TOPSYS IT",
  description:
    "TOPSYS IT delivers technology programs across financial services, telecommunications, healthcare, state government, and technology companies.",
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
];

export default function IndustriesPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
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
            The sectors we work in.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            Technology delivery looks different depending on the regulatory environment, the data constraints, and the systems already in place. We work across four verticals where we&rsquo;ve built programs that run in production.
          </p>
        </div>
      </section>

      {/* ================================================================
          INDUSTRY GRID
          ================================================================ */}
      <section style={{ paddingBottom: "8rem" }}>
        <div className="wrap">
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
