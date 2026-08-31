"use client";
/**
 * Hero ground — field of words that glows and shuffles. Client component so
 * the words can periodically reshuffle at runtime (every ~9s) with a brief
 * fade transition. The glow itself is pure CSS; shuffling just swaps text
 * in-place by keying spans on position index so animations keep running.
 */
import { useState, useEffect } from "react";

const GROUND = [
  "Engineers",
  "Accountability",
  "Standard",
  "Production",
  "Delivery",
  "Discipline",
  "Ownership",
  "Government",
  "Enterprise",
  "Modernization",
  "Domestic",
  "Audit",
  "20+ years",
  "MBE certified",
  "30 states",
  "Critical systems",
  "AI",
  "Talent",
  "Migration",
  "Compliance",
  "DIR Contract",
  "Embedded teams",
  "State agencies",
  "Ship it",
];

/** Deterministic PRNG (mulberry32) */
function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function layout(seed = 20260830) {
  const rng = createRng(seed);
  return shuffled(GROUND, rng).map((word) => {
    const duration = 14 + rng() * 12;
    const delay = -(rng() * duration);
    return { word, delay, duration };
  });
}

export function HeroGround() {
  const [words, setWords] = useState(() => layout());
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const INTERVAL = 9000;
    const FADE_MS = 300;

    const tick = () => {
      setFading(true);
      setTimeout(() => {
        setWords(() => layout(Date.now() & 0xffffffff));
        setFading(false);
      }, FADE_MS);
    };

    const id = setInterval(tick, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-ground" aria-hidden="true">
      <div
        className="hero-ground-field"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 300ms cubic-bezier(.2,0,0,1)",
        }}
      >
        {words.map(({ word, delay, duration }, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${delay.toFixed(2)}s`,
              animationDuration: `${duration.toFixed(2)}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
