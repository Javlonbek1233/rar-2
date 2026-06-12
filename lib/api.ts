import { Country } from '@/types';

const BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Fetch all countries from REST Countries API
 */
export async function getAllCountries(): Promise<Country[]> {
  try {
    const res = await fetch(`${BASE_URL}/all`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch countries: ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!Array.isArray(data)) {
      console.error('REST Countries API returned a non-array response:', data);
      throw new Error('API did not return a list of countries.');
    }
    
    // Sort alphabetically by default to avoid random ordering
    return [...data].sort((a, b) => {
      const nameA = a?.name?.common || '';
      const nameB = b?.name?.common || '';
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    console.error('Error in getAllCountries:', error);
    throw error;
  }
}

/**
 * Fetch detailed info for a single country by its cca3 code
 */
export async function getCountryByCca3(cca3: string): Promise<Country | null> {
  if (!cca3) return null;
  try {
    const res = await fetch(`${BASE_URL}/alpha/${cca3}`, {
      next: { revalidate: 86400 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch country ${cca3}: ${res.statusText}`);
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    if (data && typeof data === 'object' && !Array.isArray(data) && 'name' in data) {
      return data as Country;
    }
    return null;
  } catch (error) {
    console.error(`Error in getCountryByCca3 (${cca3}):`, error);
    return null;
  }
}

/**
 * Fetch a list of countries matching multiple 3-letter codes
 */
export async function getCountriesByCodes(codes: string[]): Promise<Country[]> {
  if (!codes || codes.length === 0) return [];
  try {
    const filteredCodes = codes.map((c) => c.trim().toLowerCase()).filter(Boolean);
    if (filteredCodes.length === 0) return [];

    const res = await fetch(`${BASE_URL}/alpha?codes=${filteredCodes.join(',')}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch countries by codes: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error in getCountriesByCodes:', error);
    return [];
  }
}
