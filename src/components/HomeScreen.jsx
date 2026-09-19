import React, { useState } from 'react';
import { 
  Bus, 
  Train, 
  Plane, 
  Car, 
  ArrowRightLeft, 
  Sparkles, 
  MapPin, 
  Navigation, 
  Volume2, 
  ShieldCheck, 
  Layers, 
  Wind, 
  ArrowUpRight,
  SunMedium
} from 'lucide-react';
import { MODES, STATIONS, PRESET_ROUTES } from '../data/transitNetwork';
import { audioManager } from '../utils/audioCues';

export function HomeScreen({ 
  selectedRoute, 
  setSelectedRoute, 
  setActiveTab, 
  isPlainLanguage,
  setIsAccessibilityModalOpen 
}) {
  const [origin, setOrigin] = useState(STATIONS[0].id);
  const [destination, setDestination] = useState(STATIONS[2].id);
  const [activeTier, setActiveTier] = useState('all');

  const handleSwapLocations = () => {
    audioManager.playChime('click');
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePlanJourney = () => {
    audioManager.playChime('arrival');
    const matched = PRESET_ROUTES.find(r => r.fromId === origin && r.toId === destination) || PRESET_ROUTES[0];
    setSelectedRoute(matched);
    setActiveTab('route');
  };

  const handleQuickHubSelect = (hubId) => {
    audioManager.playChime('click');
    if (hubId === origin) {
      setDestination(STATIONS[1].id);
    } else {
      setDestination(hubId);
    }
  };

  const speakAdvisory = () => {
    audioManager.speak("Oracle AI recommends the multi-modal corridor connecting Smart Glide-Pod, Hyper-Tube Maglev, and eVTOL Sky-Pod. It bypasses surface congestion and saves 6.5 minutes.");
  };

  const currentOriginStation = STATIONS.find(s => s.id === origin) || STATIONS[0];
  const currentDestStation = STATIONS.find(s => s.id === destination) || STATIONS[2];

  return (
    <main className="screen-content" role="main">
      {/* 2100 Atmospheric Weather & Sector Greeting */}
      <section className="hero-greeting-box" aria-label="City Status">
        <div className="hero-subtitle">
          <Wind size={14} />
          <span>Stratum Airspace Calm • 23°C • 0.00kg Carbon Grid</span>
        </div>
        <h2 className="hero-main-title">
          {isPlainLanguage ? "Where would you like to travel?" : "Plan Your Journey Across 2100"}
        </h2>
      </section>

      {/* Universal Plain-Language Accessibility Banner */}
      <section className="card-hud" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(0, 242, 254, 0.08))', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '16px 18px' }} aria-label="Universal Accessibility">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--solar-amber)' }}>
              {isPlainLanguage ? "Easy Travel Mode Active" : "Universal Inclusivity Standard"}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-lead)', margin: '3px 0 0', lineHeight: 1.4 }}>
              {isPlainLanguage
                ? "All transit pods are step-free and automated. Select your stops below."
                : "Continuous level-access boarding and audio-visual guidance for all ages."}
            </p>
          </div>
          <button 
            type="button" 
            className="btn-secondary-hud" 
            style={{ padding: '8px 14px', fontSize: '0.76rem', whiteSpace: 'nowrap' }}
            onClick={() => {
              audioManager.playChime('click');
              setIsAccessibilityModalOpen(true);
            }}
          >
            {isPlainLanguage ? "Change Settings" : "Easy Mode"}
          </button>
        </div>
      </section>

      {/* Creative 2100 Vertical Elevation Slices Widget */}
      <section className="elevation-slice-deck" aria-label="2100 Transit Elevation Slices">
        <div className="elevation-deck-header">
          <span className="elevation-title">3D Transit Elevation Tiers</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--teal-glow)', fontFamily: 'var(--font-data)', fontWeight: 600 }}>
            4 MODES AUTO-SYNCED
          </span>
        </div>

        {/* Tier 1: Skyways (+420m) */}
        <div 
          className={`elevation-tier-row ${activeTier === 'sky' ? 'active' : ''}`}
          onClick={() => {
            audioManager.playChime('click');
            setActiveTier(activeTier === 'sky' ? 'all' : 'sky');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="tier-badge sky">+420m SKYWAY</span>
            <div>
              <div className="tier-name">eVTOL Sky-Pods</div>
              <div className="tier-speed">3D Holographic Air Corridors • Max 240 km/h</div>
            </div>
          </div>
          <Plane size={18} color="var(--solar-amber)" />
        </div>

        {/* Tier 2: Surface Inductive Roads (0m) */}
        <div 
          className={`elevation-tier-row ${activeTier === 'surface' ? 'active' : ''}`}
          onClick={() => {
            audioManager.playChime('click');
            setActiveTier(activeTier === 'surface' ? 'all' : 'surface');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="tier-badge surface">0m SURFACE</span>
            <div>
              <div className="tier-name">Smart-Road Pods & Mag-Bus</div>
              <div className="tier-speed">Resonant Nano-Induction Grid • 95-120 km/h</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Car size={18} color="var(--teal-glow)" />
            <Bus size={18} color="var(--teal-glow)" />
          </div>
        </div>

        {/* Tier 3: Subterranean Bedrock (-45m) */}
        <div 
          className={`elevation-tier-row ${activeTier === 'sub' ? 'active' : ''}`}
          onClick={() => {
            audioManager.playChime('click');
            setActiveTier(activeTier === 'sub' ? 'all' : 'sub');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="tier-badge sub">-45m SUB-BEDROCK</span>
            <div>
              <div className="tier-name">Hyper-Tube Maglev Express</div>
              <div className="tier-speed">Vacuum Sealed Tubes • Max 720 km/h</div>
            </div>
          </div>
          <Train size={18} color="var(--emerald-active)" />
        </div>
      </section>

      {/* Modern Tactical Route Planner Card */}
      <section className="planner-hud-card" aria-label="Route Planner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-pure)' }}>
            {isPlainLanguage ? "Select Your Route" : "Multi-Modal Corridor Builder"}
          </h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--emerald-active)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <ShieldCheck size={14} /> AI Safe Grid
          </span>
        </div>

        <div className="search-input-group">
          {/* Origin Station */}
          <div className="input-node-row">
            <span className="node-pin-dot origin"></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-data)', fontWeight: 600 }}>
                {isPlainLanguage ? "Starting Station" : "Origin Node"}
              </div>
              <select
                id="origin-select"
                className="input-field-custom"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                aria-label="Select starting hub"
              >
                {STATIONS.map(st => (
                  <option key={st.id} value={st.id} style={{ background: '#0b1224', color: '#fff' }}>
                    {st.name} — {st.sector.split('—')[1] || st.level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Floating Swap Button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-8px 0', zIndex: 2 }}>
            <button
              type="button"
              className="swap-btn-floating"
              onClick={handleSwapLocations}
              title="Swap Origin and Destination"
              aria-label="Swap starting and ending stations"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* Destination Station */}
          <div className="input-node-row">
            <span className="node-pin-dot dest"></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-data)', fontWeight: 600 }}>
                {isPlainLanguage ? "Destination Station" : "Destination Spire"}
              </div>
              <select
                id="dest-select"
                className="input-field-custom"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Select destination hub"
              >
                {STATIONS.map(st => (
                  <option key={st.id} value={st.id} style={{ background: '#0b1224', color: '#fff' }}>
                    {st.name} — {st.sector.split('—')[1] || st.level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Oracle AI Predictive Box with Animated Waveform */}
        <div className="ai-oracle-box">
          <div className="ai-avatar-wrap">
            <Sparkles size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="ai-oracle-text">
              <strong>
                Oracle AI Route Optimizer
                <span className="soundwave-bar-group" aria-hidden="true">
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                  <span className="wave-bar"></span>
                </span>
              </strong>
              <div style={{ marginTop: '2px' }}>
                Combines <strong>Smart-Road Pod</strong> ➔ <strong>Hyper-Tube</strong> ➔ <strong>Sky-Pod</strong>. 13 min duration, bypassing all surface bottlenecks.
              </div>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-icon-hud" 
            style={{ width: '38px', height: '38px', flexShrink: 0 }}
            onClick={speakAdvisory}
            title="Read AI recommendation aloud"
            aria-label="Play AI voice briefing"
          >
            <Volume2 size={16} />
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          className="btn-primary-hud"
          onClick={handlePlanJourney}
          id="btn-discover-route"
        >
          <span>{isPlainLanguage ? "Review Trip Details ➔" : "View Synchronized Route ➔"}</span>
        </button>
      </section>

      {/* Popular 2100 Smart City Spire Hubs */}
      <section aria-label="Popular Metropolitan Hubs">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span className="elevation-title">Metropolitan Hub Presets</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tap to set destination</span>
        </div>
        <div className="hubs-row">
          {STATIONS.map((hub) => (
            <div
              key={hub.id}
              className="hub-chip"
              onClick={() => handleQuickHubSelect(hub.id)}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="hub-chip-name">{hub.name}</span>
                <ArrowUpRight size={14} color="var(--teal-glow)" />
              </div>
              <span className="hub-chip-sector">{hub.sector.split('—')[1] || hub.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Preset Express Corridors */}
      <section aria-label="Pre-Synchronized Corridors">
        <span className="elevation-title" style={{ display: 'block', marginBottom: '10px' }}>
          Pre-Synchronized Express Paths
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {PRESET_ROUTES.map((route) => (
            <div
              key={route.id}
              className="card-hud"
              style={{ cursor: 'pointer', padding: '18px' }}
              onClick={() => {
                audioManager.playChime('arrival');
                setSelectedRoute(route);
                setActiveTab('route');
              }}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="route-tag-pill">{route.name}</span>
                <span style={{ fontFamily: 'var(--font-data)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--teal-glow)' }}>
                  {route.totalDuration}
                </span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-pure)' }}>
                {route.from} ➔ {route.to}
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                {isPlainLanguage ? route.plainSummary : route.aiRecommendation}
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                <span style={{ color: 'var(--emerald-active)', fontWeight: 600 }}>✓ {route.status}</span>
                <span>•</span>
                <span>{route.legs.filter(l => !l.isTransfer).length} Transit Modes</span>
                <span>•</span>
                <span style={{ color: 'var(--solar-amber)' }}>{route.accessibilityScore.split(' ')[0]} Accessible</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
