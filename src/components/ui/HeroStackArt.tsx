import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { MARK_D } from '../landing/landingCommon';

/* Grayscale only: the two products are told apart by tone, not hue. */
const FINANCE = '#0a0a0a';    // black      → tawf.finance
const FOUNDATION = '#7a7a7a'; // mid gray   → tawf.foundation
const TRUNK = '#3a3a3a';      // dark gray  → trunk entering the stack
const INK = '#0a0a0a';

const MARK_T = `translate(27.819 27.819) rotate(45) scale(${32 / 341}) translate(-159.0 -179.5)`;

const PLANE = 'matrix(.86604 -.49997 .86604 .49997 -544.675 288.843)';

const T = { paths: 0.25, discs: 1.7, pills: 1.95, stack: 2.5 };

const GRID = [
  ...Array.from({ length: 25 }, (_, k) => `M0 ${200 + 44 * k} L620 ${-158 + 44 * k}`),
  ...Array.from({ length: 30 }, (_, k) => `M0 ${-400 + 44 * k} L620 ${-42 + 44 * k}`)
].join(' ');

/* Geometry: everything derives from these so paths and blocks always connect.
 * Stack = straight box; right side (label) has length A, narrow left side has length B. */
const SPAN = 355;
const B = 165;
const A = SPAN - B;
const AX = 0.866 * A, AY = 0.5 * A, BX = 0.866 * B, BY = 0.5 * B;
const BACK = 30;
const O = { x: 276.75, y: 385 };
const F0 = { x: O.x + BX, y: 457.5 + BY };
const F = { x: F0.x + 0.866 * BACK, y: F0.y - 0.5 * BACK };
const ISO_T = `matrix(.86604 -.49997 .86604 .49997 ${O.x} ${O.y})`;
const iso = (x: number, c: number) => ({ X: O.x + 0.866 * (x + c), Y: O.y - 0.5 * x + 0.5 * c });
const bigAt = (x: number, c: number) => { const p = iso(x, c); return { x: p.X - 288.3, y: p.Y - 315.1 }; };
const smallAt = (x: number, c: number) => { const p = iso(x, c); return { x: p.X - 153.9, y: p.Y - 300.7 }; };

const LINES = [
  { d: `M-350 0 H${3 + BACK}`, color: TRUNK, delay: T.paths },
  { d: 'M-350 39 H-143 Q-125 39 -125 21 V0', color: FINANCE, delay: T.paths + 0.2 },
  { d: 'M-350 116 H-88 Q-70 116 -70 98 V0', color: FOUNDATION, delay: T.paths + 0.35 },
  { d: `M-215 0 V-19 Q-215 -37 -197 -37 H${40 + BACK}`, color: INK, delay: T.paths + 0.55 }
];
const PILLS = [
  { c: 39, x: -285, w: 106, label: 'tawf.finance', color: FINANCE, ink: FINANCE, delay: T.pills },
  { c: 116, x: -230, w: 126, label: 'tawf.foundation', color: FOUNDATION, ink: '#4d4d4d', delay: T.pills + 0.15 }
];

const fade = (delay = 0, duration = 0.8): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, delay } }
});

const draw = (delay: number, duration = 1.2): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, delay, ease: 'easeInOut' },
      opacity: { duration: 0.01, delay }
    }
  }
});

const pop = (delay: number): Variants => ({
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } }
});

const drop = (i: number): Variants => ({
  hidden: { opacity: 0, y: -56 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.25, delay: T.stack + i * 0.16 },
      y: { type: 'spring', stiffness: 150, damping: 17, delay: T.stack + i * 0.16 }
    }
  }
});

