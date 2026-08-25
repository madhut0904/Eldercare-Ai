import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealthScoreCard() {
  const { healthData, theme } = useHealth();
  const isDark = theme === 'dark';
  const score = healthData.healthScore;
  const status = healthData.status;

  // Color mappings based on score range
  const getScoreColor = () => {
    if (score >= 75) return { stroke: '#10b981', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' };
    if (score >= 50) return { stroke: '#f59e0b', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800' };
    return { stroke: '#ef4444', bg: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800' };
  };

  const colors = getScoreColor();
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow card-shadow-hover relative overflow-hidden flex flex-col justify-between transition-colors">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-emerald-100/40 dark:from-emerald-900/20 to-teal-50/0 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">
            OVERALL HEALTH SCORE
          </span>
          <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white mt-0.5">
            Vitality Index
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors.bg}`}>
          🟢 {status}
        </span>
      </div>

      {/* Circular SVG Gauge & Score */}
      <div className="my-6 flex items-center justify-center gap-6">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke={isDark ? "#1e293b" : "#f1f5f9"}
              strokeWidth="10"
              fill="transparent"
            />
            {/* Dynamic progress ring */}
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              stroke={colors.stroke}
              strokeWidth="10"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <motion.span
              key={score}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight"
            >
              {score}
            </motion.span>
            <span className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold uppercase">out of 100</span>
          </div>
        </div>

        {/* Breakdown Summary */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span><strong className="text-slate-900 dark:text-white">↑ 4.2%</strong> vs yesterday</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[140px] leading-tight">
            Based on multi-sensor vitals, motion pattern, and sleep telemetry.
          </div>
        </div>
      </div>

      {/* Footer reassurance note */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Continuous Guardian Active
        </span>
        <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">Synced 2s ago</span>
      </div>
    </div>
  );
}
