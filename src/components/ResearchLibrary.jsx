import React, { useState } from 'react';
import MathBlock from './MathBlock';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Copy, 
  Check, 
  Layers, 
  Quote, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ResearchLibrary() {
  const [activePaper, setActivePaper] = useState('manuscript'); // 'manuscript' or 'atlas'
  const [copiedBib, setCopiedBib] = useState(false);

  const bibtex = `@article{bugden2026hypercomplex,
  title={Hypercomplex Julia-Set Boundaries Parameterized by the Golden Ratio as Non-Local Binary Selectors on the E8 Root System},
  author={Bugden, Donald M.},
  journal={Journal of Mathematical Physics & Discrete Geometry},
  volume={2026},
  number={E8-04},
  pages={1--4},
  year={2026},
  publisher={Theoretical Physics Research Initiative}
}`;

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <section id="research" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <FileText className="w-3.5 h-3.5" />
          Published Theoretical Papers &amp; Atlases
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-3xl">
          Theoretical Research Library
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
          Original monographs and companion visual proof atlases by Donald M. Bugden.
        </p>

        {/* Paper Selector Tabs */}
        <div className="mt-8 flex items-center gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActivePaper('manuscript')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activePaper === 'manuscript'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Research Manuscript (JMP-DG)
          </button>
          <button
            onClick={() => setActivePaper('atlas')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activePaper === 'atlas'
                ? 'bg-amber-950 text-amber-300 border border-amber-600/50 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Visual Proof Atlas &amp; Blueprint
          </button>
        </div>
      </div>

      {/* Main Manuscript Card */}
      {activePaper === 'manuscript' && (
        <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Research Article • Open Access
                </span>
                <span className="text-slate-400">
                  Journal of Mathematical Physics &amp; Discrete Geometry
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-500">Paper ID: JMP-DG-2026-E8-04</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                Hypercomplex Julia-Set Boundaries Parameterized by the Golden Ratio as Non-Local Binary Selectors on the E8 Root System
              </h3>

              <div className="pt-1 text-sm font-mono text-slate-400 flex flex-wrap items-center gap-4">
                <span><strong className="text-slate-200">Donald M. Bugden</strong></span>
                <span>Department of Mathematical Sciences • Theoretical Physics Research Initiative</span>
                <a href="mailto:donnie.bugden@gmail.com" className="text-cyan-400 hover:underline">
                  donnie.bugden@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/Hypercomplex_Dynamical_Parity_on_E8.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              >
                <Download className="w-4 h-4" />
                Download PDF (387 KB)
              </a>
              <button
                onClick={copyBibtex}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition flex items-center gap-1.5"
                title="Copy BibTeX Citation"
              >
                {copiedBib ? <Check className="w-4 h-4 text-emerald-400" /> : <Quote className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Abstract Box */}
          <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              Abstract
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              In discrete geometric formulations of quantum gravity, projecting the 8-dimensional Gosset lattice (<MathBlock math="E_8" />) down to 3D physical quasicrystals introduces geometric frustration (gap angle <MathBlock math="\delta \approx 7.36^\circ" />) and discrete chiral degeneracy across tetrahedral prototiles. Standard cut-and-project schemes utilize static acceptance windows in perpendicular space that select vertex coordinates but leave internal binary states uncoupled from dynamical equations. We propose an analytic framework wherein internal states are governed by a discrete hypercomplex dynamical system. By defining a quaternionic quadratic map <MathBlock math="q_{n+1} = q_n^2 + C(\phi)" /> parameterized by an icosian constant derived from the golden ratio <MathBlock math="\phi = (1+\sqrt{5})/2" />, we identify the filled Julia-set boundary <MathBlock math="\partial K_{C(\phi)}" /> as a non-local selector functional. Evaluating the projected 240 roots of <MathBlock math="E_8" /> against this boundary partitions the root system into two balanced 120-element sets corresponding to chiral halves of dual 600-cells, providing an algebraic mechanism to resolve tetrahedral shear and packing frustration.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
              <span className="text-slate-400">Keywords:</span>
              <span className="text-slate-300">E8 Root Lattice</span> •
              <span className="text-slate-300">Quaternionic Julia Sets</span> •
              <span className="text-slate-300">Golden Ratio</span> •
              <span className="text-slate-300">Quasicrystals</span> •
              <span className="text-slate-300">600-Cell</span> •
              <span className="text-slate-300">Geometric Frustration</span> •
              <span className="text-slate-300">Icosians</span>
            </div>
          </div>

          {/* Key Findings List */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">
              Primary Formal Conclusions (Section 8)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <span className="text-cyan-400 font-bold block mb-1">1. Exact 120:120 Partition</span>
                Deterministic partition into enantiomorphic 120-element classes with zero net macroscopic chirality: <MathBlock math="\sum \sigma(\alpha) = 0" />.
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <span className="text-amber-400 font-bold block mb-1">2. Frustration Resolution</span>
                Binary states correspond to dihedral shear twists <MathBlock math="\Delta\theta = \pm \delta/5 \approx \pm 1.4712^\circ" /> restoring exact 360° edge closure.
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <span className="text-sky-400 font-bold block mb-1">3. Penrose Deflation</span>
                Planar restrictions yield Hausdorff dimension <MathBlock math="D_H \approx 1.378" />, concordant with 2D Penrose kite-and-dart inflation eigenvalue <MathBlock math="\lambda = \phi" />.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Atlas Companion Card */}
      {activePaper === 'atlas' && (
        <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  Visual Proof Atlas &amp; Theoretical Blueprint
                </span>
                <span className="text-slate-400">Paper ID: JMP-DG-2026-E8-04</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                Visual Companion &amp; Mathematical Proof Atlas: Hypercomplex Dynamical Parity on E8
              </h3>

              <div className="pt-1 text-sm font-mono text-slate-400">
                Accompanying Visual Atlas for the Proposal by Donald M. Bugden • Department of Mathematical Sciences
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/Visual_Companion_Mathematical_Proof_Atlas_E8.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
              >
                <Download className="w-4 h-4" />
                Download Atlas PDF (617 KB)
              </a>
            </div>
          </div>

          {/* Atlas Blueprint Figure Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">Figure 1.1 — The E8 → 4D → 3D Projection Architecture</span>
              <p className="text-slate-400">
                Lattice E8 (240 roots) decomposes into internal perpendicular space ℝ⊥⁴ ≅ ℍ, mapping to dual concentric shells ℐ₀ ∪ φℐ₀ of the icosian ring on S³.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block">Figure 2.1 — Quaternionic Section &amp; Root Bifurcation</span>
              <p className="text-slate-400">
                Invariant slice Π ⊂ ℍ showing filled Julia core KC(φ), escape horizon |q| = φ ≈ 1.618, and root bifurcation into dual 120 left-chiral and 120 right-chiral shells.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">Figure 3.1 — Tetrahedral Deficit &amp; Anti-Phase Shear Relaxation</span>
              <p className="text-slate-400">
                Geometric origin of unclosable 7.356° defect and its exact restoration to 360° closure via quantized Julia parity twist Δθ = ±1.4712°.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold block">Figure 4.1 — Equivalence Between Penrose Inflation &amp; Julia Boundary</span>
              <p className="text-slate-400">
                Cross-sectional equivalence proving that slicing the 4D quaternionic Julia boundary along coordinate planes recovers the 2D Penrose deflation scaling exponent.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
