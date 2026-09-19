import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Navigation, 
  Volume2, 
  LifeBuoy, 
  Gauge, 
  BatteryCharging, 
  ShieldCheck, 
  RotateCcw, 
  Layers, 
  CheckCircle,
  AlertTriangle,
  Compass
} from 'lucide-react';
import { LIVE_TELEMETRY, STATIONS } from '../data/transitNetwork';
import { audioManager } from '../utils/audioCues';

export function LiveTrackingScreen({ isPlainLanguage, onOpenEmergency }) {
  const [progress, setProgress] = useState(65); // Progress % along the active leg
  const [speed, setSpeed] = useState(LIVE_TELEMETRY.speedKmh);
  const [altitude, setAltitude] = useState(LIVE_TELEMETRY.altitudeM);
  const [showAirCorridors, setShowAirCorridors] = useState(true);
  const [announcementPlayed, setAnnouncementPlayed] = useState(false);

  // Smooth vehicle movement animation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 20; // Loop tracking for demonstration
        return prev + 0.4;
      });

      // Subtle fluctuation in speed & altitude for realistic 2100 telemetry
      setSpeed(Math.round(215 + Math.sin(Date.now() / 1000) * 8));
      setAltitude(Math.round(392 + Math.cos(Date.now() / 1500) * 5));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Audio announcement trigger
  const playStopAnnouncement = () => {
    audioManager.playChime('arrival');
    audioManager.speak(LIVE_TELEMETRY.audioPrompt);
    setAnnouncementPlayed(true);
  };

  // Interpolate vehicle position between Central (50%, 52%) and Skyport (78%, 26%)
  const vehicleX = 50 + ((78 - 50) * (progress / 100));
  const vehicleY = 52 + ((26 - 52) * (progress / 100));

  return (
    <div className="screen-content" role="region" aria-label="Live Vehicle Map and Tracking">
      <div className="tracking-wrapper">
        {/* Interactive Holographic 2100 Map Viewport */}
        <section className="live-map-viewport" aria-label="Interactive 2100 Transit Map">
          {/* HUD Overlay Bar */}
          <div className="map-hud-overlay">
            <div className="map-badge-live">
              <span className="pulse-dot" aria-hidden="true"></span>
              <span>LIVE SATELLITE & LIDAR FEED</span>
            </div>

            <div className="map-ctrl-cluster">
              <button
                type="button"
                className="map-btn-tiny"
                onClick={() => {
                  audioManager.playChime('click');
                  setShowAirCorridors(!showAirCorridors);
                }}
                title="Toggle 3D Aerial Corridors"
                aria-label="Toggle air corridors"
              >
                <Layers size={16} />
              </button>
              <button
                type="button"
                className="map-btn-tiny"
                onClick={() => {
                  audioManager.playChime('click');
                  setProgress(50);
                }}
                title="Re-Center on Active Vehicle"
                aria-label="Recenter on vehicle"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Holographic Multi-Tier Vector Map SVG */}
          <svg className="map-svg-canvas" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {/* Radial glow for stations */}
              <radialGradient id="stationGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
              </radialGradient>
              
              <linearGradient id="skywayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00ff9d"/>
                <stop offset="50%" stop-color="#00f0ff"/>
                <stop offset="100%" stop-color="#ffaa00"/>
              </linearGradient>

              <filter id="neonFilter">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Smart Grid Background Coordinates */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5"/>
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5"/>
            <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5"/>
            <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5"/>
            <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5"/>
            <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.5"/>

            {/* Surface Smart-Road Route (Marina to Central) */}
            <path
              d="M 18 72 Q 32 68 50 52"
              fill="none"
              stroke="#d946ef"
              strokeWidth="1.2"
              strokeDasharray="2,2"
              opacity="0.7"
            />

            {/* Sub-Terran Maglev Tube (Central to Sub-Spire) */}
            <path
              d="M 50 52 L 32 35"
              fill="none"
              stroke="#00ff9d"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Aerial Flight Corridor (Central to Apex Skyport Hub) */}
            {showAirCorridors && (
              <path
                d="M 50 52 Q 62 34 78 26"
                fill="none"
                stroke="url(#skywayGradient)"
                strokeWidth="2.5"
                filter="url(#neonFilter)"
              />
            )}

            {/* Station Hub Nodes */}
            {STATIONS.map((station) => (
              <g key={station.id}>
                <circle cx={station.x} cy={station.y} r="6" fill="url(#stationGlow)" opacity="0.4"/>
                <circle cx={station.x} cy={station.y} r="2.5" fill="#040714" stroke="#00f0ff" strokeWidth="1"/>
                <text
                  x={station.x}
                  y={station.y > 60 ? station.y - 4 : station.y + 7}
                  fill="#c8d6e5"
                  fontSize="3"
                  fontFamily="'Outfit', sans-serif"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {station.name.split(' ')[0]}
                </text>
              </g>
            ))}

            {/* Real-Time Animated Vehicle Position */}
            <g transform={`translate(${vehicleX}, ${vehicleY})`}>
              {/* Radar pulse ripples */}
              <circle cx="0" cy="0" r="5" fill="none" stroke="#ffaa00" strokeWidth="0.6" opacity="0.8">
                <animate attributeName="r" values="2;7;2" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2s" repeatCount="indefinite"/>
              </circle>
              {/* Vehicle Body */}
              <circle cx="0" cy="0" r="2.8" fill="#ffaa00" filter="url(#neonFilter)"/>
              <circle cx="0" cy="0" r="1.2" fill="#ffffff"/>
            </g>
          </svg>

          {/* Interactive Map Compass Legend */}
          <div style={{ position: 'absolute', bottom: '10px', left: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', color: 'var(--text-muted)', background: 'rgba(4,6,13,0.85)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-glass)' }}>
            <Compass size={12} color="var(--cyan-primary)" />
            <span>SECTOR 04 CIVIC AIRSPACE</span>
          </div>
        </section>

        {/* Mandatory Plain-Language Status Card (Evaluating Page 6 Brief Requirement) */}
        <section className="plain-status-card" role="status" aria-live="polite">
          <div className="plain-status-header">
            <span className="plain-status-label">
              {isPlainLanguage ? "Where You Are Right Now" : "Unified Telemetry & Journey Status"}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--emerald-accent)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
              <CheckCircle size={14} /> ON TRACK
            </span>
          </div>

          <div className="plain-status-body">
            {isPlainLanguage ? (
              <>
                You are currently inside <strong>Sky-Pod #704</strong>. You are flying smoothly through the air and will arrive at <strong>Apex Skyport</strong> in <strong>2 minutes</strong>.
              </>
            ) : (
              <>
                Cruising aboard <strong>{LIVE_TELEMETRY.currentVehicle}</strong> on Flight Corridor Bravo. Next vertiport arrival at <strong>{LIVE_TELEMETRY.destination}</strong> in <strong>{LIVE_TELEMETRY.etaMinutes} minutes</strong>.
              </>
            )}
          </div>

          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(0, 240, 255, 0.2)', paddingTop: '8px' }}>
            💡 <strong>Next Step:</strong> Prepare to disembark on the left at Cradle 04. Level boarding ramps deploy automatically.
          </div>
        </section>

        {/* Real-Time Telemetry Dashboard */}
        <section className="telemetry-dashboard" aria-label="Vehicle Telemetry">
          <div className="telemetry-card">
            <span className="telemetry-label">Speedometer</span>
            <span className="telemetry-val">{speed}</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>km/h (Ion Lift)</span>
          </div>

          <div className="telemetry-card">
            <span className="telemetry-label">Altitude</span>
            <span className="telemetry-val" style={{ color: 'var(--amber-warning)' }}>+{altitude}m</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Sky-Lane 02</span>
          </div>

          <div className="telemetry-card">
            <span className="telemetry-label">Inductive Sync</span>
            <span className="telemetry-val" style={{ color: 'var(--emerald-accent)' }}>99.8%</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Wireless Grid</span>
          </div>
        </section>

        {/* Voice Announcement & Emergency SOS Assistance */}
        <section className="assist-quick-actions" aria-label="Traveler Assistance">
          <button
            type="button"
            className="btn-voice-guide"
            onClick={playStopAnnouncement}
            id="btn-voice-prompt"
            aria-label="Play spoken arrival announcement"
          >
            <Volume2 size={16} />
            <span>Voice Update</span>
          </button>

          <button
            type="button"
            className="btn-emergency-sos"
            onClick={onOpenEmergency}
            id="btn-emergency-sos"
            aria-label="Request immediate assistance or operator connection"
          >
            <LifeBuoy size={16} />
            <span>Live Help / SOS</span>
          </button>
        </section>
      </div>
    </div>
  );
}
