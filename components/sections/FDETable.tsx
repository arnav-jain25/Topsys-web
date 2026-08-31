/**
 * FDETable — the disambiguation artifact a CIO can scan in 8 seconds.
 *
 * Three columns: Consultant · Contractor · Forward Deployed Engineer.
 * The FDE column is highlighted in signal. No icons, no decoration:
 * the contrast does the work. Inverted section (proof, per colour rules).
 */

const ROWS = [
  {
    label: "Who sets scope",
    consultant: "The firm's engagement manager",
    contractor: "Your PM with a ticket queue",
    fde: "The engineer — in your room",
  },
  {
    label: "Accountable to",
    consultant: "Deliverable defined at contract signing",
    contractor: "Hours billed, tasks closed",
    fde: "Whether it works in production",
  },
  {
    label: "Commit access",
    consultant: "Rarely, late in the project",
    contractor: "Yes, to assigned tasks",
    fde: "Yes, from day one, with authority",
  },
  {
    label: "Architectural authority",
    consultant: "Documented and handed over",
    contractor: "Defers to your architects",
    fde: "Exercises it. Explains every decision.",
  },
  {
    label: "What they leave behind",
    consultant: "A report and a slide deck",
    contractor: "Their contribution to the backlog",
    fde: "A system your team can operate",
  },
  {
    label: "Engagement end",
    consultant: "Statement of work complete",
    contractor: "Contract not renewed",
    fde: "Designed in. Your team owns it.",
  },
];

const COLS = [
  { key: "consultant", label: "Consultant", highlight: false },
  { key: "contractor", label: "Contractor", highlight: false },
  { key: "fde",        label: "Forward Deployed Engineer", highlight: true },
] as const;

export function FDETable({ exitHref = "/capabilities/forward-deployed", exitLabel = "learn how it works →" }: { exitHref?: string; exitLabel?: string }) {
  return (
    <section className="on-field" style={{ padding: "7rem 0" }}>
      <div className="wrap">
        {/* Header */}
        <p
          className="font-mono uppercase tracking-[.12em] text-signal mb-2"
          style={{ fontSize: "0.8125rem" }}
        >
          Forward Deployed Engineer
        </p>
        <h2
          className="font-display font-medium text-on-field mt-0"
          style={{
            fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
            letterSpacing: "-0.028em",
            maxWidth: "26ch",
          }}
        >
          Neither consultant nor contractor. Something more accountable.
        </h2>
        <p className="text-body text-on-field-2 max-w-[62ch] mt-5 mb-12">
          You can't write a requirements document for an AI system. You find out what it does when it touches your data. That is the problem our FDE model was built for.
        </p>

        {/* Comparison table — scrollable on narrow screens */}
        <div className="overflow-x-auto -mx-4 px-4">
          <table
            className="w-full border-collapse"
            style={{ minWidth: "640px" }}
          >
            <thead>
              <tr>
                <th className="pb-4 text-left w-[22%]" />
                {COLS.map(({ key, label, highlight }) => (
                  <th
                    key={key}
                    scope="col"
                    className="pb-4 text-left px-5"
                    style={{ width: "26%" }}
                  >
                    <span
                      className="font-mono text-mono-xs uppercase tracking-[.1em]"
                      style={{
                        color: highlight
                          ? "var(--color-signal)"
                          : "var(--color-on-field-2)",
                      }}
                    >
                      {label}
                    </span>
                    {highlight && (
                      /* Signature underline — marks the TOPSYS column */
                      <span
                        className="block mt-1.5 h-[2px] w-full bg-signature rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(({ label, ...vals }, rowIdx) => (
                <tr
                  key={label}
                  className="border-t border-field-hairline"
                >
                  {/* Row label */}
                  <td className="py-5 pr-4 align-top">
                    <span
                      className="font-mono text-mono-xs uppercase tracking-[.08em] text-on-field-2"
                      style={{ opacity: 0.7 }}
                    >
                      {label}
                    </span>
                  </td>
                  {COLS.map(({ key, highlight }) => (
                    <td
                      key={key}
                      className="py-5 px-5 align-top text-body-xs leading-relaxed"
                      style={{
                        color: highlight
                          ? "var(--color-on-field)"
                          : "var(--color-on-field-2)",
                        background: highlight
                          ? rowIdx % 2 === 0
                            ? "rgba(141,198,62,0.04)"
                            : "rgba(141,198,62,0.06)"
                          : "transparent",
                      }}
                    >
                      {vals[key as keyof typeof vals]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exit line */}
        <p
          className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mt-10 pt-8 border-t border-field-hairline"
          style={{ opacity: 0.6 }}
        >
          The FDE model is available across all five TOPSYS service areas —&nbsp;
          <a
            href={exitHref}
            className="text-signal border-b border-signal/40 hover:border-signal transition-colors duration-fast"
            style={{ textTransform: "none", letterSpacing: "normal" }}
          >
            {exitLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
