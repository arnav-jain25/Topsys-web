"use client";

import { useEffect } from "react";

/**
 * Next.js App Router doesn't reliably scroll to a URL hash on navigation
 * (client-side transitions can land at scrollY 0 even when the target
 * element exists). This is a known framework gap, not a site bug — but it
 * breaks any anchor link pointing into this page (e.g. the "Partners &
 * MSP" nav item -> /capabilities/technology-talent#msp), so pages that
 * are a hash-link target render this once to correct it on mount.
 */
export function HashScrollFix() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    // Next's own scroll-restoration on navigation completion runs after
    // mount and otherwise wins the race, snapping back to the top a beat
    // after this effect fires. A short delay lets it finish first.
    const timer = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
