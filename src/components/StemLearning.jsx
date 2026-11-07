import React, { useMemo, useState } from 'react';
import MathBlock from './MathBlock';
import {
  PHI,
  THETA_0_DEG,
  DEFICIT_GAP_DEG,
  QUANTIZED_TWIST_DEG,
} from '../utils/mathE8';
import { getDimensionAtStep } from '../utils/mathODT';
import {
  Atom,
  Orbit,
  Layers,
  GraduationCap,
  Compass,
  Sigma,
  BookMarked,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const LEVELS = [
  { id: 'school', label: 'High school', hint: 'Angles, the golden ratio, left and right' },
  { id: 'college', label: 'College', hint: 'Vectors, complex numbers, modular clocks' },
  { id: 'graduate', label: 'Graduate', hint: 'Quaternions, E₈, the fold' },
  { id: 'research', label: 'Research', hint: 'What is proved, and what is still open' },
];

const GLOSSARY = [
  { symbol: '\\varphi', name: 'Golden ratio', plain: 'The number (1 + √5) / 2. It is the unique positive number that is one more than its reciprocal.', level: 'High school', theory: 'All' },
  { symbol: '\\theta_0', name: 'Tetrahedral dihedral angle', plain: 'The angle inside the hinge where two faces of a regular tetrahedron meet. It is arccos(1/3), about 70.529°.', level: 'High school', theory: 'I' },
  { symbol: '\\delta', name: 'Dihedral deficit', plain: 'The gap left when five tetrahedral hinges are placed around one edge. About 7.356°. The fold does not close it.', level: 'High school', theory: 'I · III' },
  { symbol: '\\Delta\\theta', name: 'Quantized twist', plain: 'One fifth of the deficit, about 1.471°. Each parity sign carries +Δθ or −Δθ.', level: 'College', theory: 'I · III' },
  { symbol: '\\sigma', name: 'Parity sign', plain: 'A label of −1 or +1 on a root. Left and right. The architecture keeps 120 of each.', level: 'College', theory: 'I · III' },
  { symbol: 'E_8', name: 'E₈ root system', plain: 'A set of 240 vectors in 8 dimensions, each of length √2, closed under the reflections that define the E₈ symmetry.', level: 'Graduate', theory: 'All' },
  { symbol: '\\sqrt{2}', name: 'Root length', plain: 'Every E₈ root has Euclidean length √2. The census check is that this length is exact, not approximate.', level: 'College', theory: 'I · III' },
  { symbol: '\\mathcal{I}_0', name: 'Icosian ring', plain: '120 special quaternions. Together with a φ-scaled copy they are the 4-dimensional reading of the 240 roots.', level: 'Graduate', theory: 'I' },
  { symbol: 'C(\\varphi)', name: 'Icosian parameter', plain: 'The quaternion ½(φ + i + φ⁻¹ j). Its length is exactly 1, and it sets the Julia iteration.', level: 'Graduate', theory: 'I' },
  { symbol: 'D(n)', name: 'Dimensional clock', plain: 'D(n) = 8 − |(n mod 14) − 7|. A 14-step triangle: 1,2,3,4,5,6,7,8,7,6,5,4,3,2.', level: 'College', theory: 'II · III' },
  { symbol: '\\lambda(n)', name: 'Golden scale', plain: 'φ raised to the power (−1)ⁿ · D(n). The clock’s scale factor at step n.', level: 'College', theory: 'II' },
  { symbol: '\\pi_x', name: 'Folding operator', plain: 'The map that sends the parity-equipped lattice to a cross-section on the physical manifold.', level: 'Graduate', theory: 'III' },
  { symbol: 'M_{\\mathrm{phys}}', name: 'Physical manifold', plain: 'The observable geometry that receives the fold. The roots are not rewritten as 3D fields. They leave footprints.', level: 'Graduate', theory: 'III' },
  { symbol: '\\mathrm{Set\\ C}', name: 'Set C footprints', plain: 'The cross-section itself. Evidence of the higher root, the way a track on a plate is evidence of a particle.', level: 'Graduate', theory: 'III' },
  { symbol: 'F_{\\mathrm{feedback}}', name: 'Feedback', plain: 'The restoring term. It answers the folded state and the clock, and it is strongest near the 4-dimensional step.', level: 'Research', theory: 'II · III' },
  { symbol: '120:120', name: 'Chiral partition', plain: 'The 240 roots held in two equal classes. Preserved by the fold. Exact on the H₄ / icosian projection.', level: 'Graduate', theory: 'I · III' },
];

function theoryChip(id) {
  if (id === 'I') return 'bg-cyan-950/80 text-cyan-300 border-cyan-800';
  if (id === 'II') return 'bg-amber-950/80 text-amber-300 border-amber-800';
  if (id === 'III') return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
  return 'bg-slate-900 text-slate-300 border-slate-700';
}

function Chip({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-900 text-slate-300 border-slate-700',
    school: 'bg-sky-950/80 text-sky-300 border-sky-800',
    college: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
    graduate: 'bg-amber-950/80 text-amber-200 border-amber-800',
    research: 'bg-rose-950/70 text-rose-200 border-rose-800',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase tracking-wider ${tones[tone] || tones.slate}`}>
      {children}
    </span>
  );
}

function Lesson({ id, tone, theories, kicker, title, children }) {
  return (
    <article id={id} className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-8 scroll-mt-36">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Chip tone={tone}>{kicker}</Chip>
        {theories.map((theory) => (
          <span key={theory} className={`px-2 py-0.5 rounded-md border text-[10px] font-mono ${theoryChip(theory)}`}>
            Theory {theory}
          </span>
        ))}
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">{title}</h3>
      <div className="mt-4 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">{children}</div>
    </article>
  );
}

function Check({ prompt, choices, answer, why }) {
  const [pick, setPick] = useState(null);
  const settled = pick != null;
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-sm font-semibold text-slate-100">{prompt}</p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {choices.map((choice, index) => {
          const chosen = pick === index;
          const correct = index === answer;
          let style = 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-600';
          if (settled && correct) style = 'border-emerald-600 bg-emerald-950/50 text-emerald-100';
          else if (settled && chosen) style = 'border-rose-700 bg-rose-950/40 text-rose-100';
          return (
            <button
              key={choice}
              type="button"
              onClick={() => setPick(index)}
              className={`text-left px-3 py-2 rounded-lg border text-sm font-mono transition ${style}`}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {settled && (
        <p className={`mt-3 text-sm leading-relaxed ${pick === answer ? 'text-emerald-200' : 'text-slate-300'}`}>
          {why}
        </p>
      )}
    </div>
  );
}

function DeficitBench() {
  const five = 5 * THETA_0_DEG;
  const gap = 360 - five;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)] gap-5 items-center rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="mx-auto relative w-40 h-40">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(#22d3ee 0deg ${five}deg, rgba(244,63,94,0.9) ${five}deg 360deg)`,
          }}
        />
        <div className="absolute inset-5 rounded-full bg-[#090D16] flex items-center justify-center text-center">
          <div>
            <div className="text-lg font-mono font-bold text-rose-300">{gap.toFixed(3)}°</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">left open</div>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm font-mono text-slate-300">
        <p>Dihedral angle θ₀ = arccos(1/3) = {THETA_0_DEG.toFixed(4)}°.</p>
        <p>Five of them: 5 × θ₀ = {five.toFixed(4)}°.</p>
        <p>A full turn is 360°.</p>
        <p className="text-rose-200">Deficit δ = 360° − {five.toFixed(4)}° = {DEFICIT_GAP_DEG.toFixed(4)}°.</p>
        <p className="text-amber-200">Twist |Δθ| = δ / 5 = {QUANTIZED_TWIST_DEG.toFixed(4)}°.</p>
      </div>
    </div>
  );
}

