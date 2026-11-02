import React from 'react';
import MathBlock from '../components/MathBlock';

const bodyClass = 'text-xs sm:text-sm text-slate-300 leading-relaxed';

/** Core certified-status prose (1 November 2026). */
export function ExactArithmeticCertificateContent() {
  return (
    <div className={`space-y-3 ${bodyClass}`}>
      <p>
        Under generic orthogonal projections of the 240 roots of <MathBlock math="E_8" />, the
        Green&apos;s potential of the map
      </p>
      <MathBlock
        block
        math="q \mapsto q^2 + C(\phi), \qquad C(\phi) = \tfrac{1}{2}\bigl(\phi + \mathbf{i} + \phi^{-1}\mathbf{j}\bigr)"
      />
      <p>
        produces an exactly balanced 120/120 partition. For a concrete projection this has been
        certified by exact arithmetic in <MathBlock math="\mathbb{Q}(\sqrt{2}, \sqrt{5})" />:
        iteration through depth 4 yields a truncated approximant with a positive gap ≈ 0.028 about
        the median, exceeding a rigorous tail bound. The ranking is distinct from pure radial
        ordering. Even multiplicities of the exact norms persist through depth 4. No structural
        pairing that forces the balance for every generic projection has been identified
        (hyperoctahedral stabilizer, binary icosahedral group, and tested Weyl reflections do not
        reverse the ranking).
      </p>
    </div>
  );
}

export function ExactArithmeticCertificateSection({
  headingClassName = 'text-lg font-bold text-slate-100 tracking-wide',
  showHeading = true,
  className = '',
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {showHeading && (
        <h3 className={headingClassName}>Exact-Arithmetic Certificate (1 November 2026)</h3>
      )}
      <ExactArithmeticCertificateContent />
    </div>
  );
}

export function ShareableResearchNoteCallout({ onOpenResearchNote }) {
  return (
    <div className={`${bodyClass} text-slate-400 border-l-2 border-cyan-500/40 pl-4`}>
      <span className="font-mono text-cyan-400 font-semibold uppercase text-[11px] tracking-wider block mb-1">
        Shareable note
      </span>
      <p>
        {onOpenResearchNote ? (
          <button
            type="button"
            onClick={onOpenResearchNote}
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium"
          >
            Balanced Chiral Partition of Projected E₈ Roots
          </button>
        ) : (
          <span className="text-slate-200 font-medium">
            Balanced Chiral Partition of Projected E₈ Roots
          </span>
        )}
        {' '}
        — one-page statement of the computational theorem (1 November 2026) with the same certified
        result and an explicit list of open questions. Derived continuum limits, gravitational-wave
        predictions, and automatic strain cancellation are not claimed; those topics remain
        exploratory or open.
      </p>
    </div>
  );
}

export function TheoryIOpenQuestionsList({ className = '' }) {
  const li = `${bodyClass} text-slate-300`;
  return (
    <ul className={`list-disc pl-5 space-y-2 ${className}`}>
      <li className={li}>
        Whether the labeling <MathBlock math="\sigma" /> anti-correlates on geometric neighbors of{' '}
        <MathBlock math="E_8" /> or reduces elastic strain in tetrahedral quasicrystal models (strain
        cancellation remains an open conjecture; adjacency tests have not confirmed anti-phase
        ordering).
      </li>
      <li className={li}>
        A structural mechanism that would force exact 120/120 balance for every generic orthogonal
        projection (hyperoctahedral stabilizer, binary icosahedral group, and tested Weyl
        reflections do not reverse the Green&apos;s ranking).
      </li>
      <li className={li}>
        Whether the same Green&apos;s ranking on pure unit and <MathBlock math="\phi" />-scaled
        icosian shells (near-balanced splits such as 124/116) can be reconciled with full{' '}
        <MathBlock math="E_8" /> root projections without the lattice input.
      </li>
      <li className={li}>
        Any derived continuum limit, gravitational-wave signature, or bulk frustration closure tied
        to this parity functional (exploratory only; not asserted in the certified computational
        theorem).
      </li>
    </ul>
  );
}

/**
 * @param {'none' | 'pointer' | 'full'} verificationDetail
 */
export function ComputationalStatusNoteBody({
  textClassName = 'text-xs sm:text-sm text-slate-300 leading-relaxed font-sans',
  useE8MathBlock = true,
  verificationDetail = 'pointer',
}) {
  return (
    <div className={`space-y-4 ${textClassName}`}>
      <p>
        {useE8MathBlock ? (
          <>
            Computational examination confirms that the Green’s potential ranking produces an exact
            120/120 partition on generic projections of the actual <MathBlock math="E_8" /> roots.
            The same procedure applied to the pure unit and <MathBlock math="\phi" />-scaled
            icosian shells yields a near-balanced but not exact split. Claims of automatic shear
            cancellation via anti-correlated chiralities are not supported by the adjacency-graph
            and nearest-neighbor tests performed so far and are retained only as open research
            directions.
          </>
        ) : (
          <>
            Computational examination confirms that the Green’s potential ranking produces an exact
            120/120 partition on generic projections of the actual E8 roots. The same procedure
            applied to the pure unit and φ-scaled icosian shells yields a near-balanced but not
            exact split. Claims of automatic shear cancellation via anti-correlated chiralities are
            not supported by the adjacency-graph and nearest-neighbor tests performed so far and
            are retained only as open research directions.
          </>
        )}
      </p>
      {verificationDetail === 'pointer' && (
        <p>
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
            Certified status (1 November 2026):
          </span>{' '}
          Exact arithmetic in <MathBlock math="\mathbb{Q}(\sqrt{2}, \sqrt{5})" /> certifies 120/120
          for a concrete projection (depth-4 gap ≈ 0.028 vs. tail bound)—see Exact-Arithmetic
          Certificate below.
        </p>
      )}
      {verificationDetail === 'full' && (
        <div className="pt-2 border-t border-cyan-800/40">
          <ExactArithmeticCertificateSection
            headingClassName="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2"
            showHeading
          />
        </div>
      )}
    </div>
  );
}
