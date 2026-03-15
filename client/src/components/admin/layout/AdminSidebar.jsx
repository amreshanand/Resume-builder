import { useNavigate } from 'react-router-dom';

const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'resumes', label: 'Resumes', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'templates', label: 'Templates', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export default function AdminSidebar({ activeTab, setActiveTab }) {
    const navigate = useNavigate();

    return (
        <aside className="w-[280px] shrink-0 h-screen bg-white border-r border-slate-200 flex flex-col z-[100] shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Branding */}
            <div className="h-20 flex items-center px-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-base shadow-md">
                        R
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-none">ResumeAI</h2>
                        <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-5 space-y-8 overflow-y-auto">
                <div>
                    <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Overview</p>
                    <div className="space-y-1">
                        {MENU_ITEMS.slice(0, 1).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 text-[15px] font-semibold ${activeTab === item.id
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                <svg className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Manage</p>
                    <div className="space-y-1">
                        {MENU_ITEMS.slice(1).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200 text-[15px] font-semibold ${activeTab === item.id
                                    ? 'bg-indigo-50 text-indigo-600'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                <svg className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className="flex-1 text-left">{item.label}</span>
                                {item.id === 'resumes' && (
                                    <span className="bg-indigo-100 text-indigo-600 py-0.5 px-2.5 rounded-full text-[10px] font-bold">New</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 hover:text-slate-900 shadow-sm hover:shadow rounded-xl transition-all text-[15px] font-semibold border border-slate-200 active:scale-95 group"
                >
                    <svg className="w-4.5 h-4.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Website
                </button>
            </div>
        </aside>
    );
}
