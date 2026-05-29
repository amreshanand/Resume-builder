import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import api from '../services/api';
import Navbar from '../components/layout/Navbar';

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
            payload: {
                id: template.id || template._id,
                type: template.category,
                sections: template.sections || [],
                color: template.color || null
            }
        });
        navigate('/builder');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            </div>
        );
    }

    const categoryDisplayName = categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1);

    return (
        <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] overflow-hidden transition-colors duration-300">
            <Navbar />
            
            {/* Premium Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-[var(--surface)] to-amber-950/20" />
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="relative z-10 pt-28 pb-20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => navigate('/templates')}
                            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-350 dark:hover:border-white/20 transition-all duration-300 cursor-pointer shadow-sm"
                        >
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">Back to Categories</span>
                        </button>

                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-orange-600 dark:text-orange-300 uppercase">{templates.length} Templates</span>
                        </div>
                    </div>

                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md`}>
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="h-px w-12 bg-gradient-to-r from-orange-500/50 to-transparent" />
                            <span className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 uppercase">
                                {categoryDisplayName}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white">
                            Choose Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                                Perfect Design
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
                            Premium templates crafted for success. Select your style and let our
                            <span className="text-orange-500 dark:text-orange-400 font-bold"> AI assistant </span>
                            build your resume.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {templates.map((template, i) => (
                            <div
                                key={template.id || template._id}
                                className="group relative bg-white dark:bg-[#0f172a]/40 hover:bg-slate-50 dark:hover:bg-[#1e293b]/60 border border-slate-200 dark:border-white/5 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col shadow-sm dark:shadow-2xl"
                                style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: `${i * 100}ms` }}
                            >
                                <div className="aspect-[3/4] overflow-hidden relative group-hover:scale-[1.01] transition-transform duration-700 bg-slate-100 dark:bg-slate-800">
                                    {template.previewImage ? (
                                        <img
                                            src={template.previewImage}
                                            alt={template.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-650 font-bold text-sm">
                                            No Preview Available
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-950/60 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                                        <button
                                            onClick={() => handleSelect(template)}
                                            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
                                        >
                                            Use Template
                                        </button>
                                    </div>
                                    {template.isPremium && (
                                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md">
                                            Pro Tier
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-amber-500 transition-colors truncate">{template.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{template.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {(template.tags || []).slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {templates.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/10">
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">No Templates Found</h3>
                                <p className="text-slate-500">Stay tuned for new layouts in this category.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-slate-500">
                            Not finding the right fit?{' '}
                            <button
                                onClick={() => navigate('/templates')}
                                className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-bold transition-colors underline underline-offset-4 bg-transparent border-none cursor-pointer"
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
