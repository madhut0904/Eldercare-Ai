// Centralized Mock Health Data & Scenarios for ElderCare AI

export const INITIAL_HEALTH_DATA = {
  patient: {
    name: "Ramesh Kumar",
    age: 68,
    gender: "Male",
    bloodGroup: "O+",
    primaryDoctor: "Dr. Ananya Sharma (Cardiologist)",
    emergencyContact: "+91 98765 43210",
    location: "Home — Living Room",
    lastMovement: "12 seconds ago",
    deviceStatus: "Connected (ElderCare Smart Sensor v2)",
    battery: "92%"
  },
  scenario: "normal", // 'normal' | 'warning' | 'high_risk' | 'emergency'
  healthScore: 82,
  status: "Stable", // "Stable" | "Warning" | "High Risk" | "Critical Emergency"
  vitals: {
    heartRate: {
      current: 72,
      min: 64,
      max: 88,
      avg: 71,
      unit: "BPM",
      status: "Normal",
      trend: "+2% today",
      isWarning: false
    },
    spo2: {
      current: 97,
      min: 95,
      max: 99,
      avg: 97.2,
      unit: "%",
      status: "Normal",
      trend: "+1.2%",
      isWarning: false
    },
    bloodPressure: {
      systolic: 120,
      diastolic: 80,
      unit: "mmHg",
      status: "Normal",
      trend: "Optimal",
      isWarning: false
    },
    temperature: {
      current: 36.7,
      min: 36.4,
      max: 37.1,
      unit: "°C",
      status: "Normal",
      trend: "Stable",
      isWarning: false
    },
    activity: {
      steps: 6432,
      goal: 8000,
      calories: 340,
      activeMinutes: 42,
      percentage: 80,
      status: "On Track",
      trend: "+8% vs yesterday"
    }
  },
  aiInsight: {
    riskLevel: "LOW", // "LOW" | "MODERATE" | "HIGH" | "CRITICAL"
    riskPercentage: 18,
    confidence: 94,
    headline: "Your health indicators are currently stable.",
    summary: "Heart rate and SpO₂ are within optimal physiological ranges. Physical activity has increased by 8% compared with yesterday.",
    prediction: "Cardiovascular Stress Risk",
    recommendations: [
      { id: 1, text: "Maintain regular light physical activity like morning walking.", category: "Activity", priority: "Low" },
      { id: 2, text: "Keep evening hydration consistent before 8:00 PM.", category: "Hydration", priority: "Low" },
      { id: 3, text: "Continue routine daily health telemetry check-ins.", category: "Monitoring", priority: "Low" }
    ]
  }
};

// Scenario presets for interactive Demo Mode
export const DEMO_SCENARIOS = {
  normal: {
    id: "normal",
    label: "Normal Status",
    healthScore: 82,
    status: "Stable",
    riskLevel: "LOW",
    riskPercentage: 18,
    confidence: 94,
    vitals: {
      heartRate: 72,
      spo2: 97,
      bloodPressure: { systolic: 120, diastolic: 80 },
      temperature: 36.7,
      steps: 6432
    },
    aiHeadline: "Health indicators are stable and normal.",
    aiSummary: "Heart rate and SpO₂ are within normal physiological ranges. Activity has increased by 8% compared with yesterday.",
    aiPrediction: "Cardiovascular Stress",
    isEmergency: false
  },
  warning: {
    id: "warning",
    label: "Warning Alert",
    healthScore: 64,
    status: "Warning",
    riskLevel: "MODERATE",
    riskPercentage: 48,
    confidence: 89,
    vitals: {
      heartRate: 102,
      spo2: 94,
      bloodPressure: { systolic: 138, diastolic: 88 },
      temperature: 37.6,
      steps: 2150
    },
    aiHeadline: "Elevated Heart Rate & Mild Oxygen Dip Detected.",
    aiSummary: "Resting heart rate exceeded 100 BPM for >25 minutes with slight reduction in SpO₂. Reduced mobility observed today.",
    aiPrediction: "Mild Dehydration & Fatigue",
    isEmergency: false
  },
  high_risk: {
    id: "high_risk",
    label: "High Risk Scenario",
    healthScore: 48,
    status: "High Risk",
    riskLevel: "HIGH",
    riskPercentage: 76,
    confidence: 92,
    vitals: {
      heartRate: 118,
      spo2: 90,
      bloodPressure: { systolic: 152, diastolic: 96 },
      temperature: 38.2,
      steps: 890
    },
    aiHeadline: "High Cardiovascular & Thermal Stress Alert!",
    aiSummary: "Continuous tachycardia detected with sustained fever and SpO₂ down to 90%. Early warning system advises caregiver verification.",
    aiPrediction: "Acute Respiratory / Thermal Stress",
    isEmergency: false
  },
  emergency: {
    id: "emergency",
    label: "Critical Emergency (Fall)",
    healthScore: 25,
    status: "Critical Emergency",
    riskLevel: "CRITICAL",
    riskPercentage: 96,
    confidence: 98,
    vitals: {
      heartRate: 126,
      spo2: 89,
      bloodPressure: { systolic: 160, diastolic: 100 },
      temperature: 36.5,
      steps: 6432
    },
    aiHeadline: "CRITICAL: Possible Fall Event & High Heart Rate!",
    aiSummary: "Sudden impact pattern detected by motion telemetry in Home — Living Room. Rapid spike in heart rate to 126 BPM.",
    aiPrediction: "Fall Impact with Panic Response",
    isEmergency: true
  }
};

