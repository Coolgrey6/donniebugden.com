import React from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Cpu, 
  Network, 
  Download,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function Hero({ onOpenTerminal, onOpenContact }) {
  return (
    <section className="relative pt-28 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center text-center tech-radial-glow overflow-hidden">
      {/* Background Decorative Technical Grids & Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-cyan-500/10 rounded-full pointer-events-none -z-10 animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-slate-800/40 rounded-full pointer-events-none -z-10"></div>

      {/* Top Credentials / Clearance Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Defense &amp; Strategic Computation Background (DoD/NSA Consulting Specialist)</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono backdrop-blur-md shadow-sm">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>Geometric Lattice Modeling</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-mono backdrop-blur-md shadow-sm">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Post-Quantum Cryptographic Structures</span>
        </div>
      </div>

      {/* Main Consultant Name & Academic Affiliation */}
      <div className="mb-4">
        <h2 className="text-sm uppercase tracking-[0.25em] font-mono font-semibold text-cyan-400 mb-2">
          Donald "Donnie" Bugden
        </h2>
        <p className="text-xs font-mono text-slate-400">
          Department of Mathematical Sciences • Theoretical Physics Research Initiative
        </p>
      </div>

      {/* Required Hero Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight max-w-5xl leading-[1.1] mb-6">
        Discrete Geometry, Exceptional Lie Systems &amp;{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400">
          Hypercomplex Dynamics
        </span>
      </h1>

      {/* Required Hero Subtitle */}
      <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
        Consulting at the intersection of high-dimensional lattice theory, non-local quantum state selection, and advanced computational architectures.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <a
          href="#visualizers"
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-sm font-mono transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2 group"
        >
          <span>Explore Interactive Model</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#formalism"
          className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm font-mono transition-all flex items-center gap-2 shadow-md hover:border-slate-600"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Read Research Formalism</span>
        </a>
        <button
          onClick={onOpenContact}
          className="px-6 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold text-sm font-mono transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
        >
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>Contact / Retain Advisory</span>
        </button>
      </div>

      {/* Four Telemetry Stat Cards (Atlas Benchmark Badges) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 text-left">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
            Ambient Roots
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">
            240
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            E₈ Gosset Lattice (Kissing No. 240)
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 text-left">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
            Dual 600-Cell Split
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">
            120 : 120
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Balanced Chiral Parity Partition
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 text-left">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
            Dihedral Deficit Gap
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400">
            δ ≈ 7.356°
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            5-Tetrahedra Euclidean Defect
          </p>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 text-left">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
            Quantized Parity Twist
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
            Δθ = ±1.471°
          </div>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            Exact Topological Strain Closure
          </p>
        </div>
      </div>
    </section>
  );
}
