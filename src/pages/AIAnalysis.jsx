import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Brain, Sparkles, AlertTriangle, ShieldCheck, Activity, Info, CheckCircle2, TrendingUp, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIAnalysis() {
  const { healthData } = useHealth();
  const ai = healthData.aiInsight;
  const vitals = healthData.vitals;

  const getRiskColor = (level) => {
    switch (level) {
      case 'CRITICAL': return { bg: 'bg-red-600 text-white', stroke: '#ef4444', text: 'text-red-600' };
      case 'HIGH': return { bg: 'bg-rose-100 text-rose-800 border-rose-300', stroke: '#f43f5e', text: 'text-rose-600' };
      case 'MODERATE': return { bg: 'bg-amber-100 text-amber-800 border-amber-300', stroke: '#f59e0b', text: 'text-amber-600' };
      case 'LOW':
      default: return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', stroke: '#10b981', text: 'text-emerald-600' };
    }
  };

  const riskTheme = getRiskColor(ai.riskLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/10 mb-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>Predictive Health Risk Engine v2.4</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              AI Health Analysis
            </h1>
            <p className="text-sm text-indigo-200/80 mt-1 max-w-xl">
              Predictive insights and multi-modal neural pattern recognition based on recent biometric trends.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
              Model Confidence: <strong className="text-emerald-400 text-sm font-extrabold">{ai.confidence}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Risk Gauge (Left) + AI Prediction Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Gauge Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow flex flex-col justify-between items-center text-center">
          <div className="w-full text-left">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              COMPOSITE PHYSIOLOGICAL RISK
            </span>
            <h3 className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">
              Risk Level Assessment
            </h3>
          </div>

          {/* Animated Gauge */}
          <div className="my-6 relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="72" stroke="#f1f5f9" strokeWidth="14" fill="transparent" />
              <motion.circle
                cx="96"
                cy="96"
                r="72"
                stroke={riskTheme.stroke}
                strokeWidth="14"
                strokeDasharray={2 * Math.PI * 72}
                initial={{ strokeDashoffset: 2 * Math.PI * 72 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 72) * (1 - ai.riskPercentage / 100) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl font-heading font-extrabold text-slate-900">
                {ai.riskPercentage}%
              </span>
              <span className={`mt-1 px-3 py-0.5 rounded-full text-xs font-bold border ${riskTheme.bg}`}>
                {ai.riskLevel} RISK
              </span>
            </div>
          </div>

          {/* Risk Levels Legend */}
          <div className="w-full grid grid-cols-4 gap-1 pt-3 border-t border-slate-100 text-[10px] font-bold">
            <div className="py-1 rounded bg-emerald-50 text-emerald-800">🟢 LOW</div>
            <div className="py-1 rounded bg-amber-50 text-amber-800">🟡 MODERATE</div>
            <div className="py-1 rounded bg-rose-50 text-rose-800">🔴 HIGH</div>
            <div className="py-1 rounded bg-red-100 text-red-900">🚨 CRITICAL</div>
          </div>
        </div>

        {/* AI Prediction Card */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="font-heading font-extrabold text-xl text-slate-900">AI Risk Prediction</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold">
                Neural Inference Output
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-bold text-slate-400 uppercase">Primary Physiological Risk</div>
                <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  {ai.prediction}
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {ai.summary}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="text-[10px] font-bold uppercase text-emerald-800">Calculated Probability</div>
                  <div className="text-2xl font-extrabold text-emerald-700 mt-0.5">{ai.riskPercentage}%</div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                  <div className="text-[10px] font-bold uppercase text-indigo-800">Model Confidence</div>
                  <div className="text-2xl font-extrabold text-indigo-700 mt-0.5">{ai.confidence}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer Alert */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Medical Prototype Disclaimer:</strong>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Prototype prediction for demonstration purposes. This system does not provide official medical diagnosis. Always consult certified medical practitioners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DETECTED PATTERNS CARDS */}
      <div className="space-y-4">
        <h3 className="font-heading font-extrabold text-xl text-slate-900">
          Detected Physiological Patterns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Heart rate trend */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Heart Rate Trend</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">Stable</span>
            </div>
            <div className="text-xl font-heading font-extrabold text-slate-900">
              72 → 74 → 71 → 73 <span className="text-xs font-normal text-slate-500">BPM</span>
            </div>
            <p className="text-xs text-slate-500">
              Standard nocturnal and diurnal circadian rhythm compliance observed over the last 24 hours.
            </p>
          </div>

          {/* Activity trend */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Activity Vectors</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-bold">Slight Decrease</span>
            </div>
            <div className="text-xl font-heading font-extrabold text-slate-900">
              7,200 → 6,800 → 6,432 <span className="text-xs font-normal text-slate-500">steps</span>
            </div>
            <p className="text-xs text-slate-500">
              Daily step count is 80% of target. Motion vectors indicate steady home mobility.
            </p>
          </div>

          {/* SpO2 trend */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Oxygen Saturation</span>
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">Optimal</span>
            </div>
            <div className="text-xl font-heading font-extrabold text-slate-900">
              97% → 98% → 97%
            </div>
            <p className="text-xs text-slate-500">
              Zero hypoxemia episodes recorded during resting or active monitoring windows.
            </p>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATION BOX */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-md shadow-emerald-600/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-lg text-emerald-950">AI Health Recommendation</h3>
            <p className="text-xs text-emerald-800">Actionable advice powered by clinical telemetry guidelines</p>
          </div>
        </div>

        <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-white/80 p-4 rounded-2xl border border-emerald-100">
          💡 “Maintain regular physical activity such as morning walking and continue monitoring your vital signs continuously. If abnormal heart rate spikes or SpO₂ drops persist, consult a qualified healthcare professional.”
        </p>
      </div>
    </motion.div>
  );
}
