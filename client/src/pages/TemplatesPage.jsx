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
            {/* Navbar Spacer */}
            <div className="h-32 md:h-48 w-full" />

            {/* 3D Tech Background */}
            <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" />
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="tech-grid h-full w-full opacity-40" />
                <div className="tech-grid-3d opacity-[0.1]" />
            </div>

            <div className="container-custom max-w-6xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-24 slide-up">
                    <div className="inline-flex items-center gap-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-md">
                        <span className="flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="monospace text-[10px] font-bold tracking-[0.2em] text-indigo-300 uppercase">Framework Selector 2.0</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 tracking-tight leading-[1.15] text-white uppercase italic">
                        Select <span className="gradient-text pb-2">Interface.</span>
                    </h1>
                    <p className="monospace text-xs md:text-sm text-slate-500 max-w-2xl mx-auto tracking-widest uppercase opacity-70">
                        [ SYSTEM_MSG: Deploy high-fidelity ATS-vetted career frameworks ]
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
                    {TEMPLATES.map((template, i) => (
                        <button
                            key={template.id}
                            onClick={() => handleSelect(template)}
                            className="group relative bg-[#0f172a]/60 hover:bg-[#1e293b]/60 border border-white/5 hover:border-indigo-500/30 rounded-[2.5rem] p-10 pb-12 md:p-14 md:pb-16 text-left transition-all duration-500 cursor-pointer fade-in flex flex-col h-full shadow-2xl tech-card active:scale-[0.98]"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 mb-10">
                                <div className={`w-20 h-20 rounded-[1.8rem] bg-gradient-to-br ${template.color} border ${template.borderColor} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500 shadow-2xl relative z-10`}>
                                    {template.icon}
                                </div>
                                <div className="flex-1 relative z-10">
                                    <h2 className="text-2xl font-black text-white mb-3 tracking-tighter italic uppercase">{template.name}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {template.tags.map((tag) => (
                                            <span key={tag} className="monospace text-[9px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500 font-bold tracking-widest uppercase group-hover:text-slate-300 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-lg text-slate-400 flex-1 font-light leading-relaxed mb-12 group-hover:text-slate-300 transition-colors relative z-10">
                                {template.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5 relative z-10">
                                <span className="monospace text-[10px] font-bold tracking-[0.3em] text-indigo-400 uppercase group-hover:text-indigo-300 transition-all flex items-center gap-4">
                                    Initialize Build
                                    <div className="w-8 h-[1px] bg-indigo-500/30 group-hover:w-16 transition-all" />
                                </span>
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all duration-500 shadow-xl">
                                    →
                                </div>
                            </div>

                            {/* Decorative Tech Elements */}
                            <div className="absolute top-4 right-8 monospace text-[8px] text-white/10 font-bold group-hover:text-indigo-500/20 transition-colors">
                                0{i + 1} // ARCH_TYPE_{template.id.toUpperCase()}
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
