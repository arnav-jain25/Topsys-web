import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { CASE_STUDIES } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work — TOPSYS IT",
  description:
    "Technology delivery case studies from TOPSYS IT. Data platforms, modernization, real-time systems, and platform engineering for enterprise and government clients.",
};

const ORDINALS = ["01", "02", "03", "04", "05"];
const BG_ALTERNATES = [
  "bg-paper",
  "bg-surface",
  "bg-paper",
  "bg-surface",
  "bg-paper",
];

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
            Five programs. Three sectors. No positioning — just the architecture,
            the problem, and what we built.
          </p>
          <p className="text-body-xs text-ink-muted mt-3">
            All details shared with client permission. Some outcomes are under NDA.
          </p>
        </div>
      </section>

      {/* ================================================================
          EDITORIAL LIST
          ================================================================ */}
      {CASE_STUDIES.map((cs, i) => (
        <section
          key={cs.slug}
          className={`${BG_ALTERNATES[i]} relative overflow-hidden`}
          style={{ padding: "5rem 0" }}
        >
          {/* Faint ordinal background number */}
          <span
            aria-hidden="true"
            className="absolute select-none pointer-events-none font-mono font-medium text-sunken"
            style={{
              fontSize: "clamp(6rem, 18vw, 14rem)",
              lineHeight: 1,
              top: "50%",
              right: "2rem",
              transform: "translateY(-50%)",
              opacity: 0.6,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            {ORDINALS[i]}
          </span>

          <div className="wrap relative">
            {/* Separator above all but the first entry */}
            {i > 0 && (
              <div
                className="border-t border-hairline absolute inset-x-0"
                style={{ top: "-5rem" }}
                aria-hidden="true"
              />
            )}

            {/* Two-column layout */}
            <div
              className="grid gap-10"
              style={{
                gridTemplateColumns: "2fr 3fr",
                alignItems: "start",
              }}
            >
              {/* Left: metadata column */}
              <div className="max-[767px]:contents">
                <p
                  className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted"
                  style={{ marginBottom: "1.25rem" }}
                >
                  {cs.tag}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {cs.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-mono-xs uppercase tracking-[.07em] text-ink-muted border border-hairline rounded-control px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                  {cs.tech.length > 4 && (
                    <span className="font-mono text-mono-xs text-ink-muted px-1">
                      +{cs.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Metric */}
                {cs.metric && (
                  <p
                    className="font-mono text-ink font-medium mb-5"
                    style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
                  >
                    {cs.metric}
                  </p>
                )}

                <TextLink href={`/work/${cs.slug}`}>Read case</TextLink>
              </div>

              {/* Right: title + lede */}
              <div>
                {/* Capabilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="font-mono text-mono-xs uppercase tracking-[.07em] text-teal border border-teal-tint rounded-control px-2 py-0.5"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <h2
                  className="font-display font-medium text-ink"
                  style={{
                    fontSize: "clamp(1.375rem, 2.6vw, 2rem)",
                    lineHeight: 1.14,
                    letterSpacing: "-0.022em",
                    maxWidth: "28ch",
                    marginBottom: "1rem",
                  }}
                >
                  {cs.title}
                </h2>

                <p className="text-body-sm text-ink-2" style={{ maxWidth: "54ch" }}>
                  {cs.lede}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom hairline separator */}
          {i < CASE_STUDIES.length - 1 && (
            <div
              className="wrap"
              aria-hidden="true"
            >
              <div className="border-b border-hairline mt-12" />
            </div>
          )}
        </section>
      ))}

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
