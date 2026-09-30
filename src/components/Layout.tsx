import React, { useState } from 'react';
import { X, Menu, ArrowUpRight } from 'lucide-react';
import { Logo } from './landing/landingCommon';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'How it works', href: '#how' },
  { label: 'Contact', href: '#contact' },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Tawf Labs home">
      <Logo size={26} color={light ? '#fff' : '#0a0a0a'} />
      <span className={`text-[17px] font-semibold tracking-tight ${light ? 'text-white' : 'text-[#0a0a0a]'}`}>
        Tawf <span className="font-normal">Labs</span>
      </span>
    </a>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div id="top" className="flex min-h-screen flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-lg bg-[#0a0a0a] px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <header>
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#e5e5e5] bg-white/90 backdrop-blur-md" aria-label="Main navigation">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <Brand />

            <div className="hidden items-center gap-8 md:flex">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="text-sm font-medium text-[#666666] transition-colors hover:text-[#0a0a0a]">
                  {n.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="https://tawf.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d4d4d4] px-5 py-2 text-sm font-medium text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]"
              >
                Tawf Finance <ArrowUpRight className="size-3.5" />
              </a>
              <a
                href="https://tawf.foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0a0a0a] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                Tawf Foundation <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <button
              className="flex min-h-[48px] min-w-[48px] items-center justify-center p-3 text-[#0a0a0a] md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {open && (
            <div className="border-t border-[#e5e5e5] bg-white md:hidden">
              <div className="space-y-4 px-6 py-5">
                {NAV.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-[#666666] hover:text-[#0a0a0a]">
                    {n.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2.5 border-t border-[#e5e5e5] pt-4">
                  <a href="https://tawf.foundation" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0a0a0a] px-6 py-2.5 text-center text-sm font-medium text-white">Tawf Foundation</a>
                  <a href="https://tawf.finance" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d4d4d4] px-6 py-2.5 text-center text-sm font-medium text-[#0a0a0a]">Tawf Finance</a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main id="main-content" className="flex-grow pt-16">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-[#0a0a0a] py-16 text-white/60" role="contentinfo">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Brand light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              We build infrastructure for Islamic foundations and Islamic finance institutions.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-widest text-white">Products</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="https://tawf.foundation" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Tawf Foundation</a></li>
              <li><a href="https://tawf.finance" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Tawf Finance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-widest text-white">Company</h4>
            <ul className="space-y-4 text-sm">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="transition-colors hover:text-white">{n.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between border-t border-white/10 px-6 pt-8 text-xs md:flex-row">
          <p>&copy; {new Date().getFullYear()} Tawf Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
