import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Cybersecurity — TOPSYS IT",
  description:
    "Security assessments, IAM programs, SIEM operations, and compliance advisory for enterprise and government. Compliance documentation and actual security posture are not the same deliverable.",
};

const FAILURE_MODES = [
  {
    label: "Compliance checkbox vs actual posture",
    body: "A passed audit documents what was true on the day of the assessment. It doesn&rsquo;t tell you what an attacker can do today. Frameworks like NIST CSF and CMMC measure control implementation — they don&rsquo;t measure whether those controls stop a real threat.",
  },
  {
    label: "Identity perimeter is gone, IAM wasn&rsquo;t updated",
    body: "The network perimeter eroded with remote work, SaaS adoption, and cloud migration. The identity layer is now the perimeter. Most organizations still have IAM programs built for an on-prem world — role sprawl, dormant accounts, no conditional access, no privileged session recording.",
  },
  {
    label: "Cloud security nobody reviews after deployment",
    body: "Cloud environments change continuously. A security baseline set at launch drifts the moment the first engineer opens a port or relaxes a policy for a deadline. Without continuous cloud security posture management, the gap between documented controls and actual configuration grows weekly.",
  },
];

const OFFERINGS = [
  {
    title: "Security assessment & advisory",
    body: "Assessments that produce a prioritized remediation backlog — not a findings report that sits in a shared drive.",
    bullets: [
      "NIST CSF and CMMC gap assessments for state and federal programs",
      "Penetration testing with exploitation evidence, not theoretical risk",
      "Cloud security posture review: misconfiguration and privilege exposure",
    ],
  },
  {
    title: "Identity & access management",
    body: "IAM programs designed for the environment you operate in — cloud-native, hybrid, or multi-directory.",
    bullets: [
      "Okta, CyberArk, and Azure AD implementation and rationalization",
      "Privileged access management and just-in-time provisioning",
      "Role and entitlement review with access certification workflows",
    ],
  },
  {
    title: "SIEM & threat detection",
    body: "Detection engineering, use case development, and SOC operations built on the platforms your team already runs.",
    bullets: [
      "Splunk and Microsoft Sentinel deployment and tuning",
      "Detection rule development tied to MITRE ATT&CK",
      "Incident response playbooks and tabletop exercise facilitation",
    ],
  },
];

const TECH = [
  "Splunk", "Microsoft Sentinel", "Okta", "CyberArk", "Azure AD",
  "Palo Alto Prisma", "Wiz", "Tenable", "CrowdStrike", "MITRE ATT&CK",
  "NIST CSF", "CMMC",
];

export default function CybersecurityPage() {
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
              { label: "Cybersecurity" },
            ]}
          />
          <Eyebrow className="mt-6">Cybersecurity</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Compliance documentation and security posture are not the same deliverable.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We run assessments that produce remediation priorities, build IAM programs for the
            identity perimeter that replaced the network, and operate SIEM environments that detect
            threats — not just collect logs. For state and federal programs, we work within NIST CSF
            and CMMC frameworks without pretending a framework audit is the same as a security review.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=enterprise">Talk to a security engineer</Button>
            <Button href="/public-sector" variant="secondary">
              Government programs
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHERE SECURITY PROGRAMS BREAK DOWN — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Where security programs break down</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            Three patterns that leave organizations exposed while appearing compliant.
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
            Assessments with remediation priorities. Identity programs that match the environment. Detection that fires on real threats.
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            Security work produces two things: documentation and actual reduction in risk. We
            optimize for the second. Every assessment ends with a prioritized, actionable backlog.
            Every IAM engagement produces a program the client team can operate after we leave.
            Every SIEM deployment includes detection rules tuned to the environment, not default
            content from the vendor.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 max-[767px]:grid-cols-1">
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                Assessments that produce priorities, not findings
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                We map controls against NIST CSF and CMMC where the engagement requires it,
                then go further: exploitation testing, configuration review, and a remediation
                roadmap ordered by exploitability and business impact — not framework category.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                IAM for the cloud and hybrid environment
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                Okta for workforce identity, CyberArk for privileged access, Azure AD for
                directory and conditional access. We rationalize existing configurations before
                adding new tools. Role sprawl and dormant accounts are the first problems we close.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                SIEM built for the environment, not the demo
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                Splunk and Microsoft Sentinel deployments start with the data sources that matter
                for the threat model. Detection rules are mapped to MITRE ATT&amp;CK. Alert volume
                is tuned before handoff. We don&rsquo;t leave a platform generating 300 daily alerts
                that no one investigates.
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                Cloud security posture management
              </h3>
              <p className="text-body-xs text-ink-2 max-w-[52ch]">
                Cloud environments change continuously. We instrument continuous posture monitoring
                so configuration drift — open storage buckets, overprivileged roles, disabled
                logging — is detected automatically rather than discovered in the next audit.
              </p>
            </div>
          </div>

          {/* Government context */}
          <div className="mt-14 border border-hairline rounded-card px-8 py-7 bg-surface">
            <p className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.1em] mb-3">
              Government programs
            </p>
            <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
              NIST CSF and CMMC context for state and federal work
            </h3>
            <p className="text-body-xs text-ink-2 max-w-[66ch]">
              We support state and local agencies navigating NIST Cybersecurity Framework adoption
              and federal contractors working toward CMMC compliance. We don&rsquo;t invent certification
              claims or guarantee audit outcomes — we build the technical controls and documentation
              that support the compliance program your legal and contracting team manages.
            </p>
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
            Three service lines, one security standard
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
