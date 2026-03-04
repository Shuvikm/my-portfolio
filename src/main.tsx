import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import NotFound from './components/pages/NotFound.tsx';
import './styles/index.css';

// Enable global text smoothing
(document.documentElement.style as any).WebkitFontSmoothing = 'antialiased';
(document.documentElement.style as any).MozOsxFontSmoothing = 'grayscale';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
