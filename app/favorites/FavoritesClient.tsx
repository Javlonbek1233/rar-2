'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { Country } from '@/types';
import CountryCard from '@/components/CountryCard';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Search, ArrowRight, XCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';

interface FavoritesClientProps {
  allCountries: Country[];
}

export default function FavoritesClient({ allCountries }: FavoritesClientProps) {
  const { favorites, isInitialized } = useFavorites();
  const [favoriteSearch, setFavoriteSearch] = useState('');

  // Hydrate actual country objects corresponding to favorite cca3 codes
  const favoriteCountries = useMemo(() => {
    return allCountries.filter((country) =>
      favorites.includes(country.cca3.toUpperCase())
    );
  }, [allCountries, favorites]);

  // Support mini search specifically within favorited items
  const filteredFavorites = useMemo(() => {
    if (!favoriteSearch) return favoriteCountries;
    const q = favoriteSearch.toLowerCase().trim();
    return favoriteCountries.filter(
      (c) =>
        c.name.common.toLowerCase().includes(q) ||
        c.name.official.toLowerCase().includes(q) ||
        (c.capital && c.capital.some((cap) => cap.toLowerCase().includes(q)))
    );
  }, [favoriteCountries, favoriteSearch]);

  if (!isInitialized) {
    return <Loading message="Siz saqlagan sevimli davlatlar ro'yxati tiklanmoqda..." />;
  }

  return (
    <div className="space-y-8" id="favorites-client-root">
      {/* Title block */}
      <div className="space-y-2">
        <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#fafafa] tracking-tight flex items-center gap-3">
          <Heart size={28} className="text-rose-500 fill-rose-500/20 stroke-[2.2]" />
          Sevimli Davlatlaringiz
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#a1a1aa] max-w-xl">
          Bu yerda siz tez-tez ko&apos;rib turish uchun sevimli qilib belgilagan va saqlab qo&apos;ygan davlatlaringiz jamlangan.
        </p>
      </div>

      {favoriteCountries.length > 0 ? (
        <div className="space-y-6">
          {/* Sub-search for favorites */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-5 bg-[#18181b] border border-[#27272a] rounded-2xl shadow-md">
            <SearchBar 
              value={favoriteSearch} 
              onChange={setFavoriteSearch} 
              placeholder="Sevimli davlatlar ichidan qidiring..." 
            />
            <div className="text-[#a1a1aa] font-sans text-xs shrink-0 font-semibold bg-[#09090b] border border-[#27272a] px-3.5 py-2.5 rounded-xl">
              Jami saqlangan: <span className="font-mono text-[#fafafa] font-bold">{favoriteCountries.length} ta</span>
            </div>
          </div>

          {filteredFavorites.length > 0 ? (
            <motion.div
              id="favorites-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredFavorites.map((country) => (
                  <CountryCard key={country.cca3} country={country} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Search mismatch empty state */
            <div className="text-center py-16 bg-[#18181b]/30 rounded-2xl border border-dashed border-[#27272a]" id="favorites-search-empty">
              <span className="text-2xl mb-2 block" role="img" aria-label="No match">🔎</span>
              <p className="font-sans text-xs text-[#a1a1aa]">
                Sevimli davlatlar orasida &quot;{favoriteSearch}&quot; so&apos;ziga mos keladigan davlat topilmadi.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Overall empty state */
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 px-4 bg-[#18181b] border border-[#27272a] rounded-[2rem] shadow-xl max-w-xl mx-auto"
          id="favorites-empty-container"
        >
          <div className="p-4 bg-rose-950/20 text-rose-500 border border-rose-900/30 rounded-full w-14 h-14 mx-auto flex items-center justify-center mb-5 animate-pulse">
            <Heart size={28} className="stroke-[2]" />
          </div>
          <h2 className="font-sans font-bold text-[#fafafa] text-base mb-2">
            Sevimlilar ro&apos;yxati bo&apos;sh
          </h2>
          <p className="font-sans text-xs text-[#a1a1aa] max-w-sm mx-auto mb-8 leading-relaxed">
            Hozircha sevimli ro&apos;yxatingizga hech qanday davlat qo&apos;shilmagan. Davlat ma&apos;lumotlari kartasidagi yurak tugmasini bosish orqali qo&apos;shishingiz mumkin.
          </p>

          <Link href="/" passHref legacyBehavior>
            <a className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs rounded-xl shadow-lg border border-indigo-500/30 transition duration-150 cursor-pointer">
              Bosh sahifaga o&apos;tish
              <ArrowRight size={14} />
            </a>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
