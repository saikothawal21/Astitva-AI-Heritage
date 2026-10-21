require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (process.env.GEMINI_API_KEY) {
    console.log('Gemini API Key is configured.');
  } else {
    console.warn('WARNING: Gemini API Key is missing in environment variables.');
  }
});
