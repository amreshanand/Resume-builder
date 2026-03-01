import { useResume } from '../../context/ResumeContext';
import { useDebounce } from '../../hooks/useDebounce';
import FresherTemplate from '../../templates/FresherTemplate';
import DeveloperTemplate from '../../templates/DeveloperTemplate';
import CorporateTemplate from '../../templates/CorporateTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';

const TEMPLATE_MAP = {
    fresher: FresherTemplate,
    developer: DeveloperTemplate,
    corporate: CorporateTemplate,
    creative: CreativeTemplate,
};

export default function ResumePreview() {
    const { state } = useResume();
    const debouncedSections = useDebounce(state.sections, 300);
    const TemplateComponent = TEMPLATE_MAP[state.templateId];

    if (!TemplateComponent) {
        return (
            <div className="flex items-center justify-center h-full text-[var(--text-muted)]">
                <div className="text-center">
                    <div className="text-4xl mb-3">📄</div>
                    <p className="text-sm">Select a template to preview your resume</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto bg-[var(--surface-lighter)]/10 flex justify-center p-8 scrollbar-hide">
            <div
                className="relative"
                style={{
                    width: 'calc(210mm * 0.55)',
                    height: 'calc(297mm * 0.55)',
                    minWidth: 'calc(210mm * 0.55)',
                }}
            >
                <div
                    id="resume-preview"
                    className="shadow-2xl absolute top-0 left-0"
                    style={{
                        transform: 'scale(0.55)',
                        transformOrigin: 'top left',
                        width: '210mm',
                        height: '297mm',
                        backgroundColor: 'white'
                    }}
                >
                    <TemplateComponent data={debouncedSections} />
                </div>
            </div>
        </div>
    );
}
