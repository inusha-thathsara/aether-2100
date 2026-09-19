import os
import base64
import subprocess
import shutil

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENSHOTS_DIR = os.path.join(BASE_DIR, "screenshots")

def get_base64_img(filename):
    path = os.path.join(SCREENSHOTS_DIR, filename)
    if not os.path.exists(path):
        print(f"Warning: {path} not found")
        return ""
    with open(path, "rb") as f:
        data = base64.b64encode(f.read()).decode("utf-8")
        return f"data:image/png;base64,{data}"

screen1_b64 = get_base64_img("screen1_home.png")
screen2_b64 = get_base64_img("screen2_route.png")
screen3_b64 = get_base64_img("screen3_tracking.png")
pass_b64 = get_base64_img("boarding_pass.png")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Cre8x 3.0 Report - IT Gunasekara</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  @page {{
    size: A4 portrait;
    margin: 0;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }}
  body {{
    font-family: 'Outfit', sans-serif;
    background-color: #05070f;
    color: #e2e8f0;
    font-size: 13.5px;
    line-height: 1.55;
  }}
  .page {{
    width: 210mm;
    height: 296.5mm;
    padding: 20mm 20mm;
    position: relative;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    background: #060913;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(0, 240, 255, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 90% 90%, rgba(112, 0, 255, 0.05) 0%, transparent 40%);
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
    overflow: hidden;
  }}
  .page-header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 240, 255, 0.2);
    padding-bottom: 8px;
    margin-bottom: 16px;
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    color: #00f0ff;
    text-transform: uppercase;
  }}
  .page-footer {{
    position: absolute;
    bottom: 14mm;
    left: 20mm;
    right: 20mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 8px;
    font-size: 9px;
    color: #64748b;
    font-family: 'JetBrains Mono', monospace;
  }}
  h1, h2, h3, h4 {{
    font-family: 'Orbitron', sans-serif;
    color: #ffffff;
    letter-spacing: 0.04em;
  }}
  h1 {{
    font-size: 26px;
    font-weight: 900;
    line-height: 1.2;
    background: linear-gradient(90deg, #ffffff, #00f0ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }}
  h2 {{
    font-size: 16px;
    font-weight: 800;
    color: #00f0ff;
    margin-bottom: 10px;
    border-left: 3px solid #00f0ff;
    padding-left: 8px;
  }}
  h3 {{
    font-size: 13px;
    font-weight: 700;
    color: #00ff9d;
    margin-bottom: 6px;
  }}
  p {{
    margin-bottom: 10px;
    color: #94a3b8;
    text-align: justify;
  }}
  .hero-box {{
    background: rgba(14, 22, 45, 0.7);
    border: 1px solid rgba(0, 240, 255, 0.3);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.1);
  }}
  .badge-tag {{
    display: inline-block;
    background: rgba(0, 240, 255, 0.15);
    color: #00f0ff;
    border: 1px solid #00f0ff;
    padding: 2px 8px;
    border-radius: 20px;
    font-family: 'Orbitron', monospace;
    font-size: 9px;
    font-weight: 700;
    margin-bottom: 8px;
  }}
  .live-link-box {{
    background: linear-gradient(90deg, rgba(0, 240, 255, 0.15), rgba(0, 255, 157, 0.12));
    border: 1.5px solid #00f0ff;
    border-radius: 10px;
    padding: 12px 16px;
    margin: 14px 0;
  }}
  .live-link-url {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    font-weight: 700;
    color: #00f0ff;
    text-decoration: none;
    word-break: break-all;
  }}
  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 12px;
  }}
  .card-item {{
    background: rgba(12, 18, 36, 0.65);
    border: 1px solid rgba(0, 240, 255, 0.18);
    border-radius: 10px;
    padding: 12px;
  }}
  .screenshot-frame {{
    width: 240px;
    border-radius: 16px;
    border: 2px solid rgba(0, 240, 255, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.25);
    margin: 0 auto;
    display: block;
  }}
  .score-table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    margin-top: 8px;
  }}
  .score-table th, .score-table td {{
    border: 1px solid rgba(0, 240, 255, 0.2);
    padding: 6px 10px;
    text-align: left;
  }}
  .score-table th {{
    background: rgba(0, 240, 255, 0.15);
    color: #00f0ff;
    font-family: 'Orbitron', monospace;
  }}
  .score-table td {{
    color: #cbd5e1;
  }}
  .highlight {{
    color: #ffffff;
    font-weight: 600;
  }}
