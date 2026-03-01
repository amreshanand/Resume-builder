import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden relative">
            {/* 3D Tech Grid Background */}
            <div className="fixed inset-0 z-0 bg-[#020617] opacity-40">
                <div className="tech-grid h-full w-full opacity-30" />
            </div>

            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="tech-grid-3d opacity-[0.15]" />
            </div>

            <main className="relative z-10 w-full">
                {/* Hero Section */}
                <section style={{ paddingTop: '180px', paddingBottom: '120px' }} className="px-6 w-full contain-paint">
                    <div className="container-custom max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                            <div className="flex-1 text-center lg:text-left slide-up">
                                <div className="inline-flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md rounded-full px-5 py-2 mb-10 hover:bg-indigo-500/20 transition-all cursor-default group">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </span>
                                    <span className="monospace text-[10px] font-bold tracking-[0.3em] text-indigo-300 uppercase">Neural Architecture v2.0</span>
                                </div>

                                <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black mb-10 tracking-tight leading-[0.95] text-white">
                                    Construct <span className="gradient-text pb-4">Future-Ready</span> Resumes.
                                </h1>

                                <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-16 leading-relaxed font-light">
                                    Step into the next dimension of career architecture. Our <span className="text-white font-medium">3D-Optimized AI</span> transforms raw experience into professional masterpieces.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                                    <Link
                                        to="/templates"
                                        className="btn-primary text-lg px-12 py-5 no-underline group shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all rounded-2xl"
                                    >
                                        <span>Start Building</span>
                                        <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
                                    </Link>
                                    <button
                                        className="monospace text-[11px] font-bold tracking-[0.4em] text-slate-500 hover:text-indigo-400 transition-all uppercase flex items-center gap-3 group"
                                    >
                                        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-indigo-500/50">▶</div>
                                        Watch AI Agent
                                    </button>
                                </div>
                            </div>

                            {/* 3D Floating Mockup */}
                            <div className="flex-1 perspective-1000 hidden lg:block">
                                <div className="floating-3d relative w-full aspect-[4/5] max-w-[450px] mx-auto">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-[3rem] blur-3xl opacity-50" style={{ transform: 'translateZ(-10px)' }} />
                                    <div className="relative h-full w-full bg-[#0f172a]/90 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl shadow-2xl overflow-hidden tech-card">
                                        <div className="flex flex-col gap-6 h-full">
                                            <div className="flex items-center gap-4 border-b border-white/10 pb-8">
                                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-3xl shadow-lg">👤</div>
                                                <div>
                                                    <div className="h-4 w-32 bg-indigo-400/20 rounded-full mb-3" />
                                                    <div className="h-3 w-20 bg-white/10 rounded-full" />
                                                </div>
                                                <div className="ml-auto flex flex-col items-end">
                                                    <div className="h-2 w-10 bg-emerald-500/40 rounded-full mb-2 animate-pulse" />
                                                    <div className="h-2 w-12 bg-indigo-500/40 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="space-y-5 flex-1 pt-4">
                                                <div className="h-3 w-full bg-white/5 rounded-full" />
                                                <div className="h-3 w-full bg-white/5 rounded-full" />
                                                <div className="h-3 w-[80%] bg-white/5 rounded-full" />
                                                <div className="h-3 w-full bg-white/10 rounded-full mt-12" />
                                                <div className="h-3 w-[60%] bg-white/5 rounded-full" />
                                                <div className="h-3 w-[75%] bg-white/5 rounded-full" />
                                            </div>
                                            <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/5">
                                                <div className="flex gap-2">
                                                    <div className="h-2 w-10 bg-indigo-500/40 rounded-full" />
                                                    <div className="h-2 w-8 bg-indigo-500/20 rounded-full" />
                                                </div>
                                                <div className="monospace text-[10px] text-indigo-400 font-bold whitespace-nowrap px-2">READY TO EXPORT</div>
                                            </div>
                                        </div>

                                        {/* Scanline effect */}
                                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />
                                    </div>

                                    {/* HUD Elements */}
                                    <div className="absolute -top-12 -right-12 bg-indigo-500 text-white px-5 py-2 rounded-xl monospace text-[10px] font-bold shadow-2xl shadow-indigo-500/50 animate-bounce">
                                        ⚡ OPTIMIZING
                                    </div>
                                    <div className="absolute -bottom-8 -left-16 bg-[#0f172a]/90 border border-white/10 text-slate-300 px-8 py-5 rounded-2xl monospace text-[10px] backdrop-blur-2xl shadow-2xl border-indigo-500/30 group z-20">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="opacity-70 whitespace-nowrap tracking-widest">ATS SCORE:</span> <span className="text-emerald-400 font-bold whitespace-nowrap text-xs">98.4%</span>
                                        </div>
                                    </div>

                                    {/* Tech Borders */}
                                    <div className="absolute top-1/2 -right-4 w-1 h-32 bg-indigo-500/30 rounded-full blur-md" />
                                    <div className="absolute top-0 right-1/4 w-32 h-1 bg-indigo-500/30 rounded-full blur-md" />
                                </div>
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
