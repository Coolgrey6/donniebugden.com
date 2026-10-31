import React, { useState } from 'react';
import MathBlock from './MathBlock';
import { 
  BookOpen, 
  Check, 
  Layers, 
  Zap, 
  Activity, 
  Compass, 
  Orbit, 
  Maximize2,
  Atom,
  Table as TableIcon
} from 'lucide-react';

export default function MathematicalFormalismODT() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      id: "pillar-1",
      number: "01",
      title: "The Periodic Triangular Dimension Operator D(n)",
      math: "D(n) = 8 - |(n \\bmod 14) - 7|, \\quad n \\in \\mathbb{N}_0",
      description: "Maps the discrete clock step n to a closed 14-phase periodic triangular trajectory cycling through dimensions D(n) \\in \\{1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2\\} across the 240-root polytope of E8.",
      significance: "Establishes a discrete, periodic geometric framework for exploring dimensional oscillation. Physical interpretations linking this trajectory to quantum or cosmological phenomena are presently exploratory conjectures that have not been derived from the operator or subjected to quantitative tests."
    },
    {
      id: "pillar-2",
      number: "02",
      title: "Coupled E8 Projection & Golden-Ratio Modulation",
      math: "\\psi_{n+1} = \\mathcal{P}_{D(n)} \\left( \\phi^{(-1)^n \\cdot D(n)} \\cdot \\hat{\\mathcal{E}}_8 \\cdot \\psi_n \\right)",
      description: "State vectors evolve by alternating powers of the golden ratio \\phi = (1+\\sqrt{5})/2. The operator \\hat{\\mathcal{E}}_8 projects onto the 240 roots of E8, while \\mathcal{P}_{D(n)} orthogonally slices the 8D root lattice into the active D(n) subspace.",
      significance: "Supplies a self-similar discrete scale spectrum S_n = \\phi^{(-1)^n \\cdot D(n)}. Physical interpretations linking this modulation to cosmological expansion or subatomic dynamics remain exploratory hypotheses."
    },
    {
      id: "pillar-3",
      number: "03",
      title: "Exploratory Metric Distortion Tensor g_μν(n, x)",
      math: "g_{\\mu\\nu}(n, \\mathbf{x}) = \\eta_{\\mu\\nu} + h_{\\mu\\nu}(\\mathbf{x}) \\left[ 1 - \\xi \\cos\\left( \\frac{2\\pi n}{14} \\right) \\phi^{-|D(n) - 4|} \\right] + \\sum_{\\alpha \\in \\Phi(E_8)} \\kappa_\\alpha e^{i(\\mathbf{k}_\\alpha \\cdot \\mathbf{x} - \\omega_\\alpha t)} \\Pi_{\\mu\\nu}(\\alpha)",
      description: "A proposed phenomenological model modifying the classical Minkowski metric \\eta_{\\mu\\nu} through a periodic phase-modulation envelope parameterized by the dimensional step n.",
      significance: "Exploratory mathematical formulation investigating whether localized curvature could in principle be modulated via high-dimensional interference. This physical consequence has not yet been derived from first principles or tested quantitatively."
    },
    {
      id: "pillar-4",
      number: "04",
      title: "Stress-Energy Inversion & Effective Mass (Exploratory Model)",
      math: "T_{\\mu\\nu}^{(\\text{eff})}(n) = \\hat{\\Omega}_\\phi(n) \\, T_{\\mu\\nu}^{(0)}, \\quad m_{\\text{eff}}(n) = m_0 \\cos\\left( \\frac{\\pi(n - 7)}{7} \\right) \\phi^{-|D(n) - 4|}",
      description: "A theoretical model proposing that stress-energy tensors might invert during dimensional descent phases, hypothesizing effective gravitational mass reduction m_{\\text{eff}} \\le 0.",
      significance: "Conjectural research direction. Ideas linking dimensional descent to gravitational modification or negative energy density are exploratory hypotheses and have not been derived from the operator or tested in quantitative experiments."
    },
    {
      id: "pillar-5",
      number: "05",
      title: "Hyper-Dimensional Geodesics & Inertial Shunting (Hypothesis)",
      math: "\\frac{d^2 x^\\mu}{d\\tau^2} = -\\Gamma^\\mu_{\\alpha\\beta} u^\\alpha u^\\beta - 2\\Gamma^\\mu_{\\alpha b} u^\\alpha v^b - \\Gamma^\\mu_{ab} v^a v^b \\implies a^\\mu_{\\text{proper}} = 0",
      description: "Explores geodesic equations on an 8-manifold \\mathcal{M}^8 where 3-momentum is hypothesized to couple with internal hyper-dimensional coordinates y^a.",
      significance: "Presents a conceptual framework for inertial decoupling. This physical interpretation has not been derived from the base dimensional operator or subjected to quantitative tests."
    },
    {
      id: "pillar-6",
      number: "06",
      title: "φ-Harmonic Resonance Spectrum (Harmonic Structure)",
      math: "\\omega_k = \\omega_0 \\cdot \\phi^k, \\quad \\omega_{k+2} - \\omega_{k+1} = \\omega_k \\quad (k \\in \\mathbb{Z})",
      description: "Discrete geometric harmonic series governed by the golden ratio identity \\phi^2 - \\phi - 1 = 0, where beat frequencies between adjacent modes yield self-similar algebraic relationships.",
      significance: "Exhibits exact algebraic recurrence relations. Applications to physical waveguides, metamaterials, or macroscopic coherent spacetime distortions remain speculative proposals awaiting empirical investigation."
    },
    {
      id: "pillar-7",
      number: "07",
      title: "Dynamic Gravitational Coupling Function G(n) (Conjecture)",
      math: "G(n) = G_0 \\cdot \\left[ \\frac{\\phi^{4 - D(n)} - \\phi^{D(n) - 4}}{\\phi^4 - \\phi^{-4}} \\right] \\cdot \\cos\\left( \\frac{\\pi n}{7} \\right)",
      description: "A phenomenological coupling function exploring variable effective gravitational coupling modulated by dimensional offset |D(n) - 4|.",
      significance: "Exploratory model investigating dynamic gravitational shielding or variable-G cosmologies. Conjectural and presently untested quantitatively against gravitational or cosmological bounds."
    },
    {
      id: "pillar-8",
      number: "08",
      title: "Resonance Power Requirement Formulation (Theoretical Estimate)",
      math: "\\mathcal{P}_{\\text{req}}(n) = \\hbar \\omega_0 \\sum_{j=1}^{240} \\left| \\frac{\\Delta D(n)}{\\Delta t} \\right| \\ln(\\phi) \\cdot \\phi^{2(D(n) - 4)} \\left| \\langle \\psi_n | \\hat{\\mathcal{E}}_{8, j} | \\psi_n \\rangle \\right|^2",
      description: "A formal power scaling estimate evaluating the hypothetical energy required to maintain coherent dimensional phase-locking across 240 E8 root projections.",
      significance: "Theoretical power budget for proposed experimental testing regimes. Represents a preliminary exploratory scaling relation rather than a quantitatively validated engineering parameter."
    }
  ];

  return (
    <section id="formalism-odt" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Rigorous Operator Definitions &amp; Exploratory Formalism
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          The Eight Mathematical Pillars of the ODT Framework
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Exact mathematical definitions of the dimensional operator <MathBlock math="D(n)" /> and golden-ratio scale factors, alongside exploratory formulations investigating potential spacetime metric and geodesic consequences.
        </p>
      </div>

      {/* Computational & Theoretical Status Note */}
      <div className="mb-10 p-6 rounded-2xl bg-amber-950/30 border border-amber-800/60 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
            <Orbit className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                Theoretical &amp; Physical Status Note
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-[10px] font-mono text-amber-300 border border-amber-700">
                Exact Operator • Untested Physical Hypotheses
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              The mathematical definition of <MathBlock math="D(n)" /> is exact and periodic. Physical consequences relating the trajectory to quantum or cosmological phenomena remain conjectural and are presented as long-term research directions rather than established results. These physical consequences have not yet been quantitatively tested.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Pillar Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
        {pillars.map((pillar, idx) => (
          <button
            key={pillar.id}
            onClick={() => setSelectedPillar(idx)}
            className={`p-3 rounded-xl border text-left transition-all font-mono ${
              selectedPillar === idx
                ? 'bg-amber-950 text-amber-300 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <span className="text-[10px] block text-slate-500 font-bold">PILLAR {pillar.number}</span>
            <span className="text-xs font-bold line-clamp-1">{pillar.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Featured Pillar Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-amber-950 text-amber-400 border border-amber-800 font-mono text-xs font-bold">
              PILLAR {pillars[selectedPillar].number} / 08
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              {pillars[selectedPillar].title}
            </h3>
          </div>
        </div>

        {/* KaTeX Proof Block */}
        <div className="p-6 rounded-xl bg-slate-950/90 border border-slate-800/90 shadow-inner">
          <MathBlock math={pillars[selectedPillar].math} block={true} className="text-amber-300 text-sm sm:text-base py-3" />
        </div>

        {/* Derivation & Significance Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
            <span className="text-cyan-400 font-bold block uppercase tracking-wider">
              Mathematical Derivation &amp; Operator Definition
            </span>
            <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
              {pillars[selectedPillar].description}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-2">
            <span className="text-emerald-400 font-bold block uppercase tracking-wider">
              Physical &amp; Engineering Significance
            </span>
            <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
              {pillars[selectedPillar].significance}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
