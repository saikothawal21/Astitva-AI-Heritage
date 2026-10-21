const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

async function generateTextContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error in generateTextContent:', error);
    throw new Error(`Failed to generate text content: ${error.message}`);
  }
}

async function generateWithImage(prompt, imageBuffer, mimeType) {
  try {
    const base64String = imageBuffer.toString('base64');
    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64String, mimeType } }
    ]);
    return result.response.text();
  } catch (error) {
    console.error('Error in generateWithImage:', error);
    throw new Error(`Failed to generate content with image: ${error.message}`);
  }
}

function parseJSONResponse(text) {
  try {
    // Try to parse the full text as JSON
    return JSON.parse(text);
  } catch (e1) {
    // If that fails, extract JSON from markdown code blocks
    try {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (match && match[1]) {
        return JSON.parse(match[1]);
      }
    } catch (e2) {}

    // If that fails, try to find { ... } or [ ... ] in the text
    try {
      const startIndex = Math.min(
        text.indexOf('{') !== -1 ? text.indexOf('{') : Infinity,
        text.indexOf('[') !== -1 ? text.indexOf('[') : Infinity
      );
      if (startIndex !== Infinity) {
        const lastIndex = Math.max(text.lastIndexOf('}'), text.lastIndexOf(']'));
        if (lastIndex > startIndex) {
          return JSON.parse(text.substring(startIndex, lastIndex + 1));
        }
      }
    } catch (e3) {}

    // If all parsing fails, return raw text
    return { rawText: text };
  }
}

module.exports = { generateTextContent, generateWithImage, parseJSONResponse };