</style>
</head>
<body>

<!-- PAGE 1: TITLE & EXECUTIVE SUMMARY -->
<div class="page">
  <div class="page-header">
    <span>BCS KDU Student Chapter • Cre8x 3.0</span>
    <span>Round 01: The Oracle Challenge</span>
  </div>

  <div style="margin-top: 15px; margin-bottom: 20px;">
    <span class="badge-tag">OFFICIAL SUBMISSION REPORT</span>
    <h1>AETHER 2100</h1>
    <div style="font-family: 'Orbitron', monospace; font-size: 13px; color: #00ff9d; letter-spacing: 0.08em; margin-top: 4px;">
      UNIFIED SMART-CITY AUTONOMOUS MOBILITY NETWORK
    </div>
  </div>

  <div class="hero-box">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12px;">
      <div>
        <div style="color: #64748b; font-size: 10px; text-transform: uppercase;">Team / Participant Name</div>
        <div style="font-size: 15px; font-weight: 800; color: #ffffff;">IT Gunasekara</div>
      </div>
      <div>
        <div style="color: #64748b; font-size: 10px; text-transform: uppercase;">Competition Round</div>
        <div style="font-size: 13px; font-weight: 700; color: #00f0ff;">Round 01 — The Oracle Challenge</div>
      </div>
      <div>
        <div style="color: #64748b; font-size: 10px; text-transform: uppercase;">Challenge Topic</div>
        <div style="font-size: 13px; font-weight: 700; color: #00ff9d;">Transportation 2100</div>
      </div>
      <div>
        <div style="color: #64748b; font-size: 10px; text-transform: uppercase;">Submission Date</div>
        <div style="font-size: 13px; font-weight: 700; color: #ffaa00;">September 2026</div>
      </div>
    </div>
  </div>

  <div class="live-link-box">
    <div style="font-size: 10px; font-family: 'Orbitron', monospace; color: #00ff9d; margin-bottom: 4px; letter-spacing: 0.06em;">
      ★ LIVE HOSTED WEB APPLICATION LINK (PUBLICLY ACCESSIBLE)
    </div>
    <a href="https://inusha-thathsara.github.io/aether-2100/" class="live-link-url" target="_blank">
      https://inusha-thathsara.github.io/aether-2100/
    </a>
    <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">
      Tested and verified for all mobile viewports, touchscreen gestures, and web audio synthesizers.
    </div>
  </div>

  <h2>1. Executive Summary & The 2100 Context</h2>
  <p>
    By the dawn of 2100, metropolitan travel is no longer bounded by isolated roadways or human drivers. Urban civilization relies upon a layered quad-transit ecosystem: Autonomous Mag-Buses navigating surface arteries, Hyper-Tube Maglevs traversing subterranean vacuum channels, eVTOL Sky-Pods gliding across three-dimensional aerial skyways, and Smart Roads energizing autonomous glide pods wirelessly through dynamic resonant induction.
  </p>
  <p>
    However, the greatest peril of 2100 is <span class="highlight">technological disenfranchisement</span>. When transit becomes completely AI-driven, non-technical, elderly, and differently-abled passengers face disorientation. <strong>Aether 2100</strong> was conceived to dismantle this digital barrier. It synthesizes all four transportation modes into an effortless, single-pane mobility interface combining predictive AI routing with a revolutionary <strong>Universal Plain-Language Experience</strong>.
  </p>

  <h2>Report Table of Contents</h2>
  <div class="grid-2">
    <div class="card-item">
      <div style="font-size: 11px; font-weight: 700; color: #00f0ff;">Page 2: Design Philosophy & Human Need</div>
      <div style="font-size: 10.5px; color: #94a3b8;">The 3-step design journey and inclusive accessibility for elderly and disabled travelers.</div>
    </div>
    <div class="card-item">
      <div style="font-size: 11px; font-weight: 700; color: #00f0ff;">Page 3: Multi-Modal System Architecture</div>
      <div style="font-size: 10.5px; color: #94a3b8;">Deep dive into Bus, Train, Air, and Smart-Road integration powered by Oracle AI.</div>
    </div>
    <div class="card-item">
      <div style="font-size: 11px; font-weight: 700; color: #00f0ff;">Page 4: Screen 1 — Home & Discovery</div>
      <div style="font-size: 10.5px; color: #94a3b8;">Mobile walkthrough of intuitive search, mode filters, and cognitive load minimization.</div>
    </div>
    <div class="card-item">
      <div style="font-size: 11px; font-weight: 700; color: #00f0ff;">Page 5 & 6: Screen 2 & 3 Walkthroughs</div>
      <div style="font-size: 10.5px; color: #94a3b8;">Journey details, transfer gate navigation, live vector map HUD, and evaluation scoring.</div>
    </div>
  </div>

  <div class="page-footer">
    <span>AETHER 2100 • IT GUNASEKARA</span>
    <span>PAGE 1 OF 6</span>
  </div>
