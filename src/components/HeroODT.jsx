import React from 'react';
import MathBlock from './MathBlock';
import { 
  Orbit, 
  Terminal, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Activity,
  Layers,
  Zap,
  Rotate3d
} from 'lucide-react';

export default function HeroODT({ onOpenTerminal, onOpenContact, onSwitchToTheory1 }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/15 via-cyan-500/10 to-emerald-500/15 blur-[130px] -z-10 pointer-events-none rounded-full" />
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Framework Indicator Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/70 border border-amber-600/60 text-amber-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Orbit className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Theory II: Oscillating Dimensional Trajectories on E8</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-slate-300">Gravitational Modification &amp; Inertial Decoupling</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.1] max-w-5xl">
          Dynamic Metric Distortion &amp; Anti-Gravity via{' '}
          <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">
            E8 Dimensional Trajectories
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
          Extending Donald M. Bugden's discrete mathematical framework: treating spatial dimensionality not as a static manifold, but as an oscillating operator <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" />. Localized spacetime curvature cancellation, golden-ratio stress inversion, and genuine propellantless field propulsion.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#simulation-odt"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
          >
            <Rotate3d className="w-4 h-4" />
            Launch 3D Metric Simulator
          </a>

          <a
            href="#formalism-odt"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Explore Mathematical Formalism
          </a>

          <button
            onClick={onOpenTerminal}
            className="px-5 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 font-mono text-xs sm:text-sm transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Simulation CLI
          </button>
        </div>

        {/* Link / Switch to Theory 1 */}
        <div className="pt-2">
          <button
            onClick={onSwitchToTheory1}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>Looking for the foundational quasicrystal research?</span>
            <span className="text-cyan-400 font-bold underline underline-offset-4 flex items-center gap-1">
              Switch to Theory I: Hypercomplex Parity on E8
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Key Metrics / Technical Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 font-mono text-left">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-500">Modular Clock</span>
            <div className="text-lg font-bold text-amber-400">14-Step Cycle</div>
            <span className="text-[11px] text-slate-400">Triangular D(n) ∈ 1D ↔ 8D</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-500">Resonance Scaling</span>
            <div className="text-lg font-bold text-cyan-400">φ^(±D(n))</div>
            <span className="text-[11px] text-slate-400">Non-dispersive harmonic tuning</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-500">Gravitational Mass</span>
            <div className="text-lg font-bold text-emerald-400">m_eff ≤ 0</div>
            <span className="text-[11px] text-slate-400">Descent curvature cancellation</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
            <span className="text-xs text-slate-500">Inertial Coupling</span>
            <div className="text-lg font-bold text-sky-400">a^μ_proper = 0</div>
            <span className="text-[11px] text-slate-400">Momentum shunted into 8D roots</span>
          </div>
        </div>
      </div>
    </section>
  );
}
