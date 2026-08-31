import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { FDETable } from "@/components/sections/FDETable";

export const metadata: Metadata = {
  title: "Forward Deployed Engineer",
  description:
    "Neither consultant nor contractor. A TOPSYS Forward Deployed Engineer owns architecture decisions at your site, in your environment, accountable to whether the system works in production.",
};

/* ---- What the FDE is not (column 1) vs what they are (column 2) ---- */
const CONTRASTS = [
  {
    not: "Delivers a report and steps back",
    is: "Ships code and explains every decision",
  },
  {
    not: "Accountable to the statement of work",
    is: "Accountable to production outcomes",
  },
  {
    not: "Defers architectural authority to your team",
    is: "Exercises it. Documents every trade-off.",
  },
  {
    not: "Engagement ends when the contract does",
    is: "Engagement ends when your team owns it",
  },
];

/* ---- When to deploy an FDE ---- */
const WHEN = [
  {
    signal: "You can't write the requirements yet",
    detail:
      "AI systems, novel integrations, greenfield platforms — the design emerges from contact with real data and real constraints. A consultant documents what you tell them. An FDE figures it out in the environment where it has to run.",
  },
  {
    signal: "The stakes are too high for ticket-queue accountability",
    detail:
      "If the system fails, it's a hospital workflow, a payment processor, a government service. You need someone whose name is on the architecture, not the sprint board.",
  },
  {
    signal: "Your team needs to own it when we leave",
    detail:
      "Every FDE engagement is designed to end. The engineer documents their decisions, pairs with your engineers, and structures the handover from week one. They're not building job security — they're building transfer.",
  },
  {
    signal: "You've had bad experiences with embedded staff",
    detail:
      "The standard embedded contractor does what they're assigned. An FDE tells you when you're assigning the wrong thing — before you've wasted a sprint on it.",
  },
];

/* ---- How we run it ---- */
const HOW = [
  {
    ord: "01",
    phase: "Intake — two days",
    body: "The FDE reviews your codebase, your architecture, your failure history. They're not gathering requirements. They're calibrating to the system they're about to work on.",
  },
  {
    ord: "02",
    phase: "Embed — week one",
    body: "Commit access from day one. Attending the standup, the architecture meeting, the on-call rotation if relevant. Not as an observer. As an engineer with authority.",
  },
  {
    ord: "03",
    phase: "Build — ongoing",
    body: "Ships code, makes architecture calls, flags risks to engineering leadership directly. Maintains a decision log — every significant call, the options considered, the reasoning.",
  },
  {
    ord: "04",
    phase: "Transfer — designed from the start",
    body: "Runbooks, architecture documentation, and paired sessions with your engineers. The engagement ends when your team can operate and extend what was built — not when the budget runs out.",
  },
];

/* ---- Which capabilities it spans ---- */
const SPANS = [
  { label: "AI & data",                       href: "/capabilities/ai-and-data",                       note: "Agentic systems, data pipelines, ML in production" },
  { label: "Applications & modernization",    href: "/capabilities/applications-and-modernization",    note: "Legacy re-platform, API layer, incremental migration" },
  { label: "Cloud & platform engineering",    href: "/capabilities/cloud-and-platform-engineering",    note: "Infrastructure ownership, DevSecOps, platform teams" },
  { label: "Cybersecurity",                   href: "/capabilities/cybersecurity",                     note: "Security engineering embedded in delivery" },
  { label: "Technology talent",               href: "/capabilities/technology-talent",                 note: "When you need the FDE to become a permanent hire" },
];

