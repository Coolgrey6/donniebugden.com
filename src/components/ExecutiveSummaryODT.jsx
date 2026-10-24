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
          The Theoretical Breakthrough • Part II
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Dynamic Metric Distortion &amp; Anti-Gravity via Oscillating E8 Trajectories
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Replacing static manifold compactification with a deterministic discrete dimensional clock that inverts localized stress-energy curvature and decouples matter from gravitational and inertial drag.
        </p>
      </div>

      {/* Two Column Theoretical Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        {/* Left Column: The Problem */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              The Problem: Rigid 4D Spacetime Curvature &amp; The Inertial Trap
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard Einstein General Relativity couples mass strictly to spacetime curvature via <MathBlock math="G_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}" />. Under the Strong Equivalence Principle, inertial mass (<MathBlock math="m_i" />) and gravitational mass (<MathBlock math="m_g" />) are locked as an immutable scalar identity.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              This imposes catastrophic physical constraints:
            </p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 text-center space-y-1">
              <div>1. The Rocket Equation Penalty: <MathBlock math="\Delta v = v_e \ln(m_0 / m_f)" /></div>
              <div>2. Physiological G-Force Limits: Lethal human compression at <MathBlock math="> 9g" /></div>
              <div>3. The Vacuum Catastrophe: <MathBlock math="\sim 10^{120}" /> discrepancy in bare <MathBlock math="\Lambda" /></div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Higher-dimensional compactifications (such as static Calabi-Yau 6-manifolds in string theory) fail to resolve this because their extra dimensions remain frozen at the Planck scale, incapable of dynamic localized metric cancellation.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Classical Physics Bottleneck:</span>
            <span className="text-rose-400">Unavoidable mass-energy inertia and reactive propellant mass</span>
          </div>
        </div>

        {/* Right Column: Donnie Bugden's Resolution */}
        <div className="glass-panel-cyan p-8 rounded-2xl border border-amber-500/30 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Orbit className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              The Discovery: The Oscillating Dimensional Trajectory (ODT)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Donald M. Bugden demonstrates that spatial dimensionality is not a fixed continuous container, but an oscillating discrete function <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" /> cycling continuously between 1D and 8D across the 240 root vectors of the <MathBlock math="E_8" /> lattice.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              When physical states are driven along the reverse descent step (<MathBlock math="D: 8 \to 1" />), the golden ratio scaling factor:
            </p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-amber-500/30 font-mono text-xs text-amber-300 text-center">
              λ_n = φ^-D(n) Localized Curvature Phase-Cancellation
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              destructively cancels localized Riemann curvature components, yielding an effective gravitational mass <MathBlock math="m_{\text{eff}} \le 0" />. Furthermore, non-local 8D geodesic projection shunts momentum into internal dimensions <MathBlock math="y^a" />, establishing complete inertial decoupling (<MathBlock math="a^\mu_{\text{proper}} = 0" />).
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Bugden ODT Breakthrough:</span>
            <span className="text-amber-400">Propellantless field propulsion &amp; zero-G inertial maneuvering</span>
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
              Spatial coordinates expand exponentially. Explains cosmic inflation and dark energy acceleration without fine-tuned scalar fields.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-amber-800/60 space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>Phase 2: Apex</span>
              <span>D(7) = 8D</span>
            </div>
            <div className="text-slate-200 font-bold text-sm">Density: φ^8 ≈ 46.979</div>
            <p className="text-slate-400 leading-relaxed">
              Maximum entropy horizon density on the full 240-root E8 Gosset polytope. Defines the holographic boundary of the observable universe.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-emerald-800/60 space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Phase 3: Descent</span>
              <span>D: 8D → 1D</span>
            </div>
            <div className="text-slate-200 font-bold text-sm">Scale Factor: φ^-D(n)</div>
            <p className="text-slate-400 leading-relaxed">
              Logarithmic coordinate contraction inverts localized curvature. Generates quantum non-locality, entanglement, and anti-gravity metric cancellation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
