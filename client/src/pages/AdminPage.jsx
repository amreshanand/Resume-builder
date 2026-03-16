import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../components/admin/layout/AdminSidebar';

// Sections
import DashboardStats from '../components/admin/DashboardStats';
import UserManager from '../components/admin/UserManager';
import ResumeManager from '../components/admin/ResumeManager';
import TemplateManager from '../components/admin/TemplateManager';
import SystemSettings from '../components/admin/SystemSettings';
import CategoryManager from '../components/admin/CategoryManager';

export default function AdminPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user?.isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-900 bg-slate-50">
                <div className="text-center space-y-4 bg-white p-12 rounded-2xl shadow-xl border border-slate-200">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto border border-red-100 mb-6">
                        <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0-8V7m0 0a2 2 0 100-4 2 2 0 000 4zm-8 8a8 8 0 1116 0 8 8 0 01-16 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold">Access Denied</h1>
                    <p className="text-slate-500 max-w-xs text-base">Admin authorization is required to access this page.</p>
                </div>
            </div>
        );
    }

    const tabTitles = {
        dashboard: 'Dashboard',
        users: 'User Management',
        resumes: 'Resume Management',
        templates: 'Template Library',
        categories: 'Category Management',
        settings: 'System Settings',
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: '#fff',
                        color: '#0f172a',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }
                }}
            />

            {/* Sidebar */}
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-20 shrink-0">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold text-slate-800">{tabTitles[activeTab]}</h1>
                        <p className="text-sm text-slate-500 hidden md:block">Welcome back, {user?.name?.split(' ')[0] || 'Admin'}. Here's what's happening today.</p>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Search Bar - Optional representation */}
                        <div className="hidden lg:flex items-center bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                            <svg className="w-4.5 h-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-slate-700 placeholder-slate-400" />
                            <div className="ml-2 flex items-center justify-center w-5 h-5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-semibold shadow-sm">
                                ⌘K
                            </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            
                            <div className="flex items-center gap-3 cursor-pointer group ml-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-slate-800 leading-none">{user?.name || 'Admin'}</p>
                                    <p className="text-xs text-slate-500 mt-1 leading-none font-medium">Administrator</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-bold text-white text-sm shadow-md transition-transform group-hover:scale-105">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="animate-in fade-in duration-500">
                            {activeTab === 'dashboard' && <DashboardStats />}
                            {activeTab === 'users' && <UserManager />}
                            {activeTab === 'resumes' && <ResumeManager />}
                            {activeTab === 'templates' && <TemplateManager />}
                            {activeTab === 'categories' && <CategoryManager />}
                            {activeTab === 'settings' && <SystemSettings />}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
