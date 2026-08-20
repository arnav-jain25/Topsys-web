import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol
        className="flex flex-wrap items-center gap-2 font-mono text-mono-sm text-ink-muted list-none"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            className="text-ink-muted hover:text-teal transition-colors duration-fast ease-standard"
            itemProp="item"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map(({ label, href }, i) => (
          <li
            key={label}
            className="flex items-center gap-2"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span aria-hidden="true" className="text-hairline-strong">
              /
            </span>
            {href ? (
              <Link
                href={href}
                className="text-ink-muted hover:text-teal transition-colors duration-fast ease-standard"
                itemProp="item"
              >
                <span itemProp="name">{label}</span>
              </Link>
            ) : (
              <span className="text-ink" itemProp="name" aria-current="page">
                {label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
