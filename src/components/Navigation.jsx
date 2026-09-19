import React from 'react';
import { Compass, GitBranch, Radio, Bot } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function Navigation({ activeTab, setActiveTab, onOpenCoPilot }) {
  const handleTabChange = (tab) => {
    audioManager.playChime('click');
    setActiveTab(tab);
  };

  return (
    <nav className="bottom-dock-nav" role="navigation" aria-label="Main Navigation">
      {/* Screen 1: Home & Discovery */}
      <button
        type="button"
        className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleTabChange('home')}
        id="nav-tab-home"
        aria-label="Home and Route Discovery"
      >
        <Compass size={20} />
        <span>Discovery</span>
      </button>

      {/* Screen 2: Journey Details */}
      <button
        type="button"
        className={`nav-tab-btn ${activeTab === 'route' ? 'active' : ''}`}
        onClick={() => handleTabChange('route')}
        id="nav-tab-route"
        aria-label="Journey Route Details"
      >
        <GitBranch size={20} />
        <span>Journey</span>
      </button>

      {/* Screen 3: Live Tracking */}
      <button
        type="button"
        className={`nav-tab-btn ${activeTab === 'tracking' ? 'active' : ''}`}
        onClick={() => handleTabChange('tracking')}
        id="nav-tab-tracking"
        aria-label="Live Map and Vehicle Tracking"
      >
        <Radio size={20} />
        <span>Live HUD</span>
        <span className="live-radar-dot" aria-hidden="true"></span>
      </button>

      {/* Bonus / Extra: AI Co-Pilot */}
      <button
        type="button"
        className="nav-tab-btn"
        onClick={() => {
          audioManager.playChime('click');
          onOpenCoPilot();
        }}
        id="nav-tab-copilot"
        aria-label="Oracle AI Assistant"
      >
        <Bot size={20} />
        <span>Oracle AI</span>
      </button>
    </nav>
  );
}
