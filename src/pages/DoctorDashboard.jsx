import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Siren, 
  Eye, 
  Stethoscope, 
  Calendar, 
  Clock, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  FileText,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorDashboard() {
  const { doctorMetrics, patientsTable } = useHealth();
  const navigate = useNavigate();

  const highRiskPatients = patientsTable.filter(p => p.riskCategory === 'high' || p.riskCategory === 'moderate');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Executive Physician Header Banner (Blue & White Friendly Theme) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-600/15 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Good Evening, Dr. Sharma 👋
            </h1>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black bg-white/20 text-white border border-white/30 uppercase tracking-wider backdrop-blur-xs">
              Physician Console
            </span>
          </div>
          <p className="text-xs sm:text-sm text-blue-100 font-medium">
            Here is today's clinical overview and patient care status across all assigned wards.
          </p>
        </div>

        <button
          onClick={() => navigate('/doctor/patients')}
          className="px-4 py-2.5 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all shrink-0"
        >
          <span>Open Full Patients Roster</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Summary Cards Grid (Clean Blue & White Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Patients */}
        <div 
          onClick={() => navigate('/doctor/patients')}
          className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-2 cursor-pointer hover:border-blue-300 transition-all"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Total Patients</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">{doctorMetrics.totalPatients}</div>
          <p className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
            <span>View directory roster</span> →
          </p>
        </div>

        {/* Stable */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-950 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <span>Stable & Safe</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{doctorMetrics.stable}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Optimal vital telemetry</p>
        </div>

        {/* Needs Attention */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-amber-100 dark:border-amber-950 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600 text-xs font-bold uppercase tracking-wider">
            <span>Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600">{doctorMetrics.needsAttention}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Moderate vital variation</p>
        </div>

        {/* Critical */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-rose-600 text-xs font-bold uppercase tracking-wider">
            <span>Critical Alerts</span>
            <Siren className="w-4 h-4 text-rose-500 animate-pulse" />
          </div>
          <div className="text-3xl font-black text-rose-600">{doctorMetrics.critical}</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Requires immediate check</p>
        </div>
      </div>

      {/* Main Overview Grid: High Priority Patients & Today's Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: High Priority Patients Spotlight (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              High Priority Patients Spotlight
            </h2>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
              Immediate Care
            </span>
          </div>

          <div className="space-y-4">
            {highRiskPatients.map((patient) => {
              const isCritical = patient.riskCategory === 'high';

              return (
                <div 
                  key={patient.id} 
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isCritical 
                      ? 'bg-rose-50/60 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50' 
                      : 'bg-amber-50/60 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={patient.avatar} 
                        alt={patient.name}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs"
                      />
                      <div>
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">{patient.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Age {patient.age} • {patient.condition}</div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      isCritical ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {patient.statusBadge}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Heart Rate</span>
                      <div className="font-black text-slate-900 dark:text-white mt-0.5">{patient.heartRate}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">SpO₂ Oxygen</span>
                      <div className="font-black text-slate-900 dark:text-white mt-0.5">{patient.spo2}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Blood Pressure</span>
                      <div className="font-black text-slate-900 dark:text-white mt-0.5">{patient.bp}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">Updated {patient.lastUpdated}</span>
                    <button
                      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Patient Chart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Today's Consultations & Quick Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Today's Schedule Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Today's Consultations
              </h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">3 Appointments</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Ramesh Kumar</div>
                  <div className="text-[11px] text-slate-500">Routine Post-Hypertension Check</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold">10:30 AM</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Lakshmi Devi</div>
                  <div className="text-[11px] text-slate-500">Resting Tachycardia Follow-up</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold">02:15 PM</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Meena Rao</div>
                  <div className="text-[11px] text-slate-500">Joint Osteoarthritis Telemetry</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold">04:45 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Roster Navigation CTA Card */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-800/80 rounded-3xl p-6 border border-blue-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-blue-700 dark:text-sky-300 tracking-wider">Full Patient Directory</span>
              <Users className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Access the complete roster of all 128 patients with table/grid toggle, search, and condition filtering.
            </p>
            <button
              onClick={() => navigate('/doctor/patients')}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Patients Directory (128)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
