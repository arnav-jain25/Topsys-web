import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Cloud & platform engineering — TOPSYS IT",
  description:
    "Cloud migration, infrastructure as code, Kubernetes, CI/CD, and FinOps. We build platforms that reduce operational complexity — not move it to a different vendor.",
};

const FAILURE_MODES = [
  {
    label: "Lift-and-shift that doesn't reduce complexity",
    body: "Moving a VM to the cloud without changing the architecture gives you the same operational complexity at a higher monthly cost. The cloud bill arrives. The promised agility doesn't. The team still manages servers — they&rsquo;re just someone else&rsquo;s servers.",
  },
  {
    label: "Terraform written by one person",
    body: "Infrastructure as code that only one engineer can interpret is not infrastructure as code — it&rsquo;s a different kind of bus factor. When that person is unavailable, the team stops deploying and starts reading documentation they&rsquo;ve never seen before.",
  },
  {
    label: "Cloud cost that wasn&rsquo;t in the plan",
    body: "Most cloud budgets are set before the architecture is designed. Rightsizing, reserved instances, and spot usage get deferred to a later sprint that never comes. The spend compounds monthly. The engineering team is not accountable for it because they never owned it.",
  },
];

const OFFERINGS = [
  {
    title: "Cloud migration strategy",
    body: "We assess your workloads, choose the right landing zone, and sequence migration to reduce risk and preserve delivery momentum.",
    bullets: [
      "Cloud readiness assessment and landing zone design",
      "Migration sequencing: re-host, re-platform, re-architect decisions per workload",
      "Multi-cloud architecture for AWS, Azure, and GCP",
    ],
  },
  {
    title: "Platform & DevOps engineering",
    body: "Internal developer platforms, CI/CD pipelines, and GitOps workflows that let product teams ship without waiting on infrastructure.",
    bullets: [
      "Terraform and Pulumi for reproducible infrastructure",
      "Kubernetes, Helm, and ArgoCD for GitOps-based deployment",
      "GitHub Actions and Jenkins pipeline design and migration",
    ],
  },
  {
    title: "FinOps & cloud governance",
    body: "Visibility into where cloud spend goes and the controls to keep it from compounding unchecked.",
    bullets: [
      "Cost allocation tagging and showback reporting",
      "Reserved instance and savings plan analysis",
      "Policy-as-code for governance guardrails",
    ],
  },
];

const TECH = [
  "AWS", "Azure", "GCP", "Kubernetes", "Helm", "Terraform", "Pulumi",
  "ArgoCD", "GitHub Actions", "Jenkins", "Ansible", "Prometheus", "Grafana",
  "Datadog", "Istio",
];

export default function CloudAndPlatformEngineeringPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Capabilities", href: "/capabilities" },
              { label: "Cloud & platform engineering" },
            ]}
          />
          <Eyebrow className="mt-6">Cloud &amp; platform engineering</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Cloud migrations create new vendor dependencies. They don&rsquo;t have to.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            The goal is a platform your teams can operate, extend, and understand — not a cloud
            bill that grows faster than the value it produces. We build infrastructure as code,
            automate deployments end to end, and put cost accountability where the engineering
            decisions are made.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=enterprise">Talk to a cloud architect</Button>
            <Button href="#services" variant="secondary">
              What we deliver
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHERE CLOUD PROGRAMS BREAK DOWN — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Where cloud programs break down</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            The cloud didn&rsquo;t fail. The migration plan did.
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-12 max-[767px]:grid-cols-1">
            {FAILURE_MODES.map(({ label, body }) => (
              <div key={label} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {label}
                </h3>
                <p className="text-body-xs text-on-field-2 max-w-[52ch]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW WE WORK — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>How we work</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            IaC-first. GitOps-operated. Observed from day one.
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            Infrastructure that isn&rsquo;t code isn&rsquo;t reproducible. Deployments that aren&rsquo;t
            automated aren&rsquo;t reliable. Costs that aren&rsquo;t visible aren&rsquo;t managed. We
            build these three disciplines in parallel, not in sequence.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 max-[767px]:grid-cols-1">
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                Infrastructure as code from the start
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                We write Terraform or Pulumi before we provision anything. Every environment is
                recreatable from source. Module libraries are documented so any engineer on the
                team can read, extend, and plan changes independently.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                GitOps with ArgoCD
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                The Git repository is the source of truth for cluster state. ArgoCD reconciles
                continuously. Drift is detected and reported automatically. Rollbacks are a
                git revert, not a support call.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                Observability before go-live
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                Prometheus, Grafana, and structured logging are part of the platform design, not
                a sprint added after the first production incident. SLOs are defined before launch
                so teams know what they&rsquo;re operating to.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                Multi-cloud without multi-cloud complexity
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                We build on AWS, Azure, and GCP. When a workload benefits from cloud-native
                services, we use them. When portability matters more than optimization, we build
                for it. We name the trade-off before making it.
              </p>
            </div>
          </div>

          {/* Technology stack */}
          <div className="mt-14">
            <p className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.1em] mb-5">
              Technology
            </p>
            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="font-mono text-mono-xs text-ink-2 bg-surface border border-hairline px-3 py-1 rounded-tag"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICE OFFERINGS — surface, 3-col cards
          ================================================================ */}
      <section id="services" className="bg-surface" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>What we deliver</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Three service lines, one infrastructure standard
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-10 max-[1023px]:grid-cols-1">
            {OFFERINGS.map(({ title, body, bullets }, i) => (
              <div
                key={title}
                className="border border-hairline rounded-card px-6 py-6 bg-white"
              >
                <span className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.08em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-medium text-heading-3 text-ink mt-3 mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2 mb-5">{body}</p>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="text-body-xs text-ink-2 flex gap-2 items-start">
                      <span className="text-teal mt-[2px] flex-none" aria-hidden="true">
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
