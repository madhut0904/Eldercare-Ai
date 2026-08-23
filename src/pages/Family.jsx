import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { CARE_NETWORK } from '../data/mockHealthData';
import { Users, Phone, MessageSquare, ShieldCheck, Heart, Activity, Clock, CheckCircle2, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Family() {
  const { healthData } = useHealth();
  const patient = healthData.patient;
  const vitals = healthData.vitals;
  const [callMessage, setCallMessage] = useState(null);

  const handleCall = (name) => {
    setCallMessage(`Initiating secure call with ${name}...`);
    setTimeout(() => setCallMessage(null), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 card-shadow">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" />
            <span>Caregiver & Guardian Portal</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
            Family Health Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time status sharing for family members and assigned medical team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/history"
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-sm hover:bg-slate-800 transition-all"
          >
            View History Logs
          </Link>
        </div>
      </div>

      {callMessage && (
        <div className="p-4 rounded-2xl bg-indigo-600 text-white font-bold text-xs text-center shadow-lg animate-pulse">
          {callMessage}
        </div>
      )}

      {/* Elder Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-heading font-extrabold text-2xl flex items-center justify-center shadow-md">
              👴
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-2xl text-slate-900">{patient.name}</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  🟢 {healthData.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Age: <strong className="text-slate-800">{patient.age} years</strong> • Blood Group: <strong className="text-slate-800">{patient.bloodGroup}</strong> • Doctor: {patient.primaryDoctor}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Telemetry updated: <strong className="text-slate-800 font-mono">2 minutes ago</strong></span>
          </div>
        </div>

        {/* Live Vitals Banner for Family */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-xs text-slate-400 font-bold">❤️ Heart Rate</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{vitals.heartRate.current} BPM</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Normal Range</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-xs text-slate-400 font-bold">🫁 SpO₂ Saturation</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{vitals.spo2.current}%</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Optimal Oxygen</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-xs text-slate-400 font-bold">🩸 Blood Pressure</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
            </div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Normal Baseline</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div className="text-xs text-slate-400 font-bold">🌡️ Temperature</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{vitals.temperature.current}°C</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Normal Thermal</div>
          </div>
        </div>
      </div>

      {/* Family Members & Care Network */}
      <div className="space-y-4">
        <h3 className="font-heading font-extrabold text-xl text-slate-900">
          Assigned Care Network
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARE_NETWORK.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 card-shadow flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-slate-200"
                />
                <div>
                  <h4 className="font-heading font-extrabold text-base text-slate-900">{member.name}</h4>
                  <div className="text-xs text-slate-500 font-medium">{member.role}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    member.status === 'Online' ? 'bg-emerald-100 text-emerald-800' :
                    member.status === 'Available on Call' ? 'bg-indigo-100 text-indigo-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <strong className="text-slate-800 font-mono">{member.phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Last Sync:</span>
                  <strong className="text-slate-800">{member.lastContact}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleCall(member.name)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call</span>
                </button>

                <button
                  onClick={() => handleCall(`${member.name} (SMS)`)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
