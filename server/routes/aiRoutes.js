const router = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });
const { validateHistorian, validateStory, validateQuiz, validateTrip, validateCompare } = require('../middleware/validateInput');
const ctrl = require('../controllers/aiController');

router.post('/historian', validateHistorian, ctrl.historianController);
router.post('/story', validateStory, ctrl.storyController);
router.post('/quiz', validateQuiz, ctrl.quizController);
router.post('/analyze-image', upload.single('image'), ctrl.imageAnalysisController);
router.post('/trip', validateTrip, ctrl.tripController);
router.post('/compare', validateCompare, ctrl.compareController);

module.exports = router;