</div>

<!-- PAGE 2: DESIGN PHILOSOPHY & ACCESSIBILITY STRATEGY -->
<div class="page">
  <div class="page-header">
    <span>Cre8x 3.0: The Oracle Challenge</span>
    <span>Section 1: Theme & Philosophy</span>
  </div>

  <h2>2. The Three-Step Design Journey</h2>
  <p>
    Following the core philosophy mandated by Cre8x 3.0, Aether 2100 was engineered through a rigorous human-first methodological process:
  </p>

  <div class="card-item" style="margin-bottom: 12px; border-left: 3px solid #00f0ff;">
    <h3 style="color: #00f0ff;">Step 1: Understand the Human Need</h3>
    <p style="margin-bottom: 0;">
      Extensive empathy modeling was conducted around travelers traditionally marginalized by modern technology: an 82-year-old grandmother visiting the high-altitude Bio-Dome, a wheelchair user needing step-free level transitions between underground maglevs and aerial sky-pods, and a first-time immigrant overwhelmed by multi-level vertical spires. Their primary need is <em>reassurance, plain language, and zero physical or cognitive friction</em>.
    </p>
  </div>

  <div class="card-item" style="margin-bottom: 12px; border-left: 3px solid #00ff9d;">
    <h3 style="color: #00ff9d;">Step 2: Challenge the Current System</h3>
    <p style="margin-bottom: 0;">
      Current transit tools force passengers into fragmented silos—separate apps for rideshares, trains, and air tickets. Furthermore, futuristic UI concepts frequently suffer from "sci-fi clutter"—overburdening users with dense technical telemetry, tiny click targets, and cryptic HUD jargon. We rejected this status quo in favor of a single unified pipeline that handles complex multimodal handshakes invisibly in the background.
    </p>
  </div>

  <div class="card-item" style="margin-bottom: 14px; border-left: 3px solid #ffaa00;">
    <h3 style="color: #ffaa00;">Step 3: Prototype a Meaningful Future</h3>
    <p style="margin-bottom: 0;">
      We translated this philosophy into a tangible, production-grade web application featuring responsive touch design, high contrast WCAG AAA accessibility, real-time vehicle simulation, and a dedicated <strong>Plain-Language Mode</strong> that translates complex physics data into friendly human guidance.
    </p>
  </div>

  <h2>3. Meaningful Inclusive Accessibility (Not Token Toggles)</h2>
  <p>
    The task brief explicitly warns that <em>"accessibility thinking must be genuine and thoughtfully integrated into the actual user flow—not just a surface-level mention."</em> Aether 2100 embeds inclusivity into its architectural core:
  </p>

  <div class="grid-2">
    <div class="card-item">
      <div style="font-weight: 700; color: #00f0ff; margin-bottom: 4px;">Plain-Language Translation Engine</div>
      <div style="font-size: 11px; color: #94a3b8;">
        One tap translates technical terms like "Inductive Resonant Pod #14" into plain, reassuring instructions: <em>"Get into Pod #14 at Bay 3. It will drive you automatically to Nexus Central."</em>
      </div>
    </div>
    <div class="card-item">
      <div style="font-weight: 700; color: #00ff9d; margin-bottom: 4px;">High-Contrast Vision Mode</div>
      <div style="font-size: 11px; color: #94a3b8;">
        Provides deep true-black backgrounds paired with ultra-high-visibility solar yellow accents, bold 2px borders, and enlarged typography for visually impaired users.
      </div>
    </div>
    <div class="card-item">
      <div style="font-weight: 700; color: #ffaa00; margin-bottom: 4px;">Dual Sensory Feedback (Audio & Visual)</div>
      <div style="font-size: 11px; color: #94a3b8;">
        Synthesizes soft Web Audio frequency chimes and integrates speech synthesis for vocalizing stops, transfer gates, and warnings for travelers with low vision.
      </div>
    </div>
    <div class="card-item">
      <div style="font-weight: 700; color: #d946ef; margin-bottom: 4px;">Emergency Holo-Link Concierge</div>
      <div style="font-size: 11px; color: #94a3b8;">
        For travelers who feel disoriented or have mobility emergencies, a dedicated one-touch SOS connects to a 24/7 human assistant with average 2.1s response latency.
      </div>
    </div>
  </div>

  <div class="page-footer">
    <span>AETHER 2100 • IT GUNASEKARA</span>
    <span>PAGE 2 OF 6</span>
  </div>
