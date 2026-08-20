import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center h-[50px] px-[26px] rounded-control text-[15px] font-semibold relative overflow-hidden transition-shadow duration-fast ease-standard hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white shadow-e1 before:absolute before:inset-0 before:bg-signature before:opacity-0 before:transition-opacity before:duration-base before:ease-standard hover:shadow-e2 hover:before:opacity-100 .on-field &:bg-signal .on-field &:text-field-deep",
  secondary:
    "border border-hairline-strong text-ink hover:border-teal hover:text-teal .on-field &:border-field-hairline .on-field &:text-on-field .on-field &:hover:border-signal .on-field &:hover:text-signal",
};

export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps & ComponentPropsWithoutRef<"button">) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-[15px] font-semibold text-teal border-b border-current pb-0.5 transition-colors duration-fast ease-standard hover:no-underline .on-field &:text-signal ${className}`}
    >
      {children}
    </Link>
  );
}
