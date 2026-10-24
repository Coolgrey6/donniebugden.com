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
    setTimeout(() => setCopiedBib1(false), 2000);
  };

  const copyBibtex2 = () => {
    navigator.clipboard.writeText(bibtexPaper2);
    setCopiedBib2(true);
    setTimeout(() => setCopiedBib2(false), 2000);
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
            onClick={() => setActivePaper('odt')}
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
            onClick={() => setActivePaper('hypercomplex')}
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
            onClick={() => setActivePaper('all')}
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
                <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block">
                    Abstract
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    We introduce a dynamic theoretical framework that treats spatial dimensionality not as a static background manifold, but as an oscillating discrete function <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" /> traversing the 240 root vectors of the exceptional Lie algebra <MathBlock math="E_8" />. State vectors evolve under golden-ratio modulation <MathBlock math="\psi_{n+1} = \mathcal{P}_{D(n)} (\phi^{(-1)^n \cdot D(n)} \cdot \hat{\mathcal{E}}_8 \cdot \psi_n)" />. We demonstrate that during the reverse dimensional descent phase (<MathBlock math="D(n): 8 \to 1" />), the negative scaling factor <MathBlock math="\lambda_n = \phi^{-D(n)}" /> induces localized phase-cancellation across spacetime curvature, inverting effective stress-energy tensors (<MathBlock math="T_{\mu\nu}^{(\text{eff})}" />) and reducing effective gravitational mass (<MathBlock math="m_{\text{eff}} \to 0" /> or <MathBlock math="m_{\text{eff}} < 0" />). Concurrently, non-local 8D geodesic projection shunts localized 3-momentum into orthogonal hyper-dimensional lattice directions, enabling genuine inertial phase-slipping (<MathBlock math="a^\mu_{\text{proper}} = 0" />) without violating global 8D energy-momentum conservation (<MathBlock math="\nabla_A T^{AB}_{(8)} = 0" />). By enforcing <MathBlock math="\phi" />-harmonic frequency matching (<MathBlock math="\omega_k = \omega_0 \phi^k" />), an asymmetric metric gradient is sustained, establishing a rigorous mathematical foundation for propellantless field propulsion and gravitational shielding.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="text-slate-400">Keywords:</span>
                    <span className="text-slate-300">E8 Root Lattice</span> •
                    <span className="text-slate-300">Oscillating Dimensions</span> •
                    <span className="text-slate-300">Dynamic Metric Distortion</span> •
                    <span className="text-slate-300">Inertial Decoupling</span> •
                    <span className="text-slate-300">Anti-Gravity Field Dynamics</span> •
                    <span className="text-slate-300">Golden Ratio Modulation</span> •
                    <span className="text-slate-300">Alcubierre Geodesics</span> •
                    <span className="text-slate-300">Stress-Energy Inversion</span>
                  </div>
                </div>

                {/* Key Findings List */}
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider block">
                    Primary Formal Conclusions (Section 5)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-amber-400 font-bold block mb-1">1. Dynamic Metric Cancellation</span>
                      Reverse dimensional descent (<MathBlock math="D: 8 \to 1" />) contracts coordinates via <MathBlock math="\phi^{-D(n)}" />, inverting the effective stress-energy tensor <MathBlock math="T_{\mu\nu}^{(\text{eff})} = \hat{\Omega}_\phi(n) T_{\mu\nu}^{(0)}" /> and reducing effective gravitational mass to <MathBlock math="m_{\text{eff}} \le 0" />.
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-cyan-400 font-bold block mb-1">2. Inertial Phase-Slipping</span>
                      Higher-dimensional geodesics on <MathBlock math="\mathcal{M}^8" /> shunt 3-momentum into orthogonal <MathBlock math="E_8" /> internal degrees of freedom (<MathBlock math="y^a" />), eliminating proper acceleration: <MathBlock math="a^\mu_{\text{proper}} = 0" /> with zero internal <MathBlock math="g" />-force.
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <span className="text-emerald-400 font-bold block mb-1">3. φ-Harmonic Propulsion</span>
                      Discrete frequency matching <MathBlock math="\omega_k = \omega_0 \phi^k" /> establishes a forward contraction (<MathBlock math="\phi^{-D}" />) and aft expansion (<MathBlock math="\phi^{+D}" />) metric gradient, enabling propellantless field acceleration.
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
                    Comparative Analysis: Standard Einstein GR vs. Bugden ODT Framework
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2.5 px-3">Physical Principle</th>
                          <th className="py-2.5 px-3">Standard Einstein GR</th>
                          <th className="py-2.5 px-3 text-amber-300">Bugden Oscillating E8 Metric Distortion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300">
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Spacetime Manifold</td>
                          <td className="py-2.5 px-3">Static 4D pseudo-Riemannian manifold</td>
                          <td className="py-2.5 px-3 text-amber-200">Dynamic projection slice <MathBlock math="D(n) \in \{1,\dots,8\}" /> in 8D E8 lattice</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Equivalence Principle</td>
                          <td className="py-2.5 px-3">Strict, universal identity <MathBlock math="m_i \equiv m_g" /></td>
                          <td className="py-2.5 px-3 text-amber-200">Conditional projection; inertial &amp; gravitational mass independently tunable (<MathBlock math="m_{\text{eff}} \to 0" />)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Gravitational Constant</td>
                          <td className="py-2.5 px-3">Fixed scalar <MathBlock math="G \approx 6.674 \times 10^{-11}" /></td>
                          <td className="py-2.5 px-3 text-amber-200">Dynamic coupling function <MathBlock math="G(n)" /> modulated by <MathBlock math="\phi^{\pm(D-4)}" /></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Stress-Energy Tensor</td>
                          <td className="py-2.5 px-3">Strictly non-negative energy conditions (<MathBlock math="\rho \ge 0" />)</td>
                          <td className="py-2.5 px-3 text-amber-200">Descent phase yields effective negative energy density (<MathBlock math="T_{00}^{(\text{eff})} < 0" />)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Momentum Conservation</td>
                          <td className="py-2.5 px-3">Local 4D divergence-free: <MathBlock math="\nabla_\mu T^{\mu\nu} = 0" /></td>
                          <td className="py-2.5 px-3 text-amber-200">Global 8D conservation: <MathBlock math="\nabla_A T^{AB} = 0" />; 3-momentum shunted to <MathBlock math="y^a" /></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 font-semibold text-slate-400">Propulsion Paradigm</td>
                          <td className="py-2.5 px-3">Reaction mass dependent (<MathBlock math="F = \dot{m} v_e" />)</td>
                          <td className="py-2.5 px-3 text-amber-200">Propellantless field distortion; geodesic translation without internal <MathBlock math="g" />-force</td>
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
