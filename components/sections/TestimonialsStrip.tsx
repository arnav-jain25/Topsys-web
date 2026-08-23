import Link from "next/link";
import { TESTIMONIALS } from "@/lib/testimonials";

export function TestimonialsStrip() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section aria-labelledby="testimonials-heading" style={{ padding: "7rem 0 8rem" }}>
      <div className="wrap">

        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-14 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-5">
          <div>
            <p className="inline-flex items-center gap-2.5 font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-teal mb-3">
              <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
              Client testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.875rem, 3.4vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              What they said<br />when it shipped.
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-[.08em] text-teal hover:gap-3 transition-all duration-fast ease-standard whitespace-nowrap pb-1"
          >
            All testimonials <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>

        {/* ── Featured pull-quote ── */}
        <div className="relative border-l-[3px] border-teal pl-8 md:pl-12 mb-14">
          {/* Decorative large quote mark */}
          <span
            className="absolute -top-4 left-3 font-display leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(4rem, 7vw, 7rem)", color: "var(--color-teal-tint)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <span className={`inline-flex items-center px-2.5 py-1 rounded-control font-mono text-[10px] uppercase tracking-[.1em] text-white ${featured.accentClass} mb-4`}>
            {featured.industry}
          </span>

          <p
            className="font-display font-medium text-ink relative z-[1]"
            style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)", letterSpacing: "-0.025em", lineHeight: 1.35 }}
          >
            {featured.quote}
          </p>

          <p className="font-mono text-mono-xs text-ink-muted mt-5 tracking-[.04em]">
            {featured.attribution}
          </p>
        </div>

        {/* ── Hairline divider ── */}
        <div className="border-t border-hairline mb-10" />

        {/* ── 4 compact testimonials in 2×2 ── */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-0 max-[767px]:grid-cols-1">
          {rest.map((t, i) => (
            <div
              key={t.id}
              className={`py-8 border-b border-hairline ${i % 2 === 0 ? "max-[767px]:border-b" : "max-[767px]:border-b"}`}
            >
              <span className={`inline-flex items-center px-2 py-0.5 rounded-control font-mono text-[10px] uppercase tracking-[.1em] text-white ${t.accentClass} mb-3`}>
                {t.industry}
              </span>
              <p
                className="font-display font-medium text-ink-2"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", letterSpacing: "-0.015em", lineHeight: 1.5 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-mono text-mono-xs text-ink-muted mt-4 tracking-[.04em]">
                {t.attribution}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
