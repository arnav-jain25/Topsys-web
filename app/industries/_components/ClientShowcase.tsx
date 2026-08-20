import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type NamedEntity = { name: string; sector: string };

const END_CLIENTS: NamedEntity[] = [
  { name: "Capital One", sector: "financial services" },
  { name: "Eli Lilly", sector: "pharmaceuticals" },
  { name: "Freddie Mac", sector: "mortgage finance" },
  { name: "Morgan Stanley", sector: "financial services" },
  { name: "Wells Fargo", sector: "financial services" },
  { name: "Beyond Finance", sector: "financial services" },
  { name: "United Health Group", sector: "healthcare" },
  { name: "Blue Owl", sector: "asset management" },
  { name: "T-Mobile", sector: "telecommunications" },
];

const DELIVERY_PARTNERS = ["Cognizant", "Capgemini", "IBM", "UST Global"];

/**
 * Private client / delivery-partner showcase for the industries index.
 *
 * Two distinct groups, per CLAUDE.md: mixing end clients and primes in one
 * grid reads as subcontractor. End clients get the card treatment (name +
 * one-line sector descriptor, no fabricated engagement claims). Delivery
 * partners — firms TOPSYS works under as a subcontractor or staffing
 * partner — get the same tag-list treatment already established for the
 * MSP/workforce program list on /capabilities/technology-talent.
 */
export function ClientShowcase() {
  return (
    <section className="on-field" style={{ padding: "7rem 0" }}>
      <div className="wrap">
        <ScrollReveal>
          <Eyebrow>Who we work with</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "30ch",
            }}
          >
            Enterprise clients and delivery partners
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            We deliver directly for enterprise clients, and we deliver inside larger programs run by IT services firms who bring us in for specific technology and staffing capacity. The two are different relationships and we keep them separate.
          </p>
        </ScrollReveal>

        {/* Direct engagements */}
        <div className="mt-12">
          <ScrollReveal>
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2">
              Direct engagements
            </p>
          </ScrollReveal>
          <StaggerReveal className="grid grid-cols-3 gap-5 mt-5 max-[767px]:grid-cols-1 max-[1023px]:grid-cols-2">
            {END_CLIENTS.map(({ name, sector }) => (
              <div
                key={name}
                className="group relative overflow-hidden bg-field-raised border border-field-hairline rounded-card px-6 py-6 transition-all duration-base ease-standard hover:border-signal/35 hover:shadow-field hover:-translate-y-[3px]"
              >
                {/* Top-edge gradient sweep — one of four permitted bg-signature uses */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature scale-x-0 origin-left transition-transform duration-base ease-standard group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <h3 className="font-display font-medium text-heading-4 text-on-field">
                  {name}
                </h3>
                <p className="text-body-xs text-on-field-2 mt-1">{sector}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>

        {/* Delivery partners */}
        <div className="mt-12">
          <ScrollReveal>
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2">
              Delivery partners
            </p>
            <p className="text-body-xs text-on-field-2 max-w-[62ch] mt-2">
              Global IT services firms we deliver technology and staffing capacity through, as a subcontractor on their programs.
            </p>
          </ScrollReveal>
          <ul className="flex flex-wrap gap-3 mt-5 list-none">
            {DELIVERY_PARTNERS.map((name) => (
              <li
                key={name}
                className="font-mono text-mono-xs uppercase tracking-[.06em] text-on-field-2 bg-field border border-field-hairline rounded px-4 py-2"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
