const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

async function createAdmin() {
    const name = 'Amresh Anand';
    const email = 'amreshanand8241@gmail.com';
    const password = 'Amresh@8241';

    console.log(`⏳ Creating admin user: ${email}...`);

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const { data, error } = await supabase
            .from('users')
            .upsert({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                is_admin: true,
                plan: 'pro'
            }, { onConflict: 'email' })
            .select();

        if (error) {
            console.error('❌ Error creating admin:', error.message);
        } else {
            console.log('✅ Admin user created successfully!');
            console.log(`📧 Email: ${email}`);
            console.log(`🔑 Password: ${password}`);
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err);
    }
}

createAdmin();
