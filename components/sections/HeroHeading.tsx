"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "has to work.",
  "ships on time.",
  "runs in production.",
  "is built right.",
];

const TYPE_SPEED = 62;   // ms per character typed
const ERASE_SPEED = 38;  // ms per character erased
const HOLD_MS = 2400;    // pause after fully typed

export function HeroHeading() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "erasing">("typing");
  const [showCursor, setShowCursor] = useState(true);

  /* Cursor blink — independent of typing state */
  useEffect(() => {
    const t = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  /* State machine: typing → holding → erasing → next phrase */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(PHRASES[0]);
      setPhase("holding");
      return;
    }

    const target = PHRASES[phraseIdx];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("holding"), HOLD_MS);
        return () => clearTimeout(t);
      }
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("erasing"), 180);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          ERASE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, phraseIdx]);

  return (
    <h1
      className="font-display font-medium text-ink mb-6"
      style={{ fontSize: "var(--text-hero-h1)", lineHeight: 1.02, letterSpacing: "-0.035em" }}
    >
      <span className="block whitespace-nowrap max-[600px]:whitespace-normal">Technology</span>
      <span className="block whitespace-nowrap max-[600px]:whitespace-normal">
        that{" "}
        <span className="text-signature" aria-live="polite" aria-label={PHRASES[phraseIdx]}>
          {displayed}
          <span
            className="inline-block align-middle ml-[2px]"
            style={{
              width: "3px",
              height: "0.82em",
              background: "currentColor",
              opacity: showCursor ? 1 : 0,
              borderRadius: "1px",
              verticalAlign: "middle",
              transition: "opacity 80ms",
            }}
            aria-hidden="true"
          />
        </span>
      </span>
    </h1>
  );
}
