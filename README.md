# 💙 ElderCare AI — Smarter Care. Safer, Loving Aging.

ElderCare AI is a state-of-the-art, AI-powered elderly health monitoring platform designed to connect **Elderly Patients**, **Family Caregivers**, and **Physicians / Doctors** in a unified real-time health intelligence system.

Built with a loving **Blue & White healthcare design aesthetic**, high-contrast typography, and live 24/7 biometric telemetry, ElderCare AI provides proactive early warnings, emergency SOS dispatch, and comprehensive clinical analytics.

---

## 🌟 Highlights & Key Features

### 👴 1. Patient & Elder Portal (`/patient/*`)
- **Split-Screen Healthcare Login (`/login`)**: Role-based access control with 1-click Hackathon Demo login buttons.
- **Patient Dashboard (`/patient/dashboard`)**: Live heart rate (BPM), blood pressure (BP), oxygen (SpO₂), and body temperature streams with animated live-ticking telemetry.
- **Interactive Profile Editing (`/patient/profile`)**: Update patient name, age, phone, email, chronic conditions, and address with instant application-wide state synchronization.
- **2-Second Hold Emergency SOS (`/patient/emergency`)**: Fail-safe 2-second hold SOS trigger with radial progress timer, panic alert dispatch, and fall impact simulation.
- **AI Health Insights (`/patient/ai-health`)**: Neural physiological risk evaluation (composite health score & predictive risk gauge).
- **Vitals Telemetry Deep-Dive (`/patient/vitals`)**: Real-time Recharts interactive graphs with 24H, 7D, and 30D historical filters.

### 👨‍⚕️ 2. Doctor & Caregiver Portal (`/doctor/*`)
- **Executive Physician Command Center (`/doctor/dashboard`)**: Summary metrics (Total Patients, Stable, Needs Attention, Critical), high-priority patient spotlight, and daily consultation schedule.
- **Assigned Patients Directory (`/doctor/patients`)**: Comprehensive patient roster with search, risk status filter pills (🔴 Critical, 🟡 Warning, 🟢 Stable), and Table / Card grid view modes.
- **Patient Chart & Clinical Notes (`/doctor/patient/:id`)**: Real-time patient telemetry, AI risk analysis, and interactive doctor notes editor with instant save notifications.
- **Priority Emergency Alerts Feed (`/doctor/alerts`)**: Prioritized alert queue with one-click direct navigation to individual patient charts.
- **Physician Profile & Credentials (`/doctor/profile`)**: Interactive profile editing for Doctor name, specialty, license ID, phone, email, hospital, and department.

### ☀️ 3. Global Light / Dark Theme Mode
- Default **Friendly Loving Blue & White** healthcare color theme with crisp contrast.
- On-demand animated **Dark Mode** toggle (`ThemeToggle.jsx`) with `localStorage` persistence.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v4 + Custom Vanilla CSS tokens
- **Routing**: React Router DOM v6 with Role-Based Protected Routes
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Data Visualization**: Recharts
- **Linter**: Oxlint (0 errors)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/madhut0904/Eldercare-Ai.git
cd Eldercare-Ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5175](http://localhost:5175) (or assigned port) in your browser.

---

## 📱 Application Structure & Routes

```text
├── /                       # Animated Product Landing Page
├── /login                  # Split-Screen Healthcare Login Page
│
├── /patient/dashboard      # Patient Health Dashboard & Telemetry
├── /patient/vitals         # Biometric Telemetry & Recharts Graphs
├── /patient/ai-health      # AI Health Analysis & Risk Prediction
├── /patient/history        # Vitals History & Export Simulation
├── /patient/emergency      # 2-Second Hold Emergency SOS Center
├── /patient/profile        # Patient Profile & Interactive Editing
├── /patient/settings       # Patient Telemetry Settings
│
├── /doctor/dashboard       # Physician Overview & Priority Spotlight
├── /doctor/patients        # Assigned Patients Directory & Search
├── /doctor/patient/:id     # Patient Chart & Clinical Notes Editor
├── /doctor/ai-analysis     # AI Clinical Intelligence
├── /doctor/alerts          # Prioritized Emergency Alerts Feed
├── /doctor/profile         # Physician Credentials & Profile Editing
└── /doctor/settings        # Physician Console Settings
```

---

## 📄ElderCare AI

A New Innovation in Elderly Healthcare, Built by Madhu.
The final product should feel like an original innovative healthcare solution created by Madhu, not a generic healthcare template.
