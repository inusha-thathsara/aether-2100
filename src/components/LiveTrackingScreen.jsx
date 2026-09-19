import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Navigation, 
  Volume2, 
  LifeBuoy, 
  Layers, 
  RotateCcw, 
  CheckCircle,
  Compass,
  Wind,
  Zap,
  Gauge
} from 'lucide-react';
import { LIVE_TELEMETRY, STATIONS } from '../data/transitNetwork';
import { audioManager } from '../utils/audioCues';

export function LiveTrackingScreen({ isPlainLanguage, onOpenEmergency }) {
  const [progress, setProgress] = useState(65);
  const [speed, setSpeed] = useState(LIVE_TELEMETRY.speedKmh);
  const [altitude, setAltitude] = useState(LIVE_TELEMETRY.altitudeM);
  const [showAirCorridors, setShowAirCorridors] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return 20;
        return prev + 0.35;
      });

      setSpeed(Math.round(216 + Math.sin(Date.now() / 1000) * 6));
      setAltitude(Math.round(394 + Math.cos(Date.now() / 1400) * 4));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const playStopAnnouncement = () => {
    audioManager.playChime('arrival');
    audioManager.speak(LIVE_TELEMETRY.audioPrompt);
  };

  // Interpolate vehicle position smoothly along the curved skyway
  const vehicleX = 50 + ((78 - 50) * (progress / 100));
  const vehicleY = 52 + ((26 - 52) * (progress / 100)) - (Math.sin((progress / 100) * Math.PI) * 4);

  return (
    <div className="screen-content" role="region" aria-label="Live Vehicle Map and Tracking">
      {/* 2100 Spatial Holographic Map Viewport */}
      <section className="live-map-viewport" aria-label="2100 Spatial Transit Map">
        {/* HUD Top Status Overlay */}
        <div className="map-hud-overlay">
          <div className="map-badge-live">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span>SATELLITE & LIDAR FEED ACTIVE</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
            <button
              type="button"
              className="btn-icon-hud"
              style={{ width: '36px', height: '36px', borderRadius: '10px' }}
              onClick={() => {
                audioManager.playChime('click');
                setShowAirCorridors(!showAirCorridors);
              }}
              title="Toggle Aerial Sky-Lanes"
              aria-label="Toggle air corridors"
            >
              <Layers size={17} />
            </button>
            <button
              type="button"
              className="btn-icon-hud"
              style={{ width: '36px', height: '36px', borderRadius: '10px' }}
              onClick={() => {
                audioManager.playChime('click');
                setProgress(50);
              }}
              title="Center Drone Camera on Vehicle"
              aria-label="Recenter on vehicle"
            >
              <RotateCcw size={17} />
            </button>
          </div>
        </div>

        {/* Spatial Vector Map SVG */}
        <svg className="map-svg-canvas" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Luminous gradients */}
            <radialGradient id="hubHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0"/>
            </radialGradient>

            <linearGradient id="skywayGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981"/>
              <stop offset="40%" stopColor="#00f2fe"/>
              <stop offset="100%" stopColor="#f59e0b"/>
            </linearGradient>

            <filter id="spatialGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Perspective Horizon Ground Lines */}
          <ellipse cx="50" cy="55" rx="46" ry="32" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.6"/>
          <ellipse cx="50" cy="55" rx="34" ry="22" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.6"/>

          {/* Coordinate Grid Guides */}
          <line x1="10" y1="55" x2="90" y2="55" stroke="rgba(0, 242, 254, 0.06)" strokeWidth="0.5"/>
          <line x1="50" y1="15" x2="50" y2="90" stroke="rgba(0, 242, 254, 0.06)" strokeWidth="0.5"/>

          {/* 1. Surface Road Waypoint (Marina to Central) */}
          <path
            d="M 18 72 Q 34 68 50 52"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="1.2"
            strokeDasharray="2,2"
            opacity="0.7"
          />

          {/* 2. Sub-Terran Maglev Tube (Central to Sub-Spire) */}
          <path
            d="M 50 52 L 32 35"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.2"
            opacity="0.8"
          />

          {/* 3. 3D Aerial Skyway Corridor (Central to Apex Vertiport) */}
          {showAirCorridors && (
            <path
              d="M 50 52 Q 60 30 78 26"
              fill="none"
              stroke="url(#skywayGlow)"
              strokeWidth="2.8"
              filter="url(#spatialGlow)"
            />
          )}

          {/* Metropolitan Station Spire Nodes */}
          {STATIONS.map((station) => (
            <g key={station.id}>
              <circle cx={station.x} cy={station.y} r="7" fill="url(#hubHalo)" opacity="0.4"/>
              <circle cx={station.x} cy={station.y} r="2.8" fill="#070c18" stroke="#00f2fe" strokeWidth="1.2"/>
              <text
                x={station.x}
                y={station.y > 58 ? station.y - 4.5 : station.y + 7.5}
                fill="#f1f5f9"
                fontSize="3.2"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontWeight="700"
                textAnchor="middle"
              >
                {station.name.split(' ')[0]}
              </text>
            </g>
          ))}

          {/* Active Animated Pod Marker with Aerodynamic Thruster Wake */}
          <g transform={`translate(${vehicleX}, ${vehicleY})`}>
            {/* Sonar Radar Pulses */}
            <circle cx="0" cy="0" r="5" fill="none" stroke="#f59e0b" strokeWidth="0.6">
              <animate attributeName="r" values="2;9;2" dur="2.2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.2s" repeatCount="indefinite"/>
            </circle>
            {/* Thruster Halo */}
            <circle cx="0" cy="0" r="3.2" fill="#f59e0b" filter="url(#spatialGlow)"/>
            <circle cx="0" cy="0" r="1.4" fill="#ffffff"/>
          </g>
        </svg>

        {/* Map Bottom Legend */}
        <div style={{ position: 'absolute', bottom: '12px', left: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(8, 12, 24, 0.85)', padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--border-glass)', backdropFilter: 'blur(10px)' }}>
          <Compass size={13} color="var(--teal-glow)" />
          <span style={{ fontFamily: 'var(--font-data)', fontWeight: 600 }}>SECTOR 04 CIVIC AIRSPACE • CORRIDOR BRAVO</span>
        </div>
      </section>

      {/* Mandatory Plain-Language Status Card (Evaluating Page 6 Brief Requirement) */}
      <section className="plain-status-card" role="status" aria-live="polite">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="plain-status-label">
            {isPlainLanguage ? "Your Current Ride" : "Real-Time Telemetry & Progress"}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--emerald-active)', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
            <CheckCircle size={15} /> ON TRACK
          </span>
        </div>

        <div className="plain-status-body">
          {isPlainLanguage ? (
            <>
              You are currently flying inside <strong>Sky-Pod #704</strong>. You will arrive safely at <strong>Apex Skyport</strong> in <strong>2 minutes</strong>.
            </>
          ) : (
            <>
              Cruising aboard <strong>{LIVE_TELEMETRY.currentVehicle}</strong> on Flight Corridor Bravo. Scheduled vertiport arrival at <strong>{LIVE_TELEMETRY.destination}</strong> in <strong>{LIVE_TELEMETRY.etaMinutes} minutes</strong>.
            </>
          )}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
          💡 <strong>Next Step:</strong> Prepare to disembark on the left at Cradle 04. Automated level ramps deploy upon touch-down.
        </div>
      </section>

      {/* Live Vehicle Telemetry Dashboard */}
      <section className="telemetry-dashboard" aria-label="Vehicle Telemetry">
        <div className="telemetry-card">
          <span className="telemetry-label">Speedometer</span>
          <span className="telemetry-val">{speed}</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>km/h • Ion Lift</span>
        </div>

        <div className="telemetry-card">
          <span className="telemetry-label">Altitude</span>
          <span className="telemetry-val" style={{ color: 'var(--solar-amber)' }}>+{altitude}m</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>Sky-Lane 02</span>
        </div>

        <div className="telemetry-card">
          <span className="telemetry-label">Inductive Sync</span>
          <span className="telemetry-val" style={{ color: 'var(--emerald-active)' }}>99.8%</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>Wireless Grid</span>
        </div>
      </section>

      {/* Spoken Announcement & Live SOS Concierge */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} aria-label="Traveler Support">
        <button
          type="button"
          className="btn-secondary-hud"
          onClick={playStopAnnouncement}
          id="btn-voice-prompt"
          style={{ padding: '14px', fontSize: '0.82rem', gap: '8px' }}
          aria-label="Play vocal stop announcement"
        >
          <Volume2 size={18} color="var(--teal-glow)" />
          <span>Vocal Briefing</span>
        </button>

        <button
          type="button"
          className="btn-secondary-hud"
          onClick={onOpenEmergency}
          id="btn-emergency-sos"
          style={{ padding: '14px', fontSize: '0.82rem', borderColor: 'rgba(244, 63, 94, 0.4)', color: 'var(--coral-alert)', gap: '8px' }}
          aria-label="Connect to human assistance officer"
        >
          <LifeBuoy size={18} color="var(--coral-alert)" />
          <span>Live Help / SOS</span>
        </button>
      </section>
    </div>
  );
}