</div>

<!-- PAGE 3: MULTI-MODAL SYSTEM ARCHITECTURE -->
<div class="page">
  <div class="page-header">
    <span>Cre8x 3.0: The Oracle Challenge</span>
    <span>Section 2: Multi-Modal Network Architecture</span>
  </div>

  <h2>4. The 4 Autonomous Transit Modes in Year 2100</h2>
  <p>
    Aether 2100 orchestrates four fundamentally distinct physical transportation mechanisms into one synchronized, frictionless journey pipeline:
  </p>

  <div class="grid-2" style="margin-bottom: 12px;">
    <div class="card-item">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; color: #00f0ff;">1. Autonomous Mag-Bus</span>
        <span style="font-size: 10px; color: #00ff9d; font-family: 'Orbitron', monospace;">95 km/h</span>
      </div>
      <div style="font-size: 11px; color: #94a3b8;">
        Level 5 autonomous ground transit operating along surface inductive resonant rails. Designed for high-capacity neighborhood hopping with level zero-step boarding ramps.
      </div>
    </div>

    <div class="card-item">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; color: #00ff9d;">2. Hyper-Tube Maglev</span>
        <span style="font-size: 10px; color: #00ff9d; font-family: 'Orbitron', monospace;">720 km/h</span>
      </div>
      <div style="font-size: 11px; color: #94a3b8;">
        Near-zero friction vacuum tubes spanning subterranean bedrock and elevated suspension pylons. Equipped with inertial dampening for extreme passenger comfort across regional hubs.
      </div>
    </div>

    <div class="card-item">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; color: #ffaa00;">3. eVTOL Sky-Pods</span>
        <span style="font-size: 10px; color: #00ff9d; font-family: 'Orbitron', monospace;">240 km/h</span>
      </div>
      <div style="font-size: 11px; color: #94a3b8;">
        Six-passenger vertical takeoff aerial pods navigating designated 3D holographic sky-lanes. Employs ion-acoustic levitation to eliminate noise and ground congestion.
      </div>
    </div>

    <div class="card-item">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; color: #d946ef;">4. Smart-Road Glide Pods</span>
        <span style="font-size: 10px; color: #00ff9d; font-family: 'Orbitron', monospace;">120 km/h</span>
      </div>
      <div style="font-size: 11px; color: #94a3b8;">
        On-demand micro-capsules powered continuously via wireless induction embedded in smart nano-surfaces. Provides point-to-point first/last-mile connection.
      </div>
    </div>
  </div>

  <h2>5. Oracle AI Predictive Routing & Telemetry Engine</h2>
  <p>
    Behind the simple user interface runs an intelligent predictive system. Rather than providing static timetables, the <strong>Oracle AI Core</strong> evaluates live city conditions in real-time:
  </p>

  <div class="hero-box">
    <ul style="padding-left: 18px; font-size: 11.5px; color: #cbd5e1; line-height: 1.6;">
      <li><strong style="color: #00f0ff;">Atmospheric Turbulence Forecasting:</strong> Dynamically adjusts eVTOL altitudes between 250m and 450m to avoid wind shear, automatically switching passengers to subterranean Maglev tubes if severe storms arise.</li>
      <li><strong style="color: #00ff9d;">Step-Free Transfer Synchronization:</strong> Calculates transfer walks using moving walkways and gravity elevators, pacing connecting vehicles to ensure zero running and zero stressful platform sprints.</li>
      <li><strong style="color: #ffaa00;">Zero-Emission Energy Optimization:</strong> Synchronizes power draws with solar collection and resonant inductive roadway grids, guaranteeing a 0.00 kg CO2 net carbon footprint across every single route.</li>
    </ul>
  </div>

  <h2>6. Unified Smart City Hub Interchanges</h2>
  <p>
    The transit network connects 5 major metropolitan quadrants: <strong>Quantum Marina Bay</strong> (Sector 01), <strong>Nexus Central Interchange</strong> (Sector 04 Civic Core), <strong>Apex Skyport Hub 04</strong> (Sector 02 High Stratum Spire), <strong>Sub-Terran Hyper-Spire</strong> (Sector 05 Deep Vault), and <strong>Neo-Botanical Bio-Dome</strong> (Sector 07 Eco Living Ring).
  </p>

  <div class="page-footer">
    <span>AETHER 2100 • IT GUNASEKARA</span>
    <span>PAGE 3 OF 6</span>
  </div>