/* Ring (base) is drawn FIRST so it never covers the disc body. */
function BigDisc({ color, x = 0, y = 0, k = 1, badge = false, delay }: {
  color: string; x?: number; y?: number; k?: number; badge?: boolean; delay: number;
}) {
  const s = { stroke: color, strokeLinejoin: 'round' as const, strokeWidth: 1.722 };
  return (
    <motion.g variants={pop(delay)}>
      <g transform={`translate(${x + 288.3 * (1 - k)} ${y + 315.1 * (1 - k)}) scale(${k})`}>
        <g transform="matrix(.86604 -.49997 .86604 .49997 240.129 315.089)">
          <circle cx="27.819" cy="27.819" r="26.959" fill="#fff" {...s} />
        </g>
        <path fill="#fff" d="M311.867 310.191c6.498 3.751 9.747 8.667 9.748 13.584s-3.249 9.835-9.748 13.587c-12.997 7.504-34.069 7.504-47.066 0-6.497-3.751-9.746-8.667-9.747-13.584s3.248-9.835 9.747-13.587c12.997-7.503 34.069-7.503 47.066 0" />
        <path fill="#fff" {...s} d="M311.867 301.583c-12.997-7.503-34.069-7.503-47.066 0v8.608c12.997-7.503 34.069-7.503 47.066 0z" />
        <path fill="#fff" {...s} d="M321.615 315.167c-.001-4.917-3.25-9.833-9.748-13.584v8.608c6.498 3.751 9.747 8.667 9.748 13.583z" />
        <path fill="#fff" d="M264.801 301.583c-6.499 3.752-9.748 8.67-9.747 13.588v8.603c.001-4.916 3.25-9.832 9.747-13.583z" />
        <path fill="none" {...s} d="M255.054 315.171c-.001-4.918 3.248-9.836 9.747-13.588v8.608c-6.499 3.752-9.748 8.669-9.747 13.587z" />
        <path fill={color} d="M311.867 328.755c6.498-3.752 9.747-8.668 9.748-13.584v8.604c.001 4.917-3.249 9.835-9.748 13.587z" />
        <path fill="none" {...s} d="M321.615 315.167c.001 4.918-3.249 9.835-9.748 13.588v8.607c6.499-3.752 9.749-8.67 9.748-13.587z" />
        <path fill={color} {...s} d="M255.054 315.171c.001 4.916 3.25 9.833 9.747 13.584v8.607c-6.497-3.751-9.746-8.667-9.747-13.584z" />
        <path fill={color} {...s} d="M264.801 328.755c12.997 7.503 34.069 7.503 47.066 0v8.607c-12.997 7.504-34.069 7.504-47.066 0z" />
        {badge && (
          <g transform="matrix(.86604 -.49997 .86604 .49997 240.129 315.089)">
            <circle cx="27.819" cy="27.819" r="24" fill={color} />
            <path d={MARK_D} fill="#fff" fillRule="evenodd" transform={MARK_T} />
          </g>
        )}
      </g>
    </motion.g>
  );
}

