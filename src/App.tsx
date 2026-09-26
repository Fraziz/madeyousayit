import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CardGallery from './components/CardGallery';
import PackagingSection from './components/PackagingSection';
import Rulebook from './components/Rulebook';
import Manifesto from './components/Manifesto';
import PlaytestFeedback from './components/PlaytestFeedback';
import Footer from './components/Footer';
import { useContentProtection } from './hooks/useContentProtection';
import './App.css';

const App: React.FC = () => {
  const { isProtectedBlur } = useContentProtection();

  return (
    <div className={`app-layout ${isProtectedBlur ? 'content-shield-blur' : ''}`}>
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Visual Showcase Flow */}
      <main>
        {/* Visual Hero with 7-Card Fan Showcase & Floating Specs Capsule */}
        <Hero />

        {/* Visual Card Gallery by 7 Categories & Flip Cards */}
        <CardGallery />

        {/* Complete Package & Unboxing Showcase: What's In The Box */}
        <PackagingSection />

        {/* Simple 6-Step Rulebook & Golden Rule Notice */}
        <Rulebook />

        {/* Creator's Story & Mission */}
        <Manifesto />

        {/* Get Free Deck & Playtest Feedback Hub */}
        <PlaytestFeedback />
      </main>

      {/* Clarifications FAQ & Clean Footer */}
      <Footer />
    </div>
  );
};

export default App;
