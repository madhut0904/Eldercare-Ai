import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  Brain,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Siren,
  TrendingUp,
  Heart,
  HeartHandshake,
  Stethoscope,

  Lock,
  Phone,
  Smile,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/common/ThemeToggle';

export default function Landing() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden font-sans transition-colors duration-200">
      
      {/* 1. TOP NAVIGATION HEADER */}
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-blue-100 dark:border-slate-800 px-6 lg:px-12 py-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <HeartPulse className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-heading font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-1">
            ElderCare <span className="text-blue-600 dark:text-sky-400">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-extrabold text-slate-600 dark:text-slate-300">
          <a href="#why" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Why ElderCare</a>
          <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Vitals Telemetry</a>
          <a href="#care-network" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">Doctor Console</a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 group"
          >
            <span>Access Portal Login</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 lg:px-12 pt-12 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="lg:col-span-6 space-y-6"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400 animate-pulse" />
            <span>Next-Gen Loving Elder Health Telemetry</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Smarter Care. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
              Safer, Loving Aging.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            AI-powered health monitoring that empowers families and physicians with continuous 24/7 vitals telemetry, early warning risk predictions, and instant emergency SOS dispatch.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              to="/login"
              className="px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition-all text-center flex items-center justify-center gap-2.5 group"
            >
              <span>👴 Sign In as Patient</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/login"
              className="px-7 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 border border-blue-200 dark:border-slate-800 text-slate-800 dark:text-white font-extrabold text-sm shadow-sm transition-all text-center flex items-center justify-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              <span>👨‍⚕️ Doctor Login Portal</span>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={fadeInUp} className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              <span className="font-bold text-slate-700 dark:text-slate-300">99.8% AI Predictive Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              <span className="font-bold text-slate-700 dark:text-slate-300">24/7 Continuous Sensor Telemetry</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Dynamic Interactive Mockup Visual */}
        <div className="lg:col-span-6 relative">
          {/* Subtle Ambient Lighting */}
          <div className="absolute -top-12 -left-12 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-blue-100 dark:border-slate-800 relative space-y-5"
          >
            {/* Mock Dashboard Top Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 live-dot" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">Live Biometrics • Ramesh Kumar (68y)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                🟢 STABLE & SAFE
              </span>
            </div>

            {/* Health Score + AI Risk Card Preview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-blue-600 flex items-center justify-center font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                  82
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Health Score</div>
                  <div className="text-xs font-extrabold text-emerald-600">Stable (Optimal)</div>
                  <div className="text-[10px] text-slate-500">↑ 4.2% today</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-between shadow-md">
                <div>
                  <div className="text-[10px] text-sky-200 font-bold uppercase">AI Risk Assessment</div>
                  <div className="text-sm font-extrabold text-sky-300">LOW (18%)</div>
                  <div className="text-[10px] text-blue-100">Confidence: 94%</div>
                </div>
                <Brain className="w-8 h-8 text-sky-300 opacity-90" />
              </div>
            </div>

            {/* Vitals Grid Preview */}
            <div className="grid grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Heart Rate</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">72 <span className="text-[10px] font-bold text-blue-600">BPM</span></div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">SpO₂ Oxygen</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">97%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Blood Press.</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">120/80</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Body Temp</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">36.7°C</div>
              </div>
            </div>

            {/* Floating Live Alert Widget */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-blue-200 dark:border-slate-700 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-sky-300 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 dark:text-white">Guardian AI Active</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">All vital indicators within healthy range</div>
                </div>
              </div>

              <Link to="/login" className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-700">
                Log In →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. SCROLL DOWN INDICATOR */}
      <div className="text-center pb-12">
        <a href="#why" className="inline-flex flex-col items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
          <span>Scroll to explore features</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-600" />
        </a>
      </div>

      {/* 4. WHY ELDERCARE AI SECTION */}
      <section id="why" className="py-20 px-6 lg:px-12 bg-white dark:bg-slate-900 border-y border-blue-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-sky-400">Why ElderCare AI?</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Designed for Total Peace of Mind & Loving Protection
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              Combining advanced biometric sensor integration with predictive neural models to ensure complete safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-4 hover:border-blue-300 transition-all shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-sky-300 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">1. Continuous Telemetry</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Non-stop telemetry tracks heart rate, blood oxygen saturation, body temperature, and activity patterns every few seconds.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-4 hover:border-blue-300 transition-all shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-300 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">2. Neural Early Warnings</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Machine learning models analyze subtle multi-vital correlations to flag potential cardiovascular or respiratory distress before symptoms escalate.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 space-y-4 hover:border-rose-300 transition-all shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-300 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">3. Family & Doctor Dispatch</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Instant multi-channel notifications dispatch fall impacts or vital anomalies directly to guardians and primary care doctors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-6 lg:px-12 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-sky-400">Simple 4-Step Pipeline</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">How ElderCare AI Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { step: "01", title: "Monitor Vitals", desc: "Smart sensors capture live heart rate, SpO₂, temperature & motion.", icon: Activity },
              { step: "02", title: "Analyze Data", desc: "Data streams to our secure local SaaS telemetry pipeline in real time.", icon: TrendingUp },
              { step: "03", title: "Predict Risk", desc: "Neural engines evaluate risk probabilities and physiological anomalies.", icon: Brain },
              { step: "04", title: "Dispatch Alert", desc: "Instant emergency dispatch alerts family members and medical care.", icon: Siren }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-sm relative space-y-3">
                  <div className="text-3xl font-heading font-black text-blue-100 dark:text-slate-800">{item.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION -> GOES TO LOGIN */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl">
            Protect the people who matter most.
          </h2>
          <p className="text-base text-blue-100 max-w-2xl mx-auto font-medium">
            Join thousands of caregivers and doctors using ElderCare AI to safeguard elderly loved ones.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-base shadow-xl transition-all flex items-center gap-2 group"
            >
              <span>Get Started — Access Login Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-8 px-6 lg:px-12 bg-white dark:bg-slate-900 border-t border-blue-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 ElderCare AI Inc. Built for Hackathon Demonstration.</div>
        <div className="flex items-center gap-6 font-bold">
          <Link to="/login" className="hover:text-blue-600">Portal Login</Link>
          <Link to="/login" className="hover:text-blue-600">Patient Portal</Link>
          <Link to="/login" className="hover:text-blue-600">Doctor Portal</Link>
        </div>
      </footer>
    </div>
  );
}
