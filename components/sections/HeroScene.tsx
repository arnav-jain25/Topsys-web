"use client";

import { useEffect, useRef, useState } from "react";
import type { WebGLRenderer, Scene, PerspectiveCamera, Group, BufferGeometry, BufferAttribute, Points } from "three";

/* ---- Capability phases shown in the phase indicator ---- */
const CAPS: [string, string][] = [
  ["Data", "foundations you can trust"],
  ["AI", "models that reach production"],
  ["Applications", "modernized without stopping"],
  ["Cloud", "platforms that scale"],
  ["Cybersecurity", "secured by design"],
];

/* ---- Particle geometry builders ---- */
const GX = 25, GY = 10, GZ = 10, N = GX * GY * GZ; // 2500 — dense field for constant sparkling

function fData(): number[] {
  const a: number[] = [], sx = 4.6 / GX, sy = 2.9 / GY, sz = 3.4 / GZ;
  for (let i = 0; i < N; i++) {
    const x = i % GX, y = Math.floor(i / GX) % GY, z = Math.floor(i / (GX * GY)) % GZ;
    a.push((x - GX / 2) * sx * 1.35, (y - GY / 2) * sy * 1.5, (z - GZ / 2) * sz * 1.35);
  }
  return a;
}

// Lorenz attractor — the mathematical chaos butterfly.
// Two looping wings that never repeat, perfect for AI/data phase.
function fAI(): number[] {
  const a: number[] = [], sigma = 10, rho = 28, beta = 8 / 3, dt = 0.011;
  let x = 0.1, y = 0, z = 20;
  for (let w = 0; w < 1200; w++) {           // warmup to attractor
    const dx = sigma * (y - x), dy = x * (rho - z) - y, dz = x * y - beta * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
  }
  const sc = 0.092, zOff = -25 * sc, jit = 0.55;
  for (let i = 0; i < N; i++) {
    const dx = sigma * (y - x), dy = x * (rho - z) - y, dz = x * y - beta * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
    a.push(
      x * sc + (Math.random() - 0.5) * jit,
      (z * sc + zOff) + (Math.random() - 0.5) * jit,
      y * sc + (Math.random() - 0.5) * jit,
    );
  }
  return a;
}

// Concentric shells — 5 nested spherical shells, like atomic orbitals
function fApps(): number[] {
  const a: number[] = [], radii = [0.7, 1.35, 1.9, 2.5, 3.1], sp = 0.20;
  for (let i = 0; i < N; i++) {
    const r = radii[i % radii.length] + (Math.random() - 0.5) * sp;
    const theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
    a.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  }
  return a;
}

// Torus — solid ring/donut, denser at tube core
function fCloud(): number[] {
  const a: number[] = [], R = 2.3, r = 1.0;
  for (let i = 0; i < N; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI * 2;
    const tube = r * Math.pow(Math.random(), 0.5);
    const x = (R + tube * Math.cos(theta)) * Math.cos(phi);
    const z = (R + tube * Math.cos(theta)) * Math.sin(phi);
    const y = tube * Math.sin(theta);
    a.push(x, y, z);
  }
  return a;
}

function fSec(): number[] {
  const a: number[] = [], ga = Math.PI * (3 - Math.sqrt(5)), shell = Math.floor(N * 0.76);
  for (let i = 0; i < N; i++) {
    if (i < shell) {
      const y = 1 - (i / (shell - 1)) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = ga * i, R = 2.85;
      a.push(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R);
    } else {
      const rr = Math.pow(Math.random(), 0.4) * 0.92, t2 = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
      a.push(rr * Math.sin(p) * Math.cos(t2), rr * Math.cos(p), rr * Math.sin(p) * Math.sin(t2));
    }
  }
  return a;
}

