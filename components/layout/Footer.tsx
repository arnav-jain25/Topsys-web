import Image from "next/image";
import Link from "next/link";
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
  { label: "Case studies", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const connect = [
  { label: "Contact", href: "/contact" },
  { label: "Contract vehicles", href: "/contract-vehicles" },
  { label: "LinkedIn", href: "https://linkedin.com/company/topsys-it" },
];

const legal = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Security overview", href: "/legal/security" },
  { label: "Subprocessors", href: "/legal/subprocessors" },
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
    <footer className="bg-field-deep text-on-field pt-24 pb-6">
      <div className="wrap">
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
          </div>

          <FooterCol heading="Services" links={caps} />
          <FooterCol heading="Sectors" links={sectors} />
          <FooterCol heading="Company" links={company} />
          <FooterCol heading="Connect" links={connect} />
        </div>

        <div className="mt-16 pt-8 border-t border-field-hairline grid grid-cols-4 gap-6 max-[1023px]:grid-cols-2">
          {OFFICES.map(({ id, label, address, mapsUrl }) => (
            <div key={id}>
              <h5 className="font-mono text-mono-xs uppercase tracking-[.08em] text-signal mb-1.5">
                {label}
              </h5>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-on-field-2 hover:text-on-field transition-colors duration-fast ease-standard"
              >
                {address}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-5 border-t border-field-hairline flex justify-between gap-6 flex-wrap text-caption text-on-field-2 max-[600px]:flex-col">
          <div>
            © 2026 TOPSYS IT Solutions LLC · United States · Canada · India
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
