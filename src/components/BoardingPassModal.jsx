import React from 'react';
import { X, QrCode, ShieldCheck, Sparkles, CheckCircle2, Wifi } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function BoardingPassModal({ isOpen, onClose, selectedRoute }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="pass-title">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--cyan-primary)" />
            <h2 id="pass-title" className="modal-title">Universal Biometric Pass</h2>
          </div>
          <button 
            type="button" 
            className="btn-close-modal" 
            onClick={onClose}
            aria-label="Close Boarding Pass"
          >
            <X size={18} />
          </button>
        </div>

        {/* 2100 Holographic Boarding Pass Card */}
        <div className="pass-hologram-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="route-tag-pill">2100 TRANSIT TOKEN • TEAM MIT GUNASEKARA</span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                INUSHA GUNASEKARA
              </div>
              <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan-primary)' }}>
                PASSENGER ID: ORACLE-2100-MITG-8821
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--emerald-accent)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                <Wifi size={14} /> NFC SYNCED
              </span>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                SECTOR 01 ➔ 02
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed var(--border-glass)', borderBottom: '1px dashed var(--border-glass)', padding: '12px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-hud)' }}>
                Origin Hub
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                {selectedRoute?.from || 'Quantum Marina Bay'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-hud)' }}>
                Destination Spire
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                {selectedRoute?.to || 'Apex Skyport Hub 04'}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-hud)' }}>GATE / BAY</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--cyan-primary)' }}>BAY 3-A</div>
            </div>
            <div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-hud)' }}>CRADLE / SEAT</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--emerald-accent)' }}>SEAT 04-A</div>
            </div>
            <div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-hud)' }}>CLEARANCE</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--amber-warning)' }}>ALL MODES</div>
            </div>
          </div>

          {/* Dynamic QR / Hologram Box */}
          <div className="pass-qr-box">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              {/* Simulated futuristic QR Matrix */}
              <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
              <rect x="10" y="10" width="25" height="25" fill="#05070f" />
              <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
              <rect x="18" y="18" width="9" height="9" fill="#05070f" />
              
              <rect x="65" y="10" width="25" height="25" fill="#05070f" />
              <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
              <rect x="73" y="18" width="9" height="9" fill="#05070f" />

              <rect x="10" y="65" width="25" height="25" fill="#05070f" />
              <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
              <rect x="18" y="73" width="9" height="9" fill="#05070f" />

              {/* Data dots */}
              <rect x="42" y="15" width="6" height="6" fill="#00f0ff" />
              <rect x="52" y="25" width="6" height="6" fill="#05070f" />
              <rect x="42" y="38" width="16" height="16" fill="#7000ff" />
              <rect x="65" y="48" width="6" height="12" fill="#05070f" />
              <rect x="42" y="65" width="8" height="8" fill="#05070f" />
              <rect x="56" y="75" width="8" height="8" fill="#00ff9d" />
              <rect x="75" y="65" width="15" height="15" fill="#05070f" />
            </svg>
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            ✓ Scan at any automated gate, pod cradle, or airlock for touchless boarding.
          </div>
        </div>

        <button
          type="button"
          className="btn-primary-hud"
          onClick={() => {
            audioManager.playChime('click');
            onClose();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