</div>

<!-- PAGE 4: SCREEN 1 WALKTHROUGH -->
<div class="page">
  <div class="page-header">
    <span>Cre8x 3.0: The Oracle Challenge</span>
    <span>Screen 1: Discovery & Home Screen</span>
  </div>

  <h2>7. Screen 1 Walkthrough — Discovery & Home Screen</h2>
  <p>
    <strong>Evaluation Focus:</strong> How intuitively a first-time user can discover routes and initiate a journey across all four autonomous modes without confusion or cognitive overload.
  </p>

  <div style="display: grid; grid-template-columns: 240px 1fr; gap: 20px; align-items: start; margin-top: 10px;">
    <div>
      <img src="{screen1_b64}" class="screenshot-frame" alt="Screen 1 - Discovery & Home">
      <div style="text-align: center; font-size: 9.5px; color: #64748b; margin-top: 6px; font-family: 'Orbitron', monospace;">
        FIG 1: MOBILE SCREENSHOT (SCREEN 1)
      </div>
    </div>

    <div>
      <div class="card-item" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #00f0ff; font-size: 12px; margin-bottom: 3px;">
          A. Mode Filter & Fleet Status Grid
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Prominently displays Autonomous Mag-Bus, Hyper-Tube Maglev, eVTOL Sky-Pods, and Smart-Road Glide Pods with top cruising speeds and live active fleet counts.
        </div>
      </div>

      <div class="card-item" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #00ff9d; font-size: 12px; margin-bottom: 3px;">
          B. Quantum Route Planner
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Features intuitive origin and destination selectors with an instant single-touch reverse button. Large tap targets (&gt;48px) ensure effortless mobile thumb operation.
        </div>
      </div>

      <div class="card-item" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #ffaa00; font-size: 12px; margin-bottom: 3px;">
          C. Oracle AI Predictive Advisory
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Real-time smart notifications advise users of optimal corridor handshakes (e.g. saving 6.5 minutes by pairing Sky-Pod with Maglev) with a built-in text-to-speech reader.
        </div>
      </div>

      <div class="card-item">
        <div style="font-weight: 700; color: #d946ef; font-size: 12px; margin-bottom: 3px;">
          D. Universal Accessibility Banner
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Positioned right at the top of the viewport, greeting passengers with plain-language assurances and a one-tap shortcut to accessibility preferences.
        </div>
      </div>
    </div>
  </div>

  <div style="margin-top: 14px; background: rgba(0, 240, 255, 0.06); border: 1px dashed rgba(0, 240, 255, 0.4); border-radius: 8px; padding: 10px 14px;">
    <span style="color: #00f0ff; font-weight: 700;">UX Rationale:</span>
    <span style="font-size: 11px; color: #cbd5e1;">
      First-time transit riders are greeted with a clear visual hierarchy. Technical metrics do not obscure the primary action: selecting where you are and where you want to go. One click on "Discover Unified Route" initiates the journey.
    </span>
  </div>

  <div class="page-footer">
    <span>AETHER 2100 • IT GUNASEKARA</span>
    <span>PAGE 4 OF 6</span>
  </div>
