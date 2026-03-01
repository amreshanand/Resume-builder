import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/common/Loader';

// Templates
import FresherTemplate from '../templates/FresherTemplate';
import DeveloperTemplate from '../templates/DeveloperTemplate';
import CorporateTemplate from '../templates/CorporateTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const TEMPLATE_MAP = {
    fresher: FresherTemplate,
    developer: DeveloperTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
};

export default function PublicResumePage() {
    const { slug } = useParams();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPublicResume = async () => {
            try {
                const { data } = await axios.get(`/api/public/resume/${slug}`);
                setResume(data.data);
            } catch (err) {
                setError('Resume not found or no longer available.');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicResume();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-16">
                <Loader text="Loading resume..." size="lg" />
            </div>
        );
    }

    if (error || !resume) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-6 text-center">
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-2xl font-bold mb-2">Not Found</h1>
                <p className="text-[var(--text-muted)] mb-8">{error}</p>
                <Link to="/" className="btn-primary no-underline">Go Home</Link>
            </div>
        );
    }

    const TemplateComponent = TEMPLATE_MAP[resume.templateId] || TEMPLATE_MAP[resume.templateType];

    return (
        <div className="min-h-screen pt-24 pb-16 bg-[var(--surface-lighter)]/30 flex justify-center overflow-auto px-4">
            {/* Floating Action Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full flex items-center gap-4 border border-[var(--glass-border)] z-50">
                <span className="text-sm font-semibold">{resume.sections?.personalInfo?.fullName}'s Resume</span>
                <button
                    onClick={() => window.print()}
                    className="btn-primary text-xs px-4"
                >
                    📄 Print to PDF
                </button>
            </div>

            <div className="shadow-2xl bg-white origin-top" id="public-resume-render">
                {TemplateComponent ? (
                    <TemplateComponent data={resume.sections} />
                ) : (
                    <div className="p-10 text-center text-red-500">
                        Error rendering template
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media print {
          body * { visibility: hidden; }
          #public-resume-render, #public-resume-render * { visibility: visible; }
          #public-resume-render { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm !important; 
            height: 297mm !important; 
            box-shadow: none !important;
            transform: none !important;
          }
          nav, .fixed { display: none !important; }
        }
      `}} />
        </div>
    );
}
