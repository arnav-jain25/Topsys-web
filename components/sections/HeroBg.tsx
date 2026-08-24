"use client";
import { useEffect, useRef } from "react";

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

const N         = 70;
const LINK      = 250;  // max distance to draw a line
const REPEL     = 90;   // particles push apart within this distance
const REPEL_F   = 0.06; // repulsion strength
const MAX_SPD   = 0.85;

export function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const dots: Dot[] = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r:  Math.random() * 1.5 + 1.0,
    }));

    let raf = 0;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* Pair loop — repulsion + connection lines in one pass */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          /* Repulsion: push apart when too close */
          if (dist < REPEL && dist > 0) {
            const f  = (1 - dist / REPEL) * REPEL_F;
            const nx = dx / dist;
            const ny = dy / dist;
            dots[i].vx += nx * f;
            dots[i].vy += ny * f;
            dots[j].vx -= nx * f;
            dots[j].vy -= ny * f;
          }

          /* Connection line */
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.50;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(196,181,253,${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      /* Update positions */
      for (const d of dots) {
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > MAX_SPD) { d.vx = d.vx / spd * MAX_SPD; d.vy = d.vy / spd * MAX_SPD; }

        d.x += d.vx; d.y += d.vy;

        if (d.x < 0)  { d.x = 0;  d.vx =  Math.abs(d.vx); }
        if (d.x > W)  { d.x = W;  d.vx = -Math.abs(d.vx); }
        if (d.y < 0)  { d.y = 0;  d.vy =  Math.abs(d.vy); }
        if (d.y > H)  { d.y = H;  d.vy = -Math.abs(d.vy); }
      }

      /* Draw dots */
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196,181,253,0.75)";
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
