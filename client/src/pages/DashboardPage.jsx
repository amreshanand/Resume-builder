import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import Loader from '../components/common/Loader';

export default function DashboardPage() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            const { data } = await resumeService.getAll();
            setResumes(data);
        } catch {
            // Handle error silently
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this resume?')) return;
        try {
            await resumeService.delete(id);
            setResumes(resumes.filter((r) => r._id !== id));
        } catch {
            // Handle error
        }
    };

    const templateColors = {
        fresher: 'from-emerald-500 to-teal-600',
        developer: 'from-blue-500 to-indigo-600',
        corporate: 'from-purple-500 to-violet-600',
        creative: 'from-pink-500 to-rose-600',
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Resumes</h1>
                        <p className="text-[var(--text-muted)] text-base mt-2">Manage your resume collection</p>
                    </div>
                    <Link to="/templates" className="btn-primary no-underline text-base">
                        + New Resume
                    </Link>
                </div>

                {loading ? (
                    <Loader text="Loading your resumes..." />
                ) : resumes.length === 0 ? (
                    <div className="glass rounded-2xl p-20 text-center border border-white/10">
                        <div className="text-6xl mb-6">📄</div>
                        <h3 className="text-2xl font-semibold mb-3 text-white">No resumes yet</h3>
                        <p className="text-[var(--text-muted)] text-base mb-8">Create your first AI-powered resume to get started</p>
                        <Link to="/templates" className="btn-primary no-underline text-base">Get Started</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((resume) => (
                            <div key={resume._id} className="glass rounded-xl p-6 hover:border-[var(--primary)]/30 transition-all group border border-white/8">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${templateColors[resume.templateType] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white text-base font-bold`}>
                                        {resume.title?.charAt(0) || 'R'}
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${resume.status === 'complete' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {resume.status}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-base mb-1.5 text-white">{resume.title}</h3>
                                <p className="text-sm text-[var(--text-muted)] capitalize mb-4">{resume.templateType} template</p>
                                {resume.atsScore && (
                                    <div className="text-sm text-[var(--primary-light)] mb-4 font-medium">ATS Score: {resume.atsScore}/100</div>
                                )}
                                <div className="flex items-center gap-4 pt-4 border-t border-[var(--border)]">
                                    <Link to={`/builder/${resume._id}`} className="text-sm text-[var(--primary-light)] hover:underline no-underline font-medium">Edit</Link>
                                    <span className="text-[var(--border)]">•</span>
                                    <button onClick={() => handleDelete(resume._id)} className="text-sm text-[var(--danger)] hover:underline bg-transparent border-none cursor-pointer font-medium">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
