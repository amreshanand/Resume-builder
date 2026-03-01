import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Extremely Lightweight Background */}
            <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" />

            <main className="relative z-10 w-full">
                {/* Hero Section - Forced spacing with inline style to clear 80px Navbar */}
                <section style={{ paddingTop: '200px', paddingBottom: '100px' }} className="px-6 w-full contain-paint">
                    <div className="container-custom max-w-4xl mx-auto text-center">
                        <div className="slide-up">
                            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-5 py-2 mb-10 hover:bg-white/10 transition-all cursor-default group">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                </span>
                                <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-indigo-300 uppercase">AI-Powered Professional Excellence</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-[0.95] text-white">
                                Build Resumes That<br />
                                <span className="gradient-text pb-4">Win Interviews.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                                Harness <span className="text-white font-medium">Gemini 1.5 Flash</span> to build professional,
                                ATS-optimized resumes in seconds. Your career deserves the AI edge.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                                <Link
                                    to="/templates"
                                    className="btn-primary text-lg px-12 py-5 no-underline group shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all"
                                >
                                    <span>Get Started Free</span>
                                    <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
                                </Link>
                                <a
                                    href="#process"
                                    className="text-slate-400 hover:text-white transition-all text-base font-bold no-underline flex items-center gap-2 group"
                                >
                                    How It Works <span className="text-indigo-400 group-hover:translate-y-1 transition-transform">↓</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 bg-white/[0.02] border-y border-white/5 w-full relative z-20 contain-paint">
                    <div className="container-custom max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                            {[
                                { label: 'ATS Score Rate', val: '98%' },
                                { label: 'Time Saved', val: '10x' },
                                { label: 'AI Model', val: 'Gemini 1.5' },
                                { label: 'PDF Quality', val: 'Vector' },
                            ].map((stat, i) => (
                                <div key={i} className="fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tighter">{stat.val}</div>
                                    <div className="text-[10px] sm:text-[11px] text-slate-500 tracking-[0.4em] uppercase font-black">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section id="process" style={{ marginTop: '100px', marginBottom: '100px' }} className="w-full scroll-mt-24 relative z-20 contain-paint">
                    <div className="container-custom max-w-7xl mx-auto px-6">
                        <div className="text-center mb-32">
                            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tight text-white leading-tight">Expertly Built.</h2>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                                Our bespoke AI-driven workflow handles the complexity, letting you focus on landing the job.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {[
                                { icon: '🎨', title: 'Pick Style', desc: 'Industry-vetted layouts that command attention and respect.' },
                                { icon: '🤖', title: 'AI Sync', desc: 'Our AI analyzes your experience to select the best structure.' },
                                { icon: '✍️', title: 'Edit Live', desc: 'Real-time synchronization with high-fidelity preview and smart tips.' },
                                { icon: '📄', title: 'SVG Print', desc: 'Secure, machine-readable, and pixel-perfect PDF exports.' },
                            ].map((feature, i) => (
                                <div key={i} className="glass rounded-[3rem] p-10 flex flex-col items-center text-center hover:bg-white/[0.05] transition-all duration-500 group border border-white/5 active:scale-[0.98]">
                                    <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-6xl mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-xl shadow-black/20">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-5 text-white uppercase tracking-tighter">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AI Edge Section - Dynamic Layout with Forced Margin */}
                <section style={{ marginTop: '150px', paddingTop: '100px', paddingBottom: '150px' }} className="bg-white/[0.01] border-y border-white/5 overflow-hidden relative z-20 w-full contain-paint">
                    <div className="container-custom max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-32 items-center">
                            <div className="slide-up">
                                <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tight text-white leading-[1.05]">The Intelligence Advantage.</h2>
                                <p className="text-2xl text-slate-400 font-light leading-relaxed mb-16 italic text-indigo-300">
                                    "We translate your career into the language that modern recruiters and ATS algorithms understand."
                                </p>
                                <div className="space-y-8">
                                    {[
                                        'Smart achievement quantification',
                                        'Proprietary ATS compatibility checks',
                                        'Industry-specific language tuning',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-6 text-slate-300">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-sm">✓</div>
                                            <span className="text-lg font-bold tracking-tight">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-10">
                                {[
                                    { title: 'Smart Rewriting', icon: '✨', desc: 'Turn vague tasks into metric-driven achievements in one click.' },
                                    { title: 'ATS Score Tracker', icon: '📊', desc: 'Instant feedback on your resume\'s keyword density and hierarchy.' },
                                ].map((card, i) => (
                                    <div key={i} className="glass-premium rounded-[3.5rem] p-12 flex flex-col md:flex-row items-start gap-10 hover:-translate-y-2 transition-all duration-500 border border-white/5 group shadow-2xl">
                                        <div className="text-6xl text-indigo-400 group-hover:scale-110 transition-transform">{card.icon}</div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase">{card.title}</h3>
                                            <p className="text-lg text-slate-400 font-light leading-relaxed">{card.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={{ marginTop: '100px', marginBottom: '150px' }} className="w-full relative z-20 contain-paint">
                    <div className="container-custom max-w-6xl mx-auto px-6">
                        <div className="glass-premium rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden group border border-white/10 shadow-[0_0_60px_rgba(79,70,229,0.15)]" style={{ transform: 'translateZ(0)' }}>
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 opacity-70" />
                            <div className="relative z-10 flex flex-col items-center">
                                <h2 className="text-5xl md:text-8xl font-black mb-16 tracking-tight text-white leading-tight textShadow">Ready for your<br /><span className="gradient-text pb-4">Dream Job?</span></h2>
                                <Link
                                    to="/templates"
                                    className="btn-primary text-xl px-16 py-7 no-underline shadow-2xl shadow-indigo-600/50 font-black uppercase tracking-widest hover:shadow-indigo-600/80 active:scale-95 transition-all rounded-3xl"
                                >
                                    Build Your Resume Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-30 border-t border-white/5 py-24 bg-[#020617] w-full">
                <div className="container-custom max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20">
                    <div className="flex items-center gap-5 group cursor-default">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-4xl text-white shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform">R</div>
                        <span className="text-4xl font-black tracking-tighter text-white">ResumeAI</span>
                    </div>
                    <div className="flex gap-16 text-slate-500 text-[11px] uppercase tracking-[0.5em] font-black">
                        <a href="#" className="hover:text-white transition-colors no-underline">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors no-underline">Terms</a>
                        <a href="#" className="hover:text-white transition-colors no-underline">Support</a>
                    </div>
                    <p className="text-slate-600 text-[11px] font-black tracking-[0.3em] uppercase opacity-60">© 2026 WORLD CLASS ENGINEERING.</p>
                </div>
            </footer>
        </div>
    );
}
