import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_HEALTH_DATA, 
  DEMO_SCENARIOS, 
  INITIAL_ALERTS, 
  DOCTOR_METRICS, 
  MOCK_PATIENTS_TABLE, 
  MOCK_DOCTOR_ALERTS, 
  INITIAL_PATIENT_NOTES 
} from '../data/mockHealthData';

const HealthContext = createContext(null);

export const HealthProvider = ({ children }) => {
  const [healthData, setHealthData] = useState(INITIAL_HEALTH_DATA);
  const [activeScenario, setActiveScenario] = useState('normal');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [liveTicking, setLiveTicking] = useState(true);

  // Auth & Role State backed by localStorage
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  // Global Theme State: 'light' (default) | 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };


  // Doctor Dataset State
  const [doctorMetrics, setDoctorMetrics] = useState(DOCTOR_METRICS);
  const [patientsTable, setPatientsTable] = useState(MOCK_PATIENTS_TABLE);
  const [doctorAlerts, setDoctorAlerts] = useState(MOCK_DOCTOR_ALERTS);
  const [patientNotes, setPatientNotes] = useState(INITIAL_PATIENT_NOTES);

  const updatePatientProfile = (updatedProfile) => {
    setHealthData(prev => ({
      ...prev,
      patient: {
        ...prev.patient,
        ...updatedProfile
      }
    }));
    setPatientsTable(prev => prev.map((p, idx) => idx === 0 ? { ...p, ...updatedProfile } : p));
  };

  const updateDoctorProfile = (updatedDoctor) => {
    setDoctorMetrics(prev => ({
      ...prev,
      ...updatedDoctor
    }));
  };


  const loginAsPatient = () => {
    localStorage.setItem("role", "patient");
    setRole("patient");
  };

  const loginAsDoctor = () => {
    localStorage.setItem("role", "doctor");
    setRole("doctor");
  };

  const logout = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  const saveDoctorNote = (patientId, noteText) => {
    setPatientNotes(prev => ({
      ...prev,
      [patientId]: noteText
    }));
  };

  // Switch demo scenarios for patient
  const setDemoScenario = (scenarioKey) => {
    const preset = DEMO_SCENARIOS[scenarioKey];
    if (!preset) return;

    setActiveScenario(scenarioKey);
    setIsEmergencyActive(preset.isEmergency);

    if (preset.isEmergency) {
      setIsEmergencyModalOpen(true);
      const emergencyAlert = {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: "🚨 EMERGENCY: Fall Impact Detected",
        description: "Living Room sensor recorded high impact & heart rate spike to 126 BPM.",
        type: "emergency",
        status: "🔴 Critical",
        date: "Just now"
      };
      setAlerts(prev => [emergencyAlert, ...prev]);
    } else {
      setIsEmergencyModalOpen(false);
    }

    setHealthData(prev => ({
      ...prev,
      scenario: scenarioKey,
      healthScore: preset.healthScore,
      status: preset.status,
      vitals: {
        ...prev.vitals,
        heartRate: {
          ...prev.vitals.heartRate,
          current: preset.vitals.heartRate,
          status: preset.vitals.heartRate > 110 ? "Critical" : preset.vitals.heartRate > 95 ? "Warning" : "Normal"
        },
        spo2: {
          ...prev.vitals.spo2,
          current: preset.vitals.spo2,
          status: preset.vitals.spo2 < 92 ? "Critical" : preset.vitals.spo2 < 95 ? "Warning" : "Normal"
        },
        bloodPressure: {
          ...prev.vitals.bloodPressure,
          systolic: preset.vitals.bloodPressure.systolic,
          diastolic: preset.vitals.bloodPressure.diastolic,
          status: preset.vitals.bloodPressure.systolic > 140 ? "Elevated" : "Normal"
        },
        temperature: {
          ...prev.vitals.temperature,
          current: preset.vitals.temperature,
          status: preset.vitals.temperature > 37.8 ? "Fever Warning" : "Normal"
        },
        activity: {
          ...prev.vitals.activity,
          steps: preset.vitals.steps
        }
      },
      aiInsight: {
        ...prev.aiInsight,
        riskLevel: preset.riskLevel,
        riskPercentage: preset.riskPercentage,
        confidence: preset.confidence,
        headline: preset.aiHeadline,
        summary: preset.aiSummary,
        prediction: preset.aiPrediction
      }
    }));
  };

  const triggerEmergency = () => {
    setDemoScenario('emergency');
  };

  const dismissEmergency = () => {
    setIsEmergencyActive(false);
    setIsEmergencyModalOpen(false);
    setDemoScenario('normal');
  };

  // Live heart rate micro-jitter
  useEffect(() => {
    if (!liveTicking) return;

    const interval = setInterval(() => {
      setHealthData(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const currentHR = prev.vitals.heartRate.current;
        const newHR = Math.max(55, Math.min(140, currentHR + delta));

        return {
          ...prev,
          vitals: {
            ...prev.vitals,
            heartRate: {
              ...prev.vitals.heartRate,
              current: newHR
            }
          }
        };
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [liveTicking]);

  return (
    <HealthContext.Provider value={{
      healthData,
      activeScenario,
      setDemoScenario,
      isEmergencyActive,
      isEmergencyModalOpen,
      setIsEmergencyModalOpen,
      triggerEmergency,
      dismissEmergency,
      alerts,
      setAlerts,
      liveTicking,
      setLiveTicking,
      role,
      setRole,
      loginAsPatient,
      loginAsDoctor,
      logout,
      doctorMetrics,
      patientsTable,
      doctorAlerts,
      patientNotes,
      saveDoctorNote,
      theme,
      setTheme,
      toggleTheme,
      updatePatientProfile,
      updateDoctorProfile
    }}>
      {children}
    </HealthContext.Provider>
  );
};


export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

