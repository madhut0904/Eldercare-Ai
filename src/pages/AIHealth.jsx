import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Bot, Sparkles, TrendingUp, AlertCircle, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIHealth() {
  const { healthData } = useHealth();
  const aiInsight = healthData.aiInsight;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-600/15 border border-blue-500 relative overflow-hidden"
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/20 text-white border border-white/30 uppercase tracking-widest inline-flex items-center gap-1.5 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" /> Intelligent Health Analytics
            </span>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              AI HEALTH ANALYSIS & CARE
            </h1>
            <p className="text-xs sm:text-sm text-blue-100">
              Real-time physiological risk evaluation based on 24-hour loving care telemetry.
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold">
            <Bot className="w-8 h-8" />
          </div>
        </div>
      </motion.div>


      {/* Main Grid: Risk Score & Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Current Risk Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Current Risk</span>
          <div className="flex items-baseline gap-3">
            <h2 className="font-heading font-black text-4xl text-emerald-600">LOW</h2>
            <span className="text-2xl font-bold text-slate-700">42%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[42%] rounded-full" />
          </div>
          <p className="text-xs text-slate-500">
            Cardiovascular stress and oxygen saturation risk indicators remain within safe physiological limits.
          </p>
        </div>

        {/* Confidence Level Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">AI Confidence Score</span>
          <div className="flex items-baseline gap-3">
            <h2 className="font-heading font-black text-4xl text-indigo-600">94%</h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">High Reliability</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-[94%] rounded-full" />
          </div>
          <p className="text-xs text-slate-500">
            Evaluated against 14,200+ clinical geriatric physiological telemetry datasets.
          </p>
        </div>
      </div>

      {/* Trend Analysis Box */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          Physiological Trend Analysis
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-600">Heart Rate</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">Stable</div>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">🟢 72 BPM</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-600">SpO₂ Oxygen</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">Stable</div>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded-md">🫁 97%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-600">Activity</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">Slightly decreasing</div>
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">🚶 6,432 steps</span>
          </div>
        </div>
      </div>

      {/* AI Recommendation Box */}
      <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-2">
        <h3 className="font-heading font-extrabold text-base text-emerald-950 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          AI Recommendation
        </h3>
        <p className="text-xs sm:text-sm text-emerald-900 font-medium leading-relaxed">
          Continue regular activity and monitor your vital signs. If abnormal readings persist, consult a qualified healthcare professional.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-center text-[11px] text-slate-500">
        ⚠️ Prototype AI analysis for demonstration only. It is not a medical diagnosis.
      </div>
    </div>
  );
}
