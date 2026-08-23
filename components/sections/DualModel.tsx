"use client";

import { useEffect, useRef, useState } from "react";

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
    <div
      ref={ref}
      className="dual-model-grid grid grid-cols-2 gap-4 mt-12 max-[1023px]:grid-cols-1"
    >
      {/* ---- Dark card — build the solution ---- */}
      <div
        className="dual-card relative rounded-panel px-12 py-12 overflow-hidden bg-gradient-to-b from-field to-field-deep text-on-field shadow-e2 hover:-translate-y-[4px] hover:shadow-field transition-[transform,box-shadow] duration-base ease-standard before:absolute before:content-[''] before:top-[-40%] before:right-[-20%] before:w-[70%] before:h-[120%] before:bg-[radial-gradient(circle,rgba(141,198,62,.16),transparent_68%)] before:pointer-events-none"
        style={revealStyle(phase, 0)}
      >
        <h3 className="font-display font-medium text-heading-1 text-on-field mb-3">
          {BUILD_SOLUTION.title}
        </h3>
        <p className="text-body-sm text-on-field-2">{BUILD_SOLUTION.body}</p>
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
        <h3 className="font-display font-medium text-heading-1 text-ink mb-3">
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
  );
}
