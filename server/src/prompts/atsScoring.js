function buildATSPrompt(resumeData, targetRole) {
    return `You are an expert ATS (Applicant Tracking System) parser and technical recruiter. Analyze the following resume data and return ONLY a raw JSON object containing the ATS analysis. Do not include markdown formatting like \`\`\`json.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

TARGET ROLE (if any): "${targetRole || 'General professional role'}"

Analyze the resume on these 7 parameters out of 100 based on the following weightages:
1. Keyword Match (30%) - alignment with standard job descriptions for the target role
2. Skills Section (15%) - presence and quality of technical and soft skills
3. Formatting (15%) - readability of the provided structure and cleanliness
4. Experience (15%) - impactful vocabulary and action verbs in work history
5. Education (10%) - relevance and presentation of education details
6. Readability (10%) - grammar, sentence structure, and clarity
7. Projects & Certifications (5%) - presence of relevant projects or external validations

Calculate a weighted "total" score out of 100 based on the percentages above.

Return exact JSON format:
{
  "total": 85,
  "parameters": [
    {"name": "Keyword Match", "score": 80, "desc": "Good keywords but missing some specific technologies."},
    {"name": "Skills Section", "score": 75, "desc": "Skills are listed but could be categorized better."},
    {"name": "Formatting", "score": 90, "desc": "Clean and easily machine-readable data structure."},
    {"name": "Experience", "score": 85, "desc": "Strong action verbs used, good quantifiable metrics."},
    {"name": "Education", "score": 100, "desc": "Education details are clear and complete."},
    {"name": "Readability", "score": 88, "desc": "Good grammar and sentence flow, easy to parse."},
    {"name": "Projects/Certifications", "score": 70, "desc": "Some projects listed, but lacking clear tech stacks."}
  ],
  "review": "Write a 2-3 sentence professional review here, summarizing the overall ATS viability based on the actual data."
}`;
}

module.exports = buildATSPrompt;
