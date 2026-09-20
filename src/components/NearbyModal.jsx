import React from 'react';
import { X, MapPin, Footprints, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function NearbyModal({ isOpen, onClose, onSelectStation }) {
  if (!isOpen) return null;

  const nearbyStations = [
    { id: 'nb1', name: 'Nexus Surface Gate 3-Alpha', dist: '120m (2 min walk)', modes: 'Smart Road & Bus' },
    { id: 'nb2', name: 'Apex Vertiport Cradle 04', dist: '240m (Gravity Elevator)', modes: 'Aero-Shuttle' },
    { id: 'nb3', name: 'Sub-Terran Maglev Vault', dist: '380m (Moving Walkway)', modes: 'Hyper-Tube' },
  ];

  return (
    <div className="modal-backdrop-hud" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet-hud" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} color="var(--electric-cyan)" />
            <h2 className="modal-title-bold">Nearby Stations</h2>
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
          {nearbyStations.map((st) => (
            <div
              key={st.id}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => {
                audioManager.playChime('arrival');
                onSelectStation(st.name);
                onClose();
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>{st.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--safe-mint)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Footprints size={12} />
                  <span>{st.dist} • {st.modes}</span>
                </div>
              </div>
              <ArrowRight size={18} color="var(--electric-cyan)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NearbyModal;
