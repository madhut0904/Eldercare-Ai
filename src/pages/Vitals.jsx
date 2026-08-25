import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { HISTORICAL_24H, HISTORICAL_7D, HISTORICAL_30D } from '../data/mockHealthData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { Activity, Heart, Thermometer, ShieldCheck, Calendar, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Vitals() {
  const { healthData, theme } = useHealth();
  const isDark = theme === 'dark';
  const vitals = healthData.vitals;
  const [timeRange, setTimeRange] = useState('24H');

  const getData = () => {
    switch (timeRange) {
      case '7D': return HISTORICAL_7D;
      case '30D': return HISTORICAL_30D;
      case '24H':
      default: return HISTORICAL_24H;
    }
  };

  const chartData = getData();
  const xKey = timeRange === '24H' ? 'time' : timeRange === '7D' ? 'day' : 'date';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 p-4 md:p-8 max-w-7xl mx-auto font-sans"
    >
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 card-shadow transition-colors">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            <span>Biometric Telemetry</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-1">
            Vitals Telemetry Deep Dive
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time biometric streams and statistics for {healthData.patient.name}.
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {['24H', '7D', '30D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                timeRange === range
                  ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Heart Rate Telemetry Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl shadow-sm">
              ❤️
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Heart Rate Dynamics</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Electrocardiogram non-invasive sensor stream</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              Current: <strong className="text-rose-600 dark:text-rose-400 font-extrabold text-sm">{vitals.heartRate.current} BPM</strong>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              Avg: <strong className="text-slate-800 dark:text-white font-bold">{vitals.heartRate.avg} BPM</strong>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hidden sm:block">
              Range: <strong className="text-slate-800 dark:text-white font-bold">{vitals.heartRate.min} - {vitals.heartRate.max} BPM</strong>
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hrDeepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[50, 140]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => active && payload?.[0] ? (
                  <div className="bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-800">
                    <div className="text-slate-400">{label}</div>
                    <div className="font-extrabold text-sm text-rose-400">{payload[0].value} BPM</div>
                  </div>
                ) : null}
              />
              <Area type="monotone" dataKey={timeRange === '24H' ? 'heartRate' : 'avgHR'} stroke="#ef4444" strokeWidth={3} fill="url(#hrDeepGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. SpO2 Telemetry Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl shadow-sm">
              🫁
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Blood Oxygen (SpO₂) Saturation</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Photoplethysmography sensor stream</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              Current: <strong className="text-teal-600 dark:text-teal-400 font-extrabold text-sm">{vitals.spo2.current}%</strong>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              Avg: <strong className="text-slate-800 dark:text-white font-bold">{vitals.spo2.avg}%</strong>
            </div>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="spo2DeepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => active && payload?.[0] ? (
                  <div className="bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-800">
                    <div className="text-slate-400">{label}</div>
                    <div className="font-extrabold text-sm text-teal-400">{payload[0].value}% SpO₂</div>
                  </div>
                ) : null}
              />
              <Area type="monotone" dataKey={timeRange === '24H' ? 'spo2' : 'avgSpO2'} stroke="#14b8a6" strokeWidth={3} fill="url(#spo2DeepGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Blood Pressure & Temperature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Pressure Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-4 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg">
              🩸
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Blood Pressure (Systolic / Diastolic)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Optimal baseline: 120/80 mmHg</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">mmHg ({vitals.bloodPressure.status})</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey={xKey} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis domain={[60, 160]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="bpSystolic" stroke="#8b5cf6" strokeWidth={2.5} />
                <Line type="monotone" dataKey="bpDiastolic" stroke="#c084fc" strokeWidth={2} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 card-shadow space-y-4 transition-colors">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg">
              🌡️
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">Body Temperature</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Thermal sensor stream</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {vitals.temperature.current} {vitals.temperature.unit}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">({vitals.temperature.status})</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey={xKey} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis domain={[35.5, 39]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" fill={isDark ? "rgba(245, 158, 11, 0.2)" : "#fef3c7"} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
