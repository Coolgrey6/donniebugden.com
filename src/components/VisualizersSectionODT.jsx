import React, { useState } from 'react';
import ODTMetricSimulator from './visualizations/ODTMetricSimulator';
import MathBlock from './MathBlock';
import { 
  Orbit, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Zap,
  TrendingDown,
  Cpu,
  Compass
} from 'lucide-react';

export default function VisualizersSectionODT() {
  const [activeTab, setActiveTab] = useState('3d-engine');

  return (
    <section id="simulation-odt" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Orbit className="w-3.5 h-3.5" />
          Interactive 3D WebGL Simulation Suite
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Dynamic Metric Distortion &amp; ODT Laboratory
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          Interactive real-time numerical simulation modeling the 14-step dimensional oscillator, local Riemann curvature cancellation, and hyper-dimensional momentum shunting across the <MathBlock math="E_8" /> lattice.
        </p>

        {/* Mode Switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('3d-engine')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === '3d-engine'
                ? 'bg-amber-950 text-amber-300 border border-amber-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Orbit className="w-3.5 h-3.5 text-amber-400" />
            3D Metric &amp; Polytope Engine
          </button>
          <button
            onClick={() => setActiveTab('trajectory-curve')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'trajectory-curve'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            14-Step Dimensional Waveform
          </button>
          <button
            onClick={() => setActiveTab('shunting-matrix')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'shunting-matrix'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Inertial Decoupling Analysis
          </button>
        </div>
      </div>

      {/* Tab 1: 3D Engine */}
      {activeTab === '3d-engine' && (
        <ODTMetricSimulator />
      )}

      {/* Tab 2: Trajectory Curve */}
      {activeTab === 'trajectory-curve' && (
        <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Periodic Triangular Operator Dynamics: <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              The continuous dimensional clock deterministically ascends and descends between 1D and 8D, modulating spatial coordinates by <MathBlock math="\phi^{(-1)^n D(n)}" />.
            </p>
          </div>

          {/* 14 Step Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 font-mono text-xs">
            {[
              { n: 0, d: 1, phase: 'Ascent', exp: '+1', color: 'border-cyan-800 text-cyan-400' },
              { n: 1, d: 2, phase: 'Ascent', exp: '-2', color: 'border-cyan-800 text-cyan-400' },
              { n: 2, d: 3, phase: 'Ascent', exp: '+3', color: 'border-cyan-800 text-cyan-400' },
              { n: 3, d: 4, phase: '4D Bound', exp: '-4', color: 'border-sky-700 text-sky-300 font-bold' },
              { n: 4, d: 5, phase: 'Ascent', exp: '+5', color: 'border-cyan-800 text-cyan-400' },
              { n: 5, d: 6, phase: 'Ascent', exp: '-6', color: 'border-cyan-800 text-cyan-400' },
              { n: 6, d: 7, phase: 'Ascent', exp: '+7', color: 'border-cyan-800 text-cyan-400' },
              { n: 7, d: 8, phase: 'Apex (8D)', exp: '-8', color: 'border-amber-600 text-amber-300 font-bold bg-amber-950/40' },
              { n: 8, d: 7, phase: 'Descent', exp: '+7', color: 'border-emerald-800 text-emerald-400' },
              { n: 9, d: 6, phase: 'Descent', exp: '-6', color: 'border-emerald-800 text-emerald-400' },
              { n: 10, d: 5, phase: 'Descent', exp: '+5', color: 'border-emerald-800 text-emerald-400' },
              { n: 11, d: 4, phase: '4D Bound', exp: '-4', color: 'border-emerald-700 text-emerald-300 font-bold' },
              { n: 12, d: 3, phase: 'Descent', exp: '+3', color: 'border-emerald-800 text-emerald-400' },
              { n: 13, d: 2, phase: 'Descent', exp: '-2', color: 'border-emerald-800 text-emerald-400' },
            ].map((item) => (
              <div 
                key={item.n}
                className={`p-3 rounded-xl bg-slate-950/80 border ${item.color} space-y-1.5 flex flex-col justify-between`}
              >
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">n = {item.n}</span>
                  <span className="font-bold">{item.phase}</span>
                </div>
                <div className="text-lg font-bold text-slate-100">{item.d}D</div>
                <div className="text-[10px] text-slate-400">
                  λ = φ<sup>{item.exp}</sup>
                </div>
              </div>
            ))}
          </div>

          {/* Physical Implications Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80 text-xs font-mono">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-cyan-800/50 space-y-2">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">
                Ascent Phase (n = 0 → 6, D = 1 → 7)
              </span>
              <p className="text-slate-300">
                Spatial boundaries scale outward with positive exponent <MathBlock math="\phi^{+D(n)}" />, driving self-similar, scale-invariant cosmological expansion (dark energy inflation) without fine-tuned scalar potential fields.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/40 border border-emerald-800/50 space-y-2">
              <span className="text-emerald-400 font-bold block uppercase tracking-wider">
                Descent Phase (n = 8 → 13, D = 7 → 2)
              </span>
              <p className="text-slate-300">
                Negative scaling factor <MathBlock math="\phi^{-D(n)}" /> inverts localized stress-energy curvature, causing spacetime to flatten and invert (<MathBlock math="m_{\text{eff}} \le 0" />) while 8D entanglement adjacency is compressed into local 3D slices.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Shunting Matrix */}
      {activeTab === 'shunting-matrix' && (
        <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl space-y-8 font-mono text-xs">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight font-sans">
              Hyper-Dimensional Momentum Shunting &amp; Proper Acceleration Elimination
            </h3>
            <p className="text-slate-400">
              Transferring local 3D reaction impulse into closed 8D internal coordinates <MathBlock math="y^a \in \mathbb{R}^4_\perp" /> to achieve genuine inertial decoupling (<MathBlock math="a^\mu_{\text{proper}} = 0" />).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-cyan-300 font-bold block text-sm">1. 8D Geodesic Redirection</span>
              <p className="text-slate-400 leading-relaxed">
                Total 8-momentum is strictly invariant: <MathBlock math="P_A P^A = g_{\mu\nu} p^\mu p^\nu + g_{ab} \Pi^a \Pi^b = -M_0^2 c^2" />. Under <MathBlock math="E_8" /> root rotations, 3-momentum <MathBlock math="p_i" /> is rotated into internal hyper-dimensional momentum <MathBlock math="\Pi_a" />.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-emerald-300 font-bold block text-sm">2. Zero G-Force Interior</span>
              <p className="text-slate-400 leading-relaxed">
                Because proper acceleration <MathBlock math="a^\mu = d^2 x^\mu / d\tau^2 + \Gamma^\mu_{\alpha\beta} u^\alpha u^\beta \to 0" />, vehicle occupants and internal electronics experience zero physiological or structural load during multi-Mach turns.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-amber-300 font-bold block text-sm">3. Non-Contact Field Thrust</span>
              <p className="text-slate-400 leading-relaxed">
                The directional hyper-divergence gradient <MathBlock math="F^\mu = -\nabla_a T^{a\mu}" /> acts as a pure non-contact propellantless field force, completely bypassing the classical Tsiolkovsky rocket equation.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
