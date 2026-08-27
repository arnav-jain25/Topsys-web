"use client";

import { useEffect, useRef } from "react";
import { TextLink } from "@/components/ui/Button";

interface CaseStudy {
  tag: string;
  title: string;
  body: string;
  diagram: React.ReactNode;
  tech: string[];
  metric: string | null;
  href: string;
}

/* Flow paths use class="fp" — the useEffect below animates them with Web Animations API,
   matching the reference exactly: 14px running dot, infinite linear, duration 3200+i*260ms. */

// Landing page slot 1 — Conversational AI / Agentforce GTM
const AgentforceDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="User query entering Agentforce which retrieves from Salesforce and BigQuery to return a contextual response.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="34" width="50" height="22" rx="3" />
      <rect x="152" y="6" width="72" height="20" rx="3" />
      <rect x="152" y="66" width="72" height="20" rx="3" />
      <rect x="250" y="34" width="48" height="22" rx="3" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M52 45 H72" />
      <path d="M130 45 H141 V16 H152" />
      <path d="M130 45 H141 V76 H152" />
      <path d="M224 16 H234 V45 H250" />
      <path d="M224 76 H234 V45" />
    </g>
    <rect x="72" y="31" width="58" height="28" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-on-field-2)">
      <text x="6" y="48">USER</text>
      <text x="157" y="19">SALESFORCE</text>
      <text x="158" y="79">BIGQUERY</text>
      <text x="253" y="48">RESPONSE</text>
    </g>
    <text x="101" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-signal)">AGENTFORCE</text>
    <text x="101" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--color-signal)">+ CLAUDE</text>
  </svg>
);

// Landing page slot 2 — Fintech / multi-processor payment data
const PaymentsDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Two processors feeding a canonical model, then a reporting layer.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="12" width="66" height="22" rx="3" />
      <rect x="2" y="56" width="66" height="22" rx="3" />
      <rect x="230" y="34" width="68" height="22" rx="3" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M68 23 H100 V45 H120" />
      <path d="M68 67 H100 V45" />
      <path d="M202 45 H230" />
    </g>
    <rect x="120" y="27" width="82" height="36" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-on-field-2)">
      <text x="10" y="26">PROCESSOR A</text>
      <text x="10" y="70">PROCESSOR B</text>
      <text x="237" y="48">REPORTING</text>
    </g>
    <text x="161" y="49" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-signal)">CANONICAL</text>
  </svg>
);

// Landing page slot 3 — AI frontier / BigQuery + ML + Claude
const RevenueDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Five GTM systems consolidating into a BigQuery data lake feeding ML forecasting and anomaly detection.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="8" width="50" height="14" rx="3" />
      <rect x="2" y="27" width="50" height="14" rx="3" />
      <rect x="2" y="46" width="50" height="14" rx="3" />
      <rect x="2" y="65" width="50" height="14" rx="3" />
      <rect x="224" y="22" width="74" height="18" rx="3" />
      <rect x="224" y="50" width="74" height="18" rx="3" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M52 15 H84 V44 H112" />
      <path d="M52 34 H84" />
      <path d="M52 53 H84" />
      <path d="M52 72 H84 V44" />
      <path d="M194 44 H210 V31 H224" />
      <path d="M194 44 H210 V59 H224" />
    </g>
    <rect x="112" y="28" width="82" height="32" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-on-field-2)">
      <text x="230" y="34">FORECASTING</text>
      <text x="232" y="62">ANOMALIES</text>
    </g>
    <text x="153" y="48" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-signal)">BIGQUERY</text>
  </svg>
);