function GoldenBench() {
  const phi = PHI;
  const rows = [
    ['φ', phi],
    ['φ²', phi * phi],
    ['φ + 1', phi + 1],
    ['1 / φ', 1 / phi],
    ['φ − 1', phi - 1],
  ];
  return (
    <div className="rounded-xl border border-slate-800 overflow-hidden">
      <table className="w-full text-sm font-mono">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-t border-slate-800 first:border-t-0">
              <td className="px-4 py-2 text-slate-400">{label}</td>
              <td className="px-4 py-2 text-right text-slate-100">{value.toFixed(10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 py-3 text-xs font-mono text-emerald-200/90 bg-emerald-950/30">
        φ² and φ + 1 match. 1/φ and φ − 1 match. That is the whole identity, checked to ten decimals.
      </p>
    </div>
  );
}

function ClockBench() {
  const [n, setN] = useState(7);
  const mod = ((n % 14) + 14) % 14;
  const distance = Math.abs(mod - 7);
  const dimension = 8 - distance;
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Step n = {n}
          <input
            type="range"
            min="0"
            max="13"
            value={n}
            onChange={(event) => setN(parseInt(event.target.value, 10))}
            className="mt-2 block w-56 accent-amber-400"
          />
        </label>
        <div className="text-right">
          <div className="text-3xl font-mono font-bold text-amber-200">{dimension}D</div>
          <div className="text-[11px] font-mono text-slate-500">active dimension</div>
        </div>
      </div>
      <ol className="space-y-1 text-sm font-mono text-slate-300">
        <li>1. Reduce the step: n mod 14 = {mod}.</li>
        <li>2. Distance from the apex: |{mod} − 7| = {distance}.</li>
        <li>3. Count down from 8: D({n}) = 8 − {distance} = {dimension}.</li>
      </ol>
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 14 }, (_, index) => {
          const value = getDimensionAtStep(index);
          const on = index === n;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setN(index)}
              className={`w-9 h-9 rounded-lg border text-xs font-mono ${
                on
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold'
                  : value === 8
                    ? 'bg-amber-950/50 text-amber-200 border-amber-800'
                    : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RootCensus() {
  const typeOne = (8 * 7 / 2) * 4;
  const typeTwo = 128;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="rounded-xl border border-cyan-900/60 bg-cyan-950/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Integer family</div>
        <div className="mt-1 text-2xl font-mono font-bold text-slate-100">{typeOne}</div>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          Choose 2 coordinates out of 8, and give each a sign ±1. The rest are 0. C(8,2) × 4 = 112. Length √(1+1) = √2.
        </p>
      </div>
      <div className="rounded-xl border border-amber-900/60 bg-amber-950/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">Half-integer family</div>
        <div className="mt-1 text-2xl font-mono font-bold text-slate-100">{typeTwo}</div>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          Every coordinate is ±1/2, and the number of minus signs is even. Half of the 256 sign patterns: 128. Length √(8 × 1/4) = √2.
        </p>
      </div>
      <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4">
        <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Census</div>
        <div className="mt-1 text-2xl font-mono font-bold text-slate-100">{typeOne + typeTwo}</div>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          112 + 128 = 240. Theory III is required to keep this count. The fold moves the picture. It does not delete roots.
        </p>
      </div>
    </div>
  );
}

function FoldWindow() {
  const [n, setN] = useState(3);
  const dimension = getDimensionAtStep(n);
  const start = n % 8;
  const suppress = Math.pow(PHI, -(8 - dimension));
  const active = Array.from({ length: 8 }, (_, index) => {
    for (let step = 0; step < dimension; step += 1) {
      if ((start + step) % 8 === index) return true;
    }
    return false;
  });
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Clock step n = {n}, so D = {dimension}
          <input
            type="range"
            min="0"
            max="13"
            value={n}
            onChange={(event) => setN(parseInt(event.target.value, 10))}
            className="mt-2 block w-56 accent-emerald-400"
          />
        </label>
        <div className="text-xs font-mono text-slate-400 text-right">
          Closed coordinates weigh
          <div className="text-emerald-300 text-base">φ⁻{8 - dimension} = {suppress.toFixed(4)}</div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {active.map((open, index) => (
          <div
            key={index}
            className={`h-14 rounded-lg border text-[11px] font-mono flex flex-col items-center justify-center ${
              open
                ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-100'
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <span>x{index + 1}</span>
            <span>{open ? '1' : suppress.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <p className="text-xs font-mono text-slate-500 leading-relaxed">
        The lit coordinates are the open window. The dim ones are still in the vector. They are only quiet. A footprint is that weighted cross-section, read in the Coxeter plane of E₈.
      </p>
    </div>
  );
}

export default function StemLearning({ onSelectTheory }) {
  const [band, setBand] = useState('all');
  const [query, setQuery] = useState('');

  const show = (id) => band === 'all' || band === id;

  const glossary = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return GLOSSARY;
    return GLOSSARY.filter((entry) =>
      `${entry.name} ${entry.plain} ${entry.level} ${entry.theory}`.toLowerCase().includes(needle)
    );
  }, [query]);

  return (
    <div className="pb-8">
      <section className="relative pt-28 md:pt-36 pb-12 px-4 max-w-7xl mx-auto">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[720px] h-[280px] bg-gradient-to-r from-cyan-500/10 via-amber-500/10 to-emerald-500/10 blur-[110px] -z-10 pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono uppercase tracking-widest mb-5">
            <GraduationCap className="w-3.5 h-3.5 text-sky-300" />
            STEM learning · all three theories
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.05]">
            From a full turn of 360° to the E₈ root system.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A single path through the mathematics this research program actually uses. High-school geometry is enough to start. The last section is the reading a doctoral reviewer would do: what has been checked, and what is still a conjecture.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setBand('all')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${
              band === 'all' ? 'bg-slate-100 text-slate-950 border-slate-100 font-bold' : 'bg-slate-950 text-slate-300 border-slate-700'
            }`}
          >
            Whole path
          </button>
          {LEVELS.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => {
                setBand(level.id);
                document.getElementById(`learn-${level.id}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono ${
                band === level.id ? 'bg-slate-100 text-slate-950 border-slate-100 font-bold' : 'bg-slate-950 text-slate-300 border-slate-700'
              }`}
            >
              {level.label}
            </button>
          ))}
          <a href="#learn-reference" className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-300 text-xs font-mono">
            Formula reference
          </a>
        </div>

        <div id="learn-path" className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 scroll-mt-36">
          {LEVELS.map((level, index) => (
            <a key={level.id} href={`#learn-${level.id}`} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 hover:border-slate-600 transition">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">0{index + 1}</div>
              <div className="mt-1 font-semibold text-slate-100">{level.label}</div>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">{level.hint}</p>
            </a>
          ))}
        </div>
      </section>

      <div className="px-4 max-w-7xl mx-auto space-y-16">
        {show('school') && (
          <section id="learn-school" className="space-y-6 scroll-mt-36">
            <header className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-sky-300">High school</div>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-100">Angles, a special number, and a repeating staircase</h2>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Nothing in this band needs calculus. It needs a full turn, a square root, and the idea that a left hand does not become a right hand by turning it over in the plane.
              </p>
            </header>

            <Lesson id="lesson-deficit" tone="school" theories={['I', 'III']} kicker="Geometry" title="Five tetrahedra do not fill a full turn">
              <p>
                A regular tetrahedron is the pyramid with four equilateral triangle faces. Along an edge, two faces meet at a fixed hinge angle. That angle is not a nice fraction of 360°. It is arccos(1/3), a little over 70.5°.
              </p>
              <p>
                If you seat five of those hinges around one common edge, they come up short of a full turn. The missing piece is the dihedral deficit. Theory I treats that gap as a real geometric fact. Theory III requires the fold to carry the same gap onto the physical manifold. The gap is not sealed.
              </p>
              <DeficitBench />
              <Check
                prompt="Five tetrahedral hinges leave a gap closest to which angle?"
                choices={['0°, they fill the turn', 'About 1.471°', 'About 7.356°', 'About 70.529°']}
                answer={2}
                why="70.529° is one hinge. 1.471° is that gap split into five twists. The gap itself, 360° minus five hinges, is about 7.356°."
              />
            </Lesson>

            <Lesson id="lesson-phi" tone="school" theories={['I', 'II']} kicker="Algebra" title="The golden ratio is the number that is one more than its reciprocal">
              <p>
                Draw a rectangle that stays the same shape after you cut a square from it. The ratio of the long side to the short side has to satisfy φ = 1 + 1/φ. Multiply through by φ and you get the quadratic equation φ² − φ − 1 = 0. The positive solution is (1 + √5) / 2.
              </p>
              <MathBlock block math="\varphi = \dfrac{1+\sqrt{5}}{2}, \qquad \varphi^{2} = \varphi + 1, \qquad \varphi^{-1} = \varphi - 1" />
              <p>
                Theory I uses φ inside the quaternion that drives the Julia iteration. Theory II uses powers of φ as the scale factor of the dimensional clock. You do not need the later theories to check the identity. The table does it with ordinary arithmetic.
              </p>
              <GoldenBench />
              <Check
                prompt="Which equation is the golden-ratio identity?"
                choices={['φ² = φ − 1', 'φ² = φ + 1', 'φ² = 2φ', 'φ² = 1']}
                answer={1}
                why="From φ = 1 + 1/φ, multiply by φ. The table above shows φ² and φ + 1 agreeing to ten decimals."
              />
            </Lesson>

            <Lesson id="lesson-hands" tone="school" theories={['I', 'III']} kicker="Symmetry" title="Left and right are the parity">
              <p>
                A left glove and a right glove have the same shape. No turn in the plane makes one into the other. That distinction is chirality, and the sign that records it is parity. This program writes the sign σ = −1 or σ = +1.
              </p>
              <p>
                There are 240 roots. The balanced claim is that the fold keeps them in two equal classes, 120 and 120. Equal classes are the whole point of the split. A theory that washed the roots into one undifferentiated cloud would have thrown the census away.
              </p>
            </Lesson>
          </section>
        )}

        {show('college') && (
          <section id="learn-college" className="space-y-6 scroll-mt-36">
            <header className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-300">College</div>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-100">Vectors, iteration, and a clock you can evaluate by hand</h2>
              <p className="mt-3 text-slate-400 leading-relaxed">
                First courses in vectors and complex numbers are enough. The dimensional operator is a modular absolute value. Every entry in its 14-step table is an arithmetic check.
              </p>
            </header>

            <Lesson id="lesson-vectors" tone="college" theories={['I', 'III']} kicker="Linear algebra" title="A root is a vector of length √2">
              <p>
                In eight coordinates, the length of a vector x is the square root of the sum of the squares of its entries. Two families make up E₈. An integer root such as (1, −1, 0, 0, 0, 0, 0, 0) has length √(1 + 1) = √2. A half-integer root, every entry ±1/2, has length √(8 × 1/4) = √2. Same length, two shapes.
              </p>
              <RootCensus />
              <Check
                prompt="The length of (1, −1, 0, 0, 0, 0, 0, 0) is"
                choices={['1', '√2', '2', '√8']}
                answer={1}
                why="Only two entries are nonzero, and each contributes 1 to the sum of squares. √(1+1) = √2. Every E₈ root has this length."
              />
            </Lesson>

            <Lesson id="lesson-julia" tone="college" theories={['I']} kicker="Complex dynamics" title="The Julia idea, before the quaternions">
              <p>
                On the complex plane, start at a point z and repeat z ↦ z² + c. Some seeds run away to infinity. Some stay bounded. The boundary between those fates is a Julia set. The shape of the boundary depends on the constant c.
              </p>
              <p>
                Theory I uses the same rule one dimension up, with quaternions instead of complex numbers, and with a constant built from φ. A root that stays bounded and a root that escapes receive opposite parity signs. The college-level idea is only this: iteration sorts seeds into two fates, and the architecture uses that sort as a left/right label.
              </p>
              <MathBlock block math="z_{n+1} = z_n^{2} + c" />
            </Lesson>

            <Lesson id="lesson-clock" tone="college" theories={['II', 'III']} kicker="The operator" title="The dimensional clock is three lines of arithmetic">
              <p>
                Let n be a whole-number step. The operator used by Theory II, and read again by the Theory III fold, is
              </p>
              <MathBlock block math="D(n) = 8 - \left|(n \bmod 14) - 7\right|" />
              <p>
                “Mod 14” folds the step back into 0, 1, …, 13. Subtract 7, take the absolute value, and subtract that from 8. The result climbs from 1 to 8 and then walks back down to 2. The next step, n = 14, is the same as n = 0, so the pattern repeats. The bench evaluates the three lines for any step.
              </p>
              <ClockBench />
              <p>
                The scale that rides on this clock is a power of the golden ratio, λ(n) = φ raised to (−1)ⁿ · D(n). Even steps and odd steps point the exponent in opposite directions. That alternation is the whole of the sign (−1)ⁿ. It is not yet a claim about gravity. It is a scale factor indexed by the clock.
              </p>
              <Check
                prompt="At the apex n = 7, what is D(7)?"
                choices={['1', '4', '7', '8']}
                answer={3}
                why="7 mod 14 is 7. The distance from 7 is 0. Then 8 − 0 = 8. The sequence peaks there and descends."
              />
            </Lesson>
          </section>
        )}

        {show('graduate') && (
          <section id="learn-graduate" className="space-y-6 scroll-mt-36">
            <header className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-amber-300">Graduate</div>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-100">Quaternions, the root system, and the fold</h2>
              <p className="mt-3 text-slate-400 leading-relaxed">
                This band is the mathematics of the papers, stated so the formulas can be checked. It separates a definition from a conjecture. The next band says which is which.
              </p>
            </header>

            <Lesson id="lesson-quaternions" tone="graduate" theories={['I']} kicker="Hypercomplex" title="Why the iteration needs four coordinates">
              <p>
                A quaternion is a number w + xi + yj + zk with i² = j² = k² = −1 and ij = k, ji = −k. Multiplication does not commute. That non-commutativity is the extra structure a complex number does not have, and it is why a quaternionic Julia set can carry a handedness.
              </p>
              <p>
                The constant in this program is C(φ) = ½(φ + i + φ⁻¹ j + 0 k). Its squared length is an identity, not a measurement:
              </p>
              <MathBlock block math="|C|^{2} = \tfrac{1}{4}\left(\varphi^{2} + 1 + \varphi^{-2}\right) = \tfrac{1}{4}\left((\varphi+1) + 1 + (2-\varphi)\right) = 1" />
              <p>
                So |C| = 1. The escape threshold built from that constant, (1 + √(1 + 4|C|)) / 2, collapses to φ itself. The golden ratio is both the constant’s ingredient and the radius at which a seed is declared to have escaped.
              </p>
              <p>
                The icosian ring is the set of 120 unit quaternions with coordinates in Q(√5) that form the vertices of the 600-cell: 8 of type ±1, 16 of type ½(±1 ± i ± j ± k), and 96 even permutations of ½(0, ±φ⁻¹, ±1, ±φ). A second shell, φ times those 120, completes a 4-dimensional reading of the 240 roots. The exact 120:120 chiral split is the statement about that projection, together with the Green’s-potential threshold defined in the hypercomplex paper. A casual 4-coordinate sample is only a near-balance. The paper says so.
              </p>
            </Lesson>

            <Lesson id="lesson-frustration" tone="graduate" theories={['I', 'III']} kicker="Frustration" title="The twist can cancel in pairs. The deficit cannot.">
              <p>
                Each parity sign carries a twist of +Δθ or −Δθ, with |Δθ| = δ/5. On a matched adjacent pair, opposite signs contribute +Δθ and −Δθ. The pair residual is zero. The same signs contribute a leftover of |Δθ|.
              </p>
              <p>
                A random balanced assignment leaves a mean residual near half a twist, about 0.638° in the folding laboratory’s fixed matching. The anti-phase assignment drives that mean to zero and keeps 120 of each sign, because every pair is one of each. Feedback is the update that trades frustrated pairs until that happens.
              </p>
              <p>
                What does not go to zero is δ itself, about 7.356°. Five tetrahedra still do not fill the turn. Pair cancellation removes the local twist. It does not rewrite the dihedral angle. Neighbor anti-correlation across the whole root graph, as opposed to a chosen matching, remains an open conjecture on Theory I. The root graph contains triangles, so a perfect 2-coloring of every edge is impossible. The verified statement is the weaker one: an alternating assignment reduces residual relative to a random assignment.
              </p>
            </Lesson>

            <Lesson id="lesson-fold" tone="graduate" theories={['III']} kicker="The bridge" title="The fold is a window, then a cross-section">
              <p>
                Theory III writes one operator for the passage from the equipped lattice to a physical reading:
              </p>
              <MathBlock block math="\pi_x \big( L_{E_8} \otimes D_{\mathrm{parity}} \big) \rightarrow M_{\mathrm{phys}}" />
              <p>
                In the laboratory this is an explicit map. At clock step n the active dimension D(n) opens that many consecutive coordinates. Those coordinates keep weight 1. The other coordinates are multiplied by φ raised to −(8 − D). The weighted vector is then read in a fixed Coxeter plane of E₈. The point you see is a footprint. The root is still the 8-dimensional vector.
              </p>
              <FoldWindow />
              <p>
                Time on the physical side is the second published relation. The folded state and the clock enter a restoring term:
              </p>
              <MathBlock block math="\partial \Psi / \partial t = F_{\mathrm{feedback}}\big(\pi_x(\Phi_{\mathrm{higher}}), D(n)\big)" />
              <p>
                The coupling that multiplies the residual fraction is φ raised to −|D − 4|. It is largest when the clock is at a 4-dimensional step, n = 3 and n = 11, and smallest at the 8-dimensional apex. Once the signs are anti-phase, the residual fraction is zero, so the restoring term is zero at every step. The deficit bowl is still there.
              </p>
            </Lesson>
          </section>
        )}

        {show('research') && (
          <section id="learn-research" className="space-y-6 scroll-mt-36">
            <header className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-rose-300">Research</div>
              <h2 className="mt-2 text-3xl font-extrabold text-slate-100">What a reviewer can check, and what is still a program</h2>
              <p className="mt-3 text-slate-400 leading-relaxed">
                The stack is three papers, not a finished theory of everything. The useful doctoral reading is the line between a reproducible geometric primitive and a physical interpretation that has not been tested.
              </p>
            </header>

            <Lesson id="lesson-stack" tone="research" theories={['I', 'II', 'III']} kicker="The stack" title="Engine, clock, bridge">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button type="button" onClick={() => onSelectTheory && onSelectTheory('hypercomplex')} className="text-left rounded-xl border border-cyan-900/70 bg-cyan-950/30 p-4 hover:border-cyan-500">
                  <Atom className="w-4 h-4 text-cyan-300" />
                  <div className="mt-2 text-xs font-mono uppercase tracking-wider text-cyan-300">Theory I · Engine</div>
                  <p className="mt-2 text-sm text-slate-200">Hypercomplex dynamical parity on E₈. The 240 roots, the Julia selector, the deficit and the twist.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-cyan-300">Open the theory <ArrowRight className="w-3 h-3" /></span>
                </button>
                <button type="button" onClick={() => onSelectTheory && onSelectTheory('odt')} className="text-left rounded-xl border border-amber-900/70 bg-amber-950/30 p-4 hover:border-amber-500">
                  <Orbit className="w-4 h-4 text-amber-300" />
                  <div className="mt-2 text-xs font-mono uppercase tracking-wider text-amber-300">Theory II · Clock</div>
                  <p className="mt-2 text-sm text-slate-200">The operator D(n), golden-ratio scales, and exploratory models of metric distortion and inertial decoupling.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-amber-300">Open the theory <ArrowRight className="w-3 h-3" /></span>
                </button>
                <button type="button" onClick={() => onSelectTheory && onSelectTheory('folding')} className="text-left rounded-xl border border-emerald-900/70 bg-emerald-950/30 p-4 hover:border-emerald-500">
                  <Layers className="w-4 h-4 text-emerald-300" />
                  <div className="mt-2 text-xs font-mono uppercase tracking-wider text-emerald-300">Theory III · Bridge</div>
                  <p className="mt-2 text-sm text-slate-200">The folding operator πₓ. Set C footprints. The invariants the fold is required to carry. The laboratory.</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-mono text-emerald-300">Open the theory <ArrowRight className="w-3 h-3" /></span>
                </button>
              </div>
              <p>
                Read them in that order. Theory I builds the object and its handedness. Theory II builds the clock that says which dimension is awake. Theory III is the map that puts a cross-section of the equipped object onto a manifold a reader can look at. The evolution equation then lets the clock and the feedback act on that cross-section.
              </p>
            </Lesson>

            <Lesson id="lesson-ledger" tone="research" theories={['I', 'II', 'III']} kicker="Ledger" title="Checked primitives, and interpretations that are still models">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/20 p-4">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono uppercase tracking-wider font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Reproducible
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>The standard construction yields 240 roots, each of length √2.</li>
                    <li>D(n) matches 8 − |(n mod 14) − 7| on a full period. The sequence is 1 through 8 and back down to 2.</li>
                    <li>θ₀ = arccos(1/3), δ = 360° − 5θ₀, and |Δθ| = δ/5. These match the published magnitudes.</li>
                    <li>An alternating sign assignment reduces residual twist relative to a random balanced assignment.</li>
                    <li>The exact 120:120 split is the H₄ / icosian projection in the hypercomplex paper. A representative 4D sample is only near-balanced, and the verification note says so.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-rose-900/60 bg-rose-950/20 p-4">
                  <div className="flex items-center gap-2 text-rose-300 text-xs font-mono uppercase tracking-wider font-bold">
                    <Compass className="w-4 h-4" /> Open or exploratory
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>Neighbor anti-correlation of the twists, as a property of the full root graph, is an open conjecture on Theory I.</li>
                    <li>Effective mass m_eff ≤ 0, metric inversion, and inertial decoupling are phenomenological models. They have not been derived as theorems from D(n), and they have not been quantitatively tested.</li>
                    <li>The folding operator is an architectural map with checked geometric primitives. Reading those footprints as spacetime stress-energy is the research program, not a completed derivation.</li>
                    <li>The papers do not offer this stack as a finished theory of everything. A further theory is not part of this page.</li>
                  </ul>
                </div>
              </div>
              <Check
                prompt="Which sentence matches the status of the effective-mass formula?"
                choices={[
                  'It is a theorem derived from D(n) and already tested',
                  'It is an exploratory model, not a completed derivation',
                  'It is the definition of the golden ratio',
                  'It is the count of the 240 roots',
                ]}
                answer={1}
                why="m_eff(n) is a proposed modulation of mass by the clock. The site and the papers mark gravitational readings as exploratory. The root count and the golden-ratio identity are the parts with direct checks."
              />
            </Lesson>

            <Lesson id="lesson-reading" tone="research" theories={['I', 'II', 'III']} kicker="How to read" title="A formula is a claim about a specific object">
              <p>
                When a formula appears in these papers, name the object it acts on before you interpret it. D(n) acts on a step. It returns an integer from 1 to 8. πₓ acts on a lattice that has already been equipped with parity. It returns a cross-section. A Green’s potential acts on a quaternion and returns a rate of escape. None of these, by itself, is a measurement of a galaxy or a vehicle.
              </p>
              <p>
                The physical sentences in Theory II — variable coupling, a distorted metric, momentum leaving the three visible directions — are attached to those operators as models. A review that treats them as theorems will misread the paper. A review that ignores the checked primitives will also misread it. The primitives are the root census, the clock, the deficit, the twist, and the balanced projection.
              </p>
              <p>
                A doctoral project that stays inside the published mathematics would tighten one of the open items: the neighbor-correlation conjecture, the exact projection that produces 120:120, or the question of which features of the fold are invariants for every choice of window and which features are only features of one laboratory map. That is a different project from fitting the exploratory mass formula to an experiment that has not been designed.
              </p>
            </Lesson>
          </section>
        )}

        <section id="learn-reference" className="scroll-mt-36 pb-16">
          <header className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
              <BookMarked className="w-3.5 h-3.5" /> Formula reference
            </div>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-100">The symbols, in one place</h2>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Each entry is the meaning used on this site. The level says where that meaning was taught above.
            </p>
            <label className="mt-4 flex items-center gap-2 max-w-md px-3 py-2 rounded-xl border border-slate-800 bg-slate-950">
              <Sigma className="w-4 h-4 text-slate-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the reference"
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-600 outline-none font-mono"
              />
            </label>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {glossary.map((entry) => (
              <article key={entry.name} className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <MathBlock math={entry.symbol} />
                  <span className="text-[10px] font-mono text-slate-500">{entry.level} · {entry.theory}</span>
                </div>
                <h3 className="mt-2 font-semibold text-slate-100">{entry.name}</h3>
                <p className="mt-1 text-sm text-slate-400 leading-relaxed">{entry.plain}</p>
              </article>
            ))}
          </div>
          {glossary.length === 0 && (
            <p className="text-sm font-mono text-slate-500">Nothing in the reference matches that search.</p>
          )}
        </section>
      </div>
    </div>
  );
}
