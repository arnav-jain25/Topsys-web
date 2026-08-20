"use client";

import dynamic from "next/dynamic";

/* Thin client wrapper so `ssr: false` is legal (Server Components forbid it). */
const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroSceneLoader() {
  return <HeroScene />;
}
