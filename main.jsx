import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { TechnologyProvider } from './contexts/TechnologyContext';
import './styles/globals.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TechnologyProvider>
        <LanguageProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </LanguageProvider>
      </TechnologyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
