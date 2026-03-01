export default function CorporateTemplate({ data = {} }) {
    const { personalInfo = {}, experience = [], skills = {}, education = [], certifications = [] } = data;

    // Normalize data
    const experienceList = Array.isArray(experience) ? experience : [experience].filter(Boolean);
    const educationList = Array.isArray(education) ? education : [education].filter(Boolean);
    const certList = Array.isArray(certifications) ? certifications : [certifications].filter(Boolean);

    const accentColor = '#7c3aed';
    const textColor = '#1e293b';
    const lightText = '#64748b';

    return (
        <div className="resume-page" style={{
            fontFamily: "'Inter', sans-serif",
            padding: 0,
            display: 'flex',
            minHeight: '297mm',
            backgroundColor: 'white',
            color: textColor
        }}>
            {/* Sidebar (Left) */}
            <aside style={{
                width: '70mm',
                backgroundColor: '#1e293b',
                color: 'white',
                padding: '15mm 10mm',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px'
            }}>
                <div>
                    <h1 style={{ fontSize: '22pt', fontWeight: 800, lineHeight: 1.1, color: 'white', marginBottom: '20px' }}>
                        {personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}
                    </h1>
                    <div style={{ width: '40px', height: '4px', backgroundColor: accentColor }}></div>
                </div>

                <div>
                    <h3 style={{ fontSize: '10pt', fontWeight: 800, color: accentColor, letterSpacing: '2px', marginBottom: '15px' }}>CONTACT</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '8.5pt' }}>
                        {personalInfo.email && <div style={{ color: '#cbd5e1' }}>✉ {personalInfo.email}</div>}
                        {personalInfo.phone && <div style={{ color: '#cbd5e1' }}>📞 {personalInfo.phone}</div>}
                        {personalInfo.location && <div style={{ color: '#cbd5e1' }}>📍 {personalInfo.location}</div>}
                        {personalInfo.linkedin && <div style={{ color: '#cbd5e1' }}>🔗 {personalInfo.linkedin}</div>}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '10pt', fontWeight: 800, color: accentColor, letterSpacing: '2px', marginBottom: '15px' }}>SKILLS</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {[...(skills.technical || []), ...(skills.tools || [])].map((s, i) => (
                            <span key={i} style={{
                                fontSize: '8pt',
                                padding: '4px 10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                color: '#e2e8f0'
                            }}>
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 style={{ fontSize: '10pt', fontWeight: 800, color: accentColor, letterSpacing: '2px', marginBottom: '15px' }}>CERTIFICATIONS</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {certList.filter(c => c.name).map((cert, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '9pt', fontWeight: 700, color: 'white' }}>{cert.name}</div>
                                <div style={{ fontSize: '8pt', color: '#94a3b8' }}>{cert.issuer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Area (Right) */}
            <main style={{ flex: 1, padding: '20mm 15mm' }}>
                <section style={{ marginBottom: '35px' }}>
                    <div style={{ borderLeft: `4px solid ${accentColor}`, paddingLeft: '15px' }}>
                        <h2 style={{ fontSize: '11pt', fontWeight: 800, color: '#0f172a', marginBottom: '8px', letterSpacing: '1px' }}>EXECUTIVE SUMMARY</h2>
                        <p style={{ fontSize: '10.5pt', lineHeight: 1.6, color: '#475569' }}>
                            {personalInfo.summary || 'Visionary leader with a proven track record of driving operational excellence and strategic growth in competitive markets.'}
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '35px' }}>
                    <h2 style={{ fontSize: '11pt', fontWeight: 800, color: '#0f172a', marginBottom: '15px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        {experienceList.filter(e => e.company).map((exp, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                    <strong style={{ fontSize: '11pt', color: '#0f172a' }}>{exp.role}</strong>
                                    <span style={{ fontSize: '9pt', color: lightText, fontWeight: 500 }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div style={{ fontSize: '10pt', fontWeight: 600, color: accentColor, marginBottom: '8px' }}>{exp.company}</div>
                                <ul style={{ paddingLeft: '18px', margin: 0, listStyleType: 'disc' }}>
                                    {(typeof exp.bullets === 'string' ? exp.bullets.split('\n') : exp.bullets).filter(Boolean).map((b, bi) => (
                                        <li key={bi} style={{ fontSize: '9.5pt', color: '#475569', marginBottom: '5px', lineHeight: 1.5 }}>
                                            {b.trim().startsWith('•') ? b.trim().substring(1).trim() : b.trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '11pt', fontWeight: 800, color: '#0f172a', marginBottom: '15px', borderBottom: '2px solid #f1f5f9', paddingBottom: '8px' }}>
                        EDUCATION
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {educationList.filter(e => e.institution).map((edu, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <strong style={{ fontSize: '10.5pt', color: '#0f172a' }}>{edu.degree}</strong>
                                    <span style={{ fontSize: '9pt', color: lightText }}>{edu.endDate}</span>
                                </div>
                                <div style={{ fontSize: '9.5pt', color: lightText }}>{edu.institution}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
