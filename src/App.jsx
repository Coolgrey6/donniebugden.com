import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExecutiveSummary from './components/ExecutiveSummary';
import MathematicalFormalism from './components/MathematicalFormalism';
import VisualizersSection from './components/VisualizersSection';
import ProtocolsDashboard from './components/ProtocolsDashboard';
import ConsultingServices from './components/ConsultingServices';
import ResearchLibrary from './components/ResearchLibrary';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ContactModal from './components/ContactModal';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 tech-grid-bg relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Navbar 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Section 1: Hero & Executive Profile */}
        <Hero 
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Section 2: The Theory & Executive Summary */}
        <ExecutiveSummary />

        {/* Section 3: Mathematical Formalism & KaTeX Proofs */}
        <MathematicalFormalism />

        {/* Section 4: Interactive 3D WebGL / Dynamical Visualizers */}
        <VisualizersSection />

        {/* Section 5: Experimental Verification Protocols (Section 6) */}
        <section id="protocols" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
          <ProtocolsDashboard />
        </section>

        {/* Section 6: Strategic Consulting & Defense/Advisory Matrix */}
        <ConsultingServices 
          onOpenContact={() => setContactOpen(true)}
        />

        {/* Section 7: Research Library & Visual Proof Atlas Reader */}
        <ResearchLibrary />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Interactive Terminal Modal */}
      <TerminalModal 
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Advisory Retainer & Contact Modal */}
      <ContactModal 
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
