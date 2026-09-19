import React from 'react';
import { X, PhoneCall, AlertTriangle, ShieldCheck, HeartHandshake } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleConnect = () => {
    audioManager.playChime('arrival');
    audioManager.speak("Connecting to 24/7 Human Transit Concierge. Live video holo-link active. Help is with you.");
    alert("Holo-Link Connected: 24/7 Transit Safety Officer is now speaking with you through the cabin audio.");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="sos-title">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={22} color="var(--crimson-alert)" />
            <h2 id="sos-title" className="modal-title" style={{ color: 'var(--crimson-alert)' }}>
              Emergency & Live Assistance
            </h2>
          </div>
          <button 
            type="button" 
            className="btn-close-modal" 
            onClick={onClose}
            aria-label="Close Emergency Window"
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.4 }}>
          Feeling disoriented, need medical support, or need a real human assistant to guide your transfer?
        </p>

        <div className="card-hud" style={{ border: '1px solid var(--crimson-alert)', background: 'rgba(255, 51, 102, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HeartHandshake size={24} color="var(--crimson-alert)" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
                Instant Concierge Holo-Link
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Average response time: 2.1 seconds • Audio/Video support
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary-hud"
          style={{ background: 'linear-gradient(90deg, #ff3366, #ff0055)', color: '#fff' }}
          onClick={handleConnect}
        >
          <PhoneCall size={18} />
          <span>Connect to Live Human Officer</span>
        </button>

        <button
          type="button"
          className="btn-secondary-hud"
          onClick={onClose}
        >
          Cancel / Return to Ride
        </button>
      </div>
    </div>
  );
}
