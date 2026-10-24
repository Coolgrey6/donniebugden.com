import React, { useState } from 'react';
import E8LatticeViewer from './visualizations/E8LatticeViewer';
import JuliaSetExplorer from './visualizations/JuliaSetExplorer';
import TetrahedralFrustrationViewer from './visualizations/TetrahedralFrustrationViewer';
import ErrorBoundary from './ErrorBoundary';
import { Rotate3d, Sparkles, Box, Compass } from 'lucide-react';

export default function VisualizersSection() {
  const [activeTab, setActiveTab] = useState('e8'); // 'e8', 'julia', 'tetrahedral'

  return (
    <section id="visualizers" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Rotate3d className="w-3.5 h-3.5" />
          Interactive WebGL &amp; Mathematical Engines
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-3xl">
          High-Dimensional Dynamical Visualizers
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl font-mono">
          Explore real-time numerical simulations of the 240 E8 roots, quaternionic Julia boundaries, and tetrahedral frustration relaxation.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('e8')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'e8'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rotate3d className="w-4 h-4 text-cyan-400" />
            4D 600-Cell / E8 Root Projection
          </button>

          <button
            onClick={() => setActiveTab('julia')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'julia'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Quaternionic Julia Explorer ∂KC(φ)
          </button>

          <button
            onClick={() => setActiveTab('tetrahedral')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'tetrahedral'
                ? 'bg-sky-950 text-sky-300 border border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-4 h-4 text-sky-400" />
            Tetrahedral Packing Frustration
          </button>
        </div>
      </div>

      {/* Active Visualizer Card with ErrorBoundary */}
      <div className="w-full">
        <ErrorBoundary>
          {activeTab === 'e8' && <E8LatticeViewer />}
          {activeTab === 'julia' && <JuliaSetExplorer />}
          {activeTab === 'tetrahedral' && <TetrahedralFrustrationViewer />}
        </ErrorBoundary>
      </div>
    </section>
  );
}
