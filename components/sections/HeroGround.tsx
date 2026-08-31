"use client";

import { useState, useEffect, useRef } from "react";

// Words a CIO reading an IT solutions & services firm would find credible.
// Large pool so individual-word cycling always has fresh candidates.
const POOL = [
  // Stack
  "Python", "Java", "React", "Node.js",
  "AWS", "Azure", "GCP",
  "Kubernetes", "Terraform", "Docker",
  "Kafka", "Spark", "Snowflake", "dbt",
  "PostgreSQL", "GraphQL", "REST APIs",
  "CI/CD", "DevSecOps", "Microservices",
  // AI / Data
  "LLMs", "RAG", "Agentic AI", "ML pipelines",
  "Data platforms", "Analytics",
  // Delivery
  "Production", "Migration", "Modernization",
  "Zero downtime", "Integration", "Observability",
  "Ship it", "Scalability", "Deployment",
  "Cloud-native", "Full-stack",
  // Context
  "Enterprise", "Government", "State agencies",
  "20+ years", "MBE certified", "30 states",
  "Critical systems", "Embedded teams", "Engineers",
  "AI & Data", "Cloud", "Cybersecurity",
];

const DISPLAY_COUNT = 22;
const SWAP_INTERVAL_MS = 2000; // one word cycles every ~2s
const FADE_MS = 220;

function rng32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function initSlots() {
  const rng = rng32(20260830);
  const pool = [...POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, DISPLAY_COUNT).map((word) => {
    const dur = 14 + rng() * 12;
    return { word, animDelay: -(rng() * dur), animDuration: dur, fading: false };
  });
}

export function HeroGround() {
  const [slots, setSlots] = useState(() => initSlots());
  // Track which words are currently visible so we don't repeat them
  const shownRef = useRef<string[]>([]);

  useEffect(() => {
    shownRef.current = slots.map((s) => s.word);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tid: ReturnType<typeof setTimeout>;

    const swap = () => {
      const shown = new Set(shownRef.current);
      const candidates = POOL.filter((w) => !shown.has(w));
      if (!candidates.length) { tid = setTimeout(swap, SWAP_INTERVAL_MS); return; }

      const slotIdx = Math.floor(Math.random() * DISPLAY_COUNT);
      const nextWord = candidates[Math.floor(Math.random() * candidates.length)];

      // Fade that one slot out
      setSlots((prev) => prev.map((s, i) => (i === slotIdx ? { ...s, fading: true } : s)));

      setTimeout(() => {
        shownRef.current = shownRef.current.map((w, i) => (i === slotIdx ? nextWord : w));
        // Swap word and fade back in
        setSlots((prev) =>
          prev.map((s, i) => (i === slotIdx ? { ...s, word: nextWord, fading: false } : s))
        );
        tid = setTimeout(swap, SWAP_INTERVAL_MS);
      }, FADE_MS + 30);
    };

    tid = setTimeout(swap, SWAP_INTERVAL_MS);
    return () => clearTimeout(tid);
  }, []);

  return (
    <div className="hero-ground" aria-hidden="true">
      <div className="hero-ground-field">
        {slots.map(({ word, animDelay, animDuration, fading }, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${animDelay.toFixed(2)}s`,
              animationDuration: `${animDuration.toFixed(2)}s`,
              opacity: fading ? 0 : 1,
              transition: `opacity ${FADE_MS}ms cubic-bezier(.2,0,0,1)`,
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
