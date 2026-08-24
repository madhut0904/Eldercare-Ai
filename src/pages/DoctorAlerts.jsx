import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import { AlertTriangle, Siren, Eye, Clock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorAlerts() {
  const { doctorAlerts } = useHealth();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Doctor Risk & Emergency Alerts Feed
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Prioritized high & moderate physiological risk notifications across all monitored elders.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Alerts Feed List */}
      <div className="space-y-4">
        {doctorAlerts.map((alert) => {
          const isHigh = alert.riskCategory === 'high';

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-3xl border transition-all space-y-4 ${
                isHigh
                  ? 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900 shadow-sm'
                  : 'bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900 shadow-sm'
              }`}
            >
              {/* Alert Header */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider inline-flex items-center gap-1.5 ${
                  isHigh
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-amber-500 text-white'
                }`}>
                  {isHigh ? <Siren className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {alert.level}
                </span>

                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {alert.timeAgo}
                </span>
              </div>

              {/* Patient & Description */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-black text-xl text-slate-900 dark:text-white">
                    {alert.patientName}
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">(Age {alert.age})</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {alert.description}
                </p>
              </div>

              {/* Vitals Summary Footer & View Button */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-600 dark:text-slate-400 font-medium text-xs">
                  {alert.vitalsSummary} • Location: <span className="text-slate-900 dark:text-white font-semibold">{alert.location}</span>
                </div>

                <button
                  onClick={() => navigate(`/doctor/patient/${alert.patientId}`)}
                  className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-sm inline-flex items-center justify-center gap-1.5 ${
                    isHigh
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>View Patient Chart</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
