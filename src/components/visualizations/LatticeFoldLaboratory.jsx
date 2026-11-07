import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  FOLD_MODEL,
  comparisonStats,
  describeFold,
  feedbackSeries,
  settleOnce,
} from '../../utils/mathFold';
import MathBlock from '../MathBlock';
import {
  Activity,
  GitMerge,
  Pause,
  Play,
  Rotate3d,
  ShieldCheck,
} from 'lucide-react';

const SCALE = 2.45;

const STATS = comparisonStats();
const RANDOM_SERIES = feedbackSeries(FOLD_MODEL.random);

function sampleGrid(stress, u, v) {
  const { heights, span, segments } = stress;
  const fx = ((u + span) / (2 * span)) * segments;
  const fz = ((v + span) / (2 * span)) * segments;
  const x0 = Math.max(0, Math.min(segments - 1, Math.floor(fx)));
  const z0 = Math.max(0, Math.min(segments - 1, Math.floor(fz)));
  const tx = Math.max(0, Math.min(1, fx - x0));
  const tz = Math.max(0, Math.min(1, fz - z0));
  const width = segments + 1;
  const h00 = heights[z0 * width + x0];
  const h10 = heights[z0 * width + x0 + 1];
  const h01 = heights[(z0 + 1) * width + x0];
  const h11 = heights[(z0 + 1) * width + x0 + 1];
  return h00 * (1 - tx) * (1 - tz) + h10 * tx * (1 - tz) + h01 * (1 - tx) * tz + h11 * tx * tz;
}

function displayHeight(raw, span, x, z, fold) {
  const bowl = 0.18 * Math.exp(-(x * x + z * z) / (span * span * 0.62));
  const bump = Math.tanh(raw / 9) * 1.05 * fold;
  return { y: bowl + bump, bowl, bump };
}

function FeedbackChart({ series, step }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || 640;
    const height = 148;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const left = 36;
    const right = 12;
    const top = 16;
    const bottom = 28;
    const plotW = width - left - right;
    const plotH = height - top - bottom;
    const maxCoupling = 1;

    const xAt = (index) => left + ((index + 0.5) / 14) * plotW;
    const yAt = (value) => top + (1 - value / maxCoupling) * plotH;

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, top + plotH);
    ctx.lineTo(left + plotW, top + plotH);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '10px ui-monospace, monospace';
    ctx.textAlign = 'right';
    ctx.fillText('1', left - 6, yAt(1) + 3);
    ctx.fillText('0', left - 6, yAt(0) + 3);
    ctx.textAlign = 'center';
    for (let n = 0; n < 14; n++) {
      ctx.fillStyle = n === step ? '#6ee7b7' : '#64748b';
      ctx.fillText(String(n), xAt(n), height - 8);
    }

    const barW = plotW / 14 * 0.55;
    series.forEach((point, index) => {
      const magnitude = Math.abs(point.feedback);
      const x = xAt(index) - barW / 2;
      const y = yAt(magnitude);
      ctx.fillStyle = index === step ? 'rgba(52, 211, 153, 0.95)' : 'rgba(16, 185, 129, 0.45)';
      ctx.fillRect(x, y, barW, top + plotH - y);
    });

    const drawLine = (points, color) => {
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xAt(index);
        const y = yAt(point.coupling);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };
    drawLine(RANDOM_SERIES, 'rgba(251, 191, 36, 0.9)');

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('n', left + plotW - 8, height - 8);
  }, [series, step]);

  return <canvas ref={ref} className="w-full h-[148px]" />;
}

