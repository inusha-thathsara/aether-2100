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
  Accessibility
} from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function RouteDetailsScreen({ 
  selectedRoute, 
  setActiveTab, 
  isPlainLanguage, 
  setIsPassModalOpen 
}) {
  const getModeIcon = (modeId, size = 16) => {
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
      case 'bus': return 'var(--cyan-primary)';
      case 'train': return 'var(--emerald-accent)';
      case 'air': return 'var(--amber-warning)';
      case 'road': return '#d946ef';
      default: return 'var(--cyan-primary)';
    }
  };

  const handleLaunchTracking = () => {
    audioManager.playChime('arrival');
    setActiveTab('tracking'); // Switch to Screen 3
  };

  const speakSummary = () => {
    const text = isPlainLanguage
      ? `This route takes ${selectedRoute.totalDuration}. ${selectedRoute.plainSummary}`
      : `Your multi-modal route from ${selectedRoute.from} to ${selectedRoute.to} is on schedule. Total travel time is ${selectedRoute.totalDuration}. All transfer hubs feature full step-free accessibility.`;
    audioManager.speak(text);
  };

  return (
    <div className="screen-content" role="region" aria-label="Route and Journey Details">
      {/* Screen 2 Hero Summary Card (Clear Information Hierarchy) */}
      <section className="route-hero-card">
        <div className="route-hero-top">
          <span className="route-tag-pill">{selectedRoute.name}</span>
          <div className={`route-delay-status ${selectedRoute.statusType || 'normal'}`}>
            <CheckCircle2 size={14} />
            <span>{selectedRoute.status}</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-hud)' }}>
            Total Travel Time
          </div>
          <div className="route-duration-display">
            <span className="duration-big">{selectedRoute.totalDuration}</span>
            <span className="duration-sub">• {selectedRoute.totalDistance} total</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600 }}>
          <MapPin size={16} color="var(--cyan-primary)" />
          <span>{selectedRoute.from}</span>
          <ArrowRight size={14} color="var(--text-dim)" />
          <span>{selectedRoute.to}</span>
        </div>

        {/* Critical Information Meta Strip */}
        <div className="route-meta-strip">
          <div className="meta-item">
            <span className="meta-item-label">Crowd Density</span>
            <span className="meta-item-val" style={{ color: 'var(--emerald-accent)' }}>Low (32%)</span>
          </div>
          <div className="meta-item">
            <span className="meta-item-label">Energy / Carbon</span>
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
          style={{ width: '100%', fontSize: '0.75rem', padding: '8px 12px' }}
          aria-label="Read journey details aloud"
        >
          <Volume2 size={16} /> Listen to Journey Overview
        </button>
      </section>

      {/* Real-Time Delay & Corridor Update */}
      <section 
        className="card-hud" 
        style={{ 
          background: 'rgba(0, 255, 157, 0.06)', 
          border: '1px solid var(--emerald-accent)',
          padding: '12px 14px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--emerald-accent)', fontWeight: 700, fontFamily: 'var(--font-hud)' }}>
          <AlertCircle size={16} />
          <span>REAL-TIME CORRIDOR STATUS: ALL SECTORS CLEAR</span>
        </div>
        <p style={{ fontSize: '0.76rem', color: 'var(--text-main)', marginTop: '4px', lineHeight: 1.4 }}>
          {isPlainLanguage
            ? "Everything is running on time. Transfer platforms have clear automatic signs and step-free access."
            : "Surface inductive grids running at 100% capacity. Upper flight corridors have zero atmospheric shear."}
        </p>
      </section>

      {/* Multi-Modal Journey Legs Timeline */}
      <section aria-label="Step by step travel legs">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 className="hubs-slider-title">Multi-Modal Journey Timeline</h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-mono)' }}>
            AUTO-SYNCED
          </span>
        </div>

        <div className="legs-timeline">
          {selectedRoute.legs.map((leg, index) => {
            if (leg.isTransfer) {
              return (
                <div key={`transfer-${index}`} className="transfer-card" role="region" aria-label={`Transfer: ${leg.title}`}>
                  <Footprints size={20} color="var(--amber-warning)" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-warning)' }}>
                      {leg.title} ({leg.duration})
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      {isPlainLanguage ? leg.plainInstruction : leg.instruction}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Accessibility size={12} color="var(--emerald-accent)" />
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
                <div className="leg-header">
                  <div className="leg-mode-badge" style={{ color: modeColor }}>
                    {getModeIcon(leg.mode, 16)}
                    <span>{leg.modeName}</span>
                  </div>
                  <div className="leg-time-tag">
                    {leg.departureTime} – {leg.arrivalTime} ({leg.duration})
                  </div>
                </div>

                {/* Stations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div className="leg-stop-title">{leg.from} ➔ {leg.to}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Distance: {leg.distance} • Telemetry: {leg.telemetry?.speed || '100 km/h'}
                  </div>
                </div>

                {/* Critical Information: Boarding Bay / Gate */}
                <div className="leg-gate-highlight">
                  <MapPin size={14} />
                  <span>Boarding at: <strong>{leg.gate}</strong></span>
                </div>

                {/* Plain-Language Guidance for First-Time / Elderly Users */}
                <div style={{ fontSize: '0.78rem', color: '#e0f2fe', background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px' }}>
                  💡 {leg.plainInstruction}
                </div>

                {/* Accessibility Details */}
                <div className="leg-accessibility-row">
                  <Accessibility size={14} color="var(--emerald-accent)" />
                  <span>{leg.accessibilityNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Primary Action Buttons */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
        <button
          type="button"
          className="btn-primary-hud"
          onClick={handleLaunchTracking}
          id="btn-launch-tracking"
        >
          <Radio size={18} />
          <span>Launch Live Map & Tracking HUD ➔</span>
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
          <span>View Biometric Boarding Pass</span>
        </button>
      </section>
    </div>
  );
}
