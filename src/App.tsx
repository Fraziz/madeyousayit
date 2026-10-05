import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CardGallery from './components/CardGallery';
import PackagingSection from './components/PackagingSection';
import Rulebook from './components/Rulebook';
import WhoItsFor from './components/WhoItsFor';
import Manifesto from './components/Manifesto';
import PlaytestFeedback from './components/PlaytestFeedback';
import Footer from './components/Footer';
import { initSmoothScroll } from './utils/smoothScroll';
import { initScrollAnimations, initParallax } from './utils/scrollAnimations';
import './App.css';

const App: React.FC = () => {
  useEffect(() => {
    const cleanupScroll = initSmoothScroll();
    const cleanupAnimations = initScrollAnimations();
    const cleanupParallax = initParallax();

    return () => {
      cleanupScroll();
      cleanupAnimations();
      cleanupParallax();
    };
  }, []);

  return (
    <div className="app-layout">
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Visual Showcase Flow */}
      <main>
        {/* Visual Hero with 6-Card Fan Showcase & Floating Specs Capsule */}
        <Hero />

        {/* How to Play Rulebook & Golden Rule Notice */}
        <Rulebook />

        {/* Visual Card Gallery by 6 Card Types & Flip Cards */}
        <CardGallery />

        {/* Complete Package & Unboxing Showcase: What's In The Box */}
        <PackagingSection />

        {/* Who This Game Is (and Isn't) For */}
        <WhoItsFor />

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