function SmallDisc({ color, x = 0, y = 0, k = 1, delay }: { color: string; x?: number; y?: number; k?: number; delay: number }) {
  const s = { stroke: color, strokeLinejoin: 'round' as const, strokeWidth: 1.148 * k };
  return (
    <motion.g variants={pop(delay)}>
      <g transform={`translate(${x} ${y}) translate(146.9 305) scale(${k}) translate(-146.9 -305)`}>
        <circle cx="9.442" cy="9.442" r="8.868" fill="#fff" {...s} transform="matrix(.87107 -.49116 .87107 .49116 137.44 300.688)" />
        <path fill="#fff" d="M161.93 299.053c2.218 1.251 3.328 2.89 3.328 4.529 0 1.64-1.109 3.28-3.328 4.531-4.437 2.502-11.63 2.502-16.067 0-2.218-1.251-3.328-2.89-3.328-4.529 0-1.64 1.109-3.28 3.328-4.531 4.437-2.502 11.63-2.502 16.067 0" />
        <path fill="#fff" {...s} d="M161.93 296.184c-4.437-2.502-11.63-2.502-16.067 0v2.87c4.437-2.502 11.63-2.502 16.067 0zM165.258 300.714c0-1.639-1.11-3.279-3.328-4.529v2.87c2.218 1.25 3.328 2.89 3.328 4.529z" />
        <path fill="#fff" d="M145.863 296.185c-2.219 1.251-3.328 2.89-3.328 4.53v2.869c0-1.639 1.11-3.279 3.328-4.529z" />
        <path fill="none" {...s} d="M142.535 300.715c0-1.64 1.109-3.279 3.328-4.53v2.87c-2.219 1.251-3.328 2.89-3.328 4.53z" />
        <path fill={color} d="M161.93 305.244c2.218-1.25 3.328-2.89 3.328-4.529v2.869c0 1.64-1.109 3.279-3.328 4.53z" />
        <path fill="none" {...s} d="M165.258 300.714c0 1.64-1.109 3.279-3.328 4.53v2.87c2.219-1.251 3.328-2.89 3.328-4.53z" />
        <path fill={color} d="M142.535 300.714c.001 1.639 1.11 3.278 3.328 4.529v2.87c-2.218-1.251-3.328-2.89-3.328-4.529z" />
        <path fill="none" {...s} d="M145.863 305.243c-2.218-1.251-3.328-2.89-3.328-4.529v2.87c0 1.639 1.11 3.278 3.328 4.529z" />
        <path fill={color} {...s} d="M145.863 305.243c4.437 2.502 11.63 2.502 16.067 0v2.87c-4.437 2.502-11.63 2.502-16.067 0z" />
      </g>
    </motion.g>
  );
}

const LAYERS = [
  { label: 'On-chain ledger', z0: 0, z1: 26, fills: ['#262626', '#141414', '#4a4a4a'], ink: '#e5e5e5', size: 12 },
  { label: 'Tawf Core', z0: 30, z1: 126, fills: ['#0a0a0a', '#000000', '#2b2b2b'], ink: '#fff', size: 27, side: true },
  { label: 'Sharia compliance', z0: 130, z1: 170, fills: ['#e2e2e2', '#cfcfcf', '#f4f4f4'], ink: '#171717', size: 15 },
  { label: 'Tawf ID', z0: 174, z1: 214, fills: ['#efefef', '#dcdcdc', '#fafafa'], ink: '#171717', size: 15 },
  { label: 'Audit & reporting', z0: 218, z1: 258, fills: ['#d6d6d6', '#c2c2c2', '#ececec'], ink: '#171717', size: 13 }
].map((l) => {
  const { x, y } = F;
  const F0 = [x, y - l.z0], F1 = [x, y - l.z1];
  const L0 = [x - BX, y - BY - l.z0], L1 = [x - BX, y - BY - l.z1];
  const R0 = [x + AX, y - AY - l.z0], R1 = [x + AX, y - AY - l.z1];
  const T1 = [x + AX - BX, y - AY - BY - l.z1];
  return { ...l, h: l.z1 - l.z0, F1, L1, polys: [[F0, L0, L1, F1], [F0, R0, R1, F1], [F1, L1, T1, R1]], edge: [L1, F1, R1] };
});
const pts = (p: number[][]) => p.map((q) => q.join(',')).join(' ');
const SHADOW = pts([[F.x - 12, F.y + 22], [F.x - BX - 12, F.y - BY + 22], [F.x + AX - BX - 12, F.y - AY - BY + 22], [F.x + AX - 12, F.y - AY + 22]]);

