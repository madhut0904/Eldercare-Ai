import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  Brain,
  ShieldCheck,
  Bell,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Users,
  Siren,
  Smartphone,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden font-sans">
      {/* Top Landing Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <HeartPulse className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-heading font-extrabold text-xl text-slate-900">
            ElderCare <span className="text-emerald-600">AI</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#why" className="hover:text-emerald-600 transition-colors">Why ElderCare AI</a>
          <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 group"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-400" />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative px-6 lg:px-12 pt-12 pb-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Next-Gen Medical Telemetry SaaS</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
            Smarter Care. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600">
              Safer Aging.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            AI-powered health monitoring that helps families detect potential health risks before they become emergencies. Continuous non-invasive biometric telemetry & early warning alerts.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/25 transition-all text-center flex items-center justify-center gap-2 group"
            >
              <span>Start Monitoring</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/ai-analysis"
              className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-800 font-extrabold text-sm shadow-sm transition-all text-center flex items-center justify-center gap-2"
            >
              <Brain className="w-4 h-4 text-indigo-600" />
              <span>Explore AI Insights</span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-6 flex items-center gap-6 text-xs text-slate-500 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">99.8% Prediction Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">24/7 Guardian Monitoring</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Dashboard Mockup Visual */}
        <div className="lg:col-span-6 relative">
          {/* Subtle Glow Background */}
          <div className="absolute -top-12 -left-12 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 relative space-y-4"
          >
            {/* Top Mock Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 live-dot" />
                <span className="text-xs font-bold text-slate-800">Live Telemetry • Ramesh Kumar (68y)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                🟢 STABLE
              </span>
            </div>

            {/* Health Score + AI Risk Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 border-emerald-500 flex items-center justify-center font-heading font-extrabold text-xl text-slate-900">
                  82
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Health Score</div>
                  <div className="text-xs font-bold text-emerald-600">Stable (Optimal)</div>
                  <div className="text-[10px] text-slate-500">↑ 4.2% today</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950 text-white flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-indigo-300 font-bold uppercase">AI Risk Level</div>
                  <div className="text-sm font-extrabold text-emerald-400">LOW (18%)</div>
                  <div className="text-[10px] text-indigo-200">Confidence: 94%</div>
                </div>
                <Brain className="w-7 h-7 text-indigo-400 opacity-80" />
              </div>
            </div>

            {/* Vitals Grid Preview */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-xs font-bold text-slate-400">❤️ HR</div>
                <div className="text-sm font-extrabold text-slate-900">72 <span className="text-[10px] font-normal">BPM</span></div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-xs font-bold text-slate-400">🫁 SpO₂</div>
                <div className="text-sm font-extrabold text-slate-900">97%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-xs font-bold text-slate-400">🩸 BP</div>
                <div className="text-sm font-extrabold text-slate-900">120/80</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div className="text-xs font-bold text-slate-400">🌡️ Temp</div>
                <div className="text-sm font-extrabold text-slate-900">36.7°C</div>
              </div>
            </div>

            {/* Floating Live Alert Card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="p-3 rounded-2xl bg-white shadow-xl border border-emerald-200 flex items-center gap-3 text-xs"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-slate-900">Guardian AI Sync Active</div>
                <div className="text-[10px] text-slate-500">All 5 vital indicators in optimal range</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* WHY ELDERCARE AI */}
      <section id="why" className="py-20 px-6 lg:px-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Why ElderCare AI?</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
              Designed for Total Peace of Mind
            </h2>
            <p className="text-sm text-slate-600">
              Combining advanced biometric hardware integration with predictive neural models to ensure elderly safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-300 transition-all card-shadow-hover">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">1. Continuous Monitoring</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Non-stop telemetry tracks heart rate, blood oxygen saturation, body temperature, and activity patterns every few seconds.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-indigo-300 transition-all card-shadow-hover">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">2. AI Risk Prediction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Machine learning models analyze subtle multi-vital correlations to flag potential cardiovascular or respiratory distress before symptoms escalate.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-rose-300 transition-all card-shadow-hover">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900">3. Family & Caregiver Alerts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant multi-channel push, SMS, and call notifications dispatch fall impacts or dangerous vital anomalies directly to guardians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-6 lg:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Simple 4-Step Pipeline</span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Monitor", desc: "Wearable sensors capture live heart rate, SpO₂, temperature & motion.", icon: Activity },
              { step: "02", title: "Analyze", desc: "Data streams to our secure local SaaS telemetry pipeline in real time.", icon: TrendingUp },
              { step: "03", title: "Predict", desc: "Neural engines evaluate risk probabilities and physiological anomalies.", icon: Brain },
              { step: "04", title: "Alert", desc: "Instant emergency dispatch alerts family members and medical care.", icon: Siren }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm relative text-left">
                  <div className="text-3xl font-heading font-extrabold text-slate-200 mb-2">{item.step}</div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 lg:px-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-heading font-extrabold text-4xl sm:text-5xl">
            Protect the people who matter most.
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto font-medium">
            Join thousands of caregivers using ElderCare AI to safeguard their elderly loved ones with modern predictive SaaS technology.
          </p>
          <div className="pt-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-base shadow-xl shadow-emerald-500/30 transition-all"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 lg:px-12 bg-white border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 ElderCare AI Inc. Built for Hackathon Demo.</div>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          <Link to="/emergency" className="hover:text-slate-900">Emergency Center</Link>
          <Link to="/settings" className="hover:text-slate-900">Settings</Link>
        </div>
      </footer>
    </div>
  );
}
