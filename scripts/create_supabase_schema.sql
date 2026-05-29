/* Supabase schema for Resume Builder */

-- 1. Users table
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    plan text NOT NULL DEFAULT 'free', -- free | pro
    ai_credits integer NOT NULL DEFAULT 10,
    ai_credits_reset_at timestamp with time zone DEFAULT now(),
    resume_count integer DEFAULT 0,
    is_admin boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 2. Templates table
CREATE TABLE IF NOT EXISTS public.templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    category text NOT NULL,
    layout text DEFAULT 'single-column',
    color text,
    sections jsonb DEFAULT '[]',
    preview_image text,
    is_premium boolean DEFAULT false,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    styles jsonb DEFAULT '{}',
    usage_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 3. Resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    title text DEFAULT 'Untitled Resume',
    template_type text NOT NULL,
    template_id text NOT NULL,
    sections jsonb DEFAULT '{}',
    ats_score integer DEFAULT NULL,
    ats_feedback jsonb DEFAULT '[]',
    form_schema jsonb DEFAULT NULL,
    status text DEFAULT 'draft',
    share_slug text UNIQUE,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 4. System settings table
CREATE TABLE IF NOT EXISTS public.system_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    config jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- 5. AI cache table
CREATE TABLE IF NOT EXISTS public.ai_cache (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id uuid REFERENCES public.resumes(id) ON DELETE CASCADE,
    type text NOT NULL, -- e.g., 'summary', 'skills', 'experience'
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Indexes for quick lookup
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON public.resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_templates_category ON public.templates(category);

-- Trigger to update updated_at automatically on row changes
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_resumes_updated_at ON public.resumes;
CREATE TRIGGER trg_resumes_updated_at BEFORE UPDATE ON public.resumes
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_templates_updated_at ON public.templates;
CREATE TRIGGER trg_templates_updated_at BEFORE UPDATE ON public.templates
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
