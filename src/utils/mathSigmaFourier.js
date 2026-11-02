/**
 * Discrete Fourier content of balanced σ on projected E₈ roots.
 */

import { buildCertificateDataset, getExaminedRootPositions3D } from './mathCertificate';

export const LOW_WAVE_VECTORS = [
  { id: '000', label: '(0, 0, 0) monopole', k: [0, 0, 0] },
  { id: '100', label: '(1, 0, 0)', k: [1, 0, 0] },
  { id: '010', label: '(0, 1, 0)', k: [0, 1, 0] },
  { id: '001', label: '(0, 0, 1)', k: [0, 0, 1] },
  { id: '110', label: '(1, 1, 0)', k: [1, 1, 0] },
  { id: '101', label: '(1, 0, 1)', k: [1, 0, 1] },
  { id: '011', label: '(0, 1, 1)', k: [0, 1, 1] },
  { id: '111', label: '(1, 1, 1)', k: [1, 1, 1] },
];

export function computeRhoHatSigma(k, positions3d, sigma) {
  const N = sigma.length;
  let re = 0;
  let im = 0;
  for (let i = 0; i < N; i++) {
    const phase = k[0] * positions3d[i][0] + k[1] * positions3d[i][1] + k[2] * positions3d[i][2];
    re += sigma[i] * Math.cos(phase);
    im -= sigma[i] * Math.sin(phase);
  }
  re /= N;
  im /= N;
  return {
    re,
    im,
    magnitude: Math.hypot(re, im),
  };
}

export function computeLeadingSigmaFourierModes(depth = 4) {
  const dataset = buildCertificateDataset(depth);
  const positions = getExaminedRootPositions3D();
  const modes = LOW_WAVE_VECTORS.map((entry) => ({
    ...entry,
    ...computeRhoHatSigma(entry.k, positions, dataset.sigma),
  }));
  const monopole = modes.find((m) => m.id === '000');
  return {
    modes,
    sigma: dataset.sigma,
    monopoleMagnitude: monopole?.magnitude ?? 0,
    magnetization: dataset.magnetization,
  };
}

/** Combined modulation amplitude ∝ D(n) / (k² + m² D(n)), m² = 1, k² = ratio. */
export function combinedModulationAmplitude(d, k2OverM2) {
  const k2 = k2OverM2;
  const m2 = 1;
  return d / (k2 + m2 * d);
}

export function pureModulationAmplitude(d) {
  return d;
}

export function swingRatio(values) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return min > 1e-9 ? max / min : max;
}
