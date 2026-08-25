import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';
import { 
  HeartPulse, 
  Home, 
  Heart, 
  Bot, 
  BarChart2, 
  AlertTriangle, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ShieldAlert 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle';


export default function PatientLayout() {

  const { healthData, isEmergencyActive, triggerEmergency, logout, theme } = useHealth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const patient = healthData.patient;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: Home },
    { name: 'My Vitals', path: '/patient/vitals', icon: Heart },
    { name: 'AI Health', path: '/patient/ai-health', icon: Bot, badge: 'AI' },
    { name: 'Health History', path: '/patient/history', icon: BarChart2 },
    { 
      name: 'Emergency', 
      path: '/patient/emergency', 
      icon: AlertTriangle, 
      badge: isEmergencyActive ? 'CRITICAL' : null,
      isEmergency: isEmergencyActive 
    },
    { name: 'Profile', path: '/patient/profile', icon: User },
    { name: 'Settings', path: '/patient/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/patient/dashboard': return 'Patient Dashboard';
      case '/patient/vitals': return 'My Live Vitals Telemetry';
      case '/patient/ai-health': return 'AI Health Risk Analysis';
      case '/patient/history': return 'Health History & Trends';
      case '/patient/emergency': return 'Emergency SOS Center';
      case '/patient/profile': return 'Patient Profile';
      case '/patient/settings': return 'Account Settings';
      default: return 'ElderCare AI Patient Portal';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* DESKTOP SIDEBAR */}
      <aside className={`w-64 border-r hidden md:flex flex-col justify-between h-screen sticky top-0 z-30 select-none transition-colors duration-200 ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-blue-100'
      }`}>
        <div>
          {/* Logo */}
          <div className={`p-6 border-b flex items-center gap-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className={`font-heading font-extrabold text-lg leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ElderCare <span className="text-blue-600 dark:text-sky-400">AI</span>
              </h1>
              <p className="text-[10px] text-blue-600 dark:text-sky-400 font-bold tracking-wider uppercase mt-1">
                Patient Portal
              </p>
            </div>
          </div>

          {/* Patient Live Pill */}
          <div className={`px-4 py-3 mx-4 my-4 rounded-2xl border flex items-center justify-between ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-blue-50/80 border-blue-100'
          }`}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-dot" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{patient.name}</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">
              {healthData.status}
            </span>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-900'
                        : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.isEmergency ? 'text-rose-500 animate-bounce' : ''}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.isEmergency 
                        ? 'bg-rose-500 text-white animate-pulse' 
                        : isDark
                        ? 'bg-slate-800 text-sky-400 border border-slate-700'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>


      {/* MAIN CONTAINER */}
      <div className={`flex-1 flex flex-col min-w-0 transition-colors duration-200 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}>
        {/* HEADER */}
        <header className={`sticky top-0 z-20 backdrop-blur-md border-b px-4 md:px-8 py-3.5 flex items-center justify-between transition-colors duration-200 ${
          isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className={`font-heading font-extrabold text-base md:text-lg leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {getPageTitle()}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Patient: <span className="font-semibold text-slate-800 dark:text-slate-200">{patient.name}</span> • Telemetry Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isEmergencyActive && (
              <NavLink
                to="/patient/emergency"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold emergency-pulse shadow-md"
              >
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>SOS ALERT ACTIVE</span>
              </NavLink>
            )}

            <NavLink 
              to="/patient/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800"
            >
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                alt="Ramesh Kumar" 
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
              />
            </NavLink>
          </div>

        </header>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 w-72 bg-slate-950 shadow-2xl flex flex-col justify-between p-5 border-r border-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <span className="font-heading font-extrabold text-base text-white">ElderCare AI</span>
                    <button onClick={() => setMobileMenuOpen(false)}>
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold ${
                            isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                          }`
                        }
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-rose-400 font-bold text-xs p-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PAGE CONTENT */}
        <main className="flex-1 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
