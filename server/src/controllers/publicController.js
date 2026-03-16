const { getSystemSettings } = require('../utils/systemSettings');

// Safe-to-expose settings for the website UI
exports.getPublicSettings = async (req, res, next) => {
    try {
        const settings = await getSystemSettings();
        res.json({
            success: true,
            data: {
                siteName: settings.siteName,
                contactEmail: settings.contactEmail,
                defaultTheme: settings.defaultTheme || 'dark',
                maintenanceMode: !!settings.maintenanceMode,
            },
        });
    } catch (err) {
        next(err);
    }
};

