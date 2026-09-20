import React from 'react';
import { Eye, Volume2, VolumeX, Ticket, Compass } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function Header({
  accessibilityMode,
  setAccessibilityMode,
  setIsAccessibilityModalOpen,
  setIsPassModalOpen,
  audioEnabled,
  setAudioEnabled
}) {
  const toggleSound = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    audioManager.enabled = newState;
    if (newState) {
      audioManager.playChime('click');
    }
  };

  return (
    <header className="site-header" role="banner">
      <div className="header-status-ticker">
        <div className="pulse-pill">
          <span className="pulse-dot" aria-hidden="true"></span>
          <span>NEO-METROPOLIS • SECTOR 04 ACTIVE</span>
        </div>
        <span className="team-tag">PASSENGER: IT GUNASEKARA</span>
      </div>

      <div className="header-main-bar">
        <div 
          className="brand-identity" 
          onClick={() => audioManager.playChime('click')}
          title="Aether 2100 Smart Transit Network"
        >
          <div className="brand-logo-glow">
            <Compass size={24} color="#00f2fe" strokeWidth={2.4} />
          </div>
          <div className="brand-titles">
            <h1>AETHER <span className="accent-num">2100</span></h1>
            <div className="author-tag">Autonomous Mobility Network</div>
          </div>
        </div>

        <div className="header-action-group">
          {/* Universal Accessibility */}
          <button 
            type="button"
            className={`btn-icon-hud ${accessibilityMode ? 'active' : ''}`}
            onClick={() => {
              audioManager.playChime('click');
              setIsAccessibilityModalOpen(true);
            }}
            title="Accessibility & Plain Language Preferences"
            aria-label="Accessibility options"
          >
            <Eye size={19} />
          </button>

          {/* Audio Chime Feedback */}
          <button
            type="button"
            className="btn-icon-hud"
            onClick={toggleSound}
            title={audioEnabled ? 'Mute Spatial Audio' : 'Enable Spatial Audio'}
            aria-label="Toggle audio feedback"
          >
            {audioEnabled ? <Volume2 size={19} /> : <VolumeX size={19} color="var(--text-dim)" />}
          </button>

          {/* Holographic Biometric Ticket */}
          <button
            type="button"
            className="btn-icon-hud"
            onClick={() => {
              audioManager.playChime('arrival');
              setIsPassModalOpen(true);
            }}
            title="View Holographic Boarding Pass"
            aria-label="View biometric pass"
          >
            <Ticket size={19} />
          </button>
        </div>
      </div>
    </header>
  );
}
