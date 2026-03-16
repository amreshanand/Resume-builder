const supabase = require('../config/supabase');
const { getSystemSettings } = require('../utils/systemSettings');

// Helper: generate slug from name
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// Helper: map snake_case → camelCase
function mapTemplate(t) {
    return {
        _id: t.id,
        name: t.name,
        slug: generateSlug(t.name),
        description: t.description,
        category: t.category,
        layout: t.layout,
        color: t.color,
        sections: t.sections || [],
        previewImage: t.preview_image,
        isPremium: t.is_premium,
        isActive: t.is_active,
        order: t.display_order,
        styles: t.styles || {},
        usageCount: t.usage_count,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
    };
}

// @desc    Get all templates (public)
exports.getTemplates = async (req, res, next) => {
    try {
        const { category, active } = req.query;

        let query = supabase.from('templates').select('*');

        if (category) query = query.eq('category', category);
        if (active !== undefined) query = query.eq('is_active', active === 'true');
        else query = query.eq('is_active', true);

        query = query.order('display_order', { ascending: true }).order('created_at', { ascending: false });

        const { data: templates, error } = await query;
        if (error) throw error;

        res.json({
            success: true,
            count: templates.length,
            data: templates.map(mapTemplate),
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get templates grouped by category (public)
exports.getTemplatesByCategory = async (req, res, next) => {
    try {
        const settings = await getSystemSettings();
        const managedCategories = Array.isArray(settings.templateCategories) ? settings.templateCategories : [];

        const { data: templates, error } = await supabase
            .from('templates')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });

        if (error) throw error;

        const mapped = (templates || []).map(mapTemplate);

        // Group templates by category id
        const templatesByCategory = mapped.reduce((acc, t) => {
            const key = (t.category || 'other').toString();
            if (!acc[key]) acc[key] = [];
            acc[key].push(t);
            return acc;
        }, {});

        // Build category list from admin-managed config first (order/visibility/icons)
        const base = managedCategories
            .filter((c) => c && c.id && c.visible !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((c) => ({
                id: c.id,
                name: c.name || getCategoryName(c.id),
                description: c.description || getCategoryDescription(c.id),
                icon: c.icon || '📄',
                color: c.color || 'from-slate-500 to-indigo-600',
                order: c.order ?? 0,
                count: (templatesByCategory[c.id] || []).length,
                templates: templatesByCategory[c.id] || [],
                managed: true,
            }));

        // Add discovered categories from templates table (not configured in admin)
        const discovered = Object.keys(templatesByCategory)
            .filter((id) => id && !managedCategories.some((c) => c?.id === id))
            .filter((id) => id !== 'other')
            .sort()
            .map((id) => ({
                id,
                name: getCategoryName(id),
                description: getCategoryDescription(id),
                icon: '📄',
                color: 'from-slate-500 to-indigo-600',
                order: 10_000,
                count: (templatesByCategory[id] || []).length,
                templates: templatesByCategory[id] || [],
                managed: false,
            }));

        res.json({
            success: true,
            data: {
                categories: [...base, ...discovered],
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single template
exports.getTemplate = async (req, res, next) => {
    try {
        // Since Supabase doesn't have a slug column by default, search by generated slug
        const { data: templates, error } = await supabase
            .from('templates')
            .select('*');

        if (error) throw error;

        const template = templates.find(t => generateSlug(t.name) === req.params.slug);

        if (!template) {
            return res.status(404).json({ success: false, error: 'Template not found' });
        }

        // Increment usage count
        await supabase
            .from('templates')
            .update({ usage_count: (template.usage_count || 0) + 1 })
            .eq('id', template.id);

        template.usage_count += 1;

        res.json({ success: true, data: mapTemplate(template) });
    } catch (error) {
        next(error);
    }
};

// @desc    Create template (admin only)
exports.createTemplate = async (req, res, next) => {
    try {
        const { name, description, category, layout, color, sections, previewImage, isPremium, isActive, order, styles } = req.body;

        const { data: template, error } = await supabase
            .from('templates')
            .insert({
                name,
                description,
                category,
                layout: layout || 'single-column',
                color: color || 'from-indigo-500 to-purple-600',
                sections: sections || [],
                preview_image: previewImage || '',
                is_premium: isPremium || false,
                is_active: isActive !== undefined ? isActive : true,
                display_order: order || 0,
                styles: styles || {},
            })
            .select('*')
            .single();

        if (error) throw error;

        res.status(201).json({ success: true, data: mapTemplate(template) });
    } catch (error) {
        next(error);
    }
};

// @desc    Update template (admin only)
exports.updateTemplate = async (req, res, next) => {
    try {
        const { name, description, category, layout, color, sections, previewImage, isPremium, isActive, order, styles } = req.body;

        const update = { updated_at: new Date().toISOString() };
        if (name !== undefined) update.name = name;
        if (description !== undefined) update.description = description;
        if (category !== undefined) update.category = category;
        if (layout !== undefined) update.layout = layout;
        if (color !== undefined) update.color = color;
        if (sections !== undefined) update.sections = sections;
        if (previewImage !== undefined) update.preview_image = previewImage;
        if (isPremium !== undefined) update.is_premium = isPremium;
        if (isActive !== undefined) update.is_active = isActive;
        if (order !== undefined) update.display_order = order;
        if (styles !== undefined) update.styles = styles;

        const { data: template, error } = await supabase
            .from('templates')
            .update(update)
            .eq('id', req.params.id)
            .select('*')
            .single();

        if (!template || error) {
            return res.status(404).json({ success: false, error: 'Template not found' });
        }

        res.json({ success: true, data: mapTemplate(template) });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete template (admin only)
exports.deleteTemplate = async (req, res, next) => {
    try {
        const { error } = await supabase
            .from('templates')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        res.json({ success: true, data: {} });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all templates for admin (including inactive)
exports.getAdminTemplates = async (req, res, next) => {
    try {
        const { data: templates, error } = await supabase
            .from('templates')
            .select('*')
            .order('category', { ascending: true })
            .order('display_order', { ascending: true });

        if (error) throw error;

        res.json({
            success: true,
            count: templates.length,
            data: templates.map(mapTemplate),
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle template active status
exports.toggleTemplateStatus = async (req, res, next) => {
    try {
        // First fetch the current status
        const { data: current, error: fetchError } = await supabase
            .from('templates')
            .select('is_active')
            .eq('id', req.params.id)
            .single();

        if (!current || fetchError) {
            return res.status(404).json({ success: false, error: 'Template not found' });
        }

        const { data: template, error } = await supabase
            .from('templates')
            .update({ is_active: !current.is_active })
            .eq('id', req.params.id)
            .select('*')
            .single();

        if (error) throw error;

        res.json({ success: true, data: mapTemplate(template) });
    } catch (error) {
        next(error);
    }
};

// Helper functions
function getCategoryName(category) {
    const names = {
        fresher: 'Fresher & Entry-Level',
        developer: 'Software Developer',
        data: 'Data & Analytics',
        business: 'Business & Management',
        finance: 'Finance & Accounting',
        creative: 'Design & Creative',
        marketing: 'Marketing & Sales',
        operations: 'Operations & Supply Chain',
        healthcare: 'Healthcare & Life Sciences',
        academia: 'Research & Academia',
    };
    return names[category] || category;
}

function getCategoryDescription(category) {
    const descriptions = {
        fresher: 'Perfect for students and recent graduates',
        developer: 'For programmers and tech professionals',
        data: 'For data scientists and analysts',
        business: 'For managers, executives, and consultants',
        finance: 'For bankers, accountants, and finance pros',
        creative: 'For designers, artists, and creative professionals',
        marketing: 'For marketers, growth hackers, and sales leaders',
        operations: 'For operations managers and logistics experts',
        healthcare: 'For medical professionals and researchers',
        academia: 'For professors, researchers, and PhD candidates',
    };
    return descriptions[category] || '';
}
