import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { HISTORICAL_7D, HISTORICAL_30D } from '../data/mockHealthData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { History as HistoryIcon, Calendar, Download, TrendingUp, Award, Bell, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function History() {
  const { healthData } = useHealth();
  const [filterRange, setFilterRange] = useState('7D'); // 'Today' | 'Yesterday' | '7D' | '30D'
  const [downloadNotice, setDownloadNotice] = useState(false);

  const chartData = filterRange === '30D' ? HISTORICAL_30D : HISTORICAL_7D;

  const handleExport = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header & Export button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 card-shadow">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-widest">
            <HistoryIcon className="w-3.5 h-3.5" />
            <span>Health History & Analytics</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
            Historical Vital Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Comprehensive long-term health metrics and historical summaries for {healthData.patient.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl">
            {['Today', 'Yesterday', '7D', '30D'].map((range) => (
              <button
                key={range}
                onClick={() => setFilterRange(range)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  filterRange === range
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs text-center shadow-lg animate-bounce">
          📄 Health History PDF & CSV summary report generated successfully!
        </div>
      )}

      {/* Weekly Summary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 card-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
            84%
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Average Health Score</div>
            <div className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">84% Optimal</div>
            <div className="text-[10px] text-emerald-600 font-semibold">+2.1% vs last week</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 card-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Best Day Recorded</div>
            <div className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">Monday</div>
            <div className="text-[10px] text-indigo-600 font-semibold">Score: 86 (Peak Vitals)</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 card-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Alert Count</div>
            <div className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">2 Alerts</div>
            <div className="text-[10px] text-slate-500 font-semibold">Resolved automatically</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 card-shadow flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Overall Health Trend</div>
            <div className="text-xl font-heading font-extrabold text-slate-900 mt-0.5">↑ Improving</div>
            <div className="text-[10px] text-teal-600 font-semibold">Consistent circadian recovery</div>
          </div>
        </div>
      </div>

      {/* Historical Health Score Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading font-extrabold text-xl text-slate-900">
            Health Score Trend ({filterRange})
          </h3>
          <span className="text-xs font-semibold text-slate-500">Score Range: 0 - 100</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey={filterRange === '30D' ? 'day' : 'day'} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[50, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => active && payload?.[0] ? (
                  <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs">
                    <div className="text-slate-400">{label}</div>
                    <div className="font-extrabold text-sm text-emerald-400">Score: {payload[0].value}%</div>
                  </div>
                ) : null}
              />
              <Bar dataKey="healthScore" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heart Rate & Steps Multi-Axis Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading font-extrabold text-xl text-slate-900">
            Daily Heart Rate vs Step Count Correlation
          </h3>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis yAxisId="left" domain={[50, 120]} tick={{ fill: '#ef4444', fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10000]} tick={{ fill: '#6366f1', fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="avgHR" name="Avg HR (BPM)" stroke="#ef4444" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="steps" name="Activity Steps" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
