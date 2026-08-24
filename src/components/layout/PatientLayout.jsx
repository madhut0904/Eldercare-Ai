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

  const { healthData, isEmergencyActive, triggerEmergency, logout } = useHealth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-white border-r border-blue-100 hidden md:flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-lg text-slate-900 leading-none">
                ElderCare <span className="text-blue-600">AI</span>
              </h1>
              <p className="text-[10px] text-blue-600 font-bold tracking-wider uppercase mt-1">
                Patient Portal
              </p>
            </div>
          </div>

          {/* Patient Live Pill */}
          <div className="px-4 py-3 mx-4 my-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-dot" />
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
              <span className="text-xs font-bold text-slate-800">{patient.name}</span>
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
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>


      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-heading font-extrabold text-base md:text-lg text-slate-900 leading-tight">
                {getPageTitle()}
              </h2>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Patient: <span className="font-semibold text-slate-800">{patient.name}</span> • Telemetry Active
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
              className="flex items-center gap-2 pl-2 border-l border-slate-200"
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
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <span className="font-heading font-extrabold text-base text-slate-900">ElderCare AI</span>
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
                            isActive ? 'bg-slate-900 text-white' : 'text-slate-600'
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
                  className="flex items-center gap-2 text-rose-600 font-bold text-xs p-2"
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
