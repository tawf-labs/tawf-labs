import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CONTAINER = 'max-w-7xl mx-auto px-6';

/* ---------- Grayscale palette (no hue anywhere) ---------- */
export const INK = '#0a0a0a';
export const ACC = '#0a0a0a';
export const ACC_DARK = '#000000';
export const ACC_SOFT = 'rgba(0,0,0,.07)';
export const MUTED2 = '#666666';
export const LINE2 = '#e5e5e5';
export const LINE_STRONG = '#d4d4d4';
export const TILE = '#f5f5f5';
export const TILE_LINE = '#e5e5e5';

/* Tawf mark (masjid "A"), traced from the original logo so no image file is needed. */
export const MARK_D = 'M255.8 350.2L253.0 349.9L252.8 312.2C252.5 220.3 252.3 211.9 250.5 205.0C248.2 196.0 243.5 187.6 238.1 182.9C235.1 180.2 233.5 178.0 233.4 176.2C233.3 174.7 233.2 153.8 233.1 129.7L233.0 86.0L159.2 86.2L85.5 86.5L85.2 135.3L84.9 184.1L81.5 189.1C79.7 191.8 77.1 196.6 75.8 199.8L73.5 205.5L73.2 277.8L72.9 350.0L40.5 350.0L8.0 350.0L7.8 221.8C7.4 53.4 7.3 62.7 9.4 55.5C11.3 49.0 17.9 35.4 21.6 30.4C26.4 23.9 42.4 14.7 55.0 11.3C61.1 9.6 68.1 9.5 159.5 9.8C263.7 10.1 263.7 10.1 274.8 15.1C289.3 21.6 297.8 30.0 304.7 44.5C311.2 58.4 311.0 50.9 311.0 207.4C311.0 285.4 310.8 349.6 310.4 349.9C309.8 350.5 260.8 350.8 255.8 350.2ZM84.7 349.4C84.3 349.0 84.0 329.3 84.0 305.6L84.0 262.5L90.9 255.9L97.9 249.3L93.8 244.4C80.7 228.7 80.9 212.9 94.3 192.8L100.5 183.6L119.1 171.0C139.2 157.5 150.0 149.5 158.0 142.3L163.1 137.7L172.3 146.7C178.8 153.0 184.8 157.6 192.5 162.3C209.0 172.2 222.6 182.4 228.9 189.7C234.3 196.0 239.8 207.1 241.0 214.2C242.5 224.0 238.5 237.2 231.4 245.5C230.1 247.0 229.0 248.5 229.0 248.7C229.0 248.9 232.0 252.0 235.6 255.4L242.3 261.8L241.6 305.1C241.3 329.0 241.0 348.8 241.0 349.3C241.0 349.7 232.8 349.9 222.8 349.8L204.5 349.5L204.0 317.5L203.5 285.5L200.9 280.5C197.8 274.8 189.8 266.8 181.9 261.7C175.0 257.2 166.3 248.3 165.5 244.8C164.6 241.3 163.6 241.3 161.3 244.6C157.1 250.7 149.4 258.1 145.1 260.1C139.5 262.8 126.6 276.4 123.6 282.9C121.7 287.2 121.5 289.8 121.0 318.5L120.5 349.5L102.9 349.8C93.3 349.9 85.1 349.7 84.7 349.4ZM158.0 132.9C152.4 130.7 146.7 123.3 145.1 116.1C143.4 108.4 147.7 101.8 157.7 96.6C162.4 94.2 162.8 94.6 159.3 98.2C153.6 104.2 152.1 107.6 153.1 112.2C154.9 120.1 158.6 124.5 165.9 127.6C170.8 129.7 173.2 129.3 177.8 126.0C183.5 121.9 183.3 124.5 177.5 129.9C173.2 133.8 172.8 134.0 166.8 133.9C163.3 133.9 159.4 133.4 158.0 132.9Z';

export function Logo({ size = 28, color = INK, className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 319 360" className={className} aria-hidden="true">
      <path d={MARK_D} fill={color} fillRule="evenodd" />
    </svg>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
  y = 20,
  blur = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  key?: React.Key;
  y?: number;
  blur?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(6px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px', amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`transform-gpu ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function Kick({ children, className = '', light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  const c = light ? '#fff' : ACC;
  return (
    <p className={`mb-[18px] inline-flex items-center gap-2.5 text-sm font-medium ${className}`} style={{ color: c }}>
      <span className="size-[7px] rounded-full" style={{ background: c }} />
      {children}
    </p>
  );
}

export function Lnk({ href, children }: { href: string; children: React.ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-block border-b pb-[3px] text-[14.5px] font-medium text-[#0a0a0a] no-underline transition-colors hover:border-[#0a0a0a]"
      style={{ borderColor: LINE_STRONG }}
    >
      {children}
    </a>
  );
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
