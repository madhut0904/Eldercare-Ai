import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Settings as SettingsIcon, User, Bell, ShieldCheck, Lock, Activity, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const { healthData, liveTicking, setLiveTicking, theme } = useHealth();
  const isDark = theme === 'dark';
  const patient = healthData.patient;

  // Form states
  const [profile, setProfile] = useState({
    name: patient.name,
    age: patient.age,
    emergencyContact: patient.emergencyContact,
    primaryDoctor: patient.primaryDoctor
  });

  const [toggles, setToggles] = useState({
    healthAlerts: true,
    emergencyAlerts: true,
    familyNotifications: true,
    heartRateMonitoring: true,
    fallDetection: true,
    spo2Monitoring: true,
    dataSharing: true,
    caregiverAccess: true,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 card-shadow transition-colors">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">
            <SettingsIcon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Platform Configuration</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            System Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure telemetry sensors, notification thresholds, emergency contacts, and privacy.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4 text-emerald-400" />
          <span>Save Changes</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs text-center shadow-lg flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings updated successfully!</span>
        </div>
      )}

      {/* Grid: Profile settings (Left) + Toggles (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-5 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Elder Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personal & emergency contact details</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Age</label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Emergency Contact</label>
              <input
                type="text"
                value={profile.emergencyContact}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono font-semibold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Assigned Physician</label>
              <input
                type="text"
                value={profile.primaryDoctor}
                onChange={(e) => setProfile({ ...profile, primaryDoctor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-semibold"
              />
            </div>
          </form>
        </div>

        {/* System & Notification Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Notifications Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-4 transition-colors">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Notification Preferences</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Configure alert delivery channels</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'healthAlerts', label: 'Health Anomaly Alerts', desc: 'Receive instant alerts when vitals deviate from baseline.' },
                { key: 'emergencyAlerts', label: 'Emergency Fall Alerts', desc: 'High-priority SMS & automated call dispatches.' },
                { key: 'familyNotifications', label: 'Family Status Syncing', desc: 'Share daily health summary with family members.' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(item.key)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      toggles[item.key] ? (isDark ? 'bg-blue-600' : 'bg-slate-900') : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      toggles[item.key] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sensor Monitoring Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-4 transition-colors">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Sensor Telemetry Controls</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Enable or pause individual sensor modules</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: 'heartRateMonitoring', label: 'Heart Rate Stream', desc: 'Electrocardiogram telemetry every 3 seconds.' },
                { key: 'fallDetection', label: 'Fall Detection Sensor', desc: 'Accelerometer & motion impact algorithms.' },
                { key: 'spo2Monitoring', label: 'SpO₂ Monitoring Module', desc: 'Continuous oxygen saturation check.' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(item.key)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      toggles[item.key] ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                      toggles[item.key] ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              ))}

              {/* Live Ticking Toggle for Demo */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                <div>
                  <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">Live Micro-Jitter Telemetry Simulator</div>
                  <div className="text-[10px] text-indigo-700 dark:text-indigo-300">Simulate live heart rate ticking for hackathon demo.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setLiveTicking(!liveTicking)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    liveTicking ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    liveTicking ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
