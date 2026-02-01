import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ProgressProvider } from './contexts/ProgressContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { TechnologyProvider } from './contexts/TechnologyContext';
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <TechnologyProvider>
          <LanguageProvider>
            <ProgressProvider>
              <App />
            </ProgressProvider>
          </LanguageProvider>
        </TechnologyProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);


