function buildATSPrompt(resumeData, targetRole) {
    return `You are an ATS (Applicant Tracking System) expert and resume analyzer.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

TARGET ROLE: "${targetRole || 'General professional role'}"

Analyze this resume against ATS best practices and score it 0-100.

Evaluate these categories:
1. **Formatting** (0-100): Clear headers, consistent structure, no complex formatting
2. **Keywords** (0-100): Relevant industry/role keywords present
3. **Experience** (0-100): Action verbs, quantified results, relevance
4. **Skills** (0-100): Technical and soft skills alignment with target role
5. **Education** (0-100): Relevant education, certifications, coursework
6. **Completeness** (0-100): All essential sections present and filled

Return ONLY valid JSON (no markdown, no code fences):
{
  "score": 78,
  "grade": "B+",
  "breakdown": {
    "formatting": {
      "score": 90,
      "feedback": "Specific feedback about formatting"
    },
    "keywords": {
      "score": 65,
      "feedback": "Specific feedback about keywords",
      "missing": ["keyword1", "keyword2"]
    },
    "experience": {
      "score": 80,
      "feedback": "Specific feedback about experience bullets"
    },
    "skills": {
      "score": 75,
      "feedback": "Specific feedback about skills"
    },
    "education": {
      "score": 85,
      "feedback": "Specific feedback about education"
    },
    "completeness": {
      "score": 70,
      "feedback": "Specific feedback about completeness"
    }
  },
  "topSuggestions": [
    "Actionable suggestion 1",
    "Actionable suggestion 2",
    "Actionable suggestion 3",
    "Actionable suggestion 4",
    "Actionable suggestion 5"
  ],
  "missingKeywords": ["relevant", "missing", "keywords"],
  "strengths": ["Specific strength 1", "Specific strength 2"]
}`;
}

module.exports = buildATSPrompt;
