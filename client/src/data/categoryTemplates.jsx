/**
 * Category-specific resume templates
 * Each category has 5 unique templates with preview components and metadata
 */

// ============================================================
// REUSABLE PREVIEW STYLES - Building blocks for template previews
// ============================================================

// Classic single-column layout preview
const ClassicPreview = ({ accentColor = 'emerald', darkMode = false }) => {
    const bg = darkMode ? 'bg-slate-900' : 'bg-white';
    const textPrimary = darkMode ? 'bg-white' : 'bg-gray-900';
    const textSecondary = darkMode ? 'bg-slate-400' : 'bg-gray-300';
    const accent = `bg-${accentColor}-600`;
    const accentLight = darkMode ? `bg-${accentColor}-500/30` : `bg-${accentColor}-100`;

    return (
        <div className={`w-full h-full ${bg} p-4 flex flex-col pointer-events-none`}>
            <div className={`text-center mb-4 pb-3 border-b-2 border-${accentColor}-600`}>
                <div className={`w-2/3 mx-auto h-4 ${textPrimary} rounded mb-2`} />
                <div className={`w-1/2 mx-auto h-2 ${textSecondary} rounded`} />
            </div>
            <div className="mb-3">
                <div className={`w-1/4 h-2.5 ${accent} rounded mb-2`} />
                <div className="space-y-1">
                    <div className={`w-full h-1.5 ${textSecondary} rounded`} />
                    <div className={`w-5/6 h-1.5 ${textSecondary} rounded`} />
                </div>
            </div>
            <div className="mb-3">
                <div className={`w-1/5 h-2.5 ${accent} rounded mb-2`} />
                <div className="flex gap-1.5 flex-wrap">
                    <div className={`h-2.5 w-10 ${accentLight} rounded-full`} />
                    <div className={`h-2.5 w-12 ${accentLight} rounded-full`} />
                    <div className={`h-2.5 w-8 ${accentLight} rounded-full`} />
                </div>
            </div>
            <div>
                <div className={`w-1/4 h-2.5 ${accent} rounded mb-2`} />
                <div className="space-y-1">
                    <div className={`w-full h-1.5 ${textSecondary} rounded`} />
                    <div className={`w-4/5 h-1.5 ${textSecondary} rounded`} />
                </div>
            </div>
        </div>
    );
};

// Sidebar layout preview
const SidebarPreview = ({ sidebarColor = 'teal', sidebarSide = 'left' }) => {
    const Sidebar = () => (
        <div className={`w-[35%] bg-${sidebarColor}-600 h-full p-3 flex flex-col`}>
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/80 rounded mb-1" />
            <div className="w-2/3 h-1.5 bg-white/50 rounded mb-4 mx-auto" />
            <div className="border-t border-white/20 pt-3">
                <div className="w-1/2 h-2 bg-white rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-white/40 rounded" />
                    <div className="w-5/6 h-1 bg-white/40 rounded" />
                    <div className="w-4/5 h-1 bg-white/40 rounded" />
                </div>
            </div>
        </div>
    );

    const MainContent = () => (
        <div className="w-[65%] p-3 bg-white">
            <div className="w-3/4 h-3 bg-gray-800 rounded mb-1" />
            <div className={`w-1/2 h-2 bg-${sidebarColor}-600 rounded mb-4`} />
            <div className="mb-3">
                <div className="w-1/3 h-2 bg-gray-700 rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded" />
                    <div className="w-5/6 h-1 bg-gray-200 rounded" />
                </div>
            </div>
            <div>
                <div className="w-1/3 h-2 bg-gray-700 rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded" />
                    <div className="w-4/5 h-1 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
            {sidebarSide === 'left' ? (
                <>
                    <Sidebar />
                    <MainContent />
                </>
            ) : (
                <>
                    <MainContent />
                    <Sidebar />
                </>
            )}
        </div>
    );
};

// ============================================================
// FRESHER / ENTRY-LEVEL TEMPLATES
// ============================================================

export const FresherClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="text-center mb-4 pb-3 border-b-2 border-emerald-600">
            <div className="w-2/3 mx-auto h-4 bg-emerald-700 rounded mb-2" />
            <div className="w-1/2 mx-auto h-2 bg-gray-400 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-emerald-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/5 h-2.5 bg-emerald-600 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="h-2.5 w-10 bg-emerald-100 rounded-full" />
                <div className="h-2.5 w-12 bg-emerald-100 rounded-full" />
                <div className="h-2.5 w-8 bg-emerald-100 rounded-full" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-emerald-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const FresherModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-[35%] bg-teal-600 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/80 rounded mb-1" />
            <div className="w-2/3 h-1.5 bg-white/50 rounded mb-4 mx-auto" />
            <div className="border-t border-white/20 pt-3">
                <div className="w-1/2 h-2 bg-white rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-white/40 rounded" />
                    <div className="w-5/6 h-1 bg-white/40 rounded" />
                </div>
            </div>
        </div>
        <div className="w-[65%] p-3">
            <div className="w-3/4 h-3 bg-gray-800 rounded mb-1" />
            <div className="w-1/2 h-2 bg-teal-600 rounded mb-4" />
            <div className="mb-3">
                <div className="w-1/3 h-2 bg-gray-700 rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded" />
                    <div className="w-5/6 h-1 bg-gray-200 rounded" />
                </div>
            </div>
            <div>
                <div className="w-1/3 h-2 bg-gray-700 rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded" />
                    <div className="w-4/5 h-1 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    </div>
);

export const FresherMinimalPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="flex gap-3">
                <div className="w-16 h-1.5 bg-gray-400 rounded" />
                <div className="w-14 h-1.5 bg-gray-400 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="flex gap-1 flex-wrap">
                <div className="h-2 w-8 bg-gray-100 rounded" />
                <div className="h-2 w-10 bg-gray-100 rounded" />
                <div className="h-2 w-6 bg-gray-100 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-3/4 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
    </div>
);

export const FresherBoldPreview = () => (
    <div className="w-full h-full bg-slate-900 p-4 flex flex-col pointer-events-none">
        <div className="mb-4">
            <div className="w-3/4 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded mb-2" />
            <div className="w-1/2 h-2 bg-slate-500 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-slate-800 rounded-lg p-2">
                <div className="w-1/2 h-2 bg-green-400 rounded mb-1" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-slate-600 rounded" />
                    <div className="w-5/6 h-1 bg-slate-600 rounded" />
                </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-2">
                <div className="w-1/2 h-2 bg-emerald-400 rounded mb-1" />
                <div className="space-y-1">
                    <div className="w-full h-1 bg-slate-600 rounded" />
                    <div className="w-4/5 h-1 bg-slate-600 rounded" />
                </div>
            </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
            <div className="h-2.5 px-2 bg-green-500/20 border border-green-500/40 rounded-full" style={{ width: '3rem' }} />
            <div className="h-2.5 px-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full" style={{ width: '3.5rem' }} />
            <div className="h-2.5 px-2 bg-teal-500/20 border border-teal-500/40 rounded-full" style={{ width: '2.5rem' }} />
        </div>
    </div>
);

