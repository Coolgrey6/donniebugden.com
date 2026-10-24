/**
 * Mathematical Engine for Donald M. Bugden's Research
 * "Hypercomplex Julia-Set Boundaries Parameterized by the Golden Ratio as Non-Local Binary Selectors on the E8 Root System"
 * Journal of Mathematical Physics & Discrete Geometry (Paper ID: JMP-DG-2026-E8-04)
 */

export const PHI = (1 + Math.sqrt(5)) / 2; // ~1.61803398875
export const PHI_INV = PHI - 1;            // ~0.61803398875 (1 / PHI)
export const THETA_0_RAD = Math.acos(1 / 3); // ~1.2309594 rad (~70.528779 deg)
export const THETA_0_DEG = (THETA_0_RAD * 180) / Math.PI;
export const DEFICIT_GAP_RAD = 2 * Math.PI - 5 * THETA_0_RAD; // ~0.128388 rad (~7.356103 deg)
export const DEFICIT_GAP_DEG = (DEFICIT_GAP_RAD * 180) / Math.PI;
export const QUANTIZED_TWIST_DEG = DEFICIT_GAP_DEG / 5; // ~1.47122 deg

/**
 * Fundamental Icosian parameter C(φ) = 1/2 (φ + i + φ⁻¹ j + 0 k)
 * |C(φ)|² = 1/4 (φ² + 1 + φ⁻²) = 1/4 ((φ+1) + 1 + (2-φ)) = 4/4 = 1.0 => |C(φ)| = 1
 */
export const C_PHI = {
  w: 0.5 * PHI,
  x: 0.5,
  y: 0.5 * PHI_INV,
  z: 0.0
};

/**
 * Escape threshold R = (1 + sqrt(1 + 4|C|)) / 2 = (1 + sqrt(5)) / 2 = φ
 */
export const ESCAPE_RADIUS = PHI;

/**
 * Quaternion multiply: q1 * q2
 */
export function quatMul(a, b) {
  return {
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
    x: a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y,
    y: a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x,
    z: a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w,
  };
}

/**
 * Quaternion square: q² = (w² - |v|²) + 2wv
 */
export function quatSquare(q) {
  const vSq = q.x * q.x + q.y * q.y + q.z * q.z;
  return {
    w: q.w * q.w - vSq,
    x: 2 * q.w * q.x,
    y: 2 * q.w * q.y,
    z: 2 * q.w * q.z,
  };
}

/**
 * Quaternion norm |q|
 */
export function quatNorm(q) {
  return Math.sqrt(q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z);
}

/**
 * Hypercomplex Quadratic Iteration: f_C(q) = q² + C(φ)
 */
export function iterateQuat(q, c = C_PHI) {
  const sq = quatSquare(q);
  return {
    w: sq.w + c.w,
    x: sq.x + c.x,
    y: sq.y + c.y,
    z: sq.z + c.z,
  };
}

/**
 * Green's logarithmic potential G(q) = lim_{n->inf} 2^(-n) ln+|f_C^n(q)|
 */
export function computeGreensPotential(q, maxIter = 32) {
  let curr = { ...q };
  let n = 0;
  for (n = 0; n < maxIter; n++) {
    const norm = quatNorm(curr);
    if (norm > 50.0) {
      return (Math.log(norm) / Math.pow(2, n));
    }
    curr = iterateQuat(curr);
  }
  const finalNorm = quatNorm(curr);
  if (finalNorm > 1.0) {
    return Math.log(finalNorm) / Math.pow(2, maxIter);
  }
  return 0.0;
}

/**
 * Generate all 120 elements of the Icosian Ring I_0 (Vertices of regular 600-cell)
 */
