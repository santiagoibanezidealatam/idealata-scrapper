'use client';

import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

interface ResultItem {
    nombre: string;
    puntuacion: number;
    direccion: string;
    comuna: string;
    estado: string;
    pais: string;
    categoria: string;
    categoria_secundaria: string;
    url_ficha: string;
    correo: string;
    telefono: string;
    sitio_web: string;
    posicion_ficha: string;
}

interface ResultsTableProps {
    results: ResultItem[];
}

export default function ResultsTable({ results }: ResultsTableProps) {
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(results);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Resultados');
        XLSX.writeFile(workbook, 'resultados_google_maps.xlsx');
    };

    if (results.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Resultados ({results.length})</h2>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Download size={20} />
                    Exportar a Excel
                </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Puntuación</th>
                            <th className="px-6 py-3">Dirección</th>
                            <th className="px-6 py-3">Teléfono</th>
                            <th className="px-6 py-3">Sitio Web</th>
                            <th className="px-6 py-3">Categoría</th>
                            <th className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.nombre}</td>
                                <td className="px-6 py-4">{item.puntuacion || '-'}</td>
                                <td className="px-6 py-4">{item.direccion}</td>
                                <td className="px-6 py-4">{item.telefono || '-'}</td>
                                <td className="px-6 py-4">
                                    {item.sitio_web ? (
                                        <a href={item.sitio_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Link
                                        </a>
                                    ) : '-'}
                                </td>
                                <td className="px-6 py-4">{item.categoria}</td>
                                <td className="px-6 py-4">
                                    {item.url_ficha && (
                                        <a href={item.url_ficha} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            Ver Ficha
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
