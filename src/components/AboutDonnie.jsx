import React from 'react';
import { Atom, Orbit, Layers, Compass, Quote } from 'lucide-react';

const lineage = [
  {
    era: '19th century',
    name: 'William Rowan Hamilton',
    text: 'The invention of quaternions supplied the hypercomplex algebraic machinery later used to rank projected roots in Theory I.',
  },
  {
    era: '1890s–1920s',
    name: 'Élie Cartan',
    text: 'The classification of exceptional Lie algebras established E₈ as the largest simple Lie algebra. Its 240-root geometry is the object the program is built on.',
  },
  {
    era: '1930s–1970s',
    name: 'H. S. M. Coxeter',
    text: 'Regular polytopes, finite reflection groups, the 600-cell, and the geometry of the binary icosahedral group and icosians remain the classical language of E₈ projections and tetrahedral networks.',
  },
  {
    era: '1856–1943',
    name: 'Nikola Tesla',
    text: 'Work on alternating current, rotating fields, and resonant systems treated geometry and energy as linked. That tradition, and the incomplete credit attached to parts of it, sits in the wider historical background the program references.',
  },
  {
    era: '1970s',
    name: 'Roger Penrose',
    text: 'Aperiodic tilings and spin networks opened two paths still visible here: non-periodic hierarchical order, and quantum geometry stated in discrete combinatorial terms.',
  },
  {
    era: '1982 onward',
    name: 'Dan Shechtman',
    text: 'The discovery of quasicrystals forced physics to accept aperiodic long-range order. Cut-and-project methods and model sets are the technical reason higher-dimensional lattice projections can be treated as physically meaningful.',
  },
  {
    era: '2007',
    name: 'Garrett Lisi',
    text: '“An Exceptionally Simple Theory of Everything” brought the E₈ root system into wide discussion as a structure rich enough to organize Standard Model degrees of freedom together with gravity. This program does not follow Lisi’s principal-bundle construction. It shares the conviction that E₈ geometry is a foundational object.',
  },
  {
    era: '2009–present',
    name: 'Klee Irwin',
    text: 'Emergence Theory projects the E₈ lattice to the Elser–Sloane quasicrystal and related tetrahedral networks, framing physics as a geometric code under the Code Theoretic Axiom. The present work takes up the open need for an explicit selection mechanism inside that framework.',
  },
];

