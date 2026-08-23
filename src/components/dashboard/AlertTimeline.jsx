import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Clock, ShieldAlert, CheckCircle, AlertTriangle, Info, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AlertTimeline() {
  const { alerts } = useHealth();

  const getAlertIcon = (type) => {
    switch (type) {
      case 'emergency': return <ShieldAlert className="w-4 h-4 text-red-600 animate-bounce" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'info': return <Info className="w-4 h-4 text-indigo-600" />;
      case 'success':
      default: return <CheckCircle className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'info': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'success':
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow card-shadow-hover flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Recent Alerts</h3>
              <p className="text-[11px] text-slate-500">Live safety timeline logs</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {alerts.length} Events
          </span>
        </div>

        {/* Timeline list */}
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[30px] top-0.5 w-5 h-5 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              </div>

              {/* Card item */}
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getAlertIcon(alert.type)}
                    <h4 className="text-xs font-bold text-slate-900">{alert.title}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(alert.type)}`}>
                    {alert.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 pl-6">
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

      <div className="mt-6 pt-3 border-t border-slate-100 text-center text-xs font-semibold text-slate-500">
        All alerts synced with Caregiver Dashboard
      </div>
    </div>
  );
}
