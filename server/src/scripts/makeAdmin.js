/**
 * Script to make a user an admin
 * Usage: node src/scripts/makeAdmin.js <email>
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const { MONGO_URI } = require('../config/env');

async function makeAdmin() {
    const email = process.argv[2];
    
    if (!email) {
        console.error('❌ Please provide an email address');
        console.log('Usage: node src/scripts/makeAdmin.js <email>');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(MONGO_URI);
        console.log('📦 Connected to MongoDB');
        
        const user = await User.findOne({ email });
        
        if (!user) {
            console.error(`❌ User with email ${email} not found`);
            process.exit(1);
        }
        
        user.isAdmin = true;
        await user.save();
        
        console.log(`✅ User ${user.name} (${email}) is now an admin!`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

makeAdmin();
