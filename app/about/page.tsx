import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentToken } from "@/components/ui/ContentToken";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { OFFICES } from "@/lib/offices";
import {
  AboutValuesGrid,
  AboutCredentialsGrid,
  AboutOfficesGrid,
} from "./AboutSections";

export const metadata: Metadata = {
  title: "About | TOPSYS IT",
  description:
    "TOPSYS IT Solutions LLC is a minority-owned technology delivery firm with offices across the United States, Canada, and India. Founded by Abhishek Reddy Baddam.",
};

const CREDENTIALS = [
  { label: "Minority Business Enterprise (MBE)", value: "Certified" },
  { label: "SAM.gov registration", value: "UEI & CAGE code on file" },
  { label: "D&B registration", value: "Registered" },
  { label: "Years in operation", value: "20+" },
  { label: "Countries of operation", value: "3" },
  { label: "States served", value: "30+" },
];

const VALUES = [
  "We build for the second engineer, not just the first.",
  "Accountability ends when the client does. Not when the contract does.",
  "We say what's not possible as clearly as we say what is.",
];

export default function AboutPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "About" }]} />
          <Eyebrow className="mt-6">About</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "24ch",
            }}
          >
            Technology delivery for complex environments.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            TOPSYS IT Solutions LLC is a minority-owned technology firm that builds and runs critical systems for enterprise and government clients. We&rsquo;ve been doing this for over twenty years across three countries.
          </p>
        </div>
      </section>

      {/* ================================================================
          MISSION — three lines maximum
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <AboutValuesGrid values={VALUES} />
        </div>
      </section>

      {/* ================================================================
          FOUNDER — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Leadership</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Founder
          </h2>

          <div className="grid grid-cols-[280px_1fr] gap-12 mt-10 items-start max-[767px]:grid-cols-1">
            {/* Photo placeholder */}
            <div>
              <div
                className="w-full aspect-[3/4] bg-surface rounded-card border border-hairline flex items-center justify-center"
                aria-label="Photo of Abhishek Reddy Baddam, pending"
              >
                <ContentToken id="BIO-01">
                  <span className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.08em]">
                    Photo pending
                  </span>
                </ContentToken>
              </div>
            </div>

            <div>
              <h3 className="font-display font-medium text-heading-2 text-ink">
                Abhishek Reddy Baddam
              </h3>
              <p className="font-mono text-mono-sm text-ink-muted uppercase tracking-[.06em] mt-1">
                Founder & CEO
              </p>
              <div className="mt-6 space-y-4 text-body text-ink-2 max-w-[62ch]">
                <p>
                  Abhishek founded TOPSYS IT with a specific conviction: that the gap between enterprise technology strategy and execution is mostly an engineering problem, and that the people who close it are senior practitioners, not project managers with a managed service.
                </p>
                <p>
                  With over 25 years of technology delivery experience and an M.S. in Computer Science from CUNY, he has led programs across financial services, telecommunications, healthcare, and state government, building teams and systems that run in production, not in decks.
                </p>
                <p>
                  TOPSYS IT is minority-owned and MBE certified. The firm operates across the United States, Canada, and India, with regional presence in the UAE, and delivery teams embedded in enterprise and government programs nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CREDENTIALS — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Credentials</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Certifications and registrations
          </h2>

          <AboutCredentialsGrid credentials={CREDENTIALS} />

          <div className="mt-12 border-t border-field-hairline pt-8">
            <p className="text-body-xs text-on-field-2 max-w-[60ch]">
              MBE certification qualifies TOPSYS IT for supplier diversity mandates in enterprise procurement programs and preference requirements in state government contracting.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          OFFICES — paper, world map + addresses
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Locations</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Where we operate
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            Three countries, four offices, with regional presence in the UAE. Delivery teams work across time zones to stay embedded with client teams wherever they sit.
          </p>

          <AboutOfficesGrid offices={OFFICES} />
        </div>
      </section>

      {/* ================================================================
          CROSS-LINKS
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap">
            <Button href="/careers">View open roles</Button>
            <Button href="/contact" variant="secondary">Get in touch</Button>
            <Button href="/work" variant="secondary">See our work</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
