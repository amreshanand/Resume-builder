import { createContext, useContext, useEffect, useReducer } from 'react';
import { authService } from '../services/resumeService';

const AuthContext = createContext(null);

const initialState = {
    user: null,
    token: null,
    loading: true,
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
            let msg = 'Login failed';
            if (err.response?.data?.error) {
                const errorData = err.response.data.error;
                msg = typeof errorData === 'string' 
                    ? errorData 
                    : (errorData.message || JSON.stringify(errorData, null, 2));
            } else if (err.message) {
                msg = err.message;
            } else if (typeof err === 'object') {
                msg = JSON.stringify(err, null, 2);
            }
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
            let msg = 'Registration failed';
            if (err.response?.data?.error) {
                const errorData = err.response.data.error;
                msg = typeof errorData === 'string' ? errorData : (errorData.message || JSON.stringify(errorData));
            } else if (err.message) {
                msg = err.message;
            }
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
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await authService.getMe();
                    // Assumes response has { data: user } or just { user } 
                    // Let's rely on localStorage cache first for fast render, then verify
                    const user = response.data || response;
                    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
                } catch (err) {
                    console.error('Session expired', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    dispatch({ type: 'LOGOUT' });
                }
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        };
        initAuth();
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
