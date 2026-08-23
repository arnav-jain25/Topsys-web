export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 font-mono text-eyebrow font-semibold uppercase tracking-[.1em] text-ink-muted .on-field &:text-signal .on-field-deep &:text-signal ${className}`}
    >
      {/* Signature gradient dash — one of the four permitted uses */}
      <span
        className="inline-block h-0.5 w-[26px] bg-signature rounded-full flex-none"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
