import React from 'react';
import { CONTAINER, Kick, ACC, ACC_SOFT, MUTED2, LINE2, LINE_STRONG, Reveal } from './landingCommon';

/* Crosshair "+" where the grid lines meet */
function Plus({ left, className = '' }: { left: number; className?: string }) {
  return (
    <span aria-hidden="true" style={{ left: `${left}%` }} className={`pointer-events-none absolute z-10 hidden size-[19px] -translate-x-1/2 lg:block ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: LINE_STRONG }} />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ background: LINE_STRONG }} />
    </span>
  );
}

export default function HowItWorksSection() {
  const steps = [
    ['01', 'Talk to us', 'Tell us about your foundation or finance institution and the products you want to bring on-chain.'],
    ['02', 'Integrate', 'Connect through Tawf Foundation or Tawf Finance, with identity, compliance and reporting handled by the shared core.'],
    ['03', 'Launch', 'Go live with Sharia-compliant programs and products your community can trust from day one.'],
    ['04', 'Verify everything', 'Every transaction is recorded on-chain, so donors, customers and auditors can check it at any time.'],
  ];

  return (
    <section id="how" className="border-t bg-white py-16 md:py-24" style={{ borderColor: LINE2 }}>
      <div className={CONTAINER}>
        <Reveal className="mb-10 md:mb-14">
          <Kick>How it works</Kick>
          <h2 className="max-w-[15em] text-[clamp(30px,4.2vw,46px)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0a0a0a]">Four steps from idea to verified</h2>
          <p className="mt-5 max-w-[36em] text-base leading-[1.6]" style={{ color: MUTED2 }}>Onboarding an institution onto Tawf infrastructure.</p>
        </Reveal>

        <div className="relative border-y border-x" style={{ borderColor: LINE2 }}>
          {[25, 50, 75].map((left) => (
            <React.Fragment key={left}>
              <Plus left={left} className="-top-[10px]" />
              <Plus left={left} className="-bottom-[10px]" />
            </React.Fragment>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, t, d], i) => (
              <Reveal
                key={n}
                delay={i * 0.08}
                className="group relative border-b px-6 pb-12 pt-9 transition-colors duration-500 last:border-b-0 hover:bg-[#fafafa] sm:px-8 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                style={{ borderColor: LINE2 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  style={{ background: ACC }}
                />
                <span className="mb-5 inline-block rounded-full px-2 py-0.5 font-mono text-[11px] font-medium" style={{ color: ACC, background: ACC_SOFT }}>{n}</span>
                <h3 className="text-[18px] font-medium tracking-tight text-[#0a0a0a]">{t}</h3>
                <p className="mt-2.5 max-w-[34ch] text-[15px] leading-[1.6]" style={{ color: MUTED2 }}>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
