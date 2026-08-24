import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import { 
  Users, 
  Search, 
  List, 
  Grid, 
  Eye, 
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorPatientsRoster() {
  const { patientsTable } = useHealth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL'); // 'ALL' | 'CRITICAL' | 'WARNING' | 'STABLE'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Filter patients based on search and category
  const filteredPatients = patientsTable.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (patient.id && patient.id.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterCategory === 'ALL') return matchesSearch;
    if (filterCategory === 'CRITICAL') return matchesSearch && patient.riskCategory === 'high';
    if (filterCategory === 'WARNING') return matchesSearch && patient.riskCategory === 'moderate';
    if (filterCategory === 'STABLE') return matchesSearch && patient.riskCategory === 'low';
    return matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Directory Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Assigned Patients Directory & Roster
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-sky-300">
              {patientsTable.length} Monitored
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Search, filter, and inspect clinical telemetry across all 128 registered geriatric patients.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'table' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'cards' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Cards View</span>
          </button>
        </div>
      </motion.div>

      {/* Roster Controls: Search & Category Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-blue-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search patient by name, condition, or patient ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-bold">
          {[
            { id: 'ALL', label: 'All Patients', count: patientsTable.length },
            { id: 'CRITICAL', label: '🔴 Critical', count: patientsTable.filter(p => p.riskCategory === 'high').length },
            { id: 'WARNING', label: '🟡 Warning', count: patientsTable.filter(p => p.riskCategory === 'moderate').length },
            { id: 'STABLE', label: '🟢 Stable', count: patientsTable.filter(p => p.riskCategory === 'low').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                filterCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                filterCategory === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-blue-50/70 dark:bg-slate-800/80 text-blue-900 dark:text-sky-300 font-extrabold uppercase text-[10px] tracking-wider border-b border-blue-100 dark:border-slate-700">
              <tr>
                <th className="py-4 px-4">Patient Profile</th>
                <th className="py-4 px-3">Age & Gender</th>
                <th className="py-4 px-3">Heart Rate</th>
                <th className="py-4 px-3">Oxygen (SpO₂)</th>
                <th className="py-4 px-3">Blood Pressure</th>
                <th className="py-4 px-3">Temp</th>
                <th className="py-4 px-3">Risk Assessment</th>
                <th className="py-4 px-3">Last Sync</th>
                <th className="py-4 px-4 text-right">Clinical Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredPatients.map((patient) => {
                const isHigh = patient.riskCategory === 'high';
                const isMod = patient.riskCategory === 'moderate';

                return (
                  <tr key={patient.id} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <img 
                        src={patient.avatar} 
                        alt={patient.name} 
                        className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-xs"
                      />
                      <div>
                        <div className="text-xs text-slate-900 dark:text-white font-extrabold">
                          {patient.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal">{patient.condition}</div>
                      </div>
                    </td>

                    <td className="py-4 px-3 font-semibold text-slate-600 dark:text-slate-300">
                      {patient.age} yrs • Male
                    </td>

                    <td className="py-4 px-3 font-extrabold">
                      <span className={isHigh ? 'text-rose-600 font-black' : isMod ? 'text-amber-600' : 'text-emerald-600'}>
                        {patient.heartRate}
                      </span>
                    </td>

                    <td className="py-4 px-3 font-extrabold">
                      <span className={isHigh ? 'text-rose-600 font-black' : isMod ? 'text-amber-600' : 'text-blue-600'}>
                        {patient.spo2}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-slate-700 dark:text-slate-300 font-semibold">{patient.bp}</td>
                    <td className="py-4 px-3 text-slate-700 dark:text-slate-300 font-semibold">{patient.temp}</td>

                    <td className="py-4 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isHigh
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200'
                          : isMod
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200'
                      }`}>
                        {patient.statusBadge}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-slate-400 text-[11px]">{patient.lastUpdated}</td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Chart</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => {
            const isHigh = patient.riskCategory === 'high';
            const isMod = patient.riskCategory === 'moderate';

            return (
              <motion.div
                key={patient.id}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between ${
                  isHigh ? 'border-rose-200 dark:border-rose-900' : isMod ? 'border-amber-200 dark:border-amber-900' : 'border-blue-100 dark:border-slate-800'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={patient.avatar} 
                        alt={patient.name} 
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-xs"
                      />
                      <div>
                        <h3 className="font-heading font-extrabold text-base text-slate-900 dark:text-white">{patient.name}</h3>
                        <p className="text-xs text-slate-500">Age {patient.age} • ID: #{patient.id}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isHigh ? 'bg-rose-100 text-rose-700' : isMod ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {patient.statusBadge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium bg-blue-50/50 dark:bg-slate-800 p-3 rounded-xl border border-blue-100 dark:border-slate-700">
                    Condition: <strong className="text-slate-900 dark:text-white">{patient.condition}</strong>
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Heart Rate</span>
                      <div className="font-black text-slate-900 dark:text-white mt-0.5">{patient.heartRate}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 uppercase font-bold">SpO₂ Oxygen</span>
                      <div className="font-black text-slate-900 dark:text-white mt-0.5">{patient.spo2}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Updated {patient.lastUpdated}</span>
                  <button
                    onClick={() => navigate(`/doctor/patient/${patient.id}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
