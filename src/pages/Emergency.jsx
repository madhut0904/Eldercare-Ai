import React, { useState, useRef } from 'react';
import { useHealth } from '../context/HealthContext';
import { Siren, ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, MapPin, Activity, XCircle, Heart, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Emergency() {
  const { healthData } = useHealth();
  const patient = healthData.patient;

  // Press and hold state
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);

  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  const startHold = () => {
    if (isAlertTriggered) return;
    setIsHolding(true);
    setHoldProgress(0);

    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(intervalRef.current);
        setIsHolding(false);
        setIsAlertTriggered(true);
      }
    }, 50);
  };

  const cancelHold = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsHolding(false);
    setHoldProgress(0);
  };

  const cancelAlert = () => {
    setIsAlertTriggered(false);
    setHoldProgress(0);
    setIsHolding(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 select-none">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-rose-500/10 text-rose-600 border border-rose-500/20 inline-flex items-center gap-1.5">
          <Siren className="w-4 h-4 animate-bounce text-rose-600" /> Emergency Response System
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900">
          Elder Emergency SOS Center
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
          Single clicks are protected against accidental activation. Press and hold the emergency button for 2 seconds to signal guardians and doctor.
        </p>
      </div>

      {/* Main SOS Trigger Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl text-center space-y-8 relative overflow-hidden">
        
        {!isAlertTriggered ? (
          <div className="space-y-6">
            {/* Press and Hold Circle Button */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
              
              {/* Animated pulse rings */}
              <div className="absolute inset-0 rounded-full bg-rose-500/10 animate-ping pointer-events-none" />
              <div className="absolute inset-4 rounded-full bg-rose-500/20 animate-pulse pointer-events-none" />

              {/* Progress Radial Overlay */}
              {isHolding && (
                <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none z-10">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="46%"
                    className="stroke-rose-600 fill-none stroke-[8px]"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * holdProgress) / 100}
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* Main Hold Button */}
              <button
                onMouseDown={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={startHold}
                onTouchEnd={cancelHold}
                className={`w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-rose-600 via-red-600 to-rose-500 text-white font-black shadow-2xl shadow-rose-600/50 flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 z-20 cursor-pointer ${
                  isHolding ? 'scale-95 ring-8 ring-rose-400/40' : 'hover:scale-105'
                }`}
              >
                <div className="text-4xl sm:text-5xl">🚨</div>
                <div className="text-lg sm:text-xl tracking-wider uppercase font-black">EMERGENCY</div>
                <div className="text-[10px] text-rose-100 font-semibold max-w-[120px] leading-tight">
                  {isHolding ? `HOLD (${Math.round(holdProgress)}%)` : 'PRESS & HOLD 2 SECONDS'}
                </div>
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-700">
                Press and hold for emergency assistance
              </p>
              <p className="text-[11px] text-slate-400">
                Protected against single-click accidental triggers.
              </p>
            </div>
          </div>
        ) : (
          /* TRIGGERED EMERGENCY ALERT MODAL / DISPLAY */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-left"
          >
            {/* Header Alert Card */}
            <div className="p-6 rounded-2xl bg-rose-600 text-white shadow-xl space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-200 flex items-center gap-2">
                  <Siren className="w-5 h-5 animate-bounce text-white" /> Emergency Protocol Active
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-rose-700 shadow-sm">
                  DISPATCHED
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                🚨 Emergency Alert Sent
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 font-medium">
                Your emergency contacts and doctor have been notified.
              </p>
            </div>

            {/* Vitals Telemetry Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> Location
                </div>
                <div className="text-sm font-black text-slate-900 mt-1">
                  Home — Living Room
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> Heart Rate
                </div>
                <div className="text-sm font-black text-rose-600 mt-1">
                  126 BPM (Spike)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-500" /> SpO₂ Saturation
                </div>
                <div className="text-sm font-black text-rose-600 mt-1">
                  89% (Critical Low)
                </div>
              </div>
            </div>

            {/* Notification Confirmation List */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs font-semibold text-emerald-950">
              <div className="font-extrabold uppercase text-[10px] text-emerald-800 tracking-wider">
                Confirmed Receiver Dispatches:
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>✓ Daughter (Priyanka Kumar) — High priority SMS & Voice Call</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>✓ Primary Care Physician (Dr. Ananya Sharma) — Live Telemetry Transmission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>✓ Emergency Response Hotline (108) — Location Coordinates Sent</span>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="text-center pt-2">
              <button
                onClick={cancelAlert}
                className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
              >
                <XCircle className="w-4 h-4 text-slate-600" />
                <span>Cancel Alert</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
