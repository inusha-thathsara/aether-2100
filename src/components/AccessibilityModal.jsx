import React from 'react';
import { X, Eye, Type, Volume2, VolumeX, HelpCircle, Check } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function AccessibilityModal({
  isOpen,
  onClose,
  isAccessibilityView,
  setIsAccessibilityView,
  isHighContrast,
  setIsHighContrast,
  isPlainLanguage,
  setIsPlainLanguage,
  textSize,
  setTextSize,
  audioEnabled,
  setAudioEnabled
}) {
  if (!isOpen) return null;

  const handleTextSize = (scale) => {
    audioManager.playChime('click');
    setTextSize(scale);
    document.documentElement.style.setProperty('--font-scale', scale);
    if (audioEnabled) {
      if (scale === 1) {
        audioManager.speak("Text sizing reset to standard 100 percent.");
      } else {
        audioManager.speak(`Text size scaled to ${Math.round(scale * 100)} percent.`);
      }
    }
  };

  const toggleHighContrast = () => {
    audioManager.playChime('click');
    const next = !isHighContrast;
    setIsHighContrast(next);
    if (setIsAccessibilityView) setIsAccessibilityView(next);
    
    if (next) {
      document.documentElement.setAttribute('data-accessibility', 'true');
      document.body.setAttribute('data-accessibility', 'true');
      if (audioEnabled) audioManager.speak("High contrast vision mode enabled. Maximum contrast active.");
    } else {
      document.documentElement.removeAttribute('data-accessibility');
      document.body.removeAttribute('data-accessibility');
      if (audioEnabled) audioManager.speak("High contrast vision mode disabled.");
    }
  };

  const togglePlainLanguage = () => {
    audioManager.playChime('click');
    const next = !isPlainLanguage;
    setIsPlainLanguage(next);
    if (audioEnabled) {
      if (next) {
        audioManager.speak("Plain language mode enabled. Reassuring simplified directions active.");
      } else {
        audioManager.speak("Plain language mode disabled.");
      }
    }
  };

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    audioManager.enabled = next;
    if (next) {
      audioManager.playChime('arrival');
      audioManager.speak("Vocal announcements and spatial audio enabled.");
    } else {
      audioManager.playChime('click');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="acc-title">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={22} color="var(--electric-cyan)" />
            <h2 id="acc-title" className="modal-title">Universal Access & Ease</h2>
          </div>
          <button 
            type="button" 
            className="btn-close-modal" 
            onClick={onClose}
            aria-label="Close accessibility options"
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
          Aether 2100 provides genuine universal inclusion for elderly, mobility-assisted, and first-time travelers. Customize your experience below:
        </p>

        {/* 1. Plain-Language Translation Toggle */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingRight: '12px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-pure)' }}>
              Plain-Language Mode
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Replaces transit jargon with simple, reassuring step-by-step travel guides.
            </div>
          </div>
          <button
            type="button"
            className={`btn-icon-hud ${isPlainLanguage ? 'active' : ''}`}
            onClick={togglePlainLanguage}
            aria-pressed={isPlainLanguage}
            aria-label="Toggle Plain-Language Mode"
            title={isPlainLanguage ? "Disable Plain-Language Mode" : "Enable Plain-Language Mode"}
          >
            {isPlainLanguage ? <Check size={18} strokeWidth={2.8} /> : <HelpCircle size={18} />}
          </button>
        </div>

        {/* 2. High Contrast Mode Toggle */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingRight: '12px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-pure)' }}>
              High-Contrast Vision Mode (WCAG AAA)
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Pure black canvas with maximum visibility solar yellow accents and bold borders.
            </div>
          </div>
          <button
            type="button"
            className={`btn-icon-hud ${isHighContrast || isAccessibilityView ? 'active' : ''}`}
            onClick={toggleHighContrast}
            aria-pressed={isHighContrast || isAccessibilityView}
            aria-label="Toggle High-Contrast Mode"
            title={isHighContrast || isAccessibilityView ? "Disable High-Contrast" : "Enable High-Contrast"}
          >
            {isHighContrast || isAccessibilityView ? <Check size={18} strokeWidth={2.8} /> : <Eye size={18} />}
          </button>
        </div>

        {/* 3. Text Size Adjuster */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Type size={18} color="var(--electric-cyan)" />
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-pure)' }}>
              Display Text Sizing
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button
              type="button"
              className={`btn-secondary-hud ${textSize === 1 ? 'active' : ''}`}
              style={{ fontSize: '0.82rem', padding: '10px 4px', fontWeight: textSize === 1 ? 800 : 600 }}
              onClick={() => handleTextSize(1)}
            >
              Standard (100%)
            </button>
            <button
              type="button"
              className={`btn-secondary-hud ${textSize === 1.15 ? 'active' : ''}`}
              style={{ fontSize: '0.86rem', padding: '10px 4px', fontWeight: textSize === 1.15 ? 800 : 600 }}
              onClick={() => handleTextSize(1.15)}
            >
              Large (115%)
            </button>
            <button
              type="button"
              className={`btn-secondary-hud ${textSize === 1.3 ? 'active' : ''}`}
              style={{ fontSize: '0.94rem', padding: '10px 4px', fontWeight: textSize === 1.3 ? 800 : 600 }}
              onClick={() => handleTextSize(1.3)}
            >
              Extra (130%)
            </button>
          </div>
        </div>

        {/* 4. Spoken Voice & Audio Cues Toggle */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingRight: '12px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-pure)' }}>
              Vocal Assistance & Spatial Audio
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Speaks navigation directions, stop arrivals, and plays auditory cues.
            </div>
          </div>
          <button
            type="button"
            className={`btn-icon-hud ${audioEnabled ? 'active' : ''}`}
            onClick={toggleAudio}
            aria-pressed={audioEnabled}
            aria-label="Toggle Vocal Assistance & Spatial Audio"
            title={audioEnabled ? "Disable Audio Guidance" : "Enable Audio Guidance"}
          >
            {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        {/* Done Button */}
        <button
          type="button"
          className="btn-primary-hud"
          onClick={() => {
            audioManager.playChime('click');
            onClose();
          }}
        >
          Apply & Return
        </button>
      </div>
    </div>
  );
}
