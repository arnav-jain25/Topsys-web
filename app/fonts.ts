import { Archivo, Public_Sans, Chakra_Petch, Righteous } from "next/font/google";

/**
 * The three faces, wired once and consumed through the Tailwind theme as
 * font-display / font-body / font-mono.
 *
 * Archivo stands in for Neue Montreal until that licence is bought. When it is,
 * swap this single declaration and the --font-archivo variable name — nothing
 * else in the codebase names the face.
 *
 * Archivo and Public Sans are variable fonts, so no weight array: the full
 * 400-600 range CLAUDE.md calls for comes down in one file. IBM Plex Mono ships
 * static instances, so its two weights are listed explicitly.
 */

export const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

export const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const fontVariables = [
  archivo.variable,
  publicSans.variable,
  chakraPetch.variable,
  righteous.variable,
].join(" ");