// Full work page — Financial services / wealth management workflow
const WealthManagementDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Workflow requests entering a Spring Boot backend with federated search across Elasticsearch and Solr, under Kubernetes.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="34" width="54" height="22" rx="3" />
      <rect x="150" y="10" width="66" height="20" rx="3" />
      <rect x="150" y="60" width="66" height="20" rx="3" />
      <rect x="248" y="34" width="50" height="22" rx="3" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M56 45 H74" />
      <path d="M132 45 H141 V20 H150" />
      <path d="M132 45 H141 V70 H150" />
      <path d="M216 20 H232 V45 H248" />
      <path d="M216 70 H232 V45" />
    </g>
    <rect x="74" y="31" width="58" height="28" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-on-field-2)">
      <text x="5" y="48">WORKFLOW</text>
      <text x="156" y="23">ELASTIC</text>
      <text x="159" y="73">SOLR</text>
      <text x="252" y="48">RESULT</text>
    </g>
    <text x="103" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fill="var(--color-signal)">SPRING BOOT</text>
    <text x="103" y="54" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6" fill="var(--color-signal)">KUBERNETES</text>
  </svg>
);

// Full work page — Telecom / T-Mobile DevOps + Kafka/MSK + Claude
const TelecomDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="GitLab CI/CD deploying to Kubernetes clusters with Kafka/MSK event streaming and Claude AI assisting vulnerability remediation.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="34" width="46" height="22" rx="3" />
      <rect x="152" y="10" width="140" height="70" rx="3" />
      <rect x="162" y="22" width="36" height="16" rx="2" />
      <rect x="204" y="22" width="36" height="16" rx="2" />
      <rect x="246" y="22" width="40" height="16" rx="2" />
      <rect x="162" y="48" width="36" height="16" rx="2" />
      <rect x="204" y="48" width="38" height="16" rx="2" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M48 45 H66" />
      <path d="M114 45 H152" />
    </g>
    <rect x="66" y="31" width="48" height="28" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-on-field-2)">
      <text x="5" y="48">GITLAB</text>
      <text x="165" y="31">K8S</text>
      <text x="207" y="31">MSK</text>
      <text x="249" y="31">AWS</text>
      <text x="165" y="57">EC2</text>
      <text x="205" y="57">CLAUDE</text>
      <text x="157" y="74" fontSize="6">500+ MICROSERVICES</text>
    </g>
    <text x="90" y="48" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--color-signal)">CI/CD</text>
  </svg>
);

// Full work page — Healthcare / HL7 FHIR
const HealthDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="HL7 sources feeding a FHIR conversion layer, then a clinical data warehouse.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="12" width="60" height="22" rx="3" />
      <rect x="2" y="56" width="60" height="22" rx="3" />
      <rect x="230" y="34" width="68" height="22" rx="3" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M62 23 H90 V45 H112" />
      <path d="M62 67 H90 V45" />
      <path d="M194 45 H230" />
    </g>
    <rect x="112" y="27" width="82" height="36" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-on-field-2)">
      <text x="6" y="26">HL7 2.x ADT</text>
      <text x="6" y="70">HL7 2.x ORU</text>
      <text x="234" y="48">SNOWFLAKE</text>
    </g>
    <text x="153" y="49" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--color-signal)">FHIR R4</text>
  </svg>
);

