import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroPage from './pages/HeroPage';
import VirtualTourPage from './pages/VirtualTourPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import EventsPage from './pages/EventsPage';
import Chatbot from './components/Chatbot';
import ContributionButton from './components/ContributionButton';
import Footer from './components/Footer';
import VirtualTour from './components/VirtualTour';
import LieuVisite from './components/LieuVisite';

export type Language = 'fr' | 'ar' | 'wo' | 'en';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <Router>
        <Header 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />
        <main>
          <Routes>
            <Route path="/" element={<HeroPage currentLanguage={currentLanguage} />} />
            <Route path="/virtual-tour" element={<VirtualTourPage currentLanguage={currentLanguage} />} />
            <Route path="/map" element={<InteractiveMapPage currentLanguage={currentLanguage} />} />
            <Route path="/events" element={<EventsPage currentLanguage={currentLanguage} />} />
            <Route path="/virtual-tour/:catKey/:idx" element={<VirtualTour currentLanguage={currentLanguage} />} />
            <Route path="/lieu/:catKey/:lieuid" element={<LieuVisite currentLanguage={currentLanguage} />} />
          </Routes>
        </main>
        <Footer currentLanguage={currentLanguage} />
        <ContributionButton currentLanguage={currentLanguage} />
        <Chatbot 
          currentLanguage={currentLanguage}
          isVisible={showChatbot}
          onToggle={() => setShowChatbot(!showChatbot)}
        />
      </Router>
    </div>
  );
}

export default App;