import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-field-deep text-on-field before:absolute before:top-[-60%] before:left-[-10%] before:w-[60%] before:h-[200%] before:bg-[radial-gradient(circle,rgba(141,198,62,.13),transparent_65%)] before:pointer-events-none"
    >
      <div className="wrap py-32 relative">
        <h2
          className="font-display font-medium text-on-field mb-6 relative"
          style={{
            fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
            letterSpacing: "-0.03em",
            maxWidth: "20ch",
          }}
        >
          Tell us what you're trying to build.
        </h2>
        <p className="text-lede text-on-field-2 mb-12 relative max-w-[60ch]">
          A modernization program, an AI use case, a system that keeps breaking, or a team you can't hire fast enough. We'll put the right people on the call, not a salesperson.
        </p>
        <div className="relative">
          <Button href="/contact" variant="primary">
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}
