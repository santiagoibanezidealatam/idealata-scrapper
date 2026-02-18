import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'e402ba9d3emsh5f5f63e4194bb62p140c86jsnb933545dd7a2';
const RAPIDAPI_HOST = 'local-business-data.p.rapidapi.com';

export interface BusinessData {
  business_id: string;
  name: string;
  rating?: number;
  review_count?: number;
  phone_number?: string;
  website?: string;
  full_address?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  type?: string;
  subtypes?: string[];
  photos?: string[];
  working_hours?: any;
  about?: any;
  verified?: boolean;
  place_link?: string;
  cid?: string;
  reviews_link?: string;
  owner_id?: string;
  owner_link?: string;
  booking_link?: string;
  reservations_link?: string;
  business_status?: string;
  photo_count?: number;
  google_id?: string;
  place_id?: string;
  description?: string;
  category?: string;
  address?: string;
  district?: string;
}

export const searchBusinesses = async (query: string, region: string = 'us', language: string = 'en') => {
  const options = {
    method: 'GET',
    url: 'https://local-business-data.p.rapidapi.com/search',
    params: {
      query: query,
      limit: '20',
      region: region,
      language: language,
    },
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from RapidAPI:', error);
    throw error;
  }
};
