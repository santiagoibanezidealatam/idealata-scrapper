'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import ResultsTable from '@/components/ResultsTable';
import LoginScreen from '@/components/LoginScreen';
import axios from 'axios';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string, append: boolean) => {
    setIsLoading(true);
    setError('');

    // If we are replacing, we can clear results immediately, 
    // BUT user might want to keep them if error? 
    // Standard behavior is usually clear on start of new search if replacing.
    if (!append) {
      setResults([]);
    }

    try {
      const response = await axios.get('/api/search', {
        params: { query }
      });

      const newResults = response.data.data;

      if (append) {
        setResults(prev => [...prev, ...newResults]);
      } else {
        setResults(newResults);
      }
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al buscar los datos. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Google Maps Scraper</h1>
          <p className="text-lg text-gray-600">Busca negocios y extrae información detallada</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {results.length > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={clearResults}
                className="text-sm text-red-600 hover:text-red-800 font-medium underline"
              >
                Limpiar resultados ({results.length})
              </button>
            </div>
          )}

          <ResultsTable results={results} />
        </div>
      </div>
    </main>
  );
}
