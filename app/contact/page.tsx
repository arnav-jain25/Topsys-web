import type { Metadata } from "next";
import { Suspense } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ContactForm } from "@/components/sections/ContactForm";
import { OFFICES } from "@/lib/offices";
import { ContactOfficeGrid } from "./ContactOfficeGrid";

export const metadata: Metadata = {
  title: "Contact — TOPSYS IT",
  description:
    "Enterprise engagement, public sector briefing, talent requirement, or careers. Tell us which one applies and we'll route it to the right team.",
};

export default function ContactPage() {
  return (
    <>
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <Eyebrow className="mt-6">Contact</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Tell us which one applies.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            An enterprise program, a state or local government briefing, a role you need to staff, or a role you&rsquo;re looking for. Pick one — the form and the team behind it change accordingly.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "7rem" }}>
        <div className="wrap">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* ================================================================
          OFFICE ADDRESSES — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "6rem 0" }}>
        <div className="wrap">
          <Eyebrow>Offices</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
              letterSpacing: "-0.022em",
            }}
          >
            Where to find us
          </h2>
          <ContactOfficeGrid offices={OFFICES} />
        </div>
      </section>
    </>
  );
}
