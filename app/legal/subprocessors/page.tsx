import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Subprocessors — TOPSYS IT",
  description:
    "Third-party service providers used by TOPSYS IT Solutions LLC in connection with its services and website.",
};

export default function SubprocessorsPage() {
  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="wrap">
        <Breadcrumb
          items={[{ label: "Legal" }, { label: "Subprocessors" }]}
        />
        <Eyebrow className="mt-6">Legal</Eyebrow>
        <h1
          className="font-display font-medium text-ink mt-4"
          style={{
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Subprocessors
        </h1>
        <div className="mt-8 max-w-[70ch] space-y-6 text-body text-ink-2">
          <p>
            TOPSYS IT Solutions LLC uses a limited number of third-party service
            providers — subprocessors — in connection with delivering its
            services and operating this website.
          </p>
          <p>
            A complete list of subprocessors, including their country of
            operation and the nature of the processing they perform, is being
            finalized and will be published here. We review subprocessor
            relationships regularly and apply appropriate contractual safeguards.
          </p>
          <p>
            For questions about data handling or subprocessors in connection
            with a specific engagement, please contact us directly using the
            address below.
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
