import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function UserManager() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [savingUserId, setSavingUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setLoading(false);
        }
    };

    const saveUser = async (userId, patch) => {
        setSavingUserId(userId);
        try {
            // Backend expects PUT /admin/users/:id with { plan, isAdmin, aiCredits }
            const { data } = await api.put(`/admin/users/${userId}`, patch);
            const updated = data?.data;
            if (updated?._id) {
                setUsers(prev => prev.map(u => (u._id === userId ? { ...u, ...updated } : u)));
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        } finally {
            setSavingUserId(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[15px] font-semibold text-slate-500">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-none mb-1">Users</h2>
                    <p className="text-sm font-medium text-slate-500">Manage user accounts and roles across the platform</p>
                </div>

                <div className="relative">
                    <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <th className="px-6 py-4 rounded-tl-xl">User Profile</th>
                            <th className="px-6 py-4">Admin</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">AI Credits</th>
                            <th className="px-6 py-4">Join Date</th>
                            <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-[14px] leading-tight mb-0.5">{user.name}</div>
                                            <div className="text-sm font-medium text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={!!user.isAdmin}
                                            onChange={(e) => {
                                                const isAdmin = e.target.checked;
                                                setUsers(prev => prev.map(u => (u._id === user._id ? { ...u, isAdmin } : u)));
                                                saveUser(user._id, { isAdmin });
                                            }}
                                            disabled={savingUserId === user._id}
                                        />
                                        <div className={`w-11 h-6 rounded-full transition-colors ${user.isAdmin ? 'bg-indigo-600' : 'bg-slate-200'} ${savingUserId === user._id ? 'opacity-60' : ''}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${user.isAdmin ? 'transform translate-x-5' : ''}`}></div>
                                    </label>
                                </td>
                                <td className="px-6 py-3.5">
                                    <select
                                        value={user.plan || 'free'}
                                        onChange={(e) => {
                                            const plan = e.target.value;
                                            setUsers(prev => prev.map(u => (u._id === user._id ? { ...u, plan } : u)));
                                            saveUser(user._id, { plan });
                                        }}
                                        disabled={savingUserId === user._id}
                                        className="text-sm font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                                    >
                                        <option value="free">Free</option>
                                        <option value="pro">Pro</option>
                                    </select>
                                </td>
                                <td className="px-6 py-3.5">
                                    <input
                                        type="number"
                                        min={0}
                                        value={user.aiCredits ?? 0}
                                        onChange={(e) => {
                                            const aiCredits = Number(e.target.value);
                                            setUsers(prev => prev.map(u => (u._id === user._id ? { ...u, aiCredits } : u)));
                                        }}
                                        onBlur={(e) => {
                                            const aiCredits = Number(e.target.value);
                                            if (Number.isFinite(aiCredits)) saveUser(user._id, { aiCredits });
                                        }}
                                        disabled={savingUserId === user._id}
                                        className="w-24 text-sm font-bold bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-60"
                                    />
                                </td>
                                <td className="px-6 py-3.5 text-sm font-semibold text-slate-600">
                                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                    <button
                                        onClick={() => saveUser(user._id, { plan: user.plan, isAdmin: user.isAdmin, aiCredits: user.aiCredits })}
                                        disabled={savingUserId === user._id}
                                        className="text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50 hover:bg-indigo-50 px-3 py-2 rounded-lg border border-slate-200 text-xs font-black uppercase tracking-wider disabled:opacity-60"
                                    >
                                        {savingUserId === user._id ? 'Saving…' : 'Save'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">No users found</h3>
                    <p className="text-sm font-medium text-slate-500">Try adjusting your search query.</p>
                </div>
            )}
        </div>
    );
}
