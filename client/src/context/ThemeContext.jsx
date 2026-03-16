import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'theme_preference'; // 'light' | 'dark' | 'system'

function getSystemTheme() {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeToDom(theme) {
    const root = document.documentElement;
    root.dataset.theme = theme;
}

export function ThemeProvider({ children }) {
    const [preference, setPreference] = useState('system');
    const [defaultTheme, setDefaultTheme] = useState('dark');

    // Load preference + default from server
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') setPreference(saved);
        (async () => {
            try {
                const { data } = await api.get('/public/settings');
                const t = data?.data?.defaultTheme;
                if (t === 'light' || t === 'dark' || t === 'system') setDefaultTheme(t);
            } catch {
                // ignore
            }
        })();
    }, []);

    const effectiveTheme = useMemo(() => {
        const pref = preference === 'system' ? (defaultTheme === 'system' ? 'system' : defaultTheme) : preference;
        if (pref === 'system') return getSystemTheme();
        return pref;
    }, [preference, defaultTheme]);

    // Apply and react to OS changes when in system mode
    useEffect(() => {
        applyThemeToDom(effectiveTheme);
    }, [effectiveTheme]);

    useEffect(() => {
        if (preference !== 'system' && defaultTheme !== 'system') return;
        if (!window.matchMedia) return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => {
            const next = (preference === 'system' ? (defaultTheme === 'system' ? 'system' : defaultTheme) : preference);
            applyThemeToDom(next === 'system' ? getSystemTheme() : next);
        };
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, [preference, defaultTheme]);

    const setThemePreference = (next) => {
        const v = next === 'light' || next === 'dark' || next === 'system' ? next : 'system';
        setPreference(v);
        localStorage.setItem(STORAGE_KEY, v);
    };

    return (
        <ThemeContext.Provider value={{ preference, defaultTheme, effectiveTheme, setThemePreference }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}

