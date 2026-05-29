/**
 * Database Seeder and Migration Helper for Resume Builder
 * Run this script to seed default settings and templates.
 * Usage: node scripts/supabase_migrate.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase credentials not found in environment');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEFAULT_SETTINGS = {
    siteName: 'ResumeAI',
    maintenanceMode: false,
    allowRegistration: true,
    proPlanPrice: '9.99',
    defaultTheme: 'dark',
    aiModel: 'gemini-1.5-flash',
    contactEmail: 'support@resumeai.com',
    templateCategories: [
        { id: 'fresher', name: 'Fresher & Entry-Level', description: 'Perfect for students and recent graduates', icon: '🎓', color: 'from-amber-500 to-orange-600', order: 1, visible: true },
        { id: 'developer', name: 'Software Developer', description: 'For programmers and tech professionals', icon: '💻', color: 'from-yellow-500 to-amber-600', order: 2, visible: true },
        { id: 'corporate', name: 'Corporate & Managerial', description: 'For managers, executives, and corporate professionals', icon: '👔', color: 'from-orange-500 to-red-600', order: 3, visible: true },
        { id: 'creative', name: 'Design & Creative', description: 'For designers, artists, and creatives', icon: '🎨', color: 'from-yellow-400 to-orange-500', order: 4, visible: true }
    ],
};

const fallbackSchemas = require('../server/src/prompts/fallbackSchemas');

const templatesToSeed = [
    {
        name: 'Fresher & Entry-Level',
        description: 'Clean, linear design tailored for students, entry-level professionals, and career changers.',
        category: 'fresher',
        layout: 'single-column',
        color: 'from-amber-500 to-orange-600',
        sections: fallbackSchemas.fresher.sections,
        is_premium: false,
        is_active: true,
        display_order: 1,
        styles: { spacing: 'normal', fontFamily: 'Inter' }
    },
    {
        name: 'Software Developer',
        description: 'Tech-focused layout emphasizing language proficiencies, tools, open-source projects, and achievements.',
        category: 'developer',
        layout: 'single-column',
        color: 'from-yellow-500 to-amber-600',
        sections: fallbackSchemas.developer.sections,
        is_premium: false,
        is_active: true,
        display_order: 2,
        styles: { spacing: 'normal', fontFamily: 'JetBrains Mono' }
    },
    {
        name: 'Corporate & Managerial',
        description: 'Elegant design prioritizing executive experience, quantitative results, and leadership competencies.',
        category: 'corporate',
        layout: 'single-column',
        color: 'from-orange-500 to-red-600',
        sections: fallbackSchemas.corporate.sections,
        is_premium: false,
        is_active: true,
        display_order: 3,
        styles: { spacing: 'normal', fontFamily: 'Inter' }
    },
    {
        name: 'Design & Creative',
        description: 'Impactful visual design built to showcase creative portfolios, key projects, and tools.',
        category: 'creative',
        layout: 'single-column',
        color: 'from-yellow-400 to-orange-500',
        sections: fallbackSchemas.creative.sections,
        is_premium: false,
        is_active: true,
        display_order: 4,
        styles: { spacing: 'normal', fontFamily: 'Inter' }
    }
];

async function seedDatabase() {
    console.log('⏳ Initializing migration and seed checks...');

    try {
        // 1. Seed system settings
        console.log('📦 Checking system_settings...');
        const { data: settingsCheck, error: settingsError } = await supabase
            .from('system_settings')
            .select('id')
            .limit(1);

        if (settingsError) {
            console.error('❌ Could not query system_settings. Ensure you run scripts/create_supabase_schema.sql in your Supabase SQL Editor first.');
            throw settingsError;
        }

        if (settingsCheck.length === 0) {
            console.log('   - system_settings is empty. Seeding defaults...');
            const { error: seedSettingsErr } = await supabase
                .from('system_settings')
                .insert({ config: DEFAULT_SETTINGS });

            if (seedSettingsErr) throw seedSettingsErr;
            console.log('   ✅ Seeded system_settings successfully.');
        } else {
            console.log('   ✅ system_settings already contains records.');
        }

        // 2. Seed templates
        console.log('📦 Checking templates...');
        const { data: templatesCheck, error: templatesError } = await supabase
            .from('templates')
            .select('id')
            .limit(1);

        if (templatesError) {
            console.error('❌ Could not query templates. Ensure you run scripts/create_supabase_schema.sql in your Supabase SQL Editor first.');
            throw templatesError;
        }

        if (templatesCheck.length === 0) {
            console.log('   - templates is empty. Seeding professional templates...');
            const { error: seedTemplatesErr } = await supabase
                .from('templates')
                .insert(templatesToSeed);

            if (seedTemplatesErr) throw seedTemplatesErr;
            console.log('   ✅ Seeded templates successfully.');
        } else {
            console.log('   ✅ templates table already contains records.');
        }

        console.log('\n🚀 Database migration and seeding checks finished successfully!');

    } catch (err) {
        console.error('\n❌ Unexpected error running seed:', err.message || err);
        process.exit(1);
    }
    process.exit(0);
}

seedDatabase();
