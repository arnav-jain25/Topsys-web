export interface CaseStudy {
  slug: string;
  tag: string;          // e.g. "Financial services · Fortune 500"
  title: string;
  lede: string;         // 1–2 sentence summary for cards/index
  client: string;       // described without naming: "A major card network" etc.
  capabilities: string[]; // e.g. ["Data & analytics", "Cloud platform"]
  problem: string[];    // paragraphs
  approach: { heading: string; body: string }[]; // numbered steps or phases
  outcome: string | null; // null if pending/NDA
  tech: string[];
  metric: string | null; // null if not confirmed
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "payments-data",
    tag: "Financial services · Active",
    title: "A single source of truth for cross-processor payment intelligence",
    lede: "Payment, interchange, fee, settlement and dispute data lived in separate formats across two merchant processors. We designed a canonical payment data architecture on Snowflake.",
    client: "A major payment network operating across multiple merchant processors",
    capabilities: ["Data & analytics", "Data engineering"],
    problem: [
      "Payment data existed in two separate processor environments, each with its own schema, field naming conventions, and settlement logic. Interchange categories weren’t normalized. Fee structures were defined differently per processor. Dispute workflows produced records that couldn’t be compared without manual reconciliation.",
      "Business stakeholders had no single view of payment performance across processors. Reports were built by pulling separate exports, aligning them manually, and accepting that the numbers wouldn’t always agree. The root cause wasn’t the reporting layer — it was the absence of a canonical model for what a payment is.",
    ],
    approach: [
      {
        heading: "Source analysis and canonical model design",
        body: "Mapped every field from both processor data feeds. Defined a canonical payment event schema — one definition of payment amount, settlement date, interchange category, dispute status — that both sources would conform to after transformation. Built the source-to-target mappings and documented every business rule as a testable expectation.",
      },
      {
        heading: "Pipeline build on Snowflake",
        body: "Built automated ingestion pipelines for both processors into a Snowflake staging layer. Applied the canonical transformations in dbt, with data quality tests on every critical field. Failed records were quarantined and reported rather than silently dropped.",
      },
      {
        heading: "Data quality framework",
        body: "Defined quality thresholds for volume, completeness, and referential integrity. Automated alerts when thresholds were breached. Built a reconciliation layer that compared canonical records against processor settlement reports to detect drift.",
      },
      {
        heading: "Power BI reporting layer",
        body: "Built the reporting layer on top of the canonical model. Because the model was stable and tested, the reports derived from it were consistent. Business users could build their own views without worrying about which processor the data came from.",
      },
    ],
    outcome: null,
    tech: ["Snowflake", "dbt", "Power BI", "Python", "SQL"],
    metric: null,
  },
  {
    slug: "revenue-intelligence",
    tag: "Technology · Enterprise",
    title: "Unified revenue intelligence across five go-to-market systems",
    lede: "CRM, HR, quoting, payments and financials with no single view of revenue. We built a centralized BigQuery data lake with ETL/ELT pipelines, predictive forecasting, and anomaly detection.",
    client: "A technology company with a distributed go-to-market operation",
    capabilities: ["Data & analytics", "AI & data"],
    problem: [
      "Revenue data was distributed across five systems: CRM for opportunity tracking, HR for headcount and cost, a quoting tool for deal structure, a payments platform for actuals, and a financial system for accounting. None of them agreed on what ‘revenue’ meant.",
      "Forecasting was done in spreadsheets. Anomalies were noticed when someone looked at the right report at the right time. There was no systematic view of where revenue was coming from, whether it was tracking to plan, or where it was likely to go.",
    ],
    approach: [
      {
        heading: "Source system inventory and data contracts",
        body: "Documented the data model, update cadence, and reliability characteristics of each source system. Defined what each system owned — CRM owned opportunities, HR owned headcount, payments owned actuals — and established contracts for what each would produce.",
      },
      {
        heading: "BigQuery data lake and ELT pipelines",
        body: "Built optimized ELT pipelines from all five sources into a BigQuery staging layer. Modeled a unified revenue entity in dbt — one definition of a recognized revenue event that reconciled against both the quoting system and the accounting system.",
      },
      {
        heading: "Forecasting and anomaly detection",
        body: "Built predictive forecasting models on top of the unified revenue model. Layered anomaly detection to flag when actuals deviated from expected patterns — early warning rather than month-end surprise.",
      },
    ],
    outcome: "5 systems unified under a single revenue model",
    tech: ["BigQuery", "dbt", "Python", "ETL/ELT", "Looker"],
    metric: "5 systems unified",
  },
  {
    slug: "realtime-data-platform",
    tag: "Financial services · Fortune 500",
    title: "Real-time card delivery visibility under a 40ms latency budget",
    lede: "A multi-stage Kafka streaming pipeline with DynamoDB persistence, SageMaker models, PII protection and a full audit trail — all inside a strict per-message latency SLA.",
    client: "A Fortune 500 financial institution with a consumer card business",
    capabilities: ["Data & analytics", "Cloud & platform engineering", "Technology talent"],
    problem: [
      "Card delivery events — production, dispatch, tracking, delivery confirmation — were processed in batch. Operations teams had no real-time view of where cards were in the delivery pipeline. When cards didn’t arrive, the first signal was a customer call.",
      "The program required real-time event processing at production volume, with PII handling that met compliance requirements, a full audit trail for every record, and a latency budget of 40ms per message end-to-end. Senior engineers who could design to that constraint were needed on site within two weeks.",
    ],
    approach: [
      {
        heading: "Architecture design under the latency constraint",
        body: "Designed the pipeline starting from the latency budget, not the other way around. Each stage — ingest, transform, enrich, persist, score — was profiled against the budget. Kafka was chosen for ingest throughput and ordering guarantees. DynamoDB for persistence latency characteristics. SageMaker endpoints for inference with predictable p99 latency.",
      },
      {
        heading: "PII protection and audit trail",
        body: "Built PII tokenization at the ingest boundary — raw identifiers never persisted in intermediate stages. Implemented a replayable audit log for every message transformation, satisfying compliance requirements for data lineage.",
      },
      {
        heading: "SageMaker model integration",
        body: "Integrated SageMaker inference into the pipeline for delivery risk scoring. Model invocations were synchronous within the latency budget. Fallback logic handled endpoint cold starts without dropping the latency SLA.",
      },
      {
        heading: "Staff deployment",
        body: "Deployed senior engineers on site within the two-week requirement. Engineers joined the client team’s sprint cadence and were accountable to the same delivery milestones.",
      },
    ],
    outcome: null,
    tech: ["Kafka", "DynamoDB", "SageMaker", "AWS", "Python", "Java"],
    metric: "40ms SLA",
  },
  {
    slug: "health-data-integration",
    tag: "Healthcare · Enterprise",
    title: "HL7 FHIR integration across a multi-site health system",
    lede: "Clinical data siloed across disparate EMR systems with no common patient record. We built HL7/FHIR R4 ingestion pipelines, patient matching, and a clinical data warehouse on Snowflake.",
    client: "A multi-site health system operating across several facilities",
    capabilities: ["Data & analytics", "Data engineering", "Cybersecurity"],
    problem: [
      "Clinical data was produced by multiple EMR systems across different facilities. Each system used HL7 2.x messaging with inconsistent field population — the same data element implemented differently across sites. Patient matching across facilities wasn’t automated: a patient who visited two sites existed as two unrelated records.",
      "The absence of a unified patient record meant that population health analysis required manual data pulls from each system. Care gap analysis was running weeks behind. Regulatory reporting took longer than it should because nobody trusted the numbers that came out automatically.",
    ],
    approach: [
      {
        heading: "HL7 2.x ingestion and normalization",
        body: "Built message handlers for HL7 2.x ADT, ORM, and ORU message types. Normalized inconsistent field usage across sending systems by documenting each site’s implementation and building site-specific transformation rules that produced a consistent intermediate representation.",
      },
      {
        heading: "FHIR R4 conversion and patient matching",
        body: "Converted normalized HL7 records to FHIR R4 resources. Implemented patient matching using a combination of deterministic matching (MRN, date of birth, name) and probabilistic scoring for records without reliable deterministic identifiers. Matched records were linked, not merged, preserving the source record and the match rationale.",
      },
      {
        heading: "Clinical data warehouse on Snowflake",
        body: "Built a clinical data warehouse modeled in dbt on Snowflake. Clinical entities — patients, encounters, diagnoses, observations, medications — were modeled as stable, testable relations that downstream analytics could depend on.",
      },
      {
        heading: "HIPAA-aligned data handling",
        body: "Implemented access controls, audit logging, and encryption at rest and in transit consistent with HIPAA requirements. PHI was scoped to roles and use cases rather than broadly accessible.",
      },
    ],
    outcome: null,
    tech: ["FHIR R4", "HL7 2.x", "dbt", "Snowflake", "Python", "AWS (HIPAA-eligible services)"],
    metric: null,
  },
  {
    slug: "platform-engineering",
    tag: "Technology · Platform",
    title: "Internal developer platform for a distributed engineering organization",
    lede: "Forty microservices, six teams, four different CI/CD approaches. We standardized on Kubernetes with GitOps, Terraform modules, and a centralized observability layer.",
    client: "A technology company with a distributed engineering organization",
    capabilities: ["Cloud & platform engineering", "Technology talent"],
    problem: [
      "A growing engineering organization had accumulated infrastructure debt in proportion to its product velocity. Forty microservices were deployed across six teams using four different CI/CD pipelines. Terraform was owned by one person. Infrastructure provisioning was done by hand for anything outside the happy path.",
      "Deployments were inconsistent. Runbooks differed by service. Observability was partial — some services emitted metrics, others didn’t. When something broke in production, correlating the failure across services was a manual process that depended on knowing who owned what.",
    ],
    approach: [
      {
        heading: "Standards before tooling",
        body: "Started with a service catalog: what exists, who owns it, what it depends on. Established standards for service structure, deployment manifests, and observability instrumentation before touching any tooling. Teams could see where their services sat against the standard.",
      },
      {
        heading: "GitOps with ArgoCD",
        body: "Migrated CI/CD to a GitOps model with ArgoCD managing Kubernetes deployments. Application configuration in Git became the source of truth for what was deployed. Drift between the declared state and the running state became visible and automatically reconciled.",
      },
      {
        heading: "Terraform module library",
        body: "Built a library of Terraform modules for the infrastructure patterns teams actually used: EKS clusters, RDS instances, S3 buckets with standardized IAM, VPC configurations. Teams provisioned infrastructure by consuming modules with documented inputs, not by writing Terraform from scratch.",
      },
      {
        heading: "Centralized observability",
        body: "Deployed Prometheus and Grafana with standard dashboards for the service patterns in use. Required every service to emit the four golden signals. Built alert routing so that production failures went to the right team without manual escalation.",
      },
    ],
    outcome: null,
    tech: ["Kubernetes", "Helm", "ArgoCD", "Terraform", "GitHub Actions", "Prometheus", "Grafana", "AWS EKS"],
    metric: null,
  },
];
