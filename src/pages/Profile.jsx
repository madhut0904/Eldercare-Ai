import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  User, 
  ShieldCheck, 
  Stethoscope, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  CheckCircle2, 
  Activity, 
  Wifi, 
  Building2, 
  UserCheck,
  Save,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { 
    healthData, 
    updatePatientProfile 
  } = useHealth();

  const patient = healthData.patient;

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local Form State
  const [formData, setFormData] = useState({
    name: patient.name || "Ramesh Kumar",
    age: patient.age || 68,
    phone: patient.phone || "+91 98765 43210",
    email: patient.email || "ramesh.kumar@eldercare.org",
    condition: patient.condition || "Mild Hypertension",
    address: patient.address || "B-402, Green Park Residency, New Delhi",
    insurance: "Star Health Senior Care #883921",
    emergencyContact: "+91 98765 11111"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updatePatientProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const tabs = [
    { id: 'overview', label: 'Personal & Care Info', icon: User },
    { id: 'medical', label: 'Medical History & Allergies', icon: Activity },
    { id: 'devices', label: 'Wearable Sensors & Telemetry', icon: Wifi }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="h-32 md:h-40 bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 relative p-6 flex justify-between items-start">
          <span className="relative z-10 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/30 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            Elder Care Protection Active
          </span>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="relative z-10 px-4 py-2 rounded-xl text-xs font-extrabold bg-white text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-1.5 shadow-md"
          >
            {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between -mt-14 md:-mt-16 gap-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                alt={patient.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-white dark:border-slate-900 shadow-xl object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
                    {patient.name}
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-sky-300">
                    Patient Profile
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 flex items-center gap-1.5 mt-0.5">
                  <Stethoscope className="w-4 h-4" />
                  Elder Patient ({patient.age} yrs)
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {patient.condition}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-center min-w-[100px]">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Health Score</div>
                <div className="text-lg font-black text-emerald-600">82/100</div>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-center min-w-[100px]">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Blood Type</div>
                <div className="text-lg font-black text-slate-800 dark:text-white">O+</div>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {savedSuccess && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully! Name and contact details updated across the application.</span>
            </div>
          )}

          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-blue-600 text-blue-700 dark:text-sky-300 bg-blue-50/50 dark:bg-slate-800'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* EDIT MODE FORM */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              Edit Patient Profile Information
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Editing Mode Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Chronic Condition</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Residential Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      ) : (
        /* READ MODE VIEW */
        activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
                <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Identification & Contact Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-600" /> Phone Number
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{patient.phone || formData.phone}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Address
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{patient.email || formData.email}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Health ID
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">IND-ELDER-884920</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" /> Insurance Provider
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{formData.insurance}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> Residential Address
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{patient.address || formData.address}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-3xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-sky-200 uppercase">Digital Health Passport</span>
                  <ShieldCheck className="w-6 h-6 text-sky-300" />
                </div>
                <div>
                  <div className="text-xl font-heading font-black text-white">{patient.name}</div>
                  <div className="text-xs text-blue-100">Age: {patient.age} • Blood Group: O+</div>
                </div>
                <div className="pt-2 border-t border-blue-500/50 flex justify-between items-center text-xs">
                  <div>
                    <div className="text-[10px] text-blue-200 uppercase font-semibold">Primary Care Doc</div>
                    <div className="font-bold text-white">Dr. Ananya Sharma</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-blue-200 uppercase font-semibold">Status</div>
                    <div className="font-bold text-sky-300">Monitored</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Medical Tab */}
      {activeTab === 'medical' && !isEditing && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Medical History & Pre-existing Conditions
          </h2>
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 space-y-2">
            <h3 className="text-xs font-extrabold uppercase text-blue-900 dark:text-sky-300">Primary Chronic Diagnosis</h3>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{patient.condition}</p>
          </div>
        </div>
      )}

      {/* Devices Tab */}
      {activeTab === 'devices' && !isEditing && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <Wifi className="w-5 h-5 text-sky-600" />
            Connected Wearable Sensors
          </h2>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">ElderCare Smart Band v2</span>
              <p className="text-xs text-slate-500">MAC: 84:A2:E9:10:92:4B</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              92% Battery
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
