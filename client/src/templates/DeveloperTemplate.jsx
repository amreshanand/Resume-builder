export default function DeveloperTemplate({ data = {} }) {
    const { personalInfo = {}, skills = {}, experience = [], projects = [], education = [] } = data;

    // Normalize data
    const experienceList = Array.isArray(experience) ? experience : [experience].filter(Boolean);
    const projectList = Array.isArray(projects) ? projects : [projects].filter(Boolean);
    const educationList = Array.isArray(education) ? education : [education].filter(Boolean);

    const accentColor = '#4f46e5';
    const secondaryColor = '#1e293b';
    const textColor = '#334155';
    const lightText = '#64748b';

    return (
        <div className="resume-page" style={{
            fontFamily: "'Inter', sans-serif",
            padding: 0,
            display: 'flex',
            minHeight: '297mm',
            backgroundColor: 'white',
            color: secondaryColor
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '75mm',
                backgroundColor: '#f8fafc',
                padding: '20mm 10mm',
                borderRight: '1px solid #f1f5f9'
            }}>
                <div style={{ marginBottom: '30px' }}>
                    <div style={{
                        width: '40px',
                        height: '4px',
                        backgroundColor: accentColor,
                        marginBottom: '15px'
                    }}></div>
                    <h1 style={{ fontSize: '20pt', fontWeight: 800, lineHeight: 1.1, marginBottom: '10px' }}>
                        {personalInfo.fullName?.split(' ')[0] || 'YOUR'}<br />
                        <span style={{ color: accentColor }}>{personalInfo.fullName?.split(' ').slice(1).join(' ') || 'NAME'}</span>
                    </h1>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <SectionTitle title="CONTACT" accent={accentColor} compact />
                    <div style={{ fontSize: '8.5pt', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {personalInfo.email && <ContactItem icon="✉" text={personalInfo.email} />}
                        {personalInfo.phone && <ContactItem icon="📞" text={personalInfo.phone} />}
                        {personalInfo.location && <ContactItem icon="📍" text={personalInfo.location} />}
                        {personalInfo.linkedin && <ContactItem icon="🔗" text={personalInfo.linkedin} />}
                        {personalInfo.portfolio && <ContactItem icon="🌐" text={personalInfo.portfolio} />}
                    </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <SectionTitle title="SKILLS" accent={accentColor} compact />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <div style={{ fontSize: '8pt', fontWeight: 700, color: lightText, marginBottom: '6px', textTransform: 'uppercase' }}>Technical</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {skills.technical?.map((s, i) => (
                                    <SkillBadge key={i} text={s} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '8pt', fontWeight: 700, color: lightText, marginBottom: '6px', textTransform: 'uppercase' }}>Tools</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {skills.tools?.map((s, i) => (
                                    <SkillBadge key={i} text={s} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <SectionTitle title="EDUCATION" accent={accentColor} compact />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {educationList.filter(e => e.institution).map((edu, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '9pt', fontWeight: 700, marginBottom: '2px' }}>{edu.degree}</div>
                                <div style={{ fontSize: '8.5pt', color: lightText, marginBottom: '4px' }}>{edu.institution}</div>
                                <div style={{ fontSize: '8pt', fontStyle: 'italic', color: lightText }}>{edu.startDate} — {edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '20mm 15mm' }}>
                <section style={{ marginBottom: '25px' }}>
                    <p style={{ fontSize: '10pt', lineHeight: 1.6, color: textColor }}>
                        {personalInfo.summary || 'Aspiring professional with a focus on delivering high-quality solutions and continuous learning.'}
                    </p>
                </section>

                <section style={{ marginBottom: '25px' }}>
                    <SectionTitle title="WORK EXPERIENCE" accent={accentColor} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {experienceList.filter(e => e.company).map((exp, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                                    <strong style={{ fontSize: '10.5pt' }}>{exp.role}</strong>
                                    <span style={{ fontSize: '8.5pt', fontWeight: 600, color: accentColor }}>
                                        {exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate?.toUpperCase()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '9.5pt', fontWeight: 500, color: secondaryColor, marginBottom: '8px' }}>{exp.company}</div>
                                <BulletList bullets={exp.bullets} />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <SectionTitle title="PROJECTS" accent={accentColor} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {projectList.filter(p => p.name).map((proj, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                                    <strong style={{ fontSize: '10.5pt' }}>{proj.name}</strong>
                                    {proj.link && <span style={{ fontSize: '8pt', color: accentColor }}>{proj.link}</span>}
                                </div>
                                {proj.description && <p style={{ fontSize: '9.5pt', color: textColor, marginBottom: '6px', lineHeight: 1.5 }}>{proj.description}</p>}
                                {proj.techStack?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {proj.techStack.map((tech, ti) => (
                                            <span key={ti} style={{ fontSize: '7.5pt', color: lightText, backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '3px' }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

// Sub-components for cleaner code
function SectionTitle({ title, accent, compact = false }) {
    return (
        <h2 style={{
            fontSize: compact ? '9pt' : '11pt',
            fontWeight: 800,
            color: '#1a1a1a',
            borderLeft: `3px solid ${accent}`,
            paddingLeft: '10px',
            marginBottom: compact ? '12px' : '18px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        }}>
            {title}
        </h2>
    );
}

function ContactItem({ icon, text }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
            <span style={{ fontSize: '10pt', width: '16px', textAlign: 'center' }}>{icon}</span>
            <span style={{ wordBreak: 'break-all' }}>{text}</span>
        </div>
    );
}

function SkillBadge({ text }) {
    return (
        <span style={{
            fontSize: '8pt',
            padding: '3px 8px',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            color: '#475569'
        }}>
            {text}
        </span>
    );
}

function BulletList({ bullets }) {
    if (!bullets) return null;
    const items = typeof bullets === 'string' ? bullets.split('\n') : bullets;

    return (
        <ul style={{ paddingLeft: '15px', margin: 0 }}>
            {items.filter(b => b.trim()).map((b, i) => (
                <li key={i} style={{
                    fontSize: '9pt',
                    color: '#475569',
                    lineHeight: 1.5,
                    marginBottom: '4px',
                    listStyleType: 'square'
                }}>
                    {b.trim().startsWith('•') ? b.trim().substring(1).trim() : b.trim()}
                </li>
            ))}
        </ul>
    );
}
