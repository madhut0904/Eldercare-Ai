import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Stethoscope, 
  User, 
  Phone, 
  Mail, 
  Building2, 
  ShieldCheck, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Save, 
  X,
  Award,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DoctorProfile() {
  const { doctorMetrics, updateDoctorProfile } = useHealth();

  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local Form State
  const [formData, setFormData] = useState({
    doctorName: doctorMetrics.doctorName || "Dr. Ananya Sharma",
    specialty: doctorMetrics.specialty || "Senior Geriatric Cardiologist",
    email: doctorMetrics.email || "dr.ananya@eldercareai.org",
    phone: doctorMetrics.phone || "+91 98765 00000",
    medicalId: doctorMetrics.medicalId || "MED-IN-99482",
    hospital: doctorMetrics.hospital || "Metro Care Hospital",
    department: doctorMetrics.department || "Geriatric Cardiology",
    consultingHours: doctorMetrics.consultingHours || "09:00 AM - 05:00 PM"
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
    updateDoctorProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="h-32 md:h-40 bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 relative p-6 flex justify-between items-start">
          <span className="relative z-10 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/30 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5" />
            Verified Physician Console Profile
          </span>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="relative z-10 px-4 py-2 rounded-xl text-xs font-extrabold bg-white text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-1.5 shadow-md"
          >
            {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Physician Profile'}</span>
          </button>
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between -mt-14 md:-mt-16 gap-4 mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" 
                alt={doctorMetrics.doctorName}
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-white dark:border-slate-900 shadow-xl object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
                    {doctorMetrics.doctorName}
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-sky-300">
                    Lead Physician
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400 flex items-center gap-1.5 mt-0.5">
                  <Award className="w-4 h-4" />
                  {doctorMetrics.specialty}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {doctorMetrics.hospital} • {doctorMetrics.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-center min-w-[110px]">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monitored Patients</div>
                <div className="text-lg font-black text-blue-600">{doctorMetrics.totalPatients} Elders</div>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {savedSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Doctor profile updated successfully! Name and specialty updated across the physician portal.</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* EDIT MODE FORM */}
      {isEditing ? (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              Edit Doctor Profile Information
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Physician Edit Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Doctor Full Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Medical Specialty</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Medical License ID</label>
              <input
                type="text"
                name="medicalId"
                value={formData.medicalId}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Hospital / Medical Center</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Doctor Profile</span>
            </button>
          </div>
        </form>
      ) : (
        /* READ MODE VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 p-6 shadow-sm space-y-6">
              <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Physician Credentials & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Medical License ID
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{doctorMetrics.medicalId}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" /> Direct Work Phone
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{doctorMetrics.phone}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" /> Physician Email
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{doctorMetrics.email}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" /> Consulting Hours
                  </span>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{doctorMetrics.consultingHours}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" /> Primary Hospital & Ward
                </span>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{doctorMetrics.hospital} — {doctorMetrics.department}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-sky-300 uppercase">Physician Badge</span>
                <Stethoscope className="w-6 h-6 text-sky-300" />
              </div>
              <div>
                <div className="text-xl font-heading font-black text-white">{doctorMetrics.doctorName}</div>
                <div className="text-xs text-blue-100">{doctorMetrics.specialty}</div>
              </div>
              <div className="pt-2 border-t border-blue-500/40 flex justify-between items-center text-xs">
                <div>
                  <div className="text-[10px] text-blue-200 uppercase font-semibold">License</div>
                  <div className="font-bold text-white">{doctorMetrics.medicalId}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-blue-200 uppercase font-semibold">Status</div>
                  <div className="font-bold text-emerald-400">Verified Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