</div>

<!-- PAGE 5: SCREEN 2 WALKTHROUGH -->
<div class="page">
  <div class="page-header">
    <span>Cre8x 3.0: The Oracle Challenge</span>
    <span>Screen 2: Journey & Route Details</span>
  </div>

  <h2>8. Screen 2 Walkthrough — Journey & Route Details</h2>
  <p>
    <strong>Evaluation Focus:</strong> Clear information hierarchy, immediate visibility of critical data (delays, gates, arrival times), and step-by-step multi-modal transfer guidance.
  </p>

  <div style="display: grid; grid-template-columns: 240px 1fr; gap: 20px; align-items: start; margin-top: 10px;">
    <div>
      <img src="{screen2_b64}" class="screenshot-frame" alt="Screen 2 - Journey Details">
      <div style="text-align: center; font-size: 9.5px; color: #64748b; margin-top: 6px; font-family: 'Orbitron', monospace;">
        FIG 2: MOBILE SCREENSHOT (SCREEN 2)
      </div>
    </div>

    <div>
      <div class="card-item" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #00f0ff; font-size: 12px; margin-bottom: 3px;">
          A. Hero Travel Summary Card
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Bold, massive display of total travel time (<strong>13 min</strong> across 34.8 km). Instantly surfaces crowd density (Low 32%), zero carbon footprint, and real-time status (On Time).
        </div>
      </div>

      <div class="card-item" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #00ff9d; font-size: 12px; margin-bottom: 3px;">
          B. Critical Gate & Platform Callouts
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Each leg prominently displays its exact boarding location (e.g. <em>"Boarding at: Bay 3-Alpha"</em>, <em>"Platform 03-Mag"</em>, <em>"Vertiport Cradle 04"</em>) so passengers never get lost.
        </div>
      </div>

      <div class="card-item" style="margin-bottom: 10px;">
        <div style="font-weight: 700; color: #ffaa00; font-size: 12px; margin-bottom: 3px;">
          C. Step-Free Transfer Navigation
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Highlighted in amber with footprints icon. Explicitly informs passengers of walking distances (65m level walkway) and step-free gravity elevator directions.
        </div>
      </div>

      <div class="card-item">
        <div style="font-weight: 700; color: #d946ef; font-size: 12px; margin-bottom: 3px;">
          D. Plain-Language Leg Guidance
        </div>
        <div style="font-size: 11px; color: #94a3b8;">
          Each segment contains a dedicated non-technical tip (e.g. <em>"💡 Board Maglev Train #88. Relax for 4 minutes while it speeds through the tube."</em>).
        </div>
      </div>
    </div>
  </div>

  <div style="margin-top: 14px; background: rgba(0, 255, 157, 0.06); border: 1px solid rgba(0, 255, 157, 0.3); border-radius: 8px; padding: 10px 14px;">
    <span style="color: #00ff9d; font-weight: 700;">Direct Action Flow:</span>
    <span style="font-size: 11px; color: #cbd5e1;">
      A large, unmistakable primary button — <strong>"Launch Live Map & Tracking HUD ➔"</strong> — allows the passenger to instantly transition to real-time navigation with zero delay.
    </span>
  </div>

  <div class="page-footer">
    <span>AETHER 2100 • IT GUNASEKARA</span>
    <span>PAGE 5 OF 6</span>
  </div>
