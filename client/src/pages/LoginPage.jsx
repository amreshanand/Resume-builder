import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            const msg = typeof err === 'string' 
                ? err 
                : (err.message || (typeof err === 'object' ? JSON.stringify(err, null, 2) : String(err)));
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="w-full max-w-md slide-up">
                <div className="glass rounded-2xl p-10 border border-white/10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-500/30">
                            R
                        </div>
                        <h1 className="text-3xl font-bold gradient-text mb-3">Welcome Back</h1>
                        <p className="text-base text-[var(--text-muted)]">Sign in to continue building amazing resumes</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Email</label>
                            <input type="email" className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Password</label>
                            <input type="password" className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn-primary w-full justify-center text-base py-3.5" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-[0.9375rem] text-[var(--text-muted)] mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[var(--primary-light)] hover:underline font-semibold">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
