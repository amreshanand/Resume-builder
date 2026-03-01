// Fallback form schemas when AI is unavailable
const fallbackSchemas = {
    fresher: {
        sections: [
            {
                id: 'personalInfo', title: 'Personal Information', icon: '👤', required: true, repeatable: false,
                description: 'Your basic contact information',
                fields: [
                    { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
                    { id: 'email', label: 'Email', type: 'text', placeholder: 'john@example.com', required: true },
                    { id: 'phone', label: 'Phone', type: 'text', placeholder: '+91 9876543210', required: true },
                    { id: 'location', label: 'Location', type: 'text', placeholder: 'Mumbai, India' },
                    { id: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'linkedin.com/in/johndoe' },
                    { id: 'portfolio', label: 'Portfolio/GitHub', type: 'text', placeholder: 'github.com/johndoe' },
                    { id: 'summary', label: 'Objective', type: 'textarea', placeholder: 'Enthusiastic CS graduate seeking...', helpText: 'AI can improve this later' },
                ],
            },
            {
                id: 'education', title: 'Education', icon: '🎓', required: true, repeatable: true,
                fields: [
                    { id: 'institution', label: 'Institution', type: 'text', placeholder: 'IIT Mumbai', required: true },
                    { id: 'degree', label: 'Degree', type: 'text', placeholder: 'B.Tech', required: true },
                    { id: 'field', label: 'Field of Study', type: 'text', placeholder: 'Computer Science' },
                    { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '2020-08' },
                    { id: 'endDate', label: 'End Date', type: 'date', placeholder: '2024-05' },
                    { id: 'gpa', label: 'CGPA/%', type: 'text', placeholder: '8.5/10' },
                ],
            },
            {
                id: 'skills', title: 'Skills', icon: '💡', required: true, repeatable: false,
                fields: [
                    { id: 'technical', label: 'Technical Skills', type: 'chips', suggestions: ['Python', 'Java', 'C++', 'JavaScript', 'React', 'SQL'], required: true },
                    { id: 'tools', label: 'Tools & Platforms', type: 'chips', suggestions: ['Git', 'VS Code', 'Linux', 'Figma', 'Postman'] },
                    { id: 'soft', label: 'Soft Skills', type: 'chips', suggestions: ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'] },
                ],
            },
            {
                id: 'projects', title: 'Projects', icon: '🚀', required: true, repeatable: true,
                fields: [
                    { id: 'name', label: 'Project Name', type: 'text', placeholder: 'E-Commerce Platform', required: true },
                    { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Built a full-stack web application...' },
                    { id: 'techStack', label: 'Tech Stack', type: 'chips', suggestions: ['React', 'Node.js', 'MongoDB', 'Express'] },
                    { id: 'link', label: 'Project Link', type: 'text', placeholder: 'github.com/project' },
                ],
            },
            {
                id: 'certifications', title: 'Certifications', icon: '📜', required: false, repeatable: true,
                fields: [
                    { id: 'name', label: 'Certification Name', type: 'text', placeholder: 'AWS Cloud Practitioner' },
                    { id: 'issuer', label: 'Issuing Organization', type: 'text', placeholder: 'Amazon Web Services' },
                    { id: 'date', label: 'Date', type: 'date', placeholder: '2024-01' },
                ],
            },
        ],
    },
    developer: {
        sections: [
            {
                id: 'personalInfo', title: 'Personal Information', icon: '👤', required: true, repeatable: false,
                fields: [
                    { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Jane Doe', required: true },
                    { id: 'email', label: 'Email', type: 'text', placeholder: 'jane@dev.com', required: true },
                    { id: 'phone', label: 'Phone', type: 'text', placeholder: '+91 9876543210' },
                    { id: 'location', label: 'Location', type: 'text', placeholder: 'Bangalore, India' },
                    { id: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'linkedin.com/in/janedoe' },
                    { id: 'portfolio', label: 'GitHub/Portfolio', type: 'text', placeholder: 'github.com/janedoe' },
                    { id: 'summary', label: 'Professional Summary', type: 'textarea', placeholder: 'Full-stack developer with 3+ years...' },
                ],
            },
            {
                id: 'skills', title: 'Technical Skills', icon: '💻', required: true, repeatable: false,
                fields: [
                    { id: 'technical', label: 'Languages & Frameworks', type: 'chips', suggestions: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB'], required: true },
                    { id: 'tools', label: 'DevOps & Tools', type: 'chips', suggestions: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'Terraform'] },
                ],
            },
            {
                id: 'experience', title: 'Work Experience', icon: '💼', required: false, repeatable: true,
                fields: [
                    { id: 'company', label: 'Company', type: 'text', placeholder: 'Google', required: true },
                    { id: 'role', label: 'Role', type: 'text', placeholder: 'Software Engineer', required: true },
                    { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '2022-01' },
                    { id: 'endDate', label: 'End Date', type: 'date', placeholder: '2024-12' },
                    { id: 'current', label: 'Currently Working Here', type: 'toggle' },
                    { id: 'bullets', label: 'Key Achievements', type: 'textarea', placeholder: '• Built microservices handling 10K req/s\n• Reduced latency by 40%', helpText: 'Use bullet points. AI can improve these.' },
                ],
            },
            {
                id: 'projects', title: 'Projects & Open Source', icon: '🔧', required: true, repeatable: true,
                fields: [
                    { id: 'name', label: 'Project Name', type: 'text', placeholder: 'CLI Framework', required: true },
                    { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Developed a CLI framework...' },
                    { id: 'techStack', label: 'Tech Stack', type: 'chips', suggestions: ['React', 'Node.js', 'Go', 'Rust'] },
                    { id: 'link', label: 'Link', type: 'text', placeholder: 'github.com/project' },
                ],
            },
            {
                id: 'education', title: 'Education', icon: '🎓', required: true, repeatable: true,
                fields: [
                    { id: 'institution', label: 'Institution', type: 'text', placeholder: 'IIT Delhi', required: true },
                    { id: 'degree', label: 'Degree', type: 'text', placeholder: 'B.Tech Computer Science' },
                    { id: 'startDate', label: 'Start', type: 'date', placeholder: '2018-08' },
                    { id: 'endDate', label: 'End', type: 'date', placeholder: '2022-05' },
                ],
            },
        ],
    },
    corporate: {
        sections: [
            {
                id: 'personalInfo', title: 'Contact Information', icon: '👔', required: true, repeatable: false,
                fields: [
                    { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Robert Smith', required: true },
                    { id: 'email', label: 'Email', type: 'text', placeholder: 'robert@corp.com', required: true },
                    { id: 'phone', label: 'Phone', type: 'text', placeholder: '+1 555-123-4567' },
                    { id: 'location', label: 'Location', type: 'text', placeholder: 'New York, NY' },
                    { id: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'linkedin.com/in/robertsmith' },
                    { id: 'summary', label: 'Executive Summary', type: 'textarea', placeholder: 'Results-driven leader with 10+ years...' },
                ],
            },
            {
                id: 'experience', title: 'Professional Experience', icon: '💼', required: true, repeatable: true,
                fields: [
                    { id: 'company', label: 'Company', type: 'text', placeholder: 'McKinsey & Company', required: true },
                    { id: 'role', label: 'Title', type: 'text', placeholder: 'Senior Manager', required: true },
                    { id: 'startDate', label: 'Start Date', type: 'date', placeholder: '2019-01' },
                    { id: 'endDate', label: 'End Date', type: 'date', placeholder: '2024-12' },
                    { id: 'current', label: 'Current Position', type: 'toggle' },
                    { id: 'bullets', label: 'Key Achievements', type: 'textarea', placeholder: '• Led team of 15 to deliver $2M project\n• Increased revenue by 25%' },
                ],
            },
            {
                id: 'skills', title: 'Core Competencies', icon: '⭐', required: true, repeatable: false,
                fields: [
                    { id: 'technical', label: 'Professional Skills', type: 'chips', suggestions: ['Strategic Planning', 'P&L Management', 'Team Leadership', 'Data Analysis', 'Project Management'] },
                    { id: 'tools', label: 'Tools', type: 'chips', suggestions: ['Excel', 'Tableau', 'Salesforce', 'SAP', 'Power BI'] },
                ],
            },
            {
                id: 'education', title: 'Education', icon: '🎓', required: true, repeatable: true,
                fields: [
                    { id: 'institution', label: 'Institution', type: 'text', placeholder: 'Harvard Business School', required: true },
                    { id: 'degree', label: 'Degree', type: 'text', placeholder: 'MBA' },
                    { id: 'endDate', label: 'Year', type: 'date', placeholder: '2018' },
                ],
            },
            {
                id: 'certifications', title: 'Certifications', icon: '📜', required: false, repeatable: true,
                fields: [
                    { id: 'name', label: 'Certification', type: 'text', placeholder: 'PMP' },
                    { id: 'issuer', label: 'Issuer', type: 'text', placeholder: 'PMI' },
                    { id: 'date', label: 'Date', type: 'date' },
                ],
            },
        ],
    },
    creative: {
        sections: [
            {
                id: 'personalInfo', title: 'About Me', icon: '🎨', required: true, repeatable: false,
                fields: [
                    { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Alex Creative', required: true },
                    { id: 'email', label: 'Email', type: 'text', placeholder: 'alex@design.com', required: true },
                    { id: 'phone', label: 'Phone', type: 'text', placeholder: '+91 9876543210' },
                    { id: 'location', label: 'Location', type: 'text', placeholder: 'London, UK' },
                    { id: 'portfolio', label: 'Portfolio', type: 'text', placeholder: 'dribbble.com/alexcreative' },
                    { id: 'summary', label: 'Creative Statement', type: 'textarea', placeholder: 'Award-winning designer with a passion for...' },
                ],
            },
            {
                id: 'skills', title: 'Creative Skills', icon: '✨', required: true, repeatable: false,
                fields: [
                    { id: 'technical', label: 'Design Skills', type: 'chips', suggestions: ['UI/UX', 'Graphic Design', 'Motion Graphics', 'Typography', 'Branding', 'Illustration'], required: true },
                    { id: 'tools', label: 'Tools', type: 'chips', suggestions: ['Figma', 'Adobe Photoshop', 'Illustrator', 'After Effects', 'Sketch', 'Blender'] },
                ],
            },
            {
                id: 'projects', title: 'Portfolio Projects', icon: '🖼️', required: true, repeatable: true,
                fields: [
                    { id: 'name', label: 'Project Name', type: 'text', placeholder: 'Brand Identity for StartupX', required: true },
                    { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Designed complete brand identity...' },
                    { id: 'techStack', label: 'Tools Used', type: 'chips', suggestions: ['Figma', 'Photoshop', 'Illustrator'] },
                    { id: 'link', label: 'Portfolio Link', type: 'text', placeholder: 'behance.net/project' },
                ],
            },
            {
                id: 'experience', title: 'Experience', icon: '💼', required: false, repeatable: true,
                fields: [
                    { id: 'company', label: 'Company/Client', type: 'text', placeholder: 'Design Agency XYZ' },
                    { id: 'role', label: 'Role', type: 'text', placeholder: 'Senior Designer' },
                    { id: 'startDate', label: 'Start', type: 'date' },
                    { id: 'endDate', label: 'End', type: 'date' },
                    { id: 'bullets', label: 'Highlights', type: 'textarea', placeholder: '• Designed UI for app with 100K+ downloads' },
                ],
            },
            {
                id: 'education', title: 'Education', icon: '🎓', required: false, repeatable: true,
                fields: [
                    { id: 'institution', label: 'Institution', type: 'text', placeholder: 'School of Design' },
                    { id: 'degree', label: 'Degree', type: 'text', placeholder: 'BFA in Graphic Design' },
                    { id: 'endDate', label: 'Year', type: 'date' },
                ],
            },
        ],
    },
};

module.exports = fallbackSchemas;
