"use client";
import { useEffect, useRef } from "react";

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  bvx: number; bvy: number; // base drift velocity
  r: number;
}

export function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<{ x: number; y: number } | null>(null);

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

    /* Track mouse via window so canvas can stay pointer-events:none */
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const N    = 90;
    const LINK = 250;
    const REPEL_R  = 160;
    const REPEL_F  = 3.5;
    const MAX_SPD  = 5;
    const REVERT   = 0.018; // how fast velocity returns to base drift

    const dots: Dot[] = Array.from({ length: N }, () => {
      const bvx = (Math.random() - 0.5) * 0.35;
      const bvy = (Math.random() - 0.5) * 0.35;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: bvx, vy: bvy,
        bvx, bvy,
        r: Math.random() * 2.0 + 1.5,
      };
    });

    let raf = 0;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const mouse = mouseRef.current;

      for (const d of dots) {
        /* Mean-revert velocity toward base drift */
        d.vx += (d.bvx - d.vx) * REVERT;
        d.vy += (d.bvy - d.vy) * REVERT;

        /* Mouse repulsion */
        if (mouse) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_R && dist > 0) {
            const f = (1 - dist / REPEL_R) * REPEL_F;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }

        /* Clamp speed */
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > MAX_SPD) { d.vx = (d.vx / spd) * MAX_SPD; d.vy = (d.vy / spd) * MAX_SPD; }

        d.x += d.vx; d.y += d.vy;

        /* Boundary bounce */
        if (d.x < 0)  { d.x = 0;  d.vx = Math.abs(d.vx);  d.bvx = Math.abs(d.bvx);  }
        if (d.x > W)  { d.x = W;  d.vx = -Math.abs(d.vx); d.bvx = -Math.abs(d.bvx); }
        if (d.y < 0)  { d.y = 0;  d.vy = Math.abs(d.vy);  d.bvy = Math.abs(d.bvy);  }
        if (d.y > H)  { d.y = H;  d.vy = -Math.abs(d.vy); d.bvy = -Math.abs(d.bvy); }
      }

      /* Connection lines */
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.50;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(196,181,253,${alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      /* Dots */
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196,181,253,0.75)";
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
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
