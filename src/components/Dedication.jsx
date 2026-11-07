import React from 'react';
import MathBlock from './MathBlock';

function RichText({ text, className = '' }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <MathBlock key={index} math={part.slice(1, -1)} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

const parts = [
  {
    id: 'ded-foundations',
    numeral: 'I',
    title: 'Core Foundations & Quaternionic Operators',
    accent: 'text-cyan-400',
    border: 'border-cyan-800/50',
    chip: 'bg-cyan-950/50 text-cyan-300 border-cyan-700/50',
    people: [
      {
        n: 1,
        name: 'Glenn',
        term: 'The $E_8$ Root Lattice Foundation (The 240-Root System)',
        text: 'The master grid and ultimate structural generator from which all higher-dimensional projections emerge.',
      },
      {
        n: 2,
        name: 'Dad',
        term: 'The Weyl Group Reflection Operator',
        text: 'The symmetry generator managing precise rotational and reflective transformations across the manifold.',
      },
      {
        n: 3,
        name: 'Sue',
        term: 'The Golden Ratio Shell Scale ($\\phi = 1.618033\\ldots$)',
        text: 'The harmonious scaling constant governing proportional transitions across structural shells.',
      },
      {
        n: 4,
        name: 'Camille',
        term: 'Definition 2.1 — The Quaternionic Quadratic Map',
        text: 'Dynamic, non-commutative transformations providing rotational freedom and hypercomplex navigation.',
      },
      {
        n: 5,
        name: 'Andrew',
        term: 'Quantized Twist ($\\Delta\\theta = \\pm 1.4712^\\circ$)',
        text: 'The necessary angular offset preventing rigid locking and introducing vital rotational degrees of freedom.',
      },
      {
        n: 6,
        name: 'Tori',
        term: 'Parity Operator ($\\sigma_i, \\sigma_j$)',
        text: 'The directional state-flipping switch that toggles symmetry and maintains equilibrium across dynamic states.',
      },
      {
        n: 7,
        name: 'Christina',
        term: 'Hamiltonian Strain ($H_{\\mathrm{strain}}$)',
        text: 'The central energy-governing equation measuring local deformation, tension, and deviation across interacting nodes.',
      },
      {
        n: 8,
        name: 'Eileen',
        term: 'Minimal Ground State',
        text: 'The relaxed, highly stable equilibrium configuration where tension drops to zero and the system achieves peace.',
      },
      {
        n: 9,
        name: 'Carolyn',
        term: 'Coupling Constant ($\\kappa$)',
        text: 'The strength parameter dictating how tightly bonded and responsive adjacent elements are.',
      },
      {
        n: 10,
        name: 'Mike',
        term: 'Proposition 3.1 — The 120:120 Dynamic Partition',
        text: 'The grand symmetry split dividing the root vectors into balanced, interacting domains.',
      },
      {
        n: 11,
        name: 'Rory',
        term: 'Discrete Dynamical Flow',
        text: 'Continuous iterative updates mapping how states evolve and propagate through time and space steps.',
      },
      {
        n: 12,
        name: 'Sean',
        term: 'Topological Deficit Wedge ($7.356^\\circ$)',
        text: 'The unclosable geometric gap introducing necessary structural curvature rather than forcing brittle closure.',
      },
      {
        n: 13,
        name: 'Danny',
        term: 'Julia-Coupled Minimal Attractor',
        text: 'The nonlinear convergence point pulling strained trajectories safely into a stable basin.',
      },
    ],
  },
  {
    id: 'ded-metrics',
    numeral: 'II',
    title: 'Metrics, Transforms & Equilibrium Operators',
    accent: 'text-amber-400',
    border: 'border-amber-800/50',
    chip: 'bg-amber-950/50 text-amber-300 border-amber-700/50',
    people: [
      {
        n: 14,
        name: 'Lon',
        term: 'The 8-Dimensional Metric Tensor ($g_{\\mu\\nu}$)',
        text: 'The foundational metric defining distances, angles, and geometric properties across the $E_8$ space.',
      },
      {
        n: 15,
        name: 'Suzies',
        term: 'The Golden Ratio Scaling Matrix ($\\Phi$)',
        text: 'The overarching transformation matrix scaling dimensional tiers in harmony with the golden ratio.',
      },
      {
        n: 16,
        name: 'Carla',
        term: 'The Quaternion Conjugate Operator ($\\bar{q}$)',
        text: 'The essential symmetry operation reversing vector components while preserving the scalar norm.',
      },
      {
        n: 17,
        name: 'Madelon',
        term: 'The Parity Inversion Operator ($\\mathcal{P}$)',
        text: 'The global operator swapping spatial or topological handedness to maintain dynamic balance.',
      },
      {
        n: 18,
        name: 'Tony',
        term: 'The Boundary Transition Matrix',
        text: 'The operator managing smooth continuity and transitions as trajectories cross between discrete spatial shells.',
      },
      {
        n: 19,
        name: 'Vinnies',
        term: 'The Inner Product Formulations ($\\langle x, y \\rangle$)',
        text: 'The algebraic core measuring alignment, orthogonality, and vector projections within the root lattice.',
      },
      {
        n: 20,
        name: 'Porche',
        term: 'The High-Velocity Trajectory Phase Operator',
        text: 'The dynamic term governing rapid, frictionless acceleration and navigation through the higher-dimensional manifold.',
      },
      {
        n: 21,
        name: 'Patrick',
        term: 'The Hamiltonian Energy Functional ($\\mathcal{H}$)',
        text: 'The master integral balancing kinetic, potential, and strain energies across the entire system.',
      },
      {
        n: 22,
        name: 'Chris',
        term: 'The Quaternionic Product Rule ($ij = k$)',
        text: 'The fundamental noncommutative multiplication law driving the entire hypercomplex engine.',
      },
      {
        n: 23,
        name: 'Sara',
        term: 'The Minimal Energy Flow Pathway',
        text: 'The optimized geodesic route allowing states to evolve with zero wasted tension or unnecessary shear.',
      },
      {
        n: 24,
        name: 'Noam',
        term: 'The Recursive Generative Grammar Matrix',
        text: 'The foundational rule-set recursively projecting lower-dimensional patterns outward into complex topological structures.',
      },
      {
        n: 25,
        name: 'Roger',
        term: 'The Twistor / Conformal Projection Operator',
        text: 'The advanced geometric bridge mapping complex spacetime relationships and conformal structures.',
      },
      {
        n: 26,
        name: 'John',
        term: 'The Equilibrium Attractor Fixed Point ($x^*$)',
        text: 'The ultimate convergence destination where all dynamic iterations settle into stable, self-organizing harmony.',
      },
    ],
  },
  {
    id: 'ded-trajectories',
    numeral: 'III',
    title: 'Dimensional Trajectories, Lattices & Quantum Controls',
    accent: 'text-emerald-400',
    border: 'border-emerald-800/50',
    chip: 'bg-emerald-950/50 text-emerald-300 border-emerald-700/50',
    people: [
      {
        n: 27,
        name: 'Tim',
        term: 'The Triangular Dimensional Wave Operator $D(n) = 8 - \\lvert (n \\bmod 14) - 7 \\rvert$',
        text: 'The periodic clock controlling the continuous step ascent and descent between 1D and 8D.',
      },
      {
        n: 28,
        name: 'Chad',
        term: 'The Orthogonal Projection Slice $P_{D(n)}$',
        text: 'The geometric filter projecting the 8D $E_8$ root lattice into active lower-dimensional subspaces.',
      },
      {
        n: 29,
        name: 'Scott',
        term: 'The Contracting Logarithmic Factor $\\phi^{-D(n)}$',
        text: 'The descent phase operator governing quantum entanglement and non-local connectivity.',
      },
      {
        n: 30,
        name: 'Dave',
        term: 'The Exponential Expansion Factor $\\phi^{+D(n)}$',
        text: 'The forward ascent phase operator driving scale-invariant cosmic inflation.',
      },
      {
        n: 31,
        name: 'Amelia',
        term: 'The Apex Holographic Density State ($D(n)=8$, $\\phi^8 \\approx 46.979$)',
        text: 'The peak dimensional threshold encoding maximal topological information density.',
      },
      {
        n: 32,
        name: 'Eric',
        term: 'The Coxeter $H_4/H_3$ Invariant Spin Network',
        text: 'The quasi-periodic braiding model governing rotational symmetries in 4D/3D projections.',
      },
      {
        n: 33,
        name: 'Bess',
        term: 'The Frustration Mitigation Function',
        text: 'The algebraic smoothing mechanism that balances dihedral defect strain in quasicrystals.',
      },
      {
        n: 34,
        name: 'Rueben',
        term: 'The Quasicrystal Tiling Generator',
        text: 'The discrete algorithm mapping non-periodic space-filling structures across high-dimensional slices.',
      },
      {
        n: 35,
        name: 'The Twins',
        term: 'The Dual Parity Pair $(\\sigma_1, \\sigma_2)$',
        text: 'The synchronized 2-fold spin state maintaining symmetry across coupled lattice nodes.',
      },
      {
        n: 36,
        name: 'Matt',
        term: 'The High-Assurance Lattice Reduction Operator (Deep BKZ)',
        text: 'The algorithmic engine maintaining structural security and noise filtering across cryptographic lattice spaces.',
      },
      {
        n: 37,
        name: 'Isla',
        term: 'The Quaternionic Boundary Selection Functional',
        text: 'The phase boundary formula isolating invariant Julia attractor basins.',
      },
      {
        n: 38,
        name: 'Zhang',
        term: 'The Leech Lattice ($\\Lambda_{24}$) Kissing-Number Packing Metric',
        text: 'The dense sphere-packing metric governing maximal high-dimensional signal alignment.',
      },
    ],
  },
  {
    id: 'ded-stability',
    numeral: 'IV',
    title: 'Cosmological, Topological & Stability Extensions',
    accent: 'text-rose-300',
    border: 'border-rose-800/50',
    chip: 'bg-rose-950/50 text-rose-300 border-rose-700/50',
    people: [
      {
        n: 39,
        name: 'Teo',
        term: 'The Topological Invariant Homology Mapping',
        text: 'The algebraic topology operator ensuring holes, twists, and structural deficits preserve their invariant properties across transformations.',
      },
      {
        n: 40,
        name: 'Joey',
        term: 'The Non-Abelian Gauge Connection Field ($\\mathcal{A}_\\mu$)',
        text: 'The field operator accounting for parallel transport and curvature twists as trajectories navigate local space.',
      },
      {
        n: 41,
        name: 'Garcia',
        term: 'The Symplectic Phase-Space Volume Form',
        text: 'The foundational measure preserving invariant phase-space density across Hamiltonian flows.',
      },
      {
        n: 42,
        name: 'Fred',
        term: 'The Topological Torsion / Chern–Simons Characteristic Term',
        text: 'The topological invariant tracking winding numbers and global anomaly cancellation across dimensional boundaries.',
      },
      {
        n: 43,
        name: 'Tyler',
        term: 'The Lyapunov Exponent Stability Bound ($\\lambda$)',
        text: 'The quantitative measure governing the rate of separation of infinitesimally close trajectories within the nonlinear dynamical attractor.',
      },
    ],
  },
];

export default function Dedication({ onOpenTheoryDedications, onOpenBook }) {
  return (
    <div className="pt-28 md:pt-36 pb-8">
      <header className="px-4 max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs font-mono uppercase tracking-widest mb-4">
          Dedication
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl mx-auto">
          For family, friends, and foundational influences
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Each person in this index is placed on a term of the architecture: a root, a scale, an operator, a flow, or a bound. Fred closes the torsion term. Tyler closes the stability bound.
        </p>
        <button
          type="button"
          onClick={onOpenBook}
          className="mt-6 px-4 py-2.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 border border-rose-700 text-rose-100 font-bold text-xs font-mono"
        >
          Read the novella, The Unclosed Turn
        </button>
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {parts.map((part) => (
            <a
              key={part.id}
              href={`#${part.id}`}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition hover:text-slate-100 ${part.chip}`}
            >
              Part {part.numeral}
            </a>
          ))}
        </nav>
      </header>

      <div className="px-4 max-w-7xl mx-auto space-y-16">
        {parts.map((part) => (
          <section key={part.id} id={part.id} className="scroll-mt-28">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <div className={`text-[11px] font-mono uppercase tracking-[0.2em] ${part.accent}`}>
                  Part {part.numeral}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
                  {part.title}
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {part.people.length} {part.people.length === 1 ? 'name' : 'names'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {part.people.map((person) => (
                <article
                  key={person.n}
                  className={`glass-panel rounded-xl p-5 border ${part.border}`}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-100">{person.name}</h3>
                    <span className={`font-mono text-[11px] ${part.accent}`}>
                      {String(person.n).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-snug mb-2">
                    <RichText text={person.term} />
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <RichText text={person.text} />
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-rose-900/50 text-center">
          <h3 className="text-lg font-semibold text-slate-100">Theory III equation dedications</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The folding map and the evolution equation are split into their symbols and named for scientists whose credit was taken, whose institutions shut the door, or whose illness ran through the work.
          </p>
          <button
            type="button"
            onClick={onOpenTheoryDedications}
            className="mt-5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono"
          >
            Open the Theory III dedications
          </button>
        </div>
      </div>
    </div>
  );
}
