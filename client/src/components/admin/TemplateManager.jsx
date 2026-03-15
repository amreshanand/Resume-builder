import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function TemplateManager() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);

    const initialFormState = {
        name: '',
        category: '',
        thumbnail: '',
        isPremium: false,
        isActive: true,
        tags: '',
        description: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const { data } = await api.get('/admin/templates');
            setTemplates(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch templates:', error);
            toast.error('Failed to load templates');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tid = toast.loading(editingTemplate ? 'Updating template...' : 'Creating template...');

        try {
            const payload = {
                ...formData,
                tags: typeof formData.tags === 'string'
                    ? formData.tags.split(',').map(tag => tag.trim()).filter(t => t)
                    : formData.tags
            };

            if (editingTemplate) {
                await api.put(`/admin/templates/${editingTemplate._id}`, payload);
                toast.success('Template updated successfully', { id: tid });
            } else {
                await api.post('/admin/templates', payload);
                toast.success('Template created successfully', { id: tid });
            }

            fetchTemplates();
            setIsAdding(false);
            setEditingTemplate(null);
            setFormData(initialFormState);
        } catch (error) {
            console.error('Template operation failed:', error);
            toast.error('Operation failed. Please try again.', { id: tid });
        }
    };

    const handleEdit = (template) => {
        setEditingTemplate(template);
        setFormData({
            ...template,
            tags: template.tags?.join(', ') || ''
        });
        setIsAdding(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;

        const tid = toast.loading('Deleting template...');
        try {
            await api.delete(`/admin/templates/${id}`);
            toast.success('Template deleted', { id: tid });
            fetchTemplates();
        } catch (error) {
            console.error('Failed to delete template:', error);
            toast.error('Failed to delete template', { id: tid });
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[15px] font-semibold text-slate-500">Loading templates...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-none mb-1">Templates</h2>
                    <p className="text-sm font-medium text-slate-500">Manage resume layout templates and styles</p>
                </div>
                <button
                    onClick={() => {
                        setEditingTemplate(null);
                        setFormData(initialFormState);
                        setIsAdding(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 border border-transparent rounded-lg text-sm text-white font-bold tracking-wide shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.23)] hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    New Template
                </button>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(template => (
                    <div key={template._id} className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all hover:shadow-lg overflow-hidden flex flex-col relative shadow-sm">
                        {/* Status badging */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            {template.isPremium && (
                                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm border border-amber-200">Pro</span>
                            )}
                            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm border ${template.isActive ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                {template.isActive ? 'Active' : 'Draft'}
                            </span>
                        </div>

                        {/* Thumbnail */}
                        <div className="h-44 bg-slate-100 p-4 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
                            {template.thumbnail ? (
                                <img src={template.thumbnail} alt={template.name} className="h-full w-auto object-contain rounded drop-shadow-md group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="text-slate-400 flex flex-col items-center gap-2">
                                    <svg className="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs font-bold uppercase tracking-wider">No Preview</span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{template.name}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{template.category || 'Uncategorized'}</p>

                            <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-4 flex-1">
                                {template.description || 'No description provided.'}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {template.tags?.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200">
                                        {tag}
                                    </span>
                                ))}
                                {template.tags?.length > 3 && (
                                    <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200">
                                        +{template.tags.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <button
                                    onClick={() => handleEdit(template)}
                                    className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-lg text-xs font-bold transition-colors"
                                >
                                    Edit Details
                                </button>
                                <button
                                    onClick={() => handleDelete(template._id)}
                                    className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {!loading && templates.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center border-dashed">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Build your template library</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">Create and manage structural templates that will power AI resume generation for your users.</p>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-sm font-bold shadow-lg shadow-indigo-500/30 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                        Create First Template
                    </button>
                </div>
            )}

            {/* Add/Edit Modal */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAdding(false)} />

                    <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editingTemplate ? 'Update Template' : 'Create Template'}
                                </h2>
                                <p className="text-sm font-medium text-slate-500 mt-1">Configure layout properties and metadata.</p>
                            </div>
                            <button
                                onClick={() => setIsAdding(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Template Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                                        placeholder="e.g. Minimalist Tech"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 block">Category</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                                        placeholder="e.g. Engineering"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block text-slate-700">Thumbnail URL</label>
                                <input
                                    type="url"
                                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                    Tags
                                    <span className="text-xs font-medium text-slate-400">(comma-separated)</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm shadow-sm"
                                    placeholder="minimal, tech, modern"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block">Description / Details</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[120px] text-sm shadow-sm"
                                    placeholder="Brief description of when to use this template..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-6 pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <div className={`w-11 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${formData.isActive ? 'transform translate-x-5' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 select-none">Active Template</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={formData.isPremium}
                                            onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                                        />
                                        <div className={`w-11 h-6 rounded-full transition-colors border border-slate-200 ${formData.isPremium ? 'bg-amber-500 border-amber-600' : 'bg-slate-200 border-slate-300'}`}></div>
                                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm ${formData.isPremium ? 'transform translate-x-5' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 select-none">Premium Layout</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                >
                                    {editingTemplate ? 'Save Changes' : 'Publish Template'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
