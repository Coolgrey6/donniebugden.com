import React, { useState } from 'react';
import {
  X,
  Send,
  ShieldCheck,
  Lock,
  Mail,
  Building,
  User,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { buildAdvisoryMailto, submitAdvisoryInquiry } from '../utils/advisoryForm';

const INITIAL = {
  name: '',
  email: '',
  organization: '',
  domain: 'defense_cryptography',
  clearanceLevel: 'unclassified',
  inquiry: '',
  website: '',
};

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [mailtoFallback, setMailtoFallback] = useState(null);
  const [formData, setFormData] = useState(INITIAL);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setSubmitted(false);
    setError(null);
    setMailtoFallback(null);
    setFormData(INITIAL);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMailtoFallback(null);

    try {
      const result = await submitAdvisoryInquiry(formData);
      if (result.ok) {
        trackEvent('advisory_form_submit', {
          channel: result.channel,
          domain: formData.domain,
        });
        setSubmitted(true);
        return;
      }

      setError(
        result.message ||
          'We could not deliver this inquiry automatically. Use “Send via email” below or write to donnie.bugden@gmail.com.'
      );
      if (result.mailto) {
        setMailtoFallback(result.mailto);
      }
    } catch {
      setError('Network error. Check your connection or use “Send via email”.');
      setMailtoFallback(buildAdvisoryMailto(formData));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
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
            type="button"
            onClick={resetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 bg-slate-950/80 overflow-y-auto">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-100 font-mono">
                Advisory inquiry received
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md font-mono leading-relaxed">
                Your message was sent to Donald Bugden&apos;s advisory inbox. For urgent matters you
                can also email directly:
              </p>
              <a
                href="mailto:donnie.bugden@gmail.com"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-sm hover:border-cyan-600/50 transition"
              >
                donnie.bugden@gmail.com
              </a>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {error && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-[11px] flex flex-col gap-2">
                  <span className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    {error}
                  </span>
                  {mailtoFallback && (
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 hover:bg-slate-800 transition w-fit mx-auto"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Send via email app
                    </a>
                  )}
                </div>
              )}

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
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Project Scope / Advisory
                  Requirements
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

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  Mutual NDA &amp; clearance protocols available on request
                </span>
                <span className="text-slate-500">Typical response within 24 hours</span>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <a
                  href={buildAdvisoryMailto(formData)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-mono transition inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email instead
                </a>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-mono transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  {submitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  {submitting ? 'Sending…' : 'Submit Advisory Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