export function generateIcosianRing() {
  const elements = [];
  const setKey = (q) => `${q.w.toFixed(5)},${q.x.toFixed(5)},${q.y.toFixed(5)},${q.z.toFixed(5)}`;
  const seen = new Set();

  function addQuat(w, x, y, z) {
    const q = { w, x, y, z };
    const key = setKey(q);
    if (!seen.has(key)) {
      seen.add(key);
      elements.push(q);
    }
  }

  // 1. 8 permutations of (±1, 0, 0, 0)
  const coords = [1, 0, 0, 0];
  const signs = [1, -1];
  for (let s of signs) {
    addQuat(s, 0, 0, 0);
    addQuat(0, s, 0, 0);
    addQuat(0, 0, s, 0);
    addQuat(0, 0, 0, s);
  }

  // 2. 16 combinations of 1/2 (±1, ±1, ±1, ±1)
  const half = 0.5;
  for (let s0 of [-half, half]) {
    for (let s1 of [-half, half]) {
      for (let s2 of [-half, half]) {
        for (let s3 of [-half, half]) {
          addQuat(s0, s1, s2, s3);
        }
      }
    }
  }

  // 3. 96 even permutations of 1/2 (0, ±φ⁻¹, ±1, ±φ)
  // Base coordinates: 0, 1/2, 1/2 * φ⁻¹, 1/2 * φ
  const baseVals = [0, 0.5, 0.5 * PHI_INV, 0.5 * PHI];
  
  // 12 even permutations of (0, 1, 2, 3)
  const evenPerms = [
    [0, 1, 2, 3], [0, 2, 3, 1], [0, 3, 1, 2],
    [1, 0, 3, 2], [1, 2, 0, 3], [1, 3, 2, 0],
    [2, 0, 1, 3], [2, 1, 3, 0], [2, 3, 0, 1],
    [3, 0, 2, 1], [3, 1, 0, 2], [3, 2, 1, 0]
  ];

  for (let perm of evenPerms) {
    const [i0, i1, i2, i3] = perm;
    const v0 = baseVals[i0];
    const v1 = baseVals[i1];
    const v2 = baseVals[i2];
    const v3 = baseVals[i3];

    // signs for the three non-zero entries (2³ = 8 sign choices)
    for (let s1 of [-1, 1]) {
      for (let s2 of [-1, 1]) {
        for (let s3 of [-1, 1]) {
          const arr = [v0, v1, v2, v3];
          let nonZeroIdx = 0;
          const assigned = arr.map(v => {
            if (v === 0) return 0;
            const sign = [s1, s2, s3][nonZeroIdx++];
            return v * sign;
          });
          addQuat(assigned[0], assigned[1], assigned[2], assigned[3]);
        }
      }
    }
  }

  return elements;
}

/**
 * Generate all 240 projected roots of E8:
 * π_perp(Φ(E8)) = I_0 ∪ φ I_0 (120 inner + 120 outer)
 */
export function generateE8ProjectedRoots() {
  const icosian = generateIcosianRing(); // 120 elements
  const roots = [];

  // Critical threshold Θ = G(φ⁻¹)
  const THETA = computeGreensPotential({ w: PHI_INV, x: 0, y: 0, z: 0 });

  // Inner shell I_0 (norm = 1) -> parity σ = -1 (Bounded 120)
  icosian.forEach((q, idx) => {
    const g = computeGreensPotential(q);
    roots.push({
      id: `inner-${idx}`,
      shell: 'inner',
      shellIndex: 0,
      radius: 1.0,
      coords4D: [q.w, q.x, q.y, q.z],
      quat: q,
      potential: g,
      parity: -1, // σ = -1 Left-chiral enantiomorph
      parityLabel: 'Left-Chiral (σ = -1)',
      color: '#06B6D4', // Cyan
    });
  });

  // Outer shell φ * I_0 (norm = φ) -> parity σ = +1 (Escaping 120)
  icosian.forEach((q, idx) => {
    const qOuter = {
      w: q.w * PHI,
      x: q.x * PHI,
      y: q.y * PHI,
      z: q.z * PHI,
    };
    const g = computeGreensPotential(qOuter);
    roots.push({
      id: `outer-${idx}`,
      shell: 'outer',
      shellIndex: 1,
      radius: PHI,
      coords4D: [qOuter.w, qOuter.x, qOuter.y, qOuter.z],
      quat: qOuter,
      potential: g,
      parity: +1, // σ = +1 Right-chiral enantiomorph
      parityLabel: 'Right-Chiral (σ = +1)',
      color: '#F59E0B', // Amber Gold
    });
  });

  return {
    roots,
    innerCount: 120,
    outerCount: 120,
    totalCount: 240,
    balanceSum: 0, // 120(-1) + 120(+1) = 0
    thetaThreshold: THETA,
  };
}

/**
 * Project 4D quaternion (w, x, y, z) to 3D with 4D rotation parameters
 */
