import Link from "next/link";

/**
 * The hero fork — the positioning rendered as structure rather than stated as
 * copy. A spine enters at the left; a rule extends from each label toward the
 * door it opens. The visitor self-selects before they scroll, which is the job
 * the nav's intent routing does further in.
 *
 * Server component. The reveal is a CSS animation on load (the hero is always
 * in view), so the fork ships no JavaScript.
 */

interface Branch {
  label: string;
  href: string;
  cta: string;
}

const BRANCHES: Branch[] = [
  {
    label: "You need the system built.",
    href: "/capabilities",
    cta: "Services",
  },
  {
    label: "You need the team built.",
    href: "/capabilities/technology-talent",
    cta: "Technology talent",
  },
];

export function HeroFork() {
  return (
    <div className="hero-fork">
      <div className="hero-fork-branches">
        {BRANCHES.map(({ label, href, cta }) => (
          <Link key={href} href={href} className="hero-branch">
            <span className="hero-branch-stub" aria-hidden="true" />
            <span className="hero-branch-label">{label}</span>
            <span className="hero-branch-rule" aria-hidden="true" />
            <span className="hero-branch-cta">
              {cta}
              <span aria-hidden="true"> &rarr;</span>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/approach" className="hero-fork-both hero-fork-both-link">
        Or both — from one firm, to one standard
        <span aria-hidden="true"> &rarr;</span>
      </Link>
    </div>
  );
}
