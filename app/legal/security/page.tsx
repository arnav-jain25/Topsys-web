import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Security overview",
  description:
    "How TOPSYS IT Solutions LLC approaches security for this website and client engagements.",
};

export default function SecurityPage() {
  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="wrap">
        <Breadcrumb
          items={[{ label: "Legal" }, { label: "Security overview" }]}
        />
        <Eyebrow className="mt-6">Legal</Eyebrow>
        <h1
          className="font-display font-medium text-ink mt-4"
          style={{
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Security overview
        </h1>
        <div className="mt-8 max-w-[70ch] space-y-6 text-body text-ink-2">
          <p>
            TOPSYS IT Solutions LLC takes the security of client data and
            systems seriously. This page provides a summary of the measures in
            place for this website and, at a high level, our delivery practice.
          </p>
          <p>
            This website is served exclusively over HTTPS. Contact form
            submissions are encrypted in transit. We do not store payment
            information on this site.
          </p>
          <p>
            To report a security concern or vulnerability, contact us directly
            at the address below. We will acknowledge security reports within 48
            business hours and work to address confirmed issues promptly.
          </p>

          <p className="text-body-sm text-ink-muted border-t border-hairline pt-6">
            This document is being finalized. Contact{" "}
            <a
              href="mailto:contact@topsysit.com"
              className="text-teal hover:underline underline-offset-4"
            >
              contact@topsysit.com
            </a>{" "}
            for questions.
          </p>
        </div>
      </div>
    </section>
  );
}