export const FresherCreativePreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-teal-50 p-4 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex-shrink-0" />
            <div>
                <div className="w-20 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-14 h-2 bg-green-600 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-green-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-white/80 rounded" />
                <div className="w-5/6 h-1.5 bg-white/80 rounded" />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="w-full h-2 bg-green-200 rounded mb-1" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="w-full h-2 bg-teal-200 rounded mb-1" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="w-full h-2 bg-emerald-200 rounded mb-1" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
            </div>
        </div>
    </div>
);

// ============================================================
// SOFTWARE DEVELOPER TEMPLATES
// ============================================================

export const DeveloperTerminalPreview = () => (
    <div className="w-full h-full bg-[#1e1e1e] p-3 flex flex-col pointer-events-none rounded-sm">
        <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="text-[8px] text-green-400 mb-1 opacity-70">$ whoami</div>
        <div className="w-1/2 h-3 bg-cyan-400 rounded mb-3" />
        <div className="text-[8px] text-green-400 mb-1 opacity-70">$ cat skills.json</div>
        <div className="flex gap-1.5 flex-wrap mb-3">
            <div className="px-2 py-1 bg-purple-500/30 border border-purple-500 rounded text-[6px] text-purple-400">React</div>
            <div className="px-2 py-1 bg-blue-500/30 border border-blue-500 rounded text-[6px] text-blue-400">Node.js</div>
            <div className="px-2 py-1 bg-green-500/30 border border-green-500 rounded text-[6px] text-green-400">Python</div>
        </div>
        <div className="text-[8px] text-green-400 mb-1 opacity-70">$ ls projects/</div>
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-600 rounded" />
            <div className="w-4/5 h-1.5 bg-slate-600 rounded" />
            <div className="w-5/6 h-1.5 bg-slate-600 rounded" />
        </div>
    </div>
);

