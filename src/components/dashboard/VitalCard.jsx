import React from 'react';
import { motion } from 'framer-motion';

export default function VitalCard({
  title,
  value,
  unit,
  status,
  trend,
  icon: Icon,
  emoji,
  colorScheme = "emerald", // 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan'
  sparklineData = [60, 65, 62, 70, 68, 72]
}) {
  const isWarning = status !== 'Normal' && status !== 'On Track';

  const badgeStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    rose: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    cyan: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
  };

  const iconStyles = {
    emerald: 'bg-emerald-100/70 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
    amber: 'bg-amber-100/70 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400',
    rose: 'bg-rose-100/70 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400',
    indigo: 'bg-indigo-100/70 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400',
    cyan: 'bg-teal-100/70 text-teal-600 dark:bg-teal-950/80 dark:text-teal-400'
  };

  const sparklineColors = {
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#ef4444',
    indigo: '#6366f1',
    cyan: '#14b8a6'
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 card-shadow card-shadow-hover flex flex-col justify-between relative overflow-hidden transition-colors">
      {/* Top row: Icon + Title + Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${iconStyles[colorScheme]} flex items-center justify-center text-lg shadow-sm`}>
            {Icon ? <Icon className="w-5 h-5" /> : <span>{emoji}</span>}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">{title}</h4>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeStyles[isWarning ? 'rose' : colorScheme]}`}>
          {status}
        </span>
      </div>

      {/* Middle row: Big Value + Unit */}
      <div className="my-4 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <motion.span
            key={value}
            initial={{ opacity: 0.6, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            {value}
          </motion.span>
          {unit && <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{unit}</span>}
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-16 h-8 flex items-end">
          <svg className="w-full h-full" viewBox="0 0 60 30">
            <polyline
              fill="none"
              stroke={sparklineColors[isWarning ? 'rose' : colorScheme]}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={sparklineData.map((val, idx) => `${idx * 12},${30 - (val / 100) * 25}`).join(' ')}
            />
          </svg>
        </div>
      </div>

      {/* Bottom row: Trend indicator */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>{trend}</span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Real-time</span>
      </div>
    </div>
  );
}
