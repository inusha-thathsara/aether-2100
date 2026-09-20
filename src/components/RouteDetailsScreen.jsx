import React from 'react';
import { 
  Bus, 
  Train, 
  Plane, 
  Route as RoadIcon, 
  ArrowDown, 
  Info,
  Clock,
  Compass,
  CheckCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function RouteDetailsScreen({ 
  onSelectTracking,
  isAccessibilityView,
  setIsAccessibilityView,
  selectedMode,
  setSelectedMode,
  destination = 'Future City Hub',
  isPlainLanguage = false
}) {
  const toggleAccessibility = () => {
    const next = !isAccessibilityView;
    audioManager.playChime('click');
    setIsAccessibilityView(next);
    if (next) {
      audioManager.speak("Accessibility view enabled. High contrast borders and expanded readability active.");
    }
  };

  const handleCardClick = (legName) => {
    audioManager.playChime('arrival');
    onSelectTracking();
  };

  return (
    <div className="route-screen" role="region" aria-label="Journey Route Details">
      <div className="split-dashboard-layout">
        {/* LEFT COLUMN: THE EXACT SCREEN 2 FROM CRE8X 3.0 MOCKUP */}
        <div className="mobile-view-card">
          {/* Top Header Title */}
          <h1 className="route-main-title">
            JOURNEY TO<br />{destination ? destination.toUpperCase() : 'FUTURE CITY HUB'}
          </h1>

          {/* 3-Card Sequential Timeline */}
          <div className="timeline-cards-list">
            {/* CARD 1: Autonomous Bus (Safe Mint #00E676) */}
            <div className="timeline-row-item">
              <div className="timeline-step-index">1</div>
              <div 
                className="timeline-card-box mint-theme"
                onClick={() => handleCardClick('Autonomous Bus')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick('Autonomous Bus');
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Leg 1: Autonomous Bus"
              >
                <div className="timeline-card-header">
                  <div className="timeline-card-left">
                    <div className="mode-circle-badge mint">
                      <Bus size={22} />
                    </div>
                    <div>
                      <div className="timeline-mode-name">Autonomous Bus</div>
                      <div className="timeline-mode-desc">
                        Line MB-04 • Platform Bay 3<br />
                        <span style={{ color: 'var(--safe-mint)', fontWeight: 700 }}>Departing in 2 min • Level 0</span>
                      </div>
                    </div>
                  </div>
                  <span className="status-pill-badge on-time">
                    ON TIME
                  </span>
                </div>
                {(isPlainLanguage || isAccessibilityView) && (
                  <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-main)', background: 'rgba(0, 230, 118, 0.12)', padding: '6px 10px', borderRadius: '8px', borderLeft: '3px solid var(--safe-mint)' }}>
                    💡 <strong>Easy Guide:</strong> Board Bus #MB-04 at Bay 3. It will drive you automatically to Nexus Central.
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Connecting Arrow 1 */}
            <div className="timeline-arrow-connector">
              <ArrowDown size={18} strokeWidth={2.6} color="var(--safe-mint)" />
            </div>

            {/* CARD 2: Maglev Train (With Transfer Info) */}
            <div className="timeline-row-item">
              <div className="timeline-step-index">2</div>
              <div 
                className="timeline-card-box maglev-theme"
                onClick={() => handleCardClick('Maglev Train')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick('Maglev Train');
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Leg 2: Maglev Train"
              >
                <div className="timeline-card-header">
                  <div className="timeline-card-left">
                    <div className="mode-circle-badge violet">
                      <Train size={22} />
                    </div>
                    <div>
                      <div className="timeline-mode-name">Maglev Train</div>
                      <div className="timeline-mode-desc">
                        Hyper-Tube Line HT-88<br />
                        Transfer Route 2L-A
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfer info callout */}
                <div className="transfer-info-callout">
                  <Info size={15} color="var(--electric-cyan)" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Transfer info:</strong> Your Maglev Train is on the way. Board Platform 03-Mag.
                  </span>
                </div>
                {(isPlainLanguage || isAccessibilityView) && (
                  <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-main)', background: 'rgba(168, 85, 247, 0.12)', padding: '6px 10px', borderRadius: '8px', borderLeft: '3px solid var(--neon-violet)' }}>
                    💡 <strong>Easy Guide:</strong> Board Maglev Train #88. Relax for 4 minutes while it speeds through the tube.
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Connecting Arrow 2 */}
            <div className="timeline-arrow-connector">
              <ArrowDown size={18} strokeWidth={2.6} color="var(--electric-cyan)" />
            </div>

            {/* CARD 3: Aero-Shuttle (Warning Amber #FF8300) */}
            <div className="timeline-row-item">
              <div className="timeline-step-index">3</div>
              <div 
                className="timeline-card-box amber-theme"
                onClick={() => handleCardClick('Aero-Shuttle')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick('Aero-Shuttle');
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Leg 3: Aero-Shuttle"
              >
                <div className="timeline-card-header">
                  <div className="timeline-card-left">
                    <div className="mode-circle-badge amber">
                      <Plane size={22} />
                    </div>
                    <div>
                      <div className="timeline-mode-name">Aero-Shuttle</div>
                      <div className="timeline-mode-desc">
                        eVTOL Pod #SK-704 • Deck 18<br />
                        <span style={{ color: 'var(--warning-amber)', fontWeight: 700 }}>Vertiport Cradle 04 • Altitude 420m</span>
                      </div>
                    </div>
                  </div>
                  <span className="status-pill-badge delayed">
                    DELAYED 5m
                  </span>
                </div>
                {(isPlainLanguage || isAccessibilityView) && (
                  <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-main)', background: 'rgba(255, 131, 0, 0.12)', padding: '6px 10px', borderRadius: '8px', borderLeft: '3px solid var(--warning-amber)' }}>
                    💡 <strong>Easy Guide:</strong> Step into Sky-Pod #704. It flies you gently through the air straight to your destination.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Accessibility View Toggle Switch */}
          <div className="accessibility-view-row">
            <span className="accessibility-view-label">Accessibility View</span>
            <div 
              className={`switch-toggle-hud ${isAccessibilityView ? 'active' : ''}`}
              onClick={toggleAccessibility}
              role="switch"
              aria-checked={isAccessibilityView}
              tabIndex={0}
              id="toggle-accessibility-view"
            >
              <div className="switch-thumb-hud"></div>
            </div>
          </div>

          {/* Screen 2 Mode Selector Dock */}
          <div className="screen2-mode-dock" role="group" aria-label="Filter Modes">
            <button
              type="button"
              className={`dock-icon-btn ${selectedMode === 'air' ? 'active' : ''}`}
              onClick={() => {
                audioManager.playChime('click');
                setSelectedMode('air');
              }}
              aria-label="Air Transport"
            >
              <Plane size={20} />
            </button>

            <button
              type="button"
              className={`dock-icon-btn ${selectedMode === 'bus' ? 'active' : ''}`}
              onClick={() => {
                audioManager.playChime('click');
                setSelectedMode('bus');
              }}
              aria-label="Autonomous Bus"
            >
              <Bus size={20} />
            </button>

            <button
              type="button"
              className={`dock-icon-btn ${selectedMode === 'train' ? 'active' : ''}`}
              onClick={() => {
                audioManager.playChime('click');
                setSelectedMode('train');
              }}
              aria-label="Maglev Train"
            >
              <Train size={20} />
            </button>

            <button
              type="button"
              className={`dock-icon-btn ${selectedMode === 'road' ? 'active' : ''}`}
              onClick={() => {
                audioManager.playChime('click');
                setSelectedMode('road');
              }}
              aria-label="Smart Road"
            >
              <RoadIcon size={20} />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: DESKTOP ROUTE INTELLIGENCE & TELEMETRY PANEL (VISIBLE ON >= 992px) */}
        <div className="desktop-intelligence-panel" aria-label="Route Intelligence & Itinerary Stats">
          <div className="card-glass-desktop">
            <div className="panel-header-badge">
              <div className="panel-title">Multi-Modal Journey Summary</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--safe-mint)', fontSize: '0.8rem', fontWeight: 800 }}>
                <CheckCircle size={16} />
                <span>SYNCED ITINERARY</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '14px 0' }}>
              <div className="metric-box">
                <Clock size={18} color="var(--electric-cyan)" />
                <div className="metric-num" style={{ color: 'var(--electric-cyan)' }}>12m</div>
                <div className="metric-label">Total Duration</div>
              </div>
              <div className="metric-box">
                <Compass size={18} color="var(--safe-mint)" />
                <div className="metric-num" style={{ color: 'var(--safe-mint)' }}>33 km</div>
                <div className="metric-label">Total Distance</div>
              </div>
              <div className="metric-box">
                <Zap size={18} color="var(--warning-amber)" />
                <div className="metric-num" style={{ color: 'var(--warning-amber)' }}>0.0 kg</div>
                <div className="metric-label">Clean Grid CO2</div>
              </div>
            </div>

            <div style={{ marginTop: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', padding: '16px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#ffffff', marginBottom: '8px' }}>
                Transfer Interchanges & Guidance
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--safe-mint)' }}></span>
                  <span><strong>Leg 1 → Leg 2:</strong> Nexus Interchange Gate 4-B (Step-Free Elevator, 1 min walk)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning-amber)' }}></span>
                  <span><strong>Leg 2 → Leg 3:</strong> Skyport Apex Vertiport Cradle 04 (Gravity Pod Lift to Level 18)</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="btn-primary-cyan-pill"
              style={{ marginTop: '20px' }}
              onClick={() => {
                audioManager.playChime('arrival');
                onSelectTracking();
              }}
            >
              LAUNCH LIVE 3D HUD TRACKING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteDetailsScreen;
