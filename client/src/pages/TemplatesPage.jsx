import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';

const TEMPLATES = [
    {
        id: 'fresher',
        type: 'fresher',
        name: 'Early Career & Internships',
        description: 'Designed for students and early professionals. Highlights academic achievements, internships, certifications, and foundational skills.',
        icon: '🎓',
        color: 'from-emerald-500/20 to-teal-600/20',
        textColor: 'text-emerald-400',
        borderColor: 'border-emerald-500/20',
        tags: ['Students', 'Freshers', 'Entry-Level'],
    },
    {
        id: 'developer',
        type: 'developer',
        name: 'Software & Technology',
        description: 'Optimized for technical roles. Emphasizes coding expertise, engineering projects, problem-solving, and measurable technical impact.',
        icon: '💻',
        color: 'from-blue-500/20 to-indigo-600/20',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/20',
        tags: ['Developers', 'Engineers', 'Data roles'],
    },
    {
        id: 'data',
        type: 'data',
        name: 'Data & Analytics',
        description: 'Structured for data-driven professionals. Showcases analytical skills, machine learning models, research insights, and business impact through data.',
        icon: '📊',
        color: 'from-cyan-500/20 to-sky-600/20',
        textColor: 'text-cyan-400',
        borderColor: 'border-cyan-500/20',
        tags: ['Data Analyst', 'Data Scientist', 'ML'],
    },
    {
        id: 'business',
        type: 'business',
        name: 'Business & Management',
        description: 'Tailored for business leaders and strategists. Highlights measurable achievements, team leadership, and organizational impact.',
        icon: '💼',
        color: 'from-purple-500/20 to-violet-600/20',
        textColor: 'text-purple-400',
        borderColor: 'border-purple-500/20',
        tags: ['MBA', 'Managers', 'Consultants'],
    },
    {
        id: 'finance',
        type: 'finance',
        name: 'Finance & Accounting',
        description: 'Built for finance professionals. Focuses on financial analysis, compliance, auditing, and measurable fiscal impact.',
        icon: '📈',
        color: 'from-amber-500/20 to-orange-600/20',
        textColor: 'text-amber-400',
        borderColor: 'border-amber-500/20',
        tags: ['CA', 'CFA', 'Financial roles'],
    },
    {
        id: 'creative',
        type: 'creative',
        name: 'Design & Creative',
        description: 'Crafted for creative professionals. Showcases portfolio projects, design thinking, and artistic achievements.',
        icon: '🎨',
        color: 'from-pink-500/20 to-rose-600/20',
        textColor: 'text-pink-400',
        borderColor: 'border-pink-500/20',
        tags: ['UI/UX', 'Graphic', 'Creative'],
    },
    {
        id: 'marketing',
        type: 'marketing',
        name: 'Marketing & Sales',
        description: 'Designed for marketing and sales professionals. Highlights campaign performance, growth metrics, and revenue-driven achievements.',
        icon: '🚀',
        color: 'from-red-500/20 to-rose-600/20',
        textColor: 'text-red-400',
        borderColor: 'border-red-500/20',
        tags: ['Digital Marketing', 'Growth', 'Sales'],
    },
    {
        id: 'operations',
        type: 'operations',
        name: 'Operations & Supply Chain',
        description: 'Focused on operational excellence. Emphasizes process optimization, efficiency improvements, and measurable results.',
        icon: '⚙️',
        color: 'from-slate-500/20 to-gray-600/20',
        textColor: 'text-slate-400',
        borderColor: 'border-slate-500/20',
        tags: ['Operations', 'Logistics', 'Admin'],
    },
    {
        id: 'healthcare',
        type: 'healthcare',
        name: 'Healthcare & Life Sciences',
        description: 'Structured for healthcare professionals. Highlights clinical expertise, certifications, patient care experience, and research.',
        icon: '⚕️',
        color: 'from-teal-500/20 to-emerald-600/20',
        textColor: 'text-teal-400',
        borderColor: 'border-teal-500/20',
        tags: ['Medical', 'Pharma', 'Clinical'],
    },
    {
        id: 'academia',
        type: 'academia',
        name: 'Research & Academia',
        description: 'Optimized for academic careers. Showcases research publications, conferences, grants, and scholarly achievements.',
        icon: '🔬',
        color: 'from-indigo-500/20 to-blue-600/20',
        textColor: 'text-indigo-400',
        borderColor: 'border-indigo-500/20',
        tags: ['Researchers', 'Professors', 'PhD'],
    },
];

export default function TemplatesPage() {
    const { dispatch } = useResume();
    const navigate = useNavigate();

    const handleSelect = (template) => {
        navigate(`/templates/${template.id}`);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden pb-40 relative pt-16">
            {/* Navbar Spacer */}
            <div className="h-8 md:h-14 w-full" />

            {/* 3D Tech Background */}
            <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none" />
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
                    {TEMPLATES.map((template, i) => (
                        <div
                            key={template.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelect(template)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSelect(template);
                                }
                            }}
                            className="group relative bg-[#0f172a]/40 hover:bg-[#1e293b]/60 backdrop-blur-xl border border-white/5 hover:border-white/15 rounded-2xl p-7 text-left transition-all duration-500 cursor-pointer fade-in flex flex-col shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 overflow-hidden rounded-2xl z-0 pointer-events-none">
                                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${template.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
                            </div>

                            <div className="flex items-start justify-between mb-5 relative z-10 shrink-0">
                                <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${template.color} p-[1px] group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <div className="w-full h-full bg-[#0f172a]/90 rounded-xl flex items-center justify-center text-2xl">
                                        {template.icon}
                                    </div>
                                </div>
                                <div className="p-2.5 rounded-full bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-indigo-500 transition-colors shadow-sm">
                                    <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative z-10 mb-5">
                                <h2 className="text-lg font-bold text-white mb-2 tracking-tight">{template.name}</h2>
                                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {template.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-5 relative z-10 w-full shrink-0">
                                {template.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-300 font-medium tracking-wide uppercase shadow-sm group-hover:bg-white/10 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center text-slate-500 font-medium tracking-wider text-sm uppercase opacity-70">
                    Trusted by industry professionals worldwide
                </div>
            </div>
        </div>
    );
}
