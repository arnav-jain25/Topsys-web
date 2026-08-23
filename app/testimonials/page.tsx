import { TESTIMONIALS } from "@/lib/testimonials";

export const metadata = {
  title: "Client testimonials — TOPSYS IT",
  description: "What technology leaders say about working with TOPSYS IT.",
};

const ORDINALS = ["01", "02", "03", "04", "05"];


export default function TestimonialsPage() {
  return (
    <main id="main">
      {/* ── Hero ── */}
      <section className="bg-field-deep pt-28 pb-20 px-6">
        <div className="wrap max-w-[900px]">
          <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.14em] text-signal mb-5 flex items-center gap-3">
            <span className="inline-block w-6 h-[2px] bg-signature" aria-hidden="true" />
            Client testimonials
          </p>
          <h1 className="font-display font-medium text-on-field" style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Clients speak<br />plainly.
          </h1>
          <p className="text-body text-on-field-2 mt-6 max-w-[52ch]">
            Technology leaders on what it means to work with a team that owns the outcome.
          </p>
        </div>
      </section>

      {/* ── Testimonials — editorial list ── */}
      <section className="bg-paper">
        {TESTIMONIALS.map((t, i) => (
          <article
            key={t.id}
            className={`border-b border-hairline ${i === 0 ? "border-t" : ""}`}
          >
            <div className="wrap py-16 md:py-20 grid grid-cols-1 md:grid-cols-[200px_1fr_220px] gap-8 md:gap-12 items-start">

              {/* Left — index + industry */}
              <div className="flex md:flex-col gap-4 md:gap-3 items-center md:items-start">
                <span
                  className="font-mono text-[3rem] md:text-[4rem] font-medium leading-none"
                  style={{ color: "var(--color-hairline-strong)" }}
                  aria-hidden="true"
                >
                  {ORDINALS[i]}
                </span>
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control font-mono text-[10px] uppercase tracking-[.1em] text-white ${t.accentClass}`}>
                    {t.industry}
                  </span>
                  <p className="font-mono text-mono-xs text-ink-muted mt-2 tracking-[.04em]">
                    {t.engagement}
                  </p>
                </div>
              </div>

              {/* Center — quote */}
              <div className="relative pl-6 border-l-2 border-teal md:pl-8">
                {/* Decorative large open-quote mark */}
                <span
                  className="absolute -top-2 -left-3 font-display text-[5rem] leading-none text-hairline select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p
                  className="font-display font-medium text-ink relative z-[1]"
                  style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.55rem)", letterSpacing: "-0.02em", lineHeight: 1.35 }}
                >
                  {t.quote}
                </p>
              </div>

              {/* Right — attribution */}
              <div className="md:pt-1 md:border-l md:border-hairline md:pl-8">
                <p className="font-mono text-mono-xs text-ink-muted tracking-[.04em]">{t.attribution}</p>
                <p className="font-mono text-mono-xs text-teal mt-1 tracking-[.04em]">{t.industry}</p>
              </div>

            </div>
          </article>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="bg-field-deep py-20 px-6">
        <div className="wrap max-w-[680px] text-center mx-auto">
          <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-signal mb-4 flex items-center justify-center gap-3">
            <span className="inline-block w-5 h-[2px] bg-signature" aria-hidden="true" />
            Work with us
          </p>
          <h2 className="font-display font-medium text-on-field mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            Add your program to the record.
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center h-12 px-7 bg-signal text-field-deep font-semibold rounded-control text-body-sm hover:bg-signal-hi transition-colors duration-fast ease-standard"
          >
            Talk to us
          </a>
        </div>
      </section>
    </main>
  );
}