// Historical 24H data generator
export const HISTORICAL_24H = [
  { time: "00:00", heartRate: 64, spo2: 98, bpSystolic: 118, bpDiastolic: 78, temp: 36.5, steps: 0 },
  { time: "02:00", heartRate: 62, spo2: 98, bpSystolic: 116, bpDiastolic: 76, temp: 36.4, steps: 0 },
  { time: "04:00", heartRate: 60, spo2: 99, bpSystolic: 115, bpDiastolic: 75, temp: 36.4, steps: 0 },
  { time: "06:00", heartRate: 68, spo2: 97, bpSystolic: 121, bpDiastolic: 80, temp: 36.6, steps: 350 },
  { time: "08:00", heartRate: 78, spo2: 97, bpSystolic: 124, bpDiastolic: 82, temp: 36.8, steps: 1840 },
  { time: "10:00", heartRate: 74, spo2: 98, bpSystolic: 122, bpDiastolic: 81, temp: 36.7, steps: 3200 },
  { time: "12:00", heartRate: 71, spo2: 97, bpSystolic: 119, bpDiastolic: 79, temp: 36.7, steps: 4100 },
  { time: "14:00", heartRate: 76, spo2: 96, bpSystolic: 123, bpDiastolic: 82, temp: 36.9, steps: 5200 },
  { time: "16:00", heartRate: 73, spo2: 97, bpSystolic: 120, bpDiastolic: 80, temp: 36.8, steps: 5900 },
  { time: "18:00", heartRate: 72, spo2: 97, bpSystolic: 120, bpDiastolic: 80, temp: 36.7, steps: 6432 },
  { time: "20:00", heartRate: 69, spo2: 98, bpSystolic: 118, bpDiastolic: 79, temp: 36.6, steps: 6432 },
  { time: "22:00", heartRate: 66, spo2: 98, bpSystolic: 117, bpDiastolic: 77, temp: 36.5, steps: 6432 }
];

