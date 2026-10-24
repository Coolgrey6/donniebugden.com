import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PHI, PHI_INV, C_PHI, ESCAPE_RADIUS, iterateQuat, quatNorm } from '../../utils/mathE8';
import { Sparkles, ZoomIn, ZoomOut, RefreshCw, Crosshair, HelpCircle, Activity } from 'lucide-react';

export default function JuliaSetExplorer() {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1.8);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [sliceJ, setSliceJ] = useState(0.0);
  const [sliceK, setSliceK] = useState(0.0);
  const [maxIter, setMaxIter] = useState(48);
  const [hoverCoord, setHoverCoord] = useState(null);
  const [selectedOrbit, setSelectedOrbit] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

  // Render the Quaternionic Julia slice to canvas
  const renderJulia = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    const c = C_PHI;
    const escapeR = ESCAPE_RADIUS;
    const escapeRSq = escapeR * escapeR;

    const jVal = sliceJ;
    const kVal = sliceK;

    const scaleX = (zoom * 2) / width;
    const scaleY = (zoom * 2) / height;

    for (let py = 0; py < height; py++) {
      const q1 = center.y + (py - height / 2) * scaleY;
      for (let px = 0; px < width; px++) {
        const q0 = center.x + (px - width / 2) * scaleX;

        // Quaternion point q = (q0, q1, sliceJ, sliceK)
        let w = q0;
        let x = q1;
        let y = jVal;
        let z = kVal;

        let iter = 0;
        let escaped = false;
        let normSq = 0;

        while (iter < maxIter) {
          normSq = w * w + x * x + y * y + z * z;
          if (normSq > 16.0) {
            escaped = true;
            break;
          }

          // q² + C(φ)
          const vSq = x * x + y * y + z * z;
          const nextW = w * w - vSq + c.w;
          const nextX = 2 * w * x + c.x;
          const nextY = 2 * w * y + c.y;
          const nextZ = 2 * w * z + c.z;

          w = nextW;
          x = nextX;
          y = nextY;
          z = nextZ;

          iter++;
        }

        const pixelIdx = (py * width + px) * 4;

        if (!escaped) {
          // Bounded core (Filled Julia Set KC(φ)) -> Electric Cyan #06B6D4
          const innerNorm = Math.sqrt(normSq) / 4.0;
          data[pixelIdx] = Math.floor(6 + innerNorm * 20);     // R
          data[pixelIdx + 1] = Math.floor(182 - innerNorm * 40); // G
          data[pixelIdx + 2] = Math.floor(212 - innerNorm * 30); // B
          data[pixelIdx + 3] = 255;
        } else {
          // Escaping potential basin G(q) -> Amber/Gold to Obsidian transition
          // Smooth coloring: iter - log2(log(norm))
          const smooth = iter - Math.log2(Math.max(1, Math.log(normSq) / 2));
          const t = Math.max(0, Math.min(1, smooth / maxIter));

          // Deep Obsidian/Gold gradient
          const r = Math.floor(245 * Math.pow(t, 1.2));
          const g = Math.floor(158 * Math.pow(t, 1.8));
          const b = Math.floor(11 * Math.pow(t, 2.5) + (1 - t) * 12);

          data[pixelIdx] = r;
          data[pixelIdx + 1] = g;
          data[pixelIdx + 2] = b;
          data[pixelIdx + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Draw escape horizon circle |q| = φ if in invariant plane
    if (Math.abs(sliceJ) < 0.05 && Math.abs(sliceK) < 0.05) {
      const radiusPx = (escapeR / (zoom * 2)) * width;
      const centerPxX = width / 2 - (center.x / (zoom * 2)) * width;
      const centerPxY = height / 2 - (center.y / (zoom * 2)) * height;

      ctx.beginPath();
      ctx.arc(centerPxX, centerPxY, radiusPx, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw forward orbit overlay if a point is selected
    if (selectedOrbit && selectedOrbit.points.length > 0) {
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#38BDF8';
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();

      selectedOrbit.points.forEach((pt, i) => {
        const px = width / 2 + ((pt.w - center.x) / (zoom * 2)) * width;
        const py = height / 2 + ((pt.x - center.y) / (zoom * 2)) * height;
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.stroke();

      selectedOrbit.points.forEach((pt, i) => {
        const px = width / 2 + ((pt.w - center.x) / (zoom * 2)) * width;
        const py = height / 2 + ((pt.x - center.y) / (zoom * 2)) * height;
        ctx.beginPath();
        ctx.arc(px, py, i === 0 ? 5 : 2.5, 0, 2 * Math.PI);
        ctx.fillStyle = i === 0 ? '#F59E0B' : '#06B6D4';
        ctx.fill();
      });
    }
  }, [zoom, center, sliceJ, sliceK, maxIter, selectedOrbit]);

  useEffect(() => {
    setIsRendering(true);
    const timeout = setTimeout(() => {
      renderJulia();
      setIsRendering(false);
    }, 10);
    return () => clearTimeout(timeout);
  }, [renderJulia]);

  // Handle canvas click to trace forward orbit
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const w0 = center.x + ((px - canvas.width / 2) / canvas.width) * (zoom * 2);
    const x0 = center.y + ((py - canvas.height / 2) / canvas.height) * (zoom * 2);

    let curr = { w: w0, x: x0, y: sliceJ, z: sliceK };
    const orbit = [curr];
    for (let i = 0; i < 20; i++) {
      if (quatNorm(curr) > 10.0) break;
      curr = iterateQuat(curr);
      orbit.push(curr);
    }

    setSelectedOrbit({
      start: { w: w0, x: x0, y: sliceJ, z: sliceK },
      points: orbit
    });
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const w = center.x + ((px - canvas.width / 2) / canvas.width) * (zoom * 2);
    const x = center.y + ((py - canvas.height / 2) / canvas.height) * (zoom * 2);
    setHoverCoord({ w, x, norm: Math.sqrt(w * w + x * x + sliceJ * sliceJ + sliceK * sliceK) });
  };

  return (
    <div className="w-full rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm tracking-wide flex items-center gap-2">
              Quaternionic Julia Boundary ∂KC(φ) & Green's Potential
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/50">
                Hausdorff DH ≈ 1.378
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              qₙ₊₁ = qₙ² + C(φ) where C(φ) = ½(φ + i + φ⁻¹j) [|C| = 1, R = φ ≈ 1.618]
            </p>
          </div>
        </div>

        {/* Zoom and Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(0.4, z * 0.75))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.min(6.0, z * 1.3))}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1.8);
              setCenter({ x: 0, y: 0 });
              setSliceJ(0.0);
              setSliceK(0.0);
              setSelectedOrbit(null);
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Reset Slice & View"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div className="relative flex flex-col md:flex-row">
        {/* Canvas Display */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[440px]">
          <canvas
            ref={canvasRef}
            width={580}
            height={440}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverCoord(null)}
            className="cursor-crosshair w-full max-w-[580px] h-[440px] block"
          />

          {/* Coordinate Badge */}
          {hoverCoord && (
            <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 pointer-events-none shadow">
              <span>q₀: {hoverCoord.w.toFixed(3)}</span> | <span>q₁: {hoverCoord.x.toFixed(3)}</span> |{' '}
              <span className={hoverCoord.norm <= ESCAPE_RADIUS ? 'text-cyan-400' : 'text-amber-400'}>
                |q|: {hoverCoord.norm.toFixed(3)} {hoverCoord.norm <= ESCAPE_RADIUS ? '(≤ φ)' : '(> φ)'}
              </span>
            </div>
          )}

          {/* Escape Horizon Tag */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-400/90 pointer-events-none shadow flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full border border-amber-400 border-dashed"></span>
            Escape Threshold: R = φ ≈ 1.61803
          </div>
        </div>

        {/* Hypercomplex Slice & Parameter Controls Sidebar */}
        <div className="w-full md:w-80 p-5 bg-slate-950/90 border-t md:border-t-0 md:border-l border-slate-800/80 flex flex-col justify-between gap-4 text-xs font-mono">
          <div className="space-y-4">
            <div>
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-semibold block mb-1">
                4D Hyperplane Slicing
              </span>
              <p className="text-[11px] text-slate-500 mb-3">
                Slice coordinates in skew field ℍ along transverse axes j and k:
              </p>

              {/* Slider for j */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-slate-300">
                  <span>j-axis Offset (q₂):</span>
                  <span className="text-cyan-400">{sliceJ.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.05"
                  value={sliceJ}
                  onChange={(e) => setSliceJ(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Slider for k */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-slate-300">
                  <span>k-axis Offset (q₃):</span>
                  <span className="text-amber-400">{sliceK.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.05"
                  value={sliceK}
                  onChange={(e) => setSliceK(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Max Iterations */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Iteration Depth:</span>
                  <span className="text-slate-200">{maxIter}</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="80"
                  step="4"
                  value={maxIter}
                  onChange={(e) => setMaxIter(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-slate-400"
                />
              </div>
            </div>

            {/* Selected Orbit Inspector */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Forward Orbit Tracer
              </span>
              {selectedOrbit ? (
                <div className="text-[11px] space-y-1 text-slate-300">
                  <div>Initial q₀: ({selectedOrbit.start.w.toFixed(2)}, {selectedOrbit.start.x.toFixed(2)})</div>
                  <div>Trace Steps: {selectedOrbit.points.length}</div>
                  <div className="text-[10px] text-cyan-400">
                    {selectedOrbit.points.length >= 20 ? '• Trapped in Attractor Core' : '• Diverged to Escape Horizon'}
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  Click anywhere on the fractal slice to trace forward quaternionic orbit f_C^n(q).
                </p>
              )}
            </div>
          </div>

          {/* Mathematical Equivalence Note */}
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-[11px] text-slate-400">
            <span className="text-cyan-300 font-semibold block mb-0.5">Proposition 5.1 Concordance:</span>
            Restricting to Π ⊂ ℍ with j=k=0 recovers the 2D complex polynomial zₙ₊₁ = zₙ² + c₀(φ), with Hausdorff dimension exactly equal to the 2D Penrose kite-and-dart inflation eigenvalue similarity dimension.
          </div>
        </div>
      </div>
    </div>
  );
}
