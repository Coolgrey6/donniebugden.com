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
          The Theoretical Foundation
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Hypercomplex Dynamical Parity on E₈
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          We present a dynamical construction that uses a quaternionic quadratic map parameterized by an icosian constant derived from the golden ratio as a ranking mechanism on projected roots of the E₈ lattice.
        </p>
      </div>

      {/* Two Column Theoretical Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Left Column: The Problem of Geometric Frustration */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 tracking-wide">
              The Problem: High-Dimensional Frustration &amp; Combinatorial Deficit
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
              The Construction: Quaternionic Ranking &amp; Balanced 120/120 Partition
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Donald Bugden introduces a non-linear hypercomplex dynamical system acting directly within the internal perpendicular space <MathBlock math="\mathbb{R}_\perp^4 \cong \mathbb{H}" /> (the skew field of quaternions).
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              By iterating the quaternionic map <MathBlock math="q_{n+1} = q_n^2 + C(\phi)" /> parameterized by the golden ratio generator <MathBlock math="C(\phi) = \tfrac{1}{2}(\phi + \mathbf{i} + \phi^{-1}\mathbf{j})" />, the Green's potential <MathBlock math="G(q) = \lim_{n\to\infty} 2^{-n} \log_+ |f_C^n(q)|" /> induces a ranking of projected roots.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Under generic orthogonal projections of the 240 roots of <MathBlock math="E_8" />, this ranking yields an exactly balanced partition into two sets of 120 roots each (<MathBlock math="\sum \sigma = 0" />, net magnetization zero). The ranking is distinct from a pure radial ordering.
            </p>
            <div className="p-3 bg-cyan-950/70 rounded-xl border border-cyan-800/80 font-mono text-xs text-cyan-300 text-center">
              Deterministic Chiral Labeling: 120(+) / 120(-) Balanced Partition
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-amber-400">Open Conjecture:</strong> Whether this labeling anti-correlates on geometric neighbors and thereby reduces tetrahedral packing frustration remains an open conjecture; neighbor-correlation tests performed to date have not confirmed anti-phase ordering.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-900/60 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Geometric Result:</span>
            <span className="text-cyan-300">Exact 120/120 Balanced Split under Generic Projection</span>
          </div>
        </div>
      </div>

      {/* Computational Examination Status Note */}
      <div className="mb-14 p-6 rounded-2xl bg-cyan-950/30 border border-cyan-800/60 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Computational Examination Status Note
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-[10px] font-mono text-cyan-300 border border-cyan-700">
                Verified Result &amp; Open Conjecture
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Computational examination confirms that the Green’s potential ranking produces an exact 120/120 partition on generic projections of the actual <MathBlock math="E_8" /> roots. The same procedure applied to the pure unit and <MathBlock math="\phi" />-scaled icosian shells yields a near-balanced but not exact split. Claims of automatic shear cancellation via anti-correlated chiralities are not supported by the adjacency-graph and nearest-neighbor tests performed so far and are retained only as open research directions.
            </p>
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
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
                Step 04 • Physical Closure (Open Conjecture)
              </span>
              <h5 className="font-semibold text-slate-100 text-sm">Physical 3D Tiling</h5>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Conjectured twist Δθ = ±δ/5 for 7.356° gap; neighbor anti-correlation remains unverified in adjacency tests.
              </p>
            </div>
            <div className="text-[11px] font-mono text-amber-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              H_strain → Open Conjecture
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
