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

const PaymentsDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Two processors feeding a canonical model, then Power BI.">
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
    <g fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-on-field-2)">
      <text x="10" y="26">PROCESSOR A</text>
      <text x="10" y="70">PROCESSOR B</text>
      <text x="238" y="48">POWER BI</text>
    </g>
    <text x="161" y="49" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--color-signal)">CANONICAL</text>
  </svg>
);

const RevenueDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Five systems consolidating into a data lake feeding forecasting and anomaly detection.">
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
    <g fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-on-field-2)">
      <text x="230" y="34">FORECASTING</text>
      <text x="230" y="62">ANOMALIES</text>
    </g>
    <text x="153" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--color-signal)">DATA LAKE</text>
  </svg>
);

const KafkaDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Kafka pipeline with DynamoDB and SageMaker inside a 40 millisecond budget.">
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
    <g fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-on-field-2)">
      <text x="8" y="48">EVENTS</text>
      <text x="156" y="23">DYNAMODB</text>
      <text x="156" y="73">SAGEMAKER</text>
      <text x="254" y="48">SCORED</text>
    </g>
    <text x="103" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--color-signal)">KAFKA</text>
  </svg>
);

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
    <g fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-on-field-2)">
      <text x="6" y="26">HL7 2.x ADT</text>
      <text x="6" y="70">HL7 2.x ORU</text>
      <text x="234" y="48">SNOWFLAKE</text>
    </g>
    <text x="153" y="49" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--color-signal)">FHIR R4</text>
  </svg>
);

const PlatformDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="Git pushing to ArgoCD which deploys to a Kubernetes cluster with multiple services.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="34" width="46" height="22" rx="3" />
      <rect x="152" y="10" width="140" height="70" rx="3" />
      <rect x="162" y="22" width="36" height="16" rx="2" />
      <rect x="204" y="22" width="36" height="16" rx="2" />
      <rect x="246" y="22" width="40" height="16" rx="2" />
      <rect x="162" y="48" width="36" height="16" rx="2" />
      <rect x="204" y="48" width="36" height="16" rx="2" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M48 45 H66" />
      <path d="M114 45 H152" />
    </g>
    <rect x="66" y="31" width="48" height="28" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-on-field-2)">
      <text x="5" y="48">GIT</text>
      <text x="166" y="31">SVC A</text>
      <text x="207" y="31">SVC B</text>
      <text x="249" y="31">SVC C</text>
      <text x="166" y="57">SVC D</text>
      <text x="207" y="57">SVC E</text>
      <text x="158" y="74" fontSize="6" fill="var(--color-on-field-2)">KUBERNETES</text>
    </g>
    <text x="90" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--color-signal)">ARGOCD</text>
  </svg>
);

const ConversationalDiagram = () => (
  <svg className="flow w-full" viewBox="0 0 300 92" role="img" aria-label="An incident feeding a conversational agent, which weighs evidence-backed hypotheses and routes a recommendation through human approval.">
    <g fill="none" stroke="var(--color-on-field-2)" strokeWidth=".8">
      <rect x="2" y="34" width="54" height="22" rx="3" />
      <rect x="150" y="6" width="70" height="20" rx="3" />
      <rect x="150" y="66" width="70" height="20" rx="3" />
      <rect x="248" y="34" width="50" height="22" rx="3" />
    </g>
    <g className="fp" fill="none" stroke="var(--color-signal)" strokeWidth="1.4">
      <path d="M56 45 H74" />
      <path d="M132 45 H141 V16 H150" />
      <path d="M132 45 H141 V76 H150" />
      <path d="M220 16 H232 V45 H248" />
      <path d="M220 76 H232 V45" />
    </g>
    <rect x="74" y="31" width="58" height="28" rx="3" fill="rgba(141,198,62,.08)" stroke="var(--color-signal)" />
    <g fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-on-field-2)">
      <text x="10" y="48">INCIDENT</text>
      <text x="158" y="19">EVIDENCE</text>
      <text x="158" y="79">HUMAN APPROVAL</text>
      <text x="254" y="48">ACTION</text>
    </g>
    <text x="103" y="48" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--color-signal)">AGENT</text>
  </svg>
);

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "Financial services · Active",
    title: "A single source of truth for cross-processor payment intelligence",
    body: "Payment, interchange, fee, settlement and dispute data lived in separate formats across two merchant processors. We designed a canonical payment data architecture on Snowflake, with automated pipelines, source-to-target mappings and a data quality framework.",
    diagram: <PaymentsDiagram />,
    tech: ["Snowflake", "Power BI"],
    metric: null,
    href: "/work/payments-data",
  },
  {
    tag: "Technology · Enterprise",
    title: "Unified revenue intelligence across five go-to-market systems",
    body: "CRM, HR, quoting, payments and financials with no single view of revenue. We built a centralized BigQuery data lake with optimized ETL/ELT pipelines, then layered predictive forecasting, anomaly detection and automation on top.",
    diagram: <RevenueDiagram />,
    tech: ["BigQuery", "ETL/ELT"],
    metric: "5 systems unified",
    href: "/work/revenue-intelligence",
  },
  {
    tag: "Conversational AI · Financial services",
    title: "A conversational AI platform for security incident response",
    body: "Investigation, evidence and decisions lived in separate tools with no shared record of the reasoning behind an action. We built a conversation-first AI platform that investigates, weighs hypotheses against evidence, and routes every recommendation through human approval.",
    diagram: <ConversationalDiagram />,
    tech: ["React", "LLM orchestration"],
    metric: null,
    href: "/work/conversational-incident-response",
  },
  {
    tag: "Financial services · Fortune 500",
    title: "Real-time card delivery visibility under a 40ms latency budget",
    body: "A multi-stage Kafka streaming pipeline with DynamoDB persistence, SageMaker models, PII protection and a full audit trail, all inside a strict per-message latency SLA in production. Senior engineers on site within two weeks.",
    diagram: <KafkaDiagram />,
    tech: ["Kafka", "SageMaker"],
    metric: "40ms SLA",
    href: "/work/realtime-data-platform",
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
  {
    tag: "Technology · Platform",
    title: "Internal developer platform for a distributed engineering organization",
    body: "Forty microservices, six teams, four different CI/CD approaches. We standardized on Kubernetes with GitOps, Terraform modules, and a centralized observability layer.",
    diagram: <PlatformDiagram />,
    tech: ["Kubernetes", "ArgoCD"],
    metric: null,
    href: "/work/platform-engineering",
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
