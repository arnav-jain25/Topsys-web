import { TextLink } from "@/components/ui/Button";

export function CareerStrip() {
  return (
    <div className="border-t border-b border-hairline py-8 flex justify-between items-center gap-6 flex-wrap">
      <p className="text-body text-ink-2">
        We're hiring engineers, architects and consultants across the US, Canada and India.
      </p>
      <TextLink href="/careers">See open roles</TextLink>
    </div>
  );
}
