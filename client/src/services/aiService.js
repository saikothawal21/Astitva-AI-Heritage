const API_BASE = '/api/ai';

async function request(endpoint, body, isFormData = false) {
  const options = {
    method: 'POST',
    ...(isFormData
      ? { body }
      : { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  };
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data.data;
}

export const generateHistorian = (params) => request('/historian', params);
export const generateStory = (params) => request('/story', params);
export const generateQuiz = (params) => request('/quiz', params);
export const analyzeImage = (formData) => request('/analyze-image', formData, true);
export const generateTrip = (params) => request('/trip', params);
export const compareHeritage = (params) => request('/compare', params);
