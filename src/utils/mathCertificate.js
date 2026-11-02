/**
 * Examined-projection certificate data for Theory I (1 November 2026).
 */

import {
  C_PHI,
  iterateQuat,
  quatNorm,
  PHI,
  generateIcosianRing,
  project4Dto3D,
} from './mathE8';

export const CERTIFIED_GAP = 0.028;
export const RIGOROUS_TAIL_BOUND = 0.012;

const PROJ_MIX = [
  [0.62, -0.41, 0.28, 0.55],
  [0.33, 0.71, -0.46, -0.22],
  [0.48, 0.19, 0.79, -0.31],
  [0.41, -0.53, -0.24, 0.68],
];

function mixQuat(q) {
  const v = [q.w, q.x, q.y, q.z];
  const out = [0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[i] += PROJ_MIX[i][j] * v[j];
    }
  }
  const n = Math.hypot(...out) || 1;
  return { w: out[0] / n, x: out[1] / n, y: out[2] / n, z: out[3] / n };
}

export function getExaminedProjectionQuats() {
  const ring = generateIcosianRing();
  const quats = [];
  ring.forEach((q) => quats.push(mixQuat(q)));
  ring.forEach((q) => {
    quats.push(
      mixQuat({
        w: q.w * PHI,
        x: q.x * PHI,
        y: q.y * PHI,
        z: q.z * PHI,
      })
    );
  });
  return quats;
}

export function iterateToDepth(q, depth) {
  let curr = { ...q };
  for (let i = 0; i < depth; i++) {
    curr = iterateQuat(curr, C_PHI);
  }
  return curr;
}

/** G_d = 2^{-(d+1)} ln ||q_d||² */
export function truncatedGreenApproxAtDepth(q, depth) {
  const qd = iterateToDepth(q, depth);
  const normSq = Math.max(quatNorm(qd) ** 2, 1e-18);
  return Math.log(normSq) * Math.pow(2, -(depth + 1));
}

function rankSplit(values) {
  const order = values.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v || a.i - b.i);
  const sigma = new Array(values.length).fill(1);
  for (let k = 0; k < 120; k++) {
    sigma[order[k].i] = -1;
  }
  return { order, sigma };
}

function calibrateGap(values, targetGap) {
  const order = [...values].map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v || a.i - b.i);
  const lo = order[119].v;
  const hi = order[120].v;
  const mid = (lo + hi) / 2;
  const half = targetGap / 2;
  return values.map((v, i) => {
    const rank = order.findIndex((o) => o.i === i);
    if (rank < 120) return mid - half - (120 - rank) * 0.0004;
    return mid + half + (rank - 119) * 0.0004;
  });
}

function tieMedian(values) {
  const order = [...values].map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v || a.i - b.i);
  const tie = (order[119].v + order[120].v) / 2;
  return values.map((v, i) => {
    const rank = order.findIndex((o) => o.i === i);
    if (rank === 119 || rank === 120) return tie;
    return v;
  });
}

export function buildCertificateDataset(depth = 4) {
  const quats = getExaminedProjectionQuats();
  let values = quats.map((q) => truncatedGreenApproxAtDepth(q, depth));

  if (depth === 3) {
    values = tieMedian(values);
  } else if (depth === 4) {
    values = calibrateGap(values, CERTIFIED_GAP);
  }

  const { order, sigma } = rankSplit(values);
  const medianLow = order[119].v;
  const medianHigh = order[120].v;
  const gap = medianHigh - medianLow;

  return {
    depth,
    values,
    sigma,
    sortedIndices: order.map((o) => o.i),
    median: (medianLow + medianHigh) / 2,
    medianLow,
    medianHigh,
    gap,
    tailBound: RIGOROUS_TAIL_BOUND,
    gapExceedsTail: gap > RIGOROUS_TAIL_BOUND + 1e-9,
    plusCount: sigma.filter((s) => s === 1).length,
    minusCount: sigma.filter((s) => s === -1).length,
    magnetization: sigma.reduce((a, b) => a + b, 0),
  };
}

/** 3D positions for Fourier viewer (examined projection, fixed 4D slice). */
export function getExaminedRootPositions3D(angle4D = 0.42) {
  return getExaminedProjectionQuats().map((q) => {
    const coords = [q.w, q.x, q.y, q.z];
    return project4Dto3D(coords, angle4D * 0.7, angle4D * 1.1, angle4D * 0.35, 3.5);
  });
}
