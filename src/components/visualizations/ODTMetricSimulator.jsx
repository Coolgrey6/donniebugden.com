import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  getDimensionAtStep, 
  getTrajectoryPhase, 
  getScaleFactor, 
  getEffectiveMassRatio, 
  getGravitationalCouplingRatio,
  getMetricDistortionFactor,
  calculateMomentumShunt,
  PHI 
} from '../../utils/mathODT';
import { 
  Play, 
  Pause, 
  Rotate3d, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Compass, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

export default function ODTMetricSimulator() {
  const mountRef = useRef(null);
  const [step, setStep] = useState(7); // default at apex n=7, D=8
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('combined'); // 'combined', 'metric', 'e8'
  const [modulationDepth, setModulationDepth] = useState(0.85); // xi
  const [autoRotate, setAutoRotate] = useState(true);

  // References for Three.js
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const gridMeshRef = useRef(null);
  const e8NodesGroupRef = useRef(null);
  const shuntVectorsGroupRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseStateRef = useRef({ isDragging: false, prevX: 0, prevY: 0 });

  // Calculated physical telemetry for current step
  const telemetry = useMemo(() => {
    const d = getDimensionAtStep(step);
    const phase = getTrajectoryPhase(step);
    const scale = getScaleFactor(step);
    const massRatio = getEffectiveMassRatio(step);
    const gRatio = getGravitationalCouplingRatio(step);
    const shunt = calculateMomentumShunt(100, step);

    return {
      step,
      d,
      phase,
      scale,
      massRatio,
      gRatio,
      shunt
    };
  }, [step]);

  // Automated clock timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 14);
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 540;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090D16, 0.04);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 9.5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06B6D4, 3, 25);
    cyanLight.position.set(4, 6, 4);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xF59E0B, 3, 25);
    amberLight.position.set(-4, -2, -4);
    scene.add(amberLight);

    // 5. Create Deformable Spacetime Metric Grid
    const gridSize = 12;
    const gridDivisions = 48;
    const planeGeo = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    planeGeo.rotateX(-Math.PI / 2);

    // Vertex colors based on elevation
    const count = planeGeo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      colors[i * 3] = 0.2;     // R
      colors[i * 3 + 1] = 0.6; // G
      colors[i * 3 + 2] = 0.9; // B
    }
    planeGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const planeMat = new THREE.MeshStandardMaterial({
      wireframe: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      roughness: 0.3,
      metalness: 0.8
    });
    const gridMesh = new THREE.Mesh(planeGeo, planeMat);
    gridMeshRef.current = gridMesh;
    scene.add(gridMesh);

    // 6. Create Hyper-Dimensional E8 Polytope / Projection Core Group
    const e8Group = new THREE.Group();
    e8NodesGroupRef.current = e8Group;
    scene.add(e8Group);

    // Central bubble
    const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    e8Group.add(coreMesh);

    // 8 Concentric Ring Guides for Dimensions 1 to 8
    for (let d = 1; d <= 8; d++) {
      const radius = 0.35 * d;
      const ringGeo = new THREE.RingGeometry(radius - 0.015, radius + 0.015, 64);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({
        color: d === 8 ? 0xF59E0B : 0x06B6D4,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      e8Group.add(ring);
    }

    // 240 Representative E8 Root Projection Nodes
    const nodeCount = 60; // Render representative sample of 240
    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });

    for (let i = 0; i < nodeCount; i++) {
      const theta = (i / nodeCount) * Math.PI * 2;
      const phiAngle = Math.acos(2 * (i / nodeCount) - 1);
      const r = 1.2 + 0.8 * Math.sin(i * 1.618);
      
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(
        r * Math.sin(phiAngle) * Math.cos(theta),
        0.5 * Math.cos(phiAngle),
        r * Math.sin(phiAngle) * Math.sin(theta)
      );
      e8Group.add(node);
    }

    // 7. Create Momentum Shunting Vector Group
    const shuntGroup = new THREE.Group();
    shuntVectorsGroupRef.current = shuntGroup;
    scene.add(shuntGroup);

    // Mouse Interaction for 3D Camera Orbit
    const onMouseDown = (e) => {
      mouseStateRef.current.isDragging = true;
      mouseStateRef.current.prevX = e.clientX;
      mouseStateRef.current.prevY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!mouseStateRef.current.isDragging) return;
      const deltaX = e.clientX - mouseStateRef.current.prevX;
      const deltaY = e.clientY - mouseStateRef.current.prevY;
      mouseStateRef.current.prevX = e.clientX;
      mouseStateRef.current.prevY = e.clientY;

      if (sceneRef.current) {
        sceneRef.current.rotation.y += deltaX * 0.008;
        camera.position.y = Math.max(2, Math.min(15, camera.position.y - deltaY * 0.03));
      }
    };

    const onMouseUp = () => {
      mouseStateRef.current.isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      camera.position.z = Math.max(5, Math.min(20, camera.position.z + e.deltaY * 0.01));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let angle = 0;
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      angle += 0.006;
      if (autoRotate && sceneRef.current) {
        sceneRef.current.rotation.y += 0.0025;
      }

      if (e8NodesGroupRef.current) {
        e8NodesGroupRef.current.rotation.y = angle * 0.5;
        e8NodesGroupRef.current.rotation.z = Math.sin(angle * 0.3) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [autoRotate]);

  // Update Geometry and Physics Deformation when step or modulation changes
  useEffect(() => {
    if (!gridMeshRef.current || !e8NodesGroupRef.current) return;

    const grid = gridMeshRef.current;
    const pos = grid.geometry.attributes.position;
    const colors = grid.geometry.attributes.color;
    const d = getDimensionAtStep(step);
    const phase = getTrajectoryPhase(step);
    const massRatio = getEffectiveMassRatio(step);
    const gRatio = getGravitationalCouplingRatio(step);

    // Deform Spacetime Grid Vertices
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const r = Math.sqrt(x * x + z * z);

      // Baseline curvature: in standard gravity, mass causes negative depression (gravity well).
      // Under ODT, descent phase inverts this well into a flat or repulsive anti-gravity hill!
      let y = 0;
      if (r < 5.0) {
        const falloff = Math.exp(-(r * r) / 6.0);
        // Metric distortion modulation
        const distortion = getMetricDistortionFactor(step, r, modulationDepth);
        // Positive mass curves down (-y), negative/reduced mass curves flat or upward (+y)
        y = -2.2 * massRatio * falloff * distortion;
      }
      pos.setY(i, y);

      // Color coding: Cyan = flat/inertial, Amber = apex expansion, Rose/Emerald = anti-gravity inversion
      if (y > 0.1) {
        // Anti-Gravity Repulsion Peak
        colors.setXYZ(i, 0.2, 0.9, 0.5); // Emerald green
      } else if (y < -0.6) {
        // Classical Gravity Well
        colors.setXYZ(i, 0.9, 0.3, 0.4); // Rose red
      } else if (phase === 'apex') {
        // High-entropy Apex
        colors.setXYZ(i, 0.96, 0.62, 0.04); // Amber
      } else {
        // Flat Spacetime / Shielded Metric
        colors.setXYZ(i, 0.05, 0.75, 0.95); // Cyan
      }
    }
    pos.needsUpdate = true;
    colors.needsUpdate = true;

    // Scale E8 Core Group based on Active Dimension D(n) and Golden Ratio
    const scaleFactor = 0.5 + 0.12 * d;
    e8NodesGroupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Visibility toggles based on viewMode
    grid.visible = viewMode === 'combined' || viewMode === 'metric';
    e8NodesGroupRef.current.visible = viewMode === 'combined' || viewMode === 'e8';
  }, [step, modulationDepth, viewMode]);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative space-y-6">
      {/* Top Header & Telemetry Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono mb-1">
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-bold">
              ODT 3D METRIC DISTORTION SIMULATOR
            </span>
            <span className="text-slate-400">• Discrete Dimensional Clock: n = {step} / 13</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            14-Phase Spacetime Metric Curvature &amp; Inertial Decoupling Engine
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Visualizing localized spacetime cancellation, golden-ratio modulation, and 8D momentum redirection.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('combined')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'combined'
                ? 'bg-amber-950 text-amber-300 border border-amber-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Combined System
          </button>
          <button
            onClick={() => setViewMode('metric')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'metric'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spacetime Metric
          </button>
          <button
            onClick={() => setViewMode('e8')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'e8'
                ? 'bg-sky-950 text-sky-300 border border-sky-600/50 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            E8 Polytope
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative w-full h-[520px] rounded-xl overflow-hidden bg-[#070A12] border border-slate-800">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Real-Time HUD */}
        <div className="absolute top-4 left-4 p-4 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md text-xs font-mono space-y-2.5 max-w-xs shadow-xl pointer-events-none">
          <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider">State Vector HUD</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              telemetry.phase === 'descent' 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                : telemetry.phase === 'apex'
                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
            }`}>
              {telemetry.phase} Phase
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 block text-[10px]">Active Dimension</span>
              <span className="text-slate-100 font-bold text-sm">D(n) = {telemetry.d}D</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Effective Mass</span>
              <span className={`font-bold text-sm ${telemetry.massRatio <= 0 ? 'text-emerald-400' : 'text-slate-100'}`}>
                {telemetry.massRatio.toFixed(3)} m₀
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Golden Scale λ</span>
              <span className="text-amber-300 font-bold">
                φ^{Math.pow(-1, step) * telemetry.d} ({telemetry.scale > 1000 ? telemetry.scale.toExponential(2) : telemetry.scale.toFixed(3)})
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Coupling G(n)</span>
              <span className="text-cyan-300 font-bold">{telemetry.gRatio.toFixed(3)} G₀</span>
            </div>
          </div>

          {/* Inertial Shunting Bar */}
          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">8D Momentum Shunting:</span>
              <span className="text-emerald-400 font-bold">
                {(telemetry.shunt.shuntFraction * 100).toFixed(0)}% Decoupled
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${telemetry.shunt.shuntFraction * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block">
              {telemetry.shunt.properAccelerationZero ? '✓ Zero Proper Acceleration (a^μ = 0)' : 'Partial 4D Metric Drag'}
            </span>
          </div>
        </div>

        {/* Floating Viewport Legend */}
        <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-md text-[11px] font-mono space-y-1.5 shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            <span className="text-slate-300">Negative Curvature / Repulsion Peak (Anti-Gravity)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span className="text-slate-300">Flat Spacetime (Cancelled Metric Well)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="text-slate-300">Classical Attractive Gravitational Depression</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl bg-slate-950/70 border border-slate-800 items-center font-mono text-xs">
        {/* Play/Pause & Step Scrubbing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              Clock Step: n = {step}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                isPlaying 
                  ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause Clock' : 'Start Cycle'}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="13"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value, 10))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0 (1D)</span>
            <span>3 (4D)</span>
            <span className="text-amber-400 font-bold">7 (8D Apex)</span>
            <span>10 (4D)</span>
            <span>13 (2D)</span>
          </div>
        </div>

        {/* Modulation Depth Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Modulation Depth: ξ = {modulationDepth.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={modulationDepth}
            onChange={(e) => setModulationDepth(parseFloat(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0.0 (Classical GR)</span>
            <span>0.50 (Partial)</span>
            <span className="text-cyan-400 font-bold">1.0 (Full Inversion)</span>
          </div>
        </div>

        {/* Camera & Quick Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
              autoRotate 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700/60' 
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <Rotate3d className="w-4 h-4" />
            {autoRotate ? 'Auto-Rotate ON' : 'Auto-Rotate OFF'}
          </button>
        </div>
      </div>
    </div>
  );
}
