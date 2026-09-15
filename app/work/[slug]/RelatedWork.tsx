import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";

interface Props {
  slugs: string[];
}

export function RelatedWork({ slugs }: Props) {
  const items = slugs
    .map((s) => CASE_STUDIES.find((cs) => cs.slug === s))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  if (items.length === 0) return null;

  return (
    <section className="bg-surface" style={{ padding: "5rem 0" }}>
      <div className="wrap">
        <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted mb-6">
          Part of the same program
        </p>
        <div className="grid grid-cols-2 gap-5 max-[767px]:grid-cols-1">
          {items.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group block border border-hairline rounded-card px-6 py-6 bg-white relative overflow-hidden transition-all duration-base ease-standard hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px]"
            >
              {/* Gradient top edge on hover — one of the four permitted uses */}
              <span
                className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-base ease-standard"
                aria-hidden="true"
              />
              <p className="font-mono text-mono-xs uppercase tracking-[.08em] text-ink-muted mb-3">
                {cs.tag}
              </p>
              <h3 className="font-display font-medium text-heading-4 text-ink mb-2 leading-snug">
                {cs.title}
              </h3>
              <p className="text-body-xs text-ink-2">{cs.lede}</p>
              <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal mt-4">
                Read case
                <span className="inline-block transition-transform duration-fast ease-standard group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
