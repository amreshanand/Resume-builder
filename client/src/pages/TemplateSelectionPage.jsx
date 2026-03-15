import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { CATEGORY_TEMPLATES } from '../data/categoryTemplates.jsx';

export default function TemplateSelectionPage() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useResume();

    // Get category data from centralized template data
    const categoryData = CATEGORY_TEMPLATES[categoryId];
    const templates = categoryData?.templates || [];
    const displayCategory = categoryData?.name || 'Professional';

    const handleSelectTemplate = (template) => {
        dispatch({ type: 'RESET' });
        dispatch({
            type: 'SET_TEMPLATE',
            payload: {
                type: categoryId,
                id: template.id,
                sections: template.sections,
                color: template.color
            }
        });

        // Navigate to Phase 2: AI Interview with template info
        navigate(`/ai-generator/${categoryId}/${template.id}`);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
            {/* Premium Gradient Background */}
            <div className="fixed inset-0 z-0">
                {/* Main gradient mesh */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-[#0a0a0f] to-indigo-950/30" />
                
                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px]" />
                
                {/* Grid pattern overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                
                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")' }} />
            </div>

            <div className="relative z-10 pt-24 pb-20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                    
                    {/* Navigation Header */}
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

                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${templates[0]?.color || 'from-violet-500 to-indigo-600'} flex items-center justify-center shadow-lg shadow-violet-500/25`}>
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="h-px w-12 bg-gradient-to-r from-violet-500/50 to-transparent" />
                            <span className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 uppercase">
                                {displayCategory}
                            </span>
                        </div>
                        
                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                            <span className="text-white">Choose Your </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
                                Perfect Design
                            </span>
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Premium templates crafted for success. Select your style and let our 
                            <span className="text-violet-400 font-medium"> AI assistant </span> 
                            build your resume.
                        </p>
                    </div>

                    {/* Templates Grid - Premium Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                        {templates.map((template, i) => (
                            <div 
                                key={template.id}
                                className="group"
                                style={{ 
                                    animation: 'fadeInUp 0.6s ease-out forwards',
                                    animationDelay: `${i * 100}ms`,
                                    opacity: 0
                                }}
                            >
                                {/* Card Container */}
                                <div 
                                    onClick={() => handleSelectTemplate(template)}
                                    className="relative cursor-pointer"
                                >
                                    {/* Glow Effect on Hover */}
                                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${template.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                                    
                                    {/* Main Card */}
                                    <div className="relative bg-[#12121a] rounded-3xl p-5 border border-white/[0.08] hover:border-white/20 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-violet-500/10">
                                        
                                        {/* Template Number Badge */}
                                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>

                                        {/* Preview Container */}
                                        <div className="relative aspect-[210/297] rounded-2xl overflow-hidden mb-5 bg-white shadow-xl ring-1 ring-black/5">
                                            {/* Glossy overlay effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                                            
                                            {/* Template Preview */}
                                            <div className="absolute inset-0 transform group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                                                <template.PreviewComponent />
                                            </div>
                                            
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-8 z-20">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectTemplate(template);
                                                    }}
                                                    className={`px-6 py-3 rounded-xl bg-gradient-to-r ${template.color} text-white font-semibold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:shadow-xl hover:scale-105`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        Use This Template
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Template Info */}
                                        <div className="space-y-3">
                                            {/* Title Row */}
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-indigo-400 transition-all duration-300 leading-tight">
                                                    {template.name}
                                                </h3>
                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${template.color} ring-2 ring-white/10 flex-shrink-0 mt-1`} />
                                            </div>
                                            
                                            {/* Description */}
                                            <p className="text-sm text-slate-500 group-hover:text-slate-400 line-clamp-2 leading-relaxed transition-colors duration-300">
                                                {template.description}
                                            </p>
                                            
                                            {/* Features Tags */}
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                <span className="px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase rounded-lg bg-white/5 text-slate-500 border border-white/5">
                                                    ATS Ready
                                                </span>
                                                <span className="px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase rounded-lg bg-white/5 text-slate-500 border border-white/5">
                                                    PDF Export
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-24 text-center">
                        {/* Stats */}
                        <div className="flex items-center justify-center gap-12 mb-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">50+</div>
                                <div className="text-sm text-slate-500 mt-1">Templates</div>
                            </div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">100%</div>
                                <div className="text-sm text-slate-500 mt-1">Free</div>
                            </div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="text-center">
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">AI</div>
                                <div className="text-sm text-slate-500 mt-1">Powered</div>
                            </div>
                        </div>
                        
                        {/* CTA */}
                        <p className="text-slate-500">
                            Not finding the right fit?{' '}
                            <button 
                                onClick={() => navigate('/templates')}
                                className="text-violet-400 hover:text-violet-300 font-medium transition-colors underline underline-offset-4 decoration-violet-400/30 hover:decoration-violet-300"
                            >
                                Explore other categories
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS Animation */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
