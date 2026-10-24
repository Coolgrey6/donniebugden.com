# Donald Bugden — Theoretical Mathematics & Advanced Computation Consultant

> **Specialist in High-Dimensional Lattices ($E_8$, Leech), Discrete Dynamical Systems, Quaternionic Julia Boundaries, and Defense/Cryptographic Modeling.**
> *Department of Mathematical Sciences • Theoretical Physics Research Initiative*
> *Correspondence: donnie.bugden@gmail.com*

---

## Overview

This repository hosts the official research portal and defense advisory platform for **Donald "Donnie" Bugden**. The site presents both executive-level consulting capabilities and deep theoretical treatises connecting exceptional Lie algebra root lattices to hypercomplex dynamical systems and emergence physics.

### Primary Theoretical Treatises Included
1. **Manuscript**: *"Hypercomplex Julia-Set Boundaries Parameterized by the Golden Ratio as Non-Local Binary Selectors on the E8 Root System"* (Journal of Mathematical Physics & Discrete Geometry, Paper ID: `JMP-DG-2026-E8-04`).
2. **Companion Atlas**: *"Visual Companion & Mathematical Proof Atlas: Hypercomplex Dynamical Parity on E8"*.

---

## Core Features & Architecture

- **4D Coxeter 600-Cell / $E_8$ Root Projection (Three.js)**: Real-time 3D/4D stereographic visualization of all 240 Gosset roots partitioned into dual 120-element chiral shells ($\mathcal{I}_0 \cup \phi \mathcal{I}_0$).
- **Quaternionic Julia Explorer ($\partial K_{C(\phi)}$)**: High-performance canvas shader visualizing the Green's logarithmic potential $G(q)$ and escape horizon $R = \phi \approx 1.618$.
- **Tetrahedral Packing Frustration & Chiral Shear Resolution**: Interactive 3D simulator demonstrating how five regular tetrahedra with a $7.356^\circ$ deficit angle close into exact $360^\circ$ topology under the quantized twist $\Delta\theta = \pm 1.4712^\circ$.
- **Section 6 Computational Protocols**: Live browser execution of escape spectrum histograms, global strain Hamiltonian benchmarks, and spatial autocorrelation $\xi(r)$.
- **KaTeX Formalism**: Complete mathematical definitions, propositions, and SageMath / Python 3 verification scripts.
- **Interactive Terminal & Advisory Dispatch**: Command console (`roots`, `eval-parity`, `gap`, `icosian`, `retain`) with secure NDA-ready inquiry forms.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (Obsidian Dark Mode, Deep Tech & Intelligence aesthetic)
- **Math Typesetting**: KaTeX
- **3D Graphics**: Three.js WebGL Engine
- **Icons**: Lucide React
- **Deployment**: Vercel (Configured for single-page routing & CDN asset caching)

---

## Local Development

```bash
# Install dependencies
npm install

# Start local development server (port 5173)
npm run dev

# Build production bundle
npm run build
```

---

## Production Deployment to Vercel & donniebugden.com

This project is configured with `vercel.json` for zero-configuration continuous deployment.

1. Push to GitHub (`Coolgrey6/donniebugden-math` or your preferred repo name).
2. Connect the repository in your [Vercel Dashboard](https://vercel.com/new).
3. In Vercel Project Settings $\to$ **Domains**, add `donniebugden.com` and `www.donniebugden.com`.
4. Point DNS A-records to Vercel's IP (`76.76.21.21`) or CNAME to `cname.vercel-dns.com`.
