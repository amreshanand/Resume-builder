import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function SystemSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/admin/settings');
            setSettings(data.data);
        } catch (err) {
            console.error('Failed to fetch settings', err);
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const id = toast.loading('Saving settings...');
        try {
            await api.put('/admin/settings', { config: settings });
            toast.success('Settings saved successfully', { id });
        } catch (err) {
            console.error('Failed to update settings', err);
            const msg = err.response?.data?.error || 'Failed to save settings';
            toast.error(msg, { id });
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[15px] font-semibold text-slate-500">Loading settings...</p>
            </div>
        );
    }

    if (!settings) return null;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-none mb-1">System Settings</h2>
                    <p className="text-sm font-medium text-slate-500">Configure your platform and manage global preferences</p>
                </div>
                <button 
                    onClick={handleSave} 
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 rounded-lg text-sm font-bold tracking-wide transition-all"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        General
                    </h3>
                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Site Name</label>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                placeholder="Enter site name..."
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-700">Contact Email</label>
                            <input
                                type="email"
                                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                value={settings.contactEmail}
                                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>
                </div>

                {/* Access Control */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        Access Control
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Maintenance Mode</h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Lock the platform from public access.</p>
                            </div>
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={settings.maintenanceMode}
                                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${settings.maintenanceMode ? 'bg-rose-500' : 'bg-slate-200'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${settings.maintenanceMode ? 'transform translate-x-5' : ''}`}></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Allow Registration</h4>
                                <p className="text-xs font-medium text-slate-500 mt-0.5">Allow new users to create accounts.</p>
                            </div>
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={settings.allowRegistration}
                                    onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${settings.allowRegistration ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${settings.allowRegistration ? 'transform translate-x-5' : ''}`}></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* AI Configuration */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-sky-50 flex items-center justify-center text-sky-500 border border-sky-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        AI Model Engine
                    </h3>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Primary AI Model</label>
                        <div className="relative">
                            <select
                                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                                value={settings.aiModel}
                                onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })}
                            >
                                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Accurate)</option>
                                <option value="gpt-4o">GPT-4o (OpenAI)</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-2 tracking-wide">Select the intelligence engine used for generating resumes.</p>
                    </div>
                </div>

                {/* Theme */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-violet-50 flex items-center justify-center text-violet-600 border border-violet-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8-9h1M3 12h1m14.364-6.364.707.707M5.636 18.364l.707-.707m12.021 0-.707-.707M6.343 6.343l-.707.707" />
                            </svg>
                        </div>
                        Theme
                    </h3>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Default Theme</label>
                        <div className="relative">
                            <select
                                className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                                value={settings.defaultTheme || 'dark'}
                                onChange={(e) => setSettings({ ...settings, defaultTheme: e.target.value })}
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="system">System</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-2">
                            Sets the website’s default theme. Users can still override it from the navbar.
                        </p>
                    </div>
                </div>

                {/* Pricing Box */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        Platform Pricing
                    </h3>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Pro Plan Price (Monthly)</label>
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                            <input
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-2.5 pl-8 rounded-lg text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                value={settings.proPlanPrice}
                                onChange={(e) => setSettings({ ...settings, proPlanPrice: e.target.value })}
                            />
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-2">The Free tier will persistently remain configured at $0.00.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
