"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* Thin client wrapper so `ssr: false` is legal (Server Components forbid it). */
const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

/* Below 1024px the hero copy spans the full column width, so the particle field
   would render behind the headline rather than beside it. The parent is hidden in
   CSS at that width, but `display: none` still mounts the component and pulls the
   three.js chunk over the wire — so gate the mount itself and keep the payload off
   phones entirely. Reduced-motion users skip it for the same reason. */
export function HeroSceneLoader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(wide.matches && !still.matches);
    sync();

    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;
  return <HeroScene />;
}
