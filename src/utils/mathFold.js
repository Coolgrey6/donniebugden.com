/**
 * Laboratory realization of the Theory III folding relation
 *
 *   π_x ( L_E8 ⊗ D_parity ) → M_phys
 *   ∂Ψ/∂t = F_feedback( π_x(Φ_higher), D(n) )
 *
 * L_E8 is the standard 240-root system of Euclidean norm √2.
 * D(n) = 8 − |(n mod 14) − 7| opens a window of active coordinates.
 * Coordinates outside that window are suppressed by φ^−(8−D), so the
 * physical reading is a cross-section (a Set C footprint).
 * The dihedral deficit and the quantized twist are invariants of the fold.
 * Residual twist on a root is the part of |Δθ| that neighboring parity
 * signs fail to cancel. Feedback is a restoring term toward cancellation,
 * strongest when the clock sits on the 4-dimensional bound.
 */

import {
  PHI,
  DEFICIT_GAP_DEG,
  QUANTIZED_TWIST_DEG,
} from './mathE8.js';
import { getDimensionAtStep, getTrajectoryPhase } from './mathODT.js';

const DIM = 8;
const ROOT_COUNT = 240;

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function normalize(a) {
  const n = norm(a) || 1;
  return a.map((v) => v / n);
}

function solveLinear(matrix, vector) {
  const n = vector.length;
  const M = matrix.map((row, i) => [...row, vector[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    }
    if (Math.abs(M[pivot][col]) < 1e-14) continue;
    const tmp = M[col];
    M[col] = M[pivot];
    M[pivot] = tmp;
    const div = M[col][col];
    for (let c = col; c <= n; c++) M[col][c] /= div;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = M[r][col];
      if (factor === 0) continue;
      for (let c = col; c <= n; c++) M[r][c] -= factor * M[col][c];
    }
  }
  return M.map((row) => row[n]);
}

function dominantPlane(symmetric, lambda) {
  const shift = lambda - 1e-8;
  const shifted = symmetric.map((row, i) =>
    row.map((value, j) => value - (i === j ? shift : 0))
  );
  let v1 = [1, 0.31, -0.22, 0.48, 0.12, -0.37, 0.19, 0.66];
  for (let k = 0; k < 32; k++) {
    v1 = normalize(solveLinear(shifted, normalize(v1)));
  }
  let v2 = [-0.42, 0.91, 0.18, -0.27, 0.55, 0.08, -0.48, 0.21];
  const strip = (v) => {
    const p = dot(v, v1);
    return normalize(v.map((value, i) => value - p * v1[i]));
  };
  v2 = strip(v2);
  for (let k = 0; k < 32; k++) {
    v2 = strip(solveLinear(shifted, v2));
  }
  return [v1, v2];
}

function simpleRoots() {
  const roots = [];
  for (let i = 0; i < 7; i++) {
    const alpha = [0, 0, 0, 0, 0, 0, 0, 0];
    alpha[i] = 1;
    alpha[i + 1] = -1;
    roots.push(alpha);
  }
  roots.push([-0.5, -0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5]);
  return roots;
}

function reflect(alpha, vector) {
  const projection = dot(alpha, vector);
  return vector.map((value, i) => value - projection * alpha[i]);
}

function coxeterFrames() {
  const alphas = simpleRoots();
  const columns = [];
  for (let basis = 0; basis < DIM; basis++) {
    let vector = [0, 0, 0, 0, 0, 0, 0, 0];
    vector[basis] = 1;
    for (let s = 0; s < alphas.length; s++) vector = reflect(alphas[s], vector);
    columns.push(vector);
  }
  const symmetric = Array.from({ length: DIM }, () => Array(DIM).fill(0));
  for (let r = 0; r < DIM; r++) {
    for (let c = 0; c < DIM; c++) {
      symmetric[r][c] = 0.5 * (columns[c][r] + columns[r][c]);
    }
  }
  const primary = dominantPlane(symmetric, Math.cos((2 * Math.PI) / 30));
  const secondary = dominantPlane(symmetric, Math.cos((2 * Math.PI * 7) / 30));
  return { primary, lift: secondary[0] };
}

export function generateE8Roots() {
  const roots = [];
  for (let i = 0; i < DIM; i++) {
    for (let j = i + 1; j < DIM; j++) {
      for (const si of [-1, 1]) {
        for (const sj of [-1, 1]) {
          const vector = [0, 0, 0, 0, 0, 0, 0, 0];
          vector[i] = si;
          vector[j] = sj;
          roots.push(vector);
        }
      }
    }
  }
  for (let mask = 0; mask < 256; mask++) {
    let negatives = 0;
    const vector = new Array(DIM);
    for (let k = 0; k < DIM; k++) {
      if ((mask >> k) & 1) {
        vector[k] = -0.5;
        negatives += 1;
      } else {
        vector[k] = 0.5;
      }
    }
    if (negatives % 2 === 0) roots.push(vector);
  }
  return roots;
}

