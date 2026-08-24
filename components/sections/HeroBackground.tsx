"use client";

// Infrastructure topology hero background.
// Pure SVG + CSS animations — no canvas, no JS runtime loop.
// prefers-reduced-motion: paths draw instantly, pulses freeze.

const NODES = [
  { id: 0,  x: 720,  y: 190, r: 4.5 },
  { id: 1,  x: 900,  y: 115, r: 4   },
  { id: 2,  x: 1055, y: 75,  r: 4   },
  { id: 3,  x: 1165, y: 200, r: 5   },
  { id: 4,  x: 955,  y: 305, r: 7.5 }, // main hub
  { id: 5,  x: 1285, y: 155, r: 4   },
  { id: 6,  x: 1385, y: 295, r: 4.5 },
  { id: 7,  x: 1205, y: 385, r: 5   },
  { id: 8,  x: 1105, y: 505, r: 4.5 },
  { id: 9,  x: 950,  y: 525, r: 4.5 },
  { id: 10, x: 800,  y: 445, r: 4   },
  { id: 11, x: 1385, y: 505, r: 4   },
  { id: 12, x: 1265, y: 585, r: 4   },
  { id: 13, x: 1065, y: 645, r: 4   },
];

type Edge = [number, number, boolean]; // [a, b, featured]
const EDGES: Edge[] = [
  [0,  1,  false], [0,  4,  true ],  [0,  10, false],
  [1,  2,  false], [1,  4,  false],
  [2,  3,  false], [2,  5,  false],
  [3,  4,  true ], [3,  5,  false], [3, 7, true],
  [4,  7,  false], [4,  9,  false],
  [5,  6,  false],
  [6,  7,  false], [6,  11, false],
  [7,  8,  false], [7,  11, false],
  [8,  9,  false], [8,  13, false],
  [9,  10, true ], [9,  13, false],
  [11, 12, false],
  [12, 13, false],
  [10, 13, false],
];

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Deep base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(145deg,#041A20 0%,#06232A 40%,#092B34 70%,#06232A 100%)" }}
      />

      {/* SVG topology */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <pattern id="hbg-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.032)" strokeWidth="0.5" />
          </pattern>

          <linearGradient id="hbg-sig" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0E5A66" />
            <stop offset="55%"  stopColor="#2C8A6E" />
            <stop offset="100%" stopColor="#8DC63E" />
          </linearGradient>

          <filter id="hbg-glow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="hbg-blob" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="52" />
          </filter>
        </defs>

        {/* Fine technical grid */}
        <rect width="1600" height="900" fill="url(#hbg-grid)" />

        {/* Ambient depth — blurred colour blobs behind the topology */}
        <g filter="url(#hbg-blob)" opacity="1">
          <circle cx={955}  cy={305} r={150} fill="rgba(14,90,102,0.22)" />
          <circle cx={1210} cy={175} r={100} fill="rgba(14,90,102,0.16)" />
          <circle cx={1310} cy={510} r={115} fill="rgba(44,138,110,0.13)" />
          <circle cx={820}  cy={480} r={90}  fill="rgba(14,90,102,0.10)" />
        </g>

        {/* Edges */}
        {EDGES.map(([a, b, featured], i) => {
          const na = NODES[a], nb = NODES[b];
          const fwd = `M ${na.x} ${na.y} L ${nb.x} ${nb.y}`;
          const rev = `M ${nb.x} ${nb.y} L ${na.x} ${na.y}`;
          return (
            <g key={i}>
              {/* Trace-in path */}
              <path
                d={fwd}
                pathLength="1"
                fill="none"
                stroke={featured ? "url(#hbg-sig)" : "rgba(14,90,102,0.28)"}
                strokeWidth={featured ? 1.5 : 0.9}
                strokeDasharray="1"
                className="hbg-edge"
                style={{
                  strokeDashoffset: 1,
                  animationName: "hbg-trace",
                  animationDuration: "1.1s",
                  animationDelay: `${i * 85}ms`,
                  animationTimingFunction: "cubic-bezier(.2,0,0,1)",
                  animationFillMode: "forwards",
                }}
              />
              {/* Forward flow dot */}
              <circle r={featured ? 2.2 : 1.5} fill={featured ? "#8DC63E" : "rgba(44,138,110,0.8)"} opacity={featured ? 0.9 : 0.7}>
                <animateMotion
                  dur={`${2.8 + (i % 5) * 0.55}s`}
                  begin={`${-(i * 0.38)}s`}
                  repeatCount="indefinite"
                  path={fwd}
                />
              </circle>
              {/* Reverse dot — every third edge */}
              {i % 3 === 0 && (
                <circle r="1.2" fill="rgba(14,90,102,0.55)" opacity="0.6">
                  <animateMotion
                    dur={`${3.6 + (i % 4) * 0.4}s`}
                    begin={`${-(i * 0.55 + 1.1)}s`}
                    repeatCount="indefinite"
                    path={rev}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map(({ id, x, y, r }) => {
          const isHub = id === 4;
          return (
            <g key={id} filter="url(#hbg-glow)">
              {/* Outer halo */}
              <circle cx={x} cy={y} r={r * 4.5} fill={`rgba(14,90,102,${isHub ? 0.09 : 0.05})`} />
              {/* Mid ring */}
              <circle cx={x} cy={y} r={r * 2.2}  fill={`rgba(14,90,102,${isHub ? 0.20 : 0.13})`} />
              {/* Core dot */}
              <circle
                cx={x} cy={y} r={r}
                fill={isHub ? "#8DC63E" : "#0E5A66"}
                className="hbg-node"
                style={{
                  animationName: "hbg-pulse",
                  animationDuration: `${2.2 + (id % 4) * 0.65}s`,
                  animationDelay: `${id * 180}ms`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Left vignette — keeps copy legible over the topology */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: "62%",
          background: "linear-gradient(90deg,rgba(6,35,42,0.92) 0%,rgba(6,35,42,0.68) 62%,transparent 100%)",
        }}
      />
    </div>
  );
}
