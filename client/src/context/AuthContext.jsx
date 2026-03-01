import { createContext, useContext, useEffect, useReducer } from 'react';
import { authService } from '../services/resumeService';

const AuthContext = createContext(null);

const initialState = {
    user: { id: 'guest', name: 'Guest User', email: 'guest@example.com', aiCredits: 999 },
    token: 'guest-token',
    loading: false,
    error: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload.user, token: action.payload.token, loading: false, error: null };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'LOGOUT':
            return { ...state, user: null, token: null, loading: false };
        case 'UPDATE_USER':
            return { ...state, user: { ...state.user, ...action.payload } };
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (email, password) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const { data } = await authService.login({ email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            return data;
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed';
            dispatch({ type: 'SET_ERROR', payload: msg });
            throw new Error(msg);
        }
    };

    const register = async (name, email, password) => {
        dispatch({ type: 'SET_LOADING' });
        try {
            const { data } = await authService.register({ name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            return data;
        } catch (err) {
            const msg = err.response?.data?.error || 'Registration failed';
            dispatch({ type: 'SET_ERROR', payload: msg });
            throw new Error(msg);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    // Verify token on mount
    useEffect(() => {
        // Token verification disabled for guest access
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

export default AuthContext;
