-- ============================================
-- Supabase Database Schema for Resume Builder
-- Run this SQL in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    plan VARCHAR(10) DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
    ai_credits INTEGER DEFAULT 10,
    ai_credits_reset_at TIMESTAMPTZ DEFAULT now(),
    resume_count INTEGER DEFAULT 0,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) DEFAULT 'Untitled Resume',
    template_type VARCHAR(50) NOT NULL,
    template_id VARCHAR(100) NOT NULL,
    sections JSONB DEFAULT '{}',
    ats_score INTEGER DEFAULT NULL,
    ats_feedback JSONB DEFAULT '[]',
    form_schema JSONB DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'complete')),
    share_slug VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Templates table
CREATE TABLE IF NOT EXISTS templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    layout VARCHAR(50) DEFAULT 'single-column',
    color VARCHAR(100),
    sections JSONB DEFAULT '[]',
    preview_image TEXT,
    is_premium BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    styles JSONB DEFAULT '{}',
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Allow public read access for templates (anon key will work)
CREATE POLICY "Templates are publicly readable"
    ON templates FOR SELECT
    USING (is_active = true);

-- Allow full access via service role (your server uses anon key with policies, or service key for full access)
-- For development, we allow all operations through the anon key:
CREATE POLICY "Allow all for authenticated users on users"
    ON users FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users on resumes"
    ON resumes FOR ALL
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow all for templates management"
    ON templates FOR ALL
    USING (true)
    WITH CHECK (true);
