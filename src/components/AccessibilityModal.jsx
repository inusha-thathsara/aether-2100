import React from 'react';
import { X, Eye, Type, Volume2, HelpCircle, Check } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function AccessibilityModal({
  isOpen,
  onClose,
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
  };

  const toggleHighContrast = () => {
    audioManager.playChime('click');
    const next = !isHighContrast;
    setIsHighContrast(next);
    if (next) {
      document.body.setAttribute('data-accessibility', 'high-contrast');
    } else {
      document.body.removeAttribute('data-accessibility');
    }
  };

  const togglePlainLanguage = () => {
    audioManager.playChime('click');
    setIsPlainLanguage(!isPlainLanguage);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="acc-title">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={20} color="var(--cyan-primary)" />
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

        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          Cre8x 3.0 prioritizes genuine inclusion for elderly, disabled, and first-time travelers. Customize your experience below:
        </p>

        {/* 1. Plain-Language Translation Toggle */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingRight: '12px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Plain-Language Mode
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Replaces technical terms with simple, crystal-clear travel directions.
            </div>
          </div>
          <button
            type="button"
            className={`btn-icon-hud ${isPlainLanguage ? 'active' : ''}`}
            onClick={togglePlainLanguage}
            aria-pressed={isPlainLanguage}
            aria-label="Toggle Plain-Language Mode"
          >
            {isPlainLanguage ? <Check size={18} /> : <HelpCircle size={18} />}
          </button>
        </div>

        {/* 2. High Contrast Mode Toggle */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ paddingRight: '12px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              High-Contrast Vision Mode
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Deep black background with maximum visibility solar yellow accents (WCAG AAA).
            </div>
          </div>
          <button
            type="button"
            className={`btn-icon-hud ${isHighContrast ? 'active' : ''}`}
            onClick={toggleHighContrast}
            aria-pressed={isHighContrast}
            aria-label="Toggle High-Contrast Mode"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* 3. Text Size Adjuster */}
        <div className="card-hud" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Type size={18} color="var(--cyan-primary)" />
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Display Text Sizing
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button
              type="button"
              className={`btn-secondary-hud ${textSize === 1 ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '8px' }}
              onClick={() => handleTextSize(1)}
            >
              Standard (100%)
            </button>
            <button
              type="button"
              className={`btn-secondary-hud ${textSize === 1.15 ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', padding: '8px' }}
              onClick={() => handleTextSize(1.15)}
            >
              Large (115%)
            </button>
            <button
              type="button"
              className={`btn-secondary-hud ${textSize === 1.3 ? 'active' : ''}`}
              style={{ fontSize: '0.95rem', padding: '8px' }}
              onClick={() => handleTextSize(1.3)}
            >
              Extra (130%)
            </button>
          </div>
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
          Apply Preferences
        </button>
      </div>
    </div>
  );
}
