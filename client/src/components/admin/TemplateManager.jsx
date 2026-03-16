import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { CATEGORY_TEMPLATES } from '../../data/categoryTemplates.jsx';

export default function TemplateManager() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all'); // 'all' or specific category
    const [searchQuery, setSearchQuery] = useState('');

    const initialFormState = {
        name: '',
        category: '',
        previewImage: '',
        isPremium: false,
        isActive: true,
        tags: '',
        description: '',
        sections: {
            personal: { title: 'Personal Information', fields: [] },
            experience: { title: 'Work Experience', fields: [] },
            education: { title: 'Education', fields: [] },
            skills: { title: 'Skills', fields: [] }
        }
    };

    const [formData, setFormData] = useState(initialFormState);
    const [jsonError, setJsonError] = useState(null);
    const [editorTab, setEditorTab] = useState('basic'); // 'basic' or 'structure'

    // Categories from DB + predefined categories
    const categoryStats = useMemo(() => {
        const stats = {};
        
        // Initialize with predefined categories
        Object.keys(CATEGORY_TEMPLATES).forEach(id => {
            stats[id] = {
                name: CATEGORY_TEMPLATES[id].name,
                count: 0,
                isPredefined: true
            };
        });

        // Add counts and discover new ones
        templates.forEach(t => {
            const cat = t.category || 'Uncategorized';
            if (!stats[cat]) {
                stats[cat] = { name: cat, count: 0, isPredefined: false };
            }
            stats[cat].count++;
        });

        return stats;
    }, [templates]);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            // Unified admin templates API (camelCase mapping, includes inactive)
            const { data } = await api.get('/templates/admin/all');
            setTemplates(data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch templates:', error);
            toast.error('Failed to load templates');
            setLoading(false);
        }
    };

    const filteredTemplates = useMemo(() => {
        return templates.filter(t => {
            const matchesCategory = activeCategory === 'all' || (t.category || 'Uncategorized') === activeCategory;
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 t.description?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [templates, activeCategory, searchQuery]);

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
                await api.put(`/templates/${editingTemplate._id || editingTemplate.id}`, payload);
                toast.success('Template updated successfully', { id: tid });
            } else {
                await api.post('/templates', payload);
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
            previewImage: template.previewImage || '',
            tags: Array.isArray(template.tags) ? template.tags.join(', ') : (template.tags || ''),
            sections: template.sections || initialFormState.sections
        });
        setIsAdding(true);
        setEditorTab('basic');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;

        const tid = toast.loading('Deleting template...');
        try {
            await api.delete(`/templates/${id}`);
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
                <p className="text-[15px] font-semibold text-slate-500">Loading your template library...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-200">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">Template Library</h2>
                    <p className="text-slate-500 font-medium">Manage and organize your professional resume layouts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search templates..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Category Cards Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        Categories
                    </h3>
                    <button 
                        onClick={() => {
                            setFormData({ ...initialFormState });
                            setIsAdding(true);
                        }}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Quick Add Template
                    </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`group p-5 rounded-[2.5rem] border-2 transition-all relative overflow-hidden text-left ${activeCategory === 'all' ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105 z-10' : 'bg-white border-slate-100 text-slate-900 hover:border-indigo-300 hover:-translate-y-1'}`}
                    >
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeCategory === 'all' ? 'bg-white/10' : 'bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600'}`}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <p className="text-[15px] font-black truncate">Overview</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 opacity-60`}>{templates.length} Assets</p>
                    </button>

                    {Object.entries(categoryStats).map(([id, info]) => (
                        <button
                            key={id}
                            onClick={() => setActiveCategory(id)}
                            className={`group p-5 rounded-[2.5rem] border-2 transition-all relative overflow-hidden text-left ${activeCategory === id ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl scale-105 z-10' : 'bg-white border-slate-100 text-slate-900 hover:border-indigo-300 hover:-translate-y-1'}`}
                        >
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-colors ${activeCategory === id ? 'bg-white/10' : 'bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-[15px] font-black truncate capitalize">{info.name}</p>
                            <p className={`text-[10px] font-black uppercase tracking-widest mt-0.5 opacity-60`}>{info.count} Layouts</p>
                            
                            {!info.isPredefined && (
                                <div className="absolute top-4 right-4">
                                    <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                                </div>
                            )}
                        </button>
                    ))}

                    <button
                        onClick={() => {
                            const newCat = prompt('Enter new category name:');
                            if (newCat) setActiveCategory(newCat);
                        }}
                        className="p-5 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all flex flex-col items-center justify-center gap-2 group"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">New Group</span>
                    </button>
                </div>
            </div>

            {/* Template List/Grid Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900 tracking-tight capitalize">
                            {activeCategory === 'all' ? 'All Templates' : `${activeCategory} Templates`}
                        </h3>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-wider">{filteredTemplates.length}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setEditingTemplate(null);
                                setFormData({ ...initialFormState, category: activeCategory === 'all' ? '' : activeCategory });
                                setIsAdding(true);
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-300 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                            Add {activeCategory === 'all' ? 'Template' : `to ${activeCategory}`}
                        </button>
                    </div>
                </div>

                {filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map(template => (
                            <div key={template._id || template.id} className="group bg-white rounded-[2rem] border border-slate-200 hover:border-indigo-400 transition-all hover:shadow-2xl overflow-hidden flex flex-col relative shadow-sm">
                                {/* Badges */}
                                <div className="absolute top-5 right-5 z-20 flex gap-2">
                                    {template.isPremium && (
                                        <div className="px-3 py-1 bg-amber-400 text-white text-[9px] font-black tracking-[0.1em] uppercase rounded-full shadow-lg shadow-amber-200">PRO</div>
                                    )}
                                    <div className={`px-3 py-1 text-[9px] font-black tracking-[0.1em] uppercase rounded-full shadow-lg ${template.isActive ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-slate-400 text-white shadow-slate-100'}`}>
                                        {template.isActive ? 'Live' : 'Draft'}
                                    </div>
                                </div>

                                {/* Image Preview Wrapper */}
                                <div className="h-56 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    {template.previewImage ? (
                                        <img src={template.previewImage} alt={template.name} className="h-full w-auto object-contain rounded-xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-transform duration-700 ease-out" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-slate-300">
                                            <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-inner border border-slate-100">
                                                <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Missing Assets</span>
                                        </div>
                                    )}
                                </div>

                                {/* Details Card */}
                                <div className="p-6 flex-1 flex flex-col bg-white">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">{template.category || 'Structural'}</p>
                                            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{template.name}</h4>
                                        </div>
                                    </div>
                                    
                                    <p className="text-xs font-semibold text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                                        {template.description || 'Professional resume layout designed for maximum impact and ATS readability.'}
                                    </p>

                                    <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleEdit(template)}
                                            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm border border-slate-100"
                                        >
                                            Edit Core
                                        </button>
                                        <button
                                            onClick={() => handleDelete(template._id || template.id)}
                                            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm border border-rose-100/50"
                                        >
                                            Destroy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 p-20 text-center border-dashed">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-white shadow-xl shadow-indigo-100/50">
                            <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">No templates found here</h2>
                        <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">Create your first professional layout for the {activeCategory === 'all' ? 'library' : activeCategory} category.</p>
                        <button
                            onClick={() => {
                                setEditingTemplate(null);
                                setFormData({ ...initialFormState, category: activeCategory === 'all' ? '' : activeCategory });
                                setIsAdding(true);
                            }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white text-sm font-black uppercase tracking-widest shadow-2xl shadow-indigo-300 transition-all hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                            Create {activeCategory === 'all' ? 'New' : activeCategory} Template
                        </button>
                    </div>
                )}
            </div>

            {/* Modal - Modern Styling */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-all duration-300" onClick={() => setIsAdding(false)} />

                    <div className="relative bg-white rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="px-10 py-8 border-b border-slate-100 bg-white sticky top-0 z-10">
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">Architecture Node</p>
                                    <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                        {editingTemplate ? `Modify ${editingTemplate.name}` : 'Spawn New Layout'}
                                    </h2>
                                </div>
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                                    <button
                                        type="button"
                                        onClick={() => setEditorTab('basic')}
                                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${editorTab === 'basic' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        Basic Settings
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditorTab('structure')}
                                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${editorTab === 'structure' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        JSON Schema
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Form */}
                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                            <form id="templateForm" onSubmit={handleSubmit} className="space-y-10">
                                {editorTab === 'basic' ? (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Display Title</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-slate-50 border-2 border-slate-50 p-5 rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all shadow-inner"
                                                    placeholder="e.g. Minimalist Tech"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Placement Category</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-slate-50 border-2 border-slate-50 p-5 rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all shadow-inner"
                                                    placeholder="e.g. Engineering"
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Visual Preview Asset</label>
                                            <div className="flex justify-center p-12 border-2 border-slate-200 border-dashed rounded-[2.5rem] hover:border-indigo-500 transition-all bg-slate-50 group/upload relative min-h-[260px]">
                                                <div className="space-y-5 text-center w-full flex flex-col items-center justify-center">
                                                    {formData.previewImage ? (
                                                        <div className="relative group/img max-w-sm rounded-[2rem] overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
                                                            <img src={formData.previewImage} alt="Preview" className="w-full h-auto object-contain" />
                                                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setFormData({ ...formData, previewImage: '' });
                                                                    }}
                                                                    className="bg-white text-rose-600 rounded-2xl px-6 py-3 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-rose-600 hover:text-white transition-all transform hover:-translate-y-1"
                                                                >
                                                                    Purge Asset
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center mb-3 group-hover/upload:scale-110 group-hover/upload:rotate-3 transition-all duration-500 text-indigo-500">
                                                                <svg className="h-10 w-10" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex text-base text-slate-600 justify-center">
                                                                <label htmlFor="file-upload" className="relative cursor-pointer font-black text-indigo-600 hover:text-indigo-500 transition-colors">
                                                                    <span>Select High-Res Asset</span>
                                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => {
                                                                        const file = e.target.files[0];
                                                                        if (file) {
                                                                            const reader = new FileReader();
                                                                            reader.onloadend = () => {
                                                                                setFormData({ ...formData, previewImage: reader.result });
                                                                            };
                                                                            reader.readAsDataURL(file);
                                                                        }
                                                                    }} />
                                                                </label>
                                                            </div>
                                                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Supports PNG, WEBP • Auto-Optimized</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Meta Descriptors (Tags)</label>
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border-2 border-slate-50 p-5 rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all shadow-inner"
                                                placeholder="e.g. minimalist, bold, sdr (comma separated)"
                                                value={formData.tags}
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block px-1">Marketing Description</label>
                                            <textarea
                                                className="w-full bg-slate-50 border-2 border-slate-50 p-5 rounded-[1.5rem] text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:bg-white focus:border-indigo-500/30 transition-all shadow-inner min-h-[160px] resize-none"
                                                placeholder="Sell this template to users..."
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-10 py-6 px-2 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                            <label className="flex items-center gap-5 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={formData.isActive}
                                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                    />
                                                    <div className={`w-16 h-9 rounded-full transition-all duration-300 ${formData.isActive ? 'bg-emerald-500 shadow-xl shadow-emerald-200' : 'bg-slate-300 shadow-inner'}`}></div>
                                                    <div className={`absolute left-1.5 top-1.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${formData.isActive ? 'transform translate-x-7' : ''}`}></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-black text-slate-900">Live Status</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Visible to public</span>
                                                </div>
                                            </label>

                                            <label className="flex items-center gap-5 cursor-pointer group">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only"
                                                        checked={formData.isPremium}
                                                        onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                                                    />
                                                    <div className={`w-16 h-9 rounded-full transition-all duration-300 ${formData.isPremium ? 'bg-amber-400 shadow-xl shadow-amber-200' : 'bg-slate-300 shadow-inner'}`}></div>
                                                    <div className={`absolute left-1.5 top-1.5 bg-white w-6 h-6 rounded-full transition-transform duration-300 shadow-md ${formData.isPremium ? 'transform translate-x-7' : ''}`}></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-black text-slate-900">PRO Monetization</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">Paid members only</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col">
                                        <div className="flex items-center justify-between px-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Structural JSON Schema</label>
                                            {jsonError && (
                                                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100 italic">{jsonError}</span>
                                            )}
                                        </div>
                                        <textarea
                                            className={`w-full flex-1 bg-[#0f172a] text-emerald-400 p-8 rounded-[2rem] font-mono text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-2xl resize-none border-2 ${jsonError ? 'border-rose-500/50' : 'border-slate-800'}`}
                                            placeholder="Layout structure JSON..."
                                            value={JSON.stringify(formData.sections, null, 4)}
                                            rows={25}
                                            onChange={(e) => {
                                                try {
                                                    const val = JSON.parse(e.target.value);
                                                    setFormData({ ...formData, sections: val });
                                                    setJsonError(null);
                                                } catch (err) {
                                                    setJsonError('Invalid JSON Formatting');
                                                }
                                            }}
                                        />
                                        <div className="p-6 bg-amber-50 rounded-[1.5rem] border border-amber-100 flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-white shrink-0">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-black text-amber-900 leading-tight">Advanced Logic Warning</p>
                                                <p className="text-[11px] font-bold text-amber-700 mt-1 opacity-80">Modification of the JSON schema directly impacts the resume builder interface. Ensure you follow the specific format required for client-side rendering.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4 shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-10 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 bg-white border-2 border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm"
                            >
                                Abandon
                            </button>
                            <button
                                form="templateForm"
                                type="submit"
                                className="px-12 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] text-white bg-indigo-600 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
                            >
                                {editingTemplate ? 'Commit Changes' : 'Execute Deploy'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}} />
        </div>
    );
}
