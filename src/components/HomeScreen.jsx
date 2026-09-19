import React, { useState } from 'react';
import { Bus, Train, Plane, Car, ArrowRightLeft, Sparkles, MapPin, Navigation, Volume2, ShieldCheck } from 'lucide-react';
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
  const [activeModeFilter, setActiveModeFilter] = useState('all');

  const getModeIcon = (iconName, size = 18) => {
    switch (iconName) {
      case 'Bus': return <Bus size={size} />;
      case 'Train': return <Train size={size} />;
      case 'Plane': return <Plane size={size} />;
      case 'Car': return <Car size={size} />;
      default: return <Navigation size={size} />;
    }
  };

  const handleSwapLocations = () => {
    audioManager.playChime('click');
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePlanJourney = () => {
    audioManager.playChime('arrival');
    // Find matching route or default to primary
    const matched = PRESET_ROUTES.find(r => r.fromId === origin && r.toId === destination) || PRESET_ROUTES[0];
    setSelectedRoute(matched);
    setActiveTab('route'); // Transition smoothly to Screen 2
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
    audioManager.speak("Oracle AI recommends the multi-modal route combining Smart Pod, Hyper-Tube, and Sky-Pod. It saves 6.5 minutes and has zero carbon emissions.");
  };

  return (
    <main className="screen-content" role="main">
      {/* Inclusive Accessibility & Plain-Language Banner */}
      <section className="assist-banner" aria-label="Accessibility Assistance">
        <div className="assist-banner-text">
          <strong>{isPlainLanguage ? "Welcome! Easy Travel Guide" : "Cre8x 3.0 Universal Access"}</strong>
          <span>
            {isPlainLanguage
              ? "All rides are fully automated and level-access. Choose where to go below."
              : "Step-free automated fleet with real-time AI guidance for all ages & abilities."}
          </span>
        </div>
        <button 
          type="button" 
          className="btn-secondary-hud" 
          style={{ padding: '6px 10px', fontSize: '0.72rem' }}
          onClick={() => {
            audioManager.playChime('click');
            setIsAccessibilityModalOpen(true);
          }}
          aria-label="Customize Access Preferences"
        >
          {isPlainLanguage ? "Options" : "Easy Mode"}
        </button>
      </section>

      {/* 4 Multi-Modal Transit Mode Selectors (Mandatory for Brief) */}
      <section aria-labelledby="modes-heading">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h2 id="modes-heading" className="hubs-slider-title">2100 Autonomous Transport Modes</h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--cyan-primary)', fontFamily: 'var(--font-hud)' }}>
            4 MODES ACTIVE
          </span>
        </div>

        <div className="modes-selector-grid">
          {MODES.map((mode) => {
            const isSelected = activeModeFilter === mode.id;
            return (
              <div
                key={mode.id}
                className={`mode-card ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  audioManager.playChime('click');
                  setActiveModeFilter(isSelected ? 'all' : mode.id);
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Mode: ${mode.name}, Speed: ${mode.speed}`}
              >
                <div className="mode-card-header">
                  <div className="mode-icon-wrap" style={{ background: `${mode.color}22`, color: mode.color }}>
                    {getModeIcon(mode.icon, 18)}
                  </div>
                  <span className="mode-fleet-badge">{mode.badge}</span>
                </div>
                <div className="mode-name">{mode.name}</div>
                <div className="mode-speed">⚡ Max {mode.speed}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Route Search Planner (Screen 1 Core) */}
      <section className="planner-hud-card" aria-labelledby="planner-heading">
        <div className="planner-title-row">
          <h2 id="planner-heading">{isPlainLanguage ? "Plan Your Trip" : "Quantum Route Planner"}</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--emerald-accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> AI Safe Grid
          </span>
        </div>

        <div className="search-input-group">
          {/* Origin Node */}
          <div className="input-node-row">
            <span className="node-pin-dot origin" aria-hidden="true"></span>
            <div style={{ flex: 1 }}>
              <label htmlFor="origin-select" style={{ fontSize: '0.66rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {isPlainLanguage ? "Starting From" : "Origin Node"}
              </label>
              <select
                id="origin-select"
                className="input-field-custom"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                aria-label="Starting station"
              >
                {STATIONS.map(st => (
                  <option key={st.id} value={st.id} style={{ background: '#0a0e1c', color: '#fff' }}>
                    {st.name} ({st.sector.split('—')[0].trim()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-6px 0', zIndex: 2 }}>
            <button
              type="button"
              className="map-btn-tiny"
              onClick={handleSwapLocations}
              title="Swap Origin and Destination"
              aria-label="Swap starting point and destination"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* Destination Node */}
          <div className="input-node-row">
            <span className="node-pin-dot dest" aria-hidden="true"></span>
            <div style={{ flex: 1 }}>
              <label htmlFor="dest-select" style={{ fontSize: '0.66rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
                {isPlainLanguage ? "Going To" : "Destination Spire"}
              </label>
              <select
                id="dest-select"
                className="input-field-custom"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Destination station"
              >
                {STATIONS.map(st => (
                  <option key={st.id} value={st.id} style={{ background: '#0a0e1c', color: '#fff' }}>
                    {st.name} ({st.sector.split('—')[0].trim()})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Oracle AI Predictive Optimization Card */}
        <div className="ai-oracle-box">
          <Sparkles size={20} className="ai-avatar-icon" />
          <div style={{ flex: 1 }}>
            <div className="ai-oracle-text">
              <strong>Oracle AI Predictive Advisory:</strong>
              <div>
                Multi-modal path active: Connecting <strong>Smart-Road Pod</strong> ➔ <strong>Hyper-Tube Maglev</strong> ➔ <strong>eVTOL Sky-Pod</strong>. Saves 6.5 mins, 0% congestion.
              </div>
            </div>
          </div>
          <button 
            type="button" 
            className="map-btn-tiny" 
            onClick={speakAdvisory} 
            title="Listen to AI Recommendation"
            aria-label="Read AI recommendation aloud"
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
          {isPlainLanguage ? "Show My Best Route ➔" : "Discover Unified Route ➔"}
        </button>
      </section>

      {/* Popular 2100 Smart City Spire Hubs */}
      <section aria-labelledby="hubs-heading">
        <h2 id="hubs-heading" className="hubs-slider-title" style={{ marginBottom: '8px' }}>
          {isPlainLanguage ? "Popular Places To Go" : "Priority Smart Hubs (Year 2100)"}
        </h2>
        <div className="hubs-row">
          {STATIONS.map((hub) => (
            <div
              key={hub.id}
              className="hub-chip"
              onClick={() => handleQuickHubSelect(hub.id)}
              role="button"
              tabIndex={0}
            >
              <span className="hub-chip-name">{hub.name}</span>
              <span className="hub-chip-sector">{hub.sector.split('—')[1] || hub.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Preset Multi-Modal Route Cards */}
      <section aria-labelledby="preset-routes-heading">
        <h2 id="preset-routes-heading" className="hubs-slider-title" style={{ marginBottom: '10px' }}>
          {isPlainLanguage ? "Suggested Trips" : "Pre-Synchronized Express Corridors"}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {PRESET_ROUTES.map((route) => (
            <div
              key={route.id}
              className="card-hud"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                audioManager.playChime('arrival');
                setSelectedRoute(route);
                setActiveTab('route');
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select route: ${route.name}`}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="route-tag-pill">{route.name}</span>
                <span style={{ fontFamily: 'var(--font-hud)', fontSize: '0.82rem', color: 'var(--cyan-primary)' }}>
                  {route.totalDuration}
                </span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {route.from} ➔ {route.to}
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isPlainLanguage ? route.plainSummary : route.aiRecommendation}
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--emerald-accent)', fontFamily: 'var(--font-mono)' }}>
                  ✓ {route.status}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>•</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {route.legs.filter(l => !l.isTransfer).length} Transit Modes
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