export const DeveloperCleanPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="flex justify-between items-start mb-3 pb-3 border-b-2 border-blue-600">
            <div>
                <div className="w-24 h-3.5 bg-gray-900 rounded mb-1" />
                <div className="w-16 h-2 bg-blue-600 rounded" />
            </div>
            <div className="flex gap-1.5">
                <div className="w-4 h-4 rounded bg-gray-100" />
                <div className="w-4 h-4 rounded bg-gray-100" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-blue-600 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="px-2 py-1 bg-blue-100 rounded w-8 h-2.5" />
                <div className="px-2 py-1 bg-blue-100 rounded w-10 h-2.5" />
                <div className="px-2 py-1 bg-blue-100 rounded w-7 h-2.5" />
                <div className="px-2 py-1 bg-blue-100 rounded w-9 h-2.5" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-blue-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const DeveloperGitHubPreview = () => (
    <div className="w-full h-full bg-[#0d1117] p-3 flex flex-col pointer-events-none">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-600" />
            <div>
                <div className="w-20 h-2.5 bg-white rounded mb-1" />
                <div className="w-14 h-1.5 bg-gray-500 rounded" />
            </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 mb-3">
            {[...Array(35)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-sm ${i % 3 === 0 ? 'bg-green-500' : i % 2 === 0 ? 'bg-green-700' : 'bg-gray-700'}`} />
            ))}
        </div>
        <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-gray-800 rounded p-2">
                <div className="w-1/2 h-2 bg-gray-400 rounded mb-1" />
                <div className="w-full h-1 bg-gray-600 rounded" />
            </div>
            <div className="flex-1 bg-gray-800 rounded p-2">
                <div className="w-1/2 h-2 bg-gray-400 rounded mb-1" />
                <div className="w-full h-1 bg-gray-600 rounded" />
            </div>
        </div>
    </div>
);

export const DeveloperModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-indigo-600 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/80 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/50 rounded mb-4 mx-auto" />
            <div className="w-full h-0.5 bg-white/30 mb-2" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="flex gap-1 flex-wrap">
                <div className="w-6 h-1.5 bg-white/40 rounded" />
                <div className="w-8 h-1.5 bg-white/40 rounded" />
                <div className="w-5 h-1.5 bg-white/40 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-indigo-600 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-indigo-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const DeveloperMinimalPreview = () => (
    <div className="w-full h-full bg-gray-50 p-4 flex flex-col pointer-events-none">
        <div className="mb-4">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-2 bg-indigo-500 rounded" />
        </div>
        <div className="flex gap-4">
            <div className="flex-1">
                <div className="w-1/3 h-2.5 bg-gray-800 rounded mb-2" />
                <div className="space-y-1">
                    <div className="w-full h-1.5 bg-gray-300 rounded" />
                    <div className="w-5/6 h-1.5 bg-gray-300 rounded" />
                    <div className="w-4/5 h-1.5 bg-gray-300 rounded" />
                </div>
            </div>
            <div className="w-px bg-gray-300" />
            <div className="flex-1">
                <div className="w-1/3 h-2.5 bg-gray-800 rounded mb-2" />
                <div className="flex gap-1 flex-wrap">
                    <div className="w-8 h-2 bg-gray-200 rounded" />
                    <div className="w-10 h-2 bg-gray-200 rounded" />
                    <div className="w-6 h-2 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    </div>
);

// ============================================================
// DATA & ANALYTICS TEMPLATES
// ============================================================

export const DataAnalyticsPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="text-center mb-3">
            <div className="w-1/2 mx-auto h-3.5 bg-cyan-700 rounded mb-2" />
            <div className="w-2/3 mx-auto h-2 bg-gray-400 rounded" />
        </div>
        <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-cyan-50 rounded p-2">
                <div className="w-full h-8 flex items-end gap-1">
                    <div className="flex-1 h-3 bg-cyan-300 rounded-t" />
                    <div className="flex-1 h-5 bg-cyan-400 rounded-t" />
                    <div className="flex-1 h-4 bg-cyan-500 rounded-t" />
                    <div className="flex-1 h-6 bg-cyan-600 rounded-t" />
                </div>
            </div>
            <div className="flex-1 bg-cyan-50 rounded p-2 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-r-transparent" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-cyan-600 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-gray-200 rounded" />
            <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
        </div>
    </div>
);

export const DataScientistPreview = () => (
    <div className="w-full h-full bg-[#1e1e2f] p-3 flex flex-col pointer-events-none">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500" />
            <div>
                <div className="w-20 h-3 bg-white rounded mb-1" />
                <div className="w-14 h-2 bg-cyan-400 rounded" />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-slate-800 rounded p-2 text-center">
                <div className="w-5 h-5 mx-auto mb-1 text-cyan-400 text-[8px]">📊</div>
                <div className="w-full h-1 bg-slate-600 rounded" />
            </div>
            <div className="bg-slate-800 rounded p-2 text-center">
                <div className="w-5 h-5 mx-auto mb-1 text-cyan-400 text-[8px]">🤖</div>
                <div className="w-full h-1 bg-slate-600 rounded" />
            </div>
            <div className="bg-slate-800 rounded p-2 text-center">
                <div className="w-5 h-5 mx-auto mb-1 text-cyan-400 text-[8px]">📈</div>
                <div className="w-full h-1 bg-slate-600 rounded" />
            </div>
        </div>
        <div className="w-1/3 h-2.5 bg-cyan-400 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-700 rounded" />
            <div className="w-4/5 h-1.5 bg-slate-700 rounded" />
        </div>
    </div>
);

export const DataModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-1/3 bg-sky-600 h-full p-3 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 mb-3" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/40 rounded mb-4" />
            <div className="w-full space-y-2">
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-white" />
                </div>
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-white" />
                </div>
            </div>
        </div>
        <div className="w-2/3 p-3">
            <div className="w-1/3 h-2.5 bg-sky-600 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-sky-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const DataClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-sky-700 pb-3 mb-3">
            <div className="w-2/3 h-3.5 bg-sky-800 rounded mb-2" />
            <div className="flex gap-2">
                <div className="w-16 h-1.5 bg-gray-400 rounded" />
                <div className="w-14 h-1.5 bg-gray-400 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-sky-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-sky-700 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="px-2 py-1 bg-sky-100 rounded w-10 h-2.5" />
                <div className="px-2 py-1 bg-sky-100 rounded w-8 h-2.5" />
                <div className="px-2 py-1 bg-sky-100 rounded w-12 h-2.5" />
            </div>
        </div>
    </div>
);

export const DataInfographicPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-cyan-50 p-3 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center text-white text-xs">📊</div>
            <div>
                <div className="w-20 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-14 h-2 bg-cyan-600 rounded" />
            </div>
        </div>
        <div className="flex gap-2 mb-3">
            <div className="flex-1 bg-white rounded-lg p-2 shadow-sm text-center">
                <div className="text-[10px] text-cyan-600 font-bold mb-1">5+</div>
                <div className="w-full h-1 bg-gray-200 rounded" />
            </div>
            <div className="flex-1 bg-white rounded-lg p-2 shadow-sm text-center">
                <div className="text-[10px] text-cyan-600 font-bold mb-1">10</div>
                <div className="w-full h-1 bg-gray-200 rounded" />
            </div>
            <div className="flex-1 bg-white rounded-lg p-2 shadow-sm text-center">
                <div className="text-[10px] text-cyan-600 font-bold mb-1">3</div>
                <div className="w-full h-1 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="w-1/3 h-2.5 bg-cyan-600 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-white rounded" />
            <div className="w-4/5 h-1.5 bg-white rounded" />
        </div>
    </div>
);

// ============================================================
// BUSINESS & MANAGEMENT TEMPLATES
// ============================================================

export const BusinessExecutivePreview = () => (
    <div className="w-full h-full bg-[#fdfbf7] p-4 flex flex-col pointer-events-none">
        <div className="text-center mb-3">
            <div className="w-2/3 mx-auto h-4 bg-stone-800 rounded mb-2" />
            <div className="w-full h-[2px] bg-amber-600 mb-2" />
            <div className="w-1/2 mx-auto h-1.5 bg-stone-500 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-stone-800 rounded mb-2" />
            <div className="w-full h-0.5 bg-stone-300 mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-stone-300 rounded" />
                <div className="w-5/6 h-1.5 bg-stone-300 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-stone-800 rounded mb-2" />
            <div className="w-full h-0.5 bg-stone-300 mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-stone-300 rounded" />
                <div className="w-4/5 h-1.5 bg-stone-300 rounded" />
            </div>
        </div>
    </div>
);

export const BusinessModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-purple-700 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/40 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-5/6 h-1 bg-white/30 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-purple-700 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-purple-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const BusinessClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-gray-800 pb-3 mb-3">
            <div className="w-1/2 h-3.5 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-1.5 bg-gray-500 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const BusinessMinimalPreview = () => (
    <div className="w-full h-full bg-gray-50 p-4 flex flex-col pointer-events-none">
        <div className="mb-4">
            <div className="w-2/3 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-2 bg-purple-600 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-300 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-300 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-300 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-300 rounded" />
            </div>
        </div>
    </div>
);

export const BusinessConsultantPreview = () => (
    <div className="w-full h-full bg-white p-3 flex flex-col pointer-events-none">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-lg mb-3 text-center">
            <div className="w-1/2 mx-auto h-3 bg-white rounded mb-1" />
            <div className="w-1/3 mx-auto h-1.5 bg-white/60 rounded" />
        </div>
        <div className="flex gap-3 mb-3">
            <div className="flex-1 border border-purple-200 rounded-lg p-2">
                <div className="w-1/2 h-2 bg-purple-600 rounded mb-1" />
                <div className="w-full h-1 bg-gray-200 rounded" />
            </div>
            <div className="flex-1 border border-purple-200 rounded-lg p-2">
                <div className="w-1/2 h-2 bg-purple-600 rounded mb-1" />
                <div className="w-full h-1 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-purple-600 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-gray-200 rounded" />
            <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
        </div>
    </div>
);

// ============================================================
// FINANCE TEMPLATES
// ============================================================

export const FinanceClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-amber-600 pb-3 mb-3">
            <div className="w-1/2 h-3.5 bg-gray-900 rounded mb-2" />
            <div className="flex gap-2">
                <div className="w-14 h-1.5 bg-gray-400 rounded" />
                <div className="w-16 h-1.5 bg-gray-400 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-amber-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-amber-700 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="px-2 py-1 bg-amber-100 rounded w-10 h-2.5" />
                <div className="px-2 py-1 bg-amber-100 rounded w-8 h-2.5" />
            </div>
        </div>
    </div>
);

export const FinanceModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-gradient-to-b from-gray-800 to-gray-900 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-amber-500 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-5/6 h-1 bg-white/30 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const FinanceExecutivePreview = () => (
    <div className="w-full h-full bg-[#fdfcf8] p-4 flex flex-col pointer-events-none">
        <div className="text-center mb-3">
            <div className="w-2/3 mx-auto h-4 bg-gray-900 rounded mb-2" />
            <div className="w-24 mx-auto h-0.5 bg-amber-600 mb-2" />
            <div className="w-1/2 mx-auto h-1.5 bg-gray-500 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const FinanceMinimalPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-1.5 bg-amber-600 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
    </div>
);

export const FinanceInvestmentPreview = () => (
    <div className="w-full h-full bg-slate-900 p-4 flex flex-col pointer-events-none">
        <div className="mb-3">
            <div className="w-3/4 h-4 bg-white rounded mb-2" />
            <div className="w-1/2 h-2 bg-amber-500 rounded" />
        </div>
        <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-[10px] text-amber-500 font-bold mb-1">$50M</div>
                <div className="w-full h-1 bg-slate-700 rounded" />
            </div>
            <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-[10px] text-amber-500 font-bold mb-1">25+</div>
                <div className="w-full h-1 bg-slate-700 rounded" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-amber-500 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-700 rounded" />
            <div className="w-5/6 h-1.5 bg-slate-700 rounded" />
        </div>
    </div>
);

// ============================================================
// CREATIVE / DESIGN TEMPLATES
// ============================================================

export const CreativePortfolioPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-gradient-to-b from-pink-500 to-rose-600 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/80 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/50 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="grid grid-cols-2 gap-1">
                <div className="aspect-square bg-white/20 rounded" />
                <div className="aspect-square bg-white/20 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-pink-600 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-pink-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const CreativeMinimalPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex-shrink-0" />
            <div>
                <div className="w-20 h-3 bg-gray-900 rounded mb-1" />
                <div className="w-14 h-2 bg-rose-500 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-rose-500 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-rose-500 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="h-2.5 w-10 bg-rose-100 rounded-full" />
                <div className="h-2.5 w-12 bg-rose-100 rounded-full" />
                <div className="h-2.5 w-8 bg-rose-100 rounded-full" />
            </div>
        </div>
    </div>
);

export const CreativeBoldPreview = () => (
    <div className="w-full h-full bg-slate-900 p-4 flex flex-col pointer-events-none">
        <div className="mb-3">
            <div className="w-3/4 h-5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded mb-2" />
            <div className="w-1/2 h-2 bg-slate-500 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="aspect-video bg-slate-800 rounded-lg" />
            <div className="aspect-video bg-slate-800 rounded-lg" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
            <div className="h-2.5 px-2 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-full" style={{ width: '3rem' }} />
            <div className="h-2.5 px-2 bg-purple-500/20 border border-purple-500/40 rounded-full" style={{ width: '3.5rem' }} />
            <div className="h-2.5 px-2 bg-pink-500/20 border border-pink-500/40 rounded-full" style={{ width: '2.5rem' }} />
        </div>
    </div>
);

export const CreativeModernPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-rose-50 to-orange-50 p-4 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-orange-500 flex-shrink-0" />
            <div>
                <div className="w-20 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-14 h-2 bg-rose-600 rounded" />
            </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="w-full h-6 bg-rose-100 rounded mb-1" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="w-full h-6 bg-orange-100 rounded mb-1" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm">
                <div className="w-full h-6 bg-pink-100 rounded mb-1" />
                <div className="w-3/4 h-1 bg-gray-300 rounded" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-rose-600 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-white rounded" />
            <div className="w-5/6 h-1.5 bg-white rounded" />
        </div>
    </div>
);

export const CreativeArtisticPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-1/3 p-3 border-r border-pink-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 mb-3" />
            <div className="w-full h-2 bg-gray-900 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-pink-500 rounded mb-4" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-gray-200 rounded" />
                <div className="w-5/6 h-1 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="w-2/3 p-3">
            <div className="w-1/3 h-2.5 bg-pink-500 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-100 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-pink-500 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="w-8 h-8 bg-pink-100 rounded-lg" />
                <div className="w-8 h-8 bg-rose-100 rounded-lg" />
                <div className="w-8 h-8 bg-orange-100 rounded-lg" />
            </div>
        </div>
    </div>
);

// ============================================================
// MARKETING & SALES TEMPLATES
// ============================================================

export const MarketingModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-gradient-to-b from-red-500 to-rose-600 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/80 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/50 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-white/40 rounded" />
                <div className="w-5/6 h-1 bg-white/40 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-red-600 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-red-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const MarketingBoldPreview = () => (
    <div className="w-full h-full bg-slate-900 p-4 flex flex-col pointer-events-none">
        <div className="mb-3">
            <div className="w-3/4 h-4 bg-white rounded mb-2" />
            <div className="w-1/2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded" />
        </div>
        <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-[10px] text-orange-500 font-bold mb-1">150%</div>
                <div className="w-full h-1 bg-slate-700 rounded" />
            </div>
            <div className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                <div className="text-[10px] text-orange-500 font-bold mb-1">50K</div>
                <div className="w-full h-1 bg-slate-700 rounded" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-orange-500 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-slate-700 rounded" />
            <div className="w-5/6 h-1.5 bg-slate-700 rounded" />
        </div>
    </div>
);

export const MarketingClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-red-600 pb-3 mb-3">
            <div className="w-1/2 h-3.5 bg-gray-900 rounded mb-2" />
            <div className="flex gap-2">
                <div className="w-14 h-1.5 bg-gray-400 rounded" />
                <div className="w-16 h-1.5 bg-gray-400 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-red-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-red-600 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="px-2 py-1 bg-red-100 rounded w-10 h-2.5" />
                <div className="px-2 py-1 bg-red-100 rounded w-8 h-2.5" />
            </div>
        </div>
    </div>
);

export const MarketingGrowthPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-50 p-3 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0" />
            <div>
                <div className="w-20 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-14 h-2 bg-red-600 rounded" />
            </div>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm mb-3">
            <div className="w-full h-10 flex items-end gap-1">
                <div className="flex-1 h-4 bg-orange-200 rounded-t" />
                <div className="flex-1 h-6 bg-orange-300 rounded-t" />
                <div className="flex-1 h-8 bg-orange-400 rounded-t" />
                <div className="flex-1 h-10 bg-red-500 rounded-t" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-red-600 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-white rounded" />
            <div className="w-4/5 h-1.5 bg-white rounded" />
        </div>
    </div>
);

export const MarketingMinimalPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-1.5 bg-red-600 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
    </div>
);

// ============================================================
// OPERATIONS & SUPPLY CHAIN TEMPLATES
// ============================================================

export const OperationsModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-slate-700 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/40 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-5/6 h-1 bg-white/30 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-slate-700 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-slate-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const OperationsClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-slate-600 pb-3 mb-3">
            <div className="w-1/2 h-3.5 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-1.5 bg-gray-500 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-slate-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-slate-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const OperationsProcessPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-slate-100 p-3 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700 flex-shrink-0" />
            <div>
                <div className="w-20 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-14 h-2 bg-slate-600 rounded" />
            </div>
        </div>
        <div className="flex items-center gap-1 mb-3">
            <div className="w-8 h-6 bg-slate-300 rounded" />
            <div className="w-4 h-0.5 bg-slate-400" />
            <div className="w-8 h-6 bg-slate-400 rounded" />
            <div className="w-4 h-0.5 bg-slate-400" />
            <div className="w-8 h-6 bg-slate-500 rounded" />
            <div className="w-4 h-0.5 bg-slate-400" />
            <div className="w-8 h-6 bg-slate-600 rounded" />
        </div>
        <div className="w-1/4 h-2.5 bg-slate-600 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-white rounded" />
            <div className="w-4/5 h-1.5 bg-white rounded" />
        </div>
    </div>
);

export const OperationsMinimalPreview = () => (
    <div className="w-full h-full bg-gray-50 p-4 flex flex-col pointer-events-none">
        <div className="mb-4">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-2 bg-slate-500 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-300 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-300 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-300 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-300 rounded" />
            </div>
        </div>
    </div>
);

export const OperationsExecutivePreview = () => (
    <div className="w-full h-full bg-[#fdfbf7] p-4 flex flex-col pointer-events-none">
        <div className="text-center mb-3">
            <div className="w-2/3 mx-auto h-4 bg-stone-800 rounded mb-2" />
            <div className="w-24 mx-auto h-0.5 bg-slate-500 mb-2" />
            <div className="w-1/2 mx-auto h-1.5 bg-stone-500 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-stone-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-stone-200 rounded" />
                <div className="w-5/6 h-1.5 bg-stone-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-stone-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-stone-200 rounded" />
                <div className="w-4/5 h-1.5 bg-stone-200 rounded" />
            </div>
        </div>
    </div>
);

// ============================================================
// HEALTHCARE TEMPLATES
// ============================================================

export const HealthcareModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-teal-600 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/40 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-5/6 h-1 bg-white/30 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-teal-600 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-teal-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const HealthcareClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-teal-600 pb-3 mb-3">
            <div className="w-1/2 h-3.5 bg-gray-900 rounded mb-2" />
            <div className="flex gap-2">
                <div className="w-14 h-1.5 bg-gray-400 rounded" />
                <div className="w-16 h-1.5 bg-gray-400 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-teal-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-teal-700 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="px-2 py-1 bg-teal-100 rounded w-10 h-2.5" />
                <div className="px-2 py-1 bg-teal-100 rounded w-8 h-2.5" />
            </div>
        </div>
    </div>
);

export const HealthcareClinicalPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-emerald-50 p-4 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-[10px]">MD</span>
            </div>
            <div>
                <div className="w-24 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-16 h-2 bg-teal-600 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-teal-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-white rounded" />
                <div className="w-5/6 h-1.5 bg-white rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-teal-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-white rounded" />
                <div className="w-4/5 h-1.5 bg-white rounded" />
            </div>
        </div>
    </div>
);

export const HealthcareMinimalPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="mb-4 pb-3 border-b border-gray-200">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-1.5 bg-teal-600 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-100 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-100 rounded" />
            </div>
        </div>
    </div>
);

export const HealthcarePharmaPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-1/3 bg-gradient-to-b from-teal-500 to-emerald-600 h-full p-3 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 mb-3" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/40 rounded mb-4" />
            <div className="space-y-1 w-full">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-5/6 h-1 bg-white/30 rounded" />
            </div>
        </div>
        <div className="w-2/3 p-3">
            <div className="w-1/3 h-2.5 bg-teal-600 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-teal-600 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

// ============================================================
// ACADEMIA & RESEARCH TEMPLATES
// ============================================================

export const AcademiaModernPreview = () => (
    <div className="w-full h-full bg-white flex pointer-events-none overflow-hidden">
        <div className="w-2/5 bg-indigo-700 h-full p-3 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-white/20 mb-3 mx-auto" />
            <div className="w-full h-2 bg-white/60 rounded mb-1" />
            <div className="w-3/4 h-1.5 bg-white/40 rounded mb-4 mx-auto" />
            <div className="w-1/2 h-2 bg-white rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1 bg-white/30 rounded" />
                <div className="w-5/6 h-1 bg-white/30 rounded" />
            </div>
        </div>
        <div className="w-3/5 p-3">
            <div className="w-1/3 h-2.5 bg-indigo-700 rounded mb-2" />
            <div className="space-y-1 mb-3">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
            </div>
            <div className="w-1/3 h-2.5 bg-indigo-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const AcademiaClassicPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="border-b-2 border-indigo-800 pb-3 mb-3">
            <div className="w-1/2 h-3.5 bg-gray-900 rounded mb-2" />
            <div className="flex gap-2">
                <div className="w-14 h-1.5 bg-gray-400 rounded" />
                <div className="w-16 h-1.5 bg-gray-400 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-indigo-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-11/12 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-indigo-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-200 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export const AcademiaResearchPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex flex-col pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex-shrink-0" />
            <div>
                <div className="w-24 h-3 bg-gray-800 rounded mb-1" />
                <div className="w-16 h-2 bg-indigo-600 rounded" />
            </div>
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-indigo-700 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-white rounded" />
                <div className="w-5/6 h-1.5 bg-white rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/4 h-2.5 bg-indigo-700 rounded mb-2" />
            <div className="flex gap-1.5 flex-wrap">
                <div className="h-2.5 w-10 bg-white rounded-full" />
                <div className="h-2.5 w-12 bg-white rounded-full" />
                <div className="h-2.5 w-8 bg-white rounded-full" />
            </div>
        </div>
    </div>
);

export const AcademiaMinimalPreview = () => (
    <div className="w-full h-full bg-gray-50 p-4 flex flex-col pointer-events-none">
        <div className="mb-4">
            <div className="w-1/2 h-4 bg-gray-900 rounded mb-2" />
            <div className="w-1/3 h-2 bg-indigo-600 rounded" />
        </div>
        <div className="mb-3">
            <div className="w-1/4 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-300 rounded" />
                <div className="w-5/6 h-1.5 bg-gray-300 rounded" />
            </div>
        </div>
        <div>
            <div className="w-1/5 h-2.5 bg-gray-800 rounded mb-2" />
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-gray-300 rounded" />
                <div className="w-4/5 h-1.5 bg-gray-300 rounded" />
            </div>
        </div>
    </div>
);

export const AcademiaPublicationsPreview = () => (
    <div className="w-full h-full bg-white p-4 flex flex-col pointer-events-none">
        <div className="text-center mb-3 pb-3 border-b border-indigo-200">
            <div className="w-2/3 mx-auto h-4 bg-indigo-800 rounded mb-2" />
            <div className="w-1/2 mx-auto h-1.5 bg-indigo-500 rounded" />
        </div>
        <div className="flex gap-3 mb-3">
            <div className="flex-1 bg-indigo-50 rounded-lg p-2 text-center">
                <div className="text-[10px] text-indigo-700 font-bold mb-1">25</div>
                <div className="w-full h-1 bg-indigo-200 rounded" />
            </div>
            <div className="flex-1 bg-indigo-50 rounded-lg p-2 text-center">
                <div className="text-[10px] text-indigo-700 font-bold mb-1">500+</div>
                <div className="w-full h-1 bg-indigo-200 rounded" />
            </div>
        </div>
        <div className="w-1/4 h-2.5 bg-indigo-700 rounded mb-2" />
        <div className="space-y-1">
            <div className="w-full h-1.5 bg-gray-200 rounded" />
            <div className="w-5/6 h-1.5 bg-gray-200 rounded" />
        </div>
    </div>
);

// ============================================================
// CATEGORY TEMPLATES DATA
// ============================================================

export const CATEGORY_TEMPLATES = {
    fresher: {
        name: 'Fresher & Entry-Level',
        description: 'Perfect for students and recent graduates',
        templates: [
            {
                id: 'fresher_classic',
                name: 'Academic Classic',
                description: 'Traditional format with emphasis on education. Perfect for fresh graduates.',
                PreviewComponent: FresherClassicPreview,
                color: 'from-emerald-500 to-green-600',
                sections: ['personalInfo', 'summary', 'education', 'skills', 'projects', 'certifications']
            },
            {
                id: 'fresher_modern',
                name: 'Fresh Start Modern',
                description: 'Sidebar layout highlighting skills. Great for showcasing tech abilities.',
                PreviewComponent: FresherModernPreview,
                color: 'from-teal-500 to-cyan-600',
                sections: ['personalInfo', 'summary', 'skills', 'education', 'projects', 'internships']
            },
            {
                id: 'fresher_minimal',
                name: 'Clean & Simple',
                description: 'Minimalist design that lets your potential shine. ATS-friendly format.',
                PreviewComponent: FresherMinimalPreview,
                color: 'from-gray-600 to-slate-700',
                sections: ['personalInfo', 'summary', 'education', 'skills', 'projects']
            },
            {
                id: 'fresher_bold',
                name: 'Young Professional',
                description: 'Dynamic dark theme with modern feel. Stand out from other freshers.',
                PreviewComponent: FresherBoldPreview,
                color: 'from-green-600 to-emerald-700',
                sections: ['personalInfo', 'summary', 'skills', 'education', 'projects', 'achievements']
            },
            {
                id: 'fresher_creative',
                name: 'Creative Graduate',
                description: 'Soft gradients with skill cards. For creative and design roles.',
                PreviewComponent: FresherCreativePreview,
                color: 'from-green-400 to-teal-500',
                sections: ['personalInfo', 'summary', 'portfolio', 'skills', 'education', 'awards']
            }
        ]
    },
    developer: {
        name: 'Software Developer',
        description: 'For programmers and tech professionals',
        templates: [
            {
                id: 'developer_terminal',
                name: 'Dev Terminal',
                description: 'Terminal-inspired design with code aesthetic. Perfect for developers.',
                PreviewComponent: DeveloperTerminalPreview,
                color: 'from-green-500 to-cyan-600',
                sections: ['personalInfo', 'summary', 'skills', 'experience', 'projects', 'education']
            },
            {
                id: 'developer_clean',
                name: 'Tech Professional',
                description: 'Clean layout with skill badges. Great for enterprise roles.',
                PreviewComponent: DeveloperCleanPreview,
                color: 'from-blue-500 to-indigo-600',
                sections: ['personalInfo', 'summary', 'skills', 'experience', 'projects', 'education']
            },
            {
                id: 'developer_github',
                name: 'GitHub Profile',
                description: 'Inspired by GitHub. Show contributions and pinned repos.',
                PreviewComponent: DeveloperGitHubPreview,
                color: 'from-gray-700 to-slate-800',
                sections: ['personalInfo', 'contributions', 'projects', 'skills', 'experience', 'education']
            },
            {
                id: 'developer_modern',
                name: 'Modern Developer',
                description: 'Two-column modern layout. Balance aesthetics and content.',
                PreviewComponent: DeveloperModernPreview,
                color: 'from-indigo-500 to-purple-600',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'projects', 'education']
            },
            {
                id: 'developer_minimal',
                name: 'Code Minimal',
                description: 'Distraction-free minimal design. Content-focused and ATS-friendly.',
                PreviewComponent: DeveloperMinimalPreview,
                color: 'from-gray-600 to-indigo-700',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'education']
            }
        ]
    },
    data: {
        name: 'Data & Analytics',
        description: 'For data scientists and analysts',
        templates: [
            {
                id: 'data_analytics',
                name: 'Analytics Pro',
                description: 'Clean design with data visualization elements. Best for analysts.',
                PreviewComponent: DataAnalyticsPreview,
                color: 'from-cyan-500 to-sky-600',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'projects', 'education']
            },
            {
                id: 'data_scientist',
                name: 'Data Scientist',
                description: 'Dark theme with metric cards. Great for ML/AI professionals.',
                PreviewComponent: DataScientistPreview,
                color: 'from-blue-600 to-cyan-700',
                sections: ['personalInfo', 'summary', 'skills', 'experience', 'projects', 'publications']
            },
            {
                id: 'data_modern',
                name: 'Modern Analyst',
                description: 'Sidebar with skill bars. Show competency levels clearly.',
                PreviewComponent: DataModernPreview,
                color: 'from-sky-500 to-blue-600',
                sections: ['personalInfo', 'summary', 'skills', 'experience', 'projects', 'education']
            },
            {
                id: 'data_classic',
                name: 'Business Intelligence',
                description: 'Traditional corporate format. Safe for any organization.',
                PreviewComponent: DataClassicPreview,
                color: 'from-sky-600 to-cyan-700',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'education', 'certifications']
            },
            {
                id: 'data_infographic',
                name: 'Data Infographic',
                description: 'Visual-heavy with metric highlights. Make numbers pop.',
                PreviewComponent: DataInfographicPreview,
                color: 'from-cyan-400 to-sky-500',
                sections: ['personalInfo', 'metrics', 'experience', 'skills', 'education', 'certifications']
            }
        ]
    },
    business: {
        name: 'Business & Management',
        description: 'For managers, executives, and consultants',
        templates: [
            {
                id: 'business_executive',
                name: 'Executive Elite',
                description: 'Premium design for senior leadership. Commands attention.',
                PreviewComponent: BusinessExecutivePreview,
                color: 'from-stone-700 to-amber-800',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'education', 'boards']
            },
            {
                id: 'business_modern',
                name: 'Manager Modern',
                description: 'Two-column professional layout. Balance of style and substance.',
                PreviewComponent: BusinessModernPreview,
                color: 'from-purple-600 to-indigo-700',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'education', 'certifications']
            },
            {
                id: 'business_classic',
                name: 'Corporate Classic',
                description: 'Timeless professional format. Works across all industries.',
                PreviewComponent: BusinessClassicPreview,
                color: 'from-gray-700 to-slate-800',
                sections: ['personalInfo', 'summary', 'experience', 'education', 'skills']
            },
            {
                id: 'business_minimal',
                name: 'Business Minimal',
                description: 'Clean focus on achievements. Less is more approach.',
                PreviewComponent: BusinessMinimalPreview,
                color: 'from-gray-600 to-purple-700',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'education']
            },
            {
                id: 'business_consultant',
                name: 'Consultant Pro',
                description: 'Highlight consulting experience. Built for client-facing roles.',
                PreviewComponent: BusinessConsultantPreview,
                color: 'from-purple-500 to-indigo-600',
                sections: ['personalInfo', 'summary', 'engagements', 'skills', 'education', 'certifications']
            }
        ]
    },
    finance: {
        name: 'Finance & Accounting',
        description: 'For bankers, accountants, and finance pros',
        templates: [
            {
                id: 'finance_classic',
                name: 'Banker Classic',
                description: 'Traditional finance format. Industry-standard professionalism.',
                PreviewComponent: FinanceClassicPreview,
                color: 'from-amber-600 to-yellow-700',
                sections: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'certifications']
            },
            {
                id: 'finance_modern',
                name: 'Finance Modern',
                description: 'Sleek dark sidebar design. For forward-thinking finance pros.',
                PreviewComponent: FinanceModernPreview,
                color: 'from-gray-700 to-amber-800',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'education', 'certifications']
            },
            {
                id: 'finance_executive',
                name: 'CFO Executive',
                description: 'Premium design for senior finance leadership positions.',
                PreviewComponent: FinanceExecutivePreview,
                color: 'from-stone-600 to-amber-700',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'education', 'boards']
            },
            {
                id: 'finance_minimal',
                name: 'Clean Ledger',
                description: 'Minimalist professional design. ATS-optimized for finance roles.',
                PreviewComponent: FinanceMinimalPreview,
                color: 'from-gray-600 to-slate-700',
                sections: ['personalInfo', 'summary', 'experience', 'education', 'skills']
            },
            {
                id: 'finance_investment',
                name: 'Investment Pro',
                description: 'Dark premium theme with metrics. For investment banking and PE.',
                PreviewComponent: FinanceInvestmentPreview,
                color: 'from-slate-700 to-amber-800',
                sections: ['personalInfo', 'summary', 'deals', 'experience', 'education', 'skills']
            }
        ]
    },
    creative: {
        name: 'Design & Creative',
        description: 'For designers, artists, and creative professionals',
        templates: [
            {
                id: 'creative_portfolio',
                name: 'Portfolio Pro',
                description: 'Dark sidebar with portfolio focus. Let your work shine.',
                PreviewComponent: CreativePortfolioPreview,
                color: 'from-pink-500 to-rose-600',
                sections: ['personalInfo', 'summary', 'portfolio', 'experience', 'skills', 'education']
            },
            {
                id: 'creative_minimal',
                name: 'Designer Minimal',
                description: 'Clean with profile photo. For refined design sensibilities.',
                PreviewComponent: CreativeMinimalPreview,
                color: 'from-rose-400 to-pink-500',
                sections: ['personalInfo', 'summary', 'experience', 'projects', 'skills', 'education']
            },
            {
                id: 'creative_bold',
                name: 'Creative Bold',
                description: 'Dramatic dark theme with gradients. Make a statement.',
                PreviewComponent: CreativeBoldPreview,
                color: 'from-fuchsia-500 to-purple-600',
                sections: ['personalInfo', 'summary', 'portfolio', 'experience', 'skills', 'awards']
            },
            {
                id: 'creative_modern',
                name: 'Modern Creative',
                description: 'Soft gradients with project cards. Fresh and contemporary.',
                PreviewComponent: CreativeModernPreview,
                color: 'from-rose-400 to-orange-500',
                sections: ['personalInfo', 'summary', 'projects', 'experience', 'skills', 'education']
            },
            {
                id: 'creative_artistic',
                name: 'Artistic Flow',
                description: 'Asymmetric design with artistic touches. For boundary pushers.',
                PreviewComponent: CreativeArtisticPreview,
                color: 'from-pink-400 to-rose-500',
                sections: ['personalInfo', 'summary', 'experience', 'projects', 'skills', 'exhibitions']
            }
        ]
    },
    marketing: {
        name: 'Marketing & Sales',
        description: 'For marketers, growth hackers, and sales leaders',
        templates: [
            {
                id: 'marketing_modern',
                name: 'Growth Modern',
                description: 'Bold sidebar design. Show your marketing prowess.',
                PreviewComponent: MarketingModernPreview,
                color: 'from-red-500 to-rose-600',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'skills', 'education']
            },
            {
                id: 'marketing_bold',
                name: 'Metrics Master',
                description: 'Dark theme with KPI highlights. Data-driven marketers shine here.',
                PreviewComponent: MarketingBoldPreview,
                color: 'from-orange-500 to-red-600',
                sections: ['personalInfo', 'summary', 'metrics', 'experience', 'skills', 'campaigns']
            },
            {
                id: 'marketing_classic',
                name: 'Marketing Classic',
                description: 'Traditional format with modern touches. Safe for any marketing role.',
                PreviewComponent: MarketingClassicPreview,
                color: 'from-red-600 to-rose-700',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'education', 'certifications']
            },
            {
                id: 'marketing_growth',
                name: 'Growth Hacker',
                description: 'Visual design with growth charts. For startup and scale-up roles.',
                PreviewComponent: MarketingGrowthPreview,
                color: 'from-orange-400 to-red-500',
                sections: ['personalInfo', 'summary', 'metrics', 'experience', 'experiments', 'skills']
            },
            {
                id: 'marketing_minimal',
                name: 'Sales Minimal',
                description: 'Clean professional format. ATS-friendly for large corporations.',
                PreviewComponent: MarketingMinimalPreview,
                color: 'from-gray-600 to-red-700',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'skills', 'education']
            }
        ]
    },
    operations: {
        name: 'Operations & Supply Chain',
        description: 'For operations managers and logistics experts',
        templates: [
            {
                id: 'operations_modern',
                name: 'Ops Modern',
                description: 'Clean sidebar layout. Professional and efficient.',
                PreviewComponent: OperationsModernPreview,
                color: 'from-slate-600 to-gray-700',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'skills', 'education']
            },
            {
                id: 'operations_classic',
                name: 'Operations Classic',
                description: 'Traditional format. Works for any operations role.',
                PreviewComponent: OperationsClassicPreview,
                color: 'from-gray-600 to-slate-700',
                sections: ['personalInfo', 'summary', 'experience', 'skills', 'education', 'certifications']
            },
            {
                id: 'operations_process',
                name: 'Process Pro',
                description: 'Visual process flow design. Show your systematic thinking.',
                PreviewComponent: OperationsProcessPreview,
                color: 'from-slate-500 to-gray-600',
                sections: ['personalInfo', 'summary', 'processes', 'experience', 'skills', 'certifications']
            },
            {
                id: 'operations_minimal',
                name: 'Lean Resume',
                description: 'Minimalist and efficient. Just like good operations.',
                PreviewComponent: OperationsMinimalPreview,
                color: 'from-gray-500 to-slate-600',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'skills']
            },
            {
                id: 'operations_executive',
                name: 'COO Executive',
                description: 'Premium design for senior operations leadership.',
                PreviewComponent: OperationsExecutivePreview,
                color: 'from-stone-600 to-gray-700',
                sections: ['personalInfo', 'summary', 'experience', 'achievements', 'education', 'boards']
            }
        ]
    },
    healthcare: {
        name: 'Healthcare & Life Sciences',
        description: 'For medical professionals and researchers',
        templates: [
            {
                id: 'healthcare_modern',
                name: 'Medical Modern',
                description: 'Clean sidebar design. Professional healthcare aesthetic.',
                PreviewComponent: HealthcareModernPreview,
                color: 'from-teal-500 to-cyan-600',
                sections: ['personalInfo', 'summary', 'experience', 'certifications', 'skills', 'education']
            },
            {
                id: 'healthcare_classic',
                name: 'Clinical Classic',
                description: 'Traditional medical format. Industry standard layout.',
                PreviewComponent: HealthcareClassicPreview,
                color: 'from-teal-600 to-emerald-700',
                sections: ['personalInfo', 'summary', 'experience', 'education', 'certifications', 'publications']
            },
            {
                id: 'healthcare_clinical',
                name: 'Doctor CV',
                description: 'Credentialed format with degree highlight. For physicians.',
                PreviewComponent: HealthcareClinicalPreview,
                color: 'from-emerald-500 to-teal-600',
                sections: ['personalInfo', 'summary', 'training', 'experience', 'certifications', 'publications']
            },
            {
                id: 'healthcare_minimal',
                name: 'Health Minimal',
                description: 'Simple professional format. ATS-optimized for healthcare.',
                PreviewComponent: HealthcareMinimalPreview,
                color: 'from-gray-500 to-teal-600',
                sections: ['personalInfo', 'summary', 'experience', 'education', 'skills']
            },
            {
                id: 'healthcare_pharma',
                name: 'Pharma Pro',
                description: 'Pharmaceutical industry focus. For drug development and research.',
                PreviewComponent: HealthcarePharmaPreview,
                color: 'from-teal-400 to-emerald-500',
                sections: ['personalInfo', 'summary', 'experience', 'research', 'publications', 'education']
            }
        ]
    },
    academia: {
        name: 'Research & Academia',
        description: 'For professors, researchers, and PhD candidates',
        templates: [
            {
                id: 'academia_modern',
                name: 'Academic Modern',
                description: 'Contemporary CV format. Fresh take on academic tradition.',
                PreviewComponent: AcademiaModernPreview,
                color: 'from-indigo-600 to-purple-700',
                sections: ['personalInfo', 'summary', 'positions', 'publications', 'education', 'grants']
            },
            {
                id: 'academia_classic',
                name: 'Scholar Classic',
                description: 'Traditional academic CV. Time-tested format for academia.',
                PreviewComponent: AcademiaClassicPreview,
                color: 'from-indigo-700 to-blue-800',
                sections: ['personalInfo', 'positions', 'education', 'publications', 'conferences', 'grants']
            },
            {
                id: 'academia_research',
                name: 'Research Focus',
                description: 'Publication-centric layout. Highlight your research output.',
                PreviewComponent: AcademiaResearchPreview,
                color: 'from-blue-600 to-indigo-700',
                sections: ['personalInfo', 'research', 'publications', 'positions', 'education', 'grants']
            },
            {
                id: 'academia_minimal',
                name: 'PhD Minimal',
                description: 'Clean modern format for emerging academics.',
                PreviewComponent: AcademiaMinimalPreview,
                color: 'from-gray-600 to-indigo-700',
                sections: ['personalInfo', 'summary', 'education', 'publications', 'experience', 'skills']
            },
            {
                id: 'academia_publications',
                name: 'Publications CV',
                description: 'Citation-focused layout. For prolific researchers.',
                PreviewComponent: AcademiaPublicationsPreview,
                color: 'from-indigo-500 to-violet-600',
                sections: ['personalInfo', 'publications', 'citations', 'positions', 'education', 'conferences']
            }
        ]
    }
};

export default CATEGORY_TEMPLATES;
