import React, { useMemo, useState } from 'react';
import MathBlock from '../MathBlock';
import { computeLeadingSigmaFourierModes, LOW_WAVE_VECTORS } from '../../utils/mathSigmaFourier';
import { BarChart3, CheckCircle2 } from 'lucide-react';

export default function SigmaFourierViewer() {
  const [selectedId, setSelectedId] = useState('100');
  const fourier = useMemo(() => computeLeadingSigmaFourierModes(4), []);
  const maxMag = useMemo(
    () => Math.max(...fourier.modes.filter((m) => m.id !== '000').map((m) => m.magnitude), 0.01),
    [fourier]
  );

  const selected = fourier.modes.find((m) => m.id === selectedId) ?? fourier.modes[1];

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/50 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified harmonic content
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 tracking-wide">
          Fourier Content of the Balanced σ Assignment
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Leading discrete modes <MathBlock math="|\hat{\rho}_\sigma(\mathbf{k})|" /> on the examined
          projection. Vanishing monopole follows from{' '}
          <MathBlock math="\sum_{\alpha}\sigma(\alpha)=0" />. Neighbor strain cancellation and bulk
          interpretations remain <strong className="text-amber-300/90">open</strong>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-5 space-y-4">
          <div className="flex items-end gap-1 h-48 border-b border-slate-800 pb-1">
            {fourier.modes.map((mode) => {
              const hPct =
                mode.id === '000'
                  ? 2
                  : Math.max(4, (mode.magnitude / maxMag) * 100);
              const active = mode.id === selectedId;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedId(mode.id)}
                  className="flex-1 flex flex-col items-center gap-1 group min-w-0"
                  title={mode.label}
                >
                  <span
                    className={`text-[9px] font-mono truncate w-full text-center ${
                      active ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  >
                    {mode.id}
                  </span>
                  <div
                    className={`w-full rounded-t transition-all ${
                      mode.id === '000'
                        ? 'bg-slate-700'
                        : active
                          ? 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.45)]'
                          : 'bg-cyan-900/70 group-hover:bg-cyan-800/80'
                    }`}
                    style={{ height: `${hPct}%` }}
                  />
                  <span className="text-[9px] font-mono text-slate-400">
                    {mode.magnitude.toExponential(2)}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> Click a mode to inspect |ρ̂_σ(k)|
          </p>
        </div>

        <div className="w-full lg:w-80 p-5 bg-slate-950/90 border-t lg:border-t-0 lg:border-l border-slate-800/80 space-y-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 uppercase text-[10px] tracking-wider block mb-2">
              Wave-vector k
            </span>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200"
            >
              {LOW_WAVE_VECTORS.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span>|ρ̂_σ(k)|</span>
              <span className="text-cyan-400 font-bold">{selected.magnitude.toExponential(4)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Re ρ̂</span>
              <span>{selected.re.toExponential(3)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span>Im ρ̂</span>
              <span>{selected.im.toExponential(3)}</span>
            </div>
            {selected.id === '000' && (
              <p className="text-[10px] text-emerald-400/90 pt-1 border-t border-slate-800">
                Monopole ≈ 0 because Σσ = 0 (balanced 120/120 partition).
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
