import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HealthProvider } from './context/HealthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PatientLayout from './components/layout/PatientLayout';
import DoctorLayout from './components/layout/DoctorLayout';

import Login from './pages/Login';
import Landing from './pages/Landing';


// Patient Pages
import Dashboard from './pages/Dashboard';
import Vitals from './pages/Vitals';
import AIHealth from './pages/AIHealth';
import History from './pages/History';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Doctor Pages
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorPatientsRoster from './pages/DoctorPatientsRoster';
import DoctorPatientDetail from './pages/DoctorPatientDetail';
import DoctorAlerts from './pages/DoctorAlerts';
import DoctorProfile from './pages/DoctorProfile';
import AIAnalysis from './pages/AIAnalysis';

export default function App() {
  return (
    <HealthProvider>
      <BrowserRouter>
        <Routes>
          {/* Root Route is the Product Landing Page */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />


          {/* Patient Portal Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="patient" />}>
            <Route element={<PatientLayout />}>
              <Route path="/patient/dashboard" element={<Dashboard />} />
              <Route path="/patient/vitals" element={<Vitals />} />
              <Route path="/patient/ai-health" element={<AIHealth />} />
              <Route path="/patient/history" element={<History />} />
              <Route path="/patient/emergency" element={<Emergency />} />
              <Route path="/patient/profile" element={<Profile />} />
              <Route path="/patient/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Doctor Portal Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="doctor" />}>
            <Route element={<DoctorLayout />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/patients" element={<DoctorPatientsRoster />} />
              <Route path="/doctor/patient/:id" element={<DoctorPatientDetail />} />
              <Route path="/doctor/ai-analysis" element={<AIAnalysis />} />
              <Route path="/doctor/alerts" element={<DoctorAlerts />} />
              <Route path="/doctor/profile" element={<DoctorProfile />} />
              <Route path="/doctor/settings" element={<Settings />} />
            </Route>
          </Route>



          {/* Fallback to Login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HealthProvider>
  );
}
