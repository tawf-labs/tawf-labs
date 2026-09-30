import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTAINER, Kick, Reveal } from './landingCommon';

export default function CtaSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-28">
      {/* Subtle grayscale grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.07]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
        }}
      />

      <div className={`${CONTAINER} relative`}>
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center text-center">
          <div className="flex justify-center"><Kick light>Start building</Kick></div>

          <h2 className="pb-2 text-[clamp(38px,6.2vw,72px)] font-medium leading-[1.02] tracking-[-0.035em]">
            Infrastructure you can
            <br />
            verify
          </h2>

          <p className="mt-6 max-w-[34em] text-[clamp(16px,1.4vw,18px)] leading-[1.6] text-white/60">
            Whether you run an Islamic foundation or an Islamic finance institution, Tawf Labs builds the infrastructure to make it transparent.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://tawf.foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-[#0a0a0a] transition-all duration-300 hover:-translate-y-px hover:bg-[#e5e5e5] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Tawf Foundation
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
            <a
              href="https://tawf.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-6 text-[15px] font-medium text-white transition-all duration-300 hover:-translate-y-px hover:border-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Tawf Finance
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
