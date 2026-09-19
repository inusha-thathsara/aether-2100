import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { RouteDetailsScreen } from './components/RouteDetailsScreen';
import { LiveTrackingScreen } from './components/LiveTrackingScreen';
import { AccessibilityModal } from './components/AccessibilityModal';
import { BoardingPassModal } from './components/BoardingPassModal';
import { AICoPilotModal } from './components/AICoPilotModal';
import { EmergencyModal } from './components/EmergencyModal';
import { PRESET_ROUTES } from './data/transitNetwork';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRoute, setSelectedRoute] = useState(PRESET_ROUTES[0]);
  
  // Accessibility and Customization States
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isPlainLanguage, setIsPlainLanguage] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Modals
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isCoPilotModalOpen, setIsCoPilotModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Top Header Bar */}
      <Header
        accessibilityMode={isHighContrast || isPlainLanguage}
        setAccessibilityMode={setIsHighContrast}
        setIsAccessibilityModalOpen={setIsAccessibilityModalOpen}
        setIsPassModalOpen={setIsPassModalOpen}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Screen 1: Discovery & Home Screen */}
      {activeTab === 'home' && (
        <HomeScreen
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          setActiveTab={setActiveTab}
          isPlainLanguage={isPlainLanguage}
          setIsAccessibilityModalOpen={setIsAccessibilityModalOpen}
        />
      )}

      {/* Screen 2: Journey & Route Details */}
      {activeTab === 'route' && (
        <RouteDetailsScreen
          selectedRoute={selectedRoute}
          setActiveTab={setActiveTab}
          isPlainLanguage={isPlainLanguage}
          setIsPassModalOpen={setIsPassModalOpen}
        />
      )}

      {/* Screen 3: Live Map & Vehicle Tracking HUD */}
      {activeTab === 'tracking' && (
        <LiveTrackingScreen
          isPlainLanguage={isPlainLanguage}
          onOpenEmergency={() => setIsEmergencyModalOpen(true)}
        />
      )}

      {/* Bottom Thumb-Friendly HUD Dock Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCoPilot={() => setIsCoPilotModalOpen(true)}
      />

      {/* Accessibility Preferences Modal */}
      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isPlainLanguage={isPlainLanguage}
        setIsPlainLanguage={setIsPlainLanguage}
        textSize={textSize}
        setTextSize={setTextSize}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* 2100 Holographic Boarding Pass Modal */}
      <BoardingPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        selectedRoute={selectedRoute}
      />

      {/* Oracle AI Assistant Modal */}
      <AICoPilotModal
        isOpen={isCoPilotModalOpen}
        onClose={() => setIsCoPilotModalOpen(false)}
      />

      {/* Emergency Concierge SOS Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}

export default App;
