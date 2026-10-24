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
  ArrowRight,
  Orbit,
  Atom,
  Zap,
  Activity
} from 'lucide-react';

export default function Navbar({ 
  onOpenTerminal, 
  onOpenContact, 
  activeTheory = 'hypercomplex', 
  onSelectTheory 
}) {
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
        ? 'bg-[#090D16]/95 backdrop-blur-md border-b border-slate-800 shadow-xl py-2.5' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-1.5 group-hover:border-cyan-500/50 transition-colors shadow-md">
            <img src="/logo.svg" alt="Donald Bugden Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-sm sm:text-base text-slate-100 tracking-tight flex items-center gap-2">
              Donald Bugden
              <span className="hidden xl:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                DoD/NSA Specialist
              </span>
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Theoretical Math &amp; Advanced Computation
            </span>
          </div>
        </a>

        {/* Central Framework Switcher (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-slate-950/90 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => onSelectTheory && onSelectTheory('hypercomplex')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTheory === 'hypercomplex'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/60 shadow-[0_0_12px_rgba(6,182,212,0.25)] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Theory I: Hypercomplex Dynamical Parity on E8"
          >
            <Atom className="w-3.5 h-3.5 text-cyan-400" />
            <span>Theory I: Quasicrystal Parity</span>
          </button>

          <button
            onClick={() => onSelectTheory && onSelectTheory('odt')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTheory === 'odt'
                ? 'bg-amber-950 text-amber-300 border border-amber-600/60 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Theory II: Oscillating Dimensional Trajectories & Gravitational Modification"
          >
            <Orbit className="w-3.5 h-3.5 text-amber-400" />
            <span>Theory II: Anti-Gravity &amp; ODT</span>
            <span className="px-1 py-0.2 text-[9px] rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              New
            </span>
          </button>
        </div>

        {/* Dynamic Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-mono text-slate-300 shrink-0">
          {activeTheory === 'hypercomplex' ? (
            <>
              <a href="#theory" className="hover:text-cyan-400 transition-colors">
                Theory
              </a>
              <a href="#formalism" className="hover:text-cyan-400 transition-colors">
                Formalism
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
                Advisory
              </a>
              <a href="#research" className="hover:text-cyan-400 transition-colors">
                Research Library
              </a>
            </>
          ) : (
            <>
              <a href="#theory-odt" className="hover:text-amber-400 transition-colors">
                ODT Theory
              </a>
              <a href="#formalism-odt" className="hover:text-amber-400 transition-colors">
                Metric Formalism
              </a>
              <a href="#simulation-odt" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <Orbit className="w-3.5 h-3.5 text-amber-400" />
                3D Simulation
              </a>
              <a href="#protocols-odt" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                Propulsion &amp; Use Cases
              </a>
              <a href="#consulting" className="hover:text-amber-400 transition-colors">
                Advisory
              </a>
              <a href="#research" className="hover:text-amber-400 transition-colors">
                Research Paper
              </a>
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenTerminal}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-mono transition flex items-center gap-1.5 shadow-sm"
            title="Open Interactive Math Terminal"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="hidden 2xl:inline">Terminal</span>
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
        <div className="lg:hidden bg-[#090D16]/98 border-b border-slate-800 px-6 py-6 space-y-5 font-mono text-sm backdrop-blur-xl">
          {/* Framework Switcher in Mobile Drawer */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold block">
              Active Theoretical Framework
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSelectTheory && onSelectTheory('hypercomplex');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  activeTheory === 'hypercomplex'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-600 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Atom className="w-4 h-4 mb-1 text-cyan-400" />
                <div>Theory I</div>
                <div className="text-[10px] text-slate-500">Quasicrystals</div>
              </button>
              <button
                onClick={() => {
                  onSelectTheory && onSelectTheory('odt');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  activeTheory === 'odt'
                    ? 'bg-amber-950 text-amber-300 border-amber-600 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Orbit className="w-4 h-4 mb-1 text-amber-400" />
                <div>Theory II</div>
                <div className="text-[10px] text-slate-500">Anti-Gravity &amp; ODT</div>
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {activeTheory === 'hypercomplex' ? (
              <>
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
              </>
            ) : (
              <>
                <a
                  href="#theory-odt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-amber-400 py-1"
                >
                  ODT Theory &amp; Breakthrough
                </a>
                <a
                  href="#formalism-odt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-amber-400 py-1"
                >
                  Metric Distortion Formalism
                </a>
                <a
                  href="#simulation-odt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-amber-400 py-1"
                >
                  3D Metric Distortion Simulator
                </a>
                <a
                  href="#protocols-odt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-amber-400 py-1"
                >
                  Propulsion Protocols &amp; Use Cases
                </a>
                <a
                  href="#consulting"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-amber-400 py-1"
                >
                  Strategic Defense Advisory
                </a>
                <a
                  href="#research"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-slate-300 hover:text-amber-400 py-1"
                >
                  ODT Research Paper (JMP-DG)
                </a>
              </>
            )}
          </div>

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
