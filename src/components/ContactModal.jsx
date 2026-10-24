import React, { useState } from 'react';
import { X, Send, ShieldCheck, Lock, Mail, Building, User, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    domain: 'defense_cryptography',
    clearanceLevel: 'unclassified',
    inquiry: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds or keep confirmed
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                Retain Donald Bugden — Advisory &amp; Theoretical Consulting
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Direct engagement for defense, post-quantum lattices &amp; emergence physics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form / Submission Confirmation */}
        <div className="p-6 bg-slate-950/80">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-100 font-mono">
                Consulting Advisory Inquiry Dispatched
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md font-mono leading-relaxed">
                Thank you for contacting Donald Bugden's advisory office. For urgent defense matters or direct correspondence:
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-sm">
                donnie.bugden@gmail.com
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
              >
                Close Console
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1.5 flex items-center gap-1.5 font-semibold">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Sarah Chen, Research Director"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 flex items-center gap-1.5 font-semibold">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.gov / .com"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1.5 flex items-center gap-1.5 font-semibold">
                    <Building className="w-3.5 h-3.5 text-amber-400" /> Organization / Entity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Defense Laboratory / Deep Tech Firm"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5 flex items-center gap-1.5 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Primary Practice Domain
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-200 outline-none focus:border-cyan-500/50"
                  >
                    <option value="defense_cryptography">Post-Quantum Cryptography &amp; Defense</option>
                    <option value="lattice_geometry">High-Dimensional Lattices (E8 / Leech)</option>
                    <option value="quantum_emergence">Quasicrystalline Spin Networks &amp; Emergence</option>
                    <option value="executive_advisory">Strategic Mathematical Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1.5 flex items-center gap-1.5 font-semibold">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Project Scope / Advisory Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  placeholder="Outline your organization's mathematical bottlenecks, research program, or advisory retainer timeline..."
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  Mutual NDA &amp; Clearance Protocol Compliant
                </span>
                <span className="text-slate-500">
                  Direct Response within 24 Hours
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-mono transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Advisory Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
