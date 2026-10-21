const JSON_INSTRUCTION = "Respond ONLY with valid JSON. Do not include any text, explanation, or markdown outside the JSON object.";

function buildHistorianPrompt({ place, topic, language, mode }) {
  return `Act as a historical expert. Provide information about ${place} regarding ${topic} in ${language} language.
Use the ${mode} mode for the depth and style of your response (e.g. Quick Facts, Simple, Detailed, Story, Kids, Academic, Research).

${JSON_INSTRUCTION}

Expected JSON response schema:
{
  "title": "string",
  "summary": "string",
  "facts": ["string"],
  "historicalSignificance": "string",
  "timeline": [{ "year": "string", "event": "string" }],
  "sources": ["string"]
}`;
}

function buildStoryPrompt({ place, duration, audience, language, style }) {
  return `Act as a storyteller. Generate a historical story about ${place}.
Duration: ${duration}.
Target Audience: ${audience}.
Language: ${language}.
Style: ${style}.

${JSON_INSTRUCTION}

Expected JSON response schema:
{
  "title": "string",
  "content": "string (the full story, can be multiple paragraphs)",
  "characters": ["string"],
  "keyEvents": ["string"],
  "historicalDisclaimer": "string"
}`;
}

function buildQuizPrompt({ topic, difficulty, numQuestions, language }) {
  return `Generate a quiz with ${numQuestions} multiple-choice questions about ${topic}.
Difficulty Level: ${difficulty}.
Language: ${language}.

${JSON_INSTRUCTION}

Expected JSON response schema:
{
  "title": "string",
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": 0,
      "explanation": "string"
    }
  ]
}`;
}

function buildImageAnalysisPrompt() {
  return `Analyze the provided image of a heritage site or artifact.
IMPORTANT: Never present uncertain identification as confirmed fact. Always express confidence levels clearly.

${JSON_INSTRUCTION}

Expected JSON response schema:
{
  "identification": "string",
  "confidence": "high|medium|low",
  "architecturalStyle": "string",
  "historicalClues": ["string"],
  "possibleLocation": "string",
  "visibleElements": ["string"],
  "estimatedPeriod": "string",
  "historicalContext": "string",
  "disclaimer": "string"
}`;
}

function buildTripPrompt({ startLocation, destination, days, budget, transportation, interests, travelType }) {
  return `Plan a ${days}-day heritage trip.
Destination: ${destination}.
${startLocation ? `Start Location: ${startLocation}.` : ''}
${budget ? `Budget: ${budget}.` : ''}
${transportation ? `Transportation: ${transportation}.` : ''}
${interests ? `Interests: ${interests}.` : ''}
Travel Type: ${travelType}.

${JSON_INSTRUCTION}

Expected JSON response schema:
{
  "title": "string",
  "overview": "string",
  "itinerary": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "time": "string",
          "activity": "string",
          "description": "string",
          "historicalHighlight": "string"
        }
      ]
    }
  ],
  "foodSuggestions": ["string"],
  "travelTips": ["string"],
  "budgetBreakdown": {
    "accommodation": "string",
    "food": "string",
    "transport": "string",
    "activities": "string",
    "total": "string"
  },
  "practicalNotes": ["string"]
}`;
}

function buildComparePrompt({ placeA, placeB, language }) {
  return `Compare the following two heritage places in ${language} language: ${placeA} and ${placeB}.

${JSON_INSTRUCTION}

Expected JSON response schema:
{
  "placeA": { "name": "string" },
  "placeB": { "name": "string" },
  "comparison": {
    "historicalPeriod": { "placeA": "string", "placeB": "string" },
    "historicalImportance": { "placeA": "string", "placeB": "string" },
    "architecture": { "placeA": "string", "placeB": "string" },
    "culturalSignificance": { "placeA": "string", "placeB": "string" },
    "majorEvents": { "placeA": "string", "placeB": "string" },
    "uniqueFeatures": { "placeA": "string", "placeB": "string" },
    "bestReasonToVisit": { "placeA": "string", "placeB": "string" }
  }
}`;
}

module.exports = {
  buildHistorianPrompt,
  buildStoryPrompt,
  buildQuizPrompt,
  buildImageAnalysisPrompt,
  buildTripPrompt,
  buildComparePrompt
};
