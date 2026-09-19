import React from 'react';
import { 
  Clock, 
  MapPin, 
  ArrowRight, 
  Bus, 
  Train, 
  Plane, 
  Car, 
  Footprints, 
  AlertCircle, 
  CheckCircle2, 
  Radio, 
  Ticket, 
  Volume2, 
  Sparkles,
  Accessibility,
  ArrowUpRight
} from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function RouteDetailsScreen({ 
  selectedRoute, 
  setActiveTab, 
  isPlainLanguage, 
  setIsPassModalOpen 
}) {
  const getModeIcon = (modeId, size = 18) => {
    switch (modeId) {
      case 'bus': return <Bus size={size} />;
      case 'train': return <Train size={size} />;
      case 'air': return <Plane size={size} />;
      case 'road': return <Car size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  const getModeColor = (modeId) => {
    switch (modeId) {
      case 'bus': return 'var(--teal-glow)';
      case 'train': return 'var(--emerald-active)';
      case 'air': return 'var(--solar-amber)';
      case 'road': return 'var(--violet-iris)';
      default: return 'var(--teal-glow)';
    }
  };

  const handleLaunchTracking = () => {
    audioManager.playChime('arrival');
    setActiveTab('tracking');
  };

  const speakSummary = () => {
    const text = isPlainLanguage
      ? `This route takes ${selectedRoute.totalDuration}. ${selectedRoute.plainSummary}`
      : `Your multi-modal corridor from ${selectedRoute.from} to ${selectedRoute.to} is on schedule. Total duration is ${selectedRoute.totalDuration}. All interchanges feature automated step-free boarding ramps.`;
    audioManager.speak(text);
  };

  return (
    <div className="screen-content" role="region" aria-label="Route and Journey Details">
      {/* Screen 2 Hero Summary Card (High Information Hierarchy) */}
      <section className="route-hero-card">
        <div className="route-hero-top">
          <span className="route-tag-pill">{selectedRoute.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald-active)', fontSize: '0.78rem', fontWeight: 700 }}>
            <CheckCircle2 size={15} />
            <span>{selectedRoute.status}</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-data)', fontWeight: 600 }}>
            Total Journey Duration
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '2px' }}>
            <span className="duration-big">{selectedRoute.totalDuration}</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>• {selectedRoute.totalDistance} total</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-pure)' }}>
          <MapPin size={18} color="var(--teal-glow)" />
          <span>{selectedRoute.from}</span>
          <ArrowRight size={16} color="var(--text-dim)" />
          <span>{selectedRoute.to}</span>
        </div>

        {/* Critical Information Meta Strip */}
        <div className="route-meta-strip">
          <div className="meta-item">
            <span className="meta-item-label">Crowd Density</span>
            <span className="meta-item-val" style={{ color: 'var(--emerald-active)' }}>Low (32%)</span>
          </div>
          <div className="meta-item">
            <span className="meta-item-label">Clean Energy</span>
            <span className="meta-item-val">0.0 kg CO2</span>
          </div>
          <div className="meta-item">
            <span className="meta-item-label">Transit Modes</span>
            <span className="meta-item-val">
              {selectedRoute.legs.filter(l => !l.isTransfer).length} Seamless Legs
            </span>
          </div>
        </div>

        {/* Read Aloud Button */}
        <button 
          type="button" 
          className="btn-secondary-hud" 
          onClick={speakSummary}
          style={{ width: '100%', fontSize: '0.8rem', padding: '10px 14px' }}
          aria-label="Read journey overview aloud"
        >
          <Volume2 size={16} /> Listen to Journey Briefing
        </button>
      </section>

      {/* Real-Time Air & Ground Corridor Safety Box */}
      <section 
        className="card-hud" 
        style={{ 
          background: 'rgba(16, 185, 129, 0.08)', 
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '14px 18px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--emerald-active)', fontWeight: 700, fontFamily: 'var(--font-data)' }}>
          <AlertCircle size={16} />
          <span>ORACLE SYSTEM: ALL CORRIDORS SYNCHRONIZED</span>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-lead)', marginTop: '4px', lineHeight: 1.45, margin: '4px 0 0' }}>
          {isPlainLanguage
            ? "Your journey is running on time. All transfer gates have automatic ramps and audio guides."
            : "Dynamic atmospheric shear is nominal. Inductive surface power grid synced at 99.98%."}
        </p>
      </section>

      {/* Multi-Modal Journey Legs Timeline */}
      <section aria-label="Journey Legs Timeline">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span className="elevation-title">Multi-Modal Journey Timeline</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--teal-glow)', fontFamily: 'var(--font-mono)' }}>
            AUTOMATED TRANSFERS
          </span>
        </div>

        <div className="legs-timeline">
          {selectedRoute.legs.map((leg, index) => {
            if (leg.isTransfer) {
              return (
                <div key={`transfer-${index}`} className="transfer-card" role="region" aria-label={`Transfer: ${leg.title}`}>
                  <Footprints size={22} color="var(--solar-amber)" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--solar-amber)' }}>
                      {leg.title} ({leg.duration})
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-lead)', marginTop: '3px' }}>
                      {isPlainLanguage ? leg.plainInstruction : leg.instruction}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Accessibility size={13} color="var(--emerald-active)" />
                      <span>{leg.distance} • Level-access moving walkway</span>
                    </div>
                  </div>
                </div>
              );
            }

            const modeColor = getModeColor(leg.mode);

            return (
              <div key={`leg-${leg.legNumber}`} className="leg-card" role="region" aria-label={`Leg ${leg.legNumber}: ${leg.modeName}`}>
                {/* Leg Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: modeColor, fontWeight: 700, fontSize: '0.82rem' }}>
                    {getModeIcon(leg.mode, 18)}
                    <span>{leg.modeName}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {leg.departureTime} – {leg.arrivalTime} ({leg.duration})
                  </div>
                </div>

                {/* Stations */}
                <div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-pure)' }}>
                    {leg.from} ➔ {leg.to}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Distance: {leg.distance} • Speed: {leg.telemetry?.speed || '100 km/h'}
                  </div>
                </div>

                {/* Critical Boarding Gate / Bay */}
                <div className="leg-gate-highlight">
                  <MapPin size={14} />
                  <span>Boarding at: <strong>{leg.gate}</strong></span>
                </div>

                {/* Plain-Language Guidance for First-Time / Elderly Users */}
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', background: 'rgba(0,0,0,0.35)', padding: '8px 12px', borderRadius: '8px', borderLeft: '3px solid var(--teal-glow)' }}>
                  💡 {leg.plainInstruction}
                </div>

                {/* Step-Free & Accessibility Notes */}
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '8px' }}>
                  <Accessibility size={14} color="var(--emerald-active)" />
                  <span>{leg.accessibilityNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Primary Action Buttons */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <button
          type="button"
          className="btn-primary-hud"
          onClick={handleLaunchTracking}
          id="btn-launch-tracking"
        >
          <Radio size={19} />
          <span>Launch Live 3D Tracking HUD ➔</span>
        </button>

        <button
          type="button"
          className="btn-secondary-hud"
          onClick={() => {
            audioManager.playChime('arrival');
            setIsPassModalOpen(true);
          }}
          id="btn-open-ticket"
        >
          <Ticket size={18} />
          <span>View Holographic Boarding Pass</span>
        </button>
      </section>
    </div>
  );
}
