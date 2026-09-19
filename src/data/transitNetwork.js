// transitNetwork.js - Core 2100 transit data model for Aether 2100

export const MODES = [
  {
    id: 'bus',
    name: 'Autonomous Mag-Bus',
    category: 'Ground Mass Transit',
    speed: '95 km/h',
    propulsion: 'Surface Inductive Resonant Rail',
    icon: 'Bus',
    color: '#00f0ff',
    badge: '100% Autonomous (L5)',
    fleetActive: 142,
    description: 'Street-level autonomous rapid transit connecting urban residential quadrants with step-free automated boarding.'
  },
  {
    id: 'train',
    name: 'Hyper-Tube Maglev',
    category: 'Sub-Terran & Elevated Rail',
    speed: '720 km/h',
    propulsion: 'Vacuum Tube Magnetic Levitation',
    icon: 'Train',
    color: '#00ff9d',
    badge: 'Near-Zero Friction',
    fleetActive: 88,
    description: 'High-speed vacuum tube corridors linking regional smart-hubs across subterranean and elevated sky-tracks.'
  },
  {
    id: 'air',
    name: 'eVTOL Sky-Pods',
    category: 'Aerial Urban Corridors',
    speed: '240 km/h',
    propulsion: 'Ion-Acoustic Vertical Lift',
    icon: 'Plane',
    color: '#ffaa00',
    badge: '3D Air Corridor',
    fleetActive: 64,
    description: 'Autonomous vertical takeoff passenger pods cruising along dynamic holographic sky-lanes with zero ground congestion.'
  },
  {
    id: 'road',
    name: 'Smart-Road Glide Pods',
    category: 'First / Last-Mile On-Demand',
    speed: '120 km/h',
    propulsion: 'Dynamic Inductive Roadways',
    icon: 'Car',
    color: '#d946ef',
    badge: 'Dynamic Induction',
    fleetActive: 310,
    description: 'Individual and micro-group autonomous capsules powered wirelessly directly from smart nano-surface road grids.'
  }
];

export const STATIONS = [
  {
    id: 'st_marina',
    name: 'Quantum Marina Bay',
    sector: 'Sector 01 — Coastal District',
    modes: ['road', 'air', 'bus'],
    level: 'Surface & Sky Dock',
    x: 18,
    y: 72,
    accessibility: 'Full Step-Free, Braille Tactile Paths, AI Escort Available'
  },
  {
    id: 'st_central',
    name: 'Nexus Central Interchange',
    sector: 'Sector 04 — Civic Core',
    modes: ['bus', 'train', 'air', 'road'],
    level: 'Multi-Level Quad Terminal (Levels -2 to +6)',
    x: 50,
    y: 52,
    accessibility: 'Step-Free Gravity Elevators, Sensory Quiet Pods, Low-Mobility Shuttles'
  },
  {
    id: 'st_skyport',
    name: 'Apex Skyport Hub 04',
    sector: 'Sector 02 — High Stratum Spire',
    modes: ['air', 'train'],
    level: 'Atmospheric Vertiport (Level +18)',
    x: 78,
    y: 26,
    accessibility: 'Automated Boarding Cradles, High-Contrast Guidance, Audio Beacons'
  },
  {
    id: 'st_subterran',
    name: 'Sub-Terran Hyper-Spire',
    sector: 'Sector 05 — Deep Geo Terminal',
    modes: ['train', 'road'],
    level: 'Sub-Terran Vault (Level -4)',
    x: 32,
    y: 35,
    accessibility: 'Seismic Dampening Ramps, Ultra-Clear Visual Holograms'
  },
  {
    id: 'st_biodome',
    name: 'Neo-Botanical Bio-Dome',
    sector: 'Sector 07 — Eco Living Ring',
    modes: ['bus', 'road'],
    level: 'Surface Green Belt',
    x: 82,
    y: 75,
    accessibility: 'Level-Access Nature Pathways, Voice-Assisted Stations'
  }
];

