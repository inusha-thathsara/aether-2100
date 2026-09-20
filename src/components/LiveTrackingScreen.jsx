import React, { useState, useEffect } from 'react';
import { Plus, Minus, Plane, Bus, Train, Layers, Compass, Wind, Zap, AlertTriangle } from 'lucide-react';
import { audioManager } from '../utils/audioCues';

export function LiveTrackingScreen({ onOpenAlternatives, onOpenEmergency, isPlainLanguage = false }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [podProgress, setPodProgress] = useState(35);
  const [busProgress, setBusProgress] = useState(60);
  const [isWide, setIsWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth continuous animation for vehicles
  useEffect(() => {
    const interval = setInterval(() => {
      setPodProgress((prev) => (prev >= 99 ? 1 : prev + 0.35));
      setBusProgress((prev) => (prev >= 99 ? 2 : prev + 0.28));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleZoomIn = () => {
    audioManager.playChime('click');
    setZoomLevel((prev) => Math.min(prev + 0.2, 1.6));
  };

  const handleZoomOut = () => {
    audioManager.playChime('click');
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.7));
  };

  const handleAlternativesClick = () => {
    audioManager.playChime('click');
    onOpenAlternatives();
  };

  // Interpolated vehicle coordinates based on current view (Desktop Widescreen vs Mobile)
  // 1. Aero-Shuttle (Flying on Neon Violet Skyway)
  const aeroX = isWide 
    ? 120 + (podProgress * 9.8) 
    : 80 + (podProgress * 2.4);
  const aeroY = isWide 
    ? 220 - Math.sin((podProgress / 100) * Math.PI * 2) * 35 
    : 240 - (podProgress * 1.1) + Math.sin(podProgress / 10) * 12;

  // 2. Maglev Train (Cruising along the transit artery)
  const maglevX = isWide 
    ? 200 + (busProgress * 8.2) 
    : 140 + (busProgress * 1.8);
  const maglevY = isWide 
    ? 380 - (Math.cos((busProgress / 100) * Math.PI * 2) * 28)
    : 320 - (busProgress * 1.7);

  // 3. Autonomous Bus (Surface road)
  const busX = isWide 
    ? 1050 - (podProgress * 7.5) 
    : 190;
  const busY = isWide 
    ? 460 + Math.sin((podProgress / 100) * Math.PI) * 20 
    : 420;

  return (
    <div className="live-tracking-screen" role="region" aria-label="Live Visual Tracking HUD">
      {/* Top HUD Telemetry Ribbon */}
      <div className="map-top-hud-bar">
        <div className="telemetry-live-badge">
          <span className="pulse-dot-green"></span>
          <span>SATELLITE & LIDAR ACTIVE • SECTOR 04 SKYWAY (+420M)</span>
        </div>

        <div className="hud-telemetry-stats">
          <div className="telemetry-pill">
            <Wind size={13} color="var(--electric-cyan)" />
            <span>240 KM/H</span>
          </div>
          <div className="telemetry-pill">
            <Zap size={13} color="var(--safe-mint)" />
            <span>INDUCTIVE SYNC 100%</span>
          </div>
        </div>
      </div>

      {/* Zoom Controls (+ / -) in Top Right */}
      <div className="zoom-pill-controls" role="toolbar" aria-label="Map Zoom">
        <button
          type="button"
          className="zoom-btn"
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          className="zoom-btn"
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <Minus size={18} />
        </button>
      </div>

      {/* Full-Bleed 3D Isometric Map Canvas */}
      <div 
        className="isometric-map-canvas-container"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}
      >
        <svg 
          className="isometric-svg-map" 
          viewBox={isWide ? "0 0 1200 650" : "0 0 400 650"} 
          preserveAspectRatio={isWide ? "xMidYMid meet" : "xMidYMid slice"}
        >
          <defs>
            {/* Glow Filters */}
            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="violetGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 3D Isometric Shading Gradients */}
            <linearGradient id="bldgFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e2538" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0a0d16" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="bldgSide" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#141926" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#080a11" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="bldgTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2c3650" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#182030" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* ===============================================================
              DESKTOP PANORAMIC ISOMETRIC VIEW (isWide === true, 1200x650)
              =============================================================== */}
          {isWide ? (
            <g className="desktop-isometric-scene">
              {/* Isometric Ground Grid Lines */}
              <g stroke="rgba(255, 255, 255, 0.035)" strokeWidth="1" fill="none">
                {Array.from({ length: 30 }).map((_, i) => (
                  <line key={`d-grid1-${i}`} x1="-200" y1={i * 45} x2="1400" y2={i * 45 + 500} />
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                  <line key={`d-grid2-${i}`} x1="1400" y1={i * 45} x2="-200" y2={i * 45 + 500} />
                ))}
              </g>

              {/* 3D Isometric Buildings Across the City */}
              <g className="isometric-buildings" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
                {/* Cluster 1: Far Left High-Rises */}
                <polygon points="60,220 95,195 130,220 95,245" fill="url(#bldgTop)" />
                <polygon points="60,220 95,245 95,360 60,335" fill="url(#bldgFront)" />
                <polygon points="95,245 130,220 130,335 95,360" fill="url(#bldgSide)" />

                <polygon points="140,160 175,135 210,160 175,185" fill="url(#bldgTop)" />
                <polygon points="140,160 175,185 175,320 140,295" fill="url(#bldgFront)" />
                <polygon points="175,185 210,160 210,295 175,320" fill="url(#bldgSide)" />

                {/* Cluster 2: Central Smart Spire & Apex Vertiport */}
                <polygon points="320,120 370,85 420,120 370,155" fill="url(#bldgTop)" />
                <polygon points="320,120 370,155 370,360 320,325" fill="url(#bldgFront)" />
                <polygon points="370,155 420,120 420,325 370,360" fill="url(#bldgSide)" />

                <polygon points="440,210 480,180 520,210 480,240" fill="url(#bldgTop)" />
                <polygon points="440,210 480,240 480,410 440,380" fill="url(#bldgFront)" />
                <polygon points="480,240 520,210 520,380 480,410" fill="url(#bldgSide)" />

                {/* Cluster 3: Mid-Right Metropolis Blocks */}
                <polygon points="620,170 665,140 710,170 665,200" fill="url(#bldgTop)" />
                <polygon points="620,170 665,200 665,390 620,360" fill="url(#bldgFront)" />
                <polygon points="665,200 710,170 710,360 665,390" fill="url(#bldgSide)" />

                <polygon points="730,130 775,100 820,130 775,160" fill="url(#bldgTop)" />
                <polygon points="730,130 775,160 775,340 730,310" fill="url(#bldgFront)" />
                <polygon points="775,160 820,130 820,310 775,340" fill="url(#bldgSide)" />

                {/* Cluster 4: Far Right Coastal Spire */}
                <polygon points="920,190 965,160 1010,190 965,220" fill="url(#bldgTop)" />
                <polygon points="920,190 965,220 965,390 920,360" fill="url(#bldgFront)" />
                <polygon points="965,220 1010,190 1010,360 965,390" fill="url(#bldgSide)" />

                <polygon points="1030,240 1070,215 1110,240 1070,265" fill="url(#bldgTop)" />
                <polygon points="1030,240 1070,265 1070,430 1030,405" fill="url(#bldgFront)" />
                <polygon points="1070,265 1110,240 1110,405 1070,430" fill="url(#bldgSide)" />

                {/* Foreground Low Blocks */}
                <polygon points="220,380 260,355 300,380 260,405" fill="url(#bldgTop)" />
                <polygon points="220,380 260,405 260,490 220,465" fill="url(#bldgFront)" />
                <polygon points="260,405 300,380 300,465 260,490" fill="url(#bldgSide)" />

                <polygon points="560,410 600,385 640,410 600,435" fill="url(#bldgTop)" />
                <polygon points="560,410 600,435 600,520 560,495" fill="url(#bldgFront)" />
                <polygon points="600,435 640,410 640,495 600,520" fill="url(#bldgSide)" />

                <polygon points="840,370 880,345 920,370 880,395" fill="url(#bldgTop)" />
                <polygon points="840,370 880,395 880,480 840,455" fill="url(#bldgFront)" />
                <polygon points="880,395 920,370 920,455 880,480" fill="url(#bldgSide)" />
              </g>

              {/* Glowing Route 1: Electric Cyan Surface Grid Artery */}
              <path
                d="M 80,470 L 220,410 L 370,480 L 540,400 L 720,470 L 890,390 L 1050,460 L 1150,410"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#cyanGlow)"
              />

              {/* Glowing Route 2: Neon Violet Elevated Skyway (+420m) */}
              <path
                d="M 70,220 L 240,160 L 420,220 L 620,150 L 820,230 L 1020,160 L 1140,210"
                fill="none"
                stroke="#a855f7"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#violetGlow)"
              />

              {/* Waypoint Stations with Glowing Halos */}
              <g className="waypoint-stations">
                <circle cx="240" cy="160" r="10" fill="#a855f7" />
                <circle cx="240" cy="160" r="18" fill="rgba(168, 85, 247, 0.25)" />
                <text x="240" y="135" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">Skyport Apex Hub</text>

                <circle cx="540" cy="400" r="10" fill="#00f0ff" />
                <circle cx="540" cy="400" r="18" fill="rgba(0, 240, 255, 0.25)" />
                <text x="540" y="375" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">Nexus Central Interchange</text>

                <circle cx="890" cy="390" r="10" fill="#00e676" />
                <circle cx="890" cy="390" r="18" fill="rgba(0, 230, 118, 0.25)" />
                <text x="890" y="365" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">Future City Hub (Arrival)</text>
              </g>

              {/* ANIMATED VEHICLE 1: Aero-Shuttle / Flying Pod */}
              <g transform={`translate(${aeroX}, ${aeroY})`}>
                <circle r="18" fill="rgba(0, 240, 255, 0.3)" />
                <circle r="9" fill="#00f0ff" />
                <g transform="translate(-8, -8) scale(0.68)" fill="#000000">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </g>
              </g>

              {/* ANIMATED VEHICLE 2: Maglev Train Capsule */}
              <g transform={`translate(${maglevX}, ${maglevY})`}>
                <circle r="16" fill="rgba(168, 85, 247, 0.35)" />
                <rect x="-12" y="-7" width="24" height="14" rx="7" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* ANIMATED VEHICLE 3: Autonomous Bus */}
              <g transform={`translate(${busX}, ${busY})`}>
                <circle r="15" fill="rgba(0, 230, 118, 0.3)" />
                <rect x="-10" y="-7" width="20" height="14" rx="4" fill="#00e676" stroke="#000000" strokeWidth="1.5" />
              </g>
            </g>
          ) : (
            /* ===============================================================
               MOBILE PORTRAIT ISOMETRIC VIEW (isWide === false, 400x650)
               =============================================================== */
            <g className="mobile-isometric-scene">
              {/* Isometric Ground Grid Lines */}
              <g stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" fill="none">
                {Array.from({ length: 18 }).map((_, i) => (
                  <line key={`grid1-${i}`} x1="-100" y1={i * 50} x2="500" y2={i * 50 + 350} />
                ))}
                {Array.from({ length: 18 }).map((_, i) => (
                  <line key={`grid2-${i}`} x1="500" y1={i * 50} x2="-100" y2={i * 50 + 350} />
                ))}
              </g>

              {/* 3D Isometric Buildings */}
              <g className="isometric-buildings" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1">
                <polygon points="50,160 90,135 130,160 90,185" fill="url(#bldgTop)" />
                <polygon points="50,160 90,185 90,290 50,265" fill="url(#bldgFront)" />
                <polygon points="90,185 130,160 130,265 90,290" fill="url(#bldgSide)" />

                <polygon points="170,110 210,85 250,110 210,135" fill="url(#bldgTop)" />
                <polygon points="170,110 210,135 210,270 170,245" fill="url(#bldgFront)" />
                <polygon points="210,135 250,110 250,245 210,270" fill="url(#bldgSide)" />

                <polygon points="280,180 320,155 360,180 320,205" fill="url(#bldgTop)" />
                <polygon points="280,180 320,205 320,330 280,305" fill="url(#bldgFront)" />
                <polygon points="320,205 360,180 360,305 320,330" fill="url(#bldgSide)" />

                <polygon points="30,340 70,315 110,340 70,365" fill="url(#bldgTop)" />
                <polygon points="30,340 70,365 70,440 30,415" fill="url(#bldgFront)" />
                <polygon points="70,365 110,340 110,415 70,440" fill="url(#bldgSide)" />

                <polygon points="160,370 200,345 240,370 200,395" fill="url(#bldgTop)" />
                <polygon points="160,370 200,395 200,480 160,455" fill="url(#bldgFront)" />
                <polygon points="200,395 240,370 240,455 200,480" fill="url(#bldgSide)" />

                <polygon points="270,390 310,365 350,390 310,415" fill="url(#bldgTop)" />
                <polygon points="270,390 310,415 310,490 270,465" fill="url(#bldgFront)" />
                <polygon points="310,415 350,390 350,465 310,490" fill="url(#bldgSide)" />
              </g>

              {/* Glowing Route 1: Electric Cyan Route Path */}
              <path
                d="M 60,380 L 140,330 L 220,380 L 300,330 L 370,370 L 370,420 L 300,460 L 220,410 L 140,460 Z"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#cyanGlow)"
              />

              {/* Glowing Route 2: Neon Violet Sky-Corridor Path */}
              <path
                d="M 40,240 L 120,190 L 210,245 L 300,190 L 370,230"
                fill="none"
                stroke="#a855f7"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#violetGlow)"
              />

              {/* Animated Vehicle 1: Aero-Shuttle */}
              <g transform={`translate(${aeroX}, ${aeroY})`}>
                <circle r="16" fill="rgba(0, 240, 255, 0.25)" />
                <circle r="8" fill="#00f0ff" />
                <g transform="translate(-8, -8) scale(0.65)" fill="#000000">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </g>
              </g>

              {/* Animated Vehicle 2: Maglev Capsule */}
              <g transform={`translate(${maglevX}, ${maglevY})`}>
                <circle r="14" fill="rgba(168, 85, 247, 0.3)" />
                <rect x="-10" y="-6" width="20" height="12" rx="6" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
              </g>

              {/* Animated Vehicle 3: Autonomous Bus */}
              <g transform={`translate(${busX}, ${busY})`}>
                <circle r="14" fill="rgba(0, 230, 118, 0.25)" />
                <rect x="-9" y="-6" width="18" height="12" rx="4" fill="#00e676" stroke="#000000" strokeWidth="1.5" />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Fixed Bottom Status Card */}
      <div className="fixed-status-bottom-card" role="status" aria-live="polite">
        <div className="status-card-header-main">
          {isPlainLanguage ? (
            <>YOUR FLYING SHUTTLE<br />WILL LAND IN 2 MIN.</>
          ) : (
            <>YOUR AERO-SHUTTLE<br />IS ARRIVING SOON.</>
          )}
        </div>
        <div className="status-card-est-time">
          {isPlainLanguage ? (
            'Simple guide: Stay seated. Shuttle is landing at Apex Skyport. Elevator to street level is right outside.'
          ) : (
            'Est: 12:45 PM • Next Transfer: Nexus Interchange (Platform 03)'
          )}
        </div>
        <div className="status-card-actions-row">
          <button
            type="button"
            className="btn-view-alternatives"
            onClick={handleAlternativesClick}
            id="btn-view-alternatives"
            aria-label="View Alternatives"
          >
            VIEW ALTERNATIVES
          </button>
          {onOpenEmergency && (
            <button
              type="button"
              className="btn-sos-trigger"
              onClick={() => {
                audioManager.playChime('arrival');
                onOpenEmergency();
              }}
              id="btn-live-sos"
              aria-label="Emergency SOS Concierge"
              title="Connect to 24/7 Human Transit Concierge"
            >
              <AlertTriangle size={17} />
              <span>SOS</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiveTrackingScreen;
