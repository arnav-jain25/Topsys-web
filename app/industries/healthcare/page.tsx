import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Healthcare",
  description:
    "Health data integration, HL7/FHIR pipelines, clinical application development, and HIPAA-aware security engineering for health systems, payers, and digital health companies.",
};

const CONTEXT = [
  {
    label: "Compliance is not optional",
    body: "HIPAA, HL7, FHIR: a data handling failure is a liability event, not a finding. PHI access controls, audit logging, and breach notification requirements are architecture decisions, not policy documents.",
  },
  {
    label: "Interoperability gap",
    body: "Clinical systems don&rsquo;t talk to each other by default. An EHR, a claims system, a lab platform, and a population health tool each have their own data models, their own identifiers, and their own idea of what a patient record looks like.",
  },
  {
    label: "Data quality",
    body: "Patient matching fails silently. Deduplication errors accumulate. Care gaps in population health reports depend on whether the underlying clinical data is reliable. In healthcare, a data quality problem is a patient safety problem.",
  },
];

const CAPABILITIES = [
  {
    title: "Health data integration",
    body: "HL7/FHIR pipelines, clinical data warehousing, and population health analytics. We build the integrations that connect clinical systems and make the data usable for care management, reporting, and research.",
    tech: ["FHIR", "HL7", "Python", "dbt", "Snowflake", "AWS", "Azure Health Data Services"],
  },
  {
    title: "Application development",
    body: "Care management tools, patient portal systems, and clinical workflow applications. Built for the actual workflows of clinicians and care coordinators, not for the demo. HIPAA-aware from the first design review.",
    tech: ["Java", "Python", "FHIR", "REST APIs", "AWS", "Azure"],
  },
  {
    title: "Security",
    body: "HIPAA-aligned security posture, access controls for PHI, audit logging, and breach readiness. Security architecture reviewed at the program level, not as a checklist after the build is done.",
    tech: ["AWS", "Azure", "IAM", "Audit logging", "Encryption"],
  },
];

const APPROACH = [
  {
    title: "Patient data, handled correctly",
    body: "PHI access controls, audit trails, and de-identification pipelines are not optional extensions. We build them into the data architecture before the first pipeline runs, not after the first audit question.",
  },
  {
    title: "Interoperability from the ground up",
    body: "We start by understanding what data exists in which system, how patient identifiers work across them, and where the matching failures are. Integration without that map produces data that looks right and isn&rsquo;t.",
  },
  {
    title: "Practical FHIR implementation",
    body: "FHIR is a standard, not a solution. The gap between a FHIR-compliant endpoint and a FHIR-compliant data exchange is large. We implement the standard in a way that solves the actual integration problem, not the theoretical one.",
  },
];

export default function HealthcarePage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Healthcare" },
            ]}
          />
          <Eyebrow className="mt-6">Healthcare</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Health data has to be right, compliant, and findable. All three.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build HL7/FHIR integration pipelines, clinical data platforms, and HIPAA-aligned applications for health systems, payers, and digital health companies. Data quality and compliance are architecture decisions, and we make them early.
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
            What makes healthcare technology harder than other verticals
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Healthcare has three distinct hard problems: compliance, interoperability, and data quality. They interact. You can&rsquo;t solve one without the other two. Most projects fail because they solve one and assume the rest.
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
            Where we work in healthcare
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
            Compliance and data quality as engineering disciplines
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

    </>
  );
}
