import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { CONTRACT_CONTACTS, OFFICES } from "@/lib/offices";

export const metadata: Metadata = {
  title: "Contract vehicles — TOPSYS IT",
  description:
    "TOPSYS IT holds Texas DIR Contract No. DIR-CPO-5671 for IT staff augmentation services (ITSAC). Request a quote or place a purchase order referencing the contract number.",
};

const SERVICES = [
  "Application development & maintenance",
  "Infrastructure support & management",
  "Information security consulting and audit",
  "BI, data warehousing & analytics",
  "Systems & application integration",
  "Network architecture, development & implementation",
  "Client/server application development",
  "Project / program management",
  "Application testing",
  "Web design & development",
  "Business analysis",
  "Quality assurance & porting",
];

const STEPS = [
  {
    ord: "01",
    title: "Request a quote",
    body: "Contact Tulika Varma by phone or email to receive a customized quote based on your requirements.",
  },
  {
    ord: "02",
    title: "Place a purchase order",
    body: "Submit your purchase order directly to TOPSYS IT and ensure it clearly references DIR Contract No. DIR-CPO-5671 for accurate processing.",
  },
  {
    ord: "03",
    title: "Order accepted",
    body: "Purchase orders are considered valid and binding once reviewed and accepted by TOPSYS IT as the awarded vendor.",
  },
];

const hq = OFFICES.find((o) => o.id === "us-hq")!;

export default function ContractVehiclesPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Contract vehicles" }]} />
          <Eyebrow className="mt-6">Contract vehicles</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "24ch",
            }}
          >
            State of Texas · Department of Information Resources
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            TOPSYS IT holds a DIR cooperative contract for IT staff augmentation services, allowing Texas state and local government entities to procure without running a full RFP process.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=public-sector">Request a quote</Button>
            <Button href="#how-to-order" variant="secondary">
              How to order
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          CONTRACT DETAILS — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "6rem 0" }}>
        <div className="wrap">
          <div className="grid grid-cols-3 gap-6 max-[767px]:grid-cols-1">
            <div className="border-t border-field-hairline pt-5">
              <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-on-field-2">
                Contract number
              </dt>
              <dd className="font-mono text-stat text-on-field mt-2" style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)" }}>
                DIR-CPO-5671
              </dd>
            </div>
            <div className="border-t border-field-hairline pt-5">
              <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-on-field-2">
                Program
              </dt>
              <dd className="text-body-sm text-on-field mt-2">
                Information Technology Staff Augmentation Contracts (ITSAC)
              </dd>
            </div>
            <div className="border-t border-field-hairline pt-5">
              <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-on-field-2">
                Pricing
              </dt>
              <dd className="text-body-sm text-on-field mt-2">
                Per DIR-CPO-5618 Appendix C, ITSAC not-to-exceed rates. Contact us for MSRP and DIR pricing.
              </dd>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SERVICES AWARDED — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Services awarded</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "30ch",
            }}
          >
            A full suite of IT staff augmentation services
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            TOPSYS IT delivers the following service offerings under the ITSAC program, tailored to diverse technology and business needs.
          </p>
          <ul className="grid grid-cols-3 gap-x-8 gap-y-3 mt-10 max-[767px]:grid-cols-1 max-[1023px]:grid-cols-2">
            {SERVICES.map((s) => (
              <li key={s} className="flex gap-3 items-start text-body-xs text-ink-2 border-t border-hairline pt-3">
                <span className="text-teal mt-[2px] flex-none font-mono" aria-hidden="true">—</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================================================
          HOW TO ORDER — surface
          ================================================================ */}
      <section id="how-to-order" className="bg-surface" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>How to order</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Requesting a quote and placing a purchase order
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-10 max-[767px]:grid-cols-1">
            {STEPS.map(({ ord, title, body }) => (
              <div key={ord} className="bg-white border border-hairline rounded-card px-7 py-7">
                <span className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.08em]">
                  {ord}
                </span>
                <h3 className="font-display font-medium text-heading-3 text-ink mt-3 mb-3">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CONTACTS — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Respondent contact information</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Quote requests and contract inquiries
          </h2>
          <div className="grid grid-cols-2 gap-6 mt-10 max-[767px]:grid-cols-1">
            {CONTRACT_CONTACTS.map(({ name, title, phone, email }) => (
              <div key={email} className="border-t border-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-ink mb-1">
                  {name}
                </h3>
                <p className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.06em] mb-3">
                  {title}
                </p>
                <p className="text-body-sm text-ink-2">
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-teal hover:underline underline-offset-4">
                    {phone}
                  </a>
                </p>
                <p className="text-body-sm text-ink-2 mt-1">
                  <a href={`mailto:${email}`} className="text-teal hover:underline underline-offset-4">
                    {email}
                  </a>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-hairline pt-8">
            <h3 className="font-mono text-mono-sm uppercase tracking-[.08em] text-ink-muted mb-2">
              Company address
            </h3>
            <p className="text-body-sm text-ink-2">{hq.address}</p>
            {hq.phone && (
              <p className="font-mono text-mono-xs text-ink-muted mt-2">{hq.phone}</p>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
