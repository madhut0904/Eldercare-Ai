import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Siren, ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, MapPin, Activity, Radio, RefreshCw, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Emergency() {
  const { healthData, isEmergencyActive, triggerEmergency, dismissEmergency } = useHealth();
  const patient = healthData.patient;
  const vitals = healthData.vitals;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* System Status Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        isEmergencyActive
          ? 'bg-red-600 text-white border-red-700 emergency-pulse shadow-xl'
          : 'bg-white text-slate-900 border-slate-200/80 card-shadow'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
              isEmergencyActive ? 'bg-white/20 text-white animate-bounce' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {isEmergencyActive ? <Siren className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
            </div>
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                isEmergencyActive ? 'text-red-100' : 'text-slate-400'
              }`}>
                SYSTEM GUARDIAN STATUS
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">
                {isEmergencyActive ? '🚨 CRITICAL EMERGENCY ACTIVE' : '🟢 SYSTEM STATUS: OPTIMAL'}
              </h1>
              <p className={`text-xs mt-0.5 ${isEmergencyActive ? 'text-red-100' : 'text-slate-500'}`}>
                {isEmergencyActive
                  ? 'Possible fall detected! Emergency contacts dispatched.'
                  : 'All motion telemetry and fall detectors operating normally.'}
              </p>
            </div>
          </div>

          <div>
            {!isEmergencyActive ? (
              <button
                onClick={triggerEmergency}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
              >
                <Siren className="w-4 h-4 animate-pulse" />
                <span>Simulate Emergency Fall</span>
              </button>
            ) : (
              <button
                onClick={dismissEmergency}
                className="px-6 py-3.5 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Reset System & Dismiss</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Telemetry Monitor Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Fall Detector telemetry */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Fall Detection & Motion Telemetry</h3>
                <p className="text-xs text-slate-500">ElderCare Sensor Node v2 • Living Room</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Active Sensor Stream
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Detection Status</div>
              <div className={`text-base font-extrabold mt-1 ${isEmergencyActive ? 'text-red-600' : 'text-emerald-600'}`}>
                {isEmergencyActive ? 'FALL IMPACT DETECTED' : 'Monitoring Normal'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Last Movement</div>
              <div className="text-base font-extrabold text-slate-900 mt-1">{patient.lastMovement}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Monitored Location</div>
              <div className="text-base font-extrabold text-slate-900 mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{patient.location}</span>
              </div>
            </div>
          </div>

          {/* Fall Impact Simulation Display */}
          {isEmergencyActive ? (
            <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-4">
              <div className="flex items-center justify-between text-red-800 font-extrabold text-sm">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  🚨 LIVE EMERGENCY DATA STREAM
                </span>
                <span className="text-xs bg-red-200 px-2 py-0.5 rounded text-red-900 font-mono">HIGH SEVERITY</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-800">
                <div className="p-3 bg-white rounded-xl border border-red-200">
                  Heart Rate Spike: <span className="text-red-600 font-extrabold text-base">126 BPM</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-red-200">
                  SpO₂ Saturation: <span className="text-red-600 font-extrabold text-base">89%</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-red-900">
                <div className="font-bold uppercase tracking-wider text-[10px] text-red-700">Notifications Sent:</div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✓ Daughter (Priyanka) — High Priority Push & Call</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✓ Son (Vikram) — Automated Voice Alert</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✓ Caregiver (Dr. Ananya) — Full Telemetry Package</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-emerald-600" />
              <span>Fall sensors and accelerometer algorithms calibrated for living room, bedroom, and bathroom areas.</span>
            </div>
          )}
        </div>

        {/* Dispatch Controls & Rapid Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Rapid Response Controls
            </h3>

            <div className="space-y-3">
              <a
                href={`tel:${patient.emergencyContact}`}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-lg shadow-red-600/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5" />
                  <div>
                    <div className="text-sm">Call Primary Guardian</div>
                    <div className="text-[10px] text-red-200">Priyanka Kumar ({patient.emergencyContact})</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-white/20 text-[10px]">Instant Dial</span>
              </a>

              <a
                href="tel:108"
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <Siren className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-sm">Dispatch Ambulance (108)</div>
                    <div className="text-[10px] text-slate-400">Emergency Medical Response Services</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-white/20 text-[10px]">Emergency</span>
              </a>

              <button
                onClick={triggerEmergency}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-extrabold text-xs transition-all"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-rose-600" />
                  <div>
                    <div className="text-sm">Run Interactive Demo Fall Scenario</div>
                    <div className="text-[10px] text-rose-600">Simulate abnormal vitals & alerts for judges</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500">
            Emergency Center operates 24/7 with zero latency.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
