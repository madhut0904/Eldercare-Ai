import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Clock, ShieldAlert, CheckCircle, AlertTriangle, Info, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AlertTimeline() {
  const { alerts } = useHealth();

  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency': return <ShieldAlert className="w-4 h-4 text-red-600 animate-bounce" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'info': return <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'success':
      default: return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'info': return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800';
      case 'success':
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow card-shadow-hover flex flex-col justify-between transition-colors">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Recent Alerts</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Live safety timeline logs</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {alerts.length} Events
          </span>
        </div>

        {/* Timeline list */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[30px] top-0.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" />
              </div>

              {/* Card item */}
              <div className="bg-slate-50/70 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.type)}
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{alert.title}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(alert.type)}`}>
                    {alert.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400 pt-1 pl-6">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {alert.time}
                  </span>
                  <span>{alert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
        All alerts synced with Caregiver Dashboard
      </div>
    </div>
  );
}
