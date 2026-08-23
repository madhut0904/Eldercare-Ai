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
  HeartPulse,
  ChevronRight,
  ShieldCheck,
  CircleDot
} from 'lucide-react';

export default function Sidebar() {
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
      badge: isEmergencyActive ? 'CRITICAL' : null,
      alertStyle: isEmergencyActive
    },
    { name: 'Health History', path: '/history', icon: History },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between hidden md:flex h-screen sticky top-0 z-30 select-none">
      <div>
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white">
              <HeartPulse className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-lg text-slate-900 leading-none">
                ElderCare <span className="text-emerald-600">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-1">
                Health Monitor SaaS
              </p>
            </div>
          </div>
        </div>

        {/* Live Patient Status Banner */}
        <div className="px-4 py-3 mx-4 my-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 live-dot" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
            <span className="text-xs font-semibold text-slate-700">{patient.name}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
            {healthData.status}
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.alertStyle ? 'text-rose-500 animate-bounce' : ''}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.alertStyle 
                      ? 'bg-rose-500 text-white animate-pulse' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Profile at Bottom */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
              RK
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">{patient.name}</div>
              <div className="text-[10px] text-slate-500">{patient.age} yrs • Age 60+ Tier</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
