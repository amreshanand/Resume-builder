const supabase = require('../config/supabase');

const DEFAULT_SETTINGS = {
    siteName: 'ResumeAI',
    maintenanceMode: false,
    allowRegistration: true,
    proPlanPrice: '9.99',
    defaultTheme: 'dark', // 'dark' | 'light' | 'system'
    aiModel: 'gemini-1.5-flash',
    contactEmail: 'support@resumeai.com',
    templateCategories: [],
};

let cached = null;
let cachedAt = 0;
const TTL_MS = 30_000;

async function fetchLatestSettings() {
    const { data: settings, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error || !settings) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(settings.config || {}) };
}

async function getSystemSettings({ force = false } = {}) {
    const now = Date.now();
    if (!force && cached && now - cachedAt < TTL_MS) return cached;
    cached = await fetchLatestSettings();
    cachedAt = now;
    return cached;
}

module.exports = { DEFAULT_SETTINGS, getSystemSettings };

