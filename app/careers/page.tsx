import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

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
  },
  {
    title: "DevOps systems engineer",
    jd: "Design system solutions and provide technical input across all aspects of a project, including design and system integration, to facilitate delivery within time and maintain customer satisfaction. Develop and automate CI/CD pipelines using Jenkins and GitLab. Develop action plans for resolving system architecture issues.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, or a related field, or an acceptable combination of education, training, and experience. Requires travel and work from various client sites throughout the USA. Hours are M&ndash;F, 9am&ndash;5pm.",
    note: "Relocation is not required. Assignments are at client sites for a limited, short-term duration, typically two weeks to three to six months, with the possibility of extension, after which staff are reassigned to a new project.",
  },
  {
    title: ".NET developer",
    jd: "Develop, create and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Develop a reusable framework for the application using the ASP.NET MVC framework. Work across the full project life cycle, from requirements gathering through analysis and UI design. Design and develop REST- and SOAP-based services consumed by web applications.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, or a related field, and one year of experience as a .NET developer or in a related IT occupation, or an acceptable combination of education, training, and experience. Requires travel and work from various client worksites throughout the USA. Hours are M&ndash;F, 9am&ndash;5pm.",
  },
  {
    title: "Business analyst",
    jd: "Work closely with the team to identify and analyze core business processes and workflows. Track and publish the status of new projects to stakeholders. Conduct business process improvement reviews and identify gaps in the current structure. Use JIRA for documentation and visualization of KPIs, burnup/burndown charts, and Kanban boards. Work with the product owner on product refinement, re-prioritizing user stories against the INVEST criteria. Manage UAT testing; develop and review QA test strategies and test plans for appropriate coverage.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
  },
  {
    title: "DevOps engineer",
    jd: "Design, develop and maintain infrastructure and application deployments across multiple environments. Configure scripts to automate build and release procedures. Develop CI/CD pipelines using tools such as Jenkins and Docker, integrated with the AWS cloud platform. Monitor, report, and troubleshoot environment failures. Perform security and quality scan analysis on infrastructure and applications. Identify and remediate network and compliance issues.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
  },
  {
    title: "Senior software developer",
    jd: "Design, develop, implement, maintain, and test business functions and web applications using a variety of languages, tools, methodologies, and technologies. Develop, create, and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Manage scrum ceremonies and facilitate scrum adherence. Contribute to end-to-end automation across testing, deployment, and ticket creation. Create business models, logical specifications, and user requirements for the application environment.",
    requirements:
      "Bachelor&rsquo;s degree in computer science, engineering, technology, management information systems/security, or a related field, and 5 years of experience designing, developing, implementing, maintaining, and testing business functions and web applications. Work location is Alpharetta, GA, with required travel to client worksites throughout the USA.",
  },
  {
    title: "Software developer / MuleSoft",
    jd: "Analyze requirements to design, document, and develop technical implementations of business requirements. Implement REST APIs that consume data from external SOAP services. Transform data into JSON and XML formats while developing REST web services. Design and develop integrations and APIs using enterprise integration patterns and frameworks with MuleSoft. Develop interfaces between Salesforce, databases, and REST/SOAP web services in Mule ESB, using connectors including Salesforce, SAP, AJAX, FTP, HTTP, File, SMTP, and SFTP. Create JDBC providers, data sources, and JAAS authentication aliases for connectivity to a backend Oracle database.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
  },
  {
    title: "Software developer",
    jd: "Design, develop, implement, maintain, and test business functions and web applications using a variety of languages, tools, methodologies, and technologies. Develop, create, and modify general computer applications software or specialized utility programs. Analyze user needs and develop software solutions. Design software or customize software for client use with the aim of optimizing operational efficiency.",
    requirements:
      "Master&rsquo;s degree or equivalent in computer science, engineering, technology, information systems/security, or a related field, and one year of experience in the offered position or a related position.",
  },
  {
    title: "DevOps engineer",
    jd: "Design, develop and maintain infrastructure and application deployments across multiple environments. Configure scripts to automate build and release procedures. Develop CI/CD pipelines using tools such as Jenkins and Docker, integrated with the AWS cloud platform. Monitor, report, and troubleshoot environment failures. Perform security and quality scan analysis on infrastructure and applications. Identify and remediate network and compliance issues.",
    requirements:
      "Master&rsquo;s degree in computer science, engineering, technology, or a related field, and one year of experience. Work location is Alpharetta, GA, which may also require travel to client locations throughout the USA.",
  },
  {
    title: "Technical project manager",
    jd: "Plan, coordinate, and oversee enterprise IT infrastructure and application projects by defining project objectives, developing schedules and milestones, coordinating resources and cross-functional activities, managing dependencies and risks, and monitoring deliverables. Manage the end-to-end execution of strategic enterprise technology initiatives, including planning, requirements coordination, implementation, testing, deployment, and post-production activities. Serve as Scrum Master for Agile delivery teams, facilitating Sprint Planning, Daily Stand-ups, Sprint Reviews, Sprint Retrospectives, backlog refinement, and other Agile ceremonies, while identifying and removing project impediments. Coordinate cloud modernization initiatives involving the migration of on-premises applications to multi-cloud environments. Coordinate business process automation initiatives with business stakeholders and technical teams to identify, evaluate, and prioritize automation opportunities. Monitor project performance against approved schedules, budgets, deliverables, and quality requirements, and develop mitigation strategies for project risks and issues.",
    requirements:
      "Bachelor&rsquo;s degree in computer science, computer information systems, information technology, or a related field, or a combination of education and experience equating to the U.S. equivalent of a bachelor&rsquo;s degree in one of the aforementioned subjects.",
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
            <Button href="mailto:hr@topsysit.com" variant="secondary">
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
          <StaggerReveal className="grid grid-cols-4 gap-6 mt-10 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
            {WHAT_WE_OFFER.map(({ title, body }) => (
              <div key={title} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================
          CURRENT OPENINGS - paper
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
              All positions run Monday through Friday, 9am to 5pm, and require travel and work from client sites throughout the United States.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 gap-4 mt-10 max-[900px]:grid-cols-1">
            {ROLES.map((role, idx) => (
              <article
                key={`${role.title}-${idx}`}
                className="group relative flex flex-col rounded-panel px-8 py-8 bg-white border border-hairline overflow-hidden hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px] transition-all duration-base ease-standard"
              >
                {/* Top-edge gradient on hover - one of the four permitted uses */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature scale-x-0 origin-left transition-transform duration-base ease-standard group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span className="font-mono text-mono-sm uppercase tracking-[.08em] text-ink-muted">
                  {String(idx + 1).padStart(2, "0")} / {String(ROLES.length).padStart(2, "0")}
                </span>
                <h3 className="font-display font-medium text-heading-3 text-ink mt-4 mb-3">
                  {role.title}
                </h3>

                <p className="font-mono text-mono-xs uppercase tracking-[.08em] text-ink-muted mb-1.5">
                  Job description
                </p>
                <p className="text-body-sm text-ink-2">{role.jd}</p>

                <p className="font-mono text-mono-xs uppercase tracking-[.08em] text-ink-muted mt-5 mb-1.5">
                  Position requirements
                </p>
                <p
                  className="text-body-xs text-ink-muted"
                  dangerouslySetInnerHTML={{ __html: role.requirements }}
                />

                {role.note && (
                  <p
                    className="text-body-xs text-ink-muted mt-3 border-t border-hairline pt-3"
                    dangerouslySetInnerHTML={{ __html: role.note }}
                  />
                )}

                <div className="mt-6">
                  <Button
                    href={`mailto:hr@topsysit.com?subject=${encodeURIComponent(
                      `Application: ${role.title}`
                    )}`}
                    variant="secondary"
                    className="!h-11"
                  >
                    Apply
                  </Button>
                </div>
              </article>
            ))}
          </StaggerReveal>
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
                  href="mailto:hr@topsysit.com"
                  className="text-teal border-b border-current pb-0.5"
                >
                  hr@topsysit.com
                </a>{" "}
                or by mail to TOPSYS IT Solutions LLC, 1740 Grassland Pkwy, Suite 301, Alpharetta, GA 30004.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="mailto:hr@topsysit.com">Email your resume</Button>
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
