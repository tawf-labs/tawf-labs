import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CONTAINER, Reveal, Kick, Lnk, ACC, ACC_SOFT, MUTED2, LINE2, TILE, TILE_LINE, usePrefersReducedMotion } from './landingCommon';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Rise({ on, delay = 0, className, children }: { on: boolean; delay?: number; className?: string; children: React.ReactNode; key?: React.Key }) {
  const reduce = usePrefersReducedMotion();
  return (
    <div
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(10px)',
        transition: reduce ? 'none' : `opacity .5s ease ${on ? delay : 0}ms, transform .5s cubic-bezier(.2,.7,.2,1) ${on ? delay : 0}ms`,
      }}
    >
      {children}
    </div>
  );
}

function VisualHead({ title, badge, on }: { title: string; badge: string; on: boolean }) {
  return (
    <Rise on={on} className="mb-4 flex items-center justify-between">
      <b className="text-[14px] font-semibold text-[#0a0a0a]">{title}</b>
      <span className="rounded-full bg-[#0a0a0a]/[.08] px-2 py-1 font-mono text-[11px] font-medium text-[#0a0a0a]">{badge}</span>
    </Rise>
  );
}

/* ------------------------------------------------------------------ */
/* Per-product previews                                                */
/* ------------------------------------------------------------------ */

function FoundationVisual({ on }: { on: boolean }) {
  const reduce = usePrefersReducedMotion();
  const rows = [
    ['zakat.received', '0x7a3…e91'],
    ['receipt.minted', '0x1c8…b20'],
    ['funds.allocated', '0x52e…9d3'],
  ];
  const yields = [8, 16, 26, 38, 50, 62];
  return (
    <div>
      <VisualHead title="Foundation ledger" badge="Live" on={on} />
      <div className="grid gap-2">
        {rows.map(([name, hash], i) => (
          <Rise key={name} on={on} delay={100 + i * 90} className="flex items-center gap-3 rounded-[10px] border border-[#e5e5e5] bg-white px-3.5 py-2.5 font-mono text-xs">
            <b className="font-medium text-[#0a0a0a]">{name}</b>
            <span className="text-[#666666]">{hash}</span>
            <CheckCircle2 className="ml-auto size-3.5 shrink-0 text-[#0a0a0a]" />
          </Rise>
        ))}
      </div>
      <Rise on={on} delay={420} className="mt-3 rounded-[10px] border border-dashed border-[#d4d4d4] bg-[#fafafa] p-3">
        <div className="flex items-center justify-between text-[11px] text-[#666666]">
          <span>Waqf principal vs yield</span>
          <span className="font-mono">preserved</span>
        </div>
        <div className="mt-2.5 flex h-[56px] items-end gap-1.5">
          {yields.map((h, i) => (
            <span
              key={i}
              className="block flex-1 origin-bottom rounded-t-sm bg-[#0a0a0a]"
              style={{
                height: `${h}%`,
                opacity: 0.25 + i * 0.15,
                transform: on ? 'scaleY(1)' : 'scaleY(0)',
                transition: reduce ? 'none' : `transform .7s cubic-bezier(.2,.7,.2,1) ${500 + i * 70}ms`,
              }}
            />
          ))}
        </div>
      </Rise>
    </div>
  );
}

