"use client";

import { useState } from "react";

const PANELS = [
  {
    label: "Practitioners stay on the work",
    n: "01",
    title: "Practitioners stay on the work",
    body: "The engineers and architects who scope your program are the ones who deliver it. No senior pitch team, no junior delivery team. The person who drew your architecture is in your standup six months later.",
  },
  {
    label: "We work in your environment",
    n: "02",
    title: "We work in your environment",
    body: "We embed inside your tooling, your repositories, your ticketing system. When the engagement ends the knowledge stays inside your organization, not in our documentation.",
  },
  {
    label: "You can start small",
    n: "03",
    title: "You can start small",
    body: "A single embedded specialist, a time-limited assessment, a discrete use case with a defined exit criterion. Many clients who started with a 90-day scoping engagement are now multi-year programs.",
  },
  {
    label: "Built for enterprise procurement",
    n: "04",
    title: "Built for enterprise procurement",
    body: "MBE certified, SAM.gov registered, DIR-contracted, and experienced with MSP/VMS programs, supplier diversity requirements and the procurement timelines that come with regulated environments.",
  },
];

const CREDENTIALS = [
  { label: "MBE certified", highlight: true },
  { label: "SAM.gov UEI / CAGE" },
  { label: "D&B registered" },
  { label: "AWS Partner" },
  { label: "Microsoft Azure" },
  { label: "Salesforce" },
  { label: "Oracle OPN" },
  { label: "UiPath" },
];

export function HowWeWork() {
  const [active, setActive] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);
  const panel = PANELS[active];

  const handleSelect = (i: number) => {
    if (i === active) return;
    setPanelVisible(false);
    setTimeout(() => {
      setActive(i);
      setPanelVisible(true);
    }, 160);
  };

  return (
    <div>
      <div className="grid grid-cols-[.85fr_1.15fr] gap-16 mt-12 max-[1023px]:grid-cols-1">
        {/* Selector list */}
        <nav aria-label="Engagement principles">
          <ul className="list-none border-t border-hairline">
            {PANELS.map(({ label }, i) => (
              <li key={label}>
                <button
                  onClick={() => handleSelect(i)}
                  aria-pressed={active === i}
                  className={`relative block w-full text-left py-5 border-b border-hairline font-display font-medium text-heading-3 transition-all duration-base ease-standard
                    before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-0.5 before:bg-signature before:transition-all before:duration-base before:ease-standard before:rounded-sm
                    ${
                      active === i
                        ? "text-ink pl-[34px] before:w-6"
                        : "text-ink-muted hover:text-ink hover:pl-[34px] before:w-0 hover:before:w-6"
                    }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Detail panel */}
        <div
          className="rounded-panel border border-hairline p-12 shadow-e1 min-h-[250px]"
          style={{ background: "linear-gradient(140deg,#fff,#F2F0E9)" }}
        >
          <div
            style={{
              opacity: panelVisible ? 1 : 0,
              transition: "opacity 160ms cubic-bezier(.2,0,0,1)",
            }}
          >
            <span className="font-mono text-mono-sm text-teal tracking-[.1em]">
              {panel.n} / {String(PANELS.length).padStart(2, "0")}
            </span>
            <h3 className="font-display font-medium text-heading-1 text-ink mt-4 mb-4">
              {panel.title}
            </h3>
            <p className="text-body text-ink-2 max-w-[52ch]">{panel.body}</p>
          </div>
        </div>
      </div>

      {/* Credentials */}
      <div className="mt-24 pt-8 border-t border-hairline">
        <p className="inline-flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase tracking-[.1em] text-ink-muted mb-4">
          <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
          Credentials & ecosystem
        </p>
        <div className="flex flex-wrap gap-2.5 mt-4">
          {CREDENTIALS.map(({ label, highlight }) => (
            <span
              key={label}
              className={`font-mono text-mono-sm tracking-[.04em] px-3.5 py-2 border rounded-tag transition-all duration-fast ease-standard ${
                highlight
                  ? "border-transparent bg-signature text-white"
                  : "border-hairline-strong text-ink-2 bg-white hover:border-teal hover:text-teal hover:shadow-e1"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <p className="mt-6 text-body-sm text-ink-2 max-w-[64ch]">
          Certified minority business enterprise, qualifying for supplier diversity programs at enterprises and government agencies alike.
        </p>
      </div>
    </div>
  );
}