export default function HeroStackArt() {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      className="w-full overflow-visible"
      viewBox="0 0 620 600"
      role="img"
      aria-label="Illustration: Tawf Foundation and Tawf Finance flow into one shared infrastructure stack: on-chain ledger, core, Sharia compliance, Tawf ID, and audit and reporting."
      initial={reduce ? false : 'hidden'}
      animate="show"
    >
      <defs>
        <radialGradient id="hero-fade" cx="340" cy="470" r="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-wash" cx="420" cy="300" r="320" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" stopOpacity=".08" />
          <stop offset=".6" stopColor="#000" stopOpacity=".03" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-floor"><rect width="620" height="600" fill="url(#hero-fade)" /></mask>
        <pattern id="hero-plane-b" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 0h32v32H0z" fill="none" stroke="#e5e5e5" strokeWidth="0.696" />
        </pattern>
        <linearGradient id="hero-lead-g" gradientUnits="userSpaceOnUse" x1="-350" x2="-290" y1="0" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id="hero-lead" maskUnits="userSpaceOnUse" x="-500" y="-300" width="1000" height="800">
          <rect x="-500" y="-300" width="1000" height="800" fill="url(#hero-lead-g)" />
        </mask>
      </defs>

      {/* 1: grid + wash */}
      <motion.g variants={fade(0, 0.9)}>
        <g mask="url(#hero-floor)">
          <path d={GRID} stroke="#e5e5e5" strokeWidth="1" fill="none" />
          <path fill="url(#hero-wash)" d="M0 0h1395.3v1453.54H0z" transform={PLANE} />
          <path fill="url(#hero-plane-b)" opacity=".9" d="M0 0h1395.3v1453.54H0z" transform={PLANE} />
        </g>
      </motion.g>

      {/* 2: paths first, all ending at the stack's left edge */}
      <g transform={ISO_T} mask="url(#hero-lead)">
        {LINES.map((l) => (
          <motion.path key={l.d} variants={draw(l.delay)} stroke={l.color} strokeWidth="2.8" fill="none" d={l.d} />
        ))}
      </g>

      {/* 3: discs + pills, top of screen to bottom */}
      <SmallDisc color={TRUNK} k={1.25} delay={T.discs + 0.05} {...smallAt(-215, 0)} />
      <SmallDisc color={TRUNK} k={1.25} delay={T.discs + 0.1} {...smallAt(-125, 0)} />
      <SmallDisc color={TRUNK} k={1.25} delay={T.discs + 0.15} {...smallAt(-70, 0)} />
      <BigDisc color={FINANCE} badge k={1.4} delay={T.discs + 0.1} {...bigAt(-330, 39)} />
      <BigDisc color={FOUNDATION} badge k={1.4} delay={T.discs + 0.2} {...bigAt(-275, 116)} />
      {PILLS.map((p) => (
        <motion.g key={p.label} variants={pop(p.delay)}>
          <g transform={ISO_T}>
            <rect x={p.x} y={p.c - 11} width={p.w} height={22} rx={11} fill="#fff" stroke={p.color} strokeWidth="1.3" />
            <text x={p.x + p.w / 2} y={p.c + 5} textAnchor="middle" fontSize="13.5" fontWeight="500" fill={p.ink}>{p.label}</text>
          </g>
        </motion.g>
      ))}

      {/* 4: stack last: shadow, then layers drop bottom to top */}
      <motion.polygon variants={fade(T.stack, 0.6)} points={SHADOW} fill="rgba(0,0,0,.07)" />
      {LAYERS.map((l, i) => (
        <motion.g key={l.label} variants={drop(i)}>
          {l.polys.map((poly, j) => <polygon key={j} points={pts(poly)} fill={l.fills[j]} />)}
          <polyline points={pts(l.edge)} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1" />
          <g transform={`matrix(.866 -.5 0 1 ${l.F1[0]} ${l.F1[1]})`}>
            <text x={16} y={l.h / 2 + l.size * 0.35} fontSize={l.size} fontWeight="600" fill={l.ink} letterSpacing="-.01em">{l.label}</text>
          </g>
          {l.side && (
            <g transform={`matrix(.866 .5 0 1 ${l.L1[0]} ${l.L1[1]})`}>
              <text x={10} y={l.h / 2 + 4} fontSize="11" fontWeight="500" fill="#fff" fillOpacity=".85">Sharia by design</text>
            </g>
          )}
        </motion.g>
      ))}
    </motion.svg>
  );
}
