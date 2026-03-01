function buildFormPrompt(templateType) {
    const templateDescriptions = {
        fresher: 'entry-level candidate with limited work experience, focusing on education, projects, internships, and skills',
        developer: 'software developer highlighting technical skills, projects, open-source contributions, and engineering experience',
        corporate: 'business professional emphasizing leadership, achievements, corporate experience, and strategic impact',
        creative: 'creative professional showcasing portfolio, design skills, creative projects, and artistic achievements',
    };

    return `You are a professional resume form schema generator.

TEMPLATE TYPE: "${templateType}"
DESCRIPTION: This resume is for a ${templateDescriptions[templateType]}.

Generate a JSON form schema optimized for a "${templateType}" resume.
Return ONLY valid JSON (no markdown, no code fences) with this exact structure:

{
  "sections": [
    {
      "id": "unique_section_key",
      "title": "Section Display Name",
      "icon": "emoji_icon",
      "required": true_or_false,
      "repeatable": true_or_false,
      "description": "Brief description of this section",
      "fields": [
        {
          "id": "unique_field_key",
          "label": "Field Label",
          "type": "text|textarea|date|chips|toggle|select",
          "placeholder": "Helpful placeholder text",
          "required": true_or_false,
          "validation": {
            "minLength": 2,
            "maxLength": 500
          },
          "suggestions": ["optional", "prefilled", "chip", "values"],
          "helpText": "Brief guidance for the user on what to enter"
        }
      ]
    }
  ]
}

FIELD TYPE RULES:
- "text": Single line text input
- "textarea": Multi-line text (for summaries, descriptions, bullet points)
- "date": Month/year picker (format: YYYY-MM)
- "chips": Tag-style input for multiple items (skills, technologies)
- "toggle": Boolean toggle (e.g., "Currently working here")
- "select": Dropdown with options (include "options" array)

SECTION PRIORITIZATION for "${templateType}":
${templateType === 'fresher' ? '1. Personal Info → 2. Education → 3. Skills → 4. Projects → 5. Internships → 6. Certifications → 7. Extracurriculars' : ''}
${templateType === 'developer' ? '1. Personal Info → 2. Skills → 3. Experience → 4. Projects → 5. Open Source → 6. Education → 7. Certifications' : ''}
${templateType === 'corporate' ? '1. Personal Info → 2. Professional Summary → 3. Experience → 4. Skills → 5. Education → 6. Certifications → 7. Leadership' : ''}
${templateType === 'creative' ? '1. Personal Info → 2. Portfolio → 3. Creative Skills → 4. Projects → 5. Experience → 6. Education → 7. Awards' : ''}

REQUIREMENTS:
- Include 5-8 sections total
- Each section should have 3-7 fields
- "personalInfo" section is always first and always required
- Use appropriate field types
- Add helpful, specific placeholders
- Add concise helpText for non-obvious fields
- For "chips" fields, provide 5-8 relevant suggestions
- Make repeatable sections for experience, education, projects
- Return ONLY the JSON object, nothing else`;
}

module.exports = buildFormPrompt;
