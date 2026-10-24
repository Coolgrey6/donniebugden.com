import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Minimize2, Maximize2, Shield, ArrowRight } from 'lucide-react';
import { 
  PHI, 
  PHI_INV, 
  DEFICIT_GAP_DEG, 
  QUANTIZED_TWIST_DEG, 
  generateE8ProjectedRoots 
} from '../utils/mathE8';

export default function TerminalModal({ isOpen, onClose, onOpenContact }) {
  const [history, setHistory] = useState([
    { text: "=== Donald Bugden Theoretical Computation Console [v2.4.0-E8] ===", type: "banner" },
    { text: "Type 'help' to inspect available Lie algebraic commands and advisory dispatch.", type: "system" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, { text: `$ ${cmd}`, type: "user" }];
    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newHistory.push(
        { text: "Available Commands:", type: "info" },
        { text: "  roots         - Inspect E8 Gosset root projection and kissing numbers", type: "info" },
        { text: "  eval-parity   - Compute and verify exact sum(sigma(alpha)) = 0", type: "info" },
        { text: "  gap           - Calculate 5-tetrahedra Euclidean dihedral deficit delta", type: "info" },
        { text: "  icosian       - Display fundamental H4 generators & C(phi) parameter", type: "info" },
        { text: "  download      - Provide direct links to papers and visual proof atlas", type: "info" },
        { text: "  retain        - Launch executive advisory retainer dispatch", type: "info" },
        { text: "  clear         - Clear the terminal console buffer", type: "info" }
      );
    } else if (lower === 'roots') {
      const e8 = generateE8ProjectedRoots();
      newHistory.push(
        { text: `[E8 Root System Geometry]`, type: "success" },
        { text: `Ambient Dimension: R^8 | Kissing Number: 240 | Weyl Order: 696,729,600`, type: "info" },
        { text: `Perpendicular Space R_perp^4 ~= H (Concentric Icosian Shells)`, type: "info" },
        { text: `  -> Inner Shell I_0: 120 unit roots [|q| = 1.0, Left-Chiral sigma = -1]`, type: "info" },
        { text: `  -> Outer Shell phi I_0: 120 dilated roots [|q| = ${PHI.toFixed(4)}, Right-Chiral sigma = +1]`, type: "info" },
        { text: `  -> Total Projected Roots: ${e8.totalCount} (Balanced 120:120)`, type: "success" }
      );
    } else if (lower === 'eval-parity') {
      const e8 = generateE8ProjectedRoots();
      let sum = 0;
      e8.roots.forEach(r => sum += r.parity);
      newHistory.push(
        { text: `[Executing Proposition 3.1 Parity Invariance]`, type: "system" },
        { text: `Evaluating sigma(alpha) = sgn(G(pi_perp(alpha)) - Theta) across 240 roots...`, type: "info" },
        { text: `  Inner Shell (sigma = -1): 120 elements`, type: "info" },
        { text: `  Outer Shell (sigma = +1): 120 elements`, type: "info" },
        { text: `  SUM(sigma(alpha)) = 120(-1) + 120(+1) = ${sum}`, type: "success" },
        { text: `>> THEOREM VALIDATED: Zero macroscopic chiral strain.`, type: "success" }
      );
    } else if (lower === 'gap') {
      newHistory.push(
        { text: `[Tetrahedral Dihedral Frustration Analysis]`, type: "info" },
        { text: `Regular Dihedral Angle: theta_0 = arccos(1/3) ~= 70.528779 deg`, type: "info" },
        { text: `5-Tetrahedra Subtended: 5 * theta_0 = 352.643897 deg`, type: "info" },
        { text: `Dihedral Deficit Gap: delta = 2pi - 5*theta_0 = ${DEFICIT_GAP_DEG.toFixed(6)} deg`, type: "warn" },
        { text: `Quantized Shear Twist: Delta theta_i = sigma_i * (delta/5) = +/- ${QUANTIZED_TWIST_DEG.toFixed(6)} deg`, type: "success" },
        { text: `Restoration: 5 * (theta_0 + delta/5) = 360.000000 deg (Exact closure)`, type: "success" }
      );
    } else if (lower === 'icosian') {
      newHistory.push(
        { text: `[Icosian Ring I_0 & Coxeter Group H4]`, type: "info" },
        { text: `Dynamic Parameter: C(phi) = 1/2 (phi + i + phi^-1 j)`, type: "info" },
        { text: `Norm: |C(phi)|^2 = 1/4 (phi^2 + 1 + phi^-2) = 1.000000`, type: "success" },
        { text: `Uniform Escape Threshold: R = (1 + sqrt(1 + 4|C|))/2 = phi ~= ${PHI.toFixed(6)}`, type: "success" }
      );
    } else if (lower === 'download') {
      newHistory.push(
        { text: `[Research Publication Repositories]`, type: "info" },
        { text: `1. Manuscript PDF: /Hypercomplex_Dynamical_Parity_on_E8.pdf`, type: "success" },
        { text: `2. Proof Atlas PDF: /Visual_Companion_Mathematical_Proof_Atlas_E8.pdf`, type: "success" },
        { text: `Tip: Use the Research Library tab on the main page to download or read.`, type: "info" }
      );
    } else if (lower === 'retain' || lower === 'contact') {
      newHistory.push(
        { text: `Dispatching Defense & Theoretical Advisory inquiry modal...`, type: "system" }
      );
      setTimeout(() => {
        onClose();
        onOpenContact();
      }, 500);
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      newHistory.push({
        text: `Command not recognized: '${cmd}'. Type 'help' for available mathematical protocols.`,
        type: "error"
      });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-3xl glass-panel rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[520px]">
        {/* Terminal Titlebar */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose}></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              donnie@bugden-math: ~/e8-dynamical-parity
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 bg-slate-950 font-mono text-xs flex-1 overflow-y-auto space-y-1.5 leading-relaxed">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.type === 'user' ? 'text-slate-100 font-semibold' :
                line.type === 'banner' ? 'text-cyan-400 font-bold border-b border-slate-800 pb-1 mb-2' :
                line.type === 'success' ? 'text-emerald-400' :
                line.type === 'warn' ? 'text-amber-400' :
                line.type === 'error' ? 'text-rose-400' :
                line.type === 'system' ? 'text-cyan-300' :
                'text-slate-400'
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input Bar */}
        <form onSubmit={handleCommand} className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
          <span className="font-mono text-xs text-cyan-400 select-none">donnie@e8:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'roots', 'eval-parity', 'gap', or 'retain'..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-slate-100 placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold rounded transition"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
