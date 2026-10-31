import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  THETA_0_DEG, 
  DEFICIT_GAP_DEG, 
  QUANTIZED_TWIST_DEG 
} from '../../utils/mathE8';
import { Box, Play, CheckCircle2, AlertTriangle, Layers, Rotate3d, Compass } from 'lucide-react';

export default function TetrahedralFrustrationViewer() {
  const mountRef = useRef(null);
  const [resolutionMode, setResolutionMode] = useState('frustrated'); // 'frustrated' or 'resolved'
  const [twistProgress, setTwistProgress] = useState(0); // 0 = frustrated gap open, 1 = resolved closed
  const [autoRotate, setAutoRotate] = useState(true);

  // Three.js scene refs
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const groupRef = useRef(null);
  const gapMeshRef = useRef(null);
  const tetrahedraMeshesRef = useRef([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06B6D4, 2.0);
    dirLight1.position.set(4, 8, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xF59E0B, 1.8);
    dirLight2.position.set(-4, -6, -4);
    scene.add(dirLight2);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    groupRef.current = mainGroup;

    const theta0Rad = (THETA_0_DEG * Math.PI) / 180;
    const gapRad = (DEFICIT_GAP_DEG * Math.PI) / 180;
    const twistUnitRad = (QUANTIZED_TWIST_DEG * Math.PI) / 180;

    const tetMeshes = [];
    const colors = [
      0x06B6D4, // cyan
      0x0284C7, // sky
      0x38BDF8, // light cyan
      0xF59E0B, // amber
      0xD97706  // deep amber
    ];

    for (let i = 0; i < 5; i++) {
      const tetGroup = new THREE.Group();
      
      const vA = new THREE.Vector3(0, 0, -1.2);
      const vB = new THREE.Vector3(0, 0, 1.2);
      const vC = new THREE.Vector3(Math.cos(0) * 1.8, Math.sin(0) * 1.8, 0);
      const vD = new THREE.Vector3(Math.cos(theta0Rad) * 1.8, Math.sin(theta0Rad) * 1.8, 0);

      const geom = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        vA.x, vA.y, vA.z,  vB.x, vB.y, vB.z,  vC.x, vC.y, vC.z,
        vA.x, vA.y, vA.z,  vD.x, vD.y, vD.z,  vB.x, vB.y, vB.z,
        vA.x, vA.y, vA.z,  vC.x, vC.y, vC.z,  vD.x, vD.y, vD.z,
        vB.x, vB.y, vB.z,  vD.x, vD.y, vD.z,  vC.x, vC.y, vC.z,
      ]);

      geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      geom.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: colors[i],
        roughness: 0.25,
        metalness: 0.6,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geom, mat);
      tetGroup.add(mesh);

      const wireGeo = new THREE.WireframeGeometry(geom);
      const wireMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      tetGroup.add(wire);

      mainGroup.add(tetGroup);
      tetMeshes.push(tetGroup);
    }
    tetrahedraMeshesRef.current = tetMeshes;

    // Create Gap Wedge Mesh
    const gapGeom = new THREE.BufferGeometry();
    const gStart = 5 * theta0Rad;
    const gEnd = 2 * Math.PI;
    const gvA = new THREE.Vector3(0, 0, -1.2);
    const gvB = new THREE.Vector3(0, 0, 1.2);
    const gvC = new THREE.Vector3(Math.cos(gStart) * 1.82, Math.sin(gStart) * 1.82, 0);
    const gvD = new THREE.Vector3(Math.cos(gEnd) * 1.82, Math.sin(gEnd) * 1.82, 0);

    const gapVertices = new Float32Array([
      gvA.x, gvA.y, gvA.z,  gvB.x, gvB.y, gvB.z,  gvC.x, gvC.y, gvC.z,
      gvA.x, gvA.y, gvA.z,  gvD.x, gvD.y, gvD.z,  gvB.x, gvB.y, gvB.z,
      gvA.x, gvA.y, gvA.z,  gvC.x, gvC.y, gvC.z,  gvD.x, gvD.y, gvD.z,
      gvB.x, gvB.y, gvB.z,  gvD.x, gvD.y, gvD.z,  gvC.x, gvC.y, gvC.z,
    ]);
    gapGeom.setAttribute('position', new THREE.BufferAttribute(gapVertices, 3));
    gapGeom.computeVertexNormals();

    const gapMat = new THREE.MeshBasicMaterial({
      color: 0xEF4444,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide
    });
    const gapMesh = new THREE.Mesh(gapGeom, gapMat);
    mainGroup.add(gapMesh);
    gapMeshRef.current = gapMesh;

    // Mouse drag
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleWindowMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      mainGroup.rotation.y += deltaX * 0.008;
      mainGroup.rotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleWindowMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    // Animation loop
    let reqId;
    const clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        mainGroup.rotation.y += delta * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [autoRotate]);

  useEffect(() => {
    const tets = tetrahedraMeshesRef.current;
    if (!tets || tets.length !== 5) return;

    const theta0Rad = (THETA_0_DEG * Math.PI) / 180;
    const twistUnitRad = (QUANTIZED_TWIST_DEG * Math.PI) / 180;

    tets.forEach((tetGroup, i) => {
      const frustratedAngle = i * theta0Rad;
      const resolvedAngle = i * (theta0Rad + twistUnitRad);
      const currentAngle = frustratedAngle + (resolvedAngle - frustratedAngle) * twistProgress;
      tetGroup.rotation.z = currentAngle;
    });

    if (gapMeshRef.current) {
      gapMeshRef.current.material.opacity = Math.max(0, 0.7 * (1 - twistProgress));
      gapMeshRef.current.visible = twistProgress < 0.98;
    }
  }, [twistProgress]);

  const applyMode = (mode) => {
    setResolutionMode(mode);
    const target = mode === 'resolved' ? 1 : 0;
    const start = twistProgress;
    const duration = 600;
    const startTime = performance.now();

    const step = (time) => {
      const elapsed = time - startTime;
      const p = Math.min(1, elapsed / duration);
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const current = start + (target - start) * ease;
      setTwistProgress(current);

      if (p < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="w-full rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-sm tracking-wide flex items-center gap-2">
              Tetrahedral Packing Frustration &amp; Chiral Shear Resolution
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                δ ≈ 7.356° Gap
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              5 Regular Tetrahedra: 5 × 70.529° = 352.644° → Dihedral Deficit δ = 2π - 5θ₀
            </p>
          </div>
        </div>

        {/* State Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => applyMode('frustrated')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              resolutionMode === 'frustrated'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-600/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            A: Uncompensated Deficit (7.356°)
          </button>
          <button
            onClick={() => applyMode('resolved')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              resolutionMode === 'resolved'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-cyan-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            B: Julia-Parity Twist (Δθ = ±1.471°)
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container Wrapper */}
      <div className="w-full h-[440px] relative bg-gradient-to-b from-[#090D16] via-[#0B101E] to-[#090D16] overflow-hidden">
        {/* Dedicated Three.js canvas mount - MUST BE EMPTY OF REACT CHILDREN */}
        <div 
          ref={mountRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing absolute inset-0 z-0"
        />

        {/* State Overlay Badge (React Sibling, Not inside mountRef) */}
        <div className="absolute top-4 left-4 z-10 glass-panel p-3 rounded-xl border border-slate-800 text-xs max-w-sm backdrop-blur-md pointer-events-none">
          {resolutionMode === 'frustrated' ? (
            <div className="space-y-1">
              <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Unclosable Geometric Deficit
              </span>
              <p className="text-[11px] text-slate-400 font-mono">
                Five regular tetrahedra around a common edge subtend only 352.644°, leaving a visible <strong className="text-rose-300">7.356°</strong> deficit wedge (shown in red). Uncompensated, this generates macroscopic shear vortices in 3D quasicrystals.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Theoretical 360° Closure Model
              </span>
              <p className="text-[11px] text-slate-400 font-mono">
                Theoretical Model: Junction twist <strong className="text-cyan-300">Δθᵢ = σᵢ(δ/5) ≈ ±1.4712°</strong> cancels the defect angle in simulation. Whether this anti-correlates on geometric neighbors remains an open conjecture.
              </p>
            </div>
          )}
        </div>

        {/* Live Metrics Float (React Sibling, Not inside mountRef) */}
        <div className="absolute bottom-4 right-4 z-10 glass-panel p-3 rounded-xl border border-slate-800 text-xs backdrop-blur-md font-mono space-y-1 pointer-events-none">
          <div className="flex justify-between gap-6 text-slate-400">
            <span>Dihedral Angle θ₀:</span>
            <span className="text-slate-200">70.529°</span>
          </div>
          <div className="flex justify-between gap-6 text-slate-400">
            <span>Subtended (5θ₀):</span>
            <span className="text-slate-200">352.644°</span>
          </div>
          <div className="flex justify-between gap-6 text-slate-400">
            <span>Quantized Twist Δθ:</span>
            <span className="text-cyan-400 font-semibold">±1.4712°</span>
          </div>
          <div className="flex justify-between gap-6 pt-1 border-t border-slate-800 text-slate-400">
            <span>Status:</span>
            <span className={twistProgress > 0.5 ? 'text-cyan-400 font-bold' : 'text-rose-400 font-bold'}>
              {twistProgress > 0.5 ? '360.000° Closed' : '7.356° Unclosable Gap'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Comparison Row */}
      <div className="p-3.5 bg-slate-950/90 border-t border-slate-800/80 px-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono z-20">
        <div className="text-slate-400">
          <strong className="text-slate-200">Hamiltonian Strain:</strong> H_strain = ∑ κ[θ_ij - (θ₀ + ⅕δ(σᵢ + σⱼ))]² + J ∑ σᵢσⱼ
        </div>
        <div className="text-xs text-slate-400">
          Random Assignment: <span className="text-rose-400 font-semibold">H_strain ∝ κ N (Diverges)</span> | Julia Coupled: <span className="text-cyan-400 font-semibold">H_strain → Minimal Ground State</span>
        </div>
      </div>
    </div>
  );
}
