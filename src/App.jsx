import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ContactModal from './components/ContactModal';
import ConsultingServices from './components/ConsultingServices';
import ResearchLibrary from './components/ResearchLibrary';

// Theory I Components (Original & 100% Unchanged)
import Hero from './components/Hero';
import ExecutiveSummary from './components/ExecutiveSummary';
import MathematicalFormalism from './components/MathematicalFormalism';
import VisualizersSection from './components/VisualizersSection';
import ProtocolsDashboard from './components/ProtocolsDashboard';

// Theory II Components (New: Oscillating Dimensional Trajectories & Anti-Gravity)
import HeroODT from './components/HeroODT';
import ExecutiveSummaryODT from './components/ExecutiveSummaryODT';
import MathematicalFormalismODT from './components/MathematicalFormalismODT';
import VisualizersSectionODT from './components/VisualizersSectionODT';
import ProtocolsDashboardODT from './components/ProtocolsDashboardODT';

import { trackTheoryView, trackEvent } from './utils/analytics';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Determine initial theory based on URL path or hash
  const getInitialTheory = () => {
    if (typeof window === 'undefined') return 'hypercomplex';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (
      path.includes('anti-gravity') || 
      path.includes('odt') || 
      hash.includes('odt') || 
      search.includes('odt') ||
      search.includes('anti-gravity')
    ) {
      return 'odt';
    }
    return 'hypercomplex';
  };

  const [activeTheory, setActiveTheory] = useState(getInitialTheory);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      setActiveTheory(getInitialTheory());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Track theory view in Google Analytics
  useEffect(() => {
    trackTheoryView(activeTheory);
  }, [activeTheory]);

  const handleSelectTheory = (theory) => {
    setActiveTheory(theory);
    const newPath = theory === 'odt' ? '/anti-gravity' : '/';
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTerminal = () => {
    trackEvent('terminal_modal_open', { active_theory: activeTheory });
    setTerminalOpen(true);
  };

  const handleOpenContact = () => {
    trackEvent('contact_modal_open', { active_theory: activeTheory });
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 tech-grid-bg relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Navigation Header with Dual Framework Switcher */}
      <Navbar 
        onOpenTerminal={handleOpenTerminal}
        onOpenContact={handleOpenContact}
        activeTheory={activeTheory}
        onSelectTheory={handleSelectTheory}
      />

      {/* Main Content Sections: Dynamic by Theoretical Framework */}
      <main className="relative">
        {activeTheory === 'hypercomplex' ? (
          /* ========================================================= */
          /* THEORETICAL FRAMEWORK I: QUASICRYSTALS, FRUSTRATION & E8  */
          /* (Original Foundation, 100% Unchanged)                     */
          /* ========================================================= */
          <div key="framework-hypercomplex" className="space-y-0 transition-opacity duration-300">
            {/* Section 1: Hero & Executive Profile */}
            <Hero 
              onOpenTerminal={handleOpenTerminal}
              onOpenContact={handleOpenContact}
              onSwitchToTheory2={() => handleSelectTheory('odt')}
            />

            {/* Section 2: The Theory & Executive Summary */}
            <ExecutiveSummary />

            {/* Section 3: Mathematical Formalism & KaTeX Proofs */}
            <MathematicalFormalism />

            {/* Section 4: Interactive 3D WebGL / Dynamical Visualizers */}
            <VisualizersSection />

            {/* Section 5: Experimental Verification Protocols */}
            <section id="protocols" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
              <ProtocolsDashboard />
            </section>
          </div>
        ) : (
          /* ========================================================= */
          /* THEORETICAL FRAMEWORK II: ODT & GRAVITATIONAL MODIFICATION */
          /* (New Paper, 3D Simulation, Theory & Defense Use Cases)    */
          /* ========================================================= */
          <div key="framework-odt" className="space-y-0 transition-opacity duration-300">
            {/* Section 1: Hero & Executive Profile (ODT) */}
            <HeroODT 
              onOpenTerminal={handleOpenTerminal}
              onOpenContact={handleOpenContact}
              onSwitchToTheory1={() => handleSelectTheory('hypercomplex')}
            />

            {/* Section 2: The Theory & Executive Summary (ODT) */}
            <ExecutiveSummaryODT />

            {/* Section 3: Mathematical Formalism & KaTeX Proofs (ODT) */}
            <MathematicalFormalismODT />

            {/* Section 4: Interactive 3D WebGL Metric Distortion Simulator */}
            <VisualizersSectionODT />

            {/* Section 5: Defense Use Cases & Experimental Verification Suite */}
            <ProtocolsDashboardODT />
          </div>
        )}

        {/* Section 6: Strategic Consulting & Defense/Advisory Matrix (Shared) */}
        <ConsultingServices 
          onOpenContact={handleOpenContact}
        />

        {/* Section 7: Research Library & Visual Proof Atlas Reader (Dual Papers) */}
        <ResearchLibrary />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTerminal={handleOpenTerminal}
        onOpenContact={handleOpenContact}
      />

      {/* Interactive Terminal Modal */}
      <TerminalModal 
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenContact={handleOpenContact}
      />

      {/* Advisory Retainer & Contact Modal */}
      <ContactModal 
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
