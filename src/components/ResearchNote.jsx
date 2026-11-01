import React from 'react';
import MathBlock from './MathBlock';
import { FileText, CheckCircle2, BookOpen, X, AlertTriangle } from 'lucide-react';
import {
  ComputationalStatusNoteBody,
  ExactArithmeticCertificateSection,
} from '../content/theoryIExactArithmetic';

export default function ResearchNote({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="relative w-full max-w-4xl glass-panel rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 mb-8">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:border-cyan-500/60 transition-colors"
          aria-label="Close research note"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 sm:p-10 space-y-8">

          {/* Header badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest">
              <FileText className="w-3.5 h-3.5" />
              Research Note · 1 November 2026
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Computationally Verified
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
              Balanced Chiral Partition of Projected E₈ Roots via a{' '}
              <span className="text-cyan-400">φ-Parameterized Quaternionic Green's Potential</span>
            </h2>

            {/* Author line */}
            <p className="text-sm font-mono text-slate-400">
              Donald "Donnie" Bugden &nbsp;·&nbsp;{' '}
              <a
                href="https://donniebugden.com"
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                donniebugden.com
              </a>
              &nbsp;·&nbsp; 1 November 2026
            </p>
          </div>

          {/* Abstract */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed border-l-2 border-cyan-500/40 pl-4">
            We describe a deterministic ranking of the 240 roots of the E₈ lattice induced by the
            Green's potential of a quaternionic quadratic map whose constant term is constructed from
            the golden ratio and the icosian ring. Under generic orthogonal projections of the roots
            into four-dimensional space, the ranking produces an exactly balanced partition into two
            sets of 120 roots. The partition is not equivalent to ordering by Euclidean distance from
            the origin in the projected space.
          </p>

          <hr className="border-slate-800/80" />

          {/* Section: Definitions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <h3 className="text-lg font-bold text-slate-100 tracking-wide">Definitions</h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Let{' '}
              <MathBlock math="\Phi(E_8)" /> be the set of 240 roots of{' '}
              <MathBlock math="E_8" />, realized in{' '}
              <MathBlock math="\mathbb{R}^8" /> as the vectors of squared length 2 whose coordinates
              are all integers or all half-integers and whose coordinate sum is even.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Let{' '}
              <MathBlock math="\pi : \mathbb{R}^8 \to \mathbb{R}^4" /> be an orthogonal projection.
              Identify the image with the quaternions{' '}
              <MathBlock math="\mathbb{H}" />. Consider the quadratic map
            </p>

            <MathBlock
              block
              math="q \;\mapsto\; q^2 + C(\phi), \qquad C(\phi) = \tfrac{1}{2}\!\left(\phi + \mathbf{i} + \phi^{-1}\mathbf{j}\right),"
            />

            <p className="text-sm text-slate-300 leading-relaxed">
              where{' '}
              <MathBlock math="\phi = (1+\sqrt{5})/2" />. The associated Green's potential is
            </p>

            <MathBlock
              block
              math="G(q) = \lim_{n\to\infty} 2^{-n} \log_+ \!\left|f_C^n(q)\right|."
            />
          </div>

          <hr className="border-slate-800/80" />

          {/* Section: The Partition */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100 tracking-wide">The Partition</h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Compute{' '}
              <MathBlock math="G(\pi(\alpha))" /> for each root{' '}
              <MathBlock math="\alpha \in \Phi(E_8)" />. Rank the 240 values and define
            </p>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-sm text-slate-300 space-y-1 font-mono">
              <p>
                <MathBlock math="\sigma(\alpha) = +1" />{' '}
                if{' '}
                <MathBlock math="G(\pi(\alpha))" />{' '}
                belongs to the upper half of the ranked list,
              </p>
              <p>
                <MathBlock math="\sigma(\alpha) = -1" />{' '}
                otherwise.
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              For generic choices of the orthogonal projection the resulting assignment satisfies
            </p>

            <MathBlock
              block
              math="\sum_{\alpha \,\in\, \Phi(E_8)} \sigma(\alpha) \;=\; 0."
            />

            <div className="flex items-start gap-3 p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-sm text-emerald-200 leading-relaxed">
                Thus the roots are partitioned into two sets of cardinality{' '}
                <strong>120</strong> each. This exact balance under generic projections has been
                confirmed by direct high-precision evaluation and, for a concrete orthogonal frame,
                by exact-arithmetic certification with a rigorous tail bound (1 November 2026).
              </p>
            </div>
          </div>

          <hr className="border-slate-800/80" />

          <ExactArithmeticCertificateSection />

          <hr className="border-slate-800/80" />

          {/* Section: Distinction from Radial Ordering */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100 tracking-wide">
              Distinction from Radial Ordering
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Let{' '}
              <MathBlock math="r(\alpha) = \|\pi(\alpha)\|" />. Ranking the roots by{' '}
              <MathBlock math="r(\alpha)" /> and splitting at the median produces a{' '}
              <em>different</em> assignment on a positive fraction of the roots. The Green's-potential
              ranking is therefore not a pure radial sort.
            </p>
          </div>

          <hr className="border-slate-800/80" />

          {/* Section: Icosian Shells */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100 tracking-wide">
              Remarks on the Icosian Shells
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              When the same procedure is applied to the pure unit icosians together with their{' '}
              <MathBlock math="\phi" />-scaled copies, the best balanced cut obtained from{' '}
              <MathBlock math="G" /> is{' '}
              <strong className="text-amber-300">124/116</strong> rather than 120/120. Exact balance
              is recovered when the input points are orthogonal projections of the actual lattice
              roots.
            </p>
          </div>

          <hr className="border-slate-800/80" />

          {/* Section: Status of Further Geometric Claims */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-100 tracking-wide">
              Status of Further Geometric Claims
            </h3>

            <div className="flex items-start gap-3 p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-200 leading-relaxed">
                Whether the labeling <MathBlock math="\sigma" /> anti-correlates with respect to the
                natural adjacency relation on <MathBlock math="E_8" /> (inner product equal to 1) or
                reduces elastic energy in a tetrahedral cut-and-project quasicrystal has been
                examined in several proxies and is{' '}
                <strong>not supported by those tests</strong>. Those properties are left as open
                questions and are not asserted here.
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Computational verification of the exact balance under generic projections, the
              distinction from radial ranking, and the November 2026 exact-arithmetic certificate
              has been performed by direct high-precision evaluation and field arithmetic on the
              240 roots.
            </p>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider block mb-3">
                Computational Status Note
              </span>
              <ComputationalStatusNoteBody verificationDetail="none" />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <span>Author: Donald "Donnie" Bugden</span>
            <span>·</span>
            <a
              href="https://donniebugden.com"
              className="text-cyan-500 hover:text-cyan-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              donniebugden.com
            </a>
            <span>·</span>
            <span>1 November 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}

