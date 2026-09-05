# Farhan Mohammad - Professional Engineering Portfolio

Modern, responsive, and high-performance technical portfolio website for **Farhan Mohammad (Farhan N. M.)**, B.Sc. (Hons) Electrical and Electronics Engineering undergraduate at the Faculty of Engineering, University of Jaffna, Sri Lanka.

---

## Overview & Engineering Identity

- **Full Name**: Farhan Mohammad (Farhan N. M.)
- **Degree**: B.Sc. (Hons) in Electrical and Electronic Engineering (E23 Batch, 2024 - 2028)
- **Institution**: Faculty of Engineering, University of Jaffna (Kilinochchi Premises, Sri Lanka)
- **Primary Disciplines**: Power Systems & Smart Grids, Renewable Energy (Wind/Solar Integration), Analog & Custom PCB Hardware, Embedded Robotics, and Enterprise Computer Networks.
- **Factual Guarantee**: 100% truthful data extracted and synthesized directly from official LinkedIn profile details and academic documents. Zero fabricated metrics or credentials.

---

## Key Features

1. **High-Tech Aesthetic & Clean Academic Design**:
   - Deep slate midnight palette with cyan/electric blue circuit accents.
   - Glassmorphism surface effects with backdrop filters and glowing borders.
   - Fully accessible color contrast (WCAG AAA) and responsive layout (mobile, tablet, desktop).
   - Dark / Light mode toggle with automatic localStorage preference persistence.

2. **Interactive Project Portfolio with Modal Deep Dives**:
   - Filterable projects grid: All Projects, Power & Energy, Embedded & Robotics, Electronics & PCB, Network & Security, Sustainable Systems.
   - In-depth interactive modals with problem statement, circuit/network architecture, key technical implementations, bill of materials/protocols, and verified outcomes.

3. **9 Documented Real-World Engineering Projects**:
   - **Self-Stabilizing Liquid Transport Device (Terrain-Adaptive Rover)**: Dual-axis MPU6050 IMU gimbal rover with 0% fluid spillage over 25cm obstacles.
   - **Faculty Enterprise Network Infrastructure**: 28 VLANs, Layer-3 switching, HSRP core gateway redundancy, Cisco ASA 5505 firewall, and WPA2-Enterprise RADIUS authentication.
   - **Residential Electrical Installation Design**: SLS 730:2000 & IEC 60364 compliant, 8 sub-circuits, 10mA bathroom RCCB, SLD, and BOQ.
   - **Digital Dice (1-6) Sequential Logic System**: NE555 5kHz clock, CD4017 decade counter, diode matrix logic, 7447 BCD decoder, 7-segment display (zero microcontrollers).
   - **Hardware-Only Autonomous Line-Following Robot**: 100% analog decision engine with LM358 comparator and BC547 BJT drivers.
   - **Clap-Activated Acoustic Switch PCB**: KiCad routed PCB with dual monostable timing window and isolated relay control.
   - **Bank-Style Enterprise Network Simulation**: Hierarchical Core-Distribution-Access architecture with OSPF and VLAN segmentation.
   - **Sustainable Redesign of Food Delivery Systems**: Lifecycle assessment (LCA) and circular economy smart reusable RFID containers.
   - **Municipal Solid Waste Management Field Study**: Kattankudy waste stream assessment and environmental analysis.

4. **Academic & Fieldwork Insights**:
   - Palai 20 MW Wind Power Plant field investigation (Joule & Beta Power) analyzing AC-DC-AC converters and grid synchronization.
   - IEEE PES Technical Talk research on AI and predictive maintenance in modern power grids.
   - Published engineering article "The Millau Viaduct" in the IESL Students Chapter series.

5. **Professional Experience & Leadership**:
   - Junior Accountant / Technical Intern at People's Bank Sri Lanka (Awarded Best Performance of the Year).
   - Leadership in IEEE PES Student Branch Chapter (Coordinator & E23 Batch Rep), IEEE Robotics & Automation Society (Batch Coordinator), AWS Cloud Club (Editor), and Undergraduate Association Ampara (Treasurer).

6. **9 Verified Certifications & Licenses**:
   - Direct credential ID copy buttons for IEEE, Google Gemini, Microsoft AI/ML, IAENG, KodeKloud, Hex-Star Space Tech, IBM, and IESL.

7. **Interactive Contact & Printable CV**:
   - Client-side validated contact form with direct mailto dispatcher.
   - Direct link to official LinkedIn PDF CV (`Profile (1).pdf`).
   - Print-optimized CSS (`Ctrl + P`) for generating clean, recruiter-friendly physical copies.

---

## Project File Structure

```
portfolio/
├── index.html                              # Production-ready single-page portfolio
├── assets/
│   ├── css/
│   │   └── style.css                       # Engineering theme, glassmorphism, animations, print rules
│   ├── js/
│   │   ├── data.js                         # 100% verified profile data (easy to update)
│   │   └── app.js                          # Filtering, modals, theme toggler, scroll-spy, form handler
│   └── images/
│       └── farhan-profile.jpg              # High-resolution lab portrait
├── Farhan_Mohammad_ATS_Engineering_CV.docx # Professional ATS-friendly Microsoft Word CV
├── Profile (1).pdf                         # Official LinkedIn PDF CV
└── README.md                               # Documentation & deployment guide
```

---

## How to Run Locally

### Option 1: Direct Browser Opening (Zero Setup)
Simply double-click `index.html` in your file explorer to open the site directly in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python (already installed on your machine):
```bash
python -m http.server 3000
```
Then open your browser and navigate to:
```
http://localhost:3000
```

---

## How to Deploy for Free

### Deploy to GitHub Pages:
1. Create a new GitHub repository named `portfolio` (or `<your-username>.github.io`).
2. Push all files from this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of professional engineering portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings > Pages**.
4. Under **Branch**, select `main` and root `/`, then click **Save**.
5. Your website will be live in 1-2 minutes at: `https://<your-username>.github.io/portfolio/`

### Deploy to Vercel or Netlify:
- Drag and drop this folder directly onto Netlify Drop (app.netlify.com/drop) or import from GitHub into Vercel (vercel.com).
- Instant global SSL and fast CDN deployment with zero configuration.

---

## How to Update Your Profile Information in the Future

All data is separated from markup in `assets/js/data.js`:
- To add a new project, simply append an object to `PORTFOLIO_DATA.projects`.
- To add new certifications, edit `PORTFOLIO_DATA.certifications`.
- To update your headline or contact details, edit `PORTFOLIO_DATA.personal`.

---

(c) 2026 Farhan Mohammad. Faculty of Engineering, University of Jaffna.
