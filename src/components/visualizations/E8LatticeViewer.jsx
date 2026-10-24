import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  generateE8ProjectedRoots, 
  project4Dto3D, 
  PHI 
} from '../../utils/mathE8';
import { Rotate3d, Layers, ShieldCheck, Compass, Info, X } from 'lucide-react';

export default function E8LatticeViewer() {
  const mountRef = useRef(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'inner', 'outer'
  const [showEdges, setShowEdges] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [angle4D, setAngle4D] = useState(0.42);
  const [selectedRoot, setSelectedRoot] = useState(null);

  // Generate roots
  const e8Data = useMemo(() => generateE8ProjectedRoots(), []);

  // Animation and scene references
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const rootGroupRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090D16, 0.05);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    
    // Clear any previous canvas and append new one
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06B6D4, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xF59E0B, 2.0);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Build geometry based on 4D projection
    function updateLattice(rot4D, filter, edgesEnabled) {
      // Clear old meshes
      while (rootGroup.children.length > 0) {
        const obj = rootGroup.children[0];
        rootGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      }

      const activeRoots = e8Data.roots.filter(r => {
        if (filter === 'inner') return r.shell === 'inner';
        if (filter === 'outer') return r.shell === 'outer';
        return true;
      });

      // Compute 3D projected positions
      const positions3D = activeRoots.map(r => {
        const [x, y, z] = project4Dto3D(r.coords4D, rot4D, rot4D * 0.618, 0, 3.8);
        return new THREE.Vector3(x, y, z);
      });

      // Sphere geometries for roots
      const sphereGeoInner = new THREE.SphereGeometry(0.068, 16, 16);
      const sphereGeoOuter = new THREE.SphereGeometry(0.078, 16, 16);

      const matInner = new THREE.MeshStandardMaterial({
        color: 0x06B6D4,
        emissive: 0x06B6D4,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });

      const matOuter = new THREE.MeshStandardMaterial({
        color: 0xF59E0B,
        emissive: 0xF59E0B,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8
      });

      activeRoots.forEach((root, idx) => {
        const p = positions3D[idx];
        const isInner = root.shell === 'inner';
        const mesh = new THREE.Mesh(isInner ? sphereGeoInner : sphereGeoOuter, isInner ? matInner : matOuter);
        mesh.position.copy(p);
        mesh.userData = { root };
        rootGroup.add(mesh);
      });

      // Edges (600-cell geodesics between nearest neighbors)
      if (edgesEnabled && activeRoots.length > 0) {
        const linePositions = [];
        const lineColors = [];
        const colorInner = new THREE.Color(0x06B6D4);
        const colorOuter = new THREE.Color(0xF59E0B);
        const thresholdInner = 0.95;
        const thresholdOuter = 1.45;

        for (let i = 0; i < positions3D.length; i++) {
          for (let j = i + 1; j < positions3D.length; j++) {
            const d = positions3D[i].distanceTo(positions3D[j]);
            const sameShell = activeRoots[i].shell === activeRoots[j].shell;
            const targetThresh = activeRoots[i].shell === 'inner' ? thresholdInner : thresholdOuter;

            if (sameShell && Math.abs(d - targetThresh) < 0.28) {
              linePositions.push(positions3D[i].x, positions3D[i].y, positions3D[i].z);
              linePositions.push(positions3D[j].x, positions3D[j].y, positions3D[j].z);

              const c = activeRoots[i].shell === 'inner' ? colorInner : colorOuter;
              lineColors.push(c.r, c.g, c.b, c.r, c.g, c.b);
            }
          }
        }

        if (linePositions.length > 0) {
          const lineGeo = new THREE.BufferGeometry();
          lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
          lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

          const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending
          });

          const lines = new THREE.LineSegments(lineGeo, lineMat);
          rootGroup.add(lines);
        }
      }
    }

    updateLattice(angle4D, filterMode, showEdges);

    // Mouse drag interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleWindowMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handleWindowMouseUp = () => {
      isDragging = false;
    };

    const handleContainerMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) {
        // Raycast for hovering root
        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const meshes = rootGroup.children.filter(c => c.isMesh && c.userData?.root);
        const intersects = raycasterRef.current.intersectObjects(meshes);

        if (intersects.length > 0) {
          const hovered = intersects[0].object.userData.root;
          setSelectedRoot(prev => (prev?.id === hovered.id ? prev : hovered));
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      camera.position.z = Math.max(3.5, Math.min(14, camera.position.z + e.deltaY * 0.005));
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleContainerMouseMove);
    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    // Render loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        rootGroup.rotation.y += delta * 0.25;
        rootGroup.rotation.z += delta * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleContainerMouseMove);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [filterMode, showEdges, angle4D, autoRotate, e8Data]);

  return (
    <div className="relative w-full rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Visualizer Top Bar */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Rotate3d className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm tracking-wide flex items-center gap-2">
              4D Coxeter 600-Cell / E8 Root Projection
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                240 Roots Total
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              π⊥(Φ(E8)) = ℐ₀ ∪ φ ℐ₀ (Balanced 120:120 Chiral Partition)
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all ${
              filterMode === 'all'
                ? 'bg-slate-800 text-slate-100 shadow border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 240 Roots
          </button>
          <button
            onClick={() => setFilterMode('inner')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              filterMode === 'inner'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Inner 120 (σ = -1)
          </button>
          <button
            onClick={() => setFilterMode('outer')}
            className={`px-3 py-1.5 rounded-lg font-mono transition-all flex items-center gap-1.5 ${
              filterMode === 'outer'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Outer 120 (σ = +1)
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container Wrapper */}
      <div className="w-full h-[520px] relative bg-gradient-to-b from-[#090D16] via-[#0B101E] to-[#090D16] overflow-hidden">
        {/* Dedicated 3D Canvas Mount Point - MUST BE EMPTY OF REACT CHILDREN */}
        <div 
          ref={mountRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing absolute inset-0 z-0"
        />

        {/* Floating Controls Overlay (React Sibling, Not inside mountRef) */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-auto">
          <div className="glass-panel p-2.5 rounded-xl border border-slate-800/80 text-xs flex flex-col gap-2 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> 4D XW Slice:
              </span>
              <span className="font-mono text-cyan-300 text-[11px]">{angle4D.toFixed(2)} rad</span>
            </div>
            <input 
              type="range"
              min="0"
              max="3.14159"
              step="0.02"
              value={angle4D}
              onChange={(e) => setAngle4D(parseFloat(e.target.value))}
              className="w-36 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEdges(!showEdges)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 ${
                showEdges 
                  ? 'bg-slate-800/90 text-cyan-300 border-cyan-500/30' 
                  : 'bg-slate-900/60 text-slate-500 border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              600-Cell Geodesics
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 ${
                autoRotate 
                  ? 'bg-slate-800/90 text-amber-300 border-amber-500/30' 
                  : 'bg-slate-900/60 text-slate-500 border-slate-800'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              Spin
            </button>
          </div>
        </div>

        {/* Selected Root Coordinate Tooltip (React Sibling, Not inside mountRef) */}
        {selectedRoot && (
          <div className="absolute bottom-4 right-4 z-10 glass-panel p-3.5 rounded-xl border border-slate-800 text-xs shadow-2xl max-w-xs backdrop-blur-md animate-in fade-in zoom-in-95 pointer-events-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
              <span className="font-mono font-semibold text-slate-200 flex items-center gap-1.5">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: selectedRoot.color }}
                />
                Root: {selectedRoot.id}
              </span>
              <div className="flex items-center gap-2">
                <span 
                  className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                  style={{ 
                    color: selectedRoot.color, 
                    borderColor: `${selectedRoot.color}44`,
                    backgroundColor: `${selectedRoot.color}15`
                  }}
                >
                  {selectedRoot.parityLabel}
                </span>
                <button
                  onClick={() => setSelectedRoot(null)}
                  className="text-slate-400 hover:text-white p-0.5"
                  title="Close Inspector"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span>Radius |q|:</span>
                <span className="text-slate-200">
                  {typeof selectedRoot.radius === 'number' ? selectedRoot.radius.toFixed(4) : ''} ({selectedRoot.shell === 'inner' ? '1.0000' : 'φ ≈ 1.6180'})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Green's G(q):</span>
                <span className="text-slate-200">
                  {typeof selectedRoot.potential === 'number' ? selectedRoot.potential.toFixed(5) : '0.00000'}
                </span>
              </div>
              <div className="pt-1.5 text-[10px] text-slate-500 flex flex-col gap-0.5">
                <span>Quaternion [w, x, y, z]:</span>
                <span className="text-slate-300 font-mono bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">
                  [{Array.isArray(selectedRoot.coords4D) ? selectedRoot.coords4D.map(v => v.toFixed(3)).join(', ') : ''}]
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Instruction Badge */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/50 pointer-events-none">
          <span>Click &amp; Drag to Rotate</span>
          <span>•</span>
          <span>Scroll to Zoom</span>
          <span>•</span>
          <span>Hover Roots for 4D Coordinates</span>
        </div>
      </div>

      {/* Visualizer Footer Stats */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 px-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            <span className="text-slate-300">Inner Shell (ℐ₀): 120 Roots [|q| = 1.0, σ = -1]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
            <span className="text-slate-300">Outer Shell (φℐ₀): 120 Roots [|q| = φ, σ = +1]</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-cyan-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          Exact Chiral Sum: ∑ σ(α) = 0
        </div>
      </div>
    </div>
  );
}
