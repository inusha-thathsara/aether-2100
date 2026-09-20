import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Home, 
  ArrowLeftRight, 
  Radio, 
  Eye, 
  Volume2, 
  VolumeX, 
  Settings,
  ShieldCheck,
  Bot,
  Sparkles,
  Ticket
} from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { RouteDetailsScreen } from './components/RouteDetailsScreen';
import { LiveTrackingScreen } from './components/LiveTrackingScreen';
import { Navigation } from './components/Navigation';
import { SettingsModal } from './components/SettingsModal';
import { AlternativesModal } from './components/AlternativesModal';
import { FavoritesModal } from './components/FavoritesModal';
import { NearbyModal } from './components/NearbyModal';
import { AICoPilotModal } from './components/AICoPilotModal';
import { BoardingPassModal } from './components/BoardingPassModal';
import { EmergencyModal } from './components/EmergencyModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { audioManager } from './utils/audioCues';
import { PRESET_ROUTES } from './data/transitNetwork';

export function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'route' | 'tracking'
  const [selectedMode, setSelectedMode] = useState('air');
  const [selectedDestination, setSelectedDestination] = useState('Future City Hub');
  const [isAccessibilityView, setIsAccessibilityView] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isPlainLanguage, setIsPlainLanguage] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAlternativesOpen, setIsAlternativesOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);
  const [isCoPilotOpen, setIsCoPilotOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  // Scroll to top upon screen navigation for accessibility
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Sync text size scale with root CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', textSize);
  }, [textSize]);

  // Sync high contrast attribute with document and body
  useEffect(() => {
    const isHigh = isAccessibilityView || isHighContrast;
    if (isHigh) {
      document.documentElement.setAttribute('data-accessibility', 'true');
      document.body.setAttribute('data-accessibility', 'true');
    } else {
      document.documentElement.removeAttribute('data-accessibility');
      document.body.removeAttribute('data-accessibility');
    }
  }, [isAccessibilityView, isHighContrast]);

  const handleStartNewJourney = (destination = 'Future City Hub') => {
    setSelectedDestination(destination);
    setActiveTab('route');
  };

  const handleSelectTracking = () => {
    setActiveTab('tracking');
  };

  const toggleSound = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    audioManager.enabled = next;
    if (next) audioManager.playChime('click');
  };

  const toggleAccessibility = () => {
    const next = !isAccessibilityView;
    setIsAccessibilityView(next);
    audioManager.playChime('click');
  };

  return (
    <div 
      className="app-shell" 
      data-accessibility={isAccessibilityView || isHighContrast ? 'true' : 'false'}
    >
      {/* Desktop Header Navigation (Shown on >= 768px, Hidden on Mobile) */}
      <header className="desktop-navbar" role="banner">
        <div 
          className="desktop-brand" 
          onClick={() => {
            audioManager.playChime('click');
            setActiveTab('home');
          }}
          title="Return to Home"
        >
          <div className="brand-emblem-cyan">
            <Compass size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-name-group">
            <h1>AETHER 2100</h1>
            <div className="brand-subtext">Autonomous Smart-City Transit Network</div>
          </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="desktop-nav-links" role="navigation" aria-label="Desktop Navigation">
          <button
            type="button"
            className={`desktop-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => {
              audioManager.playChime('click');
              setActiveTab('home');
            }}
          >
            <Home size={16} />
            <span>Discovery</span>
          </button>

          <button
            type="button"
            className={`desktop-nav-item ${activeTab === 'route' ? 'active' : ''}`}
            onClick={() => {
              audioManager.playChime('click');
              setActiveTab('route');
            }}
          >
            <ArrowLeftRight size={16} />
            <span>Journey Itinerary</span>
          </button>

          <button
            type="button"
            className={`desktop-nav-item ${activeTab === 'tracking' ? 'active' : ''}`}
            onClick={() => {
              audioManager.playChime('click');
              setActiveTab('tracking');
            }}
          >
            <Radio size={16} />
            <span>Live Radar HUD</span>
          </button>
        </nav>

        {/* Desktop Quick Actions */}
        <div className="desktop-actions-right">
          <button
            type="button"
            className="btn-header-pill"
            onClick={() => {
              audioManager.playChime('click');
              setIsCoPilotOpen(true);
            }}
            title="Oracle AI Universal Co-Pilot"
            aria-label="Oracle AI Universal Co-Pilot"
            id="btn-desktop-oracle-copilot"
          >
            <Bot size={16} color="var(--electric-cyan)" />
            <span>Oracle AI</span>
          </button>

          <button
            type="button"
            className="btn-header-pill"
            onClick={() => {
              audioManager.playChime('click');
              setIsPassOpen(true);
            }}
            title="Universal Biometric Pass"
            aria-label="Universal Biometric Pass"
            id="btn-desktop-biometric-pass"
          >
            <Ticket size={16} color="var(--neon-violet)" />
            <span>Biometric Pass</span>
          </button>

          <button
            type="button"
            className={`btn-header-pill ${isAccessibilityView || isHighContrast ? 'active' : ''}`}
            onClick={() => {
              audioManager.playChime('click');
              setIsAccessibilityOpen(true);
            }}
            title="Universal Accessibility Suite"
            aria-label="Accessibility Options"
            id="btn-desktop-accessibility-suite"
          >
            <Eye size={16} />
            <span>{isAccessibilityView || isHighContrast ? 'Accessibility Active' : 'Accessibility'}</span>
          </button>

          <button
            type="button"
            className="btn-header-pill"
            onClick={toggleSound}
            title={audioEnabled ? 'Mute Spatial Audio' : 'Unmute Spatial Audio'}
          >
            {audioEnabled ? <Volume2 size={16} color="var(--safe-mint)" /> : <VolumeX size={16} color="var(--text-dim)" />}
            <span>{audioEnabled ? 'Audio On' : 'Muted'}</span>
          </button>

          <button
            type="button"
            className="btn-header-pill"
            onClick={() => {
              audioManager.playChime('click');
              setIsSettingsOpen(true);
            }}
            title="Settings"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Responsive Content Viewport */}
      <div className={`responsive-content-container ${activeTab === 'tracking' ? 'tracking-mode-container' : ''}`}>
        <main className="screen-viewport screen-fade-in" key={activeTab} role="main">
          {activeTab === 'home' && (
            <HomeScreen
              onStartNewJourney={handleStartNewJourney}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenFavorites={() => setIsFavoritesOpen(true)}
              onOpenNearby={() => setIsNearbyOpen(true)}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              onSelectTracking={handleSelectTracking}
              isPlainLanguage={isPlainLanguage}
              isAccessibilityView={isAccessibilityView || isHighContrast}
            />
          )}

          {activeTab === 'route' && (
            <RouteDetailsScreen
              onSelectTracking={handleSelectTracking}
              isAccessibilityView={isAccessibilityView}
              setIsAccessibilityView={setIsAccessibilityView}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
              destination={selectedDestination}
              isPlainLanguage={isPlainLanguage}
            />
          )}

          {activeTab === 'tracking' && (
            <LiveTrackingScreen
              onOpenAlternatives={() => setIsAlternativesOpen(true)}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
              isPlainLanguage={isPlainLanguage}
            />
          )}
        </main>
      </div>

      {/* Floating Global Oracle AI Co-Pilot Button (Available on all screens & mobile) */}
      <button
        type="button"
        className="fab-ai-copilot"
        onClick={() => {
          audioManager.playChime('click');
          setIsCoPilotOpen(true);
        }}
        title="Oracle 2100 AI Co-Pilot"
        aria-label="Open Oracle AI Co-Pilot"
        id="btn-fab-oracle-ai"
      >
        <Sparkles size={18} color="var(--electric-cyan)" />
        <span>Oracle AI</span>
      </button>

      {/* Mobile Bottom Navigation Dock (Visible on Mobile < 768px) */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isAccessibilityView={isAccessibilityView}
        setIsAccessibilityView={setIsAccessibilityView}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isPlainLanguage={isPlainLanguage}
        setIsPlainLanguage={setIsPlainLanguage}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onOpenPass={() => setIsPassOpen(true)}
      />

      <AlternativesModal
        isOpen={isAlternativesOpen}
        onClose={() => setIsAlternativesOpen(false)}
        onSelectAlternative={(alt) => {
          setActiveTab('route');
        }}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectFavorite={(fav) => {
          setSelectedDestination(fav?.title || fav?.name || 'Neo-Botanical Bio-Dome');
          setActiveTab('route');
        }}
      />

      <NearbyModal
        isOpen={isNearbyOpen}
        onClose={() => setIsNearbyOpen(false)}
        onSelectStation={(st) => {
          setSelectedDestination(st?.name || 'Nexus Central Interchange');
          setActiveTab('route');
        }}
      />

      <AICoPilotModal
        isOpen={isCoPilotOpen}
        onClose={() => setIsCoPilotOpen(false)}
      />

      <BoardingPassModal
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
        selectedRoute={PRESET_ROUTES[0]}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        isAccessibilityView={isAccessibilityView}
        setIsAccessibilityView={setIsAccessibilityView}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isPlainLanguage={isPlainLanguage}
        setIsPlainLanguage={setIsPlainLanguage}
        textSize={textSize}
        setTextSize={setTextSize}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />
    </div>
  );
}

export default App;
