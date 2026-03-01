function buildImprovePrompt(text, context = '') {
    return `You are an expert resume writer and career coach.

CONTEXT: ${context || 'Resume content improvement'}

ORIGINAL TEXT:
"${text}"

Rewrite this text to be:
1. Led with a strong action verb (Built, Designed, Optimized, Spearheaded, Engineered, Orchestrated)
2. Quantified with specific metrics where possible (%, $, time saved, users impacted, team size)
3. Concise — maximum 2 lines
4. ATS-friendly with relevant industry keywords
5. Impactful and results-oriented

Return ONLY valid JSON (no markdown, no code fences):
{
  "improved": "The rewritten, professional text",
  "keywords": ["extracted", "relevant", "keywords"],
  "changes": "Brief explanation of what was improved"
}`;
}

function buildSuggestAchievementsPrompt(role, company, description) {
    return `You are a career coach specializing in resume optimization.

ROLE: ${role}
COMPANY: ${company || 'Not specified'}
DESCRIPTION: ${description || 'Not provided'}

Based on this role, suggest 4-5 quantified achievement bullet points that someone in this position might include on their resume.

Each bullet point should:
- Start with a strong action verb
- Include specific metrics/numbers (even if estimated)
- Highlight impact and results
- Be ATS-optimized

Return ONLY valid JSON (no markdown, no code fences):
{
  "achievements": [
    "Bullet point 1 with metrics",
    "Bullet point 2 with metrics",
    "Bullet point 3 with metrics",
    "Bullet point 4 with metrics"
  ],
  "tips": "Brief advice specific to this role"
}`;
}

module.exports = { buildImprovePrompt, buildSuggestAchievementsPrompt };
