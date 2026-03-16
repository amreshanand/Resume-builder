import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import api from '../services/api';

export default function TemplateSelectionPage() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useResume();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTemplates();
    }, [categoryId]);

    const fetchTemplates = async () => {
        try {
            // Public route — works for all users, and already filters to active templates by default
            const { data } = await api.get('/templates', {
                params: { category: categoryId }
            });
            setTemplates(data?.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch templates:', error);
            setLoading(false);
        }
    };

    const handleSelect = (template) => {
        dispatch({
            type: 'SET_TEMPLATE',
            payload: template.id || template._id
        });
        navigate('/builder');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
        );
    }

    const categoryDisplayName = categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1);

    return (
        <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] overflow-hidden">
            {/* Premium Gradient Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-[var(--surface)] to-indigo-950/30" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative z-10 pt-24 pb-20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-16">
                        <button
                            onClick={() => navigate('/templates')}
                            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Back to Categories</span>
                        </button>

                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 animate-pulse" />
                            <span className="text-xs font-semibold tracking-widest text-violet-300 uppercase">{templates.length} Templates</span>
                        </div>
                    </div>

                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25`}>
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="h-px w-12 bg-gradient-to-r from-violet-500/50 to-transparent" />
                            <span className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 uppercase">
                                {categoryDisplayName}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                            <span className="text-white">Choose Your </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
                                Perfect Design
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Premium templates crafted for success. Select your style and let our
                            <span className="text-violet-400 font-medium"> AI assistant </span>
                            build your resume.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {templates.map((template, i) => (
                            <div
                                key={template.id || template._id}
                                className="group relative bg-[#0f172a]/40 hover:bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 hover:border-indigo-500/30 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col shadow-2xl"
                                style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: `${i * 100}ms` }}
                            >
                                <div className="aspect-[3/4] overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700">
                                    {template.previewImage ? (
                                        <img
                                            src={template.previewImage}
                                            alt={template.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">
                                            No Preview
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                                        <button
                                            onClick={() => handleSelect(template)}
                                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all transform hover:scale-110 active:scale-95 shadow-2xl flex items-center gap-2"
                                        >
                                            Use Template
                                        </button>
                                    </div>
                                    {template.isPremium && (
                                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-amber-500/90 text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl backdrop-blur-md">
                                            Pro Tier
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors truncate">{template.name}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{template.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {(template.tags || []).slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 text-[9px] font-black uppercase tracking-tighter rounded bg-white/5 text-slate-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {templates.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                                <h3 className="text-2xl font-black text-white mb-2">No Templates Found</h3>
                                <p className="text-slate-500">Stay tuned for new layouts in this category.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-24 text-center">
                        <p className="text-slate-500">
                            Not finding the right fit?{' '}
                            <button
                                onClick={() => navigate('/templates')}
                                className="text-violet-400 hover:text-violet-300 font-medium transition-colors underline underline-offset-4"
                            >
                                Explore other categories
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
