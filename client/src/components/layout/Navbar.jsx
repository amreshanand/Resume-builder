import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/90 backdrop-blur-xl"
            style={{ transform: 'translateZ(0)' }}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 no-underline group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[var(--primary)]/20 transition-transform group-hover:scale-110 duration-500">
                        R
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white group-hover:text-[var(--primary-light)] transition-colors">
                        ResumeAI
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        to="/templates"
                        className="text-[0.9375rem] font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Templates
                    </Link>

                    {user && (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-[0.9375rem] font-medium text-slate-400 hover:text-white transition-colors"
                            >
                                Dashboard
                            </Link>

                            {user.isAdmin && (
                                <Link
                                    to="/admin"
                                    className="text-[0.9375rem] font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Admin
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="text-[0.9375rem] font-medium text-red-400 hover:text-red-300 transition-colors bg-transparent border-none cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!user && (
                        <Link
                            to="/login"
                            className="px-5 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:brightness-110 text-white text-[0.9375rem] font-semibold rounded-lg transition-all no-underline shadow-lg shadow-indigo-500/20"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
