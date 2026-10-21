const geminiService = require('../services/geminiService');
const promptBuilder = require('../utils/promptBuilder');

async function historianController(req, res) {
  try {
    const { place, topic, language, mode } = req.body;
    const prompt = promptBuilder.buildHistorianPrompt({ place, topic, language, mode });
    const textResponse = await geminiService.generateTextContent(prompt);
    const data = geminiService.parseJSONResponse(textResponse);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function storyController(req, res) {
  try {
    const { place, duration, audience, language, style } = req.body;
    const prompt = promptBuilder.buildStoryPrompt({ place, duration, audience, language, style });
    const textResponse = await geminiService.generateTextContent(prompt);
    const data = geminiService.parseJSONResponse(textResponse);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function quizController(req, res) {
  try {
    const { topic, difficulty, numQuestions, language } = req.body;
    const prompt = promptBuilder.buildQuizPrompt({ topic, difficulty, numQuestions, language });
    const textResponse = await geminiService.generateTextContent(prompt);
    const data = geminiService.parseJSONResponse(textResponse);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function imageAnalysisController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image provided' });
    }
    const prompt = promptBuilder.buildImageAnalysisPrompt();
    const textResponse = await geminiService.generateWithImage(prompt, req.file.buffer, req.file.mimetype);
    const data = geminiService.parseJSONResponse(textResponse);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function tripController(req, res) {
  try {
    const { startLocation, destination, days, budget, transportation, interests, travelType } = req.body;
    const prompt = promptBuilder.buildTripPrompt({ startLocation, destination, days, budget, transportation, interests, travelType });
    const textResponse = await geminiService.generateTextContent(prompt);
    const data = geminiService.parseJSONResponse(textResponse);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function compareController(req, res) {
  try {
    const { placeA, placeB, language } = req.body;
    const prompt = promptBuilder.buildComparePrompt({ placeA, placeB, language });
    const textResponse = await geminiService.generateTextContent(prompt);
    const data = geminiService.parseJSONResponse(textResponse);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = {
  historianController,
  storyController,
  quizController,
  imageAnalysisController,
  tripController,
  compareController
};
