import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import HealthChart from '../components/dashboard/HealthChart';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Save, 
  Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorPatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patientsTable, patientNotes, saveDoctorNote } = useHealth();

  const patient = patientsTable.find(p => p.id === id) || patientsTable[0];
  const existingNote = patientNotes[patient.id] || '';

  const [noteText, setNoteText] = useState(existingNote);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveNotes = (e) => {
    e.preventDefault();
    saveDoctorNote(patient.id, noteText);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate('/doctor/dashboard')}
          className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 text-blue-600 dark:text-sky-400 text-xs font-bold transition-all flex items-center gap-2 border border-blue-100 dark:border-slate-700 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Dashboard</span>
        </button>
      </div>

      {/* Patient Overview Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <img 
              src={patient.avatar} 
              alt={patient.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-sky-400">
                Patient Overview
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                {patient.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Age {patient.age} • Primary Condition: <span className="text-slate-900 dark:text-slate-200 font-semibold">{patient.condition}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Health Score</div>
              <div className="text-2xl font-black text-emerald-600">{patient.healthScore}%</div>
            </div>
          </div>
        </div>

        {/* Vital Telemetry Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              ❤️ Heart Rate
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {patient.heartRate}
            </div>
            <span className="text-[10px] font-bold text-emerald-600">Normal</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              🫁 SpO₂ Saturation
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {patient.spo2}
            </div>
            <span className="text-[10px] font-bold text-blue-600">Optimal</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              🩸 Blood Pressure
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {patient.bp}
            </div>
            <span className="text-[10px] font-bold text-slate-500">Controlled</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              🌡️ Body Temperature
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              {patient.temp}
            </div>
            <span className="text-[10px] font-bold text-emerald-600">Normal</span>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Interactive Charts & Clinical Analysis + Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Health Chart & AI Risk Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm">
            <HealthChart />
          </div>

          {/* AI Risk Analysis Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                AI Risk Analysis for {patient.name}
              </h2>
              <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Confidence: 94%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Composite Risk Score</span>
                <span className="text-sm font-black text-blue-700 dark:text-sky-300">LOW (42%)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Patient displays stable nocturnal cardiovascular readings. No tachycardia or severe hypoxia events detected in the last 72 hours.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-700 dark:text-slate-300">Detected Patterns:</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Heart Rate variability remains within standard resting parameters.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Blood pressure responds well to morning antihypertensive regimen.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Doctor Notes & Clinical Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Doctor Clinical Notes
              </h2>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Auto-sync
              </span>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Physician Observations & Treatment Plan
              </label>
              <textarea
                rows={7}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add clinical notes, medication adjustments, or follow-up recommendations..."
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all resize-none"
              />

              <div className="flex items-center justify-between pt-2">
                {savedSuccess ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" /> Notes Saved Successfully!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Saved notes persist in patient record</span>
                )}

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Notes</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
