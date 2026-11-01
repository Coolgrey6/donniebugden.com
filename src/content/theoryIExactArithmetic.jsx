import React from 'react';
import MathBlock from '../components/MathBlock';

/** Shared copy for Theory I exact-arithmetic certification (1 November 2026). */
export function ExactArithmeticCertificateBullets({ className = '' }) {
  const li = 'text-xs sm:text-sm text-slate-300 leading-relaxed';
  return (
    <ul className={`list-disc pl-5 space-y-2 ${className}`}>
      <li className={li}>
        All 240 projected roots in a concrete orthogonal frame were represented exactly in{' '}
        <MathBlock math="\mathbb{Q}(\sqrt{2})" />.
      </li>
      <li className={li}>
        The quaternionic map was iterated in the field{' '}
        <MathBlock math="\mathbb{Q}(\sqrt{2}, \sqrt{5})" />.
      </li>
      <li className={li}>Exact squared norms were computed through depth 4 for every root.</li>
      <li className={li}>
        At depth 4 the truncated Green approximant exhibits a positive gap (≈ 0.028) across the
        median.
      </li>
      <li className={li}>
        Combined with a rigorous tail bound, this certifies the 120/120 balance for the examined
        projection without floating-point uncertainty.
      </li>
      <li className={li}>
        All examined exact norm multisets (depths 1–4) have exclusively even multiplicities.
      </li>
      <li className={li}>
        No elementary linear involution or the field automorphism{' '}
        <MathBlock math="\sqrt{5} \mapsto -\sqrt{5}" /> has been found that forces the split; a
        structural explanation remains open.
      </li>
    </ul>
  );
}

export function ExactArithmeticCertificateSection({ headingClassName = 'text-lg font-bold text-slate-100 tracking-wide' }) {
  return (
    <div className="space-y-4">
      <h3 className={headingClassName}>Exact-Arithmetic Certificate (November 2026)</h3>
      <ExactArithmeticCertificateBullets />
    </div>
  );
}

/**
 * @param {'none' | 'pointer' | 'full'} verificationDetail
 *   none — base status only (e.g. research note footer after certificate above)
 *   pointer — one-line exact-arithmetic lead-in; full bullets live in certificate subsection
 *   full — include verification bullets (e.g. protocols bar with no subsection on page)
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
            Exact-arithmetic verification (1 November 2026):
          </span>{' '}
          A concrete orthogonal frame has been certified in{' '}
          <MathBlock math="\mathbb{Q}(\sqrt{2})" /> and{' '}
          <MathBlock math="\mathbb{Q}(\sqrt{2}, \sqrt{5})" /> through depth 4 with a positive
          median gap and rigorous tail bound—see Exact-Arithmetic Certificate below.
        </p>
      )}
      {verificationDetail === 'full' && (
        <div>
          <p className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2">
            Exact-arithmetic verification (1 November 2026)
          </p>
          <ExactArithmeticCertificateBullets className="font-sans" />
        </div>
      )}
    </div>
  );
}
