"use client";

import { useState } from "react";

const STAGES = [
  {
    label: "Strategy",
    detail:
      "Where AI is worth doing at all, mapped against the cost of the work today, the data you actually hold and the risk you can carry.",
  },
  {
    label: "Use case",
    detail:
      "A specific workflow, a defined user, and a measurable outcome. Not a general capability but a contained problem the model is genuinely suited to.",
  },
  {
    label: "Data",
    detail:
      "Lineage, ownership, quality gates and contractual commitments between producers and consumers. The work most organizations skip and then can't explain.",
  },
  {
    label: "Build",
    detail:
      "Prompt engineering, fine-tuning, retrieval, orchestration: whatever the use case demands, not the architecture the team already knows.",
  },
  {
    label: "Integrate",
    detail:
      "Wired into the system of record, not sitting alongside it. The handoff is the product. The model alone is not.",
  },
  {
    label: "Govern",
    detail:
      "Scoped permissions, a replayable action log, human checkpoints on irreversible steps. What turns a pilot into something a risk committee will approve.",
  },
  {
    label: "Scale",
    detail:
      "Latency budgets, cost per inference, observability and the failure mode nobody wrote a runbook for. Production is where AI programs either compound or collapse.",
  },
];

export function AIArc() {
  const [active, setActive] = useState(0);
  const pct = active * (100 / STAGES.length);

  return (
    <div>
      {/* Stage selector */}
      <div
        className="grid relative mt-16 before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-field-hairline"
        style={{ gridTemplateColumns: `repeat(${STAGES.length}, 1fr)` }}
      >
        {/* Gradient progress indicator — one of the four permitted uses */}
        <span
          className="absolute top-[-1px] left-0 h-[3px] bg-signature rounded-sm transition-all duration-base ease-standard"
          style={{ width: `${100 / STAGES.length}%`, left: `${pct}%` }}
          aria-hidden="true"
        />
        {STAGES.map(({ label }, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`pt-6 px-2.5 text-left font-mono text-mono-sm tracking-[.05em] transition-colors duration-fast ease-standard ${active === i ? "text-signal" : "text-on-field-2 hover:text-signal"}`}
            aria-pressed={active === i}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Detail copy */}
      <p className="mt-6 min-h-16 text-body text-on-field-2 max-w-[70ch]">
        <b className="text-on-field font-display font-medium">
          {STAGES[active].label}.
        </b>{" "}
        {STAGES[active].detail}
      </p>
    </div>
  );
}
