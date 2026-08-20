import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms of use | TOPSYS IT",
  description:
    "Terms governing use of the TOPSYS IT Solutions LLC website.",
};

export default function TermsPage() {
  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="wrap">
        <Breadcrumb items={[{ label: "Legal" }, { label: "Terms of use" }]} />
        <Eyebrow className="mt-6">Legal</Eyebrow>
        <h1
          className="font-display font-medium text-ink mt-4"
          style={{
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Terms of use
        </h1>
        <div className="mt-8 max-w-[70ch] space-y-6 text-body text-ink-2">
          <p>
            This website is operated by TOPSYS IT Solutions LLC. By accessing
            or using this site, you agree to be bound by these terms. If you do
            not agree, please do not use the site.
          </p>
          <p>
            Content on this site is provided for informational purposes only.
            No representations are made regarding the completeness or accuracy
            of any information for any specific purpose. TOPSYS IT Solutions LLC
            reserves the right to modify, update, or remove content from this
            site at any time without prior notice.
          </p>
          <p>
            All content on this site is the property of TOPSYS IT Solutions LLC
            unless otherwise noted. Unauthorized reproduction or redistribution
            is prohibited.
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
