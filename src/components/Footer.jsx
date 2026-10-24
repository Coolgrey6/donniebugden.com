import React from 'react';
import { ShieldCheck, Mail, BookOpen, Layers, Terminal, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenTerminal, onOpenContact }) {
  return (
    <footer className="border-t border-slate-800/90 bg-[#070A11] pt-16 pb-12 px-4 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Bio */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 p-1">
              <img src="/logo.svg" alt="Donald Bugden Logo" className="w-full h-full" />
            </div>
            <div>
              <span className="font-bold text-slate-200 text-sm block">
                Donald "Donnie" Bugden
              </span>
              <span className="text-[11px] text-cyan-400">
                Theoretical Mathematics &amp; Advanced Computation Consultant
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed font-sans max-w-lg text-xs">
            Specializing in exceptional Lie groups (E8), high-dimensional lattice architectures, quaternionic dynamical systems, post-quantum cryptographic primitives, and geometric quantum gravity / Emergence Theory formulations. Former defense and strategic intelligence modeling specialist (DoD/NSA contracting).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Department of Mathematical Sciences
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              Theoretical Physics Research Initiative
            </span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <span className="text-slate-200 font-bold uppercase tracking-wider block text-xs">
            Theoretical Architecture
          </span>
          <ul className="space-y-2">
            <li><a href="#theory" className="hover:text-cyan-400 transition">E8 Projection Pipeline</a></li>
            <li><a href="#formalism" className="hover:text-cyan-400 transition">KaTeX Formalism &amp; Proofs</a></li>
            <li><a href="#visualizers" className="hover:text-cyan-400 transition">4D 600-Cell / E8 Visualizer</a></li>
            <li><a href="#visualizers" className="hover:text-cyan-400 transition">Quaternionic Julia Explorer</a></li>
            <li><a href="#visualizers" className="hover:text-cyan-400 transition">Tetrahedral Frustration Viewer</a></li>
            <li><a href="#protocols" className="hover:text-cyan-400 transition">Section 6 Protocols Benchmark</a></li>
          </ul>
        </div>

        {/* Col 3: Research & Direct Engagement */}
        <div className="space-y-3">
          <span className="text-slate-200 font-bold uppercase tracking-wider block text-xs">
            Advisory &amp; Documents
          </span>
          <ul className="space-y-2">
            <li>
              <a href="/Hypercomplex_Dynamical_Parity_on_E8.pdf" target="_blank" className="hover:text-cyan-400 transition flex items-center gap-1">
                Manuscript PDF (JMP-DG) <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            </li>
            <li>
              <a href="/Visual_Companion_Mathematical_Proof_Atlas_E8.pdf" target="_blank" className="hover:text-cyan-400 transition flex items-center gap-1">
                Visual Proof Atlas PDF <ExternalLink className="w-3 h-3 text-cyan-400" />
              </a>
            </li>
            <li>
              <button onClick={onOpenContact} className="hover:text-amber-400 transition text-left">
                Retain Advisory Services
              </button>
            </li>
            <li>
              <button onClick={onOpenTerminal} className="hover:text-cyan-400 transition text-left flex items-center gap-1">
                <Terminal className="w-3 h-3 text-cyan-400" /> Launch Math Terminal
              </button>
            </li>
            <li className="pt-2 text-slate-300">
              <a href="mailto:donnie.bugden@gmail.com" className="text-cyan-400 hover:underline">
                donnie.bugden@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} Donald M. Bugden. All rights reserved. AMS Subject Classification (2020): 52C23, 37F10, 17B22, 81P68.
        </div>
        <div className="flex items-center gap-4">
          <span>Obsidian Dark Mode</span>
          <span>•</span>
          <span>Golden Ratio Parameterized φ ≈ 1.618033</span>
        </div>
      </div>
    </footer>
  );
}
