"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Cell =
  | { status: "delivered"; href: string }
  | { status: "focus"; href: string }
  | { status: "none" };

const ROWS: { label: string; cells: Cell[] }[] = [
  {
    label: "Sitecore MVC",
    cells: [
      { status: "delivered", href: "/work/cpg-cms-modernization" },
      { status: "none" },
      { status: "delivered", href: "/work/cpg-cms-modernization" },
    ],
  },
  {
    label: "Adobe AEM / AEC",
    cells: [
      { status: "focus", href: "/contact?re=enterprise&topic=aem-contentstack" },
      { status: "delivered", href: "/work/aem-dam-migration" },
      { status: "delivered", href: "/work/aem-omnichannel-content" },
    ],
  },
  {
    label: "LAN / file storage",
    cells: [
      { status: "none" },
      { status: "delivered", href: "/work/aem-dam-migration" },
      { status: "none" },
    ],
  },
];

const COLUMNS = ["Contentstack", "AEM Assets (DAM)", "Headless delivery"];

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.2 6.3L4.6 8.7 9.8 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function MigrationMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-10 overflow-x-auto">
      <table className="w-full border-collapse" style={{ minWidth: "640px" }}>
        <caption className="sr-only">
          Platform migrations delivered, by source platform and target platform
        </caption>
        <thead>
          <tr>
            <th scope="col" className="text-left pb-4 pr-4">
              <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-ink-muted">
                From \ To
              </span>
            </th>
            {COLUMNS.map((c) => (
              <th key={c} scope="col" className="text-left pb-4 px-4 border-l border-hairline">
                <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-ink-muted">
                  {c}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, ri) => (
            <tr key={row.label} className="border-t border-hairline">
              <th scope="row" className="text-left py-4 pr-4 font-display font-medium text-body-sm text-ink whitespace-nowrap">
                {row.label}
              </th>
              {row.cells.map((cell, ci) => {
                const delay = (ri * COLUMNS.length + ci) * 60;
                const style = visible
                  ? { animation: `topsys-fade-in 420ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
                  : { opacity: 0 };

                if (cell.status === "none") {
                  return (
                    <td key={ci} className="py-4 px-4 border-l border-hairline align-top" style={style}>
                      <span className="text-ink-muted" aria-hidden="true">—</span>
                      <span className="sr-only">Not a service we offer</span>
                    </td>
                  );
                }

                if (cell.status === "focus") {
                  return (
                    <td key={ci} className="py-4 px-4 border-l border-hairline align-top" style={style}>
                      <Link
                        href={cell.href}
                        className="group block rounded-control px-3 py-2.5 -mx-3 -my-1 border border-teal-tint bg-teal-tint transition-colors duration-fast ease-standard hover:border-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                      >
                        <span className="font-mono text-mono-xs uppercase tracking-[.07em] text-teal">
                          Our current focus
                        </span>
                        <span className="block text-body-xs text-ink-2 mt-1">
                          Where our AEM and Contentstack depth meet. Talk to us.
                        </span>
                      </Link>
                    </td>
                  );
                }

                return (
                  <td key={ci} className="py-4 px-4 border-l border-hairline align-top" style={style}>
                    <Link
                      href={cell.href}
                      className="group inline-flex items-center gap-1.5 rounded-control px-2 py-1 -mx-2 -my-1 transition-colors duration-fast ease-standard hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
                    >
                      <span
                        className="flex-none flex items-center justify-center rounded-full text-white"
                        style={{ width: 16, height: 16, background: "var(--color-teal)" }}
                      >
                        <CheckIcon />
                      </span>
                      <span className="font-mono text-mono-xs text-ink-2 group-hover:text-teal transition-colors duration-fast ease-standard">
                        Delivered
                      </span>
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
