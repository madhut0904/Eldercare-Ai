import React, { useState } from 'react';
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
import { HISTORICAL_24H, HISTORICAL_7D, HISTORICAL_30D } from '../../data/mockHealthData';
import { Activity, Clock } from 'lucide-react';

export default function HealthChart() {
  const [activeTab, setActiveTab] = useState('heartRate'); // 'heartRate' | 'spo2' | 'bp' | 'temp'
  const [timeRange, setTimeRange] = useState('24H'); // '24H' | '7D' | '30D'

  // Pick dataset based on timeRange
  const getRawData = () => {
    switch (timeRange) {
      case '7D': return HISTORICAL_7D;
      case '30D': return HISTORICAL_30D;
      case '24H':
      default: return HISTORICAL_24H;
    }
  };

  const rawData = getRawData();

  // Pick key & color parameters for active tab
  const getChartConfig = () => {
    switch (activeTab) {
      case 'spo2':
        return {
          title: 'Oxygen Saturation (SpO₂)',
          unit: '%',
          color: '#3b82f6',
          gradientId: 'spo2Grad',
          dataKey: timeRange === '24H' ? 'spo2' : 'avgSpO2',
          xKey: timeRange === '24H' ? 'time' : timeRange === '7D' ? 'day' : 'date',
          domain: [90, 100]
        };
      case 'bp':
        return {
          title: 'Blood Pressure (Systolic / Diastolic)',
          unit: 'mmHg',
          color: '#8b5cf6',
          gradientId: 'bpGrad',
          dataKey: 'bpSystolic',
          secondaryDataKey: 'bpDiastolic',
          xKey: timeRange === '24H' ? 'time' : timeRange === '7D' ? 'day' : 'date',
          domain: [60, 160]
        };
      case 'temp':
        return {
          title: 'Body Temperature',
          unit: '°C',
          color: '#f59e0b',
          gradientId: 'tempGrad',
          dataKey: 'temp',
          xKey: timeRange === '24H' ? 'time' : timeRange === '7D' ? 'day' : 'date',
          domain: [35.5, 39]
        };
      case 'heartRate':
      default:
        return {
          title: 'Heart Rate Stream',
          unit: 'BPM',
          color: '#ef4444',
          gradientId: 'hrGrad',
          dataKey: timeRange === '24H' ? 'heartRate' : 'avgHR',
          xKey: timeRange === '24H' ? 'time' : timeRange === '7D' ? 'day' : 'date',
          domain: [50, 140]
        };
    }
  };

  const config = getChartConfig();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow card-shadow-hover">
      {/* Header controls: Tabs + Time Range Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Biometric Analytics</span>
          </div>
          <h3 className="font-heading font-extrabold text-xl text-slate-900 mt-0.5">
            {config.title}
          </h3>
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Time range buttons */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100/90 text-xs font-semibold text-slate-600">
            {['24H', '7D', '30D'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vital selection Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-6 overflow-x-auto">
        {[
          { id: 'heartRate', label: 'Heart Rate', emoji: '❤️' },
          { id: 'spo2', label: 'SpO₂ Saturation', emoji: '🫁' },
          { id: 'bp', label: 'Blood Pressure', emoji: '🩸' },
          { id: 'temp', label: 'Temperature', emoji: '🌡️' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Recharts Chart Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rawData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={config.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={config.xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              domain={config.domain}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                      <div className="text-slate-400 font-medium">{label}</div>
                      <div className="font-extrabold text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                        <span>
                          {payload[0].value} {config.unit}
                        </span>
                      </div>
                      {payload[1] && (
                        <div className="text-slate-300 font-semibold text-xs">
                          Diastolic: {payload[1].value} mmHg
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={config.dataKey}
              stroke={config.color}
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#${config.gradientId})`}
            />
            {config.secondaryDataKey && (
              <Area
                type="monotone"
                dataKey={config.secondaryDataKey}
                stroke="#a855f7"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="none"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer metadata */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Real-time sampling every 3.5 seconds</span>
        </div>
        <span className="font-semibold text-slate-700">99.8% Sensor Fidelity</span>
      </div>
    </div>
  );
}
