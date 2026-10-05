import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import HeroStackArt from '../ui/HeroStackArt';
import { CONTAINER } from './landingCommon';

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section className="w-full -mt-16 pb-12">
      <div className={CONTAINER}>
        <div className="grid min-h-[85svh] items-center gap-8 py-8 pt-24 md:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease }}
            className="transform-gpu pr-2 text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="m-0 max-w-[11em] text-[clamp(40px,5.2vw,68px)] font-medium leading-[1.04] tracking-[-0.035em] text-[#0a0a0a] max-md:mx-auto"
            >
              Infrastructure for{' '}
              <span className="relative inline-block">
                Islamic finance
                <span className="absolute bottom-1.5 left-0 -z-10 h-3 w-full rounded-xs bg-[#0a0a0a]/10" />
              </span>{' '}
              and giving
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-5 max-w-[34em] text-[clamp(16px,1.4vw,18.5px)] leading-[1.6] text-[#666666] max-md:mx-auto"
            >
              <strong className="font-semibold text-[#0a0a0a]">Tawf Labs builds the rails.</strong> Tawf Foundation powers Islamic foundations. Tawf Finance powers Islamic finance institutions. Transparent, auditable and Sharia-compliant by design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start"
            >
              <motion.a
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                href="https://tawf.foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2.5 rounded-xl bg-[#0a0a0a] px-6 text-[15px] font-medium text-white transition-colors hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2"
              >
                <span>Tawf Foundation</span>
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                href="https://tawf.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2.5 rounded-xl border border-[#d4d4d4] bg-white px-6 text-[15px] font-medium text-[#0a0a0a] transition-all hover:border-[#0a0a0a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a] focus-visible:ring-offset-2"
              >
                <span>Tawf Finance</span>
                <ArrowRight className="size-4 text-[#666666] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0a0a0a]" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.2, ease }}
            className="transform-gpu mx-auto w-full max-w-[620px] lg:-mt-12"
          >
            <HeroStackArt />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
