import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

const TEMPLATES = [
    {
        id: 'fresher',
        type: 'fresher',
        name: 'Fresh Graduate',
        description: 'Perfect for students and recent graduates. Highlights education, projects, and skills.',
        icon: '🎓',
        color: 'from-emerald-500/20 to-teal-600/20',
        textColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/20',
        tags: ['Student', 'Entry Level', 'Internship'],
    },
    {
        id: 'developer',
        type: 'developer',
        name: 'Software Developer',
        description: 'Optimized for tech roles. Emphasizes skills, projects, and engineering experience.',
        icon: '💻',
        color: 'from-blue-500/20 to-indigo-600/20',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/20',
        tags: ['Tech', 'Engineering', 'Full Stack'],
    },
    {
        id: 'corporate',
        type: 'corporate',
        name: 'Corporate Professional',
        description: 'For experienced professionals. Focuses on leadership, achievements, and impact.',
        icon: '👔',
        color: 'from-purple-500/20 to-violet-600/20',
        textColor: 'text-purple-400',
        borderColor: 'border-purple-500/20',
        tags: ['Management', 'Leadership', 'Business'],
    },
    {
        id: 'creative',
        type: 'creative',
        name: 'Creative Professional',
        description: 'For designers and creatives. Showcases portfolio, design skills, and artistic work.',
        icon: '🎨',
        color: 'from-pink-500/20 to-rose-600/20',
        textColor: 'text-pink-400',
        borderColor: 'border-pink-500/20',
        tags: ['Design', 'Art', 'Portfolio'],
    },
];

export default function TemplatesPage() {
    const { dispatch } = useResume();
    const navigate = useNavigate();

    const handleSelect = (template) => {
        dispatch({ type: 'RESET' });
        dispatch({ type: 'SET_TEMPLATE', payload: { type: template.type, id: template.id } });
        navigate('/builder');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden pb-40 relative">
            {/* Navbar Spacer - Failsafe way to clear fixed navigation */}
            <div className="h-32 md:h-48 w-full" />

            {/* Elegant Background - Single performant layer */}
            <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" />
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    transform: 'translateZ(0)'
                }}
            />

            <div className="container-custom max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-24 slide-up">
                    <div className="inline-flex items-center gap-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-8">
                        <span className="flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-300 uppercase">Framework Architect</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-[1.15] text-white">
                        Modern specialized <span className="gradient-text">Templates.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
                        Industry-certified frameworks engineered for maximum recruiter impact and ATS performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
                    {TEMPLATES.map((template, i) => (
                        <button
                            key={template.id}
                            onClick={() => handleSelect(template)}
                            className="group relative bg-[#0f172a]/40 hover:bg-[#1e293b]/40 border border-white/5 hover:border-indigo-500/30 rounded-[2.25rem] p-8 md:p-12 text-left transition-all duration-500 cursor-pointer fade-in flex flex-col h-full shadow-2xl backdrop-blur-sm active:scale-[0.98]"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 mb-8">
                                <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${template.color} border ${template.borderColor} flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500 shadow-xl`}>
                                    {template.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{template.name}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {template.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium tracking-wide transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-[1.0625rem] text-slate-400 flex-1 font-normal leading-relaxed mb-10 group-hover:text-slate-300 transition-colors">
                                {template.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-[11px] font-bold tracking-[0.2em] text-indigo-400 uppercase group-hover:text-indigo-300 transition-colors">
                                    Start Building
                                </span>
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all duration-500">
                                    →
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-32 text-center text-slate-600 font-medium tracking-[0.3em] text-[11px] uppercase opacity-50">
                    Trusted by industry professionals worldwide
                </div>
            </div>
        </div>
    );
}
