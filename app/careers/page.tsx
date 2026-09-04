import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at TOPSYS IT Solutions LLC. Engineering and delivery positions across enterprise and government technology programs.",
};

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

const GC_ROLES = [
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
];

const H1B_ROLE = {
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
};

/* Shared chevron SVG */
function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="group-open:rotate-180 transition-transform duration-[280ms] ease-[cubic-bezier(.2,0,0,1)]"
      aria-hidden="true"
    >
      <path
        d="M3 6l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <ScrollReveal>
            <Eyebrow dark>Why work here</Eyebrow>
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
          ELIGIBILITY KEY - paper, two-track overview
          ================================================================ */}
      <section id="open-roles" style={{ padding: "7rem 0 0" }}>
        <div className="wrap">
          <ScrollReveal>
            <Eyebrow>Open roles</Eyebrow>
            <h2
              className="font-display font-medium text-ink mt-4"
              style={{
                fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
                letterSpacing: "-0.028em",
                lineHeight: 1.1,
              }}
            >
              Current openings
            </h2>
            <p className="text-body text-ink-2 max-w-[62ch] mt-4">
              All positions run Monday through Friday, 9am to 5pm, and require travel and work from client sites. Roles are listed by work authorization eligibility.
            </p>
          </ScrollReveal>

          {/* Eligibility track key */}
          <div
            className="grid grid-cols-2 gap-px mt-10 max-[639px]:grid-cols-1"
            style={{ background: "var(--color-hairline)" }}
          >
            {/* Track A */}
            <div className="bg-paper p-7 flex items-start gap-5">
              <span
                className="shrink-0 w-10 h-10 rounded flex items-center justify-center border border-hairline"
                aria-hidden="true"
                style={{ marginTop: "2px" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="2" y="3" width="14" height="12" rx="1.5" stroke="var(--color-teal)" strokeWidth="1.5"/>
                  <path d="M2 7h14" stroke="var(--color-teal)" strokeWidth="1.5"/>
                  <circle cx="9" cy="3" r="1.5" fill="var(--color-teal)"/>
                  <path d="M5.5 11h7M5.5 13.5h4" stroke="var(--color-teal)" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              </span>
              <div>
                <p
                  className="font-mono font-semibold uppercase tracking-[.1em] text-teal"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Track A · Green Card
                </p>
                <p className="font-display font-medium text-ink mt-2" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  Permanent residents
                </p>
                <p className="text-body-xs text-ink-2 mt-2 max-w-[38ch]">
                  {GC_ROLES.length} open roles for U.S. permanent residents.
                </p>
              </div>
            </div>

            {/* Track B */}
            <div
              className="p-7 flex items-start gap-5"
              style={{ background: "var(--color-field)", position: "relative", overflow: "hidden" }}
            >
              {/* Signature top-edge sweep */}
              <span
                className="absolute top-0 left-0 right-0 h-[3px] bg-signature"
                aria-hidden="true"
              />
              <span
                className="shrink-0 w-10 h-10 rounded flex items-center justify-center"
                aria-hidden="true"
                style={{ marginTop: "2px", background: "var(--color-field-raised)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="6.5" stroke="var(--color-signal)" strokeWidth="1.5"/>
                  <path d="M6 9l2.5 2.5L12.5 6" stroke="var(--color-signal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div>
                <p
                  className="font-mono font-semibold uppercase tracking-[.1em]"
                  style={{ fontSize: "0.8125rem", color: "var(--color-signal)" }}
                >
                  Track B · H-1B Sponsorship
                </p>
                <p className="font-display font-medium mt-2" style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)", letterSpacing: "-0.025em", lineHeight: 1.1, color: "var(--color-on-field)" }}>
                  Open to H-1B holders
                </p>
                <p className="text-body-xs mt-2 max-w-[38ch]" style={{ color: "var(--color-on-field-2)" }}>
                  1 featured role open to H-1B visa holders. TOPSYS IT sponsors the petition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRACK A — Green Card roles (accordion)
          ================================================================ */}
      <section style={{ padding: "5rem 0 0" }}>
        <div className="wrap">

          {/* Track label */}
          <div className="flex items-center gap-4 mb-8">
            <span
              className="font-mono font-semibold uppercase tracking-[.1em] text-teal"
              style={{ fontSize: "0.8125rem" }}
            >
              Track A
            </span>
            <span
              className="flex-1 h-px"
              style={{ background: "var(--color-hairline)" }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase tracking-[.08em] border border-hairline rounded px-2 py-0.5"
              style={{ fontSize: "0.625rem", color: "var(--color-teal)" }}
            >
              Green Card
            </span>
          </div>

          {/* Accordion */}
          <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
            <style>{`details > summary::-webkit-details-marker { display: none; }`}</style>
            {GC_ROLES.map((role, idx) => (
              <details
                key={`${role.title}-${idx}`}
                className="group"
                style={{ borderBottom: "1px solid var(--color-hairline)" }}
              >
                <summary
                  className="flex items-center gap-5 py-5 cursor-pointer select-none"
                  style={{ listStyle: "none" }}
                >
                  <span
                    className="font-mono text-ink-muted shrink-0"
                    style={{ fontSize: "0.6875rem", letterSpacing: ".08em", textTransform: "uppercase", width: "2rem" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display font-medium text-ink flex-1"
                    style={{ fontSize: "clamp(1.375rem, 2.2vw, 1.75rem)" }}
                  >
                    {role.title}
                  </h3>
                  <span className="shrink-0 text-ink-muted">
                    <Chevron />
                  </span>
                </summary>

                <div style={{ paddingLeft: "calc(2rem + 1.25rem)", paddingBottom: "2rem" }}>
                  <div
                    className="mb-6"
                    style={{
                      height: "2px",
                      background: "linear-gradient(90deg,#0D5278 0%,#2C8A6E 55%,#8DC63E 100%)",
                      maxWidth: "6rem",
                    }}
                    aria-hidden="true"
                  />

                  <div className="grid gap-x-16 gap-y-6" style={{ gridTemplateColumns: "1fr auto" }}>
                    <div>
                      <p className="font-mono text-ink-muted uppercase" style={{ fontSize: "0.6875rem", letterSpacing: ".08em", marginBottom: "0.5rem" }}>
                        Job description
                      </p>
                      <p className="text-body-sm text-ink-2">{role.jd as string}</p>

                      <p className="font-mono text-ink-muted uppercase" style={{ fontSize: "0.6875rem", letterSpacing: ".08em", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                        Position requirements
                      </p>
                      <p className="text-body-xs text-ink-muted" dangerouslySetInnerHTML={{ __html: role.requirements }} />

                      <p className="font-mono text-ink-muted uppercase" style={{ fontSize: "0.6875rem", letterSpacing: ".08em", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                        Location
                      </p>
                      <p className="text-body-xs text-ink-muted" dangerouslySetInnerHTML={{ __html: role.locations }} />

                      {"note" in role && role.note && (
                        <p
                          className="text-body-xs text-ink-muted mt-3 pt-3"
                          style={{ borderTop: "1px solid var(--color-hairline)" }}
                          dangerouslySetInnerHTML={{ __html: role.note as string }}
                        />
                      )}
                    </div>

                    <div className="flex items-start pt-1 max-[700px]:hidden">
                      <Button
                        href={`mailto:info@topsysit.com?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                        variant="secondary"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 hidden max-[700px]:block">
                    <Button
                      href={`mailto:info@topsysit.com?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
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
          TRACK B — H-1B featured role (inverted, always-expanded card)
          ================================================================ */}
      <section
        className="on-field"
        style={{ padding: "5rem 0 7rem", marginTop: "5rem" }}
      >
        <div className="wrap">

          {/* Track label */}
          <div className="flex items-center gap-4 mb-10">
            <span
              className="font-mono font-semibold uppercase tracking-[.1em]"
              style={{ fontSize: "0.8125rem", color: "var(--color-signal)" }}
            >
              Track B
            </span>
            <span
              className="flex-1 h-px"
              style={{ background: "var(--color-field-hairline)" }}
              aria-hidden="true"
            />
            <span
              className="font-mono uppercase tracking-[.08em] rounded px-2 py-0.5 border"
              style={{ fontSize: "0.625rem", color: "var(--color-signal)", borderColor: "var(--color-signal)", opacity: 0.8 }}
            >
              H-1B Sponsorship
            </span>
          </div>

          {/* Featured card */}
          <div
            className="relative overflow-hidden rounded-[6px]"
            style={{ background: "var(--color-field-raised)", border: "1px solid var(--color-field-hairline)" }}
          >
            {/* Signature top sweep */}
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-signature" aria-hidden="true" />

            <div className="p-8 max-[639px]:p-6">

              {/* Header row */}
              <div className="flex items-start justify-between gap-6 flex-wrap mb-8">
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 font-mono font-semibold uppercase tracking-[.1em] rounded px-2.5 py-1 mb-4"
                    style={{ fontSize: "0.625rem", color: "var(--color-signal)", background: "rgba(141,198,62,.12)", border: "1px solid rgba(141,198,62,.25)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--color-signal)" }}
                      aria-hidden="true"
                    />
                    H-1B eligible role
                  </span>
                  <h3
                    className="font-display font-medium"
                    style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)", letterSpacing: "-0.035em", color: "var(--color-on-field)", lineHeight: 1.0 }}
                  >
                    {H1B_ROLE.title}
                  </h3>
                  <p
                    className="font-mono uppercase tracking-[.08em] mt-2"
                    style={{ fontSize: "0.6875rem", color: "var(--color-on-field-2)" }}
                  >
                    {H1B_ROLE.locations}
                  </p>
                </div>

                <Button
                  href={`mailto:info@topsysit.com?subject=${encodeURIComponent(`Application: ${H1B_ROLE.title}`)}`}
                >
                  Apply for this role
                </Button>
              </div>

              {/* Divider */}
              <div className="h-px mb-8" style={{ background: "var(--color-field-hairline)" }} aria-hidden="true" />

              {/* Two-column content */}
              <div className="grid gap-x-16 gap-y-10 max-[800px]:block" style={{ gridTemplateColumns: "1fr 320px" }}>

                {/* JD list */}
                <div>
                  <p
                    className="font-mono uppercase tracking-[.08em] mb-4"
                    style={{ fontSize: "0.6875rem", color: "var(--color-on-field-2)" }}
                  >
                    Responsibilities
                  </p>
                  <ul className="space-y-3" style={{ paddingLeft: "1.1rem", listStyleType: "disc" }}>
                    {H1B_ROLE.jd.map((point, i) => (
                      <li
                        key={i}
                        className="text-body-xs"
                        style={{ color: "var(--color-on-field-2)", paddingLeft: "0.25rem" }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: requirements + sponsorship note */}
                <div className="max-[800px]:mt-8">
                  <div
                    className="rounded-[4px] p-5"
                    style={{ background: "var(--color-field)", border: "1px solid var(--color-field-hairline)" }}
                  >
                    <p
                      className="font-mono uppercase tracking-[.08em] mb-3"
                      style={{ fontSize: "0.6875rem", color: "var(--color-on-field-2)" }}
                    >
                      Requirements
                    </p>
                    <p
                      className="text-body-xs"
                      style={{ color: "var(--color-on-field-2)" }}
                      dangerouslySetInnerHTML={{ __html: H1B_ROLE.requirements }}
                    />

                    <div className="h-px my-5" style={{ background: "var(--color-field-hairline)" }} aria-hidden="true" />

                    <p
                      className="font-mono uppercase tracking-[.08em] mb-3"
                      style={{ fontSize: "0.6875rem", color: "var(--color-on-field-2)" }}
                    >
                      Location
                    </p>
                    <p
                      className="text-body-xs"
                      style={{ color: "var(--color-on-field-2)" }}
                      dangerouslySetInnerHTML={{ __html: H1B_ROLE.locations }}
                    />
                  </div>

                  <div className="mt-4 hidden max-[800px]:block">
                    <Button
                      href={`mailto:info@topsysit.com?subject=${encodeURIComponent(`Application: ${H1B_ROLE.title}`)}`}
                    >
                      Apply for this role
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW TO APPLY - surface
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

    </>
  );
}
