import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export — this site has no API routes, no server actions, and no
     dynamic rendering. Every page is pre-rendered at build time (SSG),
     matching the architecture decision in CLAUDE.md. `next build` emits a
     plain `out/` folder of HTML/CSS/JS that any static file host (Nginx,
     Apache, Hostinger shared hosting, a CDN) can serve directly — no Node.js
     process needs to run in production. */
  output: "export",

  /* next/image's built-in optimizer requires a running server. With static
     export there's no server, so images are served as-is (already using
     next-gen formats/explicit dimensions per CLAUDE.md's perf budget). */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
