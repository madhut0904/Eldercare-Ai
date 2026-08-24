import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import { 
  HeartPulse, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  Heart, 
  Activity, 
  ShieldCheck, 
  Stethoscope, 
  UserCheck,
  Phone,
  Users,
  Smile,
  HeartHandshake
} from 'lucide-react';

import { motion } from 'framer-motion';
import ThemeToggle from '../components/common/ThemeToggle';

export default function Login() {
  const { loginAsPatient, loginAsDoctor, theme } = useHealth();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const [selectedRole, setSelectedRole] = useState('patient'); // 'patient' | 'doctor'
  const [identifier, setIdentifier] = useState('ramesh.kumar@eldercare.org');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'patient') {
      setIdentifier('ramesh.kumar@eldercare.org');
    } else {
      setIdentifier('dr.ananya@eldercareai.org');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter your email or phone number.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      if (selectedRole === 'patient') {
        loginAsPatient();
        navigate('/patient/dashboard');
      } else {
        loginAsDoctor();
        navigate('/doctor/dashboard');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'patient') {
        loginAsPatient();
        navigate('/patient/dashboard');
      } else {
        loginAsDoctor();
        navigate('/doctor/dashboard');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-indigo-50/70 text-slate-900'
    }`}>
      
      {/* Gentle Decorative Glow Orbs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT SIDE: Friendly Healthcare Visual (6 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6 p-4 lg:p-6"
        >
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/25 text-white">
                <HeartPulse className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl tracking-tight text-blue-950 dark:text-white flex items-center gap-1.5">
                  ElderCare <span className="text-blue-600 dark:text-sky-400">AI</span>
                </span>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase">
                  Loving Care & Health Monitoring
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a href="/landing" className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-sky-400 underline">
                Overview →
              </a>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-sky-300 text-xs font-bold border border-blue-200/60 dark:border-blue-800">
              <HeartHandshake className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span>Compassionate Care for Loved Ones</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
              Smarter Care. <br />
              <span className="text-blue-600 dark:text-sky-400">Safer, Healthier Living.</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              Continuous live vitals monitoring, intelligent early risk detection, and 24/7 loving family connectivity.
            </p>
          </div>

          {/* Key Friendly Value Points */}
          <div className="space-y-2.5 pt-2">
            {[
              { text: "Continuous 24/7 Heart & Oxygen Telemetry", icon: Heart },
              { text: "AI Early Warning Risk Detection & Analysis", icon: Sparkles },
              { text: "Instant 2-Second Emergency SOS Dispatch", icon: ShieldCheck },
              { text: "Physician & Family Real-Time Dashboard", icon: Users }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Visual Showcase Card with Floating Health Widgets */}
          <div className="relative pt-4">
            <div className="rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-500 p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-100">Live Health Status</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-sm">
                    ● Monitored Active
                  </span>
                </div>
                <div className="text-2xl font-heading font-black">Ramesh Kumar (Age 68)</div>
                <p className="text-xs text-blue-100">Vital signs stable. Heart rhythm regular and oxygenation optimal.</p>
              </div>

              {/* Decorative graphic circle */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            </div>

            {/* Floating Health Card: 72 BPM */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 -right-2 sm:right-4 bg-white dark:bg-slate-800 rounded-2xl p-3 border border-blue-100 dark:border-slate-700 shadow-lg flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center font-bold">
                ❤️
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">Heart Rate</div>
                <div className="text-xs font-black text-slate-900 dark:text-white">72 BPM <span className="text-emerald-500 text-[10px] font-bold">Normal</span></div>
              </div>
            </motion.div>

            {/* Floating Health Card: 97% SpO2 */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-3 -left-2 sm:left-4 bg-white dark:bg-slate-800 rounded-2xl p-3 border border-blue-100 dark:border-slate-700 shadow-lg flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-500 flex items-center justify-center font-bold">
                🫁
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">SpO₂ Oxygen</div>
                <div className="text-xs font-black text-slate-900 dark:text-white">97% <span className="text-blue-500 text-[10px] font-bold">Optimal</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Login Card (6 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white">
                Welcome Back 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Choose your role to access your healthcare dashboard.
              </p>
            </div>

            {/* Role Selector Tabs (Patient vs Doctor) */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Patient Role */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('patient')}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 text-left relative ${
                    selectedRole === 'patient'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl">👴</span>
                    {selectedRole === 'patient' && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">
                    Patient / Elder
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Elder & Family Portal
                  </span>
                </button>

                {/* Doctor Role */}
                <button
                  type="button"
                  onClick={() => handleRoleChange('doctor')}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 text-left relative ${
                    selectedRole === 'doctor'
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl">👨‍⚕️</span>
                    {selectedRole === 'doctor' && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white mt-1">
                    Doctor / Caregiver
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Clinical Console
                  </span>
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Identifier Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {selectedRole === 'patient' ? 'Email or Registered Mobile Number' : 'Doctor Work Email or Medical ID'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-blue-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={selectedRole === 'patient' ? 'e.g. ramesh.kumar@eldercare.org' : 'e.g. dr.ananya@eldercareai.org'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                  <button type="button" className="text-[11px] font-bold text-blue-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-blue-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secure password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-600 dark:text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember my login</span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                {isLoading ? (
                  <span>Signing you in...</span>
                ) : (
                  <>
                    <span>Sign In as {selectedRole === 'patient' ? 'Patient' : 'Doctor'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo 1-Click Access Box */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-blue-900 dark:text-sky-400 uppercase tracking-wider">
                  ⚡ 1-Click Quick Demo
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">No password needed</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('patient')}
                  className="py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-sky-300 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>👴 Demo Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('doctor')}
                  className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-200 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <span>👨‍⚕️ Demo Doctor</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
