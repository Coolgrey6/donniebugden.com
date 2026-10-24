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
      description: "Maps the discrete cosmological clock step n to a closed 14-phase triangular wave. Spatial dimensionality traverses D(n) \\in \\{1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2\\}, embedding physical state evolution directly within the 240-root vector polytope of E8.",
      significance: "Establishes that dimensions are dynamic quantum clock states rather than static geometric backgrounds, creating an alternating cycle of cosmological expansion and subatomic contraction."
    },
    {
      id: "pillar-2",
      number: "02",
      title: "Coupled E8 Projection & Golden-Ratio Modulation",
      math: "\\psi_{n+1} = \\mathcal{P}_{D(n)} \\left( \\phi^{(-1)^n \\cdot D(n)} \\cdot \\hat{\\mathcal{E}}_8 \\cdot \\psi_n \\right)",
      description: "State vectors evolve by alternating powers of the golden ratio \\phi = (1+\\sqrt{5})/2. The operator \\hat{\\mathcal{E}}_8 projects onto the 240 roots of E8, while \\mathcal{P}_{D(n)} orthogonally slices the 8D root lattice into the active D(n) subspace.",
      significance: "Guarantees self-similar scale invariance and deterministic quantum-to-cosmic projection without requiring arbitrary scalar field potentials."
    },
    {
      id: "pillar-3",
      number: "03",
      title: "Dynamic Metric Distortion Tensor g_μν(n, x)",
      math: "g_{\\mu\\nu}(n, \\mathbf{x}) = \\eta_{\\mu\\nu} + h_{\\mu\\nu}(\\mathbf{x}) \\left[ 1 - \\xi \\cos\\left( \\frac{2\\pi n}{14} \\right) \\phi^{-|D(n) - 4|} \\right] + \\sum_{\\alpha \\in \\Phi(E_8)} \\kappa_\\alpha e^{i(\\mathbf{k}_\\alpha \\cdot \\mathbf{x} - \\omega_\\alpha t)} \\Pi_{\\mu\\nu}(\\alpha)",
      description: "Modifies the classical Minkowski metric \\eta_{\\mu\\nu} through a periodic phase-modulation envelope. As n enters the descent phase, destructive interference suppresses the perturbation tensor h_{\\mu\\nu}.",
      significance: "Demonstrates that localized spacetime curvature is algebraically cancellable via non-local E8 lattice interference, yielding flat metric envelopes inside gravitational fields."
    },
    {
      id: "pillar-4",
      number: "04",
      title: "Stress-Energy Inversion & Gravitational Mass Reduction",
      math: "T_{\\mu\\nu}^{(\\text{eff})}(n) = \\hat{\\Omega}_\\phi(n) \\, T_{\\mu\\nu}^{(0)}, \\quad m_{\\text{eff}}(n) = m_0 \\cos\\left( \\frac{\\pi(n - 7)}{7} \\right) \\phi^{-|D(n) - 4|}",
      description: "The stress-energy operator \\hat{\\Omega}_\\phi(n) inverts local energy density during dimensional descent. At resonance (n \\to 7^+), effective gravitational mass m_{\\text{eff}} \\to 0, and in overdriven modes produces negative energy density T_{00} < 0.",
      significance: "Resolves the requirement for macroscopic exotic matter by generating dynamic negative curvature directly from the algebraic phase of the E8 projection."
    },
    {
      id: "pillar-5",
      number: "05",
      title: "Hyper-Dimensional Geodesics & Inertial Phase-Slipping",
      math: "\\frac{d^2 x^\\mu}{d\\tau^2} = -\\Gamma^\\mu_{\\alpha\\beta} u^\\alpha u^\\beta - 2\\Gamma^\\mu_{\\alpha b} u^\\alpha v^b - \\Gamma^\\mu_{ab} v^a v^b \\implies a^\\mu_{\\text{proper}} = 0",
      description: "By phase-locking internal velocities v^a = dy^a/d\\tau across the 4 hyper-dimensional coordinates of \\mathcal{M}^8, the mixed Christoffel terms cancel 4D gravitational and inertial acceleration.",
      significance: "Eliminates proper acceleration and internal g-forces, enabling instantaneous multi-Mach trajectory redirection without structural stress or biological harm."
    },
    {
      id: "pillar-6",
      number: "06",
      title: "φ-Harmonic Non-Dispersive Resonance Spectrum",
      math: "\\omega_k = \\omega_0 \\cdot \\phi^k, \\quad \\omega_{k+2} - \\omega_{k+1} = \\omega_k \\quad (k \\in \\mathbb{Z})",
      description: "Because \\phi satisfies \\phi^2 - \\phi - 1 = 0, beat frequencies between any two adjacent harmonics produce exact destructive interference with subsequent modes, preventing energy cascade into chaotic thermal noise.",
      significance: "Sustains macroscopic coherent metric distortion with minimal dissipative loss, creating an ultra-high Q-factor spacetime waveguide."
    },
    {
      id: "pillar-7",
      number: "07",
      title: "Dynamic Gravitational Coupling Function G(n)",
      math: "G(n) = G_0 \\cdot \\left[ \\frac{\\phi^{4 - D(n)} - \\phi^{D(n) - 4}}{\\phi^4 - \\phi^{-4}} \\right] \\cdot \\cos\\left( \\frac{\\pi n}{7} \\right)",
      description: "Replaces Newton's universal gravitational constant G_0 with an oscillating coupling function that attenuates to zero at dimensional descent boundaries and reverses sign under negative phase alignment.",
      significance: "Unifies classical Newtonian gravity with dynamic gravitational shielding and repulsive cosmic horizon acceleration."
    },
    {
      id: "pillar-8",
      number: "08",
      title: "Poynting-Stress Operator & Resonance Power Requirement",
      math: "\\mathcal{P}_{\\text{req}}(n) = \\hbar \\omega_0 \\sum_{j=1}^{240} \\left| \\frac{\\Delta D(n)}{\\Delta t} \\right| \\ln(\\phi) \\cdot \\phi^{2(D(n) - 4)} \\left| \\langle \\psi_n | \\hat{\\mathcal{E}}_{8, j} | \\psi_n \\rangle \\right|^2",
      description: "Formalizes the minimum power needed to maintain metric distortion across a volume \\mathcal{V}. Energy is bounded by constructive geometric resonance rather than mass-equivalent conversion (E \\ne mc^2).",
      significance: "Demonstrates that macroscopic gravitational modification is achievable within practical energy budgets accessible to advanced electromagnetic and metamaterial systems."
    }
  ];

  return (
    <section id="formalism-odt" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          Rigorous Mathematical Proofs &amp; KaTeX Formalism
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          The Eight Mathematical Pillars of ODT Gravitational Modification
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Closed-form mathematical derivations bridging Lie algebra <MathBlock math="E_8" />, dimensional stepping operators, non-Riemannian metric distortions, and hyper-dimensional momentum conservation.
        </p>
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
