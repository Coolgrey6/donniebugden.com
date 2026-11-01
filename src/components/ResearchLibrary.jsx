import React, { useState } from 'react';
import MathBlock from './MathBlock';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Check, 
  Layers, 
  Quote, 
  Sparkles,
  Atom,
  Orbit,
  Zap,
  Table as TableIcon
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import {
  ComputationalStatusNoteBody,
  ExactArithmeticCertificateSection,
} from '../content/theoryIExactArithmetic';

export default function ResearchLibrary() {
  // Top-level paper selection: 'odt' (This Paper: Anti-Gravity/ODT), 'hypercomplex' (The Other Paper: Quasicrystals), or 'all' (Dual Archive)
  const [activePaper, setActivePaper] = useState('odt'); 
  
  // Sub-tabs for Paper II (This Paper)
  const [odtSubTab, setOdtSubTab] = useState('manuscript'); // 'manuscript' or 'atlas'
  
  // Sub-tabs for Paper I (The Other Paper)
  const [hyperSubTab, setHyperSubTab] = useState('manuscript'); // 'manuscript' or 'atlas'

  // BibTeX copy states
  const [copiedBib1, setCopiedBib1] = useState(false);
  const [copiedBib2, setCopiedBib2] = useState(false);

  // BibTeX for Paper I (The Other Paper)
  const bibtexPaper1 = `@article{bugden2026hypercomplex,
  title={Hypercomplex Julia-Set Boundaries Parameterized by the Golden Ratio as Non-Local Binary Selectors on the E8 Root System},
  author={Bugden, Donald M.},
  journal={Journal of Mathematical Physics & Discrete Geometry},
  volume={2026},
  number={E8-04},
  pages={1--4},
  year={2026},
  publisher={Theoretical Physics Research Initiative}
}`;

  // BibTeX for Paper II (This Paper)
  const bibtexPaper2 = `@article{bugden2026odt,
  title={Oscillating Dimensional Trajectories on E8 Lattices: Dynamic Metric Distortion, Inertial Decoupling, and Gravitational Modification},
  author={Bugden, Donald M.},
  journal={Journal of Mathematical Physics & Discrete Geometry},
  volume={2026},
  number={E8-05},
  pages={1--6},
  year={2026},
  publisher={Theoretical Physics Research Initiative}
}`;

  const copyBibtex1 = () => {
    navigator.clipboard.writeText(bibtexPaper1);
    setCopiedBib1(true);
    trackEvent('copy_bibtex', { paper: 'hypercomplex_quasicrystals' });
    setTimeout(() => setCopiedBib1(false), 2000);
  };

  const copyBibtex2 = () => {
    navigator.clipboard.writeText(bibtexPaper2);
    setCopiedBib2(true);
    trackEvent('copy_bibtex', { paper: 'odt_anti_gravity' });
    setTimeout(() => setCopiedBib2(false), 2000);
  };

  const handleSelectPaper = (paperId) => {
    setActivePaper(paperId);
    trackEvent('research_tab_switch', { paper_selected: paperId });
  };

  return (
    <section id="research" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <FileText className="w-3.5 h-3.5" />
          Published Theoretical Papers &amp; Atlases
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Theoretical Research Library
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
          Original monographs and companion visual proof atlases by Donald M. Bugden.
        </p>

        {/* Primary Paper Selection - Section Breakdown */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-950/90 rounded-2xl border border-slate-800 text-xs font-mono max-w-3xl">
          <button
            onClick={() => handleSelectPaper('odt')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activePaper === 'odt'
                ? 'bg-amber-950 text-amber-300 border border-amber-600/60 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Orbit className="w-4 h-4 text-amber-400" />
            <span>Paper II: Metric Distortion &amp; Anti-Gravity (ODT &amp; E8)</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              New
            </span>
          </button>

          <button
            onClick={() => handleSelectPaper('hypercomplex')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activePaper === 'hypercomplex'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Atom className="w-4 h-4 text-cyan-400" />
            <span>Paper I: Hypercomplex Parity on E8</span>
          </button>

          <button
            onClick={() => handleSelectPaper('all')}
            className={`px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activePaper === 'all'
                ? 'bg-slate-800 text-slate-100 border border-slate-700 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Dual Archive</span>
          </button>
        </div>
      </div>

      <div className="space-y-16">
        {/* ========================================================================= */}
        {/* SECTION 1: THIS PAPER — OSCILLATING DIMENSIONAL TRAJECTORIES & ANTI-GRAVITY */}
        {/* ========================================================================= */}
        {(activePaper === 'odt' || activePaper === 'all') && (
          <div id="paper-odt" className="space-y-6">
            {/* Paper Header Banner */}
            <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-amber-900/40">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-amber-950/90 text-amber-400 border border-amber-800 text-xs font-mono font-bold">
                  SECTION 1: THEORETICAL PROPOSAL
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Paper ID: JMP-DG-2026-E8-05 • Gravitational Modification &amp; Inertial Decoupling
                </span>
              </div>

              {/* Sub-Tabs for Paper II */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setOdtSubTab('manuscript')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    odtSubTab === 'manuscript'
                      ? 'bg-amber-950 text-amber-300 border border-amber-600/50 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Theoretical Manuscript
                </button>
                <button
                  onClick={() => setOdtSubTab('atlas')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    odtSubTab === 'atlas'
                      ? 'bg-amber-950 text-amber-300 border border-amber-600/50 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Proof Atlas &amp; Operators
                </button>
              </div>
            </div>

            {/* Sub-Tab 1: Manuscript */}
            {odtSubTab === 'manuscript' && (
              <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-amber-900/40 shadow-2xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                        Theoretical Proposal • Open Access
                      </span>
                      <span className="text-slate-400">
                        Journal of Mathematical Physics &amp; Discrete Geometry
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-500">Paper ID: JMP-DG-2026-E8-05</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                      Oscillating Dimensional Trajectories on E8 Lattices: Dynamic Metric Distortion, Inertial Decoupling, and Gravitational Modification
                    </h3>

                    <div className="pt-1 text-sm font-mono text-slate-400 flex flex-wrap items-center gap-4">
                      <span><strong className="text-slate-200">Donald M. Bugden</strong></span>
                      <span>Department of Mathematical Sciences • Theoretical Physics Research Initiative</span>
                      <a href="mailto:donnie.bugden@gmail.com" className="text-amber-400 hover:underline">
                        donnie.bugden@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href="/Oscillating_Dimensional_Trajectory_Paper.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF (131 KB)
                    </a>
                    <button
                      onClick={copyBibtex2}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition flex items-center gap-1.5"
                      title="Copy BibTeX Citation"
                    >
                      {copiedBib2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Quote className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Abstract Box */}
                <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-4">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block">
                    Abstract
                  </span>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-3">
                    <p>
                      We introduce a recursive dimensional operator that treats spatial dimensionality as a discrete oscillating function rather than a fixed background. The operator is defined by
                    </p>
                    <MathBlock 
                      block 
                      math="D(n) = 8 - |(n \bmod 14) - 7|"
                    />
                    <p>
                      producing a periodic triangular trajectory that cycles through dimensions 1 through 8. When modulated by powers of the golden ratio,
                    </p>
                    <MathBlock 
                      block 
                      math="S_n = \phi^{(-1)^n \cdot D(n)}"
                    />
                    <p>
                      the construction generates a discrete spectrum of scale factors.
                    </p>
                    <p>
                      The operator provides a well-defined geometric framework for exploring dimensional oscillation. Interpretations that link descent phases to quantum non-locality or ascent phases to cosmological expansion, as well as any associated anti-gravity or inertial-decoupling ideas, are presently exploratory and have not been derived from the operator or subjected to quantitative tests.
                    </p>
                  </div>

                  {/* Status Note */}
                  <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-200 space-y-1 mt-4">
                    <span className="font-bold uppercase tracking-wider block text-amber-400">
                      Theoretical &amp; Empirical Status Note
                    </span>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      The mathematical definition of <MathBlock math="D(n)" /> is exact and periodic. Physical consequences relating the trajectory to quantum or cosmological phenomena remain conjectural and are presented as long-term research directions rather than established results.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-slate-400">Keywords:</span>
                    <span className="text-slate-300">Recursive Dimensional Operator</span> •
                    <span className="text-slate-300">Oscillating Trajectories</span> •
                    <span className="text-slate-300">Golden Ratio Scale Factors</span> •
                    <span className="text-slate-300">E8 Polytope Geometry</span> •
                    <span className="text-slate-300">Exploratory Metric Distortion</span> •
                    <span className="text-slate-300">Inertial Decoupling (Hypothesis)</span> •
                    <span className="text-slate-300">Cosmological Scaling (Conjecture)</span>
                  </div>
                </div>

                {/* Key Findings List */}
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">
                    Primary Formal Components &amp; Research Status
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-amber-400 font-bold block mb-1">1. Exact Periodic Operator D(n)</span>
                      Closed periodic triangular trajectory cycling through dimensions 1 through 8 with scale factors <MathBlock math="S_n = \phi^{(-1)^n \cdot D(n)}" />.
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-cyan-400 font-bold block mb-1">2. Metric &amp; Inertial Proposals (Exploratory)</span>
                      Proposals linking descent phases to curvature cancellation (<MathBlock math="T_{\mu\nu}^{(\text{eff})}" />) or internal momentum shunting (<MathBlock math="a^\mu_{\text{proper}} = 0" />) are exploratory hypotheses that have not yet been quantitatively tested.
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-emerald-400 font-bold block mb-1">3. Cosmological Extensions (Open Directions)</span>
                      Conjectured relationships between ascending dimensional phases and cosmological expansion are conceptual research directions rather than derived or verified results.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Atlas Companion Card */}
            {odtSubTab === 'atlas' && (
              <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-amber-900/40 shadow-2xl space-y-8 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                        Visual Proof Atlas &amp; Theoretical Blueprint • ODT Gravitational Modification
                      </span>
                      <span className="text-slate-400">Paper ID: JMP-DG-2026-E8-05</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                      Visual Companion &amp; Mathematical Proof Atlas: Metric Distortion &amp; Inertial Decoupling on E8
                    </h3>

                    <div className="pt-1 text-sm font-mono text-slate-400">
                      Accompanying Visual Atlas &amp; Operational Blueprint by Donald M. Bugden • Department of Mathematical Sciences
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href="/Oscillating_Dimensional_Trajectory_Paper.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                    >
                      <Download className="w-4 h-4" />
                      Download Atlas PDF (131 KB)
                    </a>
                  </div>
                </div>

                {/* Atlas Blueprint Figure Directory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                  <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <span className="text-amber-400 font-bold block">Figure 1.1 — The 14-Step Dimensional Trajectory Clock</span>
                    <p className="text-slate-400">
                      Periodic triangular wave <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" /> mapping discrete evolution steps <MathBlock math="n \in \mathbb{N}_0" /> across the 240 root vectors of the <MathBlock math="E_8" /> lattice.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <span className="text-cyan-400 font-bold block">Figure 2.1 — Dynamic Metric Distortion &amp; Stress-Energy Inversion</span>
                    <p className="text-slate-400">
                      Modulated metric tensor <MathBlock math="g_{\mu\nu}(n) = \eta_{\mu\nu} + h_{\mu\nu} [1 - \xi \cos(2\pi n / 14)\phi^{-|D-4|}]" /> driving destructive Riemann curvature interference.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <span className="text-rose-400 font-bold block">Figure 3.1 — Hyper-Dimensional Geodesic Projection &amp; Inertial Decoupling</span>
                    <p className="text-slate-400">
                      Geodesic phase-slipping across internal coordinates <MathBlock math="y^a" />, shunting 3-momentum into hyper-dimensional lattice directions to eliminate local proper <MathBlock math="g" />-forces.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <span className="text-emerald-400 font-bold block">Figure 4.1 — Asymmetric Field Propulsion &amp; Alcubierre Geodesic Bubble</span>
                    <p className="text-slate-400">
                      Metric contraction forward (<MathBlock math="\phi^{-D}" />) and expansion aft (<MathBlock math="\phi^{+D}" />) with finite resonance power requirement <MathBlock math="\mathcal{P}_{\text{req}} \propto \hbar \omega_0 \ln\phi" />.
                    </p>
                  </div>
                </div>

                {/* Core Operators Reference */}
                <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                    <Zap className="w-4 h-4" />
                    Formal Mathematical Operator Formulation
                  </div>
                  <div className="space-y-3 text-xs font-mono text-slate-300">
                    <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block mb-1">a) Modified Spacetime Metric Tensor:</span>
                      <MathBlock 
                        math="g_{\mu\nu}(n, \mathbf{x}) = \eta_{\mu\nu} + h_{\mu\nu}(\mathbf{x}) \cdot \left[ 1 - \xi \cos\left( \frac{2\pi n}{14} \right) \phi^{-|D(n) - 4|} \right] + \sum_{\alpha \in \Phi(E_8)} \kappa_\alpha e^{i(\mathbf{k}_\alpha \cdot \mathbf{x} - \omega_\alpha t)} \Pi_{\mu\nu}(\alpha)" 
                        block={true} 
                      />
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block mb-1">b) Effective Stress-Energy Tensor &amp; Dynamic Gravitational Coupling:</span>
                      <MathBlock 
                        math="T_{\mu\nu}^{(\text{eff})}(n) = \hat{\Omega}_\phi(n) T_{\mu\nu}^{(0)}, \quad G(n) = G_0 \cdot \left[ \frac{\phi^{4 - D(n)} - \phi^{D(n) - 4}}{\phi^4 - \phi^{-4}} \right] \cdot \cos\left( \frac{\pi n}{7} \right)" 
                        block={true} 
                      />
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block mb-1">c) Resonance Power Requirement Operator:</span>
                      <MathBlock 
                        math="\mathcal{P}_{\text{req}}(n) = \hbar \omega_0 \sum_{j=1}^{240} \left| \frac{\Delta D(n)}{\Delta t} \right| \ln(\phi) \cdot \phi^{2(D(n) - 4)} \left| \langle \psi_n | \hat{\mathcal{E}}_{8, j} | \psi_n \rangle \right|^2" 
                        block={true} 
                      />
                    </div>
                  </div>
                </div>

                {/* Peer-Reviewed Comparison Table */}
                <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                    <TableIcon className="w-4 h-4" />
                    Comparative Analysis: Standard Einstein GR vs. Exploratory ODT Framework
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2.5 px-3">Physical Principle</th>
                          <th className="py-2.5 px-3">Standard Einstein GR</th>
                          <th className="py-2.5 px-3 text-amber-300">Bugden ODT Framework (Exploratory Theoretical Model)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300">
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Spacetime Manifold</td>
                          <td className="py-2.5 px-3">Static 4D pseudo-Riemannian manifold</td>
                          <td className="py-2.5 px-3 text-amber-200">Dynamic projection slice <MathBlock math="D(n) \in \{1,\dots,8\}" /> in 8D E8 lattice (Exact Operator)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Equivalence Principle</td>
                          <td className="py-2.5 px-3">Strict, universal identity <MathBlock math="m_i \equiv m_g" /></td>
                          <td className="py-2.5 px-3 text-amber-200">Hypothesized dimensional decoupling (<MathBlock math="m_{\text{eff}} \to 0" />); exploratory and untested quantitatively</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Gravitational Constant</td>
                          <td className="py-2.5 px-3">Fixed scalar <MathBlock math="G \approx 6.674 \times 10^{-11}" /></td>
                          <td className="py-2.5 px-3 text-amber-200">Dynamic coupling function <MathBlock math="G(n)" /> modulated by <MathBlock math="\phi^{\pm(D-4)}" /> (Exploratory proposal)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Stress-Energy Tensor</td>
                          <td className="py-2.5 px-3">Strictly non-negative energy conditions (<MathBlock math="\rho \ge 0" />)</td>
                          <td className="py-2.5 px-3 text-amber-200">Conjectured descent-phase effective negative energy density (<MathBlock math="T_{00}^{(\text{eff})} < 0" />)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Momentum Conservation</td>
                          <td className="py-2.5 px-3">Local 4D divergence-free: <MathBlock math="\nabla_\mu T^{\mu\nu} = 0" /></td>
                          <td className="py-2.5 px-3 text-amber-200">Global 8D conservation: <MathBlock math="\nabla_A T^{AB} = 0" />; exploratory shunting hypothesis to internal <MathBlock math="y^a" /></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Propulsion Paradigm</td>
                          <td className="py-2.5 px-3">Reaction mass dependent (<MathBlock math="F = \dot{m} v_e" />)</td>
                          <td className="py-2.5 px-3 text-amber-200">Exploratory metric gradient translation; long-term conjectural research direction without quantitative tests</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: THE OTHER PAPER — HYPERCOMPLEX JULIA-SET BOUNDARIES ON E8      */}
        {/* ========================================================================= */}
        {(activePaper === 'hypercomplex' || activePaper === 'all') && (
          <div id="paper-hypercomplex" className="space-y-6">
            {/* Paper Header Banner */}
            <div className="flex items-center justify-between gap-4 flex-wrap pb-3 border-b border-cyan-900/40">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-cyan-950/90 text-cyan-400 border border-cyan-800 text-xs font-mono font-bold">
                  SECTION 2: RESEARCH ARTICLE &amp; ATLAS
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Paper ID: JMP-DG-2026-E8-04 • Quasicrystals, Frustration &amp; Icosians
                </span>
              </div>

              {/* Sub-Tabs for Paper I */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setHyperSubTab('manuscript')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    hyperSubTab === 'manuscript'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Research Manuscript
                </button>
                <button
                  onClick={() => setHyperSubTab('atlas')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    hyperSubTab === 'atlas'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  Visual Proof Atlas
                </button>
              </div>
            </div>

            {/* Sub-Tab 1: Manuscript */}
            {hyperSubTab === 'manuscript' && (
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
                      onClick={copyBibtex1}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono transition flex items-center gap-1.5"
                      title="Copy BibTeX Citation"
                    >
                      {copiedBib1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Quote className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Abstract Box */}
                <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-4">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-widest block">
                    Abstract
                  </span>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-3">
                    <p>
                      We present a dynamical construction that uses a quaternionic quadratic map parameterized by an icosian constant derived from the golden ratio as a ranking mechanism on projected roots of the E₈ lattice.
                    </p>
                    <p>
                      The iterated map is given by
                    </p>
                    <MathBlock 
                      block 
                      math="q_{n+1} = q_n^2 + C(\phi), \qquad C(\phi) = \tfrac{1}{2}\bigl(\phi + \mathbf{i} + \phi^{-1} \mathbf{j}\bigr)"
                    />
                    <p>
                      where <MathBlock math="\phi = (1+\sqrt{5})/2" />. The Green’s potential of this map,
                    </p>
                    <MathBlock 
                      block 
                      math="G(q) = \lim_{n\to\infty} 2^{-n} \log_+ |f_C^n(q)|"
                    />
                    <p>
                      induces a ranking of the projected roots. Under generic orthogonal projections of the 240 roots of E₈, this ranking yields an exactly balanced partition into two sets of 120 roots each (net magnetization zero). The ranking is distinct from a pure radial ordering.
                    </p>
                    <p>
                      The construction supplies a deterministic geometric procedure for assigning balanced chiral labels to projected E₈ roots. Whether this labeling anti-correlates on geometric neighbors and thereby reduces tetrahedral packing frustration remains an open conjecture; neighbor-correlation tests performed to date have not confirmed anti-phase ordering.
                    </p>
                  </div>

                  {/* Status Note */}
                  <div className="p-4 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-xs font-mono text-cyan-200 space-y-4 mt-4">
                    <span className="font-bold uppercase tracking-wider block text-cyan-400">
                      Computational Status Note
                    </span>
                    <ComputationalStatusNoteBody />
                    <div className="pt-4 border-t border-cyan-800/50">
                      <ExactArithmeticCertificateSection headingClassName="text-sm font-bold text-slate-100 tracking-wide" />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-slate-400">Keywords:</span>
                    <span className="text-slate-300">E8 Root Lattice</span> •
                    <span className="text-slate-300">Quaternionic Quadratic Map</span> •
                    <span className="text-slate-300">Green's Potential Ranking</span> •
                    <span className="text-slate-300">Balanced 120/120 Partition</span> •
                    <span className="text-slate-300">Golden Ratio Parameter C(φ)</span> •
                    <span className="text-slate-300">Tetrahedral Frustration (Conjecture)</span> •
                    <span className="text-slate-300">Icosian Shells</span>
                  </div>
                </div>

                {/* Key Findings List */}
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">
                    Primary Formal Conclusions &amp; Verification Status
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-cyan-400 font-bold block mb-1">1. Exact 120:120 Partition (Verified)</span>
                      Deterministic partition into balanced 120-element sets with net magnetization zero (<MathBlock math="\sum \sigma(\alpha) = 0" />) confirmed under generic orthogonal projections of the 240 E8 roots.
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-amber-400 font-bold block mb-1">2. Frustration Resolution (Open Conjecture)</span>
                      Whether this chiral labeling anti-correlates on geometric neighbors and resolves the 7.356° tetrahedral packing deficit remains an open conjecture; tests have not confirmed anti-phase ordering.
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-sky-400 font-bold block mb-1">3. Penrose Deflation Equivalence</span>
                      Planar restrictions yield Hausdorff dimension <MathBlock math="D_H \approx 1.378" />, concordant with 2D Penrose kite-and-dart inflation eigenvalue <MathBlock math="\lambda = \phi" />.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Atlas Companion Card */}
            {hyperSubTab === 'atlas' && (
              <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
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
                      className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
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
          </div>
        )}
      </div>
    </section>
  );
}
