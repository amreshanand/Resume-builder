/**
 * Script to make a user an admin (Supabase version)
 * Usage: node src/scripts/makeAdminSupabase.js <email>
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase credentials not found in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function makeAdmin() {
    const email = process.argv[2];
    
    if (!email) {
        console.error('❌ Please provide an email address');
        console.log('Usage: node src/scripts/makeAdminSupabase.js <email>');
        process.exit(1);
    }
    
    console.log(`⏳ Searching for user: ${email}...`);
    
    try {
        const { data: user, error: findError } = await supabase
            .from('users')
            .select('id, name')
            .eq('email', email.toLowerCase())
            .single();
            
        if (findError || !user) {
            console.error(`❌ User with email ${email} not found:`, findError?.message);
            process.exit(1);
        }
        
        console.log(`📦 Found user: ${user.name} (ID: ${user.id})`);
        
        const { error: updateError } = await supabase
            .from('users')
            .update({ is_admin: true })
            .eq('id', user.id);
            
        if (updateError) {
            throw updateError;
        }
        
        console.log(`✅ User ${user.name} (${email}) is now an admin!`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        process.exit(0);
    }
}

makeAdmin();
