import React from 'react';
import { Home, ArrowLeftRight, Radio, Settings } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function Navigation({ activeTab, setActiveTab, onOpenSettings }) {
  const handleTabClick = (tab) => {
    audioManager.playChime('click');
    if (tab === 'settings') {
      onOpenSettings();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <nav className="phone-bottom-nav-dock" role="navigation" aria-label="Main Navigation">
      {/* Tab 1: Home Screen */}
      <button
        type="button"
        className={`dock-tab-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleTabClick('home')}
        title="Home Screen"
        aria-label="Home"
        id="nav-tab-home"
      >
        <Home size={22} strokeWidth={2.4} />
      </button>

      {/* Tab 2: Journey Details */}
      <button
        type="button"
        className={`dock-tab-item ${activeTab === 'route' ? 'active' : ''}`}
        onClick={() => handleTabClick('route')}
        title="Journey Details & Route"
        aria-label="Journey Details"
        id="nav-tab-journey"
      >
        <ArrowLeftRight size={22} strokeWidth={2.4} />
      </button>

      {/* Tab 3: Live Radar HUD Tracking */}
      <button
        type="button"
        className={`dock-tab-item ${activeTab === 'tracking' ? 'active' : ''}`}
        onClick={() => handleTabClick('tracking')}
        title="Live Radar HUD"
        aria-label="Live Radar HUD"
        id="nav-tab-tracking"
      >
        <Radio size={22} strokeWidth={2.4} />
      </button>

      {/* Tab 4: Settings & Accessibility */}
      <button
        type="button"
        className="dock-tab-item"
        onClick={() => handleTabClick('settings')}
        title="Settings & Accessibility"
        aria-label="Settings"
        id="nav-tab-settings"
      >
        <Settings size={22} strokeWidth={2.4} />
      </button>
    </nav>
  );
}

export default Navigation;
