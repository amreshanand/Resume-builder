import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import DynamicForm from '../components/form/DynamicForm';
import ResumePreview from '../components/preview/ResumePreview';
import Loader from '../components/common/Loader';
import aiService from '../services/aiService';
import { exportToPDF } from '../utils/pdfExport';
import { resumeService } from '../services/resumeService';
import toast from 'react-hot-toast';

export default function BuilderPage() {
    const { state, dispatch } = useResume();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [exporting, setExporting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // Generate form on mount if no schema yet
    useEffect(() => {
        if (!state.templateType) {
            navigate('/templates');
            return;
        }
        if (!state.formSchema) {
            generateForm();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const generateForm = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await aiService.generateForm(state.templateType);
            dispatch({ type: 'SET_FORM_SCHEMA', payload: result.data.schema });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to generate form. Using fallback.');
            // Try to get fallback from the error or just show error
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        setExporting(true);
        try {
            const name = state.sections?.personalInfo?.fullName || 'resume';
            await exportToPDF('resume-preview', `${name.replace(/\s+/g, '_')}_resume.pdf`);
        } catch (err) {
            setError('PDF export failed. Please try again.');
        } finally {
            setExporting(false);
        }
    };

    const handleImprove = async (text, context) => {
        try {
            const result = await aiService.improveContent(text, context);
            return result.data;
        } catch {
            return null;
        }
    };

    const handleSave = async () => {
        if (!state.resumeId) {
            toast.error('Resume ID not found, please create from dashboard.');
            return;
        }
        try {
            await resumeService.update(state.resumeId, {
                title: state.title || 'Untitled',
                sections: state.sections,
                formSchema: state.formSchema,
            });
            dispatch({ type: 'MARK_CLEAN' });
            toast.success('Resume saved successfully!');
        } catch (err) {
            toast.error('Failed to save resume.');
        }
    };

    const handleShare = async () => {
        if (!state.resumeId) {
            toast.error('Please save your resume first.');
            return;
        }
        try {
            const result = await resumeService.share(state.resumeId);
            const url = `${window.location.origin}${result.data.shareUrl}`;
            await navigator.clipboard.writeText(url);
            toast.success('Share link copied to clipboard!');
        } catch (err) {
            toast.error('Failed to generate share link.');
        }
    };

    if (!state.templateType) return null;

    return (
        <div className="min-h-screen pt-16 flex flex-col">
            {/* Toolbar */}
            <div className="glass border-b border-[var(--glass-border)] px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/templates')} className="btn-secondary text-xs">
                        ← Templates
                    </button>
                    <div>
                        <h2 className="text-sm font-semibold capitalize">{state.templateType} Resume</h2>
                        <p className="text-xs text-[var(--text-muted)]">Fill in your details below</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Mobile toggle */}
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className="btn-secondary text-xs md:hidden"
                    >
                        {showPreview ? '📝 Form' : '👁 Preview'}
                    </button>
                    {state.resumeId && (
                        <>
                            <button
                                onClick={handleSave}
                                className="btn-secondary text-xs"
                                disabled={!state.isPreviewDirty}
                            >
                                {state.isPreviewDirty ? '💾 Save Changes' : '✅ Saved'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="btn-secondary text-xs"
                            >
                                🔗 Share
                            </button>
                        </>
                    )}
                    <button
                        onClick={handleExportPDF}
                        disabled={exporting}
                        className="btn-primary text-xs"
                    >
                        {exporting ? '⏳ Exporting...' : '📄 Download PDF'}
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mx-6 mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400 flex items-center justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer">✕</button>
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <Loader text="AI is generating your form..." size="lg" />
                </div>
            ) : (
                <div className="flex-1 flex flex-col md:flex-row">
                    {/* Form Panel */}
                    <div className={`md:w-1/2 overflow-y-auto p-6 ${showPreview ? 'hidden md:block' : 'block'}`} style={{ maxHeight: 'calc(100vh - 120px)' }}>
                        {state.formSchema ? (
                            <DynamicForm schema={state.formSchema} />
                        ) : (
                            <div className="h-full flex items-center justify-center p-8">
                                <div className="max-w-md w-full glass border border-red-500/20 rounded-2xl p-10 text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/10 via-red-500/40 to-red-500/10" />
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                                        <span className="text-2xl">⚠️</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Schema Initialization Failed</h3>
                                    <p className="text-[var(--text-muted)] mb-8 text-sm leading-relaxed">
                                        Unable to establish connection with AI services. Please verify your connection or retry the operation.
                                    </p>
                                    <button onClick={generateForm} className="btn-primary w-full monospace tracking-widest text-[10px] uppercase font-bold py-4">
                                        [ Initialize Retry Sequence ]
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Preview Panel */}
                    <div className={`md:w-1/2 border-l border-[var(--border)] ${showPreview ? 'block' : 'hidden md:block'}`} style={{ maxHeight: 'calc(100vh - 120px)' }}>
                        <ResumePreview />
                    </div>
                </div>
            )}
        </div>
    );
}
