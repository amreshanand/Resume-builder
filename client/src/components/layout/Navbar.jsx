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
            className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-black/90"
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
                    {/* Auth options removed for now */}
                </div>
            </div>
        </nav>
    );
}
