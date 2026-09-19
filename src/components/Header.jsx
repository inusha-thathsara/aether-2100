import React from 'react';
import { Eye, Volume2, VolumeX, Ticket, Sparkles } from 'lucide-react';
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
          <span>ORACLE GRID 2100 • ONLINE</span>
        </div>
        <span className="team-tag">TEAM: IT GUNASEKARA</span>
      </div>

      <div className="header-main-bar">
        <div 
          className="brand-identity" 
          onClick={() => audioManager.playChime('click')}
          title="Aether 2100 Smart Transit Network"
        >
          <div className="brand-logo-glow">
            <Sparkles size={20} color="var(--cyan-primary)" />
          </div>
          <div className="brand-titles">
            <h1>AETHER 2100</h1>
            <div className="author-tag">BCS CRE8X 3.0 • IT GUNASEKARA</div>
          </div>
        </div>

        <div className="header-action-group">
          {/* Quick Accessibility Config */}
          <button 
            type="button"
            className={`btn-icon-hud ${accessibilityMode ? 'active' : ''}`}
            onClick={() => {
              audioManager.playChime('click');
              setIsAccessibilityModalOpen(true);
            }}
            title="Accessibility Settings (High Contrast, Large Text, Plain Language)"
            aria-label="Open Accessibility Menu"
          >
            <Eye size={18} />
          </button>

          {/* Audio Feedback Toggle */}
          <button
            type="button"
            className="btn-icon-hud"
            onClick={toggleSound}
            title={audioEnabled ? 'Mute Futuristic Audio Cues' : 'Enable Audio Feedback'}
            aria-label="Toggle Audio Sound"
          >
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} color="var(--text-dim)" />}
          </button>

          {/* Biometric Ticket / Boarding Pass */}
          <button
            type="button"
            className="btn-icon-hud"
            onClick={() => {
              audioManager.playChime('arrival');
              setIsPassModalOpen(true);
            }}
            title="View 2100 Holographic Boarding Pass"
            aria-label="Open Biometric Boarding Pass"
          >
            <Ticket size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
