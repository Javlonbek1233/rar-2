import { getAllCountries } from '@/lib/api';
import FavoritesClient from './FavoritesClient';
import { Country } from '@/types';

export const revalidate = 0; // Ensure client updates take action on reload

export const metadata = {
  title: "Sevimli Davlatlar | WorldExplorer",
  description: "O'zingiz saqlab qo'ygan sevimli dunyo davlatlari ro'yxatini ko'rish va boshqarish.",
};

export default async function FavoritesPage() {
  let countries: Country[] = [];
  try {
    countries = await getAllCountries();
  } catch (error) {
    console.error('Failed to pre-fetch countries for favorites page:', error);
  }

  return (
    <div id="favorites-page-root">
      <FavoritesClient allCountries={countries} />
    </div>
  );
}
