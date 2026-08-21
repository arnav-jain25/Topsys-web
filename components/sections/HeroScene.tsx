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
const GX = 30, GY = 14, GZ = 18, N = GX * GY * GZ;

function fData(): number[] {
  const a: number[] = [], sx = 4.6 / GX, sy = 2.9 / GY, sz = 3.4 / GZ;
  for (let i = 0; i < N; i++) {
    const x = i % GX, y = Math.floor(i / GX) % GY, z = Math.floor(i / (GX * GY)) % GZ;
    a.push((x - GX / 2) * sx * 1.35, (y - GY / 2) * sy * 1.5, (z - GZ / 2) * sz * 1.35);
  }
  return a;
}

// Double helix — two intertwined spirals, 3 full turns, slight noise
function fAI(): number[] {
  const a: number[] = [], turns = 3, H = 3.2, R = 1.5;
  for (let i = 0; i < N; i++) {
    const strand = i % 2, t = i / N;
    const angle = t * turns * Math.PI * 2 + strand * Math.PI;
    const y = (t - 0.5) * H;
    a.push(
      Math.cos(angle) * R + (Math.random() - 0.5) * 0.22,
      y + (Math.random() - 0.5) * 0.12,
      Math.sin(angle) * R + (Math.random() - 0.5) * 0.22,
    );
  }
  return a;
}

// Galaxy spiral — 3 arms, particles denser toward centre
function fApps(): number[] {
  const a: number[] = [], arms = 3;
  for (let i = 0; i < N; i++) {
    const arm = i % arms;
    const t = Math.pow(Math.random(), 0.55);
    const angle = (arm / arms) * Math.PI * 2 + t * Math.PI * 3.2;
    const r = t * 3.1;
    const spread = 0.18 + t * 0.55;
    a.push(
      Math.cos(angle) * r + (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * (0.2 + t * 0.5),
      Math.sin(angle) * r + (Math.random() - 0.5) * spread,
    );
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
      cam.position.z = 7.2;

      const renderer = new THREE.WebGLRenderer({ canvas: canvas as HTMLCanvasElement, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const grp = new THREE.Group();
      scene.add(grp);

      // Soft disc texture — makes every particle a round glowing dot instead
      // of the default square. Radial gradient: opaque white centre → transparent
      // edge. Combined with AdditiveBlending this creates natural bloom in clusters.
      const discCanvas = document.createElement("canvas");
      discCanvas.width = 64; discCanvas.height = 64;
      const ctx2d = discCanvas.getContext("2d")!;
      const grad = ctx2d.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0,   "rgba(255,255,255,1)");
      grad.addColorStop(0.35,"rgba(255,255,255,0.85)");
      grad.addColorStop(0.7, "rgba(255,255,255,0.25)");
      grad.addColorStop(1,   "rgba(255,255,255,0)");
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, 64, 64);
      const discTex = new THREE.CanvasTexture(discCanvas);

      // ── Main cloud ─────────────────────────────────────────────────────
      // Base palette: predominantly dark teals so the cloud has real depth and
      // contrast against the paper background. The mass reads as dark → sparkle
      // dots of a contrasting hue register as genuine colour flashes.
      const PALETTE = [
        new THREE.Color("#0B2F38"), new THREE.Color("#0E5A66"),
        new THREE.Color("#0A454E"), new THREE.Color("#196A5A"),
        new THREE.Color("#2C8A6E"), new THREE.Color("#0B2F38"),
        new THREE.Color("#0E5A66"),
      ];
      const pos = new Float32Array(forms[0]);
      const colMain = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        colMain[i * 3] = c.r; colMain[i * 3 + 1] = c.g; colMain[i * 3 + 2] = c.b;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colMain, 3));
      grp.add(new THREE.Points(geo, new THREE.PointsMaterial({
        size: 0.036, sizeAttenuation: true, vertexColors: true,
        transparent: true, opacity: 0.82, depthWrite: false,
        blending: THREE.NormalBlending, map: discTex, alphaTest: 0.01,
      })));

      // ── Sparkle layer ──────────────────────────────────────────────────
      // Every 8th particle becomes a larger glowing disc whose brightness
      // is animated per-particle each frame (different phase offsets) for
      // true per-dot twinkle. NormalBlending on a light bg: we animate
      // the colour toward white for the "shine" rather than adding light.
      const sparkN = Math.floor(N / 8);
      const sparkPos = new Float32Array(sparkN * 3);
      const sparkBaseCol = new Float32Array(sparkN * 3);
      const sparkCol = new Float32Array(sparkN * 3);
      // Sparkle palette: service icon colours — amber, blue, burgundy, olive.
      // Contrasting warm/cool hues against the teal base create colour-flash
      // glitter as each dot animates between dim and peak independently.
      const SPARK_PAL = [
        new THREE.Color("#B5790C"), // amber — Apps icon
        new THREE.Color("#1E6FA8"), // blue  — Cloud icon
        new THREE.Color("#9C3159"), // burgundy — Security icon
        new THREE.Color("#5F7A2E"), // olive — Talent icon
        new THREE.Color("#B5790C"), // amber again for weight
      ];
      for (let k = 0; k < sparkN; k++) {
        const c = SPARK_PAL[k % SPARK_PAL.length];
        sparkBaseCol[k * 3] = c.r; sparkBaseCol[k * 3 + 1] = c.g; sparkBaseCol[k * 3 + 2] = c.b;
        sparkCol[k * 3] = c.r; sparkCol[k * 3 + 1] = c.g; sparkCol[k * 3 + 2] = c.b;
        // Init positions from forms[0] so static / reduced-motion frame is correct
        const src = (k * 8) * 3;
        sparkPos[k * 3] = forms[0][src]; sparkPos[k * 3 + 1] = forms[0][src + 1]; sparkPos[k * 3 + 2] = forms[0][src + 2];
      }
      const sparkGeo = new THREE.BufferGeometry();
      sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
      sparkGeo.setAttribute("color", new THREE.BufferAttribute(sparkCol, 3));
      grp.add(new THREE.Points(sparkGeo, new THREE.PointsMaterial({
        size: 0.072, sizeAttenuation: true, vertexColors: true,
        transparent: true, opacity: 1.0, depthWrite: false,
        blending: THREE.NormalBlending, map: discTex, alphaTest: 0.01,
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
        blending: THREE.NormalBlending, map: discTex, alphaTest: 0.01,
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

        // Sparkle: extract every-8th particle position, animate brightness
        for (let k = 0; k < sparkN; k++) {
          const src = (k * 8) * 3;
          sparkPos[k * 3]     = pos[src];
          sparkPos[k * 3 + 1] = pos[src + 1];
          sparkPos[k * 3 + 2] = pos[src + 2];
          // Squared sine → long dim phase, brief bright flash = glitter cadence
          const s = Math.abs(Math.sin(el * 2.4 + k * 0.37));
          const bright = s * s;
          sparkCol[k * 3]     = sparkBaseCol[k * 3]     * bright;
          sparkCol[k * 3 + 1] = sparkBaseCol[k * 3 + 1] * bright;
          sparkCol[k * 3 + 2] = sparkBaseCol[k * 3 + 2] * bright;
        }
        sparkGeo.attributes.position.needsUpdate = true;
        sparkGeo.attributes.color.needsUpdate = true;

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
