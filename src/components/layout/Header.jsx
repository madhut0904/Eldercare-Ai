import React from 'react';
import { useHealth } from '../../context/HealthContext';
import DemoModeControl from '../demo/DemoModeControl';
import { Bell, Menu, ShieldAlert, Heart, Activity, AlertTriangle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ onOpenMobileMenu }) {
  const { healthData, isEmergencyActive, triggerEmergency } = useHealth();
  const location = useLocation();

  // Map pathname to clean title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard Overview';
      case '/vitals': return 'Detailed Vitals Telemetry';
      case '/ai-analysis': return 'AI Health Risk Analysis';
      case '/family': return 'Family & Caregiver Network';
      case '/emergency': return 'Emergency Control Center';
      case '/history': return 'Health History & Analytics';
      case '/settings': return 'System Settings';
      default: return 'ElderCare AI Platform';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Left side: Hamburger button + Page context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-extrabold text-base md:text-lg text-slate-900 leading-tight">
              {getPageTitle()}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot" />
              Live Stream
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Monitoring Ramesh Kumar • Last sync: <span className="font-semibold text-slate-700">Just now</span>
          </p>
        </div>
      </div>

      {/* Right side: Emergency status, Demo Mode, Notifications, User */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Emergency quick alert button */}
        {isEmergencyActive ? (
          <Link
            to="/emergency"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold emergency-pulse shadow-md"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span className="hidden xs:inline">CRITICAL ALERT</span>
          </Link>
        ) : (
          <button
            onClick={triggerEmergency}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition-all"
            title="Simulate Emergency Fall Event"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Simulate Fall</span>
          </button>
        )}

        {/* Demo Mode Button */}
        <DemoModeControl />

        {/* Notification Bell */}
        <button 
          className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200/80"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            RK
          </div>
        </div>
      </div>
    </header>
  );
}
