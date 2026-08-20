export interface Insight {
  slug: string;
  topic: string;
  title: string;
  summary: string;
  content: {
    heading?: string;
    body: string;
  }[];
  readTime: string;
  published: string;
  defaultOpen?: boolean;
}

export const INSIGHTS: Insight[] = [
  {
    slug: "agent-auditability",
    topic: "Agentic AI",
    title: "The agent that ships is the one you can audit",
    summary:
      "Agent demos clear the bar easily and production clears nothing. The gap isn’t model capability. It’s that nobody can answer what the agent did, on whose authority, and with which credentials.",
    readTime: "8 min read",
    published: "August 2025",
    defaultOpen: true,
    content: [
      {
        heading: "Why demos succeed and production fails",
        body: "Demos run in a controlled environment with one happy path. The data is clean, the request is well-formed, and the person running it knows what to type. Production has ambiguous inputs, edge cases, and someone who will try to make the agent do something unintended. The model isn’t the difference between a passing demo and a failing deployment. The difference is that nobody built for the cases where things go sideways.",
      },
      {
        heading: "The governance problem",
        body: "Every agent action is a state change. An email sent. A record updated. A workflow triggered. An API called on behalf of an account. Who authorized that action? With what scope? On behalf of whom? These are questions a risk committee or a regulator will ask, and most agentic systems built in 2024 cannot answer them. Not because the builders were careless, but because the frameworks they used don’t expose those concepts yet.",
      },
      {
        heading: "Scoped permissions at runtime",
        body: "The principle of least privilege applies to agents the same way it applies to human operators. An agent should have exactly the permissions needed for its defined task, issued at the time the task starts, and revoked when the task completes. Not a shared service account. Not a developer’s personal credentials hardcoded into an environment variable. Not a long-lived token that can do anything the integration supports. The credential surface of an agent should be proportional to its task scope, and that scope should be explicit.",
      },
      {
        heading: "The replayable action log",
        body: "Every agent action (tool call, API invocation, file write, message sent, decision made) should be recorded in a structured log that can be replayed for audit. Not “the agent ran and produced this output.” Rather: the agent called this endpoint with these parameters and received this response at this timestamp, acting under this identity, following this instruction. If you can’t reconstruct the sequence of decisions from the log, the log isn’t adequate.",
      },
      {
        heading: "Human checkpoints on irreversible steps",
        body: "Classify agent actions by reversibility. Reading data: low risk, no checkpoint needed. Writing a record: medium risk, log and alert on anomalies. Sending an email or message: high risk, consider a short hold before dispatch. Deleting data, triggering a financial transaction, or sending a notification to a customer: require human confirmation before proceeding. This isn’t a limitation of the agent. It’s what makes the agent trustworthy enough to deploy at all.",
      },
      {
        heading: "The multi-agent authorization problem",
        body: "Agents that spawn subagents amplify every governance problem. If Agent A delegates to Agent B, which identity does Agent B act as? What permissions does it inherit? What’s the chain of custody for the action log? Most current LLM frameworks handle agent-to-agent delegation as a capability question, not an authorization question. The identity model isn’t clean yet. Until it is, treat multi-agent architectures as higher-risk and compensate with tighter logging and narrower scopes.",
      },
      {
        heading: "What a risk committee actually needs",
        body: "A scope definition: what the agent can do and what it explicitly cannot. An identity model: what credentials it uses, how they’re issued, and how they expire. An action log: a complete record of what it did in production. An escalation path: what happens when it’s uncertain or encounters something outside its scope. If you can produce all four of those, your agent can survive an audit. If you can’t produce any of them, the demo is ahead of the deployment.",
      },
      {
        heading: "The design implication",
        body: "Agent governance isn’t an add-on. You can’t build a system, deploy it, and then retrofit an audit trail. The permission model, the action log, and the human checkpoints are architectural decisions that have to be made at the start, because they shape what the agent can do and what it knows about itself. An agent designed without them can’t be made safe later without rebuilding it.",
      },
    ],
  },
  {
    slug: "ai-roadmap-is-data",
    topic: "Data & AI",
    title: "Your AI roadmap is a data roadmap in costume",
    summary:
      "Almost every stalled AI program we’re asked to assess turns out to be a data quality problem that nobody scoped as one. Ownership is unclear, definitions differ between systems, and lineage stops at the first ETL job.",
    readTime: "7 min read",
    published: "August 2025",
    content: [
      {
        heading: "The pattern",
        body: "A pilot works in a notebook because the data scientist hand-curated the training set. In production, the same model gets different data: different formats, different nulls, different semantics for the same field name across source systems. The model output degrades and the investigation starts. Blame goes to the model. It’s almost never the model.",
      },
      {
        heading: "Why AI programs stall at the data layer",
        body: "It’s not that teams don’t know data quality matters. It’s that nobody wants to scope the data work because it’s not the interesting part. The interesting part is the model. So the data work gets estimated optimistically, absorbed into the first sprint, and declared done. The program then spends the next six months in a slow grind against data problems that were never diagnosed.",
      },
      {
        heading: "What data quality actually means for AI",
        body: "Completeness is the easy one. The harder problems are semantic consistency (does “revenue” mean the same thing in this table as in that one?), lineage (where did this value come from and what transformations touched it?), and temporal coherence (when was this record true, and is that the right point in time for this use case?). A training set built on inconsistent semantics produces a model that learned the wrong thing. You can’t fix it by tuning.",
      },
      {
        heading: "Canonical models",
        body: "A canonical model is an agreed-upon definition of a business entity (a payment, a patient, a customer, an order) that multiple systems produce records about. Building it requires getting the domain experts in the same room and making decisions that will annoy everyone equally. It’s unglamorous work. It’s also what makes everything else possible. Without canonical definitions, every downstream AI system inherits the disagreement between source systems.",
      },
      {
        heading: "Data contracts",
        body: "A data contract is a producer-consumer agreement. The producer commits to schema, to update cadence, to acceptable null rates, to what the data means semantically. The consumer commits to using it as documented. When the producer violates the contract, the pipeline fails loudly before the bad data reaches the model. Most data platforms have no contracts. Something breaks, nobody owns the break, and the investigation starts from scratch every time.",
      },
      {
        heading: "Quality gates that fail loudly",
        body: "A quality check that writes to a log nobody reads is not a quality check. Quality gates should fail the pipeline, alert someone with authority to fix it, and block downstream consumption until the issue is resolved. The alternative, silently passing data with quality problems to a model, produces outputs that look plausible and are wrong. That’s harder to detect and harder to explain than a pipeline that stops.",
      },
      {
        heading: "Lineage for training data",
        body: "If you retrain your model, do you know what data it was trained on? Do you know whether that data has since been corrected, deleted, or found to be wrong? For regulated industries, this is a compliance question. For everyone else, it’s an operational one, because the next thing after a model behaves unexpectedly is someone asking where the training data came from. Most organizations cannot answer that.",
      },
      {
        heading: "The practical implication",
        body: "When you scope an AI program, add a data discovery sprint at the front. Assess the source systems. Identify the data owners. Map the definitions. Run a quality profile. If the data isn’t there, the AI program isn’t ready, and it’s better to know in week two than in month six. The data work isn’t a prerequisite that slows things down. It’s the work that determines whether the rest of it sticks.",
      },
    ],
  },
  {
    slug: "machine-identities",
    topic: "Cybersecurity",
    title: "Machine identities now outnumber your employees",
    summary:
      "Every service account, pipeline token, and AI agent is an identity with permissions. They’re being created faster than any identity program can absorb them, and most organizations can’t inventory what they have.",
    readTime: "9 min read",
    published: "August 2025",
    content: [
      {
        heading: "The scale shift",
        body: "In 2015, the ratio of machine identities to human identities in a typical enterprise was roughly 1:1. By 2024 it’s closer to 45:1 in large enterprises, and still growing, driven by microservices, CI/CD pipelines, cloud-native workloads, and now AI agents. Traditional IAM programs were built for human-scale identity management. They were not designed for this.",
      },
      {
        heading: "What machine identities are",
        body: "Service accounts in Active Directory and cloud IAM systems. API keys and tokens issued to applications. SSH keys embedded in automation scripts. Deployment pipeline credentials stored in environment variables. Container registry tokens. OAuth client credentials. Cloud instance profiles. And increasingly: credentials issued to AI agents at runtime, sometimes for the duration of a single task. Each of these is an identity with permissions. Each can be compromised.",
      },
      {
        heading: "Why they proliferate",
        body: "Creating a service account or generating an API key takes two minutes and solves an immediate problem. Tracking it, rotating it, and eventually expiring it takes a process that most organizations don’t have. The result is a credential estate that grows in one direction. Old credentials accumulate because nobody is accountable for their expiry. New ones are created because the old process is easier than finding the old credential.",
      },
      {
        heading: "The inventory problem",
        body: "Before you can secure machine identities, you have to know what exists. For most organizations, that inventory doesn’t live in a single place. Service accounts are in Active Directory. API keys are in application configs, environment variables, and occasionally source code. SSH keys are on servers. Cloud credentials are in separate IAM systems per provider. Getting to a complete picture requires pulling from all of these sources, normalizing the formats, and deduplicating across systems. It’s the least exciting part of the program and the part that makes everything else possible.",
      },
      {
        heading: "Least privilege at machine scale",
        body: "A human can read a permission policy and understand what it means. Governance decisions can be made at a human pace, with context. Machine identities need the same least-privilege treatment, but at a scale and cadence that requires automation. Every machine identity should have a defined scope: the minimum permissions needed for its task. A defined owner: a human accountable for it. And a defined expiry: a point at which it stops being valid. If you can’t say all three for each credential, you have debt.",
      },
      {
        heading: "Credential rotation and expiry",
        body: "The most consistent finding in identity security assessments is long-lived credentials: service accounts with passwords unchanged for years, API keys with no expiry, SSH keys from employees who left the organization. Automated rotation is the fix. It’s not interesting work, but it eliminates a large class of persistent access risk. The operational investment is in building the rotation infrastructure and integrating it with the systems that consume the credentials. That’s the part that takes time.",
      },
      {
        heading: "The agentic AI compounding factor",
        body: "LLM agents need credentials to do useful things: call APIs, read databases, trigger workflows, send messages. If those credentials are long-lived, broadly scoped, and not attributable to a specific agent instance, they’re a significant attack surface. The right model is credentials issued at agent startup, scoped to the specific task, expired when the task completes, and logged at issuance and expiry. Most current agentic frameworks don’t implement this by default. It needs to be designed in, not assumed.",
      },
      {
        heading: "Where to start",
        body: "Inventory first. Use discovery tooling to enumerate machine identities across your environments. Classify by criticality of the access they hold. Start rotating the highest-risk, longest-lived credentials: the ones with broad permissions and no expiry on systems that matter. Establish an ownership policy: every machine identity has a named human owner accountable for its scope and lifecycle. The rest of the program follows from that foundation.",
      },
    ],
  },
  {
    slug: "chatbot-deflection",
    topic: "Conversational AI",
    title: "Nobody wants another chatbot",
    summary:
      "Deflection rate is the wrong number to optimize. It rewards a system for ending conversations rather than finishing work, and every deflected contact shows up later as a call.",
    readTime: "6 min read",
    published: "July 2025",
    content: [
      {
        heading: "The deflection metric",
        body: "Deflection rate measures how many contacts the chatbot handled without escalating to a human. It’s the number everyone reports in chatbot post-mortems. It’s also the wrong number, because it measures whether the chatbot ended the conversation, not whether it resolved the user’s problem. A chatbot that says “I don’t understand, please call us” has deflected the contact. It has not helped.",
      },
      {
        heading: "What deflection optimization produces",
        body: "A system that gets good at ending conversations. It learns to provide partial answers that are plausible enough that the user gives up. It escalates just enough to keep the deflection number respectable. Meanwhile, users who needed something specific call anyway, with less patience, having already spent time on a system that failed them. The deflection metric looks fine. The customer experience is worse than before the chatbot existed.",
      },
      {
        heading: "Resolution as the right metric",
        body: "Resolution asks whether the person got the thing they came for. Did the password reset work? Did the refund go through? Did the appointment get booked? Resolution requires the system to actually do something, not just respond. Measuring it requires connecting the chatbot outcome to the downstream system state, not asking the user if they’re satisfied immediately after a conversation that may or may not have worked.",
      },
      {
        heading: "What resolution requires",
        body: "System access. A chatbot that can only retrieve answers from a knowledge base cannot resolve most problems. The resolution-optimized design requires integrations: into the CRM, the booking system, the account management platform, the support ticketing system. The conversation is the interface. The resolution happens in the system of record. Chatbots that can’t write to anything can’t resolve anything.",
      },
      {
        heading: "Escalation that carries context",
        body: "When escalation is unavoidable, the context from the conversation needs to travel with it. The human who takes over should know what the user tried, what the chatbot said, and where the conversation broke down, not start from scratch. Most escalations today restart the conversation. The user has to explain again. That’s a product failure. The fix is structural: a handoff record passed to the agent at the moment of escalation.",
      },
      {
        heading: "The design change",
        body: "When you optimize for resolution instead of deflection, the entire design changes. Fewer scripted paths, because scripted paths can’t handle the variety of real requests. More system integrations, because resolution requires system access. Better escalation UX, because some problems genuinely need a person and that’s fine. The chatbot stops being a deflection tool and becomes a service interface. That’s a harder thing to build and a much more useful thing to operate.",
      },
    ],
  },
  {
    slug: "cloud-cost-reality",
    topic: "Cloud & FinOps",
    title: "The migration finished. The bill didn’t.",
    summary:
      "Lift-and-shift ends and the invoice arrives larger than the data centre it replaced. That’s the predictable result of moving workloads without changing how they’re built or who’s accountable for what they cost.",
    readTime: "6 min read",
    published: "July 2025",
    content: [
      {
        heading: "The lift-and-shift economics",
        body: "Moving a workload to the cloud without re-architecting it means paying cloud prices for on-premises behavior. A database server running at 15% utilization on-premises runs at 15% utilization in the cloud, but now you’re paying for a provisioned instance around the clock instead of amortized hardware. The economics are worse, not better. This is not a surprise; it’s arithmetic.",
      },
      {
        heading: "Why organizations do it anyway",
        body: "Re-architecting takes longer than migrating. Lift-and-shift is faster to execute, easier to plan, and produces a cleaner “migration complete” milestone for stakeholders. The cost problem is real but deferred. It shows up after the migration is declared a success. At that point, the team that made the decision has moved on to the next program and the invoice is someone else’s problem.",
      },
      {
        heading: "Right-sizing",
        body: "The first intervention after lift-and-shift is right-sizing: matching instance types and sizes to actual utilization rather than provisioned capacity. It’s not glamorous work, but it consistently produces 20–40% cost reductions on workloads that were sized for peak and never adjusted. It should be automated on a continuous basis, not a manual review that happens once a year and gets skipped when the team is busy.",
      },
      {
        heading: "Reserved and committed use",
        body: "On-demand pricing exists for unpredictable workloads. Predictable workloads (databases, application servers, scheduled data processing jobs) should be on reserved or committed use pricing. The discount is significant: 40–70% depending on the provider and term. Most organizations under-utilize reserved capacity because buying it requires someone accountable for forecasting usage, and that accountability is often unclear.",
      },
      {
        heading: "Platform engineering as phase two",
        body: "The second half of a cloud migration is changing how workloads are built and deployed: containerization, autoscaling, event-driven patterns that take advantage of cloud elasticity rather than fighting it. This is the phase that actually realizes the economics that were promised in the business case. It’s also the phase most organizations don’t budget for, because the migration budget was spent on phase one and the program was declared complete.",
      },
      {
        heading: "FinOps as a practice",
        body: "FinOps is not a tool you buy. It’s the practice of making cloud cost visible, attributable, and the responsibility of the teams that generate it. That requires tagging discipline (every resource tagged to a team and a workload), showback or chargeback so teams see their spend, and engineers who treat cost as a system property alongside latency and reliability. Most cloud cost programs fail because they’re run by finance, not by engineering.",
      },
      {
        heading: "The accountability gap",
        body: "The root cause of most cloud cost problems is that the team making provisioning decisions doesn’t see the bill. Engineers provision resources to solve a problem; finance sees the invoice at month-end. Closing that gap (giving engineers real-time cost visibility, making cost part of the architecture review, establishing unit economics by workload) is how organizations move from cost management to cost discipline.",
      },
    ],
  },
  {
    slug: "strangler-fig-in-practice",
    topic: "Application modernization",
    title: "The strangler fig works. The big rewrite doesn’t.",
    summary:
      "Big-bang rewrites fail at a rate high enough to be a known pattern, not a surprise. The strangler fig works, but only if you define the extraction boundary correctly from the start.",
    readTime: "7 min read",
    published: "August 2025",
    content: [
      {
        heading: "The rewrite track record",
        body: "Martin Fowler called it “the single worst strategic mistake” a software company can make. The evidence supports him. Big rewrites take longer than estimated. They’re completed with a different team than started them. By the time they ship, the target system has moved and the rewrite is already legacy. The list of famous failed rewrites is long. The list of successful ones is short and mostly involves very small systems.",
      },
      {
        heading: "Why teams still choose it",
        body: "The legacy system is genuinely bad. It’s hard to understand, hard to test, slow to change, and maintained by people who are tired of it. The rewrite is emotionally satisfying in a way that incremental improvement isn’t. You get to make better decisions with the knowledge you didn’t have the first time. And when you’re starting, you don’t yet know how long it will take, which is the same mistake made the first time.",
      },
      {
        heading: "What the strangler fig actually is",
        body: "You build new functionality as new services. You put a façade (an API gateway, a reverse proxy, a feature toggle) in front of the legacy system. New requests go to new services; existing requests go to the legacy system. Over time, you migrate functionality from legacy to new, strangling the old system by replacing it piece by piece until nothing routes to it. The legacy system doesn’t get rewritten; it gets displaced.",
      },
      {
        heading: "Defining the extraction boundary",
        body: "The first and most important decision is what to extract first. The answer isn’t “the most painful part.” It’s the part with the clearest interface and the fewest dependencies. A well-bounded, high-traffic capability that can be extracted without touching the database schema is ideal. A capability tightly coupled to the legacy data model, or that shares state with ten other modules, is not. It’s a trap that makes the strangler look like the rewrite.",
      },
      {
        heading: "The anti-corruption layer",
        body: "When new services need to talk to the legacy system, and they will, for a long time, the anti-corruption layer translates between the old domain model and the new one. Without it, the new system inherits the legacy system’s concepts and data structures, and you’ve bought new technology for old architecture. The anti-corruption layer is temporary by design; it exists to decouple the migration pace from the legacy system’s pace.",
      },
      {
        heading: "Database migration as the hard part",
        body: "Most strangler fig discussions focus on the application layer and gloss over the database. The database is where the real complexity lives: shared tables, implicit foreign keys, stored procedures that embed business logic, schemas accumulated over fifteen years. The database migration usually takes longer than the application migration and requires a period where both systems write to the same underlying data, which requires synchronization logic that has to be designed, tested, and eventually removed.",
      },
      {
        heading: "When not to use it",
        body: "The strangler fig requires that the legacy system has a stable interface to strangle. If the legacy system is a monolith with no HTTP boundary (a batch process, a stored procedure chain, an event-driven system with no external API), there’s nothing to put the façade in front of. In these cases, extracting bounded contexts into new services with a synchronization layer during the transition is closer to the right approach, though it shares many of the same principles.",
      },
      {
        heading: "The organizational requirement",
        body: "The strangler fig requires patience. You’re running two systems in parallel for months or years. That requires operational investment, testing discipline, and stakeholders who understand why the old system still exists. The modernization needs a named owner and a migration schedule with milestones, or it will drift indefinitely. The technical pattern is sound; the execution risk is organizational.",
      },
    ],
  },
];