/* ---- Phase indicator ---- */
function PhaseIndicator({ phase, fading }: { phase: number; fading: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-3 font-mono text-mono uppercase text-ink bg-paper/70 backdrop-blur-[4px] px-4 py-2 rounded-tag border border-hairline transition-opacity duration-base ease-standard ${fading ? "opacity-0" : "opacity-100"}`}
      style={{ letterSpacing: "0.1em" }}
      aria-live="polite"
      aria-label={`Current visualization: ${CAPS[phase][0]}`}
    >
      {/* Gradient dash — one of the four permitted uses */}
      <span className="block w-[26px] h-0.5 bg-signature rounded-full flex-none" aria-hidden="true" />
      <span>{CAPS[phase][0]}</span>
      <span className="normal-case text-ink-muted" style={{ letterSpacing: "0.01em", textTransform: "none", fontFamily: "var(--font-body)" }}>
        {CAPS[phase][1]}
      </span>
    </div>
  );
}

/* ---- Main component ---- */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(false);
  const reducedMotion = false; // particle sparkle is not vestibular motion — always animate

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let rafId: number;
    let destroyed = false;

    async function init() {
      const THREE = await import("three");

      if (destroyed || !canvas) return;

      // Pre-compute all particle forms (done once, outside animation loop)
      const forms = [fData(), fAI(), fApps(), fCloud(), fSec()];

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
      cam.position.z = 7.2;

      const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const grp = new THREE.Group();
      scene.add(grp);

      // No texture map — default THREE.js square particles (the "squary" look
      // the user preferred; the twinkle comes from the per-particle brightness
      // animation, not from a shape override).

      // ── All-particle twinkle ───────────────────────────────────────────
      // Vivid saturated primaries chosen for maximum contrast on paper (#F8F7F3).
      // At the 55% dim floor each dot reads as a clearly coloured dark jewel;
      // at the 100% peak it pops to full saturation — the swing is the sparkle.
      const ALL_PAL = [
        new THREE.Color("#0E5A66"),  // brand teal
        new THREE.Color("#0055CC"),  // vivid cobalt
        new THREE.Color("#CC2000"),  // vivid crimson
      ];
      const pos = new Float32Array(forms[0]);
      const colBase = new Float32Array(N * 3);  // full-brightness target
      const colAnim = new Float32Array(N * 3);  // written every frame
      const phases = new Float32Array(N);
      const speeds = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const c = ALL_PAL[Math.floor(Math.random() * ALL_PAL.length)];
        colBase[i * 3] = c.r; colBase[i * 3 + 1] = c.g; colBase[i * 3 + 2] = c.b;
        colAnim[i * 3] = c.r; colAnim[i * 3 + 1] = c.g; colAnim[i * 3 + 2] = c.b;
        phases[i] = Math.random() * Math.PI * 2;
        speeds[i] = 6.0 + Math.random() * 9.0; // 6–15 rad/s — fast strobing
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colAnim, 3));
      grp.add(new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.065, sizeAttenuation: true, vertexColors: true,
        transparent: true, opacity: 1.0, depthWrite: false,
        blending: THREE.NormalBlending,
      })));

      // ── Satellite accent dots ──────────────────────────────────────────
      const sN = 52, sPos = new Float32Array(sN * 3);
      const sSeed = Array.from({ length: sN }, () => ({
        r: 2.9 + Math.random() * 1.25, a: Math.random() * Math.PI * 2,
        t: Math.random() * Math.PI * 2, s: 0.14 + Math.random() * 0.34,
      }));
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
      grp.add(new THREE.Points(sGeo, new THREE.PointsMaterial({
        size: 0.10, color: "#8DC63E", transparent: true, opacity: 0.85,
        sizeAttenuation: true, depthWrite: false,
        blending: THREE.NormalBlending,
      })));

      // ── Orbital rings ──────────────────────────────────────────────────
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.011, 6, 150), new THREE.MeshBasicMaterial({ color: "#0E6A78", transparent: true, opacity: 0.50 }));
      ring.rotation.x = Math.PI / 2.3; grp.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.010, 6, 150), new THREE.MeshBasicMaterial({ color: "#8DC63E", transparent: true, opacity: 0.38 }));
      ring2.rotation.x = Math.PI / 1.65; ring2.rotation.y = 0.7; grp.add(ring2);
      const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.4, 0.007, 6, 150), new THREE.MeshBasicMaterial({ color: "#2C8A6E", transparent: true, opacity: 0.28 }));
      ring3.rotation.x = Math.PI / 3.2; ring3.rotation.y = -0.5; grp.add(ring3);

      function resize() {
        const w = canvas!.clientWidth, h = canvas!.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
        grp.position.x = w > 1023 ? (w / h) * 0.90 : 0;
        grp.position.y = w > 1023 ? 0 : -0.2;
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas!);

      // Morph state
      let phaseIdx = 0, nxt = 1, mix = 1, morphing = false, clock = 0;
      let tx = 0, ty = 0, mx = 0, my = 0;
      const t0 = performance.now();

      const onPointer = (e: PointerEvent) => {
        tx = (e.clientY / innerHeight - 0.5) * 0.45;
        ty = (e.clientX / innerWidth - 0.5) * 0.85;
      };
      window.addEventListener("pointermove", onPointer);

      function advance(i: number) {
        if (i === nxt && !morphing) return;
        phaseIdx = nxt; nxt = i; mix = 0; morphing = true; clock = 0;
        setFading(true);
        setTimeout(() => { setPhase(i); setFading(false); }, 220);
      }

      function loop(now: number) {
        if (destroyed) return;
        const el = (now - t0) / 1000;
        clock += 1 / 60;

        if (!morphing && clock > 5.4) {
          phaseIdx = nxt; nxt = (nxt + 1) % 5; mix = 0; morphing = true; clock = 0;
          setFading(true);
          setTimeout(() => { setPhase(nxt); setFading(false); }, 220);
        }
        if (morphing) { mix += 0.0115; if (mix >= 1) { mix = 1; morphing = false; } }

        const e = mix < 0.5 ? 4 * mix * mix * mix : 1 - Math.pow(-2 * mix + 2, 3) / 2;
        const A = forms[phaseIdx], B = forms[nxt], burst = (1 - Math.abs(e - 0.5) * 2);

        // Combined morph + per-particle twinkle in one pass
        for (let i = 0; i < N; i++) {
          const i3 = i * 3;
          const wob = Math.sin(el * 1.15 + i * 0.05) * burst * 0.42;
          pos[i3]     = A[i3]     + (B[i3]     - A[i3])     * e + wob * 0.55;
          pos[i3 + 1] = A[i3 + 1] + (B[i3 + 1] - A[i3 + 1]) * e + wob * 0.42;
          pos[i3 + 2] = A[i3 + 2] + (B[i3 + 2] - A[i3 + 2]) * e + wob * 0.3;
          // Max twinkle: strobe pattern — dim 75% of each cycle, vivid 25%.
          // At 6–15 rad/s each particle fires 2–5 bright flashes per second.
          // With 2500 random phases, ~625 are in mid-flash at any given frame.
          const sv = Math.abs(Math.sin(el * speeds[i] + phases[i]));
          const t = Math.max(0, (sv - 0.75) / 0.25); // only top 25% of sv
          const bright = 0.45 + 0.55 * t;
          colAnim[i3]     = colBase[i3]     * bright;
          colAnim[i3 + 1] = colBase[i3 + 1] * bright;
          colAnim[i3 + 2] = colBase[i3 + 2] * bright;
        }
        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;

        for (let j = 0; j < sN; j++) {
          const s = sSeed[j], ang = s.a + el * s.s;
          sPos[j * 3]     = Math.cos(ang) * s.r;
          sPos[j * 3 + 1] = Math.sin(s.t + el * s.s * 0.7) * s.r * 0.42;
          sPos[j * 3 + 2] = Math.sin(ang) * s.r;
        }
        sGeo.attributes.position.needsUpdate = true;

        mx += (tx - mx) * 0.045; my += (ty - my) * 0.045;
        grp.rotation.y += 0.0017;
        grp.rotation.x = mx + Math.sin(el * 0.33) * 0.05;
        grp.rotation.z = my * 0.11;
        ring.rotation.z += 0.001; ring2.rotation.z -= 0.0007; ring3.rotation.z += 0.0005;
        const sc = 0.74 + Math.sin(el * 0.65) * 0.012;
        grp.scale.set(sc, sc, sc);

        renderer.render(scene, cam);
        rafId = requestAnimationFrame(loop);
      }
      rafId = requestAnimationFrame(loop);

      return () => {
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        renderer.dispose();
      };
    }

    let cleanup: (() => void) | void;
    init().then((fn) => { cleanup = fn; });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-label="An animated three-dimensional particle field that reshapes to represent each TOPSYS capability: data, AI, applications and modernization, cloud, and cybersecurity."
      />
      {/* Phase indicator — bottom-right */}
      <div className="absolute right-8 bottom-8 z-[2] max-[1023px]:static max-[1023px]:mt-5 max-[1023px]:flex max-[1023px]:justify-end">
        <PhaseIndicator phase={phase} fading={fading} />
      </div>
    </div>
  );
}
