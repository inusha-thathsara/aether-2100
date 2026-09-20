import React, { useState } from 'react';
import { 
  Plane, 
  Bus, 
  Train, 
  Route as RoadIcon, 
  Search, 
  Settings, 
  Heart, 
  MapPin, 
  ArrowUpRight,
  Radio,
  Wind,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function HomeScreen({ 
  onStartNewJourney, 
  onOpenSettings, 
  onOpenFavorites, 
  onOpenNearby,
  selectedMode,
  setSelectedMode,
  onSelectTracking,
  isPlainLanguage = false,
  isAccessibilityView = false
}) {
  const [destinationQuery, setDestinationQuery] = useState('');

  const handleModeClick = (modeId) => {
    audioManager.playChime('click');
    setSelectedMode(modeId);
  };

  const handleSearchClick = () => {
    audioManager.playChime('arrival');
    onStartNewJourney(destinationQuery || 'Future City Hub');
  };

  const popularHubs = [
    { name: 'Quantum Marina Bay', sector: 'Sector 01 — Coastal Hub', time: '14 min via Skyway' },
    { name: 'Apex Skyport Hub 04', sector: 'Sector 02 — High Stratum Spire', time: '8 min via Maglev' },
    { name: 'Nexus Central Interchange', sector: 'Sector 04 — Civic Quad Core', time: '5 min via Smart-Road' },
    { name: 'Sub-Terran Hyper-Vault', sector: 'Sector 05 — Deep Geo Tube', time: '11 min via Maglev' },
  ];

  return (
    <div className="home-screen" role="region" aria-label="Home Entry Point">
      <div className="split-dashboard-layout">
        {/* LEFT COLUMN: THE EXACT SCREEN 1 FROM CRE8X 3.0 MOCKUP */}
        <div className="mobile-view-card">
          {/* Top Header: WHERE ARE YOU GOING? + Settings Cog */}
          <div className="home-header-row">
            <h1 className="home-main-title">
              {isPlainLanguage ? (
                <>WHERE WOULD<br />YOU LIKE TO GO?</>
              ) : (
                <>WHERE ARE<br />YOU GOING?</>
              )}
            </h1>
            <button
              type="button"
              className="settings-btn-icon"
              onClick={() => {
                audioManager.playChime('click');
                onOpenSettings();
              }}
              title="Settings & Accessibility"
              aria-label="Settings and Accessibility"
              id="btn-settings-top"
            >
              <Settings size={22} />
            </button>
          </div>

          {/* Futuristic Icon Search */}
          <div className="search-container-hud" role="search">
            <Search className="search-icon-futuristic" size={20} />
            <input
              type="text"
              className="search-input-field"
              placeholder={isPlainLanguage ? "Type your destination here..." : "Enter Destination"}
              value={destinationQuery}
              onChange={(e) => setDestinationQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchClick();
              }}
              id="input-destination-search"
              aria-label="Enter Destination"
            />
          </div>

          {/* Plain-Language Assistance Banner */}
          {(isPlainLanguage || isAccessibilityView) && (
            <div style={{ background: 'rgba(0, 240, 255, 0.08)', border: '1.5px solid var(--electric-cyan)', borderRadius: '12px', padding: '10px 14px', fontSize: '0.82rem', color: '#ffffff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💡</span>
              <span><strong>Easy Guide:</strong> Pick a ride below (Air, Bus, Train, or Road), then tap <strong>New Journey</strong>.</span>
            </div>
          )}

          {/* 4 Transport Mode Selectors in a Row */}
          <div className="mode-selector-grid" role="group" aria-label="Transport Mode Selection">
            <button
              type="button"
              className={`mode-squircle-btn ${selectedMode === 'air' ? 'active' : ''}`}
              onClick={() => handleModeClick('air')}
              title="Aero-Shuttle / Air Transport"
              aria-label="Aero-Shuttle"
              id="btn-mode-air"
            >
              <Plane size={20} />
              <span className="mode-btn-label">Air</span>
            </button>

            <button
              type="button"
              className={`mode-squircle-btn ${selectedMode === 'bus' ? 'active' : ''}`}
              onClick={() => handleModeClick('bus')}
              title="Autonomous Bus"
              aria-label="Autonomous Bus"
              id="btn-mode-bus"
            >
              <Bus size={20} />
              <span className="mode-btn-label">Bus</span>
            </button>

            <button
              type="button"
              className={`mode-squircle-btn ${selectedMode === 'train' ? 'active' : ''}`}
              onClick={() => handleModeClick('train')}
              title="Maglev Train"
              aria-label="Maglev Train"
              id="btn-mode-train"
            >
              <Train size={20} />
              <span className="mode-btn-label">Train</span>
            </button>

            <button
              type="button"
              className={`mode-squircle-btn ${selectedMode === 'road' ? 'active' : ''}`}
              onClick={() => handleModeClick('road')}
              title="Smart Road Glide Pods"
              aria-label="Smart Road"
              id="btn-mode-road"
            >
              <RoadIcon size={20} />
              <span className="mode-btn-label">Road</span>
            </button>
          </div>

          {/* Asymmetric Action Cards */}
          <div className="asymmetric-action-grid">
            {/* Left Large Electric Cyan Card: NEW JOURNEY (primary) */}
            <button
              type="button"
              className="card-new-journey-primary"
              onClick={() => {
                audioManager.playChime('arrival');
                onStartNewJourney(destinationQuery || 'Future City Hub');
              }}
              id="card-new-journey-primary"
              aria-label="Start New Journey"
            >
              <div className="new-journey-compass-circle">
                <ArrowUpRight size={28} strokeWidth={2.8} />
              </div>
              <div className="new-journey-title-bold">
                NEW<br />JOURNEY
              </div>
              <div className="new-journey-sub-label">
                Instant Route Plan
              </div>
            </button>

            {/* Right Stacked Cards: FAVORITE ROUTES & NEARBY STATIONS */}
            <div className="stacked-action-column">
              <div
                className="card-action-squircle"
                onClick={() => {
                  audioManager.playChime('click');
                  onOpenFavorites();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    audioManager.playChime('click');
                    onOpenFavorites();
                  }
                }}
                role="button"
                tabIndex={0}
                id="card-favorite-routes"
                aria-label="Favorite Routes"
              >
                <Heart className="card-action-icon" size={22} />
                <div className="card-action-title">
                  FAVORITE<br />ROUTES
                </div>
              </div>

              <div
                className="card-action-squircle"
                onClick={() => {
                  audioManager.playChime('click');
                  onOpenNearby();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    audioManager.playChime('click');
                    onOpenNearby();
                  }
                }}
                role="button"
                tabIndex={0}
                id="card-nearby-stations"
                aria-label="Nearby Stations"
              >
                <MapPin className="card-action-icon" size={22} />
                <div className="card-action-title">
                  NEARBY<br />STATIONS
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Electric Cyan Pill: SEARCH JOURNEYS */}
          <button
            type="button"
            className="btn-primary-cyan-pill"
            onClick={handleSearchClick}
            id="btn-search-journeys"
            aria-label="Search Journeys"
          >
            SEARCH JOURNEYS
          </button>
        </div>

        {/* RIGHT COLUMN: DESKTOP LIVE TRANSIT NETWORK INTELLIGENCE PANEL (VISIBLE ON >= 992px) */}
        <div className="desktop-intelligence-panel" aria-label="Smart City Fleet & Hubs Intelligence">
          {/* Card 1: 2100 Fleet Operations Real-Time Telemetry */}
          <div className="card-glass-desktop">
            <div className="panel-header-badge">
              <div className="panel-title">City Fleet Telemetry (Year 2100)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--safe-mint)', fontWeight: 700 }}>
                <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--safe-mint)', display: 'inline-block' }}></span>
                <span>AUTONOMOUS (L5) ACTIVE</span>
              </div>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Unified metropolitan multi-modal grid synchronized through inductive surface road chargers, vacuum-sealed subterranean tubes, and 3D aerial sky-corridors.
            </p>

            <div className="fleet-metrics-grid">
              <div className="metric-box">
                <Bus size={20} color="var(--safe-mint)" />
                <div className="metric-num" style={{ color: 'var(--safe-mint)' }}>142</div>
                <div className="metric-label">Mag-Buses</div>
              </div>
              <div className="metric-box">
                <Train size={20} color="var(--neon-violet)" />
                <div className="metric-num" style={{ color: 'var(--neon-violet)' }}>88</div>
                <div className="metric-label">Hyper-Maglevs</div>
              </div>
              <div className="metric-box">
                <Plane size={20} color="var(--electric-cyan)" />
                <div className="metric-num" style={{ color: 'var(--electric-cyan)' }}>64</div>
                <div className="metric-label">eVTOL Sky-Pods</div>
              </div>
              <div className="metric-box">
                <RoadIcon size={20} color="var(--warning-amber)" />
                <div className="metric-num" style={{ color: 'var(--warning-amber)' }}>310</div>
                <div className="metric-label">Glide-Pods</div>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Destination Launchpad */}
          <div className="card-glass-desktop">
            <div className="panel-header-badge">
              <div className="panel-title">Smart-City Major Hubs</div>
              <span style={{ fontSize: '0.78rem', color: 'var(--electric-cyan)', fontWeight: 700 }}>STEP-FREE ACCESS</span>
            </div>

            <div className="hubs-grid-desktop">
              {popularHubs.map((hub, idx) => (
                <div 
                  key={idx} 
                  className="hub-card-item"
                  onClick={() => {
                    audioManager.playChime('arrival');
                    onStartNewJourney(hub.name);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      audioManager.playChime('arrival');
                      onStartNewJourney(hub.name);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select destination ${hub.name}`}
                >
                  <div>
                    <div className="hub-name">{hub.name}</div>
                    <div className="hub-detail">{hub.sector} • {hub.time}</div>
                  </div>
                  <ChevronRight size={18} color="var(--electric-cyan)" />
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Oracle AI Live Advisory Banner */}
          <div className="card-glass-desktop" style={{ background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08), rgba(168, 85, 247, 0.08))', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Sparkles size={18} color="var(--electric-cyan)" />
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--electric-cyan)', textTransform: 'uppercase' }}>
                Oracle AI Route Advisor
              </div>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-lead)', lineHeight: 1.5 }}>
              Surface road induction levels at 100% capacity. Zero weather disruption reported in Aerial Sector 04. Sub-Terran Maglev transfer times reduced by 2 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