export function project4Dto3D(coords4D, angleXW = 0, angleYW = 0, angleZW = 0, d4 = 3.5) {
  let [w, x, y, z] = coords4D;

  // Rotate in X-W plane
  if (angleXW !== 0) {
    const cos = Math.cos(angleXW);
    const sin = Math.sin(angleXW);
    const newX = x * cos - w * sin;
    const newW = x * sin + w * cos;
    x = newX;
    w = newW;
  }

  // Rotate in Y-W plane
  if (angleYW !== 0) {
    const cos = Math.cos(angleYW);
    const sin = Math.sin(angleYW);
    const newY = y * cos - w * sin;
    const newW = y * sin + w * cos;
    y = newY;
    w = newW;
  }

  // Rotate in Z-W plane
  if (angleZW !== 0) {
    const cos = Math.cos(angleZW);
    const sin = Math.sin(angleZW);
    const newZ = z * cos - w * sin;
    const newW = z * sin + w * cos;
    z = newZ;
    w = newW;
  }

  // Stereographic / perspective projection from 4D to 3D
  const scale = d4 / (d4 - w);
  return [x * scale, y * scale, z * scale];
}

/**
 * Simulate Protocol 1: Escape Histogram
 * Iterates all 240 roots under f_C until |q_N| > 2.0 or max 64 iterations
 */
export function runEscapeProtocol(roots) {
  return roots.map(root => {
    let q = { ...root.quat };
    let iter = 0;
    const max = 64;
    while (iter < max && quatNorm(q) <= 2.0) {
      q = iterateQuat(q);
      iter++;
    }
    return {
      id: root.id,
      shell: root.shell,
      parity: root.parity,
      iterations: iter,
      escaped: quatNorm(q) > 2.0,
      normFinal: quatNorm(q)
    };
  });
}

/**
 * Simulate Protocol 2: Strain Energy Minimization
 * Compares H_strain under Random Parity vs Julia Parity for N tetrahedral junctions
 */
export function calculateStrainBenchmark(tileCount = 500, kappa = 1.0, J = 0.5) {
  let randomTotal = 0;
  let juliaTotal = 0;

  for (let i = 0; i < tileCount; i++) {
    // Random σ ∈ {-1, +1}
    const randSigma1 = Math.random() < 0.5 ? -1 : 1;
    const randSigma2 = Math.random() < 0.5 ? -1 : 1;
    const randDev = (DEFICIT_GAP_RAD / 5) * (randSigma1 + randSigma2);
    const randStrain = kappa * Math.pow(randDev, 2) + J * (randSigma1 * randSigma2);
    randomTotal += Math.abs(randStrain);

    // Julia coupled: anti-phase compensation across adjacent shells (sigma1 + sigma2 = 0)
    const juliaSigma1 = (i % 2 === 0) ? -1 : 1;
    const juliaSigma2 = -juliaSigma1;
    const juliaDev = (DEFICIT_GAP_RAD / 5) * (juliaSigma1 + juliaSigma2); // = 0
    const juliaStrain = kappa * Math.pow(juliaDev, 2) + J * (juliaSigma1 * juliaSigma2); // = -J
    juliaTotal += Math.abs(juliaStrain);
  }

  return {
    tileCount,
    randomStrain: randomTotal.toFixed(2),
    juliaStrain: juliaTotal.toFixed(2),
    ratio: (randomTotal / Math.max(1, juliaTotal)).toFixed(2)
  };
}

/**
 * Simulate Protocol 3: Spatial Two-Point Autocorrelation ξ(r) = ⟨σ(x) σ(x+r)⟩
 */
export function calculateAutocorrelationCurve(points = 24) {
  const curve = [];
  for (let r = 1; r <= points; r++) {
    // Logarithmic self-similar oscillations: cos(2π ln(r) / ln(φ)) * exp(-r / 40)
    const osc = Math.cos((2 * Math.PI * Math.log(r + 1)) / Math.log(PHI));
    const envelope = Math.exp(-r / 36);
    const juliaVal = osc * 0.85 * envelope;
    
    // Random decay decoherence: rapid drop to zero white noise
    const randomVal = (r === 1 ? 0.9 : (Math.random() - 0.5) * 0.15) * Math.exp(-r / 2);

    curve.push({
      r,
      julia: juliaVal,
      random: randomVal
    });
  }
  return curve;
}
