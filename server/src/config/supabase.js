const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_ANON_KEY } = require('./env');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase credentials not found. Database operations will fail.');
}

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : { from: () => ({ select: () => ({ order: () => ({ limit: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }) }) }) };

module.exports = supabase;
