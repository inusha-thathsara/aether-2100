import React from 'react';
import { X, Train, Car, Plane, Clock, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function AlternativesModal({ isOpen, onClose, onSelectAlternative }) {
  if (!isOpen) return null;

  const alternatives = [
    {
      id: 'alt1',
      mode: 'train',
      title: 'Sub-Terran Hyper-Maglev (Line 04)',
      time: 'Departs in 2 mins • 4m travel',
      badge: 'ON TIME',
      badgeColor: 'var(--safe-mint)',
      color: '#a855f7',
      icon: Train
    },
    {
      id: 'alt2',
      mode: 'road',
      title: 'Smart-Road Inductive Glide-Pod',
      time: 'Departs in 3 mins • 7m travel',
      badge: 'DIRECT (NO TRANSFER)',
      badgeColor: 'var(--electric-cyan)',
      color: '#00f0ff',
      icon: Car
    },
    {
      id: 'alt3',
      mode: 'air',
      title: 'eVTOL Sky-Pod Express #802',
      time: 'Departs in 6 mins • 3m travel',
      badge: 'EXPEDITED',
      badgeColor: 'var(--warning-amber)',
      color: '#ff8300',
      icon: Plane
    }
  ];

  return (
    <div className="modal-backdrop-hud" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet-hud" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div>
            <h2 className="modal-title-bold">Real-Time Alternatives</h2>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Select an alternate route to bypass current delays</div>
          </div>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {alternatives.map((alt) => {
            const Icon = alt.icon;
            return (
              <div
                key={alt.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '16px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => {
                  audioManager.playChime('arrival');
                  onSelectAlternative(alt);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: `${alt.color}22`,
                    color: alt.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#ffffff' }}>{alt.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Clock size={12} />
                      <span>{alt.time}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: `${alt.badgeColor}22`,
                    color: alt.badgeColor,
                    border: `1px solid ${alt.badgeColor}55`,
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase'
                  }}>
                    {alt.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AlternativesModal;
