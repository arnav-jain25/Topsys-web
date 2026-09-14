/* Shared service icon set + colors — single source of truth.
   Originally duplicated across SiteHeader's mega-panel and the homepage
   ServicesShowcase; now imported everywhere a service needs its mark,
   including each capability page's own hero. Geometry stays constant;
   callers control color and size via className/style. */

export const IconAI = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="2.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="9" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="9" cy="15.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 9H7M11 9H14M9 4V7M9 11V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const IconApps = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M6 4L2 9l4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 4l4 5-4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 3L7.5 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const IconCloud = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M13.5 12a3 3 0 000-6 3.5 3.5 0 00-6.8-.5A2.5 2.5 0 104 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M9 12v4M7 14.5L9 16l2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSecurity = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 1.5L2 4.5V9c0 3.5 3 6.5 7 7 4-1 7-3.5 7-7V4.5L9 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 9l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTalent = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 16c0-3 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="13" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 16c0-2 .9-3.5 2.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export interface ServiceMeta {
  slug: string;
  href: string;
  title: string;
  Icon: React.ComponentType;
  /** Bold fill for the icon tile — chosen to pop against the beige page background. */
  bg: string;
  /** Deeper shade used on hover/focus. */
  hoverBg: string;
}

export const SERVICES: ServiceMeta[] = [
  { slug: "ai-and-data", href: "/capabilities/ai-and-data", title: "AI & data", Icon: IconAI, bg: "#0D5278", hoverBg: "#0A3F62" },
  { slug: "applications-and-modernization", href: "/capabilities/applications-and-modernization", title: "Applications & modernization", Icon: IconApps, bg: "#B5790C", hoverBg: "#96650F" },
  { slug: "cloud-and-platform-engineering", href: "/capabilities/cloud-and-platform-engineering", title: "Cloud & platform", Icon: IconCloud, bg: "#1E6FA8", hoverBg: "#185A87" },
  { slug: "cybersecurity", href: "/capabilities/cybersecurity", title: "Cybersecurity", Icon: IconSecurity, bg: "#9C3159", hoverBg: "#812748" },
  { slug: "technology-talent", href: "/capabilities/technology-talent", title: "Technology talent", Icon: IconTalent, bg: "#5F7A2E", hoverBg: "#4C6224" },
];

/** Convenience lookup by slug for individual capability pages. */
export const SERVICE_BY_SLUG: Record<string, ServiceMeta> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);

/**
 * The bold icon tile used in the homepage ServicesShowcase, reused as a
 * hero badge on each capability page. Fixed color (not hover-interactive)
 * since on a hero it's a static mark, not a link target itself.
 */
export function ServiceIconBadge({ slug, size = 72 }: { slug: string; size?: number }) {
  const service = SERVICE_BY_SLUG[slug];
  if (!service) return null;
  const { Icon, bg } = service;
  return (
    <span
      className="inline-flex items-center justify-center rounded-panel text-white shadow-e1"
      style={{ background: bg, width: size, height: size }}
      aria-hidden="true"
    >
      <Icon />
    </span>
  );
}
