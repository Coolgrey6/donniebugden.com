import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Terminal, 
  BookOpen, 
  Rotate3d, 
  Cpu, 
  Layers, 
  Lock, 
  Menu, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Navbar({ onOpenTerminal, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090D16]/90 backdrop-blur-md border-b border-slate-800 shadow-xl py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 group-hover:border-cyan-500/50 transition-colors shadow-md">
            <img src="/logo.svg" alt="Donald Bugden Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight flex items-center gap-2">
              Donald Bugden
              <span className="hidden lg:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                DoD/NSA Specialist
              </span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Theoretical Math &amp; Advanced Computation
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-300">
          <a href="#theory" className="hover:text-cyan-400 transition-colors">
            Theory
          </a>
          <a href="#formalism" className="hover:text-cyan-400 transition-colors">
            Formalism &amp; Proofs
          </a>
          <a href="#visualizers" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
            3D Visualizers
          </a>
          <a href="#protocols" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            Protocols
          </a>
          <a href="#consulting" className="hover:text-cyan-400 transition-colors">
            Advisory &amp; Defense
          </a>
          <a href="#research" className="hover:text-cyan-400 transition-colors">
            Research Library
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-mono transition flex items-center gap-1.5 shadow-sm"
            title="Open Interactive Math Terminal"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="hidden xl:inline">Terminal</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition shadow-[0_0_15px_rgba(6,182,212,0.35)] flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 fill-current" />
            <span>Retain Advisory</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"
            title="Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090D16]/95 border-b border-slate-800 px-6 py-6 space-y-4 font-mono text-sm backdrop-blur-xl">
          <a
            href="#theory"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            Theory &amp; Executive Summary
          </a>
          <a
            href="#formalism"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            Mathematical Formalism &amp; KaTeX
          </a>
          <a
            href="#visualizers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            Interactive 3D Visualizers
          </a>
          <a
            href="#protocols"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            Computational Protocols (Section 6)
          </a>
          <a
            href="#consulting"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            Advisory &amp; Defense Practice
          </a>
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-cyan-400 py-1"
          >
            Research Papers &amp; Atlas
          </a>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono text-center"
            >
              Contact / Retain Advisory
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