// Historical 7D data
export const HISTORICAL_7D = [
  { day: "Mon", healthScore: 86, avgHR: 70, minHR: 62, maxHR: 84, avgSpO2: 98, bpSystolic: 118, bpDiastolic: 78, steps: 7800 },
  { day: "Tue", healthScore: 84, avgHR: 72, minHR: 64, maxHR: 86, avgSpO2: 97, bpSystolic: 120, bpDiastolic: 80, steps: 7200 },
  { day: "Wed", healthScore: 88, avgHR: 69, minHR: 61, maxHR: 82, avgSpO2: 98, bpSystolic: 117, bpDiastolic: 77, steps: 8100 },
  { day: "Thu", healthScore: 80, avgHR: 75, minHR: 65, maxHR: 92, avgSpO2: 96, bpSystolic: 124, bpDiastolic: 82, steps: 5400 },
  { day: "Fri", healthScore: 83, avgHR: 73, minHR: 63, maxHR: 85, avgSpO2: 97, bpSystolic: 121, bpDiastolic: 81, steps: 6800 },
  { day: "Sat", healthScore: 81, avgHR: 74, minHR: 64, maxHR: 88, avgSpO2: 97, bpSystolic: 122, bpDiastolic: 81, steps: 6100 },
  { day: "Sun", healthScore: 82, avgHR: 72, minHR: 63, maxHR: 87, avgSpO2: 97, bpSystolic: 120, bpDiastolic: 80, steps: 6432 }
];

// Historical 30D data summary
export const HISTORICAL_30D = Array.from({ length: 30 }, (_, i) => {
  const dayNum = i + 1;
  const baseHR = 70 + Math.floor(Math.sin(i / 3) * 5);
  const baseSpO2 = 97 + (i % 2 === 0 ? 1 : 0);
  const score = 80 + Math.floor(Math.cos(i / 4) * 8);
  return {
    day: `Day ${dayNum}`,
    date: `Aug ${dayNum}`,
    healthScore: Math.min(95, Math.max(70, score)),
    avgHR: baseHR,
    avgSpO2: baseSpO2,
    bpSystolic: 118 + (i % 4),
    steps: 5500 + (i * 120) % 3500
  };
});

// Recent Timeline Alerts
export const INITIAL_ALERTS = [
  {
    id: 1,
    time: "10:42 AM",
    title: "Heart rate returned to normal",
    description: "Settled back down to 72 BPM after morning walk.",
    type: "success",
    status: "🟢 Stable",
    date: "Today"
  },
  {
    id: 2,
    time: "08:15 AM",
    title: "Low activity detected",
    description: "No movement recorded for 45 mins after waking.",
    type: "warning",
    status: "🟡 Attention",
    date: "Today"
  },
  {
    id: 3,
    time: "Yesterday, 09:30 PM",
    title: "Daily health check completed",
    description: "All vitals recorded within standard parameters.",
    type: "success",
    status: "🟢 Completed",
    date: "Yesterday"
  },
  {
    id: 4,
    time: "2 days ago, 04:15 PM",
    title: "SpO₂ Minor Dip (94%)",
    description: "Oxygen saturation momentarily dipped to 94%. Rebounded in 5 minutes.",
    type: "info",
    status: "ℹ️ Resolved",
    date: "2 days ago"
  }
];

// Family & Caregiver contacts
export const CARE_NETWORK = [
  {
    id: 1,
    name: "Priyanka Kumar",
    role: "Daughter (Primary Guardian)",
    relation: "Family",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    status: "Online",
    phone: "+91 98765 11111",
    lastContact: "10 mins ago",
    isAvailable: true
  },
  {
    id: 2,
    name: "Vikram Kumar",
    role: "Son",
    relation: "Family",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    status: "Offline",
    phone: "+91 98765 22222",
    lastContact: "2 hours ago",
    isAvailable: false
  },
  {
    id: 3,
    name: "Dr. Ananya Sharma",
    role: "Primary Caregiver / Physician",
    relation: "Medical",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
    status: "Available on Call",
    phone: "+91 98765 33333",
    lastContact: "Yesterday",
    isAvailable: true
  }
];

// Doctor Summary Metrics
export const DOCTOR_METRICS = {
  totalPatients: 128,
  stable: 104,
  needsAttention: 18,
  critical: 6,
  doctorName: "Dr. Ananya Sharma",
  specialty: "Cardiology & Geriatric Medicine"
};

