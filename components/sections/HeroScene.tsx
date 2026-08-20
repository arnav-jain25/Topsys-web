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
const GX = 20, GY = 10, GZ = 14, N = GX * GY * GZ;

function fData(): number[] {
  const a: number[] = [], sx = 4.6 / GX, sy = 2.9 / GY, sz = 3.4 / GZ;
  for (let i = 0; i < N; i++) {
    const x = i % GX, y = Math.floor(i / GX) % GY, z = Math.floor(i / (GX * GY)) % GZ;
    a.push((x - GX / 2) * sx * 1.35, (y - GY / 2) * sy * 1.5, (z - GZ / 2) * sz * 1.35);
  }
  return a;
}

function fAI(): number[] {
  const a: number[] = [], C: number[][] = [], ga = Math.PI * (3 - Math.sqrt(5));
  for (let k = 0; k < 8; k++) {
    const y = 1 - (k / 7) * 2, r = Math.sqrt(Math.max(0, 1 - y * y)), th = ga * k;
    C.push([Math.cos(th) * r * 2.0, y * 1.7, Math.sin(th) * r * 2.0]);
  }
  for (let i = 0; i < N; i++) {
    const c = C[i % 8], s = 0.62;
    a.push(
      c[0] + (Math.random() + Math.random() + Math.random() - 1.5) * s,
      c[1] + (Math.random() + Math.random() + Math.random() - 1.5) * s,
      c[2] + (Math.random() + Math.random() + Math.random() - 1.5) * s,
    );
  }
  return a;
}

function fApps(): number[] {
  const a: number[] = [], M = 6, per = Math.ceil(N / M);
  for (let i = 0; i < N; i++) {
    const m = Math.floor(i / per) % M, ang = (m / M) * Math.PI * 2;
    const ox = Math.cos(ang) * 2.05, oz = Math.sin(ang) * 2.05, oy = m % 2 ? 0.55 : -0.55;
    a.push(ox + (Math.random() - 0.5) * 1.15, oy + (Math.random() - 0.5) * 1.5, oz + (Math.random() - 0.5) * 1.15);
  }
  return a;
}

function fCloud(): number[] {
  const a: number[] = [], L = [-1.75, -0.6, 0.6, 1.75], per = Math.ceil(N / 4);
  for (let i = 0; i < N; i++) {
    const l = L[Math.floor(i / per) % 4], r = Math.sqrt(Math.random()) * (2.9 - Math.abs(l) * 0.42), t = Math.random() * Math.PI * 2;
    a.push(Math.cos(t) * r, l + (Math.random() - 0.5) * 0.16, Math.sin(t) * r);
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
  const reducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

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
      cam.position.z = 8.6;

      const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const grp = new THREE.Group();
      scene.add(grp);

      // Main particle cloud
      const pos = new Float32Array(forms[0]);
      const col = new Float32Array(N * 3);
      const cA = new THREE.Color("#0E5A66"), cB = new THREE.Color("#2C8A6E"), cC = new THREE.Color("#8DC63E");
      const tmp = new THREE.Color();
      for (let i = 0; i < N; i++) {
        const t = i / N;
        tmp.copy(t < 0.6 ? cA.clone().lerp(cB, t / 0.6) : cB.clone().lerp(cC, (t - 0.6) / 0.4));
        col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      grp.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.05, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.93, depthWrite: false })));

      // Satellite points
      const sN = 52, sPos = new Float32Array(sN * 3);
      const sSeed = Array.from({ length: sN }, () => ({
        r: 2.9 + Math.random() * 1.25, a: Math.random() * Math.PI * 2,
        t: Math.random() * Math.PI * 2, s: 0.14 + Math.random() * 0.34,
      }));
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
      grp.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ size: 0.105, color: "#8DC63E", transparent: true, opacity: 0.8, sizeAttenuation: true, depthWrite: false })));

      // Orbital rings
      const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.005, 6, 150), new THREE.MeshBasicMaterial({ color: "#0E5A66", transparent: true, opacity: 0.3 }));
      ring.rotation.x = Math.PI / 2.3; grp.add(ring);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.9, 0.004, 6, 150), new THREE.MeshBasicMaterial({ color: "#8DC63E", transparent: true, opacity: 0.18 }));
      ring2.rotation.x = Math.PI / 1.65; ring2.rotation.y = 0.7; grp.add(ring2);

      function resize() {
        const w = canvas!.clientWidth, h = canvas!.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
        grp.position.x = w > 1023 ? (w / h) * 1.3 : 0;
        grp.position.y = w > 1023 ? 0 : -0.2;
      }
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas!);

      // Static frame for reduced-motion
      if (reducedMotion) {
        const f = forms[0];
        for (let k = 0; k < pos.length; k++) pos[k] = f[k];
        geo.attributes.position.needsUpdate = true;
        grp.rotation.set(0.28, 0.5, 0);
        renderer.render(scene, cam);
        return () => { ro.disconnect(); renderer.dispose(); };
      }

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

        for (let i = 0; i < N; i++) {
          const i3 = i * 3;
          const wob = Math.sin(el * 1.15 + i * 0.05) * burst * 0.42;
          pos[i3]     = A[i3]     + (B[i3]     - A[i3])     * e + wob * 0.55;
          pos[i3 + 1] = A[i3 + 1] + (B[i3 + 1] - A[i3 + 1]) * e + wob * 0.42;
          pos[i3 + 2] = A[i3 + 2] + (B[i3 + 2] - A[i3 + 2]) * e + wob * 0.3;
        }
        geo.attributes.position.needsUpdate = true;

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
        ring.rotation.z += 0.001; ring2.rotation.z -= 0.0007;
        const sc = 1 + Math.sin(el * 0.65) * 0.016;
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
        className={`absolute inset-0 w-full h-full ${reducedMotion ? "opacity-100" : ""}`}
        style={{ opacity: reducedMotion ? 1 : undefined }}
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
