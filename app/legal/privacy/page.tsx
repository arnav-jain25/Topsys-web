import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How TOPSYS IT Solutions LLC collects and uses information from visitors to this website.",
};

export default function PrivacyPage() {
  return (
    <section style={{ padding: "6rem 0 8rem" }}>
      <div className="wrap">
        <Breadcrumb items={[{ label: "Legal" }, { label: "Privacy policy" }]} />
        <Eyebrow className="mt-6">Legal</Eyebrow>
        <h1
          className="font-display font-medium text-ink mt-4"
          style={{
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Privacy policy
        </h1>
        <div className="mt-8 max-w-[70ch] space-y-6 text-body text-ink-2">
          <p>
            TOPSYS IT Solutions LLC respects the privacy of visitors to this
            website. This page describes how we collect and use information when
            you visit topsysit.com.
          </p>
          <p>
            We collect information submitted through contact forms and standard
            web analytics data such as page views and referral sources. We do
            not sell personal data to third parties. We do not use third-party
            advertising trackers on this site.
          </p>

          <p className="text-body-sm text-ink-muted border-t border-hairline pt-6">
            Contact{" "}
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
