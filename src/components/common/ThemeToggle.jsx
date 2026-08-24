import React from 'react';
import { useHealth } from '../../context/HealthContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ showLabel = false }) {
  const { theme, toggleTheme } = useHealth();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative flex items-center gap-2 p-2 rounded-xl transition-all border ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
      }`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
        )}
      </motion.div>

      {showLabel && (
        <span className="text-xs font-bold whitespace-nowrap">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
}
