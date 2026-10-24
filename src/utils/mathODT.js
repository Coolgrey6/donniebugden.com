/**
 * Mathematical Engine for Donald M. Bugden's Research
 * "Oscillating Dimensional Trajectories on E8 Lattices: Dynamic Metric Distortion, Inertial Decoupling, and Gravitational Modification"
 * Journal of Mathematical Physics & Discrete Geometry (Paper ID: JMP-DG-2026-E8-05)
 */

export const PHI = (1 + Math.sqrt(5)) / 2; // ~1.61803398875
export const PHI_INV = PHI - 1;            // ~0.61803398875 (1 / PHI)
export const LN_PHI = Math.log(PHI);       // ~0.481211825

/**
 * 14-Step Periodic Dimensional Stepping Operator:
 * D(n) = 8 - |(n mod 14) - 7|
 * Maps n ∈ {0,...,13} -> {1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2}
 */
export function getDimensionAtStep(n) {
  const normN = ((n % 14) + 14) % 14;
  return 8 - Math.abs(normN - 7);
}

/**
 * Trajectory Phase at step n:
 * - 'ascent'  : n in [0..6]  (D climbs 1 -> 7)
 * - 'apex'    : n === 7     (D = 8)
 * - 'descent' : n in [8..13] (D descends 7 -> 2)
 */
export function getTrajectoryPhase(n) {
  const normN = ((n % 14) + 14) % 14;
  if (normN === 7) return 'apex';
  if (normN < 7) return 'ascent';
  return 'descent';
}

/**
 * Golden Ratio Scale Factor:
 * λ(n) = φ^((-1)^n * D(n))
 */
export function getScaleFactor(n) {
  const d = getDimensionAtStep(n);
  const exponent = Math.pow(-1, n) * d;
  return Math.pow(PHI, exponent);
}

/**
 * Dynamic Effective Gravitational Mass Ratio:
 * m_eff(n) / m_0 = cos(π * (n - 7) / 7) * φ^(-|D(n) - 4|)
 * In descent phase, m_eff -> 0 or negative (gravitational anti-attraction)
 */
export function getEffectiveMassRatio(n) {
  const d = getDimensionAtStep(n);
  const phase = Math.cos((Math.PI * (n - 7)) / 7);
  const damp = Math.pow(PHI, -Math.abs(d - 4));
  return phase * damp;
}

/**
 * Dynamic Gravitational Coupling Function:
 * G(n) / G_0 = [(φ^(4 - D) - φ^(D - 4)) / (φ^4 - φ^(-4))] * cos(π * n / 7)
 */
export function getGravitationalCouplingRatio(n) {
  const d = getDimensionAtStep(n);
  const denom = Math.pow(PHI, 4) - Math.pow(PHI, -4);
  const num = Math.pow(PHI, 4 - d) - Math.pow(PHI, d - 4);
  const phase = Math.cos((Math.PI * n) / 7);
  return (num / denom) * phase;
}

/**
 * Metric Distortion Factor at radius r:
 * h_eff(n, r) = [1 - ξ * cos(2π n / 14) * φ^(-|D(n) - 4|)] * exp(-r² / 2σ²)
 */
export function getMetricDistortionFactor(n, r = 0, xi = 0.85, sigma = 2.0) {
  const d = getDimensionAtStep(n);
  const mod = 1.0 - xi * Math.cos((2 * Math.PI * n) / 14) * Math.pow(PHI, -Math.abs(d - 4));
  const spatial = Math.exp(-(r * r) / (2 * sigma * sigma));
  return mod * spatial;
}

/**
 * Theoretical Resonance Power Requirement:
 * P_req(n) ∝ ℏ * ω_0 * ln(φ) * φ^(2 * (D(n) - 4))
 */
export function getPowerRequirementNormalized(n) {
  const d = getDimensionAtStep(n);
  return LN_PHI * Math.pow(PHI, 2 * (d - 4));
}

/**
 * Hyper-Dimensional Momentum Shunting Projection:
 * Computes the 3D projected momentum and internal hyper-dimensional momentum
 * given initial 3D force magnitude and step n.
 */
export function calculateMomentumShunt(F_3D, n) {
  const phase = getTrajectoryPhase(n);
  const d = getDimensionAtStep(n);
  
  // During descent, momentum transfers strongly into hyper-dimensional coordinates
  let shuntFraction = 0.0;
  if (phase === 'descent') {
    shuntFraction = (9 - d) / 8.0; // Higher shunting as D descends 7 -> 2
  } else if (phase === 'apex') {
    shuntFraction = 0.95;
  } else {
    shuntFraction = (d - 1) / 14.0;
  }

  const F_apparent_3D = F_3D * (1.0 - shuntFraction);
  const F_internal_hyper = F_3D * shuntFraction;

  return {
    shuntFraction,
    F_apparent_3D,
    F_internal_hyper,
    properAccelerationZero: shuntFraction > 0.8
  };
}