export default function ForwardDeployedPage() {
  return (
    <>
      {/* ================================================================
          HERO — inverted, because this is a proof section not an explain
          ================================================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(120deg, #061C32 0%, #0D3150 50%, #0B2742 100%)",
          padding: "7rem 0 6rem",
        }}
      >
        {/* Signal glow */}
        <span
          className="absolute top-[-20%] right-[-8%] w-[52%] h-[140%] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(141,198,62,0.16), transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="wrap relative z-[1]">
          <div className="[&_ol]:text-on-field-2 [&_a]:text-on-field-2 [&_a:hover]:text-signal [&_span[aria-current]]:text-on-field [&_.text-hairline-strong]:text-field-hairline">
            <Breadcrumb
              items={[
                { label: "Services", href: "/capabilities" },
                { label: "Forward Deployed Engineer" },
              ]}
            />
          </div>
          <p
            className="font-mono uppercase tracking-[.12em] text-signal mt-8 mb-4"
            style={{ fontSize: "0.8125rem" }}
          >
            Forward Deployed Engineer · FDE
          </p>
          <h1
            className="font-display font-medium text-on-field"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.035em",
              maxWidth: "16ch",
            }}
          >
            The engineer who owns the outcome.
          </h1>
          <p className="text-lede text-on-field-2 max-w-[58ch] mt-6">
            Not a consultant who scopes and hands off. Not a contractor who closes tickets. A TOPSYS engineer embedded in your environment, with commit access, architectural authority, and accountability to whether the system works in production — not whether the engagement closed.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=fde">Tell us what you're trying to build</Button>
            <Button href="#how" variant="secondary" className="!border-field-hairline !text-on-field hover:!border-signal hover:!text-signal">
              How it works
            </Button>
          </div>

          {/* The provocation */}
          <blockquote
            className="mt-14 pt-10 border-t border-field-hairline max-w-[58ch]"
            cite="#"
          >
            <p
              className="font-display font-medium text-on-field"
              style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", letterSpacing: "-0.02em", lineHeight: 1.35 }}
            >
              "You can't write a requirements document for an AI system. You find out what it does when it touches your data."
            </p>
            <footer className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mt-4">
              That is the problem our FDE model was built for
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ================================================================
          WHAT THEY'RE NOT / WHAT THEY ARE — paper, two-column contrast
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>The distinction</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
              letterSpacing: "-0.028em",
              maxWidth: "24ch",
            }}
          >
            What separates an FDE from everyone else you've hired.
          </h2>

          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr] gap-6 mt-10 max-[639px]:grid-cols-1">
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted pb-3 border-b border-hairline">
              Standard engagement model
            </p>
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-teal pb-3 border-b border-teal/30 max-[639px]:border-signal/30 max-[639px]:text-signal">
              Forward Deployed Engineer
            </p>
          </div>

          <StaggerReveal className="mt-0" itemDelay={80}>
            {CONTRASTS.map(({ not, is }, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr] gap-6 border-b border-hairline py-5 max-[639px]:grid-cols-1 max-[639px]:gap-2">
                <p className="text-body-sm text-ink-muted line-through decoration-hairline-strong">
                  {not}
                </p>
                <p className="text-body-sm text-ink font-medium">
                  {is}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          COMPARISON TABLE — inverted (FDETable carries its own section wrapper)
          ================================================================ */}
      <FDETable exitHref="/contact?re=fde" exitLabel="start a conversation →" />

      {/* ================================================================
          WHEN TO DEPLOY — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>When it fits</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
              letterSpacing: "-0.028em",
            }}
          >
            Four signals that our FDE model is the right call for you.
          </h2>
          <StaggerReveal
            className="grid grid-cols-2 gap-5 mt-10 max-[767px]:grid-cols-1"
            itemDelay={80}
          >
            {WHEN.map(({ signal, detail }) => (
              <div
                key={signal}
                className="bg-white border border-hairline rounded-card px-7 py-7 relative overflow-hidden group hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px] transition-all duration-base ease-standard"
              >
                {/* Gradient top edge on hover */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-base ease-standard"
                  aria-hidden="true"
                />
                <p className="font-display font-medium text-heading-3 text-ink mb-3 leading-snug">
                  {signal}
                </p>
                <p className="text-body-xs text-ink-2">{detail}</p>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          HOW IT RUNS — inverted
          ================================================================ */}
      <section id="how" className="on-field" style={{ padding: "7rem 0", scrollMarginTop: "100px" }}>
        <ScrollReveal className="wrap">
          <Eyebrow dark>How we run it</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
              letterSpacing: "-0.028em",
            }}
          >
            From intake to independent operation.
          </h2>
          <StaggerReveal
            className="grid grid-cols-4 gap-5 mt-12 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1"
            itemDelay={100}
          >
            {HOW.map(({ ord, phase, body }) => (
              <div key={ord} className="border-t-2 border-signal pt-5">
                <span className="font-mono text-mono-xs text-signal uppercase tracking-[.1em]">
                  {ord}
                </span>
                <h3 className="font-display font-medium text-heading-4 text-on-field mt-2 mb-3">
                  {phase}
                </h3>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          WHERE IT SPANS — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Scope</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
              letterSpacing: "-0.028em",
            }}
          >
            The FDE model spans every TOPSYS service area.
          </h2>
          <p className="text-body text-ink-2 max-w-[60ch] mt-4">
            Because forward deployment is an accountability model, not a technology specialty. An FDE can be deployed against any program we run.
          </p>
          <StaggerReveal className="mt-10 space-y-0" itemDelay={60}>
            {SPANS.map(({ label, href, note }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between py-5 border-t border-hairline group hover:border-teal/40 transition-colors duration-fast ease-standard max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-1"
              >
                <span className="font-display font-medium text-heading-3 text-ink group-hover:text-teal transition-colors duration-fast ease-standard">
                  {label}
                </span>
                <span className="text-body-xs text-ink-muted max-w-[40ch] text-right max-[639px]:text-left">
                  {note}
                </span>
              </Link>
            ))}
            <div className="border-t border-hairline" />
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          EXIT — the line that beats the lock-in objection
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "6rem 0" }}>
        <ScrollReveal className="wrap">
          <div className="grid grid-cols-[1fr_auto] gap-10 items-center max-[767px]:grid-cols-1">
            <div>
              <p
                className="font-display font-medium text-ink"
                style={{ fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)", letterSpacing: "-0.02em", maxWidth: "34ch", lineHeight: 1.3 }}
              >
                The engagement is designed to end. Your team runs what we leave behind.
              </p>
              <p className="text-body-sm text-ink-2 mt-3 max-w-[56ch]">
                Transfer is not an afterthought. It's the metric. An FDE engagement isn't complete until the runbooks are written, the decision log is handed over, and your engineers have paired on every system they'll own.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="/contact?re=fde">Start a conversation</Button>
              <Button href="/work" variant="secondary">See case studies</Button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
