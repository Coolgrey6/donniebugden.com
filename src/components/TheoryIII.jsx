import React from 'react';
import MathBlock from './MathBlock';
import TheoryIIIOutsiders from './TheoryIIIOutsiders';
import LatticeFoldLaboratory from './visualizations/LatticeFoldLaboratory';
import {
  Layers,
  ArrowRight,
  ArrowDown,
  Download,
  CheckCircle2,
  ShieldAlert,
  GitMerge,
  Hexagon,
} from 'lucide-react';

const PDF_HREF = '/Tripartite_Architecture_Theory3_E8_Bugden_with_Verification.pdf';

const ODT_SEQUENCE = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2];

export default function TheoryIII({ onSwitchToTheory1, onSwitchToTheory2 }) {
  return (
    <div className="space-y-0">
      <section className="relative pt-28 md:pt-40 pb-16 px-4 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[680px] h-[360px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-amber-500/10 blur-[120px] -z-10 pointer-events-none rounded-full" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-6">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Theory III: Lattice Folding &amp; Set C Footprints</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-200 border border-emerald-500/40 normal-case tracking-normal">
            New
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.1] max-w-5xl mb-4">
          Self-Organizing Topological Manifolds &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-amber-300">
            Dynamic Parity Lattice Folding on E₈
          </span>
        </h1>
        <p className="text-base sm:text-lg text-emerald-200/90 font-mono max-w-3xl mb-4">
          The Bridge — Dimensional Mapping from Discrete E₈ Geometry to Observable Spacetime
        </p>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed mb-8">
          A tightly interlocking research program. Theory III supplies the folding operator that carries parity-equipped E₈ structure and the oscillating dimensional clock onto the physical sub-manifold. It is not offered as a completed theory of everything.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#simulation-iii"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center gap-2"
          >
            <GitMerge className="w-4 h-4" />
            Open Folding Laboratory
          </a>
          <a
            href="#mechanism-iii"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm font-mono transition-all flex items-center gap-2"
          >
            <GitMerge className="w-4 h-4 text-emerald-400" />
            Folding Operator πₓ
          </a>
          <a
            href={PDF_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm font-mono transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            Download Architectural Paper
          </a>
          <a
            href="#research"
            className="px-6 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-sm font-mono transition-all"
          >
            Research Library
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl text-left">
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
              Chiral Partition
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">120 : 120</div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">Preserved under the fold</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
              Dihedral Deficit
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400">δ ≈ 7.356°</div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">Unchanged after projection</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
              Quantized Twist
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300">|Δθ| ≈ 1.471°</div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">Signs ±δ/5</p>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
              Active Dimension
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300">D(n) ∈ 1…8</div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">14-step ODT clock</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
          <button type="button" onClick={onSwitchToTheory1} className="hover:text-cyan-300 inline-flex items-center gap-1">
            Theory I: Quasicrystal Parity <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={onSwitchToTheory2} className="hover:text-amber-300 inline-flex items-center gap-1">
            Theory II: Anti-Gravity &amp; ODT <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      <section id="theory-iii" className="py-16 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-2xl border border-slate-800/90">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 tracking-wide mb-4">The Problem</h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                The E₈ dynamic parity engine (Theory I, hypercomplex dynamical selection) supplies a deterministic 120:120 chiral partition of the 240 roots, together with the published tetrahedral dihedral deficit <MathBlock math="\delta \approx 7.356^\circ" /> and quantized twists <MathBlock math="\Delta\theta = \pm 1.471^\circ" />. Neighbor anti-correlation of those twists remains an open conjecture on Theory I.
              </p>
              <p>
                The oscillating dimensional trajectory engine (Theory II) supplies self-organizing feedback and the discrete clock <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" />.
              </p>
              <p className="text-slate-400">
                What has been missing is the explicit folding mechanism that projects these parity-equipped higher-dimensional structures into the observable 3D/4D sub-manifold as effective stress-energy and spacetime geometry.
              </p>
            </div>
          </div>

          <div id="mechanism-iii" className="glass-panel p-8 rounded-2xl border border-emerald-500/30 scroll-mt-40">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-4">
              <Hexagon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-100 tracking-wide mb-4">
              The Mechanism — Lattice Folding Operator πₓ
            </h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Theory III defines the folding and projection operator <MathBlock math="\pi_x" /> that subjects the parity-equipped E₈ root lattice to dimensional reduction modulated by the instantaneous active dimension <MathBlock math="D(n)" />.
              </p>
              <p>
                The discrete roots are not treated as fundamental 3D fields. They appear as cross-sectional Set C Footprints on the physical manifold <MathBlock math="M_{\mathrm{phys}}" />. The balanced chiral partition is preserved under the fold, and residual geometric frustration is mapped into effective stress-energy and curvature.
              </p>
              <p className="text-slate-400">
                Time evolution is then stabilized by the feedback loops of Theory II operating across DT = 8 transformation intervals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-center text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-6">
          Cascading Architecture
        </h2>
        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1">Theory I · Engine</div>
            <p className="text-sm sm:text-base font-semibold text-slate-100">
              E₈ root lattice + D<sub>parity</sub>
            </p>
            <p className="text-xs font-mono text-slate-400 mt-1">120:120 Julia selector</p>
          </div>
          <div className="flex flex-col items-center text-emerald-400">
            <ArrowDown className="w-5 h-5" />
            <span className="text-[11px] font-mono">πₓ folding / projection</span>
          </div>
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/60 text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">Theory III · Bridge</div>
            <p className="text-sm sm:text-base font-semibold text-slate-100">
              Set C Footprints on M<sub>phys</sub>
            </p>
            <p className="text-xs font-mono text-slate-400 mt-1">Cross-section of the parity-equipped lattice</p>
          </div>
          <div className="flex flex-col items-center text-amber-400">
            <ArrowDown className="w-5 h-5" />
            <span className="text-[11px] font-mono">F<sub>feedback</sub> + ODT D(n)</span>
          </div>
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">Theory II · Clock</div>
            <p className="text-sm sm:text-base font-semibold text-slate-100">
              Observable reality &amp; DT = 8 wave evolution
            </p>
            <p className="text-xs font-mono text-slate-400 mt-1">Feedback stabilized across transformation intervals</p>
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-6">
          Key Relations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">Folding</span>
            <MathBlock block math="\pi_x \big( L_{E_8} \otimes D_{\mathrm{parity}} \big) \rightarrow M_{\mathrm{phys}}" />
            <p className="text-xs text-slate-400 font-mono text-center">Set C Footprints</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">Evolution</span>
            <MathBlock block math="\partial \Psi / \partial t = F_{\mathrm{feedback}}\big(\pi_x(\Phi_{\mathrm{higher}}), D(n)\big)" />
          </div>
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 md:col-span-2">
            <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider block mb-3">
              ODT sequence (one period)
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {ODT_SEQUENCE.map((value, index) => (
                <span
                  key={`${value}-${index}`}
                  className={`w-9 h-9 rounded-lg border font-mono text-sm flex items-center justify-center ${
                    value === 8
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 font-bold'
                      : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}
                >
                  {value}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-mono text-center mt-3">
              [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2] · deficit and twist remain δ ≈ 7.356°, |Δθ| ≈ 1.471° after projection
            </p>
          </div>
        </div>
      </section>

      <LatticeFoldLaboratory />

      <TheoryIIIOutsiders />

      <section id="verification-iii" className="pb-20 px-4 max-w-7xl mx-auto scroll-mt-40">
        <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-emerald-900/50">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                Computational Verification (already executed)
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                Reproducible geometric primitives
              </h2>
            </div>
            <a
              href={PDF_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.35)] shrink-0"
            >
              <Download className="w-4 h-4" />
              Tripartite Architecture PDF
            </a>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <li className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              Exact generation of the 240 E₈ roots (norm √2).
            </li>
            <li className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              Exact match of the ODT operator <MathBlock math="D(n)" /> to its defining formula.
            </li>
            <li className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              Exact reproduction of the published tetrahedral deficit and quantized twist magnitudes. Alternating parity signs reduce residual angular deficit relative to random assignment.
            </li>
            <li className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              A representative 4D projection of the quaternionic Julia selector yields a near-balanced chiral split. The exact 120:120 split holds under the full H₄ / icosian subspace projection defined in the hypercomplex paper.
            </li>
          </ul>
          <p className="mt-6 text-xs font-mono text-slate-500 leading-relaxed">
            Formal architectural paper with verification appendix:{' '}
            <a href={PDF_HREF} className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">
              Tripartite_Architecture_Theory3_E8_Bugden_with_Verification.pdf
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
