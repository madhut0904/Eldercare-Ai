# ElderCare AI — Smarter Care. Safer Aging.

ElderCare AI is a modern, AI-powered elderly health monitoring SaaS frontend application built for hackathon demonstration. It features real-time non-invasive biometric telemetry streams, predictive health risk modeling, caregiver network management, and a dedicated emergency response center with interactive fall simulation.

---

## 🌟 Key Features

- **Interactive Hackathon Demo Mode**: Switch between *Normal*, *Warning Alert*, *High Risk*, and *Critical Emergency* scenarios instantaneously to showcase system reactivity.
- **Real-Time Vitals Simulation**: Live heart rate micro-jitter ticks every 3.5s to make the telemetry streams feel alive.
- **Emergency Fall Detection Center**: Simulates fall impact events, displays emergency vitals, triggers red alert overlays, dispatches caregiver notifications, and initiates emergency actions.
- **Predictive AI Health Analysis**: Composite physiological risk gauge, cardiovascular stress forecasting, detected neural pattern vectors, and clinical recommendation banners.
- **Caregiver & Family Portal**: Ramesh Kumar (68y) profile dashboard, real-time vital status sharing, and quick contact shortcuts for family members and assigned physician.
- **Biometric Analytics & History**: Interactive Recharts graphs with 24H, 7D, and 30D timeframe filters and PDF/CSV export report simulation.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4 + Vanilla CSS Custom Utilities
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context (`HealthContext`)

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

### 3. Start the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or assigned port) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📱 Pages & Structure

- `/` — Modern Medical SaaS Landing Page
- `/dashboard` — Patient Vitality Index & Live Telemetry Dashboard
- `/vitals` — Deep-dive Biometric Telemetry (Heart Rate, SpO₂, BP, Temp)
- `/ai-analysis` — Predictive Risk Inference & Neural Pattern Analysis
- `/family` — Caregiver Network & Family Status Portal
- `/emergency` — Emergency Control Center & Interactive Fall Simulator
- `/history` — Historical Analytics & Export Reports
- `/settings` — Sensor Telemetry Toggles & Platform Configuration

---

## 📄 License

This project is created for hackathon demonstration purposes.
