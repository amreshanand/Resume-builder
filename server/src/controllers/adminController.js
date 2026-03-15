const supabase = require('../config/supabase');

// Get overall stats
exports.getStats = async (req, res) => {
    try {
        const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
        const { count: proUsers } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('plan', 'pro');
        const { count: adminUsers } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_admin', true);
        const { count: totalResumes } = await supabase.from('resumes').select('*', { count: 'exact', head: true });
        const { count: completedResumes } = await supabase.from('resumes').select('*', { count: 'exact', head: true }).eq('status', 'complete');

        // Get templates count
        const { count: totalTemplates } = await supabase.from('templates').select('*', { count: 'exact', head: true });

        // Calculate chart data based on recent 6 months
        // First get all users and resumes dates
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1); // Start of the month 6 months ago

        const { data: recentUsers } = await supabase
            .from('users')
            .select('created_at')
            .gte('created_at', sixMonthsAgo.toISOString());
            
        const { data: recentResumes } = await supabase
            .from('resumes')
            .select('created_at')
            .gte('created_at', sixMonthsAgo.toISOString());

        // Group by month
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartDataMap = {};

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            chartDataMap[key] = { name: monthNames[d.getMonth()], users: 0, resumes: 0 };
        }

        (recentUsers || []).forEach(u => {
            const d = new Date(u.created_at);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            if (chartDataMap[key]) chartDataMap[key].users++;
        });

        (recentResumes || []).forEach(r => {
            const d = new Date(r.created_at);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
            if (chartDataMap[key]) chartDataMap[key].resumes++;
        });

        const chartData = Object.values(chartDataMap);

        res.status(200).json({
            success: true,
            data: {
                totalUsers: totalUsers || 0,
                proUsers: proUsers || 0,
                adminUsers: adminUsers || 0,
                totalResumes: totalResumes || 0,
                completedResumes: completedResumes || 0,
                totalTemplates: totalTemplates || 0,
                chartData,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get system settings
exports.getSettings = async (req, res) => {
    try {
        // Try to fetch from a 'system_settings' table, if it fails, return defaults
        const { data: settings, error } = await supabase
            .from('system_settings')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        const defaultSettings = {
            siteName: 'ResumeAI',
            maintenanceMode: false,
            allowRegistration: true,
            proPlanPrice: '9.99',
            aiModel: 'gemini-1.5-flash',
            contactEmail: 'support@resumeai.com'
        };

        if (error || !settings) {
            return res.status(200).json({ success: true, data: defaultSettings });
        }

        res.status(200).json({ success: true, data: settings.config || defaultSettings });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update system settings
exports.updateSettings = async (req, res) => {
    try {
        const { config } = req.body;

        // Use insert a new record for historical purposes
        const { data, error } = await supabase
            .from('system_settings')
            .insert({ config, created_at: new Date().toISOString() })
            .select('*')
            .single();

        if (error) throw error;

        res.status(200).json({ success: true, data: data.config });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get recent activity (real data)
exports.getRecentActivity = async (req, res) => {
    try {
        // Fetch last 10 users
        const { data: users } = await supabase
            .from('users')
            .select('id, name, created_at')
            .order('created_at', { ascending: false })
            .limit(10);

        // Fetch last 10 resumes
        const { data: resumes } = await supabase
            .from('resumes')
            .select('id, title, created_at, user_id')
            .order('created_at', { ascending: false })
            .limit(10);

        let activity = [];

        (users || []).forEach(u => {
            activity.push({
                _id: u.id,
                event: `New user registration: ${u.name}`,
                type: 'user',
                source: u.name,
                createdAt: u.created_at
            });
        });

        (resumes || []).forEach(r => {
            activity.push({
                _id: r.id,
                event: `Resume created: ${r.title || 'Untitled'}`,
                type: 'resume',
                source: `User ID: ${r.user_id?.slice(-8)}`,
                createdAt: r.created_at
            });
        });

        // Sort by date
        activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ success: true, data: activity.slice(0, 10) });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, name, email, plan, ai_credits, resume_count, is_admin, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const mapped = users.map(u => ({
            _id: u.id,
            name: u.name,
            email: u.email,
            plan: u.plan,
            aiCredits: u.ai_credits,
            resumeCount: u.resume_count,
            isAdmin: u.is_admin,
            createdAt: u.created_at,
        }));

        res.status(200).json({ success: true, count: mapped.length, data: mapped });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update user plan or admin status
exports.updateUser = async (req, res) => {
    try {
        const { plan, isAdmin, aiCredits } = req.body;

        const update = {};
        if (plan !== undefined) update.plan = plan;
        if (isAdmin !== undefined) update.is_admin = isAdmin;
        if (aiCredits !== undefined) update.ai_credits = aiCredits;

        const { data: user, error } = await supabase
            .from('users')
            .update(update)
            .eq('id', req.params.id)
            .select('id, name, email, plan, ai_credits, resume_count, is_admin, created_at')
            .single();

        if (!user || error) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan,
                aiCredits: user.ai_credits,
                resumeCount: user.resume_count,
                isAdmin: user.is_admin,
                createdAt: user.created_at,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        // Delete all user's resumes first (cascade should handle this, but just in case)
        await supabase.from('resumes').delete().eq('user_id', req.params.id);

        const { error } = await supabase.from('users').delete().eq('id', req.params.id);
        if (error) throw error;

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get all resumes
exports.getResumes = async (req, res) => {
    try {
        const { data: resumes, error } = await supabase
            .from('resumes')
            .select('id, title, template_type, status, ats_score, share_slug, created_at, user_id')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Fetch user info for each unique user_id
        const userIds = [...new Set(resumes.map(r => r.user_id))];
        const { data: users } = await supabase
            .from('users')
            .select('id, name, email')
            .in('id', userIds);

        const userMap = {};
        (users || []).forEach(u => { userMap[u.id] = u; });

        const mapped = resumes.map(r => ({
            _id: r.id,
            title: r.title,
            templateType: r.template_type,
            status: r.status,
            atsScore: r.ats_score,
            shareSlug: r.share_slug,
            createdAt: r.created_at,
            userId: userMap[r.user_id] ? { name: userMap[r.user_id].name, email: userMap[r.user_id].email } : null,
        }));

        res.status(200).json({ success: true, count: mapped.length, data: mapped });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete resume
exports.deleteResume = async (req, res) => {
    try {
        const { error } = await supabase
            .from('resumes')
            .delete()
            .eq('id', req.params.id);

        if (error) throw error;

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
