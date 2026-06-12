'use client';

import { useState, useEffect } from 'react';

/**
 * Persists and manages a list of favorite country codes (cca3) in localStorage.
 * Handles hydration mismatch safely under Next.js SSR.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Safely hydrate state from localStorage on client mount
  useEffect(() => {
    const loadSaved = () => {
      try {
        const stored = localStorage.getItem('worldexplorer-favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    setTimeout(loadSaved, 0);
  }, []);

  const addFavorite = (cca3: string) => {
    if (!cca3) return;
    const upperCode = cca3.toUpperCase();
    if (favorites.includes(upperCode)) return;
    
    const updated = [...favorites, upperCode];
    setFavorites(updated);
    localStorage.setItem('worldexplorer-favorites', JSON.stringify(updated));
  };

  const removeFavorite = (cca3: string) => {
    if (!cca3) return;
    const upperCode = cca3.toUpperCase();
    const updated = favorites.filter((code) => code !== upperCode);
    setFavorites(updated);
    localStorage.setItem('worldexplorer-favorites', JSON.stringify(updated));
  };

  const isFavorite = (cca3: string): boolean => {
    if (!cca3) return false;
    return favorites.includes(cca3.toUpperCase());
  };

  const toggleFavorite = (cca3: string) => {
    if (!cca3) return;
    if (isFavorite(cca3)) {
      removeFavorite(cca3);
    } else {
      addFavorite(cca3);
    }
  };

  return {
    favorites,
    isInitialized,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
