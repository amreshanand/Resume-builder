import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function ResumeManager() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const { data } = await api.get('/admin/resumes');
            setResumes(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch resumes:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-[15px] font-semibold text-slate-500">Loading resumes...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-none mb-1">Resumes</h2>
                    <p className="text-sm font-medium text-slate-500">View and manage all generated resumes</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <th className="px-6 py-4 rounded-tl-xl">Title / ID</th>
                            <th className="px-6 py-4">Creator</th>
                            <th className="px-6 py-4">Data Elements</th>
                            <th className="px-6 py-4">Last Modified</th>
                            <th className="px-6 py-4 text-right rounded-tr-xl">Quick Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {resumes.map((resume) => (
                            <tr key={resume._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-11 bg-indigo-50 rounded-md border border-indigo-100 flex items-center justify-center text-indigo-500">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-[14px] leading-tight mb-0.5">{resume.title}</div>
                                            <div className="text-xs font-medium text-slate-400 font-mono">{resume._id.slice(-8)}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600">
                                            {resume.userId?.name?.charAt(0) || '?'}
                                        </div>
                                        {resume.userId?.name || 'Unknown User'}
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-600" title="Experience">
                                            Exp: {resume.content?.experience?.length || 0}
                                        </span>
                                        <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold text-slate-600" title="Education">
                                            Edu: {resume.content?.education?.length || 0}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5 text-sm font-semibold text-slate-600">
                                    {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                <td className="px-6 py-3.5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <a
                                            href={`/dashboard/preview/${resume._id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 rounded-md transition-colors"
                                        >
                                            View PDF
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {resumes.length === 0 && (
                <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">No resumes yet</h3>
                    <p className="text-sm font-medium text-slate-500">Platform users haven't created any resumes.</p>
                </div>
            )}
        </div>
    );
}
