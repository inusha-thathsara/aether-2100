import React from 'react';
import { X, Eye, Volume2, VolumeX, Type, ShieldCheck } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function SettingsModal({
  isOpen,
  onClose,
  isAccessibilityView,
  setIsAccessibilityView,
  isHighContrast,
  setIsHighContrast,
  isPlainLanguage,
  setIsPlainLanguage,
  audioEnabled,
  setAudioEnabled,
  onOpenAccessibility,
  onOpenPass
}) {
  if (!isOpen) return null;

  const toggleSound = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    audioManager.enabled = next;
    if (next) audioManager.playChime('click');
  };

  const toggleAccessibility = () => {
    const next = !(isAccessibilityView || isHighContrast);
    setIsAccessibilityView(next);
    if (setIsHighContrast) setIsHighContrast(next);
    audioManager.playChime('click');
    if (next) {
      audioManager.speak("High contrast accessibility view activated.");
    } else {
      audioManager.speak("High contrast accessibility view deactivated.");
    }
  };

  return (
    <div className="modal-backdrop-hud" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet-hud" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h2 className="modal-title-bold">Settings & Accessibility</h2>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={() => {
              audioManager.playChime('click');
              onClose();
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Accessibility Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Eye size={20} color="var(--electric-cyan)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>High-Contrast Mode (WCAG AAA)</div>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Pure black canvas & high-visibility borders</div>
            </div>
          </div>
          <div 
            className={`switch-toggle-hud ${isAccessibilityView || isHighContrast ? 'active' : ''}`}
            onClick={toggleAccessibility}
            role="switch"
            aria-checked={isAccessibilityView || isHighContrast}
          >
            <div className="switch-thumb-hud"></div>
          </div>
        </div>

        {/* Plain-Language Toggle */}
        {setIsPlainLanguage && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>Plain-Language Mode</div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Simple, easy-to-follow directions for all travelers</div>
              </div>
            </div>
            <div 
              className={`switch-toggle-hud ${isPlainLanguage ? 'active' : ''}`}
              onClick={() => {
                const next = !isPlainLanguage;
                setIsPlainLanguage(next);
                audioManager.playChime('click');
                if (next) audioManager.speak("Plain language mode activated.");
                else audioManager.speak("Plain language mode deactivated.");
              }}
              role="switch"
              aria-checked={isPlainLanguage}
            >
              <div className="switch-thumb-hud"></div>
            </div>
          </div>
        )}

        {/* Audio Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {audioEnabled ? <Volume2 size={20} color="var(--safe-mint)" /> : <VolumeX size={20} color="#64748b" />}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>Spatial Audio Feedback</div>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Futuristic chimes & spoken voice cues</div>
            </div>
          </div>
          <div 
            className={`switch-toggle-hud ${audioEnabled ? 'active' : ''}`}
            onClick={toggleSound}
            role="switch"
            aria-checked={audioEnabled}
          >
            <div className="switch-thumb-hud"></div>
          </div>
        </div>

        {/* Universal Accessibility Suite Launch Button */}
        {onOpenAccessibility && (
          <button
            type="button"
            className="btn-settings-suite-pill"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              background: 'rgba(0, 240, 255, 0.08)',
              color: 'var(--electric-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.86rem',
              marginTop: '4px'
            }}
            onClick={() => {
              audioManager.playChime('click');
              onClose();
              onOpenAccessibility();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Type size={18} />
              <span>Accessibility Suite & Text Sizing</span>
            </div>
            <span>→</span>
          </button>
        )}

        {/* Biometric Pass Launch Button */}
        {onOpenPass && (
          <button
            type="button"
            className="btn-settings-suite-pill"
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              background: 'rgba(168, 85, 247, 0.08)',
              color: 'var(--neon-violet)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.86rem'
            }}
            onClick={() => {
              audioManager.playChime('click');
              onClose();
              onOpenPass();
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} />
              <span>Universal Biometric Boarding Pass</span>
            </div>
            <span>→</span>
          </button>
        )}

        {/* Passenger Profile */}
        <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '12px 14px', fontSize: '0.76rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="var(--electric-cyan)" />
          <span>
            Registered Passenger: <strong>Inusha Gunasekara</strong> (Team: <strong>MIT Gunasekara</strong>)
          </span>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
