import React, { useState } from 'react';
import E8LatticeViewer from './visualizations/E8LatticeViewer';
import JuliaSetExplorer from './visualizations/JuliaSetExplorer';
import TetrahedralFrustrationViewer from './visualizations/TetrahedralFrustrationViewer';
import ODTAmplitudeModulationViewer from './visualizations/ODTAmplitudeModulationViewer';
import ExactArithmeticCertificateViewer from './visualizations/ExactArithmeticCertificateViewer';
import SigmaFourierViewer from './visualizations/SigmaFourierViewer';
import ErrorBoundary from './ErrorBoundary';
import { Rotate3d, Sparkles, Box, Activity, ShieldCheck, BarChart3 } from 'lucide-react';

const TABS = [
  { id: 'e8', label: '4D 600-Cell / E8 Root Projection', short: 'E8 600-Cell', icon: Rotate3d, accent: 'cyan' },
  { id: 'julia', label: 'Quaternionic Julia Explorer ∂KC(φ)', short: 'Julia ∂KC(φ)', icon: Sparkles, accent: 'amber' },
  { id: 'tetrahedral', label: 'Tetrahedral Packing Frustration', short: 'Tetrahedral', icon: Box, accent: 'sky' },
  { id: 'odt-mod', label: 'ODT Operator & Amplitude Modulation', short: 'ODT Modulation', icon: Activity, accent: 'amber' },
  { id: 'certificate', label: 'Exact-Arithmetic Certificate', short: 'Certificate', icon: ShieldCheck, accent: 'emerald' },
  { id: 'fourier', label: 'Fourier Content of σ', short: 'σ Fourier', icon: BarChart3, accent: 'cyan' },
];

function tabClass(active, accent) {
  if (!active) return 'text-slate-400 hover:text-slate-200';
  const map = {
    cyan: 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
    amber: 'bg-amber-950 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    sky: 'bg-sky-950 text-sky-300 border border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.25)]',
    emerald:
      'bg-emerald-950 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
  };
  return map[accent] || map.cyan;
}

export default function VisualizersSection({ onOpenResearchNote }) {
  const [activeTab, setActiveTab] = useState('e8');

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
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl font-mono leading-relaxed">
          Explore the 240 E8 roots, quaternionic Julia boundaries, tetrahedral frustration models,
          exact-arithmetic certification, σ Fourier modes, and exploratory ODT amplitude modulations.
          Verified geometric results are labeled separately from exploratory Theory II overlays.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-mono max-w-5xl">
          {TABS.map(({ id, label, short, icon: Icon, accent }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-3 py-2.5 rounded-xl transition-all flex items-center gap-2 ${tabClass(
                activeTab === id,
                accent
              )}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        <ErrorBoundary>
          {activeTab === 'e8' && <E8LatticeViewer />}
          {activeTab === 'julia' && <JuliaSetExplorer />}
          {activeTab === 'tetrahedral' && <TetrahedralFrustrationViewer />}
          {activeTab === 'odt-mod' && <ODTAmplitudeModulationViewer />}
          {activeTab === 'certificate' && (
            <ExactArithmeticCertificateViewer onOpenResearchNote={onOpenResearchNote} />
          )}
          {activeTab === 'fourier' && <SigmaFourierViewer />}
        </ErrorBoundary>
      </div>
    </section>
  );
}
