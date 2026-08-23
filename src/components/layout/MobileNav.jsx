import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHealth } from '../../context/HealthContext';
import {
  LayoutDashboard,
  Activity,
  Brain,
  Users,
  AlertTriangle,
  History,
  Settings,
  X,
  HeartPulse,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav({ isOpen, onClose }) {
  const { healthData, isEmergencyActive } = useHealth();
  const patient = healthData.patient;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Vitals', path: '/vitals', icon: Activity },
    { name: 'AI Analysis', path: '/ai-analysis', icon: Brain, badge: 'AI' },
    { name: 'Family & Care', path: '/family', icon: Users },
    { 
      name: 'Emergency Center', 
      path: '/emergency', 
      icon: AlertTriangle,
      badge: isEmergencyActive ? 'CRITICAL' : null
    },
    { name: 'Health History', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const bottomBarItems = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Vitals', path: '/vitals', icon: Activity },
    { name: 'AI', path: '/ai-analysis', icon: Brain },
    { name: 'Emergency', path: '/emergency', icon: AlertTriangle, isAlert: isEmergencyActive },
    { name: 'Family', path: '/family', icon: Users },
  ];

  return (
    <>
      {/* Slide-out Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <span className="font-heading font-extrabold text-base text-slate-900">
                      ElderCare <span className="text-emerald-600">AI</span>
                    </span>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Patient status */}
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800">{patient.name}</div>
                    <div className="text-[10px] text-slate-500">Status: {healthData.status}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    🟢 Live
                  </span>
                </div>

                {/* Links */}
                <nav className="p-3 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold ${
                            isActive
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-600 hover:bg-slate-100'
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {item.badge}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
                ElderCare AI Hackathon Edition
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {bottomBarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`
              }
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${item.isAlert ? 'text-red-600 animate-bounce' : ''}`} />
                {item.isAlert && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600 animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-0.5">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
