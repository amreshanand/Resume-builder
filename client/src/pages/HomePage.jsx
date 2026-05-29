import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import { Sparkles, ArrowRight, Layout, Share2, Shield } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] selection:bg-amber-500/30 overflow-x-hidden relative font-sans transition-colors duration-300">
      {/* 3D Tech Background */}
      <div className="fixed inset-0 z-0 bg-[var(--surface)] pointer-events-none" />
      <div className="fixed inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
        <div className="tech-grid h-full w-full opacity-30" />
        <div className="tech-grid-3d opacity-[0.06]" />
      </div>

      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-orange-600/10 blur-[90px] pointer-events-none z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 dark:border-white/5 bg-white/90 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-amber-500/10 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
              ResumeAI
            </span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/templates" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors no-underline">
              Templates
            </Link>
            <ThemeToggle />
            {user ? (
              <Link to="/dashboard" className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold rounded-xl transition-all no-underline shadow-md shadow-amber-500/25">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors no-underline">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-white text-xs sm:text-sm font-bold rounded-xl transition-all no-underline shadow-md shadow-amber-500/25">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column (Spans 6/12) */}
          <div className="lg:col-span-6 text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="monospace text-[9px] sm:text-[10px] font-bold tracking-wider text-amber-600 dark:text-amber-300 uppercase">
                Powered by Gemini 1.5 Pro
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Create a Resume <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500">
                That Lands Interviews
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Leverage advanced AI to generate targeted content, analyze keywords against ATS tracking systems, and design stunning professional portfolios.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to={user ? "/dashboard" : "/register"}
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-110 text-white rounded-xl font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 no-underline text-sm sm:text-base"
              >
                Build My Resume <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/templates"
                className="px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl font-bold transition-all no-underline text-sm sm:text-base"
              >
                View Templates
              </Link>
            </div>

            {/* Quick Stats / Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-white/5 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">94%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">ATS Pass Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">5x</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Creation Speed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-1">Customizable</div>
              </div>
            </div>
          </div>

          {/* Right Mockup Column (Spans 6/12) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 rounded-3xl blur-[40px] opacity-30 z-0 pointer-events-none" />
            
            {/* Main Mock Resume Preview - Constrained to max-w-sm to prevent overlapping */}
            <div className="relative z-10 w-full max-w-sm aspect-[3/4] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center gap-3.5 border-b border-slate-100 dark:border-white/5 pb-3.5">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-black text-sm shadow-sm">
                  AA
                </div>
                <div className="flex-1 space-y-1">
                  <div className="h-4.5 w-28 bg-slate-900 dark:bg-white rounded opacity-90" />
                  <div className="h-3 w-36 bg-slate-400 dark:bg-slate-500 rounded opacity-60" />
                </div>
              </div>

              {/* Sections */}
              <div className="flex flex-col gap-3.5 flex-1">
                <div className="flex flex-col gap-1.5">
                  <div className="h-3 w-14 bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded px-1.5 py-0.5 text-[8px] font-black tracking-widest uppercase self-start">
                    Summary
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-2 w-[90%] bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="h-3 w-18 bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded px-1.5 py-0.5 text-[8px] font-black tracking-widest uppercase self-start">
                    Experience
                  </div>
                  <div className="flex gap-2.5 items-stretch">
                    <div className="w-0.5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2.5 w-36 bg-slate-800 dark:bg-slate-200 rounded opacity-80" />
                      <div className="h-2 w-[65%] bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="h-3 w-10 bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded px-1.5 py-0.5 text-[8px] font-black tracking-widest uppercase self-start">
                    Skills
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    <div className="h-4 w-12 bg-slate-100 dark:bg-white/5 rounded border border-slate-200/50 dark:border-white/5" />
                    <div className="h-4 w-16 bg-slate-100 dark:bg-white/5 rounded border border-slate-200/50 dark:border-white/5" />
                    <div className="h-4 w-10 bg-slate-100 dark:bg-white/5 rounded border border-slate-200/50 dark:border-white/5" />
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="mt-auto pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1 font-medium"><Sparkles className="w-3 h-3 text-amber-500 animate-pulse" /> AI Optimized</span>
                <span className="font-bold text-emerald-500 dark:text-emerald-400">ATS Match: 98%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-slate-500/[0.02] dark:bg-white/[0.01] border-y border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Engineered for Professional Excellence
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
              A comprehensive tool suite structured to optimize every step of your application workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-white/50 dark:bg-[#0f172a]/30 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini AI Engine</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate professional summaries, tailor bullet points to specific jobs, and correct syntax instantly with AI integrations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/50 dark:bg-[#0f172a]/30 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Premium Layouts</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Curated designs built to comply with modern recruiter standards. Beautifully styled, fully responsive, and highly readable.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/50 dark:bg-[#0f172a]/30 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">ATS Keyword Scanner</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Analyze formatting, structural headers, and keyword densities against common ATS systems to elevate placement odds.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/50 dark:bg-[#0f172a]/30 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Instant Sharing</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate static public URLs to share with recruiters or export pixel-perfect PDFs locally with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-950 dark:text-white">
              ResumeAI
            </span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ResumeAI. All rights reserved. Built for professional placement.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
