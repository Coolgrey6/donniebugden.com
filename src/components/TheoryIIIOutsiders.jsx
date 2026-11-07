import React from 'react';
import MathBlock from './MathBlock';

const groups = [
  {
    id: 'outsiders-fold',
    kicker: 'The folding relation, taken apart',
    equation: '\\pi_x \\big( L_{E_8} \\otimes D_{\\mathrm{parity}} \\big) \\rightarrow M_{\\mathrm{phys}}',
    items: [
      {
        symbol: '\\pi_x',
        role: 'The folding operator. It sends the higher lattice to a readable cross-section.',
        name: 'Rosalind Franklin',
        years: '1920–1958',
        history: 'Her X-ray photograph of DNA, Photo 51, was shown to James Watson without her consent and became part of the model of the double helix. She died in 1958. The 1962 Nobel Prize went to Watson, Crick, and Wilkins.',
        dedication: 'The projection is named for her: a hidden structure made visible in a lower-dimensional image, while the credit for the image went elsewhere.',
      },
      {
        symbol: 'L_{E_8}',
        role: 'The E₈ root lattice. Two hundred forty roots, the object being folded.',
        name: 'Srinivasa Ramanujan',
        years: '1887–1920',
        history: 'He built a body of results in isolation from the European academies, then carried it to Cambridge on G. H. Hardy’s invitation. Illness in England cut the work short. He died in India at thirty-two.',
        dedication: 'The lattice is named for him: a complete structure brought in from outside the institution that later had to house it.',
      },
      {
        symbol: '\\otimes',
        role: 'The tensor product. It binds the lattice to its parity data so the two travel as one object.',
        name: 'Emmy Noether',
        years: '1882–1935',
        history: 'She proved the link between symmetry and conserved quantities. Göttingen would not appoint her; for years she lectured under David Hilbert’s name. In 1933 the Nazi purge drove her out. She died at Bryn Mawr two years later.',
        dedication: 'The binding is named for her: symmetry and the quantity it protects, held in one product.',
      },
      {
        symbol: 'D_{\\mathrm{parity}}',
        role: 'The parity structure. The 120:120 chiral partition equipped on the roots.',
        name: 'Chien-Shiung Wu',
        years: '1912–1997',
        history: 'Her 1956–57 experiment showed that the weak interaction distinguishes left from right. The Nobel Prize for parity violation went that year to Tsung-Dao Lee and Chen-Ning Yang, the theorists who had proposed the test.',
        dedication: 'Parity is named for her: the handedness is an experimental fact, and the person who measured it was left off the prize.',
      },
      {
        symbol: '\\rightarrow',
        role: 'The arrow. The step from the equipped lattice to a physical reading.',
        name: 'Lise Meitner',
        years: '1878–1968',
        history: 'With Otto Frisch she gave the physical explanation of nuclear fission, in exile after fleeing Nazi Germany. The 1944 Nobel Prize for the discovery went to Otto Hahn alone.',
        dedication: 'The arrow is named for her: the meaning of the split, written from outside the institution that kept the prize.',
      },
      {
        symbol: 'M_{\\mathrm{phys}}',
        role: 'The physical manifold. The observable geometry that receives the fold.',
        name: 'Vera Rubin',
        years: '1928–2016',
        history: 'Galaxy rotation curves she measured with Kent Ford showed mass the visible stars could not account for. Early in her career, observatories barred her from the telescopes because she was a woman. She did not receive the Nobel Prize.',
        dedication: 'The physical manifold is named for her: the sky as measured, carrying a component the official inventory had left out.',
      },
      {
        symbol: '\\mathrm{Set\\ C}',
        role: 'The footprints. The cross-section the fold leaves on the manifold, rather than the lattice itself.',
        name: 'Marietta Blau',
        years: '1894–1970',
        history: 'She developed the photographic emulsions that record the track of a nuclear particle. Albert Einstein supported her for the Nobel Prize. It was not awarded. After the Nazi annexation of Austria she lived as a refugee, and the work was scattered.',
        dedication: 'The footprint is named for her: a track on a plate, evidence of an event the plate itself is not.',
      },
    ],
  },
  {
    id: 'outsiders-evolution',
    kicker: 'The evolution equation, taken apart',
    equation: '\\partial \\Psi / \\partial t = F_{\\mathrm{feedback}}\\big(\\pi_x(\\Phi_{\\mathrm{higher}}), D(n)\\big)',
    items: [
      {
        symbol: '\\partial / \\partial t',
        role: 'The time derivative. The rate at which the folded state is changing.',
        name: 'Oliver Heaviside',
        years: '1850–1925',
        history: 'He recast Maxwell’s equations into the vector form still used, and built an operational calculus for derivatives in time. Cambridge mathematicians set the method aside as insufficiently rigorous. He spent much of his later life poor and isolated.',
        dedication: 'The time operator is named for him: the practical ∂/∂t, used everywhere, credited late and thinly.',
      },
      {
        symbol: '\\Psi',
        role: 'The state on the physical side. Everything the fold is currently carrying.',
        name: 'Hugh Everett III',
        years: '1930–1982',
        history: 'His 1957 thesis kept every branch of the wave function. Niels Bohr’s circle would not take the reading seriously, and Everett left academic physics. Biographers record a later depression.',
        dedication: 'The state is named for him: the full Ψ, including the part the institution refused to keep in the theory.',
      },
      {
        symbol: 'F_{\\mathrm{feedback}}',
        role: 'The feedback. The restoring term that answers the folded state and the clock.',
        name: 'Robert Hooke',
        years: '1635–1703',
        history: 'Hooke’s law is the restoring force. He also pressed a priority claim against Newton on the inverse-square law of gravitation. Newton’s acknowledgment in print was slight, and Hooke’s reputation shrank for generations.',
        dedication: 'The feedback is named for him: the force that pulls a displacement back, and a claim that was allowed to fade.',
      },
      {
        symbol: '\\Phi_{\\mathrm{higher}}',
        role: 'The higher structure. What still lives in the lattice before the fold acts on it.',
        name: 'David Bohm',
        years: '1917–1992',
        history: 'He kept a hidden order in quantum theory after the Copenhagen reading had closed the question. During the McCarthy hearings he refused to name colleagues. Princeton dropped him, and he continued the work in exile.',
        dedication: 'The higher field is named for him: an order underneath the visible trajectory, developed after the institution put him out.',
      },
      {
        symbol: 'D(n)',
        role: 'The dimensional clock. D(n) = 8 − |(n mod 14) − 7|, the active dimension at step n.',
        name: 'Jocelyn Bell Burnell',
        years: 'born 1943',
        history: 'In 1967 she recognized the regular pulse in the radio data that became the first pulsar. The 1974 Nobel Prize went to Antony Hewish, her supervisor, shared with Martin Ryle.',
        dedication: 'The clock is named for her: a period sitting in the record, found by the person the prize did not name.',
      },
      {
        symbol: 'n \\bmod 14',
        role: 'The discrete step. The clock advances by a finite residue, one tick at a time.',
        name: 'Alan Turing',
        years: '1912–1954',
        history: 'He defined the machine that computes by finite steps, and his wartime cryptanalytic work was kept secret for years. In 1952 Britain prosecuted him for homosexuality and subjected him to chemical castration. His death in 1954 was ruled a suicide.',
        dedication: 'The modular step is named for him: a finite update, and a life the state punished while his machinery was still hidden.',
      },
    ],
  },
  {
    id: 'outsiders-invariants',
    kicker: 'What the fold is required to carry',
    equation: '\\delta \\approx 7.356^\\circ,\\quad \\Delta\\theta = \\pm 1.471^\\circ,\\quad 120:120',
    items: [
      {
        symbol: '\\delta',
        role: 'The dihedral deficit, about 7.356°. The gap that remains after the fold. It is not closed.',
        name: 'Kurt Gödel',
        years: '1906–1978',
        history: 'Anxiety and hypochondria were already with him when he entered university mathematics in Vienna. The incompleteness theorems showed that a consistent formal system cannot settle every question inside itself. Severe mental illness marked his later life.',
        dedication: 'The deficit is named for him: a gap the structure is not allowed to seal from the inside.',
      },
      {
        symbol: '\\Delta\\theta',
        role: 'The quantized twist, about 1.471°. The angular offset that keeps the packing from locking rigid.',
        name: 'Georg Cantor',
        years: '1845–1918',
        history: 'His theory of infinite sets was attacked by Leopold Kronecker as pathological. From 1884 he suffered recurrent depression and was hospitalized more than once, through the years of that opposition.',
        dedication: 'The twist is named for him: the turn a closed doctrine called illegitimate, which the geometry needs in order to move.',
      },
      {
        symbol: '\\pm',
        role: 'The sign on the twist. Neighboring offsets alternate rather than stack in one direction.',
        name: 'Nikola Tesla',
        years: '1856–1943',
        history: 'He designed the rotating magnetic field and the alternating-current system that other companies then commercialized. Thomas Edison’s public campaign treated that current as something to be feared. After the larger projects collapsed, Tesla lived for years in isolation and unstable health. In 1943, after his death, the U.S. Supreme Court invalidated a key Marconi radio patent on earlier work, Tesla’s among it.',
        dedication: 'The alternating sign is named for him: a field that works by changing direction, built by someone the credit and the current both moved past.',
      },
      {
        symbol: '120:120',
        role: 'The chiral partition. The 240 roots held in two equal classes under the fold.',
        name: 'Nettie Stevens',
        years: '1861–1912',
        history: 'In 1905 she showed that sex in mealworms tracks two chromosome classes, X and Y. Edmund Beecher Wilson published a parallel result the same year, and later textbook memory often centered him. She died of breast cancer in 1912.',
        dedication: 'The equal split is named for her: two classes, same count, and a history that remembered one author.',
      },
      {
        symbol: '240',
        role: 'The root census. The fold preserves the identities of the roots instead of washing them out.',
        name: 'Cecilia Payne-Gaposchkin',
        years: '1900–1979',
        history: 'Her 1925 dissertation found that the Sun and the stars are made mostly of hydrogen and helium. Henry Norris Russell told her the conclusion was impossible. Four years later he published the same result. She later became the first woman promoted to full professor from inside the Harvard Faculty of Arts and Sciences.',
        dedication: 'The census of the roots is named for her: a count of what the structure is made of, first withdrawn under authority, then absorbed.',
      },
      {
        symbol: 'T_{\\mu\\nu}',
        role: 'The stress-energy. Residual frustration on the lattice is carried onto the manifold as stress.',
        name: 'Sophie Germain',
        years: '1776–1831',
        history: 'She worked on the elasticity of plates, the mathematics of how a surface carries stress. The École Polytechnique would not admit her. She entered the Paris Academy’s prize competition from outside the room, and she corresponded with Gauss under the name M. Le Blanc.',
        dedication: 'The stress on the manifold is named for her: elasticity done from outside the school that would not let her in the door.',
      },
      {
        symbol: '\\Omega',
        role: 'The multiplicity under the stress. Many micro-configurations sit behind one visible deficit.',
        name: 'Ludwig Boltzmann',
        years: '1844–1906',
        history: 'He tied entropy to the number of microscopic arrangements of a system. The energeticists, Ostwald and Mach among them, treated atoms as unnecessary. He lived with depression and died by suicide in 1906, while that opposition was still in force.',
        dedication: 'The multiplicity is named for him: the hidden count under a single stressed state, defended at the cost of his health.',
      },
      {
        symbol: '\\Psi_{\\ast}',
        role: 'The attractor of the flow. The state the feedback is settling toward across the DT = 8 intervals.',
        name: 'John Nash',
        years: '1928–2015',
        history: 'The equilibrium papers of 1950–51 define a fixed point of strategic feedback. Schizophrenia became unmistakable in 1959, in the years after that work and through the long stretch before the 1994 Nobel Prize.',
        dedication: 'The attractor is named for him: a fixed point of mutual reply, found in the years before schizophrenia took hold of the rest of his working life.',
      },
    ],
  },
];

export default function TheoryIIIOutsiders() {
  return (
    <section id="dedications-iii" className="pb-20 px-4 max-w-7xl mx-auto scroll-mt-28">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs font-mono uppercase tracking-widest mb-4">
          Equation dedications
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Outsider scientists, named inside the relations
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
          Each symbol of Theory III is dedicated to a scientist who stood outside the protection of credit. Some had a result used without consent, or a prize given to someone else, or a door closed by the institution. Some lived with mental illness before the work or through the years of it. The name is an honor paid by this architecture. Their theorems remain their own.
        </p>
      </div>

      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.id} id={group.id} className="scroll-mt-28">
            <div className="mb-5">
              <h3 className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 mb-3">
                {group.kicker}
              </h3>
              <MathBlock block math={group.equation} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item) => (
                <article
                  key={item.name}
                  className="glass-panel rounded-xl p-5 border border-slate-800"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <MathBlock math={item.symbol} />
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">{item.years}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-100">{item.name}</h4>
                  <p className="mt-2 text-sm text-emerald-200/80 leading-relaxed">{item.role}</p>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">{item.history}</p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.dedication}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
