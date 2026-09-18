import { Archivo, Public_Sans, Righteous, Fraunces } from "next/font/google";

/**
 * The three faces, wired once and consumed through the Tailwind theme as
 * font-display / font-body / font-mono.
 *
 * Archivo stands in for Neue Montreal until that licence is bought. When it is,
 * swap this single declaration and the --font-archivo variable name — nothing
 * else in the codebase names the face.
 *
 * Archivo and Public Sans are variable fonts, so no weight array: the full
 * 400-600 range CLAUDE.md calls for comes down in one file. Righteous ships a
 * single static weight, so it is listed explicitly.
 *
 * Fraunces is a fourth, deliberately separate face: an accent serif used only
 * for standalone emphasis moments (pull quotes, the visionary quotes, the
 * Standard section's outcome line) — never inline within a sentence, never
 * for headings or body copy. It's a brand-system exception the client should
 * sign off on, not a replacement for the documented three-face system.
 */

export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  axes: ["opsz", "SOFT"],
});

export const fontVariables = [
  archivo.variable,
  publicSans.variable,
  righteous.variable,
  fraunces.variable,
].join(" ");
