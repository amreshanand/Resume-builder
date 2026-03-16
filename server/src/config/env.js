require('dotenv').config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
};

// Required variables validation
const required = ['JWT_SECRET', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];
required.forEach(key => {
    if (!config[key]) {
        console.error(`❌ Critical Environment Variable Missing: ${key}`);
    }
});

module.exports = config;
