import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { OFFICES } from "@/lib/offices";

const caps = [
  { label: "AI & data", href: "/capabilities/ai-and-data" },
  { label: "Applications & modernization", href: "/capabilities/applications-and-modernization" },
  { label: "Cloud & platform", href: "/capabilities/cloud-and-platform-engineering" },
  { label: "Cybersecurity", href: "/capabilities/cybersecurity" },
  { label: "Technology talent", href: "/capabilities/technology-talent" },
];

const sectors = [
  { label: "Public sector", href: "/public-sector" },
  { label: "Financial services", href: "/industries/financial-services" },
  { label: "Telecommunications", href: "/industries/telecommunications" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Technology", href: "/industries/technology" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "How we work", href: "/approach" },
  { label: "Case studies", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const connect = [
  { label: "Contact", href: "/contact" },
  { label: "DIR Contract", href: "/contract-vehicles" },
];

const legal = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Security overview", href: "/legal/security" },
];

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-mono-sm font-medium uppercase tracking-[.1em] text-signal mb-4">
        {heading}
      </h4>
      <ul className="space-y-2.5 list-none">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-body-xs text-on-field-2 hover:text-signal transition-colors duration-fast ease-standard"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-field-deep text-on-field pb-6"
      style={{
        backgroundImage:
          "radial-gradient(60% 45% at 14% 8%, rgba(141,198,62,0.14), transparent 100%)",
      }}
    >
      {/* Tell us what you're trying to build — the footer's own opening line,
          not a separate section, so the glow above reads as one field rather
          than stopping at a seam. */}
      <div className="wrap relative py-16 max-[640px]:py-12">
        <h2
          className="font-display font-medium text-on-field mb-4"
          style={{
            fontSize: "clamp(1.75rem, 3.6vw, 2.75rem)",
            letterSpacing: "-0.03em",
            maxWidth: "20ch",
          }}
        >
          Tell us what you&apos;re trying to build.
        </h2>
        <p className="text-lede text-on-field-2 mb-8 max-w-[60ch]">
          A modernization program, an AI use case, a system that keeps breaking, or a team you can&apos;t hire fast enough. We&apos;ll put the right people on the call, not a salesperson.
        </p>
        <Button href="/contact" variant="primary">
          Talk to us
        </Button>
      </div>

      <div className="wrap relative pt-10 max-[640px]:pt-8">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-6 max-[1023px]:grid-cols-2">
          {/* Brand column */}
          <div>
            <div className="inline-block bg-white rounded-card px-4 py-3 mb-4">
              <Image
                src="/brand/topsys-logo.png"
                alt="TOPSYS IT"
                width={120}
                height={26}
                className="h-[26px] w-auto"
              />
            </div>
            <p className="text-body-xs text-on-field-2 max-w-[34ch]">
              Technology delivery for complex environments.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href="https://www.linkedin.com/company/topsysitsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TOPSYS IT on LinkedIn"
                className="w-9 h-9 rounded-full border border-field-hairline flex items-center justify-center text-on-field-2 hover:border-signal hover:text-signal transition-colors duration-fast ease-standard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/TopsysIT"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TOPSYS IT on Facebook"
                className="w-9 h-9 rounded-full border border-field-hairline flex items-center justify-center text-on-field-2 hover:border-signal hover:text-signal transition-colors duration-fast ease-standard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <FooterCol heading="Services" links={caps} />
          <FooterCol heading="Industries" links={sectors} />
          <FooterCol heading="Company" links={company} />
          <FooterCol heading="Connect" links={connect} />
        </div>

        <div className="mt-10 pt-6 border-t border-field-hairline flex flex-wrap gap-x-8 gap-y-2.5">
          {OFFICES.map(({ id, city, mapsUrl }) => (
            <a
              key={id}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-on-field-2 hover:text-signal transition-colors duration-fast ease-standard"
            >
              {city}
            </a>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-field-hairline flex justify-between gap-6 flex-wrap text-caption text-on-field-2 max-[600px]:flex-col">
          <div>
            © 2026 TOPSYS IT Solutions LLC · United States · Canada · India · Singapore
          </div>
          <div className="flex gap-4 flex-wrap">
            {legal.map(({ label, href }, i) => (
              <span key={href} className="flex items-center gap-4">
                <Link
                  href={href}
                  className="text-on-field-2 hover:text-signal transition-colors duration-fast ease-standard"
                >
                  {label}
                </Link>
                {i < legal.length - 1 && (
                  <span aria-hidden="true" className="text-on-field-2 opacity-30">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