function FinanceVisual({ on }: { on: boolean }) {
  const reduce = usePrefersReducedMotion();
  const line = 'M0 84 C40 80 60 70 100 64 S170 52 210 34 S270 16 300 10';
  return (
    <div>
      <VisualHead title="Finance console" badge="Sharia aligned" on={on} />
      <Rise on={on} delay={80} className="rounded-[10px] border border-[#e5e5e5] bg-[#fafafa] p-3">
        <div className="mb-2 text-[11px] text-[#666666]">Product performance, verified on-chain</div>
        <svg viewBox="0 0 300 100" className="block h-auto w-full" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="plat-yield-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#000" stopOpacity=".14" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L300 100 L0 100Z`} fill="url(#plat-yield-fill)" style={{ opacity: on ? 1 : 0, transition: reduce ? 'none' : 'opacity .8s ease .6s' }} />
          <path
            d={line}
            stroke="#0a0a0a"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={on ? 0 : 1}
            style={{ transition: reduce ? 'none' : 'stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1) .2s' }}
          />
        </svg>
      </Rise>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[['Compliance', 'Attested per product'], ['Reporting', 'Audit-ready, always']].map(([t, s], i) => (
          <Rise key={t} on={on} delay={460 + i * 90} className="rounded-[10px] border border-[#e5e5e5] bg-white px-3 py-2.5">
            <div className="text-[11px] text-[#666666]">{t}</div>
            <div className="text-[13px] font-medium text-[#0a0a0a]">{s}</div>
          </Rise>
        ))}
      </div>
    </div>
  );
}

const VISUALS = [FoundationVisual, FinanceVisual];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const PRODUCTS = [
  {
    ctag: 'foundation',
    label: 'Foundation',
    host: 'tawf.foundation',
    title: 'Tawf Foundation',
    desc: 'Infrastructure for Islamic foundations. Collect zakat, manage waqf and run qurban and sadaqah programs with every transaction recorded on-chain and traceable from donor to recipient.',
    tags: [['Zakat', true], ['Waqf', false], ['Qurban', false], ['On-chain receipts', false]],
    href: 'https://tawf.foundation',
    cta: 'Visit tawf.foundation',
  },
  {
    ctag: 'finance',
    label: 'Finance',
    host: 'tawf.finance',
    title: 'Tawf Finance',
    desc: 'Infrastructure for Islamic finance institutions. Issue and manage Sharia-compliant products on a transparent ledger, with compliance and reporting built into the platform.',
    tags: [['Sharia aligned', true], ['Institution-ready', false], ['Audit-ready', false]],
    href: 'https://tawf.finance',
    cta: 'Visit tawf.finance',
  },
] as const;

export default function ProductsSection() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = PRODUCTS.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (i: number) => { setAuto(false); setActive((i + count) % count); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(active + 1); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(active - 1); }
  };

  const running = auto && !reduce;
  const paused = hovered || !inView;

  return (
    <section id="products" className="border-t bg-white py-16 md:py-24" style={{ borderColor: LINE2 }}>
      <div className={CONTAINER}>
        <Reveal className="mb-10 grid gap-6 md:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Kick>Our products</Kick>
            <h2 className="max-w-[16em] text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0a0a0a]">Two platforms. One trust layer.</h2>
          </div>
          <p className="max-w-[40em] text-base leading-[1.6] lg:pb-1.5" style={{ color: MUTED2 }}>
            Tawf Foundation and Tawf Finance are built on the same transparent infrastructure, each shaped for the institutions it serves.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={ref}
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: LINE2 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              {/* Left: product list */}
              <div role="tablist" aria-label="Products" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col">
                {PRODUCTS.map((p, i) => {
                  const on = active === i;
                  return (
                    <div key={p.ctag} className="relative border-b last:border-b-0 lg:last:border-b" style={{ borderColor: LINE2 }}>
                      {on && (
                        <span
                          key={`fill-${i}-${running}`}
                          aria-hidden="true"
                          className="absolute left-0 top-0 h-full w-[2px] origin-top"
                          style={{
                            background: ACC,
                            animation: running ? 'platformFill 6s linear forwards' : 'none',
                            animationPlayState: paused ? 'paused' : 'running',
                          }}
                          onAnimationEnd={() => setActive((a) => (a + 1) % count)}
                        />
                      )}
                      <h3 className="m-0">
                        <button
                          id={`product-tab-${i}`}
                          role="tab"
                          aria-selected={on}
                          aria-controls="product-panel"
                          tabIndex={on ? 0 : -1}
                          onClick={() => select(i)}
                          className="flex w-full items-center gap-4 px-6 py-5 text-left md:px-8"
                        >
                          <span
                            className="shrink-0 rounded-[7px] border px-2.5 py-1.5 font-mono text-xs font-medium transition-all duration-500"
                            style={on ? { background: ACC, borderColor: ACC, color: '#fff' } : { background: TILE, borderColor: TILE_LINE, color: MUTED2 }}
                          >
                            {p.ctag}
                          </span>
                          <span className="text-[17px] font-semibold tracking-tight transition-colors duration-500" style={{ color: on ? '#0a0a0a' : MUTED2 }}>
                            {p.title}
                          </span>
                        </button>
                      </h3>

                      <div
                        className="grid"
                        aria-hidden={!on}
                        style={{
                          gridTemplateRows: on ? '1fr' : '0fr',
                          opacity: on ? 1 : 0,
                          visibility: on ? 'visible' : 'hidden',
                          transition: reduce ? 'none' : `grid-template-rows .5s ease, opacity .4s ease, visibility 0s linear ${on ? '0s' : '.5s'}`,
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-6 md:px-8">
                            <p className="max-w-[44ch] text-[15px] leading-[1.6]" style={{ color: MUTED2 }}>{p.desc}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                              {p.tags.map(([t, strong]) => (
                                <span
                                  key={t as string}
                                  className="whitespace-nowrap rounded-full border px-2.5 py-1 text-xs"
                                  style={strong ? { color: ACC, background: ACC_SOFT, borderColor: 'transparent' } : { background: TILE, borderColor: TILE_LINE, color: MUTED2 }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="pt-5"><Lnk href={p.href}>{p.cta}</Lnk></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: live preview */}
              <div
                id="product-panel"
                role="tabpanel"
                aria-labelledby={`product-tab-${active}`}
                className="relative flex items-center justify-center overflow-hidden border-t px-5 py-10 md:px-10 md:py-14 lg:border-l lg:border-t-0"
                style={{ borderColor: LINE2, backgroundColor: TILE, backgroundImage: 'radial-gradient(#d4d4d4 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 size-[320px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: ACC_SOFT }} />

                <div className="relative w-full max-w-[440px] overflow-hidden rounded-xl border bg-white shadow-[0_1px_2px_rgba(0,0,0,.05),0_12px_32px_rgba(0,0,0,.08)]" style={{ borderColor: '#e5e5e5' }}>
                  <div className="flex h-10 items-center gap-3 border-b bg-[#fafafa] px-4" style={{ borderColor: '#e5e5e5' }}>
                    <span className="flex gap-1.5" aria-hidden="true">
                      <i className="size-2.5 rounded-full bg-[#e5e5e5]" />
                      <i className="size-2.5 rounded-full bg-[#e5e5e5]" />
                      <i className="size-2.5 rounded-full bg-[#e5e5e5]" />
                    </span>
                    <span className="min-w-0 flex-1 truncate rounded-md border bg-white px-3 py-1 text-center font-mono text-[11px] text-[#666666]" style={{ borderColor: '#e5e5e5' }}>
                      <span key={active} className="inline-block" style={{ animation: reduce ? 'none' : 'platformFade .45s ease' }}>{PRODUCTS[active].host}</span>
                    </span>
                  </div>

                  <div className="relative h-[340px]">
                    {VISUALS.map((Visual, i) => {
                      const on = active === i;
                      return (
                        <div
                          key={i}
                          aria-hidden={!on}
                          className="pointer-events-none absolute inset-0 p-5"
                          style={{
                            opacity: on ? 1 : 0,
                            transform: on ? 'none' : 'translateY(10px) scale(.985)',
                            transition: reduce ? 'none' : 'opacity .5s ease, transform .5s cubic-bezier(.2,.7,.2,1)',
                          }}
                        >
                          <Visual on={on} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Network rail */}
            <div className="hidden items-center justify-between gap-6 border-t px-8 py-5 md:flex" style={{ borderColor: LINE2 }}>
              <p className="text-sm" style={{ color: MUTED2 }}>Two products, connected by one transparent infrastructure.</p>
              <div className="flex items-center" aria-hidden="true">
                {PRODUCTS.map((p, i) => (
                  <React.Fragment key={p.ctag}>
                    <span className="flex items-center gap-2 text-xs font-medium transition-colors duration-500" style={{ color: active === i ? '#0a0a0a' : MUTED2 }}>
                      <span
                        className="size-2.5 rounded-full border transition-all duration-500"
                        style={active === i ? { background: ACC, borderColor: ACC, boxShadow: `0 0 0 4px ${ACC_SOFT}` } : { background: '#fff', borderColor: MUTED2 }}
                      />
                      {p.label}
                    </span>
                    {i < count - 1 && <span className="mx-4 h-px w-10 lg:w-14" style={{ background: '#d4d4d4' }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @keyframes platformFill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes platformFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
