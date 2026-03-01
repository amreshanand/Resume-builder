export default function CreativeTemplate({ data = {} }) {
    const { personalInfo = {}, skills = {}, projects = [], experience = [], education = [] } = data;

    // Normalize data
    const projectList = Array.isArray(projects) ? projects : [projects].filter(Boolean);
    const experienceList = Array.isArray(experience) ? experience : [experience].filter(Boolean);
    const educationList = Array.isArray(education) ? education : [education].filter(Boolean);

    const accentColor = '#ec4899';
    const secondaryColor = '#f43f5e';
    const textColor = '#374151';
    const lightText = '#9ca3af';

    return (
        <div className="resume-page" style={{
            fontFamily: "'Inter', sans-serif",
            padding: '15mm 15mm',
            backgroundColor: 'white',
            color: textColor,
            lineHeight: 1.5
        }}>
            {/* Artistic Header */}
            <header style={{ marginBottom: '30px', position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: '-15mm',
                    left: '-15mm',
                    width: '100mm',
                    height: '100mm',
                    background: `radial-gradient(circle at 0 0, ${accentColor}11, transparent 70%)`,
                    zIndex: 0
                }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: '32pt',
                        fontWeight: 900,
                        color: '#111827',
                        margin: 0,
                        letterSpacing: '-1.5px',
                        lineHeight: 1
                    }}>
                        {personalInfo.fullName?.split(' ')[0] || 'YOUR'}<br />
                        <span style={{
                            background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {personalInfo.fullName?.split(' ').slice(1).join(' ') || 'NAME'}
                        </span>
                    </h1>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        marginTop: '15px',
                        fontSize: '9pt',
                        fontWeight: 500,
                        color: '#6b7280'
                    }}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                        {personalInfo.location && <span>• {personalInfo.location}</span>}
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '30px', position: 'relative', zIndex: 1 }}>
                {/* Left Column */}
                <div style={{ flex: 1.5 }}>
                    {personalInfo.summary && (
                        <section style={{ marginBottom: '25px' }}>
                            <p style={{ fontSize: '10.5pt', color: '#4b5563', fontStyle: 'italic', borderLeft: `2px solid ${accentColor}`, paddingLeft: '15px' }}>
                                {personalInfo.summary}
                            </p>
                        </section>
                    )}

                    <section style={{ marginBottom: '25px' }}>
                        <SectionTitle title="Experience" accent={accentColor} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {experienceList.filter(e => e.company).map((exp, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <strong style={{ fontSize: '11pt', color: '#111827' }}>{exp.role}</strong>
                                        <span style={{ fontSize: '8.5pt', color: accentColor, fontWeight: 700 }}>{exp.startDate} — {exp.current ? 'NOW' : exp.endDate?.toUpperCase()}</span>
                                    </div>
                                    <div style={{ fontSize: '9.5pt', color: '#6b7280', marginBottom: '8px' }}>{exp.company}</div>
                                    <ul style={{ paddingLeft: '15px', margin: 0, listStyleType: 'circle' }}>
                                        {(typeof exp.bullets === 'string' ? exp.bullets.split('\n') : exp.bullets).filter(Boolean).map((b, bi) => (
                                            <li key={bi} style={{ fontSize: '9pt', color: '#4b5563', marginBottom: '4px' }}>
                                                {b.trim().startsWith('•') ? b.trim().substring(1).trim() : b.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionTitle title="Portfolio" accent={accentColor} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            {projectList.filter(p => p.name).map((proj, i) => (
                                <div key={i} style={{ padding: '12px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fee2e2' }}>
                                    <strong style={{ fontSize: '10pt', color: '#111827', display: 'block', marginBottom: '4px' }}>{proj.name}</strong>
                                    {proj.description && <p style={{ fontSize: '8.5pt', color: '#4b5563', margin: '0 0 8px 0' }}>{proj.description}</p>}
                                    {proj.techStack?.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                            {proj.techStack.map((t, ti) => (
                                                <span key={ti} style={{ fontSize: '7pt', color: accentColor, fontWeight: 600 }}>#{t}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar) */}
                <div style={{ flex: 0.8 }}>
                    <section style={{ marginBottom: '25px' }}>
                        <SectionTitle title="Skills" accent={accentColor} />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {[...(skills.technical || []), ...(skills.tools || [])].map((s, i) => (
                                <span key={i} style={{
                                    fontSize: '8.5pt',
                                    padding: '4px 12px',
                                    background: `linear-gradient(135deg, ${accentColor}11, ${secondaryColor}11)`,
                                    color: accentColor,
                                    borderRadius: '5px',
                                    fontWeight: 600,
                                    border: `1px solid ${accentColor}22`
                                }}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionTitle title="Education" accent={accentColor} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {educationList.filter(e => e.institution).map((edu, i) => (
                                <div key={i}>
                                    <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#111827' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '9pt', color: '#6b7280' }}>{edu.institution}</div>
                                    <div style={{ fontSize: '8pt', color: accentColor, fontWeight: 600, marginTop: '2px' }}>{edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function SectionTitle({ title, accent }) {
    return (
        <h2 style={{
            fontSize: '11pt',
            fontWeight: 800,
            color: '#111827',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }}>
            {title}
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${accent}33, transparent)` }}></div>
        </h2>
    );
}
