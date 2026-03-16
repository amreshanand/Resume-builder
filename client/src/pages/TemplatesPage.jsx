import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const FALLBACK_STYLE = { icon: '📄', color: 'from-slate-500 to-indigo-600' };

export default function TemplatesPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Public route that includes admin-managed category metadata
            const { data } = await api.get('/templates/by-category');
            setCategories(data?.data?.categories || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load dynamic templates:', error);
            setCategories([]);
            setLoading(false);
        }
    };

    const handleSelect = (category) => {
        navigate(`/templates/${category.id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] selection:bg-indigo-500/30 overflow-x-hidden pb-40 relative pt-16">
            {/* Navbar Spacer */}
            <div className="h-8 md:h-14 w-full" />

            {/* 3D Tech Background */}
            <div className="fixed inset-0 z-0 bg-[var(--surface)] pointer-events-none" />
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="tech-grid h-full w-full opacity-40" />
                <div className="tech-grid-3d opacity-[0.1]" />
            </div>

            <div className="container-custom max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-20 slide-up">
                    <div className="inline-flex items-center gap-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2.5 mb-8 backdrop-blur-md">
                        <span className="flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="monospace text-xs font-semibold tracking-wider text-indigo-300 uppercase">Choose Your Category</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-white">
                        Select <span className="gradient-text">Category</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed text-center px-4">
                        Choose your professional domain to discover specialized resume templates designed for your industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {categories.map((category, i) => {
                        const icon = category.icon || FALLBACK_STYLE.icon;
                        const colorBase = category.color || FALLBACK_STYLE.color;
                        const color = `${colorBase}/20`;
                        return (
                        <div
                            key={category.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelect(category)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSelect(category);
                                }
                            }}
                            className="group relative bg-[#0f172a]/40 hover:bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 hover:border-white/15 rounded-2xl p-7 text-left transition-all duration-500 cursor-pointer fade-in flex flex-col shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl z-0 pointer-events-none">
                                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
                            </div>

                            <div className="flex items-start justify-between mb-5 relative z-10 shrink-0">
                                <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${color} p-[1px] group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <div className="w-full h-full bg-[#0f172a]/90 rounded-xl flex items-center justify-center text-2xl">
                                        {icon}
                                    </div>
                                </div>
                                <div className="p-2.5 rounded-full bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors shadow-sm">
                                    <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative z-10 mb-5">
                                <h2 className="text-lg font-bold text-white mb-2 tracking-tight flex items-center justify-between gap-3">
                                    <span className="truncate">{category.name}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shrink-0">
                                        {category.count ?? 0}
                                    </span>
                                </h2>
                                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {category.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-5 relative z-10 w-full shrink-0">
                                {(category.tags || []).slice(0, 3).map((tag) => (
                                    <span key={tag} className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-300 font-medium tracking-wide uppercase shadow-sm group-hover:bg-white/10 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )})}
                </div>

                <div className="mt-24 text-center text-slate-500 font-medium tracking-wider text-sm uppercase opacity-70">
                    Trusted by industry professionals worldwide
                </div>
            </div>
        </div>
    );
}
