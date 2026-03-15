import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function DashboardStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/admin/stats');
            setStats(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[15px] font-semibold text-slate-500">Loading metrics...</p>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Users</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.totalUsers}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                    <svg className="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    +12.5%
                                </span>
                                <span className="text-slate-400 font-medium text-xs">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Pro Users */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Pro Users</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.proUsers}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                    <svg className="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    +4.2%
                                </span>
                                <span className="text-slate-400 font-medium text-xs">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Resumes Created */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Resumes</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.totalResumes}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                    <svg className="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                    +24.7%
                                </span>
                                <span className="text-slate-400 font-medium text-xs">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Active Templates */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Active Templates</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">24</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-rose-500 flex items-center bg-rose-50 px-1.5 py-0.5 rounded-md">
                                    <svg className="w-3.5 h-3.5 mr-0.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                    -1.2%
                                </span>
                                <span className="text-slate-400 font-medium text-xs">vs last month</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area (Charts / Health) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Platform Activity Chart (Mock) */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Overview</h3>
                            <p className="text-sm font-medium text-slate-500">Monthly performance for the current year</p>
                        </div>
                        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
                            <button className="px-3 py-1.5 text-xs font-bold bg-white text-slate-900 rounded shadow-sm border border-slate-200">Revenue</button>
                            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800">Users</button>
                            <button className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-800">Growth</button>
                        </div>
                    </div>
                    {/* Fake Chart Graphic */}
                    <div className="h-64 relative w-full flex items-end justify-between px-2">
                        <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-slate-200 pb-2 pl-2">
                            {[60, 45, 30, 15, 0].map(val => (
                                <div key={val} className="w-full h-[1px] bg-slate-100 flex items-center">
                                    <span className="text-[10px] sm:-ml-8 text-slate-400 font-medium">${val}k</span>
                                </div>
                            ))}
                        </div>
                        {/* Wavy line mock using an svg path for realism based on the screenshot */}
                        <svg className="absolute bottom-6 left-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,80 Q10,75 20,85 T40,65 T60,50 T80,45 T100,20 L100,100 L0,100 Z" fill="url(#gradient)" />
                            <path d="M0,80 Q10,75 20,85 T40,65 T60,50 T80,45 T100,20" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                            <span key={month} className="text-[10px] text-slate-400 font-bold z-10 w-8 text-center mt-auto pb-[-10px] absolute" style={{left: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month) * 8.5 + 4}%`, bottom: '-20px'}}>
                                {month}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Traffic Sources */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900">Traffic Sources</h3>
                        <p className="text-sm font-medium text-slate-500 mb-6">Where your visitors come from</p>
                        
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full border-[6px] border-slate-100 relative shrink-0">
                                {/* SVG circle for the chart */}
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle className="text-emerald-500" strokeWidth="6" stroke="currentColor" fill="transparent" r="42" cx="48" cy="48" strokeDasharray="264" strokeDashoffset="80"/>
                                    <circle className="text-sky-500" strokeWidth="6" stroke="currentColor" fill="transparent" r="42" cx="48" cy="48" strokeDasharray="264" strokeDashoffset="180"/>
                                    <circle className="text-amber-500" strokeWidth="6" stroke="currentColor" fill="transparent" r="42" cx="48" cy="48" strokeDasharray="264" strokeDashoffset="240"/>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl font-black text-slate-900">284K</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Visits</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Direct</div>
                                    <span className="text-slate-900 font-bold">35%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-sky-500" /> Organic</div>
                                    <span className="text-slate-900 font-bold">28%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Referral</div>
                                    <span className="text-slate-900 font-bold">22%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-amber-500" /> Social</div>
                                    <span className="text-slate-900 font-bold">15%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Component Health & Goals */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900">System Health</h3>
                        <p className="text-sm font-medium text-slate-500 mb-6">Track progress and metrics</p>
                        
                        <div className="space-y-5">
                            <div>
                                <div className="flex justify-between items-center mb-1 text-sm font-bold">
                                    <span className="text-slate-700">Database Load</span>
                                    <span className="text-emerald-500">24%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 border border-slate-200/50">
                                    <div className="bg-emerald-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{ width: '24%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-1 text-sm font-bold">
                                    <span className="text-slate-700">API Latency</span>
                                    <span className="text-indigo-500">42ms</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 border border-slate-200/50">
                                    <div className="bg-indigo-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{ width: '15%' }}></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-1 text-sm font-bold">
                                    <span className="text-slate-700">Storage Usage</span>
                                    <span className="text-sky-500">76%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-1.5 border border-slate-200/50">
                                    <div className="bg-sky-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.4)]" style={{ width: '76%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Event Details</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-500">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                                    </div>
                                    New user registered: Jane Doe
                                </td>
                                <td className="px-6 py-4 text-slate-500">Direct</td>
                                <td className="px-6 py-4">12 mins ago</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-600 rounded">Verified</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-amber-50 flex items-center justify-center text-amber-500">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    </div>
                                    Resume built: Senior Engineer
                                </td>
                                <td className="px-6 py-4 text-slate-500">Web App</td>
                                <td className="px-6 py-4">15 mins ago</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-indigo-50 text-indigo-600 rounded">Completed</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-sky-500">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    </div>
                                    Template viewed: Creative Agency
                                </td>
                                <td className="px-6 py-4 text-slate-500">Guest User</td>
                                <td className="px-6 py-4">1 hour ago</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-500 rounded">Logged</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
