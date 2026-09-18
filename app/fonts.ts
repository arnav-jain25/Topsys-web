import { Archivo, Public_Sans, Righteous, Tangerine } from "next/font/google";

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
 * Tangerine is a fourth, deliberately separate face: a calligraphic script
 * accent used only for standalone emphasis moments (pull quotes, the
 * visionary quotes, the Standard section's outcome line) — never inline
 * within a sentence, never for headings or body copy. It's a script, not an
 * italic serif, so it's set larger than a normal display size everywhere it
 * appears (see AboutSections.tsx) to keep the stroke from threading together
 * at sentence length. Client sign-off item, not a replacement for the
 * documented three-face system.
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

export const tangerine = Tangerine({
  variable: "--font-tangerine",
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

export const fontVariables = [
  archivo.variable,
  publicSans.variable,
  righteous.variable,
  tangerine.variable,
].join(" ");
