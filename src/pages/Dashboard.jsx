import React from 'react';
import { useHealth } from '../context/HealthContext';
import HealthScoreCard from '../components/dashboard/HealthScoreCard';
import VitalCard from '../components/dashboard/VitalCard';
import HealthChart from '../components/dashboard/HealthChart';
import AIInsightCard from '../components/dashboard/AIInsightCard';
import AlertTimeline from '../components/dashboard/AlertTimeline';
import { Activity, Heart, Thermometer, Flame, Footprints, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { healthData } = useHealth();
  const vitals = healthData.vitals;
  const patient = healthData.patient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 card-shadow">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Good Evening 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's your health overview for <span className="font-bold text-slate-800">{patient.name}</span> today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-dot" />
            <span className="text-xs font-bold text-emerald-800">Sensors Active (92% Batt)</span>
          </div>
        </div>
      </div>

      {/* Top Grid: Health Score Card (1 col) + 5 Vitals Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Health Score Card */}
        <div className="lg:col-span-4 flex">
          <div className="w-full">
            <HealthScoreCard />
          </div>
        </div>

        {/* 5 Vitals Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <VitalCard
            title="Heart Rate"
            value={vitals.heartRate.current}
            unit={vitals.heartRate.unit}
            status={vitals.heartRate.status}
            trend={vitals.heartRate.trend}
            emoji="❤️"
            colorScheme={vitals.heartRate.current > 100 ? "rose" : "emerald"}
            sparklineData={[68, 70, 74, 71, 73, vitals.heartRate.current]}
          />

          <VitalCard
            title="SpO₂ Saturation"
            value={`${vitals.spo2.current}%`}
            unit=""
            status={vitals.spo2.status}
            trend={vitals.spo2.trend}
            emoji="🫁"
            colorScheme={vitals.spo2.current < 95 ? "amber" : "cyan"}
            sparklineData={[96, 97, 98, 97, 96, vitals.spo2.current]}
          />

          <VitalCard
            title="Blood Pressure"
            value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
            unit="mmHg"
            status={vitals.bloodPressure.status}
            trend={vitals.bloodPressure.trend}
            emoji="🩸"
            colorScheme={vitals.bloodPressure.systolic > 135 ? "rose" : "indigo"}
            sparklineData={[118, 122, 120, 119, 121, vitals.bloodPressure.systolic]}
          />

          <VitalCard
            title="Temperature"
            value={vitals.temperature.current}
            unit={vitals.temperature.unit}
            status={vitals.temperature.status}
            trend={vitals.temperature.trend}
            emoji="🌡️"
            colorScheme={vitals.temperature.current > 37.5 ? "amber" : "emerald"}
            sparklineData={[36.5, 36.6, 36.7, 36.6, 36.8, vitals.temperature.current]}
          />

          <VitalCard
            title="Daily Activity"
            value={vitals.activity.steps.toLocaleString()}
            unit="steps"
            status={vitals.activity.status}
            trend={vitals.activity.trend}
            emoji="🚶"
            colorScheme="indigo"
            sparklineData={[2000, 3500, 4200, 5100, 6000, vitals.activity.steps]}
          />

          {/* Quick Guardian Status Box */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-100">Care Network</span>
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-heading font-extrabold mt-1">3 Guardians</div>
              <div className="text-xs text-emerald-100 mt-0.5">Daughter & Doctor active on call</div>
            </div>
            <div className="text-[10px] text-emerald-200 pt-2 border-t border-white/20">
              Emergency Fall Trigger ready
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Recharts Health Trend Chart + AI Insight Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <HealthChart />
        </div>
        <div className="lg:col-span-4 flex">
          <div className="w-full">
            <AIInsightCard />
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Alerts Timeline */}
      <div className="grid grid-cols-1 gap-6">
        <AlertTimeline />
      </div>
    </motion.div>
  );
}
