import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { DEMO_SCENARIOS } from '../../data/mockHealthData';
import { Play, Sparkles, AlertTriangle, ShieldCheck, Siren, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoModeControl() {
  const { activeScenario, setDemoScenario, isEmergencyActive } = useHealth();
  const [isOpen, setIsOpen] = useState(false);

  const scenarioIcons = {
    normal: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    high_risk: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    emergency: <Siren className="w-4 h-4 text-red-600 animate-pulse" />
  };

  const scenarioColors = {
    normal: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    high_risk: "bg-rose-50 text-rose-700 border-rose-200",
    emergency: "bg-red-100 text-red-800 border-red-300 font-semibold"
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-900 to-indigo-950 text-white text-xs font-semibold shadow-sm hover:shadow transition-all border border-slate-700/50"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin-slow" />
        <span>Demo Mode</span>
        <span className={`px-1.5 py-0.5 rounded-full text-[10px] border ${scenarioColors[activeScenario]}`}>
          {DEMO_SCENARIOS[activeScenario]?.label}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 glass-card"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Play className="w-4 h-4 fill-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Hackathon Interactive Demo</h4>
                    <p className="text-[11px] text-slate-500">Switch scenarios to test AI & vitals</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {Object.values(DEMO_SCENARIOS).map((sc) => {
                  const isActive = activeScenario === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => {
                        setDemoScenario(sc.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                        isActive 
                          ? 'border-indigo-500 bg-indigo-50/60 ring-2 ring-indigo-500/20' 
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          sc.id === 'normal' ? 'bg-emerald-100 text-emerald-700' :
                          sc.id === 'warning' ? 'bg-amber-100 text-amber-700' :
                          sc.id === 'high_risk' ? 'bg-rose-100 text-rose-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {scenarioIcons[sc.id]}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{sc.label}</div>
                          <div className="text-[10px] text-slate-500">
                            HR: {sc.vitals.heartRate} | SpO₂: {sc.vitals.spo2}% | Score: {sc.healthScore}
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                Simulated real-time sensor stream
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
