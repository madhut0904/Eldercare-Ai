import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HealthProvider } from './context/HealthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Vitals from './pages/Vitals';
import AIAnalysis from './pages/AIAnalysis';
import Family from './pages/Family';
import Emergency from './pages/Emergency';
import History from './pages/History';
import Settings from './pages/Settings';

export default function App() {
  return (
    <HealthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Persistent Dashboard App Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vitals" element={<Vitals />} />
            <Route path="/ai-analysis" element={<AIAnalysis />} />
            <Route path="/family" element={<Family />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HealthProvider>
  );
}
