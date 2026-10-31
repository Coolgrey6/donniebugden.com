import React from 'react';
import MathBlock from './MathBlock';
import { 
  Atom, 
  Orbit, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  TrendingDown, 
  Maximize2,
  Compass,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function ExecutiveSummaryODT() {
  return (
    <section id="theory-odt" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Theory II • Exploratory Framework
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Oscillating Dimensional Trajectories
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          We introduce a recursive dimensional operator that treats spatial dimensionality as a discrete oscillating function rather than a fixed background: <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" />. When modulated by powers of the golden ratio <MathBlock math="S_n = \phi^{(-1)^n \cdot D(n)}" />, the construction generates a discrete spectrum of scale factors.
        </p>
      </div>

      {/* Two Column Theoretical Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Left Column: The Problem */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              Theoretical Context: Rigid 4D Spacetime Curvature &amp; Inertial Limits
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard Einstein General Relativity couples mass strictly to spacetime curvature via <MathBlock math="G_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}" />. Under the Strong Equivalence Principle, inertial mass (<MathBlock math="m_i" />) and gravitational mass (<MathBlock math="m_g" />) are locked as an immutable scalar identity.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              This imposes classical engineering and cosmological bottlenecks:
            </p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 text-center space-y-1">
              <div>1. The Rocket Equation Penalty: <MathBlock math="\Delta v = v_e \ln(m_0 / m_f)" /></div>
              <div>2. Inertial G-Force Bounds on Matter &amp; Payloads</div>
              <div>3. Static Planck-scale dimensional compactification</div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Static extra dimensions in string or Kaluza-Klein manifolds remain frozen, motivating the exploration of discrete dynamic dimensional variation.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Exploratory Target:</span>
            <span className="text-rose-400">Investigating dynamic dimensional degrees of freedom</span>
          </div>
        </div>

        {/* Right Column: Donnie Bugden's Resolution */}
        <div className="glass-panel-cyan p-8 rounded-2xl border border-amber-500/30 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Orbit className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              The Geometric Operator: Oscillating Dimensional Trajectories
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We define a recursive dimensional operator that treats spatial dimensionality as a discrete oscillating function <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" />, producing a periodic triangular trajectory cycling through dimensions 1 through 8.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              When modulated by alternating powers of the golden ratio:
            </p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-amber-500/30 font-mono text-xs text-amber-300 text-center">
              S_n = φ^((-1)^n · D(n)) Discrete Scale Factor Spectrum
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The operator provides a well-defined geometric framework for exploring dimensional oscillation. Interpretations that link descent phases to quantum non-locality or ascent phases to cosmological expansion, as well as any associated anti-gravity or inertial-decoupling ideas, are presently exploratory and have not been derived from the operator or subjected to quantitative tests.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Mathematical Core:</span>
            <span className="text-amber-400">Exact &amp; periodic operator definition D(n)</span>
          </div>
        </div>
      </div>

      {/* Computational & Physical Status Note */}
      <div className="mb-14 p-6 rounded-2xl bg-amber-950/30 border border-amber-800/60 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
            <Orbit className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                Theoretical &amp; Empirical Status Note
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-[10px] font-mono text-amber-300 border border-amber-700">
                Exact Operator • Exploratory Conjectures
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              The mathematical definition of <MathBlock math="D(n)" /> is exact and periodic. Physical consequences relating the trajectory to quantum or cosmological phenomena remain conjectural and are presented as long-term research directions rather than established results. These physical interpretations have not yet been quantitatively tested.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Phase Progression Breakdown */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider">
            The 14-Step Cyclic Evolution Architecture
          </span>
          <span className="text-xs font-mono text-amber-400">
            Period T = 14 Steps • Modular Discrete Clock n ∈ ℕ₀
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-cyan-800/60 space-y-2">
            <div className="flex items-center justify-between text-cyan-400 font-bold">
              <span>Phase 1: Ascent</span>
              <span>D: 1D → 7D</span>
            </div>
            <div className="text-slate-200 font-bold text-sm">Scale Factor: φ^+D(n)</div>
            <p className="text-slate-400 leading-relaxed">
              Geometric coordinate expansion. Exploratory hypothesis investigated in connection with cosmological expansion models; unconfirmed quantitatively.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-800/60 space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>Phase 2: Apex</span>
              <span>D(7) = 8D</span>
            </div>
            <div className="text-slate-200 font-bold text-sm">Density: φ^8 ≈ 46.979</div>
            <p className="text-slate-400 leading-relaxed">
              Peak dimensional apex traversing the full 240-root E8 Gosset polytope. Provides an exact algebraic boundary on the discrete spectrum.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Phase 3: Descent</span>
              <span>D: 8D → 1D</span>
            </div>
            <div className="text-slate-200 font-bold text-sm">Scale Factor: φ^-D(n)</div>
            <p className="text-slate-400 leading-relaxed">
              Geometric coordinate contraction. Exploratory hypothesis investigated in connection with non-locality and curvature cancellation ideas; unverified quantitatively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
