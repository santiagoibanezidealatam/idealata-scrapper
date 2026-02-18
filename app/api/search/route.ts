import { NextResponse } from 'next/server';
import { searchBusinesses } from '@/lib/rapidapi';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const region = searchParams.get('region') || 'us';
    const language = searchParams.get('language') || 'en';

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    try {
        const data = await searchBusinesses(query, region, language);

        // Transform data to match the requested format
        const transformedData = data.data.map((item: any) => ({
            nombre: item.name,
            puntuacion: item.rating,
            direccion: item.full_address, // Or compose from street, city, etc.
            comuna: item.city, // Approximation, as "comuna" is specific to some regions
            estado: item.state,
            pais: item.country,
            categoria: item.type,
            categoria_secundaria: item.subtypes ? item.subtypes.join(', ') : '',
            url_ficha: item.place_link,
            correo: item.emails ? item.emails[0] : '', // API might not return this directly in search, need to check detailed
            telefono: item.phone_number,
            sitio_web: item.website,
            posicion_ficha: item.rank || '', // If available
            // Extra fields for debugging or completeness
            latitud: item.latitude,
            longitud: item.longitude,
        }));

        return NextResponse.json({ data: transformedData });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
