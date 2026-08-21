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
      {/* Stage selector.

          Two layouts. From 700px up: one row of seven equal tracks with a single
          sliding gradient bar above them — the intended reading of the arc.
          Below 700px seven tracks leave ~40px each and every label is clipped, so
          the stages stack two-up and the sliding bar is replaced by a per-item
          tick. Same gradient, same one permitted use, just not slidable when the
          items no longer sit in one line.

          minmax(0, 1fr) rather than 1fr on the wide layout: a bare `1fr` track
          carries an implicit `min-width: auto`, so the longest label forced the
          row wider than the viewport and made the document scroll sideways. */}
      <div className="grid relative mt-16 grid-cols-2 min-[700px]:grid-cols-[repeat(7,minmax(0,1fr))] min-[700px]:before:absolute min-[700px]:before:top-0 min-[700px]:before:left-0 min-[700px]:before:right-0 min-[700px]:before:h-px min-[700px]:before:bg-field-hairline">
        {/* Gradient progress indicator — one of the four permitted uses */}
        <span
          className="hidden min-[700px]:block absolute top-[-1px] h-[3px] bg-signature rounded-sm transition-all duration-base ease-standard"
          style={{ width: `${100 / STAGES.length}%`, left: `${pct}%` }}
          aria-hidden="true"
        />
        {STAGES.map(({ label }, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`relative pt-6 pb-2 px-2.5 text-left font-mono text-mono-sm tracking-[.05em] transition-colors duration-fast ease-standard border-t border-field-hairline min-[700px]:border-t-0 min-[700px]:pb-0 ${active === i ? "text-signal" : "text-on-field-2 hover:text-signal"}`}
            aria-pressed={active === i}
          >
            {/* Stacked-layout tick: the sliding bar above cannot track items that
                are no longer in a single row. */}
            {active === i && (
              <span
                className="min-[700px]:hidden absolute top-[-1px] left-0 right-0 h-[3px] bg-signature rounded-sm"
                aria-hidden="true"
              />
            )}
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
