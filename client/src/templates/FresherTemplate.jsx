export default function FresherTemplate({ data = {} }) {
    const { personalInfo = {}, education = [], skills = {}, projects = [], certifications = [] } = data;

    // Normalize data
    const educationList = Array.isArray(education) ? education : [education].filter(Boolean);
    const projectList = Array.isArray(projects) ? projects : [projects].filter(Boolean);
    const certList = Array.isArray(certifications) ? certifications : [certifications].filter(Boolean);

    const accentColor = '#059669';
    const textColor = '#334155';
    const headingColor = '#111827';

    return (
        <div className="resume-page" style={{
            fontFamily: "'Inter', sans-serif",
            padding: '15mm 20mm',
            backgroundColor: 'white',
            color: textColor,
            lineHeight: 1.5
        }}>
            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '25px' }}>
                <h1 style={{
                    fontSize: '24pt',
                    fontWeight: 800,
                    color: headingColor,
                    marginBottom: '8px',
                    letterSpacing: '-0.5px'
                }}>
                    {personalInfo.fullName || 'YOUR NAME'}
                </h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '15px',
                    fontSize: '9.5pt',
                    color: '#6b7280'
                }}>
                    {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>• 📞 {personalInfo.phone}</span>}
                    {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>• 📍 {personalInfo.location}</span>}
                </div>
                {(personalInfo.linkedin || personalInfo.portfolio) && (
                    <div style={{
                        marginTop: '8px',
                        fontSize: '9pt',
                        color: accentColor,
                        fontWeight: 500
                    }}>
                        {personalInfo.linkedin && <span style={{ margin: '0 8px' }}>LinkedIn: {personalInfo.linkedin}</span>}
                        {personalInfo.portfolio && <span style={{ margin: '0 8px' }}>Portfolio: {personalInfo.portfolio}</span>}
                    </div>
                )}
            </header>

            {/* Objective */}
            {personalInfo.summary && (
                <Section title="PROFESSIONAL SUMMARY" accent={accentColor}>
                    <p style={{ fontSize: '10pt', marginBottom: 0 }}>{personalInfo.summary}</p>
                </Section>
            )}

            {/* Education */}
            {educationList.some(e => e.institution) && (
                <Section title="EDUCATION" accent={accentColor}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {educationList.filter(e => e.institution).map((edu, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '11pt', color: headingColor }}>{edu.institution}</strong>
                                    <span style={{ fontSize: '9pt', fontWeight: 600 }}>{edu.startDate} — {edu.endDate}</span>
                                </div>
                                <div style={{ fontSize: '10pt', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                                    {edu.gpa && <span style={{ fontStyle: 'italic' }}>GPA: {edu.gpa}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Skills */}
            {(skills.technical?.length > 0 || skills.tools?.length > 0) && (
                <Section title="SKILLS" accent={accentColor}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {skills.technical?.length > 0 && (
                            <div>
                                <strong style={{ fontSize: '9pt', display: 'block', marginBottom: '5px', textTransform: 'uppercase', color: headingColor }}>Technical</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {skills.technical.map((s, i) => <Tag key={i} text={s} />)}
                                </div>
                            </div>
                        )}
                        {skills.tools?.length > 0 && (
                            <div>
                                <strong style={{ fontSize: '9pt', display: 'block', marginBottom: '5px', textTransform: 'uppercase', color: headingColor }}>Tools & Frameworks</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {skills.tools.map((s, i) => <Tag key={i} text={s} />)}
                                </div>
                            </div>
                        )}
                    </div>
                </Section>
            )}

            {/* Projects */}
            {projectList.some(p => p.name) && (
                <Section title="ACADEMIC PROJECTS" accent={accentColor}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {projectList.filter(p => p.name).map((proj, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                                    <strong style={{ fontSize: '11pt', color: headingColor }}>{proj.name}</strong>
                                    {proj.link && <span style={{ fontSize: '8.5pt', color: accentColor }}>{proj.link}</span>}
                                </div>
                                {proj.description && <p style={{ fontSize: '10pt', margin: '2px 0 5px 0' }}>{proj.description}</p>}
                                {proj.techStack?.length > 0 && (
                                    <div style={{ fontSize: '8.5pt', color: '#6b7280' }}>
                                        <strong>Tech:</strong> {proj.techStack.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Certifications */}
            {certList.some(c => c.name) && (
                <Section title="CERTIFICATIONS" accent={accentColor}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {certList.filter(c => c.name).map((cert, i) => (
                            <div key={i} style={{ fontSize: '9.5pt', padding: '8px', border: '1px solid #f3f4f6', borderRadius: '4px' }}>
                                <div style={{ fontWeight: 700, color: headingColor }}>{cert.name}</div>
                                <div style={{ fontSize: '8.5pt', color: '#6b7280' }}>
                                    {cert.issuer} {cert.date && `• ${cert.date}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
}

function Section({ title, children, accent }) {
    return (
        <section style={{ marginBottom: '20px' }}>
            <h2 style={{
                fontSize: '11pt',
                fontWeight: 800,
                color: accent,
                borderBottom: `2px solid ${accent}22`,
                paddingBottom: '4px',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>
                {title}
            </h2>
            {children}
        </section>
    );
}

function Tag({ text }) {
    return (
        <span style={{
            fontSize: '8.5pt',
            padding: '2px 8px',
            backgroundColor: '#f0fdf4',
            color: '#166534',
            border: '1px solid #dcfce7',
            borderRadius: '9999px'
        }}>
            {text}
        </span>
    );
}
