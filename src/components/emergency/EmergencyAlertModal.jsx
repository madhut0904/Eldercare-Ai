import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Siren, PhoneCall, ShieldAlert, CheckCircle2, XCircle, MapPin, Activity, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmergencyAlertModal() {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, healthData, dismissEmergency } = useHealth();
  const vitals = healthData.vitals;
  const patient = healthData.patient;

  if (!isEmergencyModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Dark Red Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-red-950/80 backdrop-blur-md"
          onClick={() => setIsEmergencyModalOpen(false)}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-500 z-10"
        >
          {/* Top Red Header */}
          <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-3 emergency-pulse">
              <Siren className="w-9 h-9 text-white animate-bounce" />
            </div>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs uppercase tracking-widest border border-white/30">
              🚨 EMERGENCY ALERT TRIGGERED
            </span>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl mt-2 text-white">
              Possible Fall Detected
            </h2>
            <p className="text-red-100 text-xs mt-1">
              Impact detected for <span className="font-bold text-white">{patient.name}</span> in {patient.location}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {/* Vitals Telemetry Grid */}
            <div className="grid grid-cols-2 gap-3 bg-red-50/70 p-4 rounded-2xl border border-red-100">
              <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Heart Rate</div>
                  <div className="text-base font-extrabold text-red-600">{vitals.heartRate.current} BPM</div>
                  <div className="text-[10px] text-red-500 font-bold">Spike Detected</div>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">SpO₂ Level</div>
                  <div className="text-base font-extrabold text-red-600">{vitals.spo2.current}%</div>
                  <div className="text-[10px] text-red-500 font-bold">Critical Dip</div>
                </div>
              </div>
            </div>

            {/* Location & Sensor data */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Location: <strong className="text-slate-900">{patient.location}</strong></span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Last motion: {patient.lastMovement}</span>
            </div>

            {/* Automated Alerts Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Automated Caregiver Dispatches:
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Daughter (Priyanka Kumar) — Alert Sent via SMS/Push</span>
                  </div>
                  <span className="text-[10px] font-bold">Delivered</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Son (Vikram Kumar) — Automated Emergency Call Dispatched</span>
                  </div>
                  <span className="text-[10px] font-bold">Dialing...</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Primary Doctor (Dr. Ananya) — Telemetry Shared</span>
                  </div>
                  <span className="text-[10px] font-bold">Sent</span>
                </div>
              </div>
            </div>

            {/* Emergency Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <a
                href={`tel:${patient.emergencyContact}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 transition-all text-center"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Daughter</span>
              </a>

              <a
                href="tel:108"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all text-center"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Call Ambulance (108)</span>
              </a>

              <button
                onClick={dismissEmergency}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                <XCircle className="w-4 h-4 text-slate-400" />
                <span>Dismiss Alert</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
