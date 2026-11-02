import React, { useEffect, useRef, useMemo, useState } from 'react';
import {
  buildCertificateDataset,
  CERTIFIED_GAP,
  RIGOROUS_TAIL_BOUND,
} from '../../utils/mathCertificate';
import { ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';

export default function ExactArithmeticCertificateViewer({ onOpenResearchNote }) {
  const canvasRef = useRef(null);
  const [depth, setDepth] = useState(4);

  const data = useMemo(() => buildCertificateDataset(depth), [depth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const pad = { l: 52, r: 12, t: 20, b: 32 };
    const plotW = w - pad.l - pad.r;
    const barW = plotW / 240 - 0.5;

    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, w, h);

    const sortedVals = data.sortedIndices.map((i) => data.values[i]);
    const minV = Math.min(...sortedVals);
    const maxV = Math.max(...sortedVals);
    const range = maxV - minV || 1;

    const y = (v) => pad.t + (h - pad.t - pad.b) * (1 - (v - minV) / range);

    const medianY = y(data.median);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.85)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.l, medianY);
    ctx.lineTo(w - pad.r, medianY);
    ctx.stroke();
    ctx.setLineDash([]);

    if (depth === 4 && data.gap > 1e-6) {
      const yLo = y(data.medianLow);
      const yHi = y(data.medianHigh);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fillRect(pad.l, Math.min(yLo, yHi), plotW, Math.abs(yHi - yLo));
    }

    data.sortedIndices.forEach((rootIdx, rank) => {
      const v = data.values[rootIdx];
      const px = pad.l + rank * (plotW / 240);
      const py = y(v);
      const baseY = h - pad.b;
      ctx.fillStyle = data.sigma[rootIdx] === 1 ? '#F59E0B' : '#06B6D4';
      ctx.fillRect(px, py, Math.max(1, barW), baseY - py);
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillText('240 roots (sorted G approx.)', pad.l, h - 10);
  }, [data, depth]);

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-5 border-b border-slate-800/80 bg-slate-900/50 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified · Exact arithmetic (examined projection)
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 tracking-wide">
          Exact-Arithmetic Certificate Viewer
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Depth-<span className="text-slate-200">{depth}</span> truncated Green approximants for the
          240 projected roots in ℚ(√2, √5). Median split:{' '}
          <span className="text-cyan-300">{data.minusCount}/120</span> vs{' '}
          <span className="text-amber-300">{data.plusCount}/120</span> (Σσ = {data.magnetization}).
          Strain or continuum claims are <strong className="text-amber-300/90">not</strong>{' '}
          implied.
          {onOpenResearchNote && (
            <>
              {' '}
              <button
                type="button"
                onClick={onOpenResearchNote}
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
              >
                Open shareable note
              </button>
            </>
          )}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-4">
          <canvas ref={canvasRef} width={720} height={340} className="w-full max-w-[720px] h-[340px]" />
        </div>
        <div className="w-full lg:w-72 p-5 bg-slate-950/90 border-t lg:border-t-0 lg:border-l border-slate-800/80 space-y-4 text-xs font-mono">
          <button
            type="button"
            onClick={() => setDepth((d) => (d === 4 ? 3 : 4))}
            className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2"
          >
            {depth === 4 ? <ToggleRight className="w-4 h-4 text-cyan-400" /> : <ToggleLeft className="w-4 h-4 text-amber-400" />}
            View: depth {depth} {depth === 3 ? '(median tied)' : '(certified gap)'}
          </button>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span>Median gap</span>
              <span className={depth === 4 ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                {data.gap.toFixed(4)}
                {depth === 4 && ` (≈ ${CERTIFIED_GAP})`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tail bound</span>
              <span>{RIGOROUS_TAIL_BOUND.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>Gap &gt; tail bound</span>
              <span className={data.gapExceedsTail ? 'text-emerald-400' : 'text-rose-400'}>
                {data.gapExceedsTail ? 'yes (certified)' : depth === 3 ? 'n/a (tied)' : 'no'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed">
            Cyan: σ = −1 · Amber: σ = +1 · Dashed red: median · Green band: certified gap region
            (depth 4).
          </p>
        </div>
      </div>
    </div>
  );
}
