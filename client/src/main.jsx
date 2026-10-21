import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { background: '#1c1917', color: '#fef3c7', borderRadius: '12px' } }} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
