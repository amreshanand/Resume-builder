const supabase = require('./src/config/supabase');

async function listUsers() {
    const { data: users, error } = await supabase
        .from('users')
        .select('id, name, email, is_admin');
    
    if (error) {
        console.error('❌ Error fetching users:', error.message);
        return;
    }
    
    console.log('👥 Users in database:');
    console.table(users);
}

listUsers();
