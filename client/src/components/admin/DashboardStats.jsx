import { useState, useEffect } from 'react';
import api from '../../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardStats() {
    const [stats, setStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/activity')
                ]);
                setStats(statsRes.data.data);
                setRecentActivity(activityRes.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

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
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.totalUsers || 0}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-slate-400 font-medium text-xs">registered accounts</span>
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
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.proUsers || 0}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-slate-400 font-medium text-xs">premium accounts</span>
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
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.totalResumes || 0}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-slate-400 font-medium text-xs">generated documents</span>
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
                            <h3 className="text-3xl font-black text-slate-900 mt-2 mb-1">{stats.totalTemplates || 0}</h3>
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                                <span className="text-slate-400 font-medium text-xs">system templates</span>
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

            {/* Main Content Area (Charts / Breakdown) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Platform Activity Chart using Recharts with Real Data */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Platform Growth</h3>
                            <p className="text-sm font-medium text-slate-500">User and resume creation over the last 6 months</p>
                        </div>
                    </div>
                    {/* Recharts Realistic Chart */}
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={stats.chartData || []}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorResumes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                                <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="4 4" />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="users" name="New Users" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                <Area type="monotone" dataKey="resumes" name="Resumes" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResumes)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* User Accounts Overview */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-[48%] flex flex-col justify-center">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full border-[6px] border-indigo-50 relative shrink-0 flex items-center justify-center">
                                <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Pro Plan</div>
                                    <span className="text-slate-900 font-bold">{stats.proUsers || 0}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-slate-400" /> Free Plan</div>
                                    <span className="text-slate-900 font-bold">{Math.max(0, (stats.totalUsers || 0) - (stats.proUsers || 0))}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resumes Overview */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-[48%] flex flex-col justify-center">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full border-[6px] border-emerald-50 relative shrink-0 flex items-center justify-center">
                                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Completed</div>
                                    <span className="text-slate-900 font-bold">{stats.completedResumes || 0}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <div className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 rounded-full bg-amber-500" /> Drafts</div>
                                    <span className="text-slate-900 font-bold">{Math.max(0, (stats.totalResumes || 0) - (stats.completedResumes || 0))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table using true data */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Recent System Activity</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="px-6 py-4">Event Details</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {recentActivity && recentActivity.length > 0 ? recentActivity.map((activity, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                                            activity.type === 'user' 
                                            ? 'bg-indigo-50 text-indigo-500' 
                                            : 'bg-amber-50 text-amber-500'
                                        }`}>
                                            {activity.type === 'user' ? (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                            )}
                                        </div>
                                        <div className="truncate max-w-sm">{activity.event}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{activity.source}</td>
                                    <td className="px-6 py-4 text-right text-slate-500">
                                        {new Date(activity.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-slate-400 font-medium block">
                                        No recent activity found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
