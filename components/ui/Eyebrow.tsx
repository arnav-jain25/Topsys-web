export function Eyebrow({
  children,
  className = "",
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em] ${className}`}
      style={{ color: dark ? "#C4B5FD" : "#6D28D9" }}
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
