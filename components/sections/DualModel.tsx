"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const FDE = {
  title: "Deploy forward.",
  eyebrow: "Forward Deployed Engineer",
  body: "Neither consultant nor contractor. A TOPSYS engineer embedded at your site with commit access, architectural authority, and accountability for whether the system works in production — not whether the engagement closed.",
  items: [
    "Owns architecture decisions in the room where they happen",
    "Accountable to production outcomes, not ticket velocity",
    "Designed to end: your team runs what we leave behind",
  ],
  href: "/capabilities/forward-deployed",
};

const BUILD_SOLUTION = {
  title: "Build the solution",
  body: "SOW-based engagements where we own the deliverable: architecture, build, integration, and the second year when someone has to maintain it.",
  items: [
    "Fixed scope and milestones",
    "Architecture owned end to end",
    "Handover and enablement built in",
  ],
};

const BUILD_TEAM = {
  title: "Build the team",
  body: "Senior specialists and full pods embedded into your delivery plan, screened by engineers who do the work rather than by keyword match.",
  items: [
    "Embedded specialists",
    "Project pods",
    "Contract, contract-to-hire, direct",
  ],
};

type Phase = "hidden" | "entering" | "visible";

function revealStyle(phase: Phase, delay: number): React.CSSProperties {
  if (phase === "hidden") return { opacity: 0 };
  if (phase === "entering") {
    return {
      animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both`,
    };
  }
  return {};
}

function itemRevealStyle(phase: Phase, delay: number): React.CSSProperties {
  if (phase === "hidden") return { opacity: 0 };
  if (phase === "entering") {
    return {
      animation: `topsys-fade-in 380ms cubic-bezier(.2,0,0,1) ${delay}ms both`,
    };
  }
  return {};
}

export function DualModel() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("hidden");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setPhase("visible"); return; }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase("entering");
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => setPhase("visible"), 900);
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);
          setPhase("hidden");
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => { io.disconnect(); if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <>
    <div
      ref={ref}
      className="dual-model-grid grid grid-cols-2 gap-4 mt-12 max-[1023px]:grid-cols-1"
    >
      {/* ---- Dark card — build the solution ---- */}
      <div
        className="dual-card relative rounded-panel px-12 py-12 overflow-hidden bg-gradient-to-b from-field-raised to-field text-on-field shadow-e2 hover:-translate-y-[4px] hover:shadow-field transition-[transform,box-shadow] duration-base ease-standard before:absolute before:content-[''] before:top-[-40%] before:right-[-20%] before:w-[70%] before:h-[120%] before:bg-[radial-gradient(circle,rgba(141,198,62,.2),transparent_68%)] before:pointer-events-none"
        style={revealStyle(phase, 0)}
      >
        <h3
          className="font-display font-medium text-heading-1 mb-3"
          style={{
            background: "linear-gradient(90deg, #EAF2F1 10%, #8DC63E 50%, #EAF2F1 90%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            ...(phase === "hidden"
              ? { opacity: 0 }
              : phase === "entering"
              ? { animation: "dual-title-shimmer 4s linear infinite, dual-title-rise 560ms cubic-bezier(.2,0,0,1) 120ms both" }
              : { animation: "dual-title-shimmer 4s linear infinite" }),
          }}
        >
          {BUILD_SOLUTION.title}
        </h3>
        <p className="text-body-sm text-on-field-2 font-medium">{BUILD_SOLUTION.body}</p>
        <ul className="list-none mt-6 space-y-0">
          {BUILD_SOLUTION.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-2.5 py-[11px] border-t border-field-hairline font-mono text-mono text-on-field-2 first:border-0"
              style={itemRevealStyle(phase, 200 + i * 80)}
            >
              <span className="text-signal flex-none" aria-hidden="true">-</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ---- Light card — build the team ---- */}
      <div
        className="dual-card rounded-panel px-12 py-12 bg-white border border-hairline shadow-e1 hover:-translate-y-[4px] hover:shadow-e2 hover:border-hairline-strong transition-[transform,box-shadow,border-color] duration-base ease-standard"
        style={revealStyle(phase, 150)}
      >
        <h3
          className="font-display font-medium text-heading-1 mb-3"
          style={{
            background: "linear-gradient(90deg, #0E1A1F 10%, #0D5278 45%, #2C8A6E 55%, #0E1A1F 90%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            ...(phase === "hidden"
              ? { opacity: 0 }
              : phase === "entering"
              ? { animation: "dual-title-shimmer 4s linear infinite, dual-title-rise 560ms cubic-bezier(.2,0,0,1) 270ms both" }
              : { animation: "dual-title-shimmer 4s linear infinite" }),
          }}
        >
          {BUILD_TEAM.title}
        </h3>
        <p className="text-body-sm text-ink-2">{BUILD_TEAM.body}</p>
        <ul className="list-none mt-6 space-y-0">
          {BUILD_TEAM.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-2.5 py-[11px] border-t border-hairline font-mono text-mono text-ink-muted first:border-0"
              style={itemRevealStyle(phase, 350 + i * 80)}
            >
              <span className="text-teal flex-none" aria-hidden="true">-</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* ---- FDE card — full width, the third model, visually dominant ---- */}
    <Link
      href={FDE.href}
      className="dual-card block relative rounded-panel overflow-hidden mt-4 group"
      style={{
        background: "linear-gradient(105deg, #061C32 0%, #0D3150 42%, #113652 72%, #0A2840 100%)",
        ...revealStyle(phase, 300),
      }}
    >
      {/* Signature gradient top edge */}
      <span
        className="absolute top-0 left-0 right-0 h-[3px] bg-signature"
        aria-hidden="true"
      />
      {/* Ambient signal glow — bottom right */}
      <span
        className="absolute bottom-[-30%] right-[-5%] w-[45%] h-[200%] pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-base ease-standard"
        style={{ background: "radial-gradient(circle, rgba(141,198,62,0.18), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative px-12 py-10 grid grid-cols-[1fr_auto] gap-12 items-center max-[900px]:grid-cols-1 max-[900px]:gap-6">
        <div>
          {/* Eyebrow */}
          <p
            className="font-mono uppercase tracking-[.12em] text-signal mb-4"
            style={{ fontSize: "0.8125rem" }}
          >
            {FDE.eyebrow}
          </p>
          <h3
            className="font-display font-medium text-on-field mb-3"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              letterSpacing: "-0.025em",
              background: "linear-gradient(90deg, #EAF2F1 15%, #8DC63E 50%, #EAF2F1 85%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              ...(phase === "hidden"
                ? { opacity: 0 }
                : phase === "entering"
                ? { animation: "dual-title-shimmer 5s linear infinite, dual-title-rise 560ms cubic-bezier(.2,0,0,1) 420ms both" }
                : { animation: "dual-title-shimmer 5s linear infinite" }),
            }}
          >
            {FDE.title}
          </h3>
          <p className="text-body-sm text-on-field-2 max-w-[72ch]">{FDE.body}</p>
        </div>
        <ul className="list-none space-y-0 min-w-[260px] max-[900px]:min-w-0 max-[900px]:w-full border-l border-field-hairline pl-10 max-[900px]:border-l-0 max-[900px]:pl-0 max-[900px]:border-t max-[900px]:pt-6">
          {FDE.items.map((item, i) => (
            <li
              key={item}
              className="flex gap-2.5 py-[11px] border-t border-field-hairline font-mono text-mono text-on-field-2 first:border-0 group-hover:text-on-field transition-colors duration-fast ease-standard"
              style={itemRevealStyle(phase, 500 + i * 80)}
            >
              <span className="text-signal flex-none" aria-hidden="true">—</span>
              {item}
            </li>
          ))}
          <li
            className="flex gap-2 items-center pt-8 font-mono text-mono text-signal"
            style={itemRevealStyle(phase, 750)}
          >
            Learn about the FDE model
            <span aria-hidden="true" className="transition-transform duration-fast ease-standard group-hover:translate-x-1">→</span>
          </li>
        </ul>
      </div>
    </Link>
    </>
  );
}