export const PRESET_ROUTES = [
  {
    id: 'route_primary',
    name: 'The Pan-City Oracle Express',
    from: 'Quantum Marina Bay',
    fromId: 'st_marina',
    to: 'Apex Skyport Hub 04',
    toId: 'st_skyport',
    totalDuration: '13 min',
    totalDistance: '34.8 km',
    energyFootprint: '0.00 kg CO2 (100% Solar & Inductive Grid)',
    fare: '2.40 Q-Credits',
    status: 'On Time',
    statusType: 'normal',
    crowdLevel: 'Low (32% Capacity)',
    accessibilityScore: '100% Accessible (Step-free, audio cues, automated transfer ramps)',
    aiRecommendation: 'Oracle AI: Route is 6.5 mins faster than surface-only routes. Dynamic air corridor speed boosted by +12%.',
    plainSummary: 'Easy 3-step journey: A short smart-car ride, a fast train ride through the tunnel, then an air-shuttle flight to the high skyport.',
    legs: [
      {
        legNumber: 1,
        mode: 'road',
        modeName: 'Smart-Road Glide Pod #GP-14',
        departureTime: '21:05',
        arrivalTime: '21:08',
        duration: '3 min',
        distance: '4.2 km',
        from: 'Quantum Marina Bay (Dock C)',
        to: 'Nexus Central Interchange (Level 0)',
        gate: 'Bay 3-Alpha',
        telemetry: { speed: '110 km/h', power: '99.4% Inductive Feed', guidance: 'Autonomous Roadway Lane 4' },
        accessibilityNote: 'Level curb, automatic sliding ramp, wheelchair latch active.',
        plainInstruction: 'Get into Pod #14 at Bay 3. It will drive you automatically to Nexus Central.'
      },
      {
        legNumber: 'TRANSFER_1',
        isTransfer: true,
        duration: '2 min',
        title: 'Transfer at Nexus Central Interchange',
        instruction: 'Take Gravity Elevator 2 down to Sub-Level -2, Platform 03.',
        distance: '65 meters (Level moving walkway)',
        plainInstruction: 'Step onto the moving walkway. It leads directly to Platform 3.'
      },
      {
        legNumber: 2,
        mode: 'train',
        modeName: 'Hyper-Tube Maglev #HT-88',
        departureTime: '21:10',
        arrivalTime: '21:14',
        duration: '4 min',
        distance: '18.4 km',
        from: 'Nexus Central Sub-Level -2',
        to: 'Skyport Transit Junction (Level +2)',
        gate: 'Platform 03-Mag',
        telemetry: { speed: '680 km/h', power: 'Superconducting Maglev Grid', guidance: 'Vacuum Tube Corridor Alpha' },
        accessibilityNote: 'Wide-door rapid level boarding, auditory stop chime, tactile braille seating.',
        plainInstruction: 'Board Maglev Train #88. Relax for 4 minutes while it speeds through the tube.'
      },
      {
        legNumber: 'TRANSFER_2',
        isTransfer: true,
        duration: '1 min',
        title: 'Transfer at Skyport Transit Junction',
        instruction: 'Board Escalator / Step-Free Lift up to Vertiport Launch Deck 4.',
        distance: '30 meters',
        plainInstruction: 'Go up one floor to Launch Deck 4 for your flying pod.'
      },
      {
        legNumber: 3,
        mode: 'air',
        modeName: 'eVTOL Sky-Pod #SK-704',
        departureTime: '21:15',
        arrivalTime: '21:18',
        duration: '3 min',
        distance: '12.2 km',
        from: 'Skyport Launch Deck 4',
        to: 'Apex Skyport Hub 04 (Spire Deck 18)',
        gate: 'Vertiport Cradle 04',
        telemetry: { speed: '220 km/h', altitude: '420 meters', guidance: 'Holographic Air Corridor Bravo' },
        accessibilityNote: 'Gimbal-stabilized anti-vertigo cabin, automated vocal flight progress, companion seating.',
        plainInstruction: 'Step into Sky-Pod #704. It flies you gently through the air straight to your destination.'
      }
    ]
  },
  {
    id: 'route_eco',
    name: 'Eco-Ring Ground Transit',
    from: 'Neo-Botanical Bio-Dome',
    fromId: 'st_biodome',
    to: 'Sub-Terran Hyper-Spire',
    toId: 'st_subterran',
    totalDuration: '11 min',
    totalDistance: '22.0 km',
    energyFootprint: '0.00 kg CO2',
    fare: '1.80 Q-Credits',
    status: 'On Time',
    statusType: 'normal',
    crowdLevel: 'Very Low (18% Capacity)',
    accessibilityScore: '100% Accessible',
    aiRecommendation: 'Oracle AI: Zero transfers required on Autonomous Mag-Bus Route 109.',
    plainSummary: 'Direct smooth bus ride with no transfers needed.',
    legs: [
      {
        legNumber: 1,
        mode: 'bus',
        modeName: 'Autonomous Mag-Bus #MB-109',
        departureTime: '21:06',
        arrivalTime: '21:17',
        duration: '11 min',
        distance: '22.0 km',
        from: 'Neo-Botanical Bio-Dome (Main Gate)',
        to: 'Sub-Terran Hyper-Spire (Arrival Plaza)',
        gate: 'Platform B1',
        telemetry: { speed: '90 km/h', power: 'Continuous Ground Induction', guidance: 'Green Belt Express Way' },
        accessibilityNote: 'Ultra-low kneeling chassis, priority companion zone.',
        plainInstruction: 'Get on Bus #109 at Platform B1. Stay on until the final stop.'
      }
    ]
  },
  {
    id: 'route_express_air',
    name: 'Direct Stratum Sky-Shuttle',
    from: 'Nexus Central Interchange',
    fromId: 'st_central',
    to: 'Apex Skyport Hub 04',
    toId: 'st_skyport',
    totalDuration: '6 min',
    totalDistance: '19.5 km',
    energyFootprint: '0.00 kg CO2',
    fare: '3.10 Q-Credits',
    status: 'Minor Wind Advisory (+1m)',
    statusType: 'warning',
    crowdLevel: 'Moderate (55% Capacity)',
    accessibilityScore: '100% Accessible',
    aiRecommendation: 'Oracle AI: High-altitude wind gust detected; flight altitude adjusted to 350m for smoother flight.',
    plainSummary: 'Fast direct flight across the city.',
    legs: [
      {
        legNumber: 1,
        mode: 'air',
        modeName: 'eVTOL Sky-Pod #SK-902',
        departureTime: '21:07',
        arrivalTime: '21:13',
        duration: '6 min',
        distance: '19.5 km',
        from: 'Nexus Central Skyport (Deck 6)',
        to: 'Apex Skyport Hub 04 (Spire Deck 18)',
        gate: 'Vertiport Gate 9',
        telemetry: { speed: '240 km/h', altitude: '350 meters', guidance: 'Dynamic Sky-Lane Gamma' },
        accessibilityNote: 'Assisted boarding arm, noise-cancelling acoustic cabin.',
        plainInstruction: 'Board Sky-Pod #902 on Deck 6. Fly directly to Apex Skyport.'
      }
    ]
  }
];

export const LIVE_TELEMETRY = {
  currentVehicle: 'eVTOL Sky-Pod #SK-704',
  vehicleType: 'air',
  speedKmh: 218,
  altitudeM: 395,
  batteryPct: 98.4,
  networkGridSync: 'Optimal (99.98%)',
  destination: 'Apex Skyport Hub 04',
  nextStop: 'Apex Skyport Hub 04 (Gate 4)',
  etaMinutes: 2,
  remainingKm: 2.8,
  safetyStatus: '100% Safe • AI Collision Shield Armed',
  weatherStatus: 'Clear Skyways • Wind Speed: 4.2 km/h (Calm)',
  plainStatus: 'You are flying comfortably in Sky-Pod #704. You will arrive at Apex Skyport in 2 minutes. No need to hurry.',
  audioPrompt: 'Approaching Apex Skyport Vertiport Cradle 4. Doors will open on your left in approximately 90 seconds.'
};
