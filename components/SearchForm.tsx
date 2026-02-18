'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
    onSearch: (query: string, append: boolean) => void;
    isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent, append: boolean = false) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query, append);
        }
    };

    return (
        <form className="flex gap-2 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: dentistas en las condes"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                    disabled={isLoading}
                />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={(e) => handleSubmit(e, false)}
                    disabled={isLoading || !query.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                    {isLoading ? 'Buscando...' : 'Buscar (Nuevo)'}
                </button>
                <button
                    onClick={(e) => handleSubmit(e, true)}
                    disabled={isLoading || !query.trim()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                    {isLoading ? 'Buscando...' : 'Buscar y Agregar'}
                </button>
            </div>
        </form>
    );
}
