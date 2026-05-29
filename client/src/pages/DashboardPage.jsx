import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { resumeService } from '../services/resumeService';
import Loader from '../components/common/Loader';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeProvider';
import Navbar from '../components/layout/Navbar';

export default function DashboardPage() {
    const { user } = useAuth();
    const { theme } = useTheme();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [atsCheckActive, setAtsCheckActive] = useState(false);
    const [atsResults, setAtsResults] = useState(null);
    const [selectedResumeId, setSelectedResumeId] = useState('');
    const [uploadFile, setUploadFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        loadResumes();
    }, []);

    const loadResumes = async () => {
        try {
            const { data } = await resumeService.getAll();
            setResumes(data);
            if (data.length > 0) setSelectedResumeId(data[0]._id);
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

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
            setUploadFile(file);
        } else {
            alert('Please upload a valid PDF or DOCX file.');
        }
    };

    const handleAtsCheck = async () => {
        if (!selectedResumeId && selectedResumeId !== 'upload') {
            alert('Please select a resume to scan first.');
            return;
        }

        if (selectedResumeId === 'upload' && !uploadFile) {
            alert('Please select a PDF or DOCX file to upload.');
            return;
        }

        setAtsCheckActive(true);
        setAtsResults(null);
        
        try {
            let resumeDataToAnalyze = {};
            let actualResumeId = selectedResumeId;
            
            if (selectedResumeId !== 'upload') {
                const { data } = await resumeService.getOne(selectedResumeId);
                const { _id, userId, createdAt, updatedAt, __v, ...cleanData } = data;
                resumeDataToAnalyze = cleanData;
            } else {
                setIsUploading(true);
                const response = await resumeService.upload(uploadFile);
                setIsUploading(false);
                if (response.success) {
                    resumeDataToAnalyze = { text: response.data.extractedText };
                } else {
                    throw new Error("Failed to extract text from document");
                }
            }

            const token = localStorage.getItem('token');
            const apiResponse = await fetch('http://localhost:5001/api/ai/ats-score', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    resumeData: resumeDataToAnalyze,
                    targetRole: 'General Professional'
                })
            });

            if (!apiResponse.ok) {
                if (apiResponse.status === 401) throw new Error("Unauthorized. Please log in.");
                if (apiResponse.status === 429) throw new Error("No AI credits remaining.");
                throw new Error("Failed to reach AI engine");
            }

            const result = await apiResponse.json();
            
            if (!result.success || !result.data) {
                throw new Error("AI analysis failed on server.");
            }

            const parsedResults = result.data;
            setAtsResults(parsedResults);

            if (actualResumeId !== 'upload') {
                await resumeService.update(actualResumeId, {
                    atsScore: parsedResults.total,
                    atsFeedback: parsedResults.parameters
                });
                loadResumes();
            }

        } catch (error) {
            console.error(error);
            alert(error.message || "AI Engine encountered an error parsing the resume. Please try again.");
        } finally {
            setAtsCheckActive(false);
            setIsUploading(false);
        }
    };

    const templateColors = {
        fresher: 'from-amber-500 to-orange-600',
        developer: 'from-yellow-500 to-amber-600',
        corporate: 'from-orange-500 to-red-600',
        creative: 'from-yellow-400 to-orange-500',
    };

    const averageAtsScore = resumes.length > 0 
        ? Math.round(resumes.reduce((acc, curr) => acc + (curr.atsScore || 0), 0) / resumes.length)
        : 85;

    const chartData = [
        { name: 'Jan', score: 65, views: 12 },
        { name: 'Feb', score: 72, views: 18 },
        { name: 'Mar', score: 78, views: 24 },
        { name: 'Apr', score: 85, views: 35 },
        { name: 'May', score: averageAtsScore || 92, views: 42 },
        { name: 'Jun', score: (averageAtsScore || 92) + 2, views: 55 },
    ];

    const chartLabelColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.6)';
    const chartGridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.06)';
    const chartTooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
    const chartTooltipBorder = theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.15)';
    const chartTooltipText = theme === 'dark' ? '#ffffff' : '#0f172a';

    return (
        <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] selection:bg-amber-500/30 overflow-x-hidden pt-28 pb-20 px-6 relative transition-colors duration-300">
            <Navbar />
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-orange-600/5 blur-[100px] pointer-events-none z-0" />

            <div className="max-w-[1400px] mx-auto space-y-8 relative z-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-[#0f172a]/50 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-2xl backdrop-blur-xl transition-all duration-300">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">{user?.name || 'Architect'}</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">Your career intelligence dashboard is fully synced.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold transition-all border border-slate-200 dark:border-white/10 cursor-pointer">
                            View Profile
                        </button>
                        <Link to="/templates" className="btn-primary no-underline text-sm sm:text-base px-6 sm:px-8 py-3 shadow-md shadow-amber-500/20">
                            + Construct Resume
                        </Link>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Total Resumes', value: resumes.length, icon: '📄', color: 'from-amber-500/10 to-transparent', textColor: 'text-amber-500' },
                        { label: 'Avg ATS Score', value: `${averageAtsScore}%`, icon: '🎯', color: 'from-orange-500/10 to-transparent', textColor: 'text-orange-500' },
                        { label: 'Profile Strength', value: '94%', icon: '💪', color: 'from-yellow-500/10 to-transparent', textColor: 'text-yellow-500' },
                        { label: 'Interviews Landed', value: '3', icon: '🚀', color: 'from-emerald-500/10 to-transparent', textColor: 'text-emerald-500' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-250/70 dark:border-white/5 flex flex-col gap-4 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300 shadow-sm">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.color} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none`} />
                            <div className="flex justify-between items-start relative z-10">
                                <div className={`text-2xl ${stat.textColor} bg-slate-100 dark:bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 shadow-sm`}>{stat.icon}</div>
                            </div>
                            <div className="mt-2 relative z-10">
                                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</div>
                                <div className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area - 2 Columns wide */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Analytics Chart */}
                        <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Performance Analytics</h2>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">ATS Score & Recruiter Views over time</p>
                                </div>
                                <select className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-lg px-4 py-2 text-sm outline-none focus:border-amber-500 max-w-[180px] cursor-pointer">
                                    <option value="6m">Last 6 Months</option>
                                    <option value="1y">Last Year</option>
                                </select>
                            </div>
                            <div className="h-[280px] sm:h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false} />
                                        <XAxis dataKey="name" stroke={chartLabelColor} tick={{ fill: chartLabelColor, fontSize: 11 }} />
                                        <YAxis stroke={chartLabelColor} tick={{ fill: chartLabelColor, fontSize: 11 }} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: chartTooltipBg, borderColor: chartTooltipBorder, borderRadius: '12px', color: chartTooltipText }}
                                            itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                                        />
                                        <Area type="monotone" dataKey="score" name="ATS Score" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                        <Area type="monotone" dataKey="views" name="Profile Views" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Resumes List */}
                        <div className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/5 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">My Resumes</h2>
                                <Link to="/templates" className="text-amber-500 dark:text-amber-400 text-sm font-bold hover:underline">View All</Link>
                            </div>
                            
                            {loading ? (
                                <Loader text="Loading your resumes..." />
                            ) : resumes.length === 0 ? (
                                <div className="text-center py-12 border border-dashed border-slate-250 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/[0.01]">
                                    <div className="text-4xl mb-4">📄</div>
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900 dark:text-white">No resumes constructed yet</h3>
                                    <Link to="/templates" className="text-amber-500 dark:text-amber-400 font-bold hover:underline">Create your first resume</Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {resumes.map((resume) => (
                                        <div key={resume._id} className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-300 group border border-slate-200/60 dark:border-white/5 hover:border-amber-500/30 shadow-sm flex flex-col justify-between min-h-[200px]">
                                            <div>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${templateColors[resume.templateType] || 'from-gray-600 to-gray-700'} flex items-center justify-center text-white text-lg font-black shadow-md`}>
                                                        {resume.title?.charAt(0).toUpperCase() || 'R'}
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold uppercase">{resume.atsScore || 0}% ATS</span>
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors truncate">{resume.title || 'Untitled Resume'}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mb-4 font-semibold">{resume.templateType || 'Standard'} template</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                                                <Link to={`/builder/${resume._id}`} className="flex-1 text-center py-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:text-black text-xs font-bold transition-all no-underline">Edit</Link>
                                                <button onClick={() => handleDelete(resume._id)} className="px-3 py-2 rounded-lg text-xs font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20 cursor-pointer">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Column */}
                    <div>
                        {/* Ultimate ATS Checker Component */}
                        <div className="bg-white dark:bg-slate-900/60 rounded-3xl border border-amber-500/30 dark:border-amber-500/20 shadow-md dark:shadow-[0_0_50px_rgba(245,158,11,0.06)] relative overflow-hidden group flex flex-col h-full">
                            <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                            
                            <div className="p-8 border-b border-slate-200 dark:border-white/10 relative z-10 bg-slate-50/50 dark:bg-black/20">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black text-xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">⚡</span> 
                                    ATS Engine
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Deep structural analysis against industry algorithms.</p>
                            </div>
                            
                            <div className="p-8 relative z-10 flex-1 flex flex-col">
                                {!atsCheckActive && !atsResults && (
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="mb-8">
                                            <h3 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-4">Engine Capabilities</h3>
                                            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">▹</span> Keyword density & semantic matching</li>
                                                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">▹</span> Structural parseability check</li>
                                                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">▹</span> Action verb & impact scoring</li>
                                                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">▹</span> Data quantification metrics</li>
                                                <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">▹</span> Contact info & link validation</li>
                                            </ul>
                                        </div>

                                        <div className="bg-slate-50 dark:bg-black/30 rounded-2xl border border-slate-200 dark:border-white/10 p-6 text-center mt-auto">
                                            <div className="text-4xl mb-4 opacity-70">📤</div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-bold">Select a resume to initialize scan</p>
                                            <select 
                                                value={selectedResumeId}
                                                onChange={(e) => setSelectedResumeId(e.target.value)}
                                                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500 mb-4 cursor-pointer font-bold shadow-sm"
                                            >
                                                <option value="" disabled>Select from database...</option>
                                                {resumes.map(r => <option key={r._id} value={r._id}>{r.title || 'Untitled'}</option>)}
                                                <option value="upload">Upload new PDF/DOCX...</option>
                                            </select>

                                            {selectedResumeId === 'upload' && (
                                                <div 
                                                    className={`mb-4 border-2 border-dashed rounded-2xl p-6 text-center transition-all ${isDragging ? 'border-amber-500 bg-amber-500/10' : 'border-slate-300 hover:border-amber-500 dark:border-white/20 dark:hover:border-amber-500/50 dark:hover:bg-white/5'}`}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDrop}
                                                >
                                                    <div className="text-3xl mb-2 opacity-70">📄</div>
                                                    <p className="text-sm text-slate-700 dark:text-slate-350 font-bold mb-1">
                                                        {uploadFile ? uploadFile.name : 'Drag and drop your resume here'}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mb-4">PDF or DOCX (Max 5MB)</p>
                                                    
                                                    <input 
                                                        type="file" 
                                                        id="resumeUpload"
                                                        accept=".pdf,.docx,.doc" 
                                                        onChange={(e) => setUploadFile(e.target.files[0])}
                                                        className="hidden"
                                                    />
                                                    <label 
                                                        htmlFor="resumeUpload"
                                                        className="cursor-pointer px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors inline-block border border-slate-300 dark:border-transparent"
                                                    >
                                                        Browse Files
                                                    </label>
                                                </div>
                                            )}

                                            <button onClick={handleAtsCheck} className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm uppercase tracking-widest shadow-md hover:bg-amber-400 transition-colors cursor-pointer">
                                                Initialize Scan
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {atsCheckActive && (
                                    <div className="py-20 flex flex-col items-center justify-center h-full text-center">
                                        <div className="relative mb-8">
                                            <div className="w-20 h-20 border-4 border-amber-500/20 rounded-full" />
                                            <div className="w-20 h-20 border-4 border-transparent border-t-amber-500 rounded-full animate-spin absolute top-0 left-0" />
                                            <div className="absolute inset-0 flex items-center justify-center text-xl">⚡</div>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {isUploading ? 'Extracting Text...' : 'Analyzing Architecture'}
                                        </h3>
                                        <p className="text-amber-600 dark:text-amber-400 font-bold animate-pulse text-xs uppercase tracking-widest">
                                            {isUploading ? 'Parsing document contents' : 'Parsing Structure & Metrics...'}
                                        </p>
                                    </div>
                                )}

                                {atsResults && (
                                    <div className="animate-in fade-in duration-500 flex flex-col h-full">
                                        <div className="text-center mb-8 border-b border-slate-200 dark:border-white/10 pb-8">
                                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Total Match Score</p>
                                            <div className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white mb-3 text-glow">
                                                {atsResults.total}<span className="text-3xl sm:text-4xl text-amber-500">%</span>
                                            </div>
                                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${atsResults.total >= 85 ? 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20' : 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 border border-orange-500/20'}`}>
                                                {atsResults.total >= 85 ? 'Highly Optimized' : 'Needs Work'}
                                            </span>
                                        </div>

                                        <div className="space-y-4 mb-8 flex-1">
                                            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <span>📊</span> Parameter Breakdown
                                            </h3>
                                            {atsResults.parameters.map((param, idx) => (
                                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200 dark:border-white/5">
                                                    <div className="flex justify-between items-center mb-1.5">
                                                        <span className="text-sm font-bold text-slate-800 dark:text-white">{param.name}</span>
                                                        <span className={`text-sm font-black ${param.score >= 90 ? 'text-emerald-500 dark:text-emerald-400' : param.score >= 70 ? 'text-amber-500 dark:text-amber-400' : 'text-red-500'}`}>
                                                            {param.score}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mb-2">
                                                        <div 
                                                            className={`h-full rounded-full ${param.score >= 90 ? 'bg-emerald-500' : param.score >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} 
                                                            style={{ width: `${param.score}%` }} 
                                                        />
                                                    </div>
                                                    <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">{param.desc}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-amber-500/10 rounded-2xl p-5 border border-amber-500/20 mb-6">
                                            <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <span>💡</span> AI Verdict
                                            </h4>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                                {atsResults.review}
                                            </p>
                                        </div>

                                        <button onClick={() => setAtsResults(null)} className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors mt-auto cursor-pointer">
                                            Run Another Scan
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