function neighborLists(roots) {
  const lists = Array.from({ length: roots.length }, () => []);
  for (let i = 0; i < roots.length; i++) {
    for (let j = i + 1; j < roots.length; j++) {
      if (Math.abs(dot(roots[i], roots[j]) - 1) < 1e-6) {
        lists[i].push(j);
        lists[j].push(i);
      }
    }
  }
  return lists;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function balancedSigns(seed) {
  const random = mulberry32(seed);
  const order = Array.from({ length: ROOT_COUNT }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  const signs = new Array(ROOT_COUNT).fill(1);
  for (let i = 0; i < ROOT_COUNT / 2; i++) signs[order[i]] = -1;
  return signs;
}

function perfectMatching(neighbors) {
  const partner = new Int16Array(ROOT_COUNT);
  partner.fill(-1);
  const unmatched = () => {
    const open = [];
    for (let i = 0; i < ROOT_COUNT; i++) if (partner[i] < 0) open.push(i);
    return open;
  };
  const claim = (i, j) => {
    partner[i] = j;
    partner[j] = i;
  };
  for (let guard = 0; guard < ROOT_COUNT; guard++) {
    const open = unmatched();
    if (open.length === 0) break;
    let progressed = false;
    for (const i of open) {
      if (partner[i] >= 0) continue;
      for (const j of neighbors[i]) {
        if (partner[j] < 0) {
          claim(i, j);
          progressed = true;
          break;
        }
      }
    }
    if (!progressed) {
      for (const i of unmatched()) {
        let fixed = false;
        for (const j of neighbors[i]) {
          const k = partner[j];
          if (k < 0 || k === i) continue;
          for (const spare of neighbors[k]) {
            if (partner[spare] < 0 && spare !== i) {
              partner[j] = i;
              partner[i] = j;
              partner[k] = spare;
              partner[spare] = k;
              fixed = true;
              break;
            }
          }
          if (fixed) break;
        }
      }
    }
  }
  return partner;
}

export function antiphaseSigns(partner) {
  const signs = new Array(ROOT_COUNT).fill(0);
  for (let i = 0; i < ROOT_COUNT; i++) {
    if (signs[i] !== 0) continue;
    const j = partner[i];
    signs[i] = -1;
    signs[j] = 1;
  }
  return signs;
}

export function residualField(signs, partner) {
  const field = new Array(signs.length);
  let total = 0;
  for (let i = 0; i < signs.length; i++) {
    const residual = signs[i] === signs[partner[i]] ? QUANTIZED_TWIST_DEG : 0;
    field[i] = residual;
    total += residual;
  }
  return { field, mean: total / signs.length };
}

/**
 * One feedback update. A same-sign adjacent pair is exchanged with a
 * same-sign pair of the opposite class, which preserves 120:120 and
 * cancels the twist on both pairs. Returns null at the attractor.
 */
export function settleOnce(signs, partner) {
  const next = signs.slice();
  let plusPair = -1;
  let minusPair = -1;
  for (let i = 0; i < next.length; i++) {
    const j = partner[i];
    if (j < i) continue;
    if (next[i] !== next[j]) continue;
    if (next[i] > 0 && plusPair < 0) plusPair = i;
    if (next[i] < 0 && minusPair < 0) minusPair = i;
    if (plusPair >= 0 && minusPair >= 0) break;
  }
  if (plusPair < 0 || minusPair < 0) return null;
  const plusMate = partner[plusPair];
  const minusMate = partner[minusPair];
  next[plusPair] = -1;
  next[plusMate] = 1;
  next[minusPair] = -1;
  next[minusMate] = 1;
  return next;
}

export function coordinateWindow(n) {
  const dimension = getDimensionAtStep(n);
  const phase = getTrajectoryPhase(n);
  const start = ((n % 14) + 14) % 14 % DIM;
  const suppress = Math.pow(PHI, -(DIM - dimension));
  const weights = Array(DIM).fill(suppress);
  const active = Array(DIM).fill(false);
  for (let i = 0; i < dimension; i++) {
    const index = (start + i) % DIM;
    weights[index] = 1;
    active[index] = true;
  }
  return { dimension, phase, start, suppress, weights, active };
}

function projectRoot(root, weights, frame) {
  let u = 0;
  let v = 0;
  let lift = 0;
  for (let k = 0; k < DIM; k++) {
    const value = root[k] * weights[k];
    u += value * frame.primary[0][k];
    v += value * frame.primary[1][k];
    lift += value * frame.lift[k];
  }
  return { u, v, lift };
}

const FULL_WEIGHTS = [1, 1, 1, 1, 1, 1, 1, 1];

function buildModel() {
  const roots = generateE8Roots();
  let maxNormError = 0;
  for (const root of roots) {
    maxNormError = Math.max(maxNormError, Math.abs(norm(root) - Math.SQRT2));
  }
  const neighbors = neighborLists(roots);
  const partner = perfectMatching(neighbors);
  const frame = coxeterFrames();
  const random = balancedSigns(20261105);
  const antiphase = antiphaseSigns(partner);
  const antiResidual = residualField(antiphase, partner);
  const randomResidual = residualField(random, partner);
  const higher = roots.map((root) => projectRoot(root, FULL_WEIGHTS, frame));
  let radius = 0;
  for (const point of higher) {
    radius = Math.max(radius, Math.hypot(point.u, point.v, point.lift));
  }
  return {
    roots,
    neighbors,
    partner,
    matchedPairs: Array.from(partner).filter((value) => value >= 0).length / 2,
    frame,
    higher,
    radius,
    maxNormError,
    neighborDegree: neighbors[0].length,
    antiphase,
    random,
    antiResidual,
    randomResidual,
  };
}

export const FOLD_MODEL = buildModel();

export const MANIFOLD_SEGMENTS = 40;

function sampleStress(points, residuals, radius) {
  const segments = MANIFOLD_SEGMENTS;
  const heights = new Float32Array((segments + 1) * (segments + 1));
  const span = radius * 1.35;
  const sigma = span / 7.5;
  const invTwoSigma = 1 / (2 * sigma * sigma);
  for (let row = 0; row <= segments; row++) {
    const z = -span + (2 * span * row) / segments;
    for (let col = 0; col <= segments; col++) {
      const x = -span + (2 * span * col) / segments;
      let height = 0;
      for (let i = 0; i < points.length; i++) {
        const dx = x - points[i].u;
        const dz = z - points[i].v;
        height += residuals[i] * Math.exp(-(dx * dx + dz * dz) * invTwoSigma);
      }
      heights[row * (segments + 1) + col] = height;
    }
  }
  let maxHeight = 0;
  for (let i = 0; i < heights.length; i++) maxHeight = Math.max(maxHeight, heights[i]);
  return { heights, maxHeight, span, segments };
}

export function signsForMode(mode) {
  if (mode === 'random') return FOLD_MODEL.random;
  if (mode === 'antiphase') return FOLD_MODEL.antiphase;
  return null;
}

export function describeFold(n, signs) {
  const window = coordinateWindow(n);
  const { roots, frame, higher } = FOLD_MODEL;
  const folded = new Array(roots.length);
  let left = 0;
  let right = 0;
  for (let i = 0; i < roots.length; i++) {
    folded[i] = projectRoot(roots[i], window.weights, frame);
    if (signs[i] < 0) left += 1;
    else right += 1;
  }
  const { field, mean } = residualField(signs, FOLD_MODEL.partner);
  const stress = sampleStress(folded, field, FOLD_MODEL.radius);
  const psi = mean / QUANTIZED_TWIST_DEG;
  const coupling = Math.pow(PHI, -Math.abs(window.dimension - 4));
  const feedback = -coupling * psi;
  return {
    ...window,
    higher,
    folded,
    residuals: field,
    meanResidual: mean,
    stress,
    left,
    right,
    psi,
    coupling,
    feedback,
    deficit: DEFICIT_GAP_DEG,
    twist: QUANTIZED_TWIST_DEG,
    normError: FOLD_MODEL.maxNormError,
  };
}

export function comparisonStats() {
  return {
    antiMean: FOLD_MODEL.antiResidual.mean,
    randomMean: FOLD_MODEL.randomResidual.mean,
    ratio: FOLD_MODEL.antiResidual.mean < 1e-8
      ? null
      : FOLD_MODEL.randomResidual.mean / FOLD_MODEL.antiResidual.mean,
    deficit: DEFICIT_GAP_DEG,
    twist: QUANTIZED_TWIST_DEG,
  };
}

export function feedbackSeries(signs) {
  const { mean } = residualField(signs, FOLD_MODEL.partner);
  const psi = mean / QUANTIZED_TWIST_DEG;
  return Array.from({ length: 14 }, (_, n) => {
    const dimension = getDimensionAtStep(n);
    const coupling = Math.pow(PHI, -Math.abs(dimension - 4));
    return {
      n,
      dimension,
      residual: mean,
      coupling,
      feedback: -coupling * psi,
    };
  });
}
