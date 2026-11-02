import React, { useEffect, useRef, useMemo, useState } from 'react';
import MathBlock from '../MathBlock';
import { getDimensionAtStep } from '../../utils/mathODT';
import {
  combinedModulationAmplitude,
  pureModulationAmplitude,
  swingRatio,
} from '../../utils/mathSigmaFourier';
import { Activity, Play, Pause, Compass } from 'lucide-react';

const PERIODS = 2;
const STEPS = 14 * PERIODS;

export default function ODTAmplitudeModulationViewer() {
  const canvasRef = useRef(null);
  const [nScrub, setNScrub] = useState(7);
  const [k2OverM2, setK2OverM2] = useState(2.0);
  const [animating, setAnimating] = useState(false);

  const series = useMemo(() => {
    const rows = [];
    for (let n = 0; n < STEPS; n++) {
      const d = getDimensionAtStep(n);
      rows.push({
        n,
        d,
        pure: pureModulationAmplitude(d),
        combined: combinedModulationAmplitude(d, k2OverM2),
      });
    }
    return rows;
  }, [k2OverM2]);

  const pureSwing = useMemo(() => swingRatio(series.map((r) => r.pure)), [series]);
  const combinedSwing = useMemo(
    () => swingRatio(series.map((r) => r.combined)),
    [series]
  );

  useEffect(() => {
    if (!animating) return undefined;
    const id = setInterval(() => {
      setNScrub((prev) => (prev + 1) % STEPS);
    }, 450);
    return () => clearInterval(id);
  }, [animating]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const pad = { l: 48, r: 16, t: 24, b: 36 };
    const plotW = w - pad.l - pad.r;
    const plotH = h - pad.t - pad.b;

    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, w, h);

    const maxY = Math.max(...series.map((r) => r.pure), 8.5);
    const x = (i) => pad.l + (i / (STEPS - 1)) * plotW;
    const y = (v) => pad.t + plotH - (v / maxY) * plotH;

    ctx.strokeStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const gy = pad.t + (g / 4) * plotH;
      ctx.beginPath();
      ctx.moveTo(pad.l, gy);
      ctx.lineTo(w - pad.r, gy);
      ctx.stroke();
    }

    const drawLine = (key, color, dash = []) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash(dash);
      ctx.beginPath();
      series.forEach((row, i) => {
        const px = x(i);
        const py = y(row[key]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    };

    drawLine('pure', 'rgba(245, 158, 11, 0.95)');
    drawLine('combined', 'rgba(6, 182, 212, 0.95)', [6, 4]);

    const scrubX = x(nScrub);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.9)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(scrubX, pad.t);
    ctx.lineTo(scrubX, h - pad.b);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillText('n', w - pad.r - 8, h - 8);
    ctx.save();
    ctx.translate(14, pad.t + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('amplitude (arb.)', 0, 0);
    ctx.restore();
  }, [series, nScrub]);

  const current = series[nScrub];

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/50 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60">
              Exploratory · Theory II operator
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 tracking-wide">
            ODT Operator &amp; Amplitude Modulation
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Periodic triangular operator{' '}
            <MathBlock math="D(n) = 8 - |(n \bmod 14) - 7|" /> with pure modulation ∝{' '}
            <MathBlock math="D(n)" /> versus combined form ∝{' '}
            <MathBlock math="D(n)/(k^2 + m^2 D(n))" />. Physical / gravitational readings are{' '}
            <strong className="text-amber-300/90">not established</strong>—visualization only.
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-400 space-y-1 shrink-0">
          <div>
            Pure swing (max/min):{' '}
            <span className="text-amber-400 font-bold">×{pureSwing.toFixed(2)}</span>{' '}
            <span className="text-slate-500">(factor ≈ 8 over D ∈ [1,8])</span>
          </div>
          <div>
            Combined swing:{' '}
            <span className="text-cyan-400 font-bold">×{combinedSwing.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-4 bg-slate-950/40">
          <canvas ref={canvasRef} width={640} height={320} className="w-full max-w-[640px] h-[320px]" />
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-400" /> Pure ∝ D(n)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400 border-dashed border-t border-cyan-400" /> Combined
            </span>
          </div>
        </div>

        <div className="w-full lg:w-80 p-5 bg-slate-950/90 border-t lg:border-t-0 lg:border-l border-slate-800/80 space-y-4 text-xs font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-400" /> Step n
              </span>
              <span className="text-amber-300">{nScrub}</span>
            </div>
            <input
              type="range"
              min={0}
              max={STEPS - 1}
              value={nScrub}
              onChange={(e) => setNScrub(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded accent-amber-400"
            />
            <button
              type="button"
              onClick={() => setAnimating((a) => !a)}
              className="mt-2 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2"
            >
              {animating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {animating ? 'Pause oscillation' : 'Animate n (2 periods)'}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Ratio k²/m²</span>
              <span className="text-cyan-400">{k2OverM2.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.25}
              max={8}
              step={0.25}
              value={k2OverM2}
              onChange={(e) => setK2OverM2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded accent-cyan-400"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>D(n)</span>
              <span className="text-slate-100">{current.d}</span>
            </div>
            <div className="flex justify-between">
              <span>Pure amp.</span>
              <span className="text-amber-400">{current.pure.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>Combined amp.</span>
              <span className="text-cyan-400">{current.combined.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
