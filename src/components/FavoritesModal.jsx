import React from 'react';
import { X, Heart, MapPin, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function FavoritesModal({ isOpen, onClose, onSelectFavorite }) {
  if (!isOpen) return null;

  const favorites = [
    { id: 'fav1', name: 'Future City Hub', tag: 'Central Interchange', time: '12 mins away' },
    { id: 'fav2', name: 'Apex Skyport Hub 04', tag: 'Stratum High Spire', time: '8 mins away' },
    { id: 'fav3', name: 'Quantum Marina Bay', tag: 'Coastal Sector 01', time: '15 mins away' },
  ];

  return (
    <div className="modal-backdrop-hud" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-sheet-hud" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} color="#ff3b69" fill="#ff3b69" />
            <h2 className="modal-title-bold">Favorite Routes</h2>
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
          {favorites.map((fav) => (
            <div
              key={fav.id}
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
                onSelectFavorite(fav.name);
                onClose();
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#ffffff' }}>{fav.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{fav.tag} • {fav.time}</div>
              </div>
              <ArrowRight size={18} color="var(--electric-cyan)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoritesModal;