const CASE_STUDIES: CaseStudy[] = [
  // ── First three appear on the homepage ───────────────────────────────
  {
    tag: "Conversational AI · Enterprise",
    title: "Conversational access to GTM operations at an AI research company",
    body: "GTM data across Salesforce, Workday, CPQ, Stripe, and NetSuite — five systems, no unified interface. We deployed Salesforce Agentforce and Claude to give teams natural-language access to pipeline, account, and operational context.",
    diagram: <AgentforceDiagram />,
    tech: ["Agentforce", "BigQuery"],
    metric: null,
    href: "/work/gtm-conversational-ai",
  },
  {
    tag: "Fintech · Payments",
    title: "A single source of truth for multi-processor payment analytics",
    body: "Transaction, fee, and settlement data across two acquiring processors — each with its own formats and codes. We designed a canonical payment data model and evidence-based crosswalk that made cross-processor analytics defensible.",
    diagram: <PaymentsDiagram />,
    tech: ["Data modeling", "SQL"],
    metric: null,
    href: "/work/payments-data",
  },
  {
    tag: "Technology · AI & ML",
    title: "GTM data modernization and AI/ML enablement for a high-growth AI company",
    body: "Five go-to-market systems, no unified revenue view, no systematic early warning. We built a BigQuery data lake with ML forecasting, anomaly detection, and Claude-based generative AI.",
    diagram: <RevenueDiagram />,
    tech: ["BigQuery", "Claude"],
    metric: null,
    href: "/work/revenue-intelligence",
  },
  // ── Remaining entries on /work ────────────────────────────────────────
  {
    tag: "Financial services · Wealth management",
    title: "Backend modernization for an enterprise wealth management workflow platform",
    body: "Legacy Linux-hosted backend, ~5,000 users, 3-second dashboard load times. Rewrote in Java 17 / Spring Boot 3.5 on Kubernetes — doubled user capacity, 67% faster load time, and eliminated release dependencies for configuration changes.",
    diagram: <WealthManagementDiagram />,
    tech: ["Java 17", "Kubernetes"],
    metric: "67% faster · 2× capacity",
    href: "/work/realtime-data-platform",
  },
  {
    tag: "Telecommunications · Fortune 500",
    title: "Cloud infrastructure modernization and DevOps at telco scale",
    body: "300+ EC2 instances, 20+ Kubernetes clusters, 500+ microservices, traditional Kafka at scale. We modernized the cloud platform, migrated to AWS MSK, and integrated Claude into security remediation workflows.",
    diagram: <TelecomDiagram />,
    tech: ["Kubernetes", "AWS MSK"],
    metric: "40%+ cost reduction",
    href: "/work/platform-engineering",
  },
  {
    tag: "Healthcare · Enterprise",
    title: "HL7 FHIR integration across a multi-site health system",
    body: "Clinical data siloed across disparate EMR systems with no common patient record. We built HL7/FHIR R4 ingestion pipelines, patient matching, and a clinical data warehouse on Snowflake.",
    diagram: <HealthDiagram />,
    tech: ["FHIR R4", "Snowflake"],
    metric: null,
    href: "/work/health-data-integration",
  },
];

export function CaseStudyGrid({ limit }: { limit?: number }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const studies = limit ? CASE_STUDIES.slice(0, limit) : CASE_STUDIES;

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* requestAnimationFrame ensures the SVG paths are painted and measurable
       before getTotalLength() is called — without it, paths may return 0. */
    const anims: Animation[] = [];
    const raf = requestAnimationFrame(() => {
      const paths = el.querySelectorAll<SVGPathElement>("svg.flow .fp path");
      paths.forEach((p, i) => {
        const L = p.getTotalLength();
        if (!L) return;
        // Use SVG presentation attribute (not inline CSS style) so WAAPI
        // can cleanly own stroke-dashoffset without cascade conflicts.
        p.setAttribute("stroke-dasharray", `14 ${L}`);
        anims.push(
          p.animate(
            [{ strokeDashoffset: 0 }, { strokeDashoffset: -(L + 14) }],
            { duration: 3200 + i * 260, iterations: Infinity, easing: "linear" }
          )
        );
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-12 max-[767px]:grid-cols-1">
      {studies.map((cs) => (
        <article
          key={cs.href}
          className="flex flex-col rounded-panel border border-field-hairline px-8 py-8 transition-all duration-base ease-standard hover:border-signal/35 hover:shadow-field hover:-translate-y-[3px]"
          style={{ background: "linear-gradient(160deg,#123F4A,#0B2F38)" }}
        >
          <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-signal mb-4">
            {cs.tag}
          </p>
          <h3 className="font-display font-medium text-heading-3 text-on-field mb-3 leading-snug">
            {cs.title}
          </h3>
          <p className="text-body-xs text-on-field-2 flex-1">{cs.body}</p>

          {/* Flow diagram */}
          <div className="my-5 border-t border-b border-field-hairline py-4">
            {cs.diagram}
          </div>

          {/* Tech + metric row */}
          <div className="flex gap-5 flex-wrap font-mono text-mono-sm text-on-field-2 mb-4">
            {cs.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
            {cs.metric && <b className="text-signal font-normal">{cs.metric}</b>}
          </div>

          <TextLink href={cs.href} className="!text-signal">Read the case</TextLink>
        </article>
      ))}
    </div>
  );
}
