import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at TOPSYS IT Solutions LLC. Engineering and delivery positions across enterprise and government technology programs.",
};

/* Source: https://topsysit.com/careers/ - "Growth / Culture / Opportunity / Impact" cards,
   lightly tightened for house voice (no hype adjectives, no exclamation marks). Facts unchanged. */
const WHAT_WE_OFFER = [
  {
    title: "Growth",
    body: "Continuous learning and career advancement through real client work and technical challenges.",
  },
  {
    title: "Culture",
    body: "A workplace built on collaboration, respect, and the freedom to raise ideas.",
  },
  {
    title: "Opportunity",
    body: "Diverse projects and global exposure across engineering and delivery teams.",
  },
  {
    title: "Impact",
    body: "Work on client technology programs across enterprise and government sectors.",
  },
];

/* Source: https://topsysit.com/careers/ accordion listings, retrieved verbatim and lightly
   copyedited for grammar/consistency only (no facts added or removed). The apply mechanism
   (email + mailing address, repeated identically on every listing on the source page) is
   consolidated once in the "How to apply" section below instead of per card. The source page
   lists two near-identical "Software developer" postings and two "DevOps engineer" postings
   as separate entries; both are preserved here as they appear on the source page. */
const ROLES = [
  {
    title: "Software developer",
    jd: "Design, develop, implement, maintain and test business functions and web applications using a variety of languages, tools, methodologies and technologies. Develop, create and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Design software or customize software for client use with the aim of optimizing operational efficiency.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, or a related field, or an acceptable combination of education, training, and experience. Requires travel and work from various client sites throughout the USA. Hours are M&ndash;F, 9am&ndash;5pm.",
    locations: "United States of America",
  },
  {
    title: "DevOps systems engineer",
    jd: "Design system solutions and provide technical input across all aspects of a project, including design and system integration, to facilitate delivery within time and maintain customer satisfaction. Develop and automate CI/CD pipelines using Jenkins and GitLab. Develop action plans for resolving system architecture issues.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, or a related field, or an acceptable combination of education, training, and experience. Requires travel and work from various client sites throughout the USA. Hours are M&ndash;F, 9am&ndash;5pm.",
    note: "Relocation is not required. Assignments are at client sites for a limited, short-term duration, typically two weeks to three to six months, with the possibility of extension, after which staff are reassigned to a new project.",
    locations: "United States of America",
  },
  {
    title: ".NET developer",
    jd: "Develop, create and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Develop a reusable framework for the application using the ASP.NET MVC framework. Work across the full project life cycle, from requirements gathering through analysis and UI design. Design and develop REST- and SOAP-based services consumed by web applications.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, or a related field, and one year of experience as a .NET developer or in a related IT occupation, or an acceptable combination of education, training, and experience. Requires travel and work from various client worksites throughout the USA. Hours are M&ndash;F, 9am&ndash;5pm.",
    locations: "United States of America",
  },
  {
    title: "Business analyst",
    jd: "Work closely with the team to identify and analyze core business processes and workflows. Track and publish the status of new projects to stakeholders. Conduct business process improvement reviews and identify gaps in the current structure. Use JIRA for documentation and visualization of KPIs, burnup/burndown charts, and Kanban boards. Work with the product owner on product refinement, re-prioritizing user stories against the INVEST criteria. Manage UAT testing; develop and review QA test strategies and test plans for appropriate coverage.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
    locations: "United States of America",
  },
  {
    title: "DevOps engineer",
    jd: "Design, develop and maintain infrastructure and application deployments across multiple environments. Configure scripts to automate build and release procedures. Develop CI/CD pipelines using tools such as Jenkins and Docker, integrated with the AWS cloud platform. Monitor, report, and troubleshoot environment failures. Perform security and quality scan analysis on infrastructure and applications. Identify and remediate network and compliance issues.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
    locations: "United States of America",
  },
  {
    title: "Senior software developer",
    jd: "Design, develop, implement, maintain, and test business functions and web applications using a variety of languages, tools, methodologies, and technologies. Develop, create, and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Manage scrum ceremonies and facilitate scrum adherence. Contribute to end-to-end automation across testing, deployment, and ticket creation. Create business models, logical specifications, and user requirements for the application environment.",
    requirements:
      "Bachelor&rsquo;s degree in computer science, engineering, technology, management information systems/security, or a related field, and 5 years of experience designing, developing, implementing, maintaining, and testing business functions and web applications. Work location is Alpharetta, GA, with required travel to client worksites throughout the USA.",
    locations: "United States of America",
  },
  {
    title: "Software developer / MuleSoft",
    jd: "Analyze requirements to design, document, and develop technical implementations of business requirements. Implement REST APIs that consume data from external SOAP services. Transform data into JSON and XML formats while developing REST web services. Design and develop integrations and APIs using enterprise integration patterns and frameworks with MuleSoft. Develop interfaces between Salesforce, databases, and REST/SOAP web services in Mule ESB, using connectors including Salesforce, SAP, AJAX, FTP, HTTP, File, SMTP, and SFTP. Create JDBC providers, data sources, and JAAS authentication aliases for connectivity to a backend Oracle database.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
    locations: "United States of America",
  },
  {
    title: "Software developer",
    jd: "Design, develop, implement, maintain, and test business functions and web applications using a variety of languages, tools, methodologies, and technologies. Develop, create, and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Design software or customize software for client use with the aim of optimizing operational efficiency.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
    locations: "United States of America",
  },
  {
    title: "DevOps engineer",
    jd: "Design, develop and maintain infrastructure and application deployments across multiple environments. Configure scripts to automate build and release procedures. Develop CI/CD pipelines using tools such as Jenkins and Docker, integrated with the AWS cloud platform. Monitor, report, and troubleshoot environment failures. Perform security and quality scan analysis on infrastructure and applications. Identify and remediate network and compliance issues.",
    requirements:
      "Master&rsquo;s degree in computer science, engineering, technology, or a related field, and one year of experience. Work location is Alpharetta, GA, which may also require travel to client locations throughout the USA.",
    locations: "United States of America",
  },
  {
    title: "Technical project manager",
    jd: [
      "Plan, coordinate, and oversee enterprise IT infrastructure and application projects by defining project objectives, developing schedules and milestones, coordinating resources and cross-functional activities, managing dependencies and risks, and monitoring deliverables to ensure projects are completed within approved scope, budget, timeline, and quality requirements.",
      "Manage the end-to-end execution of strategic enterprise technology initiatives, including project planning, requirements coordination, implementation, testing, deployment, and post-production activities while ensuring alignment with organizational objectives.",
      "Serve as Scrum Master for Agile delivery teams by facilitating Sprint Planning, Daily Stand-ups, Sprint Reviews, Sprint Retrospectives, backlog refinement, and other Agile ceremonies, while identifying and removing project impediments.",
      "Coordinate cloud modernization initiatives involving the migration of on-premises applications to multi-cloud environments by managing project schedules, dependencies, deliverables, resources, risks, and stakeholder communications throughout the project lifecycle.",
      "Coordinate business process automation initiatives by working with business stakeholders and technical teams to identify operational requirements, evaluate automation opportunities, prioritize initiatives, and oversee implementation activities designed to improve operational efficiency.",
      "Collaborate with engineering, architecture, analytics, operations, compliance, and executive leadership teams to coordinate project activities, resolve issues, manage dependencies, and communicate project progress.",
      "Monitor project performance against approved schedules, budgets, deliverables, milestones, and quality requirements, identifying variances and coordinating corrective actions when necessary.",
      "Identify, evaluate, document, and monitor project risks and issues, and develop mitigation and response strategies to minimize potential impacts to project schedules, budgets, resources, and deliverables.",
      "Maintain comprehensive project records, including project plans, requirements, schedules, risk and issue registers, change management records, meeting minutes, governance artifacts, performance metrics, status reports, and implementation documentation.",
      "Support staffing and resource allocation decisions by evaluating project requirements, workload, skill requirements, timelines, resource availability, and project priorities.",
      "Lead project staffing and resource onboarding activities by supporting workforce planning, coordinating candidate sourcing and evaluation, facilitating interview scheduling and offer processes, and overseeing the onboarding of project personnel in alignment with project requirements and timelines.",
      "Apply analytical, organizational, communication, and problem-solving skills to coordinate multiple IT initiatives, address project challenges, adapt to changing technology requirements, and support successful project delivery.",
    ],
    requirements:
      "The position requires, at minimum, a bachelor&rsquo;s degree in computer science, computer information systems, information technology, or a combination of education and experience equivalent to a U.S. bachelor&rsquo;s degree in one of those fields, and two years of relevant experience. Hours are M&ndash;F, 9am&ndash;5pm.",
    locations: "United States of America",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden" style={{ padding: "6rem 0 5rem" }}>
        <span
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[120%] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(14,90,102,.07),rgba(141,198,62,.04) 45%,transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="wrap relative z-[1]">
          <Breadcrumb items={[{ label: "Careers" }]} />
          <Eyebrow className="mt-6">Careers</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Careers at TOPSYS IT
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We hire for real client programs across enterprise and government technology work, not a standing bench. Roles span software development, DevOps, cloud, data, and business analysis, with mentorship and continuous learning built into how we work.
          </p>
          <div className="flex gap-3 flex-wrap mt-8">
            <Button href="#open-roles">View open roles</Button>
            <Button href="mailto:info@topsysit.com" variant="secondary">
              Email your resume
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHAT WE OFFER - inverted, 4 columns
          Source: topsysit.com/careers/ - Growth / Culture / Opportunity / Impact
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <ScrollReveal>
            <Eyebrow>Why work here</Eyebrow>
            <h2
              className="font-display font-medium text-on-field mt-4"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                letterSpacing: "-0.025em",
              }}
            >
              What TOPSYS IT offers
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-4 gap-6 mt-10 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {WHAT_WE_OFFER.map(({ title, body }) => (
              <div key={title} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CURRENT OPENINGS - paper, accordion list
          Source: topsysit.com/careers/ - accordion job listings
          ================================================================ */}
      <section id="open-roles" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <ScrollReveal>
            <Eyebrow>Open roles</Eyebrow>
            <h2
              className="font-display font-medium text-ink mt-4"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Current openings
            </h2>
            <p className="text-body text-ink-2 max-w-[62ch] mt-4">
              All positions run Monday through Friday, 9am to 5pm, and require travel and work from client sites.
            </p>
          </ScrollReveal>

          {/* Accordion list */}
          <div
            className="mt-10"
            style={{ borderTop: "1px solid var(--color-hairline)" }}
          >
            {ROLES.map((role, idx) => (
              <details
                key={`${role.title}-${idx}`}
                className="group"
                style={{ borderBottom: "1px solid var(--color-hairline)" }}
              >
                <summary
                  className="flex items-center gap-5 py-5 cursor-pointer select-none"
                  style={{ listStyle: "none" }}
                >
                  {/* Suppress WebKit default marker */}
                  <style>{`details > summary::-webkit-details-marker { display: none; }`}</style>

                  {/* Ordinal */}
                  <span
                    className="font-mono text-ink-muted shrink-0"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      width: "2rem",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-display font-medium text-ink flex-1"
                    style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
                  >
                    {role.title}
                  </h3>

                  {/* Chevron */}
                  <span
                    className="shrink-0 text-ink-muted"
                    aria-hidden="true"
                    style={{
                      transition: "transform 280ms cubic-bezier(.2,0,0,1)",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        display: "block",
                        // rotate is applied via group-open in Tailwind v4
                      }}
                      className="group-open:rotate-180 transition-transform duration-[280ms] ease-[cubic-bezier(.2,0,0,1)]"
                    >
                      <path
                        d="M3 6l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>

                {/* Expanded content */}
                <div
                  style={{
                    paddingLeft: "calc(2rem + 1.25rem)",
                    paddingBottom: "2rem",
                  }}
                >
                  {/* Signature rule across top of expanded section */}
                  <div
                    className="mb-6"
                    style={{
                      height: "2px",
                      background:
                        "linear-gradient(90deg,#0E5A66 0%,#2C8A6E 55%,#8DC63E 100%)",
                      maxWidth: "6rem",
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="grid gap-x-16 gap-y-6"
                    style={{
                      gridTemplateColumns: "1fr auto",
                    }}
                  >
                    {/* Left: JD + Requirements */}
                    <div>
                      <p
                        className="font-mono text-ink-muted uppercase"
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: ".08em",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Job description
                      </p>
                      {Array.isArray(role.jd) ? (
                        <ul className="text-body-sm text-ink-2 space-y-2 pl-4" style={{ listStyleType: "disc" }}>
                          {(role.jd as string[]).map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-body-sm text-ink-2">{role.jd as string}</p>
                      )}

                      <p
                        className="font-mono text-ink-muted uppercase"
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: ".08em",
                          marginTop: "1.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Position requirements
                      </p>
                      <p
                        className="text-body-xs text-ink-muted"
                        dangerouslySetInnerHTML={{ __html: role.requirements }}
                      />
                      <p
                        className="font-mono text-ink-muted uppercase"
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: ".08em",
                          marginTop: "1.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Location
                      </p>
                      <p
                        className="text-body-xs text-ink-muted"
                        dangerouslySetInnerHTML={{ __html: role.locations }}
                      />

                      {role.note && (
                        <p
                          className="text-body-xs text-ink-muted mt-3 pt-3"
                          style={{
                            borderTop: "1px solid var(--color-hairline)",
                          }}
                          dangerouslySetInnerHTML={{ __html: role.note }}
                        />
                      )}
                    </div>

                    {/* Right: Apply button */}
                    <div className="flex items-start pt-1 max-[700px]:hidden">
                      <Button
                        href={`mailto:info@topsysit.com?subject=${encodeURIComponent(
                          `Application: ${role.title}`
                        )}`}
                        variant="secondary"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Apply button — mobile only (below content) */}
                  <div className="mt-6 hidden max-[700px]:block">
                    <Button
                      href={`mailto:info@topsysit.com?subject=${encodeURIComponent(
                        `Application: ${role.title}`
                      )}`}
                      variant="secondary"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW TO APPLY - surface
          Source: topsysit.com/careers/ - apply instructions repeated on
          every listing, consolidated once here
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap items-center justify-between">
            <div>
              <p className="font-display font-medium text-heading-4 text-ink">
                How to apply
              </p>
              <p className="text-body-sm text-ink-2 mt-1 max-w-[56ch]">
                Send your resume, with contact information, to{" "}
                <a
                  href="mailto:info@topsysit.com"
                  className="text-teal border-b border-current pb-0.5"
                >
                  info@topsysit.com
                </a>.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="mailto:info@topsysit.com">Email your resume</Button>
              <Button
                href="https://www.linkedin.com/company/topsysitsolutions/"
                variant="secondary"
              >
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
