import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import ContactModal from './components/ContactModal';
import ConsultingServices from './components/ConsultingServices';
import AboutDonnie from './components/AboutDonnie';
import Dedication from './components/Dedication';
import ResearchLibrary from './components/ResearchLibrary';
import ResearchNote from './components/ResearchNote';

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

// Theory III: Lattice folding bridge between parity (I) and ODT (II)
import TheoryIII from './components/TheoryIII';
import StemLearning from './components/StemLearning';
import BookPage from './components/BookPage';

import { trackTheoryView, trackEvent } from './utils/analytics';

function readLocation() {
  if (typeof window === 'undefined') {
    return { theory: 'hypercomplex', dedication: false, learn: false, book: false };
  }
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  const cleanPath = path.replace(/\/+$/, '') || '/';
  const dedication = cleanPath === '/dedication' || hash === '#dedication';
  const learn = cleanPath === '/learn' || cleanPath === '/stem' || hash === '#learn' || hash === '#stem';
  const book = cleanPath === '/book' || hash === '#book';

  let theory = 'hypercomplex';
  if (
    path.includes('lattice') ||
    path.includes('folding') ||
    path.includes('theory-iii') ||
    path.includes('theory3') ||
    hash.includes('theory-iii') ||
    hash.includes('folding') ||
    search.includes('folding') ||
    search.includes('theory-iii')
  ) {
    theory = 'folding';
  } else if (
    path.includes('anti-gravity') ||
    path.includes('odt') ||
    hash.includes('odt') ||
    search.includes('odt') ||
    search.includes('anti-gravity')
  ) {
    theory = 'odt';
  }

  return { theory, dedication: dedication && !learn && !book, learn: learn && !book, book };
}

function theoryPath(theory) {
  if (theory === 'odt') return '/anti-gravity';
  if (theory === 'folding') return '/lattice-folding';
  return '/';
}

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [researchNoteOpen, setResearchNoteOpen] = useState(false);

  const initialLocation = readLocation();
  const [activeTheory, setActiveTheory] = useState(initialLocation.theory);
  const [dedicationOpen, setDedicationOpen] = useState(initialLocation.dedication);
  const [learnOpen, setLearnOpen] = useState(initialLocation.learn);
  const [bookOpen, setBookOpen] = useState(initialLocation.book);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const next = readLocation();
      setDedicationOpen(next.dedication);
      setLearnOpen(next.learn);
      setBookOpen(next.book);
      if (!next.dedication && !next.learn && !next.book) setActiveTheory(next.theory);
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
    setDedicationOpen(false);
    setLearnOpen(false);
    setBookOpen(false);
    setActiveTheory(theory);
    const newPath = theoryPath(theory);
    if (window.location.pathname !== newPath || window.location.hash) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTheoryDedications = () => {
    setDedicationOpen(false);
    setBookOpen(false);
    setActiveTheory('folding');
    window.history.pushState(null, '', '/lattice-folding');
    window.setTimeout(() => {
      document.getElementById('dedications-iii')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleOpenLearn = () => {
    setDedicationOpen(false);
    setBookOpen(false);
    setLearnOpen(true);
    if (window.location.pathname !== '/learn') {
      window.history.pushState(null, '', '/learn');
    }
    trackEvent('learn_view', { active_theory: activeTheory });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDedication = () => {
    setLearnOpen(false);
    setBookOpen(false);
    setDedicationOpen(true);
    if (window.location.pathname !== '/dedication') {
      window.history.pushState(null, '', '/dedication');
    }
    trackEvent('dedication_view', { active_theory: activeTheory });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBook = () => {
    setDedicationOpen(false);
    setLearnOpen(false);
    setBookOpen(true);
    if (window.location.pathname !== '/book') {
      window.history.pushState(null, '', '/book');
    }
    trackEvent('book_view', { active_theory: activeTheory });
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
        dedicationActive={dedicationOpen}
        onOpenDedication={handleOpenDedication}
        learnActive={learnOpen}
        onOpenLearn={handleOpenLearn}
        bookActive={bookOpen}
        onOpenBook={handleOpenBook}
      />

      {/* Main Content Sections: Dynamic by Theoretical Framework */}
      <main className="relative">
        {bookOpen ? (
          <BookPage />
        ) : learnOpen ? (
          <StemLearning onSelectTheory={handleSelectTheory} />
        ) : dedicationOpen ? (
          <Dedication
            onOpenTheoryDedications={handleOpenTheoryDedications}
            onOpenBook={handleOpenBook}
          />
        ) : activeTheory === 'hypercomplex' ? (
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
              onSwitchToTheory3={() => handleSelectTheory('folding')}
            />

            {/* Section 2: The Theory & Executive Summary */}
            <ExecutiveSummary onOpenResearchNote={() => setResearchNoteOpen(true)} />

            {/* Section 3: Mathematical Formalism & KaTeX Proofs */}
            <MathematicalFormalism />

            {/* Section 4: Interactive 3D WebGL / Dynamical Visualizers */}
            <VisualizersSection onOpenResearchNote={() => setResearchNoteOpen(true)} />

            {/* Section 5: Experimental Verification Protocols */}
            <section id="protocols" className="py-20 px-4 max-w-7xl mx-auto border-t border-slate-800/80">
              <ProtocolsDashboard />
            </section>
          </div>
        ) : activeTheory === 'odt' ? (
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
              onSwitchToTheory3={() => handleSelectTheory('folding')}
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
        ) : (
          /* ========================================================= */
          /* THEORETICAL FRAMEWORK III: LATTICE FOLDING BRIDGE          */
          /* Set C footprints of parity-equipped E8 on M_phys           */
          /* ========================================================= */
          <div key="framework-folding" className="space-y-0 transition-opacity duration-300">
            <TheoryIII
              onSwitchToTheory1={() => handleSelectTheory('hypercomplex')}
              onSwitchToTheory2={() => handleSelectTheory('odt')}
            />
          </div>
        )}

        {/* Section 6: About Donnie — lineage, biography, tripartite frame */}
        {!dedicationOpen && !learnOpen && !bookOpen && <AboutDonnie onSelectTheory={handleSelectTheory} />}

        {/* Section 7: Strategic Consulting & Defense/Advisory Matrix (Shared) */}
        {!dedicationOpen && !learnOpen && !bookOpen && (
          <ConsultingServices 
            onOpenContact={handleOpenContact}
          />
        )}

        {/* Section 7: Research Library & Visual Proof Atlas Reader (Dual Papers) */}
        {!dedicationOpen && !learnOpen && !bookOpen && <ResearchLibrary activeTheory={activeTheory} />}
      </main>

      {/* Footer */}
      <Footer 
        onOpenTerminal={handleOpenTerminal}
        onOpenContact={handleOpenContact}
        onOpenDedication={handleOpenDedication}
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

      {researchNoteOpen && (
        <ResearchNote onClose={() => setResearchNoteOpen(false)} />
      )}
    </div>
  );
}
