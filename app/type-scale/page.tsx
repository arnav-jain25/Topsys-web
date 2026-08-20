import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button, TextLink } from "@/components/ui/Button";
import { ContentToken } from "@/components/ui/ContentToken";

export const metadata = { title: "Type scale" };

function Section({
  title,
  ground = "light",
  children,
}: {
  title: string;
  ground?: "light" | "dark" | "deep";
  children: React.ReactNode;
}) {
  const cls =
    ground === "dark"
      ? "on-field"
      : ground === "deep"
        ? "on-field-deep"
        : "";
  return (
    <section className={`py-16 ${cls}`}>
      <div className="wrap space-y-8">
        <p className="font-mono text-mono-xs uppercase tracking-widest opacity-40 mb-2">
          {title}
        </p>
        {children}
      </div>
    </section>
  );
}

function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2 border-t border-hairline .on-field &:border-field-hairline first:border-0">
      <span className="font-mono text-mono-xs text-ink-muted .on-field &:text-on-field-2 w-36 shrink-0">
        {label}
      </span>
    </div>
  );
}

export default function TypeScalePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      <Section title="Display scale: Archivo 500">
        <Eyebrow>Display scale</Eyebrow>

        <div className="space-y-6">
          <div>
            <span className="font-mono text-mono-xs text-ink-muted block mb-1">
              display-1 · clamp(36px → 68px) · hero h1
            </span>
            <p
              className="font-display font-medium"
              style={{
                fontSize: "clamp(2.25rem, 4.9vw, 4.25rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
              }}
            >
              Technology that has to work.
            </p>
          </div>

          <div>
            <span className="font-mono text-mono-xs text-ink-muted block mb-1">
              display-2 · clamp(32px → 56px) · closing CTA
            </span>
            <p
              className="font-display font-medium"
              style={{
                fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
              }}
            >
              Tell us what you're trying to build.
            </p>
          </div>

          <div>
            <span className="font-mono text-mono-xs text-ink-muted block mb-1">
              display-3 · clamp(30px → 46px) · section h2
            </span>
            <p
              className="font-display font-medium"
              style={{
                fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.028em",
              }}
            >
              AI that survives contact with production.
            </p>
          </div>

          <div>
            <span className="font-mono text-mono-xs text-ink-muted block mb-1">
              display-4 · clamp(24px → 32px) · lead card h3
            </span>
            <p
              className="font-display font-medium"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                lineHeight: 1.14,
                letterSpacing: "-0.022em",
              }}
            >
              Data foundations, applied AI, and analytics that change what
              people decide.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Heading scale: Archivo 500" ground="light">
        <div className="space-y-4">
          {(
            [
              ["heading-1", "1.5rem / 24px", "Section sub-headings"],
              ["heading-2", "1.3125rem / 21px", "Card titles"],
              ["heading-3", "1.1875rem / 19px", "Insights rows (fluid)"],
              ["heading-4", "1.125rem / 18px", "Outcome headings"],
              ["heading-5", "0.9375rem / 15px", "Panel items"],
            ] as const
          ).map(([scale, size, use]) => (
            <div key={scale} className="border-t border-hairline pt-4 first:border-0 first:pt-0">
              <span className="font-mono text-mono-xs text-ink-muted block mb-1">
                {scale} · {size} · {use}
              </span>
              <p
                className="font-display font-medium"
                style={{ fontSize: { "heading-1": "1.5rem", "heading-2": "1.3125rem", "heading-3": "1.1875rem", "heading-4": "1.125rem", "heading-5": "0.9375rem" }[scale], lineHeight: 1.2, letterSpacing: "-0.022em" }}
              >
                Senior people stay on the work
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Body scale: Public Sans 400/600" ground="light">
        <div className="space-y-6">
          {(
            [
              ["lede-lg", "19px", "Hero lede"],
              ["lede", "18px", "Section lede"],
              ["body", "16px", "Default body"],
              ["body-sm", "15px", "Card body"],
              ["body-xs", "14px", "Footer links, small text"],
              ["caption", "13px", "Captions"],
              ["caption-sm", "12px", "Labels"],
            ] as [string, string, string][]
          ).map(([scale, size, use]) => (
            <div key={scale} className="border-t border-hairline pt-6 first:border-0 first:pt-0">
              <span className="font-mono text-mono-xs text-ink-muted block mb-2">
                {scale} · {size} · {use}
              </span>
              <p
                className="text-ink-2"
                style={{
                  fontSize: {
                    "lede-lg": "1.1875rem", lede: "1.125rem", body: "1rem",
                    "body-sm": "0.9375rem", "body-xs": "0.875rem",
                    caption: "0.8125rem", "caption-sm": "0.75rem",
                  }[scale],
                  lineHeight: 1.65,
                  maxWidth: "68ch",
                }}
              >
                Most enterprise AI stalls in the same place: a pilot works in a
                notebook, then meets real data, real users and real compliance
                requirements. We start further back.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Utility scale: IBM Plex Mono 400/500" ground="light">
        <div className="space-y-6">
          <div>
            <span className="font-mono text-mono-xs text-ink-muted block mb-2">
              stat · clamp(34px → 54px) · statistics only
            </span>
            <p
              className="font-mono font-normal"
              style={{
                fontSize: "clamp(2.125rem, 4vw, 3.375rem)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              30+
            </p>
          </div>

          <div className="border-t border-hairline pt-6">
            <span className="font-mono text-mono-xs text-ink-muted block mb-2">
              eyebrow · 12px · uppercase, tracking .1em
            </span>
            <Eyebrow>Capabilities</Eyebrow>
          </div>

          <div className="border-t border-hairline pt-6">
            <span className="font-mono text-mono-xs text-ink-muted block mb-2">
              mono / mono-sm / mono-xs · 13 / 12 / 11px · labels, tags, ordinals
            </span>
            <div className="space-y-2">
              <p className="font-mono" style={{ fontSize: "0.8125rem" }}>01 / AI & DATA</p>
              <p className="font-mono" style={{ fontSize: "0.75rem", letterSpacing: "0.04em" }}>
                Advisory · Generative AI · Machine learning
              </p>
              <p className="font-mono text-ink-muted" style={{ fontSize: "0.6875rem", letterSpacing: "0.09em", textTransform: "uppercase" }}>
                8 min read
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Colour swatches" ground="light">
        <div className="grid grid-cols-4 gap-3 max-[768px]:grid-cols-2">
          {(
            [
              ["paper", "#F8F7F3", "bg-paper", "text-ink"],
              ["surface", "#EFEDE6", "bg-surface", "text-ink"],
              ["sunken", "#E4E1D8", "bg-sunken", "text-ink"],
              ["hairline", "#D8D5CC", "bg-hairline", "text-ink"],
              ["hairline-strong", "#B9B5A9", "bg-hairline-strong", "text-ink"],
              ["ink", "#0E1A1F", "bg-ink", "text-white"],
              ["ink-2", "#3C4A50", "bg-ink-2", "text-white"],
              ["ink-muted", "#667279", "bg-ink-muted", "text-white"],
              ["teal", "#0E5A66", "bg-teal", "text-white"],
              ["teal-hover", "#0A454E", "bg-teal-hover", "text-white"],
              ["teal-tint", "#E2EEEF", "bg-teal-tint", "text-ink"],
              ["field-deep", "#06232A", "bg-field-deep", "text-on-field"],
              ["field", "#0B2F38", "bg-field", "text-on-field"],
              ["field-raised", "#123F4A", "bg-field-raised", "text-on-field"],
              ["on-field", "#EAF2F1", "bg-on-field", "text-ink"],
              ["on-field-2", "#A8BFBE", "bg-on-field-2", "text-ink"],
              ["signal", "#8DC63E", "bg-signal", "text-field-deep"],
              ["signal-hi", "#A2D95A", "bg-signal-hi", "text-field-deep"],
            ] as [string, string, string, string][]
          ).map(([name, hex, bg, fg]) => (
            <div
              key={name}
              className={`${bg} ${fg} rounded-card p-4 border border-hairline`}
            >
              <span className="font-mono text-mono-xs block font-medium">
                {name}
              </span>
              <span className="font-mono text-mono-xs opacity-60">{hex}</span>
            </div>
          ))}
        </div>

        {/* Signature gradient */}
        <div className="mt-4">
          <span className="font-mono text-mono-xs text-ink-muted block mb-2">
            signature gradient · 4 permitted uses only
          </span>
          <div className="h-10 rounded-card bg-signature" />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Interaction components" ground="light">
        <div className="space-y-8">
          <div>
            <span className="font-mono text-mono-xs text-ink-muted block mb-4">
              Buttons: light ground
            </span>
            <div className="flex gap-3 flex-wrap items-center">
              <Button href="/contact">Talk to us</Button>
              <Button href="/capabilities" variant="secondary">
                Explore capabilities
              </Button>
              <TextLink href="/work">Read the case</TextLink>
            </div>
          </div>

          <div className="on-field rounded-panel p-8">
            <span className="font-mono text-mono-xs text-on-field-2 block mb-4">
              Buttons: inverted ground
            </span>
            <div className="flex gap-3 flex-wrap items-center">
              <Button href="/contact">Talk to us</Button>
              <Button href="/capabilities" variant="secondary">
                How to work with us
              </Button>
              <TextLink href="/work">Read the case</TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Content tokens" ground="light">
        <span className="font-mono text-mono-xs text-ink-muted block mb-4">
          Unresolved tokens: see docs/CONTENT-REGISTER.md
        </span>
        <p className="text-body text-ink-2 max-w-[60ch]">
          States served: <ContentToken id="STAT-01" />. AI engagements
          delivered: <ContentToken id="STAT-04" />. Outcome metric:{" "}
          <ContentToken id="METRIC-01" />.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Focus ring" ground="light">
        <span className="font-mono text-mono-xs text-ink-muted block mb-4">
          Tab to these: 2px teal ring, 3px offset
        </span>
        <div className="flex gap-4 flex-wrap">
          <Button href="#">Focusable button</Button>
          <a href="#" className="text-teal underline underline-offset-4">
            Focusable link
          </a>
          <input
            type="text"
            placeholder="Focusable input"
            className="border border-hairline rounded-control px-4 py-2 bg-sunken text-ink text-body"
          />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      <Section title="Geometry" ground="light">
        <div className="grid grid-cols-6 gap-4 items-end max-[768px]:grid-cols-3">
          {(
            [
              ["rule", "0px", "rules"],
              ["control", "2px", "buttons/inputs/tags"],
              ["card", "4px", "cards"],
              ["panel", "6px", "panels"],
              ["card-lg", "8px", "large cards"],
              ["tag", "24px", "tags only"],
            ] as [string, string, string][]
          ).map(([name, px, use]) => (
            <div key={name} className="text-center">
              <div
                className="w-full h-12 bg-teal mx-auto mb-2"
                style={{ borderRadius: px }}
              />
              <span className="font-mono text-mono-xs text-ink-muted block">
                {px}
              </span>
              <span className="font-mono text-mono-xs text-ink-muted block opacity-60">
                {use}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
