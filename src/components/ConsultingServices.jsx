import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Lock, 
  Terminal, 
  CheckCircle2, 
  ArrowUpRight, 
  FileCheck2,
  Building2,
  Briefcase
} from 'lucide-react';

export default function ConsultingServices({ onOpenContact }) {
  const serviceCards = [
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      badge: "National Security & Cryptography",
      title: "Post-Quantum Cryptographic & Lattice Hardening",
      description: "Advising defense organizations, intelligence entities, and high-assurance security engineering teams on high-dimensional discrete lattice structures and post-quantum transitions.",
      deliverables: [
        "Cryptanalytic lattice reduction auditing (LLL, BKZ 2.0, Deep BKZ)",
        "Module-lattice parameter tuning (ML-KEM, ML-DSA, Falcon NTRU)",
        "Hypercomplex dynamical noise filtering for side-channel immunity",
        "NSA/NIST compliance and Post-Quantum Migration Roadmaps"
      ],
      tier: "Defense & Strategic"
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      badge: "Applied Discrete Geometry",
      title: "High-Dimensional Lattices (E8 & Leech Λ₂₄)",
      description: "Mathematical modeling for complex discrete optimization, optimal sphere packing, dense multi-dimensional signal constellations, and high-dimensional Voronoi partitioning.",
      deliverables: [
        "Gosset E₈ and Leech lattice (Λ₂₄) coding algorithms",
        "Kissing-number maximization for multi-antenna MIMO systems",
        "Discrete dynamical system simulation & non-crystallographic Coxeter groups",
        "Aperiodic quasicrystal projections & tiling generators"
      ],
      tier: "Advanced Computation"
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      badge: "Quantum Architecture",
      title: "Spin Networks & Topological Quantum Systems",
      description: "Formal theoretical physics and discrete geometric consulting for emergence theory programs, topological quantum state selection, and frustration-free Hamiltonian minimization.",
      deliverables: [
        "Quaternionic Julia boundary state selection functionals",
        "Dihedral shear strain mitigation in tetrahedral quasicrystals",
        "Coxeter H₄/H₃ invariant spin networks & braiding models",
        "Informational code-theoretic state validation algorithms"
      ],
      tier: "Theoretical Physics"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-amber-400" />,
      badge: "Executive Advisory",
      title: "Strategic Mathematical Retainer & Sanity Audits",
      description: "Direct executive-level advisory for founders, CTOs, and research directors navigating mathematically intense hardware, cryptographic, or algorithmic programs.",
      deliverables: [
        "Mathematical rigor audits for DARPA / NSF / DoD proposals",
        "Pre-investment technical diligence for deep-tech venture funds",
        "On-demand confidential advisory desk for executive leadership",
        "Bespoke theoretical colloquia and specialist team masterclasses"
      ],
      tier: "Advisory Retainer"
    }
  ];

  return (
    <section id="consulting" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Specialist Consulting Practice
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-3xl">
          Strategic Advisory &amp; Advanced Computation Practice
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
          Translating cutting-edge discrete geometry, hypercomplex dynamics, and exceptional Lie systems into high-impact defense, cryptographic, and computational solutions.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        {serviceCards.map((service, idx) => (
          <div
            key={idx}
            className="glass-panel p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-cyan-950/20"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {service.icon}
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                  {service.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                  Tier: {service.tier}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {service.description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block mb-2 font-semibold">
                  Core Capabilities &amp; Deliverables:
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((item, dIdx) => (
                    <li key={dIdx} className="text-xs text-slate-400 flex items-start gap-2 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Clearance / NDA Ready
              </span>
              <button
                onClick={onOpenContact}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform"
              >
                Retain for this domain <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Engagement Models Banner */}
      <div className="glass-panel-cyan p-8 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold text-slate-100">
              Advisory Retainers &amp; Defense Consulting Engagements
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-mono leading-relaxed">
            Donald Bugden accepts a limited number of ongoing research retainers, classified defense consultations, and deep-tech advisory engagements each quarter.
          </p>
        </div>

        <button
          onClick={onOpenContact}
          className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0 flex items-center gap-2"
        >
          <Terminal className="w-4 h-4 fill-current" />
          Request Advisory Retainer Terms
        </button>
      </div>
    </section>
  );
}
