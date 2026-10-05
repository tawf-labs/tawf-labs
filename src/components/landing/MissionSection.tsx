import React from 'react';
import { CheckCircle2, ShieldCheck, Landmark } from 'lucide-react';
import { CONTAINER, Reveal, MARK_D, EthereumMark } from './landingCommon';

const CARDS = [
  { label: 'Audit & reporting', x: 160, y: 35, w: 618, h: 346 },
  { label: 'Tawf Finance', x: 112, y: 103, w: 578, h: 281 },
  { label: 'Tawf Foundation', x: 80, y: 171, w: 603, h: 216 },
  { label: 'Tawf Core', x: 48, y: 239, w: 603, h: 216 },
];
const LINES = [
  [89.356, 242.967],
  [134.913, 394.822],
  [180.47, 305.607],
  [226.026, 225.883],
];

/* Stacked cards: one shared core, two products on top. Pure grayscale. */
function StackVisual() {
  return (
    <div className="relative w-full self-end" aria-hidden="true">
      <svg viewBox="40 65 460 271" fill="none" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full overflow-hidden">
        <defs>
          <clipPath id="mi-clip-root"><rect width="636" height="375" /></clipPath>
          {CARDS.map((c, i) => (
            <clipPath key={c.label} id={`mi-clip-${i}`}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="12" />
            </clipPath>
          ))}
        </defs>
        <g clipPath="url(#mi-clip-root)" transform="translate(0 20)">
          {CARDS.map((c, i) => {
            const front = i === CARDS.length - 1;
            const tabW = Math.round(50 + c.label.length * 9.5 + 24);
            return (
              <g
                key={c.label}
                className="drop-shadow-[0_2px_4px_#0001] transition-transform duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <g clipPath={`url(#mi-clip-${i})`}>
                  <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="12" fill="#fff" />
                  <path d={`M${c.x + tabW} ${c.y}V${c.y + 56}`} stroke="#e5e5e5" strokeWidth="1" />
                  <g transform={`translate(${c.x + 28} ${c.y + 28}) scale(${20 / 341}) translate(-159 -179.5)`}>
                    <path d={MARK_D} fill="#0a0a0a" fillRule="evenodd" />
                  </g>
                  <text x={c.x + 50} y={c.y + 35.4} fill="#171717" fontSize="20" letterSpacing="-.04em" fontFamily="inherit" style={{ whiteSpace: 'pre' }}>
                    {c.label}
                  </text>
                  <rect x={c.x} y={c.y + 56} width={c.w} height={c.h - 56} fill="#fafafa" stroke="#e5e5e5" />
                  {LINES.map(([dy, len], li) => (
                    <path
                      key={dy}
                      d={`M${c.x + 46.644} ${c.y + dy}h${len}`}
                      stroke={front && li === 0 ? '#0a0a0a' : '#e5e5e5'}
                      strokeOpacity={front && li === 0 ? 0.85 : 1}
                      strokeWidth="13.287"
                      strokeLinecap="round"
                      strokeDasharray="83.52 17.08"
                    />
                  ))}
                </g>
                <rect x={c.x + 0.5} y={c.y + 0.5} width={c.w - 1} height={c.h - 1} rx="11.5" stroke="#e5e5e5" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function ChainVisual() {
  const rows = [
    ['foundation.receipt', '0x7a3…e91'],
    ['finance.settle', '0x1c8…b20'],
    ['compliance.attest', '0x52e…9d3'],
    ['audit.publish', '0xd40…7f5'],
  ];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(rows.length - 1);
      return;
    }
    const t = window.setInterval(() => setActive((v) => (v + 1) % (rows.length + 1)), 1800);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative grid gap-2.5 pl-6 [mask-image:linear-gradient(#000_55%,transparent)]" aria-label="Recent verified on-chain records">
      <span className="absolute bottom-3 left-1.5 top-3 w-px bg-[#e5e5e5]" />
      {rows.map(([name, hash], i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div
            key={name}
            className={`relative flex items-center gap-3 rounded-[10px] border bg-white px-3.5 py-2.5 font-mono text-xs transition-all duration-300 ${current ? 'border-[#0a0a0a] shadow-[0_0_0_4px_rgba(0,0,0,.08)]' : 'border-[#e5e5e5]'}`}
          >
            <span className={`absolute -left-6 top-1/2 size-2.5 -translate-y-1/2 rounded-full border ${done || current ? 'border-[#0a0a0a] bg-[#0a0a0a]' : 'border-[#666666] bg-white'}`} />
            <b className="font-medium">{name}</b>
            <span className="text-[#666666]">{hash}</span>
            <CheckCircle2 className={`ml-auto size-3.5 shrink-0 text-[#0a0a0a] transition-opacity ${done || current ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        );
      })}
    </div>
  );
}

/* Small iso-style tile used in the three value cells. */
function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[180px] items-center justify-center" aria-hidden="true">
      <span className="absolute inset-x-6 bottom-6 top-6 rounded-2xl border border-dashed border-[#d4d4d4] bg-[#fafafa]" />
      <span className="relative flex size-20 items-center justify-center rounded-2xl border border-[#e5e5e5] bg-white shadow-[0_1px_2px_rgba(0,0,0,.05),0_10px_24px_rgba(0,0,0,.06)]">
        {children}
      </span>
    </div>
  );
}

export default function MissionSection() {
  const items = [
    {
      title: 'Sharia by design',
      desc: 'Compliance is part of the protocol, not a report added afterwards. Rules for zakat, waqf and Islamic finance products are encoded into the infrastructure.',
      icon: <ShieldCheck className="size-9 text-[#0a0a0a]" strokeWidth={1.5} />,
    },
    {
      title: 'Secured by Ethereum',
      desc: "Tawf is built on the EVM and inherits Ethereum's security. Every record is public, immutable and independently verifiable, so institutions can prove what they do rather than claim it.",
      icon: <EthereumMark size={40} />,
    },
    {
      title: 'Built for institutions',
      desc: 'Foundations, amil organizations and finance institutions get production-grade tooling, identity and reporting out of the box.',
      icon: <Landmark className="size-9 text-[#0a0a0a]" strokeWidth={1.5} />,
    },
  ];

  return (
    <section id="about" className="border-y border-[#e5e5e5] bg-white py-16 md:py-24">
      <div className={CONTAINER}>
        <div className="grid grid-cols-6 border-l border-r border-t border-[#e5e5e5]">
          <Reveal className="col-span-6 grid min-h-[400px] grid-cols-1 gap-7 border-b border-[#e5e5e5] px-6 pt-8 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-10 md:pt-11">
            <div className="pb-8 md:pb-11">
              <p className="mb-[18px] text-[15px] font-semibold text-[#0a0a0a]">What we do</p>
              <h2 className="mb-5 max-w-[14ch] text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-tight text-[#0a0a0a]">One infrastructure layer for Islamic finance and giving</h2>
              <p className="max-w-[46ch] text-base leading-relaxed text-[#666666]">
                Tawf Labs is the company behind Tawf Foundation and Tawf Finance. We build shared infrastructure so Islamic foundations and finance institutions can operate with the transparency their communities deserve.
              </p>
            </div>
            <StackVisual />
          </Reveal>

          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className={`relative col-span-6 min-h-[320px] overflow-hidden border-b border-[#e5e5e5] px-6 pt-8 md:px-8 lg:col-span-2 ${i < 2 ? 'lg:border-r' : ''}`}
            >
              <h3 className="mb-2 text-base font-semibold tracking-tight text-[#0a0a0a]">{item.title}</h3>
              <p className="max-w-[36ch] text-[14.5px] leading-[1.55] text-[#666666]">{item.desc}</p>
              <div className="relative mt-7 min-h-[180px]"><IconTile>{item.icon}</IconTile></div>
            </Reveal>
          ))}

          <Reveal delay={0.24} className="relative col-span-6 min-h-[320px] overflow-hidden border-b border-[#e5e5e5] px-6 pt-8 md:px-8 lg:col-span-3 lg:border-r">
            <p className="max-w-[20ch] text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.16] tracking-tight text-[#0a0a0a]">Two products, one ledger, verifiable on-chain</p>
            <div className="relative mt-7 min-h-[200px]"><ChainVisual /></div>
          </Reveal>

          <Reveal delay={0.32} className="relative col-span-6 flex min-h-[320px] flex-col justify-between overflow-hidden border-b border-[#e5e5e5] bg-[#0a0a0a] px-6 py-8 text-white md:px-8 lg:col-span-3">
            <p className="max-w-[22ch] text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.16] tracking-tight">Transparent by default. Trust comes from being able to check.</p>
            <p className="max-w-[40ch] text-[14.5px] leading-[1.55] text-white/60">
              Our mission is to rebuild Baitul Maal and Islamic finance for the digital age, with infrastructure institutions can rely on.
            </p>
            <p className="mt-4 flex items-center gap-2.5 font-mono text-xs text-white/70">
              <EthereumMark size={18} light />
              EVM-compatible: Ethereum tooling and wallets just work.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
