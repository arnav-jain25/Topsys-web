import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudyList } from "./CaseStudyList";

export const metadata: Metadata = {
  title: "Work | TOPSYS IT",
  description:
    "Technology delivery case studies from TOPSYS IT. Data platforms, modernization, real-time systems, and platform engineering for enterprise and government clients.",
};

export default function WorkPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="bg-paper" style={{ padding: "6rem 0 4rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Work" }]} />
          <h1
            className="font-display font-medium text-ink mt-6"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Work that runs in production.
          </h1>
          <p className="text-lede text-ink-2 mt-5" style={{ maxWidth: "58ch" }}>
            Five programs. Three sectors. No positioning, just the architecture,
            the problem, and what we built.
          </p>
          <p className="text-body-xs text-ink-muted mt-3">
            All details shared with client permission. Some outcomes are under NDA.
          </p>
        </div>
      </section>

      {/* ================================================================
          EDITORIAL LIST — scroll-reveal, staggered columns, arrow links
          ================================================================ */}
      <CaseStudyList />

      {/* ================================================================
          FOOTER CTA ROW
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap flex gap-6 flex-wrap items-center justify-between">
          <div>
            <Eyebrow>Next steps</Eyebrow>
            <p
              className="font-display font-medium text-ink mt-3"
              style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)", letterSpacing: "-0.022em" }}
            >
              Want to discuss a program?
            </p>
            <p className="text-body-sm text-ink-2 mt-2" style={{ maxWidth: "52ch" }}>
              We&rsquo;re happy to share additional detail on any of these programs under NDA, or to
              discuss relevant experience before a formal engagement begins.
            </p>
          </div>
          <Button href="/contact">Get in touch</Button>
        </div>
      </section>

      <CTASection />
    </>
  );
}
