export interface ImpactMetric {
  value: string;    // e.g. "67%", "2×", "40%+"
  label: string;    // e.g. "faster dashboard load"
  detail?: string;  // e.g. "3 sec → 1 sec"
}

export interface ImpactStatement {
  heading: string;
  body: string;
}

export interface Impact {
  headline: string;
  metrics?: ImpactMetric[];
  statements?: ImpactStatement[];
}

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
  impact?: Impact;
  tech: string[];
  metric: string | null; // null if not confirmed
  related?: string[]; // slugs of related case studies, shown as a cluster
}

export const CASE_STUDIES: CaseStudy[] = [
  // ── First three — Adobe / digital content platform ─────────────────────

  {
    slug: "cpg-cms-modernization",
    tag: "Consumer goods · CMS modernization",
    title: "Multi-brand web platform migration from Sitecore to Contentstack for a global CPG enterprise",
    lede: "A Sitecore MVC monolith driving a multi-brand website portfolio, blocking every campaign behind developer deployments. We migrated to Contentstack with a Next.js headless frontend and a shared Storybook design system — cutting campaign launch time from 3 weeks to under 2 days and lifting mobile Lighthouse scores from ~38 to 92+.",
    client: "A global consumer packaged goods enterprise managing a multi-brand website portfolio across North America",
    capabilities: ["Applications & modernization", "Cloud & platform engineering"],
    problem: [
      "A legacy Sitecore Experience Platform (MVC) served as the CMS for a portfolio of brand websites across North America. The monolithic architecture required expensive licensing, developer-managed deployment pipelines for content changes that should have been editorial, and a substantial ongoing infrastructure footprint. Every seasonal campaign, product launch, or landing page update depended on the same deployment cycle as application code changes — delays measured in weeks, not hours.",
      "Web performance had degraded to the point where mobile Lighthouse scores were averaging around 38, well below competitive benchmarks for organic search. Siloed codebases across brand properties created redundant development work and prevented reuse of UI components or design systems across the portfolio. Adding a new regional brand site required months of work that should have taken days.",
    ],
    approach: [
      {
        heading: "Composable content architecture on Contentstack",
        body: "Converted rigid Sitecore templates into structured Contentstack Content Types and dynamic Modular Blocks, giving marketing teams drag-and-drop layout control within guardrails. Built custom Node.js ETL scripts using the Sitecore Query/REST API to extract legacy content, transform Sitecore Rich Text and HTL into Contentstack JSON format, and auto-map binary assets into the new repository with proper taxonomy tags.",
      },
      {
        heading: "Multi-brand token-driven UI with Storybook and Next.js",
        body: "Developed a unified React component library in Storybook mapped 1:1 to Contentstack Modular Blocks. Brand-level CSS variables — colors, typography, border radii — let a single React codebase render distinct visual identities across multiple brand domains automatically, eliminating the siloed per-brand codebases that had accumulated over years.",
      },
      {
        heading: "Edge delivery with Next.js App Router and ISR",
        body: "Implemented Next.js App Router with Static Site Generation for high-traffic pages and Incremental Static Regeneration via Contentstack Webhooks for instant content updates without full site rebuilds. Content that previously required a build pipeline now updates in seconds.",
      },
      {
        heading: "Node.js BFF layer for enterprise API aggregation",
        body: "Standardized a lightweight Node.js Backend-for-Frontend layer to aggregate enterprise backend services — .NET APIs, product information, loyalty programs — separately from the content delivery pipeline. This preserved the CMS as a clean content system while composing data from enterprise sources at the service boundary.",
      },
    ],
    outcome: "Mobile Lighthouse performance scores from ~38 to 92+, campaign launch cycles from 3 weeks to under 2 days, 42% reduction in operating costs by eliminating Sitecore licensing and legacy hosting overhead, and new regional brand site onboarding from months to days using shared Storybook components and design token swaps",
    impact: {
      headline: "Monolith replaced. Every dimension improved.",
      metrics: [
        {
          value: "68%",
          label: "performance improvement",
          detail: "Mobile Lighthouse ~38 → 92+",
        },
        {
          value: "4×",
          label: "faster content velocity",
          detail: "Campaign launch 3 weeks → under 2 days",
        },
        {
          value: "42%",
          label: "operating cost reduction",
          detail: "Sitecore licensing and legacy hosting eliminated",
        },
        {
          value: "70%",
          label: "faster brand onboarding",
          detail: "New regional sites in days, not months",
        },
      ],
    },
    tech: ["Contentstack", "Next.js", "React", "Storybook", "Node.js", "Edge CDN", "ISR"],
    metric: "68% perf gain · 4× faster",
    related: ["aem-omnichannel-content", "aem-dam-migration"],
  },

  {
    slug: "aem-omnichannel-content",
    tag: "Financial services · Adobe AEM",
    title: "Omnichannel content architecture on Adobe Experience Cloud for a US credit union",
    lede: "Content locked in a tightly coupled CMS with no headless delivery path. We architected an AEM/AEC foundation — Content Fragments, MuleSoft API mediation, persisted queries, and CDN caching — that serves web, mobile, email, and API consumers from a single governed content source.",
    client: "A US financial services credit union managing a digital member experience across web, mobile, and API channels",
    capabilities: ["Applications & modernization", "Cloud & platform engineering"],
    problem: [
      "The organization's digital content strategy was constrained by a tightly coupled CMS delivery model. Web, mobile, email, and other API-consuming applications each required the same managed content — rates, disclosures, product information, and member-facing copy — but had distinct presentation and data requirements that a single delivery pattern could not satisfy. Replicating and maintaining content per channel increased cost and the risk of inconsistency across the digital member experience.",
      "Controlled API access was absent. Consuming applications were constructing unrestricted queries, creating unpredictable request patterns, poor cacheability, and unnecessary processing overhead on the content platform. Dynamic enterprise data — rates and disclosures — was embedded in editorial content structures, coupling its update cycle to managed content workflows rather than the real-time data systems that owned it.",
    ],
    approach: [
      {
        heading: "AEM/AEC as the centralized content foundation",
        body: "Established Adobe Experience Cloud and AEM as the single managed content source. Content Fragments provided reusable structured content for headless consumers; Experience Fragments extended reuse to broader experience blocks needed across web, email, and campaign channels. Both headless API delivery and conventional AEM-managed web presentation operate from the same content repository — channel requirements no longer dictate content structure.",
      },
      {
        heading: "MuleSoft API mediation and persisted queries",
        body: "Deployed MuleSoft as a controlled service boundary between digital applications and AEC. Persisted queries stored on the AEC server give consuming applications predefined, governed retrieval patterns rather than unrestricted full queries — supporting predictable request behavior and efficient caching. Only the data a consuming application needs is retrieved; the content platform is shielded from unbounded query load.",
      },
      {
        heading: "Dynamic data composition at the service layer",
        body: "Rates, disclosures, and other frequently changing enterprise data are composed at the MuleSoft layer before delivery, combining managed editorial content with live data from enterprise systems. This keeps time-sensitive information outside the CMS content model entirely — its freshness and ownership belong to the systems that produce it, not the content management workflow.",
      },
      {
        heading: "CDN delivery, caching, and Cloud Manager automation",
        body: "Applied response caching to transformed content and suitable read-oriented AEC outputs, reducing repeated upstream processing. Adobe Cloud Manager provided automated DevOps, integrated CDN delivery, auto-scaling, and continuous security scanning — giving the organization repeatable deployments and resilient delivery without manual infrastructure management.",
      },
    ],
    outcome: "A single governed content foundation serving web, mobile, email, and API channels from one AEM/AEC ecosystem — headless and conventional delivery supported simultaneously, with controlled API access, dynamic data composition, and cloud-oriented operations",
    impact: {
      headline: "One content source, every channel",
      statements: [
        {
          heading: "Headless and conventional delivery from one platform",
          body: "AEM/AEC serves both API-driven consumers — mobile applications, single-page applications, email — and conventional web properties from the same managed content repository. Each channel controls its own presentation; AEC controls the content.",
        },
        {
          heading: "Dynamic data composed at the boundary",
          body: "Rates, disclosures, and other frequently changing enterprise information are injected at the MuleSoft service layer rather than embedded in editorial content — keeping managed content stable and dynamic data current without coupling their update cycles.",
        },
        {
          heading: "Controlled access, improved cacheability",
          body: "Persisted queries replace unrestricted full queries across all consuming applications. Request patterns are predictable and governed; responses are cacheable. The content platform processes less while serving more.",
        },
      ],
    },
    tech: ["Adobe Experience Cloud", "AEM", "Content Fragments", "Experience Fragments", "MuleSoft", "GraphQL", "CDN", "Adobe Cloud Manager"],
    metric: null,
    related: ["aem-dam-migration", "cpg-cms-modernization"],
  },

  {
    slug: "aem-dam-migration",
    tag: "Financial services · Adobe AEM Assets",
    title: "Marketing asset migration from fragmented LAN storage to enterprise DAM on Adobe Experience Cloud",
    lede: "3.4 TB of marketing assets distributed across LAN file shares with no taxonomy, no governed workflows, and distribution by manual copy. We migrated into AEM Assets as the governed repository and connected the asset lifecycle across Workfront, Creative Cloud, Frame.io, and Dynamic Media.",
    client: "A US financial services credit union with a marketing and creative team managing assets across campaign, web, email, and media channels",
    capabilities: ["Applications & modernization", "Cloud & platform engineering"],
    problem: [
      "The existing marketing asset environment was distributed across LAN folders and multiple systems, creating a fragmented content supply chain with an asset footprint of approximately 3.4 TB. Users depended on folder structures and filenames rather than rich metadata, filters, and facets — making asset discovery slow and inconsistent. Important context was embedded in filenames rather than structured metadata fields, limiting organization, search, and reuse.",
      "Expiration reminders, approvals, and lifecycle governance were not consistently automated. Personas and controlled access were not systematically applied across asset activities. Multiple copies of the same asset could exist across folders and systems, weakening the source of truth. Assets were shared as physical copies rather than governed links or reusable collections — every distribution created another uncontrolled copy with no lifecycle attached to it.",
    ],
    approach: [
      {
        heading: "Asset audit and controlled migration",
        body: "Structured the migration as a controlled asset modernization rather than a lift-and-shift. Conducted an asset audit and keep/kill analysis, followed by inventory analysis, metadata mapping and taxonomy assignment, and pattern identification from existing filenames. Automated and manual migration executed in sequence, with validation and user acceptance before delta migration, onboarding, and handover.",
      },
      {
        heading: "AEM Assets as the governed DAM",
        body: "Established AEM Assets as the governed repository for approved final marketing assets. Created target folder structures and mapped metadata and taxonomy. Applied role-based personas, version control, lifecycle workflows, and asset expiration controls. Shareable links and governed collections replaced uncontrolled copy distribution — one source of truth, not many copies.",
      },
      {
        heading: "Workfront integration for campaign orchestration",
        body: "Connected Workfront for project, task, review, status, and approval orchestration across the marketing workflow. Campaign and job metadata initialized in Workfront; assignments, reviews, and approvals managed there. AEM Assets receives approved final assets from the Workfront workflow rather than manual handoff — project state and asset state are connected.",
      },
      {
        heading: "Creative Cloud, Frame.io, and Dynamic Media",
        body: "Validated Creative Cloud and Frame.io connectivity for creative production, collaboration, and review workflows. Assets produced in Creative Cloud are linked to Workfront tasks and land in AEM Assets as governed records. Dynamic Media and CDN delivery distribute optimized renditions downstream to web, email, mobile, and media channels — on-brand assets, consistently delivered.",
      },
    ],
    outcome: "Centralized governance of approximately 3.4 TB of marketing assets in AEM Assets, with standardized metadata and taxonomy, persona-based access, lifecycle workflows, integrated project and approval processes via Workfront, and an extensible foundation for Dynamic Media delivery and future Content Hub capabilities",
    impact: {
      headline: "One governed source for every marketing asset",
      statements: [
        {
          heading: "Discovery through metadata, not folder memory",
          body: "Standardized metadata, taxonomy, folders, and facets replace dependence on folder structures and embedded filename conventions. Assets are findable by content, campaign, channel, or status — not by who knows where to look.",
        },
        {
          heading: "Marketing work and assets connected",
          body: "Workfront project and approval workflows connect directly to AEM Assets. Campaign intake, review, approval, and asset activation follow a governed path rather than disconnected handoffs across tools and inboxes.",
        },
        {
          heading: "Governed distribution, not copy proliferation",
          body: "Shareable links, versioned collections, and Dynamic Media delivery replace manual copy distribution. One approved asset serves all downstream channels; lifecycle controls expire it when it should no longer be in use.",
        },
      ],
    },
    tech: ["Adobe Experience Cloud", "AEM Assets", "Workfront", "Creative Cloud", "Frame.io", "Dynamic Media", "CDN"],
    metric: null,
    related: ["aem-omnichannel-content", "cpg-cms-modernization"],
  },

  // ── Remaining entries ──────────────────────────────────────────────────

  {
    slug: "gtm-conversational-ai",
    tag: "Conversational AI · Enterprise",
    title: "Conversational access to GTM operations at an AI research company",
    lede: "GTM data lived in Salesforce, Workday, CPQ, Stripe, and NetSuite — five systems with no unified interface. We deployed Salesforce Agentforce and Claude to give teams natural-language access to pipeline, account, and operational context without building a separate BI layer.",
    client: "A high-growth AI research company with a rapidly scaling commercial operation",
    capabilities: ["AI & data", "Applications & modernization"],
    problem: [
      "Rapid growth created a complex GTM environment spanning Salesforce, Workday, CPQ, Stripe, NetSuite, and related enterprise systems. Revenue, customer, sales, billing, and workforce data existed across each platform with no single view of the GTM lifecycle. Business and operations teams navigated multiple applications to answer questions that should have taken one step.",
      "Beyond access, the team needed intelligent automation. Manual reconciliation between systems slowed decision-making. Repetitive operational workflows were scaling with headcount rather than with automation. As the organization grew, the gap between what the data could tell you and what teams could actually act on in time was widening.",
    ],
    approach: [
      {
        heading: "Unified GTM data foundation on BigQuery",
        body: "Built a Google BigQuery-based GTM data lake integrating Salesforce, Workday, CPQ, Stripe, and NetSuite. Optimized ETL/ELT pipelines ingested, transformed, reconciled, and normalized data across these platforms into a consistent entity model — one definition of an opportunity, an account, a recognized revenue event.",
      },
      {
        heading: "Salesforce Agentforce as the conversational interface",
        body: "Deployed Agentforce as the intelligent interaction layer on top of Salesforce and the GTM data ecosystem. Users interact with pipeline status, customer context, and operational tasks through natural language rather than navigating system UIs. Agentforce surfaces relevant account, opportunity, and operational context based on governed business processes and the underlying data architecture.",
      },
      {
        heading: "Claude for generative AI workflows",
        body: "Incorporated Claude into GTM workflows to help users interact with complex business information, summarize relevant context, and assist with analysis. Claude complemented rather than replaced the broader architecture: BigQuery provided centralized data, Salesforce served as the system of engagement, Agentforce provided native Salesforce AI interactions, and Claude supported generative AI use cases across workflows.",
      },
      {
        heading: "Intelligent automation of repetitive GTM operations",
        body: "Identified workflow patterns with high manual overhead and automated them through the AI architecture. Repetitive GTM operations — reconciliation, status updates, exception identification — became guided, AI-assisted processes. As the organization grew, operational capacity scaled with automation rather than headcount.",
      },
    ],
    outcome: "Centralized GTM visibility with intelligent conversational access replacing manual system navigation across Salesforce, Workday, CPQ, Stripe, and NetSuite",
    impact: {
      headline: "GTM operations on a single, intelligent foundation",
      statements: [
        {
          heading: "Five systems, one interface",
          body: "Salesforce, Workday, CPQ, Stripe, and NetSuite unified under a single BigQuery data foundation. Teams reach pipeline, account, and operational context through natural language rather than navigating each system independently.",
        },
        {
          heading: "Repetitive operations automated",
          body: "Reconciliation tasks, status updates, and exception identification moved from manual system-hopping to AI-assisted workflows. Operational capacity scales with automation, not headcount, as the organization grows.",
        },
        {
          heading: "Earlier anomaly identification",
          body: "Revenue, pipeline, and billing anomalies surface in time for investigation rather than appearing in month-end reconciliation — shifting the operating model from reactive to proactive.",
        },
      ],
    },
    tech: ["Salesforce Agentforce", "BigQuery", "Claude", "ETL/ELT", "Python"],
    metric: null,
  },

  {
    slug: "payments-data",
    tag: "Fintech · Payments",
    title: "A single source of truth for multi-processor payment analytics",
    lede: "Transaction, fee, and settlement data across two acquiring processors — each with its own formats, identifiers, and codes. We designed a canonical payment data model and evidence-based crosswalk that made cross-processor analytics defensible.",
    client: "A large enterprise merchant operating across multiple acquiring processors",
    capabilities: ["Data & analytics", "Data engineering"],
    problem: [
      "The client settled transactions through two acquiring processors — a common setup that optimizes cost and redundancy, but creates a significant data challenge. Each processor delivered transaction, fee, and settlement data in its own format, with its own table structures, transaction identifiers, and codes for the same underlying business concepts. Interchange categories weren't normalized. Fee structures were defined differently per processor.",
      "Finance, operations, and analytics teams were spending significant manual effort reconciling these feeds line by line. Prior integration attempts had quietly assumed relationships between fields that were never confirmed — creating hidden risk in downstream reporting. Confidence in cross-processor analytics was low, and the root cause was the absence of a canonical model.",
    ],
    approach: [
      {
        heading: "Evidence-first field mapping",
        body: "Every mapping, code translation, and join key was validated against source data before being marked production-ready. Anything that could not be confirmed was explicitly flagged for subject-matter-expert review rather than assumed. Evidence over assumption governed the engagement from the first day.",
      },
      {
        heading: "Canonical data model with layered architecture",
        body: "Designed a translation layer between raw processor feeds and the reporting environment. Raw processor data was preserved untouched for audit purposes, with all harmonization logic applied in a clearly separated transformation layer — maintaining traceability while enabling a clean, business-friendly reporting layer on top.",
      },
      {
        heading: "Decode and lookup library",
        body: "Built a library of decode and lookup tables translating hundreds of processor-specific codes — interchange, plan, and downgrade codes — into plain-language business terms. A documented, evidence-based crosswalk identified which data elements could and could not be reliably compared across processors, turning previously invisible risk into a managed one.",
      },
      {
        heading: "Semantic layer and decision log",
        body: "Delivered a semantic layer enabling consistent reporting on authorization performance, interchange cost, and fee attribution regardless of which processor handled a transaction. A formal decision log and gap register gave the client's technical teams a durable reference for how and why key modeling choices were made.",
      },
    ],
    outcome: "A defensible, single source of truth for cross-processor payment analytics, replacing manual reconciliation, with a reusable architecture the client's teams can extend as new processors or data sources are added",
    impact: {
      headline: "Payment analytics the business can trust",
      statements: [
        {
          heading: "Cross-processor analytics made defensible",
          body: "A single, auditable canonical model replaces manual, ad hoc reconciliation across two acquiring processors. Finance, operations, and analytics teams work from one source of truth — regardless of which processor handled a given transaction.",
        },
        {
          heading: "Previously invisible risk documented",
          body: "Unverified field assumptions quietly embedded in prior integration attempts are now confirmed, resolved, or explicitly flagged — turning hidden misreporting risk into a managed, visible one.",
        },
        {
          heading: "Architecture built to grow",
          body: "The canonical model, decode library, and decision log extend to new processors or data sources as the business adds them. The foundation doesn't need to be rebuilt; it gets extended.",
        },
      ],
    },
    tech: ["Data modeling", "SQL", "Python", "ETL/ELT"],
    metric: null,
  },

  {
    slug: "revenue-intelligence",
    tag: "Technology · AI & ML",
    title: "GTM data modernization and AI/ML enablement for a high-growth AI company",
    lede: "Revenue, pipeline, and workforce data spread across Salesforce, Workday, CPQ, Stripe, and NetSuite — no systematic early warning, no unified view. We built a BigQuery data lake with ML forecasting, anomaly detection, and Claude-based generative AI.",
    client: "A high-growth AI research company with a rapidly scaling commercial operation",
    capabilities: ["Data & analytics", "AI & data"],
    problem: [
      "Rapid growth created a GTM environment where critical revenue, customer, sales, billing, and workforce data existed across Salesforce, Workday, CPQ, Stripe, NetSuite, and related systems — with no single view of the GTM lifecycle. Manual reporting required reconciling exports from multiple platforms, and the numbers didn't always agree.",
      "Beyond reconciliation, there was no systematic early warning when revenue was tracking off-plan, no proactive identification of anomalies, and no scalable way to automate the growing volume of repetitive operational workflows. Decision-making lagged behind the data that should have been informing it.",
    ],
    approach: [
      {
        heading: "BigQuery GTM data lake and ETL/ELT pipelines",
        body: "Built a Google BigQuery-based GTM data platform integrating Salesforce, Workday, CPQ, Stripe, NetSuite, and related systems. Optimized ETL/ELT pipelines ingested, transformed, reconciled, and normalized data across platforms — creating a unified foundation with one consistent definition of a revenue event.",
      },
      {
        heading: "Predictive revenue forecasting",
        body: "Developed revenue forecasting models analyzing historical and current GTM signals to provide improved visibility into expected revenue performance. The shift: from reporting what happened after the quarter closed to understanding where revenue was likely to land before it did.",
      },
      {
        heading: "Anomaly detection across the GTM lifecycle",
        body: "Deployed anomaly detection across revenue, transactions, pipeline, billing, and operational data. Unusual patterns — a billing discrepancy, a pipeline concentration risk, a spend anomaly — surface in time for investigation rather than appearing in month-end reconciliation.",
      },
      {
        heading: "Claude-based generative AI and intelligent automation",
        body: "Incorporated Claude into enterprise GTM workflows to help users interact with complex business information, summarize relevant context, and assist with analysis. Connected the broader AI architecture: BigQuery for centralized data, ML models for prediction, Salesforce for engagement, and Claude for generative AI — each layer complementing the others.",
      },
    ],
    outcome: "Centralized GTM visibility across five enterprise systems, predictive revenue forecasting, anomaly detection, and a scalable foundation for enterprise AI adoption connecting traditional analytics, machine learning, and generative AI",
    impact: {
      headline: "From reporting what happened to knowing what's next",
      metrics: [
        {
          value: "5",
          label: "GTM systems unified",
          detail: "Salesforce · Workday · CPQ · Stripe · NetSuite",
        },
      ],
      statements: [
        {
          heading: "Revenue intelligence, not just reporting",
          body: "ML forecasting models analyze historical and current GTM signals to surface where revenue is likely to land — before the quarter closes, not after it has.",
        },
        {
          heading: "Anomaly detection across the full lifecycle",
          body: "Unusual patterns in revenue, transactions, pipeline, billing, and operational data surface automatically, giving teams time to investigate rather than reconcile.",
        },
        {
          heading: "AI architecture built for scale",
          body: "BigQuery, ML models, Agentforce, and Claude connected into one coherent architecture. Each layer builds on the others; none operates in isolation.",
        },
      ],
    },
    tech: ["BigQuery", "Python", "ETL/ELT", "ML forecasting", "Claude"],
    metric: null,
  },

  // ── Full work page: remaining three ───────────────────────────────────

  {
    slug: "realtime-data-platform",
    tag: "Financial services · Wealth management",
    title: "Backend modernization for an enterprise wealth management workflow platform",
    lede: "A legacy Linux-hosted backend supporting ~1 million workflow tasks per month, ~5,000 users, and 3-second dashboard load times. We rewrote it in Java 17 / Spring Boot 3.5 on Kubernetes — doubling capacity, cutting load time by 67%, and eliminating release dependencies for configuration changes.",
    client: "A global financial services and wealth management organization",
    capabilities: ["Applications & modernization", "Cloud & platform engineering", "Technology talent"],
    problem: [
      "A workflow platform supporting approximately 5,000 users across a wealth management operation was hosted on traditional Linux server infrastructure with no path to horizontal scaling. Dashboard page-load times of approximately 3 seconds degraded analyst and advisor experience. Actual workflow volume — around 1 million tasks per month — was growing, and the architecture had no mechanism to handle it.",
      "Supported configuration changes — tab layouts, role-based view behavior, column configuration — required a two-week release cycle even when no application code changed. The backend needed to be rebuilt around horizontal scalability, distributed coordination, and a configuration-driven deployment model. Patching the existing platform wasn't an option.",
    ],
    approach: [
      {
        heading: "Co-designed target architecture",
        body: "A TOPSYS backend engineer worked alongside the client's architect to co-design the target architecture before writing production code. The approved design defined the REST API contract, federated search strategy across Elasticsearch and Fusion/Solr, Redis-based distributed coordination, and the Kubernetes deployment model.",
      },
      {
        heading: "Java 17 / Spring Boot 3.5 backend rewrite",
        body: "Rewrote the backend using Java 17 and Spring Boot 3.5. Federated search spanned Elasticsearch for active workflows and Fusion/Solr for archived workflows. Redis distributed locking prevented concurrent application instances from claiming the same workflow task. Entitlement and authorization rules enforced before any results returned to users.",
      },
      {
        heading: "Kubernetes deployment and CI/CD",
        body: "Deployed the redesigned application on Kubernetes with horizontal scaling from 4 to up to 15 pods under demand. Blue/green deployment and business-continuity coordination were built into the release process. TeamCity CI/CD and Grafana/Loki observability provided production visibility from day one.",
      },
      {
        heading: "Configuration-driven capabilities",
        body: "Moved tabs, columns, views, filters, and role-related behavior to configuration, eliminating the two-week release cycle for supported changes. Configuration updates that previously required an application deployment can now be introduced independently. AI-assisted engineering supported code analysis, implementation, and refactoring during the six-month rewrite.",
      },
    ],
    outcome: "Dashboard page-load time reduced ~67% (3 seconds to 1 second), supported user capacity doubled from ~5,000 to 10,000+, and actual production workflow volume grew from ~1M to ~2M tasks per month, with a 99.9% production SLA",
    impact: {
      headline: "Measurable improvement across every dimension that matters",
      metrics: [
        {
          value: "67%",
          label: "faster dashboard load",
          detail: "~3 sec → ~1 sec",
        },
        {
          value: "2×",
          label: "user capacity",
          detail: "~5,000 → 10,000+ supported",
        },
        {
          value: "2M",
          label: "tasks per month",
          detail: "up from ~1M — actual production volume",
        },
        {
          value: "3.75×",
          label: "horizontal scale",
          detail: "4 pods → up to 15 under demand",
        },
      ],
    },
    tech: ["Java 17", "Spring Boot 3.5", "Kubernetes", "Elasticsearch", "Redis", "TeamCity", "Grafana", "Loki", "Fusion/Solr"],
    metric: "67% faster load · 2× capacity",
  },

  {
    slug: "platform-engineering",
    tag: "Telecommunications · Fortune 500",
    title: "Cloud infrastructure modernization and DevOps at telco scale",
    lede: "300+ EC2 instances, 20+ Kubernetes clusters, 500+ microservices, and a self-managed Kafka infrastructure growing harder to operate at scale. We modernized the cloud platform, migrated to AWS MSK, and integrated Claude-based AI into security vulnerability remediation workflows.",
    client: "A major US telecommunications carrier",
    capabilities: ["Cloud & platform engineering", "AI & data", "Technology talent"],
    problem: [
      "A large-scale, business-critical application environment required reliable cloud infrastructure across 300+ EC2 instances and 20+ Kubernetes clusters supporting 500+ microservices. The environment ran 20+ production deployments per week and ongoing daily non-production deployments — delivery consistency and infrastructure stability had to hold simultaneously.",
      "Traditional self-managed Apache Kafka infrastructure was generating significant operational overhead as message volumes grew to millions of events per day. Vulnerability identification and remediation was a manual process, creating lag between discovery and resolution that an organization operating at this scale couldn't sustain.",
    ],
    approach: [
      {
        heading: "Terraform infrastructure as code and Ansible automation",
        body: "Implemented Terraform for repeatable, standardized AWS infrastructure provisioning across compute, storage, networking, identity, and load balancing. Ansible automated Linux configuration and patching across 300+ EC2 instances. Infrastructure configuration drift became visible and correctable rather than discovered during incidents.",
      },
      {
        heading: "Kubernetes, GitLab CI/CD, and delivery standardization",
        body: "Managed 20+ Kubernetes clusters using Docker and Helm for containerized workloads. GitLab CI/CD automated application delivery across environments, supporting 20+ production deployments per week alongside daily non-production deployments. Standardized delivery pipelines replaced inconsistent per-service approaches.",
      },
      {
        heading: "Kafka to AWS MSK migration",
        body: "Migrated traditional self-managed Apache Kafka workloads to Amazon Managed Streaming for Apache Kafka (MSK). The migration reduced the infrastructure and operational overhead of managing Kafka clusters directly — capacity planning, maintenance, patching, cluster administration — and contributed to a broader cost optimization initiative achieving 40%+ overall cost reduction.",
      },
      {
        heading: "Claude-based AI-assisted vulnerability remediation",
        body: "Integrated Claude and AI agents into selected GitLab-based engineering workflows for vulnerability analysis, patch preparation, and remediation proposals. AI assistance accelerates analysis and fix preparation; CI/CD validation and engineering review remain in the workflow before deployment. Engineers own the decision; the AI handles the first-pass investigation.",
      },
    ],
    outcome: null,
    impact: {
      headline: "Platform operating at scale — cost and complexity both reduced",
      metrics: [
        {
          value: "40%+",
          label: "cloud cost reduction",
          detail: "across the full TFB environment",
        },
        {
          value: "500+",
          label: "microservices managed",
          detail: "across 20+ Kubernetes clusters",
        },
        {
          value: "20+",
          label: "production deployments",
          detail: "per week, sustained",
        },
        {
          value: "300+",
          label: "EC2 instances",
          detail: "standardized under Terraform",
        },
      ],
    },
    tech: ["AWS", "Terraform", "Kubernetes", "Helm", "GitLab CI/CD", "Apache Kafka", "AWS MSK", "Ansible", "Prometheus", "Grafana", "Claude"],
    metric: "40%+ cloud cost reduction",
  },

  {
    slug: "health-data-integration",
    tag: "Healthcare · Enterprise",
    title: "HL7 FHIR integration across a multi-site health system",
    lede: "Clinical data siloed across disparate EMR systems with no common patient record. We built HL7/FHIR R4 ingestion pipelines, patient matching, and a clinical data warehouse on Snowflake.",
    client: "A multi-site health system operating across several facilities",
    capabilities: ["Data & analytics", "Data engineering", "Cybersecurity"],
    problem: [
      "Clinical data was produced by multiple EMR systems across different facilities. Each system used HL7 2.x messaging with inconsistent field population: the same data element implemented differently across sites. Patient matching across facilities wasn't automated: a patient who visited two sites existed as two unrelated records.",
      "The absence of a unified patient record meant that population health analysis required manual data pulls from each system. Care gap analysis was running weeks behind. Regulatory reporting took longer than it should because nobody trusted the numbers that came out automatically.",
    ],
    approach: [
      {
        heading: "HL7 2.x ingestion and normalization",
        body: "Built message handlers for HL7 2.x ADT, ORM, and ORU message types. Normalized inconsistent field usage across sending systems by documenting each site's implementation and building site-specific transformation rules that produced a consistent intermediate representation.",
      },
      {
        heading: "FHIR R4 conversion and patient matching",
        body: "Converted normalized HL7 records to FHIR R4 resources. Implemented patient matching using a combination of deterministic matching (MRN, date of birth, name) and probabilistic scoring for records without reliable deterministic identifiers. Matched records were linked, not merged, preserving the source record and the match rationale.",
      },
      {
        heading: "Clinical data warehouse on Snowflake",
        body: "Built a clinical data warehouse modeled in dbt on Snowflake. Clinical entities (patients, encounters, diagnoses, observations, medications) were modeled as stable, testable relations that downstream analytics could depend on.",
      },
      {
        heading: "HIPAA-aligned data handling",
        body: "Implemented access controls, audit logging, and encryption at rest and in transit consistent with HIPAA requirements. PHI was scoped to roles and use cases rather than broadly accessible.",
      },
    ],
    outcome: null,
    impact: {
      headline: "Clinical data unified — analytics and reporting unblocked",
      statements: [
        {
          heading: "One patient record across facilities",
          body: "Patients who visited multiple sites existed as separate, unrelated records. Probabilistic and deterministic matching linked them while preserving the source record and the rationale for each match.",
        },
        {
          heading: "Regulatory reporting on a trustworthy foundation",
          body: "Population health analysis and care gap reporting moved from manual, time-lagged data pulls from each EMR to a tested, consistent clinical data warehouse stakeholders could rely on.",
        },
        {
          heading: "HIPAA-aligned by design",
          body: "PHI access scoped to roles and use cases from the start, with audit logging and encryption at rest and in transit built into the pipeline architecture — not retrofitted after.",
        },
      ],
    },
    tech: ["FHIR R4", "HL7 2.x", "dbt", "Snowflake", "Python", "AWS (HIPAA-eligible services)"],
    metric: null,
  },
];