// Doctor Patients Table Dataset
export const MOCK_PATIENTS_TABLE = [
  {
    id: "elder-1",
    name: "Ramesh Kumar",
    age: 68,
    heartRate: "72 BPM",
    heartRateNum: 72,
    spo2: "97%",
    spo2Num: 97,
    bp: "120/80",
    temp: "36.7°C",
    healthScore: 82,
    risk: "Low",
    riskCategory: "low",
    statusBadge: "🟢 Low",
    lastUpdated: "2 min ago",
    condition: "Mild Hypertension & Age-related Arrhythmia",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    detectedPatterns: [
      "Stable heart rate",
      "Normal SpO₂",
      "Normal temperature",
      "Normal activity"
    ]
  },
  {
    id: "elder-2",
    name: "Lakshmi Devi",
    age: 71,
    heartRate: "102 BPM",
    heartRateNum: 102,
    spo2: "94%",
    spo2Num: 94,
    bp: "138/88",
    temp: "37.4°C",
    healthScore: 64,
    risk: "Moderate",
    riskCategory: "moderate",
    statusBadge: "🟡 Moderate",
    lastUpdated: "5 min ago",
    condition: "Resting Tachycardia & Oxygen Saturation Fluctuation",
    avatar: "https://images.unsplash.com/photo-1566616213894-269115ecf328?auto=format&fit=crop&q=80&w=200",
    detectedPatterns: [
      "Resting heart rate > 100 BPM for 25 mins",
      "Mild SpO₂ dip to 94%",
      "Slightly reduced physical mobility",
      "Elevated evening systolic pressure"
    ]
  },
  {
    id: "elder-3",
    name: "Suresh Rao",
    age: 74,
    heartRate: "126 BPM",
    heartRateNum: 126,
    spo2: "89%",
    spo2Num: 89,
    bp: "158/96",
    temp: "38.2°C",
    healthScore: 35,
    risk: "High",
    riskCategory: "high",
    statusBadge: "🔴 High",
    lastUpdated: "1 min ago",
    condition: "Acute Hypoxemia & Sudden Tachycardia / Fall Event",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    detectedPatterns: [
      "CRITICAL: SpO₂ dropped to 89%",
      "CRITICAL: Heart rate elevated to 126 BPM",
      "Sustained thermal elevation (38.2°C)",
      "High impact movement recorded"
    ]
  },
  {
    id: "elder-4",
    name: "Meena Rao",
    age: 69,
    heartRate: "68 BPM",
    heartRateNum: 68,
    spo2: "99%",
    spo2Num: 99,
    bp: "118/76",
    temp: "36.5°C",
    healthScore: 91,
    risk: "Low",
    riskCategory: "low",
    statusBadge: "🟢 Low",
    lastUpdated: "8 min ago",
    condition: "Routine Post-Op Telemetry & Joint Recovery",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
    detectedPatterns: [
      "Optimal cardiac rhythm",
      "Excellent oxygen saturation (99%)",
      "Consistent activity pace",
      "Normal temperature"
    ]
  }
];

// Doctor Alerts Feed
export const MOCK_DOCTOR_ALERTS = [
  {
    id: "alert-1",
    level: "HIGH RISK",
    riskCategory: "high",
    patientId: "elder-3",
    patientName: "Suresh Rao",
    age: 74,
    description: "SpO₂ dropped to 89% • Heart rate increased to 126 BPM",
    timeAgo: "1 minute ago",
    vitalsSummary: "HR: 126 BPM | SpO₂: 89% | BP: 158/96",
    location: "Home — Living Room"
  },
  {
    id: "alert-2",
    level: "MODERATE RISK",
    riskCategory: "moderate",
    patientId: "elder-2",
    patientName: "Lakshmi Devi",
    age: 71,
    description: "Heart rate continuously increasing over 25 minutes (102 BPM).",
    timeAgo: "5 minutes ago",
    vitalsSummary: "HR: 102 BPM | SpO₂: 94% | BP: 138/88",
    location: "Bed 302 — East Wing"
  }
];

// Default Doctor Notes Map
export const INITIAL_PATIENT_NOTES = {
  "elder-1": "Patient showing steady recovery. Advised morning 20-min walking and hydration.",
  "elder-2": "Increased monitoring interval to every 5 minutes. Check SpO2 sensor placement.",
  "elder-3": "🚨 URGENT: Oxygen concentrator verification requested. Family notified.",
  "elder-4": "Routine progress optimal. Continue current prescription."
};

