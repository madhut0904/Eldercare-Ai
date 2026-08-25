import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Brain, ArrowRight, ShieldCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AIInsightCard() {
  const { healthData } = useHealth();
  const ai = healthData.aiInsight;

  const riskBadgeStyles = {
    LOW: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    MODERATE: 'bg-amber-100 text-amber-800 border-amber-300',
    HIGH: 'bg-rose-100 text-rose-800 border-rose-300',
    CRITICAL: 'bg-red-600 text-white border-red-700 animate-pulse font-extrabold'
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-indigo-900/50 dark:border-slate-800">
      {/* Subtle glowing light shapes */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-indigo-900/60 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Brain className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">AI Health Insight</h3>
              <p className="text-[11px] text-indigo-200/70">Predictive Neural Telemetry Engine</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${riskBadgeStyles[ai.riskLevel]}`}>
            RISK: {ai.riskLevel}
          </span>
        </div>

        {/* Content */}
        <motion.div
          key={ai.headline}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h4 className="font-heading font-bold text-base text-indigo-100 leading-snug">
            {ai.headline}
          </h4>

          <p className="text-xs text-indigo-200/80 leading-relaxed">
            {ai.summary}
          </p>
        </motion.div>
      </div>

      {/* Metrics & CTA button */}
      <div className="mt-6 pt-4 border-t border-indigo-900/60 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">Predicted Pattern</div>
            <div className="text-xs font-extrabold text-white mt-0.5">{ai.prediction}</div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">AI Confidence</div>
            <div className="text-xs font-extrabold text-emerald-400 mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{ai.confidence}%</span>
            </div>
          </div>
        </div>

        <Link
          to="/patient/ai-health"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/25 transition-all text-center group"
        >
          <span>View Detailed Analysis</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
