import Link from "next/link";
import { INSIGHTS } from "@/lib/insights";

export function InsightsAccordion({ limit }: { limit?: number }) {
  const items = limit ? INSIGHTS.slice(0, limit) : INSIGHTS;
  return (
    <div className="mt-12 border-t border-field-hairline">
      {items.map((insight) => (
        <details
          key={insight.title}
          className="group border-b border-field-hairline cursor-pointer"
          open={insight.defaultOpen}
        >
          <summary className="list-none grid grid-cols-[auto_1fr_auto] gap-6 items-center py-6 [&::-webkit-details-marker]:hidden max-[1023px]:grid-cols-[1fr_auto] max-[1023px]:[&>.topic]:col-span-2">
            <span className="topic font-mono text-mono-xs uppercase tracking-[.1em] text-signal min-w-[150px] max-[1023px]:min-w-0 max-[1023px]:mb-1.5">
              {insight.topic}
            </span>
            <h3
              className="font-display font-medium text-on-field-2 group-open:text-on-field transition-colors duration-base ease-standard"
              style={{ fontSize: "clamp(1.1875rem, 2.1vw, 1.625rem)" }}
            >
              {insight.title}
            </h3>
            <span
              className="font-mono text-signal text-lg transition-transform duration-base ease-standard group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>

          <div className="pb-8 pl-[calc(150px+1.5rem)] max-[1023px]:pl-0 max-w-[74ch]">
            <p className="text-body text-on-field-2">{insight.summary}</p>
            <div className="mt-4 flex items-center gap-5 flex-wrap">
              <span className="font-mono text-mono-sm text-on-field-2 tracking-[.06em]">
                {insight.readTime}
              </span>
              <Link
                href={`/insights/${insight.slug}`}
                className="font-mono text-mono-sm text-signal tracking-[.06em] hover:underline underline-offset-4 transition-colors duration-fast ease-standard"
              >
                Read the full piece →
              </Link>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
