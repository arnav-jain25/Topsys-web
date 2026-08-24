"use client";
import { useEffect, useRef } from "react";

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  hx: number; hy: number; // home cell centre
  r: number;
}

const N    = 70;
const LINK = 250;
const HOME_PULL = 0.0006; // gentle drift back to home zone
const MAX_SPD   = 0.9;

function makeDots(W: number, H: number): Dot[] {
  const cols = Math.round(Math.sqrt(N * (W / H)));
  const rows = Math.ceil(N / cols);
  const cw   = W / cols;
  const rh   = H / rows;

  return Array.from({ length: N }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const hx  = (col + 0.5) * cw + (Math.random() - 0.5) * cw * 0.5;
    const hy  = (row + 0.5) * rh + (Math.random() - 0.5) * rh * 0.5;
    return {
      x: hx, y: hy,
      hx, hy,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r:  Math.random() * 1.5 + 1.0,
    };
  });
}

export function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];

    const setSize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      dots = makeDots(canvas.width, canvas.height);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    let raf = 0;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        /* Gentle pull back toward home cell */
        d.vx += (d.hx - d.x) * HOME_PULL;
        d.vy += (d.hy - d.y) * HOME_PULL;

        /* Clamp speed */
        const spd = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (spd > MAX_SPD) { d.vx = d.vx / spd * MAX_SPD; d.vy = d.vy / spd * MAX_SPD; }

        d.x += d.vx; d.y += d.vy;

        /* Soft boundary — push back rather than hard bounce */
        if (d.x < 0)  { d.x = 0;  d.vx =  Math.abs(d.vx); }
        if (d.x > W)  { d.x = W;  d.vx = -Math.abs(d.vx); }
        if (d.y < 0)  { d.y = 0;  d.vy =  Math.abs(d.vy); }
        if (d.y > H)  { d.y = H;  d.vy = -Math.abs(d.vy); }
      }

      /* Connection lines */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
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