export default function LatticeFoldLaboratory() {
  const mountRef = useRef(null);
  const [step, setStep] = useState(7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [coupled, setCoupled] = useState(true);
  const [manualFold, setManualFold] = useState(0.35);
  const [parityMode, setParityMode] = useState('antiphase');
  const [signs, setSigns] = useState(FOLD_MODEL.antiphase);
  const [settling, setSettling] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selected, setSelected] = useState(null);

  const autoRotateRef = useRef(true);
  autoRotateRef.current = autoRotate;

  const view = useMemo(() => describeFold(step, signs), [step, signs]);
  const series = useMemo(() => feedbackSeries(signs), [signs]);
  const fold = coupled ? (8 - view.dimension) / 7 : manualFold;

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 14);
    }, 1100);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const signsRefLive = useRef(signs);
  signsRefLive.current = signs;

  useEffect(() => {
    if (!settling) return undefined;
    const timer = setInterval(() => {
      const first = settleOnce(signsRefLive.current, FOLD_MODEL.partner);
      if (!first) {
        setSettling(false);
        setParityMode('antiphase');
        setSigns(FOLD_MODEL.antiphase);
        return;
      }
      const second = settleOnce(first, FOLD_MODEL.partner);
      if (!second) {
        setSettling(false);
        setParityMode('antiphase');
        setSigns(first);
        return;
      }
      setSigns(second);
    }, 70);
    return () => clearInterval(timer);
  }, [settling]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090d16, 0.045);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    const viewState = { yaw: 0.62, pitch: 0.48, dist: 9.4 };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.PointLight(0x67e8f9, 8, 30);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.PointLight(0xfbbf24, 5, 26);
    fill.position.set(-5, 2, -4);
    scene.add(fill);

    const sphere = new THREE.SphereGeometry(0.072, 16, 12);
    const points = new THREE.InstancedMesh(
      sphere,
      new THREE.MeshStandardMaterial({ roughness: 0.32, metalness: 0.55 }),
      240
    );
    scene.add(points);

    const segments = view.stress.segments;
    const gridCount = (segments + 1) * (segments + 1);
    const planePositions = new Float32Array(gridCount * 3);
    const planeColors = new Float32Array(gridCount * 3);
    const indices = [];
    for (let row = 0; row < segments; row++) {
      for (let col = 0; col < segments; col++) {
        const a = row * (segments + 1) + col;
        indices.push(a, a + 1, a + segments + 1, a + 1, a + segments + 2, a + segments + 1);
      }
    }
    const planeGeo = new THREE.BufferGeometry();
    planeGeo.setAttribute('position', new THREE.BufferAttribute(planePositions, 3));
    planeGeo.setAttribute('color', new THREE.BufferAttribute(planeColors, 3));
    planeGeo.setIndex(indices);
    const plane = new THREE.Mesh(
      planeGeo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.62,
        metalness: 0.08,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
      })
    );
    scene.add(plane);

    const linePositions = new Float32Array(240 * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x99f6e4, transparent: true, opacity: 0.28 })
    );
    scene.add(lines);

    const marker = new THREE.Mesh(
      new THREE.RingGeometry(0.12, 0.16, 24),
      new THREE.MeshBasicMaterial({ color: 0xf8fafc, side: THREE.DoubleSide })
    );
    marker.rotation.x = -Math.PI / 2;
    marker.visible = false;
    scene.add(marker);

    const dummy = new THREE.Object3D();
    const cyan = new THREE.Color('#22d3ee');
    const amber = new THREE.Color('#fbbf24');
    const targetPoints = new Float32Array(240 * 3);
    const currentPoints = new Float32Array(240 * 3);
    const targetPlane = new Float32Array(gridCount * 3);
    const currentPlane = new Float32Array(gridCount * 3);
    const targetColor = new Float32Array(gridCount * 3);
    const currentColor = new Float32Array(gridCount * 3);
    let seeded = false;

    const place = (nextView, nextFold, nextSelected) => {
      const { higher, folded, stress } = nextView;
      const span = stress.span;
      for (let i = 0; i < 240; i++) {
        const high = higher[i];
        const low = folded[i];
        const u = high.u * (1 - nextFold) + low.u * nextFold;
        const v = high.v * (1 - nextFold) + low.v * nextFold;
        const raw = sampleGrid(stress, low.u, low.v);
        const foot = displayHeight(raw, span, low.u, low.v, nextFold);
        const y = high.lift * SCALE * (1 - nextFold) + foot.y * nextFold;
        targetPoints[i * 3] = u * SCALE;
        targetPoints[i * 3 + 1] = y;
        targetPoints[i * 3 + 2] = v * SCALE;
        linePositions[i * 6] = high.u * SCALE;
        linePositions[i * 6 + 1] = high.lift * SCALE;
        linePositions[i * 6 + 2] = high.v * SCALE;
        linePositions[i * 6 + 3] = low.u * SCALE;
        linePositions[i * 6 + 4] = foot.y;
        linePositions[i * 6 + 5] = low.v * SCALE;
        const color = (signsRef.current[i] < 0 ? cyan : amber).clone();
        const emphasis = nextSelected === i || (nextSelected != null && FOLD_MODEL.partner[nextSelected] === i) ? 1 : 0.85;
        color.multiplyScalar(emphasis);
        points.setColorAt(i, color);
      }
      points.instanceColor.needsUpdate = true;
      lineGeo.attributes.position.needsUpdate = true;
      lines.material.opacity = 0.34 * Math.sin(Math.PI * nextFold);

      for (let row = 0; row <= segments; row++) {
        for (let col = 0; col <= segments; col++) {
          const index = row * (segments + 1) + col;
          const x = -span + (2 * span * col) / segments;
          const z = -span + (2 * span * row) / segments;
          const raw = stress.heights[index];
          const foot = displayHeight(raw, span, x, z, nextFold);
          targetPlane[index * 3] = x * SCALE;
          targetPlane[index * 3 + 1] = foot.y;
          targetPlane[index * 3 + 2] = z * SCALE;
          const t = Math.min(1, foot.bump / 1.5);
          targetColor[index * 3] = 0.05 + 0.72 * t;
          targetColor[index * 3 + 1] = 0.32 + 0.18 * (1 - t);
          targetColor[index * 3 + 2] = 0.28 * (1 - t) + 0.1;
        }
      }

      if (!seeded) {
        currentPoints.set(targetPoints);
        currentPlane.set(targetPlane);
        currentColor.set(targetColor);
        seeded = true;
      }
    };

    const signsRef = { current: signs };
    const selectedRef = { current: null };
    const api = {
      place,
      signsRef,
      selectedRef,
      viewState,
      points,
      planePositions,
      planeColors,
      planeGeo,
      currentPoints,
      targetPoints,
      currentPlane,
      targetPlane,
      currentColor,
      targetColor,
      marker,
      dummy,
    };
    container.__foldApi = api;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 560;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const onPointerDown = (event) => {
      dragging = true;
      moved = false;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      viewState.yaw += dx * 0.007;
      viewState.pitch = Math.max(-0.2, Math.min(1.15, viewState.pitch + dy * 0.005));
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = () => {
      if (dragging && !moved) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((lastX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((lastY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObject(points);
        const id = hits[0]?.instanceId;
        setSelected(id == null ? null : id);
      }
      dragging = false;
    };
    const onWheel = (event) => {
      event.preventDefault();
      viewState.dist = Math.max(4.5, Math.min(16, viewState.dist + event.deltaY * 0.008));
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

    let frameId = 0;
    const tick = () => {
      if (autoRotateRef.current && !dragging) viewState.yaw += 0.0024;
      const cp = Math.cos(viewState.pitch);
      camera.position.set(
        viewState.dist * Math.sin(viewState.yaw) * cp,
        viewState.dist * Math.sin(viewState.pitch) + 0.4,
        viewState.dist * Math.cos(viewState.yaw) * cp
      );
      camera.lookAt(0, 0.15, 0);

      for (let i = 0; i < currentPoints.length; i++) {
        currentPoints[i] += (targetPoints[i] - currentPoints[i]) * 0.16;
      }
      for (let i = 0; i < currentPlane.length; i++) {
        currentPlane[i] += (targetPlane[i] - currentPlane[i]) * 0.16;
        currentColor[i] += (targetColor[i] - currentColor[i]) * 0.16;
      }
      for (let i = 0; i < 240; i++) {
        dummy.position.set(currentPoints[i * 3], currentPoints[i * 3 + 1], currentPoints[i * 3 + 2]);
        const picked = selectedRef.current === i;
        dummy.scale.setScalar(picked ? 1.85 : 1);
        dummy.updateMatrix();
        points.setMatrixAt(i, dummy.matrix);
        if (picked) {
          marker.visible = true;
          marker.position.set(dummy.position.x, dummy.position.y + 0.02, dummy.position.z);
        }
      }
      if (selectedRef.current == null) marker.visible = false;
      points.instanceMatrix.needsUpdate = true;
      planePositions.set(currentPlane);
      planeColors.set(currentColor);
      planeGeo.attributes.position.needsUpdate = true;
      planeGeo.attributes.color.needsUpdate = true;
      planeGeo.computeVertexNormals();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      sphere.dispose();
      planeGeo.dispose();
      lineGeo.dispose();
      marker.geometry.dispose();
      points.material.dispose();
      plane.material.dispose();
      lines.material.dispose();
      marker.material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      delete container.__foldApi;
    };
    // Scene is created once. Later updates go through the API on the container.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const api = mountRef.current?.__foldApi;
    if (!api) return;
    api.signsRef.current = signs;
    api.selectedRef.current = selected;
    api.place(view, fold, selected);
  }, [view, fold, signs, selected]);

  const chooseParity = (mode) => {
    setSettling(false);
    setParityMode(mode);
    setSigns(mode === 'random' ? FOLD_MODEL.random : FOLD_MODEL.antiphase);
    setSelected(null);
  };

  const phaseLabel = view.phase === 'apex' ? 'Apex' : view.phase === 'ascent' ? 'Ascent' : 'Descent';
  const selectedRoot = selected == null ? null : {
    index: selected,
    partner: FOLD_MODEL.partner[selected],
    sign: signs[selected],
    residual: view.residuals[selected],
    coords: FOLD_MODEL.roots[selected],
  };

  return (
    <section id="simulation-iii" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80 scroll-mt-28">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-4">
          <GitMerge className="w-3.5 h-3.5" />
          Interactive folding laboratory
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl">
          Lattice Folding Operator &amp; Set C Footprints
        </h2>
        <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          A real-time reading of <MathBlock math="\pi_x(L_{E_8}\otimes D_{\mathrm{parity}})\rightarrow M_{\mathrm{phys}}" />.
          All 240 roots of norm <MathBlock math="\sqrt{2}" /> are projected through the active window <MathBlock math="D(n)" />.
          What survives on the manifold is a footprint, not the root. The deficit and the twist are carried through unchanged.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-emerald-900/40 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="relative min-h-[520px] bg-[#070b14]" ref={mountRef}>
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 pointer-events-none">
              <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-sm">
                <div className="text-emerald-300 font-bold tracking-wide">
                  n = {step} · D = {view.dimension} · {phaseLabel}
                </div>
                <div className="text-slate-500 mt-0.5">
                  Drag to orbit · scroll to zoom · click a root
                </div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 inline-block" />
                  Left chiral, σ = −1
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-300 inline-block" />
                  Right chiral, σ = +1
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-rose-400 inline-block" />
                  Uncancelled twist
                </div>
              </div>
            </div>

            {selectedRoot && (
              <div className="absolute bottom-4 left-4 max-w-sm p-3 rounded-xl bg-slate-950/90 border border-slate-700 text-[11px] font-mono text-slate-300 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-slate-100 font-bold">Root {selectedRoot.index}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-slate-500 hover:text-slate-200 pointer-events-auto"
                  >
                    Clear
                  </button>
                </div>
                <div className={selectedRoot.sign < 0 ? 'text-cyan-300' : 'text-amber-300'}>
                  {selectedRoot.sign < 0 ? 'Left' : 'Right'} · mate {selectedRoot.partner} · residual {selectedRoot.residual.toFixed(3)}°
                </div>
                <div className="text-slate-500 mt-1 break-all">
                  ({selectedRoot.coords.map((value) => (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1))).join(', ')})
                </div>
              </div>
            )}
          </div>

          <aside className="border-t xl:border-t-0 xl:border-l border-slate-800 p-5 space-y-4 font-mono text-xs bg-slate-950/50">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Carried through the fold</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Metric label="Roots" value="240" detail={view.normError === 0 ? 'norm √2 exact' : `norm error ${view.normError.toExponential(1)}`} />
              <Metric label="Chiral split" value={`${view.left}:${view.right}`} detail="Preserved" />
              <Metric label="Deficit δ" value={`${view.deficit.toFixed(3)}°`} detail="Unchanged" />
              <Metric label="Twist |Δθ|" value={`${view.twist.toFixed(3)}°`} detail="Signs ±δ/5" />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Active coordinates</span>
                <span>weight outside window φ^−{8 - view.dimension}</span>
              </div>
              <div className="grid grid-cols-8 gap-1">
                {view.active.map((open, index) => (
                  <div
                    key={index}
                    className={`h-8 rounded-md border text-[10px] flex items-center justify-center ${
                      open
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    x{index + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Mean residual twist</span>
                <span className={view.meanResidual < 0.05 ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                  {view.meanResidual.toFixed(3)}°
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Feedback F</span>
                <span className="text-cyan-300 font-bold">{view.feedback.toFixed(3)}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${Math.max(0, 1 - view.psi) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Anti-phase pairs cancel the twist, so the restoring term sits at the attractor.
                Random signs leave a mean residual of {STATS.randomMean.toFixed(3)}°. The deficit bowl stays either way: δ is not closed.
              </p>
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5 border-t border-slate-800 bg-slate-950/70 font-mono text-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Clock n = {step}
              </span>
              <button
                type="button"
                onClick={() => setIsPlaying((value) => !value)}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold ${
                  isPlaying
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'Pause' : 'Run period'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="13"
              value={step}
              onChange={(event) => setStep(parseInt(event.target.value, 10))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 · 1D</span>
              <span>7 · 8D apex</span>
              <span>13 · 2D</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold">Fold depth {(fold * 100).toFixed(0)}%</span>
              <button
                type="button"
                onClick={() => setCoupled((value) => !value)}
                className={`px-3 py-1 rounded-lg font-bold ${
                  coupled
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-900 text-slate-400 border border-slate-700'
                }`}
              >
                {coupled ? 'Coupled to D(n)' : 'Manual'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={fold}
              disabled={coupled}
              onChange={(event) => setManualFold(parseFloat(event.target.value))}
              className="w-full accent-cyan-400 cursor-pointer disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Higher structure</span>
              <span className="text-cyan-300">Footprints on M_phys</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-300 font-bold block">Parity assignment</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => chooseParity('antiphase')}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  parityMode === 'antiphase' && !settling
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Anti-phase
              </button>
              <button
                type="button"
                onClick={() => chooseParity('random')}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  parityMode === 'random' && !settling
                    ? 'bg-amber-950 text-amber-200 border border-amber-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Random signs
              </button>
              <button
                type="button"
                disabled={settling || view.meanResidual < 0.05}
                onClick={() => {
                  if (view.meanResidual < 0.05) return;
                  setParityMode('settling');
                  setSettling(true);
                }}
                className="px-3 py-1.5 rounded-lg font-bold bg-emerald-500 text-slate-950 disabled:opacity-40"
              >
                {settling ? 'Settling…' : 'Run feedback'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setAutoRotate((value) => !value)}
              className={`px-3 py-1.5 rounded-lg border inline-flex items-center gap-2 ${
                autoRotate
                  ? 'bg-slate-900 text-emerald-300 border-emerald-800'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              {autoRotate ? 'Auto-rotate on' : 'Auto-rotate off'}
            </button>
          </div>
        </div>

        <div className="px-5 pb-5 bg-slate-950/70">
          <div className="flex flex-wrap items-end justify-between gap-2 mb-1">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Restoring term over one period
              </div>
              <div className="text-sm font-semibold text-slate-200">
                |F(n)| for the current signs, with the clock coupling drawn on top
              </div>
            </div>
            <div className="flex gap-3 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1"><i className="w-3 h-2 bg-emerald-400 inline-block" /> |F|</span>
              <span className="flex items-center gap-1"><i className="w-3 h-0.5 bg-amber-300 inline-block" /> coupling, random signs</span>
            </div>
          </div>
          <FeedbackChart series={series} step={step} />
          <p className="text-[10px] font-mono text-slate-500 leading-relaxed">
            Vertical axis is dimensionless. Bars are the magnitude of F = −φ^−|D−4| Ψ, where Ψ is the fraction of the twist left uncancelled.
            The amber line is the coupling itself, which peaks on the 4-dimensional bounds n = 3 and n = 11. Anti-phase drives Ψ, and therefore every bar, to zero. δ stays at {STATS.deficit.toFixed(3)}°.
          </p>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-2">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-sm font-bold text-slate-100">{value}</div>
      <div className="text-[10px] text-slate-500">{detail}</div>
    </div>
  );
}