export default function AboutDonnie({ onSelectTheory }) {
  return (
    <section id="about" className="py-20 px-4 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            Independent Research Program
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-3xl">
            About Donnie
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Historical lineage, personal foundations, and the tripartite architecture of E₈ published at this site.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          <figure className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-[0_0_40px_rgba(6,182,212,0.12)] bg-slate-950">
              <img
                src="/donnie-bugden.jpg"
                alt="Portrait of Donald Bugden"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090D16] to-transparent pointer-events-none" />
            </div>
            <figcaption className="mt-4 flex flex-col gap-1 px-1">
              <span className="text-slate-100 font-semibold tracking-tight">
                Donald “Donnie” Bugden
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Independent researcher · Theoretical systems architect
              </span>
            </figcaption>
          </figure>

          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed">
            <p>
              Donnie Bugden is an independent researcher and theoretical systems architect working at the intersection of discrete geometry, exceptional Lie algebras, hypercomplex dynamics, and code-theoretic approaches to quantum gravity. The program maintained on this site develops a tripartite framework centered on the E₈ lattice, as a contribution to the geometric and selection-rule problems left open within modern Emergence Theory.
            </p>
            <p>
              The architecture is a tightly interlocking research program. It is built to make the geometric selection and projection steps of the E₈-quasicrystal approach explicit, deterministic, and computationally grounded.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectTheory && onSelectTheory('hypercomplex')}
                className="text-left rounded-xl border border-cyan-800/50 bg-cyan-950/30 p-4 hover:border-cyan-500/60 transition-colors"
              >
                <Atom className="w-4 h-4 text-cyan-400 mb-2" />
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 mb-1">Theory I</div>
                <div className="text-sm font-semibold text-slate-100 leading-snug">Hypercomplex Dynamical Parity Selector</div>
              </button>
              <button
                type="button"
                onClick={() => onSelectTheory && onSelectTheory('odt')}
                className="text-left rounded-xl border border-amber-800/50 bg-amber-950/20 p-4 hover:border-amber-500/60 transition-colors"
              >
                <Orbit className="w-4 h-4 text-amber-400 mb-2" />
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1">Theory II</div>
                <div className="text-sm font-semibold text-slate-100 leading-snug">Oscillating Dimensional Trajectory</div>
              </button>
              <button
                type="button"
                onClick={() => onSelectTheory && onSelectTheory('folding')}
                className="text-left rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-4 hover:border-emerald-500/60 transition-colors"
              >
                <Layers className="w-4 h-4 text-emerald-400 mb-2" />
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1">Theory III</div>
                <div className="text-sm font-semibold text-slate-100 leading-snug">Lattice Folding Operator</div>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-6">
            Historical lineage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lineage.map((item) => (
              <article key={item.name} className="glass-panel rounded-xl p-5 border border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 mb-1.5">
                  {item.era}
                </div>
                <h4 className="text-slate-100 font-semibold mb-2">{item.name}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-6">
            Biographical context
          </h3>
          <div className="space-y-4">
            <article className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h4 className="text-lg font-semibold text-slate-100 mb-3">The influence of John Nash</h4>
              <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  According to Bugden’s account, the foundations of this trajectory were laid through sustained engagement with the ideas of John Nash. He studied and worked with Nash’s theoretical framework, particularly its implications for strategic and applied systems, and extended aspects of that framework into operational contexts involving code, security, and strategic modeling. That period included collaborative and consulting work linked to Norwegian institutions, the U.S. Navy, and NSA-related environments.
                </p>
                <p>
                  Upon learning of a serious personal crisis and nervous breakdown, Nash invited him to meet at Princeton. That meeting never took place. In the aftermath, Bugden entered a deeper episode of psychosis and became convinced that Nash and his wife had been killed to prevent the association. The historical record establishes that John and Alicia Nash died in a car accident in May 2015.
                </p>
              </div>
            </article>

            <article className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h4 className="text-lg font-semibold text-slate-100 mb-3">Transmission from Penrose and Irwin</h4>
              <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Following that loss, Bugden describes being taken under the wing of both Roger Penrose and Klee Irwin. He treats that period as formative: direct learning and collaborative work that turned subsequent research toward geometric first principles, aperiodic and quasicrystalline order, and exceptional lattices as generative structures for physical theory.
                </p>
                <p>
                  Penrose supplied the commitment to discrete geometric codes and hierarchical aperiodic structure. Irwin supplied the programmatic focus: E₈ projections, the Elser–Sloane quasicrystal lineage, tetrahedral networks, and the Code Theoretic Axiom.
                </p>
              </div>
            </article>

            <article className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h4 className="text-lg font-semibold text-slate-100 mb-3">Institutional rupture and independence</h4>
              <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Bugden’s professional background includes periods of service and consulting in government and advanced technical environments. He has characterized those years as formative and ultimately extractive: contributions to code, systems, and strategic modeling used by institutions without corresponding credit, continuity, or protection.
                </p>
                <p>
                  The move from those environments into independent theoretical work was complicated by mental health crises, institutional rupture, and a lasting sense that his life and labor had been instrumentalized. That history is the backdrop of the independent research posture of the work published here.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="glass-panel-cyan rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <Quote className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <h3 className="text-lg font-semibold text-slate-100">The 2026 framework</h3>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            The lineage runs from classical exceptional algebra and polytope geometry, through the experimental and mathematical formalization of quasicrystals, Penrose’s discrete geometry, modern E₈ unification proposals, and the code-theoretic quasicrystal program of Irwin and Quantum Gravity Research. Together with early operational work tied to Nash and the mentorship Bugden describes after 2015, those threads are integrated into one architecture.
          </p>
          <ol className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <li>
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider">Theory I · </span>
              A deterministic hypercomplex ranking on projected E₈ roots that yields a verified 120:120 chiral partition, engaging geometric frustration in tetrahedral packing and the tetrahedral dihedral deficit.
            </li>
            <li>
              <span className="text-amber-400 font-mono text-xs uppercase tracking-wider">Theory II · </span>
              An oscillating dimensional operator that treats dimensionality as a discrete cyclic function, coupling higher-dimensional lattice topology to lower-dimensional physics.
            </li>
            <li>
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider">Theory III · </span>
              The explicit folding map that carries the parity-equipped, dimensionally dynamic structure onto the physical manifold as measurable geometric footprints, the Set C Footprints.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
