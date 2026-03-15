const supabase = require('../config/supabase');
const { nanoid } = require('nanoid');

exports.createResume = async (req, res, next) => {
    try {
        const { title, templateType, templateId } = req.body;

        const { data: resume, error } = await supabase
            .from('resumes')
            .insert({
                user_id: req.user.id,
                title: title || 'Untitled Resume',
                template_type: templateType,
                template_id: templateId || templateType,
            })
            .select('*')
            .single();

        if (error) throw error;

        res.status(201).json({ success: true, data: mapResume(resume) });
    } catch (error) {
        next(error);
    }
};

exports.getResumes = async (req, res, next) => {
    try {
        const { data: resumes, error } = await supabase
            .from('resumes')
            .select('id, title, template_type, status, ats_score, updated_at')
            .eq('user_id', req.user.id)
            .order('updated_at', { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            data: resumes.map(r => ({
                _id: r.id,
                title: r.title,
                templateType: r.template_type,
                status: r.status,
                atsScore: r.ats_score,
                updatedAt: r.updated_at,
            })),
        });
    } catch (error) {
        next(error);
    }
};

exports.getResume = async (req, res, next) => {
    try {
        const { data: resume, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('id', req.params.id)
            .eq('user_id', req.user.id)
            .single();

        if (!resume || error) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        res.json({ success: true, data: mapResume(resume) });
    } catch (error) {
        next(error);
    }
};

exports.updateResume = async (req, res, next) => {
    try {
        const { sections, title, status, formSchema } = req.body;
        const update = { updated_at: new Date().toISOString() };
        if (sections !== undefined) update.sections = sections;
        if (title) update.title = title;
        if (status) update.status = status;
        if (formSchema) update.form_schema = formSchema;

        const { data: resume, error } = await supabase
            .from('resumes')
            .update(update)
            .eq('id', req.params.id)
            .eq('user_id', req.user.id)
            .select('*')
            .single();

        if (!resume || error) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        res.json({ success: true, data: mapResume(resume) });
    } catch (error) {
        next(error);
    }
};

exports.deleteResume = async (req, res, next) => {
    try {
        const { error } = await supabase
            .from('resumes')
            .delete()
            .eq('id', req.params.id)
            .eq('user_id', req.user.id);

        if (error) throw error;

        res.json({ success: true, message: 'Resume deleted' });
    } catch (error) {
        next(error);
    }
};

exports.shareResume = async (req, res, next) => {
    try {
        const { data: resume, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('id', req.params.id)
            .eq('user_id', req.user.id)
            .single();

        if (!resume || error) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        let shareSlug = resume.share_slug;
        if (!shareSlug) {
            shareSlug = nanoid(10);
            await supabase
                .from('resumes')
                .update({ share_slug: shareSlug })
                .eq('id', resume.id);
        }

        const { data: user } = await supabase
            .from('users')
            .select('name')
            .eq('id', req.user.id)
            .single();

        const username = user ? user.name.replace(/\s+/g, '-').toLowerCase() : 'user';

        res.json({
            success: true,
            data: { shareSlug, shareUrl: `/resume/${username}/${shareSlug}` },
        });
    } catch (error) {
        next(error);
    }
};

exports.getPublicResume = async (req, res, next) => {
    try {
        const { data: resume, error } = await supabase
            .from('resumes')
            .select('id, title, template_type, template_id, sections, ats_score, ats_feedback, form_schema, status, share_slug, created_at, updated_at')
            .eq('share_slug', req.params.id)
            .single();

        if (!resume || error) {
            return res.status(404).json({ success: false, error: 'Resume not found' });
        }

        res.json({ success: true, data: mapResume(resume) });
    } catch (error) {
        next(error);
    }
};

// Helper: map Supabase snake_case → Mongoose-compatible camelCase
function mapResume(r) {
    return {
        _id: r.id,
        userId: r.user_id,
        title: r.title,
        templateType: r.template_type,
        templateId: r.template_id,
        sections: r.sections || {},
        atsScore: r.ats_score,
        atsFeedback: r.ats_feedback || [],
        formSchema: r.form_schema,
        status: r.status,
        shareSlug: r.share_slug,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
    };
}
