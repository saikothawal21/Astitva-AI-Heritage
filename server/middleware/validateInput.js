function validateHistorian(req, res, next) {
  const { place, topic } = req.body;
  if (!place || !topic) {
    return res.status(400).json({ success: false, error: 'Missing required fields: place, topic' });
  }
  req.body.language = req.body.language || 'English';
  req.body.mode = req.body.mode || 'Detailed';
  next();
}

function validateStory(req, res, next) {
  const { place } = req.body;
  if (!place) {
    return res.status(400).json({ success: false, error: 'Missing required field: place' });
  }
  req.body.duration = req.body.duration || 'medium';
  req.body.audience = req.body.audience || 'all';
  req.body.language = req.body.language || 'English';
  req.body.style = req.body.style || 'dramatic';
  next();
}

function validateQuiz(req, res, next) {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ success: false, error: 'Missing required field: topic' });
  }
  req.body.difficulty = req.body.difficulty || 'Medium';
  req.body.numQuestions = req.body.numQuestions ? Math.min(Number(req.body.numQuestions), 20) : 5;
  req.body.language = req.body.language || 'English';
  next();
}

function validateTrip(req, res, next) {
  const { destination, days } = req.body;
  if (!destination || !days) {
    return res.status(400).json({ success: false, error: 'Missing required fields: destination, days' });
  }
  req.body.travelType = req.body.travelType || 'Solo';
  next();
}

function validateCompare(req, res, next) {
  const { placeA, placeB } = req.body;
  if (!placeA || !placeB) {
    return res.status(400).json({ success: false, error: 'Missing required fields: placeA, placeB' });
  }
  req.body.language = req.body.language || 'English';
  next();
}

module.exports = {
  validateHistorian,
  validateStory,
  validateQuiz,
  validateTrip,
  validateCompare
};
