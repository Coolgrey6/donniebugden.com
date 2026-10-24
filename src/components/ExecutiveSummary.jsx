import React from 'react';
import MathBlock from './MathBlock';
import { 
  Atom, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Network,
  Maximize2
} from 'lucide-react';

export default function ExecutiveSummary() {
  return (
    <section id="theory" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Theoretical Breakthrough
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Hypercomplex Dynamical Selection in E8 Projection Geometry
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Replacing stochastic annealing and ad-hoc physical potentials with a deterministic 4D hypercomplex dynamical filter that resolves geometric frustration at the Planck scale.
        </p>
      </div>

      {/* Two Column Theoretical Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        {/* Left Column: The Problem of Geometric Frustration */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              The Problem: High-Dimensional Frustration &amp; Combinatorial Explosion
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In lattice-based approaches to quantum geometry (such as Emergence Theory and Coxeter spin networks), physical 3D space is modeled as a cut-and-project slice of the 8-dimensional exceptional root lattice <MathBlock math="E_8 \subset \mathbb{R}^8" />.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              However, when regular tetrahedral prototiles meet face-to-face in 3D Euclidean space, five tetrahedra sharing a mutual edge leave an unclosable dihedral deficit gap:
            </p>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 text-center">
              δ = 2π - 5 arccos(1/3) ≈ 7.356° Deficit Angle
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Furthermore, each tetrahedral vertex carries an uncoupled binary degree of freedom <MathBlock math="\sigma_i \in \{-1, +1\}" /> representing chiral twist orientation. Without an overarching selection principle, uncorrelated choices trigger catastrophic shear strain throughout the bulk quasicrystal, leaving existing theories dependent on ad-hoc non-local forces.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>Prior Art Bottleneck:</span>
            <span className="text-rose-400">NP-hard combinatorial energy minimization</span>
          </div>
        </div>

        {/* Right Column: Donnie Bugden's Resolution */}
        <div className="glass-panel-cyan p-8 rounded-2xl border border-cyan-500/30 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Atom className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              The Discovery: Quaternionic Julia Set Acceptance Windows
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Donald Bugden replaces external potentials with a non-linear hypercomplex dynamical system acting directly within the internal perpendicular space <MathBlock math="\mathbb{R}_\perp^4 \cong \mathbb{H}" /> (the skew field of quaternions).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              By iterating the quaternionic map <MathBlock math="q_{n+1} = q_n^2 + C(\phi)" /> parameterized by the golden ratio generator <MathBlock math="C(\phi) \in \mathcal{I}_0" />, the filled Julia set boundary <MathBlock math="\partial K_{C(\phi)}" /> serves as a natural, scale-invariant acceptance filter.
            </p>
            <div className="p-3 bg-cyan-950/70 rounded-xl border border-cyan-800/80 font-mono text-xs text-cyan-300 text-center">
              Δθᵢ = σᵢ (δ / 5) ≈ ±1.4712° Quantized Parity Twist
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Evaluating the 240 roots of <MathBlock math="E_8" /> against this boundary deterministically partitions the root system into two balanced 120-element sets (<MathBlock math="\sum \sigma = 0" />). Adjacent shells exhibit exact anti-phase cancellation, naturally collapsing the macroscopic strain Hamiltonian to ground state!
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-900/60 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Formal Breakthrough:</span>
            <span className="text-cyan-300">Analytically closed, testable Code-Theoretic Axiom</span>
          </div>
        </div>
      </div>

      {/* Analytic Pipeline Diagram (Reproduced from Figure 1.1) */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800/80 gap-3">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Figure 1.1 Blueprint
            </span>
            <h4 className="text-lg font-bold text-slate-200 mt-1">
              Analytic Pipeline: From 8D Gosset Roots to 3D Physical Frustration Resolution
            </h4>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800/60 self-start sm:self-auto">
            Scale Invariant: φ = 1.618033...
          </span>
        </div>

        {/* Responsive Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                Step 01 • Ambient Lattices
              </span>
              <h5 className="font-semibold text-slate-100 text-sm">Lattice E₈ ⊂ ℝ⁸</h5>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                240 Gosset roots of length √2. Kissing Number = 240. Weyl group W(E₈).
              </p>
            </div>
            <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              dim = 8 | |v| = √2
            </div>
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                Step 02 • Orthogonal Projection
              </span>
              <h5 className="font-semibold text-slate-100 text-sm">Perp Space ℝ⊥⁴ ≅ ℍ</h5>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Concentric icosian shells ℐ₀ ∪ φℐ₀ (120 inner + 120 outer roots on S³).
              </p>
            </div>
            <div className="text-[11px] font-mono text-amber-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              π⊥(Φ(E₈)) = ℐ₀ ∪ φℐ₀
            </div>
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col justify-between gap-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <div>
              <span className="text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider block mb-1">
                Step 03 • Dynamical Filtering
              </span>
              <h5 className="font-semibold text-slate-100 text-sm">Julia Potential G(q)</h5>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                C(φ) = ½(φ + i + φ⁻¹j). Green's potential evaluates binary parity σ = ±1.
              </p>
            </div>
            <div className="text-[11px] font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-cyan-800/80">
              σ(α) = sgn(G - Θ)
            </div>
          </div>

          {/* Node 4 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                Step 04 • Physical Closure
              </span>
              <h5 className="font-semibold text-slate-100 text-sm">Physical 3D Tiling</h5>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                5-tetrahedra junctions resolve 7.356° gap via quantized twist Δθ = ±δ/5.
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              H_strain → Minimal
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
