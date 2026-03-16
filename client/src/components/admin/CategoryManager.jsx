import { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const DEFAULT_CATEGORY = {
    id: '',
    name: '',
    description: '',
    icon: '📄',
    color: 'from-slate-500 to-indigo-600',
    visible: true,
    order: 0,
};

function normalizeId(val) {
    return (val || '')
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

export default function CategoryManager() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await api.get('/admin/settings');
                setSettings(data.data);
            } catch (err) {
                console.error('Failed to load settings', err);
                toast.error('Failed to load category settings');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const categories = useMemo(() => {
        const list = Array.isArray(settings?.templateCategories) ? settings.templateCategories : [];
        return [...list].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
    }, [settings]);

    const saveSettings = async (nextSettings) => {
        setSaving(true);
        const tid = toast.loading('Saving categories...');
        try {
            await api.put('/admin/settings', { config: nextSettings });
            setSettings(nextSettings);
            toast.success('Categories saved', { id: tid });
        } catch (err) {
            console.error('Failed to save settings', err);
            const msg = err.response?.data?.error || 'Failed to save categories';
            toast.error(msg, { id: tid });
        } finally {
            setSaving(false);
        }
    };

    const upsertCategory = (cat) => {
        const id = normalizeId(cat.id || cat.name);
        if (!id) {
            toast.error('Category ID/Name is required');
            return;
        }

        const existing = Array.isArray(settings?.templateCategories) ? settings.templateCategories : [];
        const nowOrder = Number.isFinite(cat.order) ? cat.order : existing.length;
        const next = {
            ...DEFAULT_CATEGORY,
            ...cat,
            id,
            order: nowOrder,
        };

        const replaced = existing.some((c) => c.id === id)
            ? existing.map((c) => (c.id === id ? next : c))
            : [...existing, next];

        saveSettings({ ...settings, templateCategories: replaced });
        setEditing(null);
    };

    const deleteCategory = (id) => {
        if (!window.confirm('Delete this category?')) return;
        const existing = Array.isArray(settings?.templateCategories) ? settings.templateCategories : [];
        saveSettings({ ...settings, templateCategories: existing.filter((c) => c.id !== id) });
    };

    const move = (id, dir) => {
        const existing = Array.isArray(settings?.templateCategories) ? settings.templateCategories : [];
        const sorted = [...existing].sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
        const idx = sorted.findIndex((c) => c.id === id);
        if (idx === -1) return;
        const swapWith = dir === 'up' ? idx - 1 : idx + 1;
        if (swapWith < 0 || swapWith >= sorted.length) return;
        const a = sorted[idx];
        const b = sorted[swapWith];
        const aOrder = a.order ?? idx;
        const bOrder = b.order ?? swapWith;
        sorted[idx] = { ...a, order: bOrder };
        sorted[swapWith] = { ...b, order: aOrder };
        saveSettings({ ...settings, templateCategories: sorted });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[15px] font-semibold text-slate-500">Loading categories...</p>
            </div>
        );
    }

    if (!settings) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-none mb-1">Template Categories</h2>
                    <p className="text-sm font-medium text-slate-500">Manage category names, icons, visibility, and ordering.</p>
                </div>
                <button
                    onClick={() => setEditing({ ...DEFAULT_CATEGORY, order: categories.length })}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all active:scale-95"
                    disabled={saving}
                >
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-4 rounded-tl-xl">Category</th>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Visible</th>
                                <th className="px-6 py-4">Order</th>
                                <th className="px-6 py-4 text-right rounded-tr-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3 min-w-[260px]">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} p-[1px]`}>
                                                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-lg">
                                                    {c.icon || '📄'}
                                                </div>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-black text-slate-900 truncate">{c.name || c.id}</div>
                                                <div className="text-xs font-semibold text-slate-500 truncate">{c.description || '—'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm font-mono text-slate-600">{c.id}</td>
                                    <td className="px-6 py-3.5">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={c.visible !== false}
                                                onChange={(e) => {
                                                    const existing = Array.isArray(settings?.templateCategories) ? settings.templateCategories : [];
                                                    const next = existing.map((x) => (x.id === c.id ? { ...x, visible: e.target.checked } : x));
                                                    saveSettings({ ...settings, templateCategories: next });
                                                }}
                                                disabled={saving}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition-colors ${c.visible !== false ? 'bg-emerald-500' : 'bg-slate-200'} ${saving ? 'opacity-60' : ''}`}></div>
                                            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${c.visible !== false ? 'transform translate-x-5' : ''}`}></div>
                                        </label>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => move(c.id, 'up')}
                                                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                                                disabled={saving}
                                                title="Move up"
                                            >
                                                ↑
                                            </button>
                                            <button
                                                onClick={() => move(c.id, 'down')}
                                                className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                                                disabled={saving}
                                                title="Move down"
                                            >
                                                ↓
                                            </button>
                                            <span className="text-sm font-bold text-slate-600">{c.order ?? 0}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <button
                                                onClick={() => setEditing({ ...DEFAULT_CATEGORY, ...c })}
                                                className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider"
                                                disabled={saving}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(c.id)}
                                                className="px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider"
                                                disabled={saving}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categories.length === 0 && (
                    <div className="py-16 text-center">
                        <h3 className="text-base font-bold text-slate-900 mb-1">No categories configured</h3>
                        <p className="text-sm font-medium text-slate-500">Click “Add Category” to create your first one.</p>
                    </div>
                )}
            </div>

            {editing && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setEditing(null)} />
                    <div className="relative bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900">{editing.id ? 'Edit Category' : 'Add Category'}</h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">ID is used in URLs (example: `/templates/fresher`).</p>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Name</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    value={editing.name}
                                    onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="Fresher & Entry-Level"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">ID (slug)</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    value={editing.id}
                                    onChange={(e) => setEditing((p) => ({ ...p, id: e.target.value }))}
                                    placeholder="fresher"
                                />
                                <p className="text-xs text-slate-500 font-medium">Will be normalized to `{normalizeId(editing.id || editing.name)}`</p>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 min-h-[96px]"
                                    value={editing.description}
                                    onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))}
                                    placeholder="Perfect for students and recent graduates"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Icon (emoji)</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    value={editing.icon}
                                    onChange={(e) => setEditing((p) => ({ ...p, icon: e.target.value }))}
                                    placeholder="🎓"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Gradient (Tailwind)</label>
                                <input
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    value={editing.color}
                                    onChange={(e) => setEditing((p) => ({ ...p, color: e.target.value }))}
                                    placeholder="from-emerald-500 to-teal-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Visible</label>
                                <label className="flex items-center gap-3 font-bold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={editing.visible !== false}
                                        onChange={(e) => setEditing((p) => ({ ...p, visible: e.target.checked }))}
                                    />
                                    Show on website
                                </label>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Order</label>
                                <input
                                    type="number"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                    value={editing.order ?? 0}
                                    onChange={(e) => setEditing((p) => ({ ...p, order: Number(e.target.value) }))}
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setEditing(null)}
                                className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-black uppercase tracking-wider text-xs"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => upsertCategory(editing)}
                                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-wider text-xs disabled:opacity-60"
                                disabled={saving}
                            >
                                Save Category
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

