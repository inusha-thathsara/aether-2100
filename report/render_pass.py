import os
import subprocess
import pymupdf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(BASE_DIR, "test_modal.html")
pdf_path = os.path.join(BASE_DIR, "test_modal.pdf")
output_png = os.path.join(BASE_DIR, "screenshots", "boarding_pass.png")

html = """<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
@page { size: 500px 750px; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
body {
  width: 500px;
  height: 750px;
  background: #05070f radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.12), transparent 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', sans-serif;
  color: #fff;
  overflow: hidden;
}
.modal-sheet {
  width: 460px;
  background: rgba(10, 15, 29, 0.98);
  border: 1px solid rgba(0, 240, 255, 0.35);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.15);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.modal-title {
  font-size: 20px;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  letter-spacing: -0.01em;
}
.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.pass-card {
  background: linear-gradient(135deg, rgba(14, 20, 35, 0.98), rgba(26, 18, 48, 0.98));
  border: 1px solid rgba(0, 240, 255, 0.4);
  border-radius: 20px;
  padding: 20px;
  box-shadow: inset 0 0 25px rgba(0, 240, 255, 0.08);
}
.token-badge {
  display: inline-block;
  font-size: 9px;
  font-family: 'Orbitron', monospace;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(0, 240, 255, 0.15);
  color: #00f0ff;
  border: 1px solid rgba(0, 240, 255, 0.4);
}
.passenger-name {
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
  margin-top: 6px;
  letter-spacing: 0.02em;
}
.passenger-id {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: #00f0ff;
  margin-top: 2px;
}
.sync-badge {
  font-size: 10.5px;
  color: #00ff9d;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
}
.details-grid {
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
  padding: 12px 0;
  margin: 14px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  text-align: center;
  margin-bottom: 14px;
}
.lbl {
  font-size: 9px;
  text-transform: uppercase;
  color: #64748b;
  font-family: 'Orbitron', monospace;
  letter-spacing: 0.05em;
}
.val {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 2px;
}
.qr-box {
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  width: 140px;
  height: 140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.35);
}
.done-btn {
  width: 100%;
  margin-top: 18px;
  padding: 14px;
  background: #00f0ff;
  color: #05070f;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.02em;
}
</style>
</head>
<body>
<div class="modal-sheet">
  <div class="modal-header">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="color: #00f0ff; font-size: 18px;">✦</span>
      <div class="modal-title">Universal Biometric Pass</div>
    </div>
    <div class="close-btn">✕</div>
  </div>

  <div class="pass-card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div class="token-badge">2100 TRANSIT TOKEN • TEAM MIT GUNASEKARA</div>
        <div class="passenger-name">INUSHA GUNASEKARA</div>
        <div class="passenger-id">PASSENGER ID: ORACLE-2100-MITG-8821</div>
      </div>
      <div style="text-align: right;">
        <div class="sync-badge">📶 NFC SYNCED</div>
        <div style="font-size: 9.5px; color: #94a3b8; margin-top: 2px;">SECTOR 01 ➔ 02</div>
      </div>
    </div>

    <div class="details-grid">
      <div>
        <div class="lbl">Origin Hub</div>
        <div class="val">Quantum Marina Bay</div>
      </div>
      <div>
        <div class="lbl">Destination Spire</div>
        <div class="val">Apex Skyport Hub 04</div>
      </div>
    </div>

    <div class="subgrid">
      <div>
        <div class="lbl">Gate / Bay</div>
        <div class="val" style="color: #00f0ff;">BAY 3–A</div>
      </div>
      <div>
        <div class="lbl">Cradle / Seat</div>
        <div class="val" style="color: #00ff9d;">SEAT 04–A</div>
      </div>
      <div>
        <div class="lbl">Clearance</div>
        <div class="val" style="color: #e2e8f0;">ALL MODES</div>
      </div>
    </div>

    <div class="qr-box">
      <svg width="112" height="112" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="#fff"/>
        <rect x="5" y="5" width="28" height="28" fill="none" stroke="#000" stroke-width="6" rx="4"/>
        <rect x="12" y="12" width="14" height="14" fill="#000" rx="2"/>
        <rect x="67" y="5" width="28" height="28" fill="none" stroke="#000" stroke-width="6" rx="4"/>
        <rect x="74" y="12" width="14" height="14" fill="#000" rx="2"/>
        <rect x="5" y="67" width="28" height="28" fill="none" stroke="#000" stroke-width="6" rx="4"/>
        <rect x="12" y="74" width="14" height="14" fill="#000" rx="2"/>
        <rect x="45" y="45" width="12" height="12" fill="#a855f7" rx="2"/>
        <rect x="44" y="15" width="8" height="8" fill="#00f0ff" rx="1"/>
        <rect x="60" y="45" width="8" height="16" fill="#000" rx="1"/>
        <rect x="45" y="70" width="8" height="8" fill="#000" rx="1"/>
        <rect x="70" y="70" width="12" height="12" fill="#000" rx="1"/>
        <rect x="55" y="74" width="7" height="7" fill="#00ff9d" rx="1"/>
      </svg>
    </div>

    <div style="text-align: center; font-size: 10px; color: #94a3b8; margin-top: 10px;">
      ✓ Scan at any automated gate, pod cradle, or airlock for touchless boarding.
    </div>
  </div>

  <button class="done-btn">Done</button>
</div>
</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
]

subprocess.run(cmd, check=True)

doc = pymupdf.open(pdf_path)
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save(output_png)
print("Updated boarding_pass.png successfully with size:", pix.width, pix.height)