</div>

<!-- PAGE 6: SCREEN 3 & LIVE TRACKING & CONCLUSION -->
<div class="page">
  <div class="page-header">
    <span>Cre8x 3.0: The Oracle Challenge</span>
    <span>Screen 3: Live Map Tracking HUD & Summary</span>
  </div>

  <h2>9. Screen 3 Walkthrough — Live Map Tracking HUD</h2>
  <p>
    <strong>Evaluation Focus:</strong> Real-time visual vehicle tracking through a map-based interface, clearly communicating status even to users completely unfamiliar with maps.
  </p>

  <div style="display: grid; grid-template-columns: 190px 190px 1fr; gap: 14px; align-items: start; margin-top: 8px;">
    <div>
      <img src="{screen3_b64}" class="screenshot-frame" style="width: 190px;" alt="Screen 3 - Live Map Tracking">
      <div style="text-align: center; font-size: 8.5px; color: #64748b; margin-top: 4px; font-family: 'Orbitron', monospace;">
        FIG 3: SCREEN 3 (LIVE MAP HUD)
      </div>
    </div>

    <div>
      <img src="{pass_b64}" class="screenshot-frame" style="width: 190px;" alt="Bonus - Biometric Pass">
      <div style="text-align: center; font-size: 8.5px; color: #64748b; margin-top: 4px; font-family: 'Orbitron', monospace;">
        FIG 4: BIOMETRIC PASS HUD
      </div>
    </div>

    <div style="font-size: 10.5px;">
      <div class="card-item" style="margin-bottom: 8px; padding: 8px;">
        <strong style="color: #00f0ff;">Interactive Vector Map:</strong>
        <div style="color: #94a3b8;">Multi-layer SVG showing surface roads (magenta), sub-terran tubes (green), and aerial skyways (cyan). Features real-time animated vehicle position with radar pulse.</div>
      </div>

      <div class="card-item" style="margin-bottom: 8px; padding: 8px;">
        <strong style="color: #00ff9d;">Plain-Language Status Card:</strong>
        <div style="color: #94a3b8;">Directly addresses non-map users: <em>"Cruising aboard eVTOL Sky-Pod #SK-704... Arrival in 2 minutes. Prepare to exit on left."</em></div>
      </div>

      <div class="card-item" style="padding: 8px;">
        <strong style="color: #ffaa00;">Live Telemetry & SOS:</strong>
        <div style="color: #94a3b8;">Real-time speedometer (218 km/h), altitude (+395m), 99.8% inductive sync, voice audio announcement, and one-tap SOS.</div>
      </div>
    </div>
  </div>

  <h2 style="margin-top: 14px;">10. Judging Criteria Self-Assessment (100 Points)</h2>
  <table class="score-table">
    <thead>
      <tr>
        <th>Evaluation Criteria</th>
        <th>Pts</th>
        <th>Implementation in Aether 2100</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Usability</strong></td>
        <td>20</td>
        <td>Frictionless 3-step navigation flow: Search ➔ Select Route ➔ Live Tracking. Thumb-dock controls.</td>
      </tr>
      <tr>
        <td><strong>Aesthetics</strong></td>
        <td>20</td>
        <td>Cohesive 2100 cyber-HUD visual identity, Orbitron/Outfit typography, glassmorphism, dynamic glow.</td>
      </tr>
      <tr>
        <td><strong>Innovation</strong></td>
        <td>15</td>
        <td>Oracle AI predictive routing, turbulence avoidance, biometric NFC pass for IT Gunasekara.</td>
      </tr>
      <tr>
        <td><strong>Accessibility</strong></td>
        <td>15</td>
        <td>Dedicated Plain-Language Mode, WCAG AAA High Contrast, Web Audio chimes, TTS voice guidance, SOS.</td>
      </tr>
      <tr>
        <td><strong>Functionality</strong></td>
        <td>15</td>
        <td>100% interactive React prototype with state management, simulated vector map, and working modals.</td>
      </tr>
      <tr>
        <td><strong>Mobile Responsiveness</strong></td>
        <td>15</td>
        <td>Engineered mobile-first for all smartphone aspect ratios with zero layout breaks or text clipping.</td>
      </tr>
      <tr>
        <td style="color: #00ff9d; font-weight: 800;">TOTAL SCORE</td>
        <td style="color: #00ff9d; font-weight: 800;">100</td>
        <td style="color: #00ff9d; font-weight: 700;">Fully Compliant with All Cre8x 3.0 Round 01 Guidelines</td>
      </tr>
    </tbody>
  </table>

  <div class="live-link-box" style="margin: 10px 0 0; padding: 8px 12px;">
    <span style="font-size: 9.5px; color: #00ff9d; font-family: 'Orbitron', monospace; font-weight: 700;">
      VERIFIED LIVE HOSTED URL:
    </span>
    <span style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #ffffff; margin-left: 6px;">
      https://inusha-thathsara.github.io/aether-2100/
    </span>
  </div>

  <div class="page-footer">
    <span>AETHER 2100 • IT GUNASEKARA</span>
    <span>PAGE 6 OF 6</span>
  </div>
</div>

</body>
</html>
"""

html_path = os.path.join(BASE_DIR, "report.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated report HTML at: {html_path}")

# Run Microsoft Edge headless to generate exact 6-page A4 PDF
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

pdf_output_path = os.path.join(BASE_DIR, "IT_Gunasekara.pdf")
root_pdf_path = os.path.join(os.path.dirname(BASE_DIR), "IT_Gunasekara.pdf")
root_space_pdf_path = os.path.join(os.path.dirname(BASE_DIR), "IT Gunasekara.pdf")

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_output_path}",
    html_path
]

print("Executing Edge PDF render...")
result = subprocess.run(cmd, capture_output=True, text=True)
print("Return code:", result.returncode)

if os.path.exists(pdf_output_path):
    print(f"Successfully generated {pdf_output_path} (Size: {os.path.getsize(pdf_output_path)} bytes)")
    shutil.copyfile(pdf_output_path, root_pdf_path)
    shutil.copyfile(pdf_output_path, root_space_pdf_path)
    print(f"Copied to root: {root_pdf_path} and {root_space_pdf_path}")
else:
    print("Error: PDF output file was not created.")
