export interface Testimonial {
  id: string;
  industry: string;
  industrySlug: string;
  accentClass: string;
  quote: string;
  attribution: string; // role title only — no personal name, no company
  engagement: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-01",
    industry: "AI Research",
    industrySlug: "ai-research",
    accentClass: "bg-teal",
    quote: "We needed a team that could build the infrastructure, not just fine-tune a model. TOPSYS built the data pipeline, the evaluation framework, and the deployment architecture. It's running in production and it's running correctly.",
    attribution: "Chief AI Officer",
    engagement: "Agentic AI platform build",
  },
  {
    id: "t-02",
    industry: "Fintech",
    industrySlug: "fintech",
    accentClass: "bg-signal",
    quote: "Every payment intelligence project we'd tried before ran aground on data quality and regulatory constraints. TOPSYS addressed both before writing a line of model code. That's the right order.",
    attribution: "VP of Data Engineering",
    engagement: "Payment intelligence platform",
  },
  {
    id: "t-03",
    industry: "Telecom",
    industrySlug: "telecom",
    accentClass: "bg-teal",
    quote: "OSS/BSS modernization at this scale has too many integration points to hand to a generalist integrator. They knew the protocols, they knew the vendors, and they kept the legacy systems running while we migrated.",
    attribution: "Director of Network Operations",
    engagement: "OSS/BSS modernization",
  },
  {
    id: "t-04",
    industry: "Financial Services",
    industrySlug: "financial-services",
    accentClass: "bg-teal",
    quote: "Our risk data platform had been a priority for four years and never shipped. It shipped in eight months. The difference was engineers who owned the outcome.",
    attribution: "Chief Risk Officer",
    engagement: "Risk data platform",
  },
  {
    id: "t-05",
    industry: "Retail",
    industrySlug: "retail",
    accentClass: "bg-signal",
    quote: "We didn't need a systems integrator — we needed a team that could take the existing platform apart and rebuild it while we kept selling. That's a different kind of problem and they solved it.",
    attribution: "VP of Engineering",
    engagement: "Commerce platform re-platform",
  },
];
