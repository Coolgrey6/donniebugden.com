import React, { useState } from 'react';
import MathBlock from './MathBlock';
import { 
  ShieldCheck, 
  Rocket, 
  Activity, 
  Zap, 
  Layers, 
  Cpu, 
  Compass, 
  Lock, 
  ArrowRight,
  Sparkles,
  Radio,
  FileCheck
} from 'lucide-react';

export default function ProtocolsDashboardODT() {
  const [activeSection, setActiveSection] = useState('use-cases'); // 'use-cases' or 'protocols'

  const useCases = [
    {
      id: "propellantless-propulsion",
      title: "Exploratory Geodesic Translation Model",
      subtitle: "Hypothetical metric distortion model without exotic matter requirements",
      category: "Aerospace Propulsion Research",
      badge: "TRL 1 • Exploratory Proposal",
      icon: <Rocket className="w-5 h-5 text-amber-400" />,
      description: "Explores the theoretical possibility of establishing an asymmetric dimensional gradient across a vehicle boundary (forward descent phase φ^-D hypothesized to induce metric contraction, aft ascent phase φ^+D inducing expansion). Investigated as a conceptual long-term direction; has not yet been derived from first principles or quantitatively tested.",
      parameters: [
        { label: "Impulse Model", value: "Field-induced (Theoretical)" },
        { label: "Propellant Concept", value: "Zero reaction mass (Hypothesis)" },
        { label: "Modulation", value: "Resonant φ-harmonics (Conjecture)" },
        { label: "Empirical Status", value: "Untested quantitatively" }
      ]
    },
    {
      id: "inertial-decoupling",
      title: "Hyper-Dimensional Momentum Shunting (Hypothesis)",
      subtitle: "Theoretical framework exploring zero proper acceleration envelopes",
      category: "Theoretical Flight Dynamics",
      badge: "TRL 1 • Theoretical Hypothesis",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      description: "Investigates whether hyper-dimensional geodesic projection could shunt local 3-momentum into closed orthogonal internal coordinates y^a to cancel proper acceleration (a^μ_proper = 0). This physical interpretation remains an exploratory hypothesis awaiting rigorous mathematical derivation and empirical verification.",
      parameters: [
        { label: "Internal G-Force", value: "Hypothesized 0.0 g envelope" },
        { label: "Trajectory Model", value: "Non-inertial geodesic shift" },
        { label: "Lattice Basis", value: "8D E8 root invariant" },
        { label: "Empirical Status", value: "Untested quantitatively" }
      ]
    },
    {
      id: "gravimetric-stealth",
      title: "Gravitational Signature Modulation (Conjecture)",
      subtitle: "Conceptual metric flattening targeting quantum sensor attenuation",
      category: "Quantum Metrology & Sensing",
      badge: "TRL 1 • Conceptual Model",
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      description: "Explores whether the ODT metric distortion operator could theoretically modulate an object's external gravitational signature (m_eff → 0) against precision quantum gravimeters. Presented as an exploratory concept without current experimental validation.",
      parameters: [
        { label: "Theoretical Target", value: "Gravitational gradient attenuation" },
        { label: "Sensor Benchmark", value: "Cold-atom interferometry" },
        { label: "Effective Mass", value: "m_eff / m_0 controllable [0.0..1.0]" },
        { label: "Empirical Status", value: "Untested quantitatively" }
      ]
    },
    {
      id: "vacuum-energy-extraction",
      title: "Dynamic Casimir & Vacuum Energy Modeling",
      subtitle: "Theoretical evaluation of non-equilibrium stress tensors via Lucas modes",
      category: "Advanced Energy & Field Theory",
      badge: "TRL 1 • Exploratory Theory",
      icon: <Zap className="w-5 h-5 text-sky-400" />,
      description: "Examines the mathematical structure of summing vacuum energy modes across the 14-step ODT cycle, evaluating golden-ratio phase relationships in Lucas-mode cavities. Conjectural research direction requiring experimental validation.",
      parameters: [
        { label: "Harmonic Symmetry", value: "Lucas number mode symmetry" },
        { label: "Casimir Regime", value: "Hypothesized sign modulation" },
        { label: "Frequency Scale", value: "THz to microwave φ-harmonics" },
        { label: "Empirical Status", value: "Untested quantitatively" }
      ]
    }
  ];

  const protocols = [
    {
      phase: "PROTOCOL 01",
      title: "Quasicrystalline Resonator Cavity Interferometry",
      target: "Anomalous Gravitational Weight Shift Detection",
      sponsor: "DARPA DSO / AFOSR Alignment",
      spec: "Al-Pd-Mn icosahedral alloy exhibiting native golden-ratio φ atomic projection spacing. Driven by microwave radiation at f_n = f_0 · φ^n, measuring anomalous mass shifts (Δm_eff / m_0 ≥ 10^-6) on a cryogenic torsion balance."
    },
    {
      phase: "PROTOCOL 02",
      title: "Dynamic Casimir Phase Inversion Experiment",
      target: "Verification of Negative Stress-Energy Regimes",
      sponsor: "National Science Foundation / DOE Advanced Physics",
      spec: "Atomic force microscope (AFM) in ultra-high vacuum measuring Casimir forces between a gold sphere and 4D Mandelbrot boundary metamaterial under 14-step pulsed modulation. Observing transition from attraction (F_C < 0) to repulsion (F_C > 0)."
    },
    {
      phase: "PROTOCOL 03",
      title: "Dual-Cavity Resonant Metric Interferometry",
      target: "Phase-Shift Detection of Spacetime Metric Distortion",
      sponsor: "DoD Advanced Space Defense / Quantum Metrology",
      spec: "High-finesse Fabry-Pérot laser interferometer with one optical arm traversing an active E8 electromagnetic field generator. Detects phase perturbations ΔΦ ∝ ∮ h_μν(n) dx^μ characteristic of non-local dimensional descent."
    },
    {
      phase: "PROTOCOL 04",
      title: "Superconducting Gravimeter Array Calibration",
      target: "Macroscopic Gravitational Field Attenuation",
      sponsor: "Naval Research Laboratory / Strategic Systems Programs",
      spec: "Cryogenic superconducting gravimeters measuring vertical gravitational acceleration g with 10^-10 m/s² resolution positioned adjacent to synchronized E8 harmonic coil arrays during dimensional ascent/descent sweeps."
    }
  ];

  return (
    <section id="protocols-odt" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Strategic Defense, Aerospace &amp; Experimental Roadmap
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Exploratory Applications &amp; Experimental Verification Roadmap
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Conceptual exploration pathways for the Oscillating Dimensional Trajectory framework across advanced field dynamics, high-dimensional geodesics, and precision quantum test protocols.
        </p>

        {/* Theoretical & Empirical Status Note */}
        <div className="mt-6 p-5 rounded-2xl bg-amber-950/30 border border-amber-800/60 max-w-3xl text-left">
          <div className="flex items-start gap-3">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider shrink-0 mt-0.5">
              Status Note:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              The mathematical definition of <MathBlock math="D(n)" /> is exact and periodic. Physical consequences relating the trajectory to quantum or cosmological phenomena remain conjectural and are presented as long-term research directions rather than established results. These concepts have not yet been quantitatively tested.
            </p>
          </div>
        </div>

        {/* Section Selector */}
        <div className="mt-8 flex items-center gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveSection('use-cases')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeSection === 'use-cases'
                ? 'bg-amber-950 text-amber-300 border border-amber-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            Aerospace &amp; Defense Use Cases
          </button>
          <button
            onClick={() => setActiveSection('protocols')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeSection === 'protocols'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Experimental Verification Suite
          </button>
        </div>
      </div>

      {/* View 1: Use Cases Grid */}
      {activeSection === 'use-cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((uc) => (
            <div 
              key={uc.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {uc.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-amber-950/80 text-amber-300 border border-amber-800/60 font-mono text-[10px] font-bold">
                    {uc.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    {uc.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-100 tracking-tight">
                    {uc.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono block mt-1">
                    {uc.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {uc.description}
                </p>
              </div>

              {/* Parameter Table */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
                {uc.parameters.map((param, pIdx) => (
                  <div key={pIdx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-900">
                    <span className="text-slate-500 block text-[10px]">{param.label}</span>
                    <span className="text-slate-200 font-bold text-xs">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Verification Protocols List */}
      {activeSection === 'protocols' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protocols.map((proto, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-xs font-bold">
                    {proto.phase}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {proto.sponsor}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 tracking-tight">
                  {proto.title}
                </h3>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                  Target: {proto.target}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {proto.spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
