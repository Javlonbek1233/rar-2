'use client';

import { Country } from '@/types';
import { formatNumber, formatList } from '@/utils/formatters';
import { MapPin, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import FavoriteButton from './FavoriteButton';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const { name, cca3, capital, region, population, flags } = country;

  return (
    <motion.div
      id={`country-card-${cca3}`}
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-950/20 transition-all duration-300 flex flex-col h-full hover:ring-1 hover:ring-indigo-500/30"
    >
      {/* Flag Image + Floating Favorite Button */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-[#27272a]">
        <Link href={`/country/${cca3.toLowerCase()}`} className="block h-full cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flags.png}
            alt={flags.alt || `${name.common} bayrog'i`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Favorite circle button overlay */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton cca3={cca3} />
        </div>
        
        {/* Dynamic badge for Region */}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#09090b]/80 backdrop-blur-sm text-[10px] font-sans font-bold text-white rounded-lg tracking-wider uppercase border border-zinc-800">
          {region}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="mb-4">
          <Link href={`/country/${cca3.toLowerCase()}`} className="cursor-pointer">
            <h3 className="font-sans font-bold text-base text-[#fafafa] leading-snug group-hover:text-indigo-400 transition-colors duration-200 line-clamp-1 mb-1">
              {name.common}
            </h3>
          </Link>
          <span className="font-sans text-[11px] font-medium text-[#a1a1aa] block truncate leading-none">
            {name.official}
          </span>
        </div>

        {/* Detailed miniature attributes list */}
        <div className="space-y-2.5 pt-3 border-t border-[#27272a]">
          <div className="flex items-center gap-2 text-[#a1a1aa] font-sans text-[12px]">
            <MapPin size={14} className="text-[#a1a1aa]/80 shrink-0" />
            <span className="font-semibold text-zinc-300 mr-1">Poytaxt:</span>
            <span className="truncate text-[#fafafa]">{formatList(capital, 'Mavjud emas')}</span>
          </div>

          <div className="flex items-center gap-2 text-[#a1a1aa] font-sans text-[12px]">
            <Users size={14} className="text-[#a1a1aa]/80 shrink-0" />
            <span className="font-semibold text-zinc-300 mr-1">Aholi:</span>
            <span className="text-[#fafafa]">{formatNumber(population)}</span>
          </div>

          <div className="flex items-center gap-2 text-[#a1a1aa] font-sans text-[12px]">
            <Globe size={14} className="text-[#a1a1aa]/80 shrink-0" />
            <span className="font-semibold text-zinc-300 mr-1">Kontinent:</span>
            <span className="truncate text-[#fafafa]">{region}</span>
          </div>
        </div>
      </div>
      
      {/* Clickable footer overlay link to expand details */}
      <div className="px-5 pb-5 pt-1">
        <Link href={`/country/${cca3.toLowerCase()}`} className="w-full inline-flex items-center justify-center font-sans font-bold text-xs text-indigo-400 hover:text-[#fafafa] bg-[#09090b] border border-[#27272a] hover:bg-[#27272a]/70 py-2.5 rounded-xl transition duration-150 cursor-pointer text-center">
          Batafsil ma&apos;lumot
        </Link>
      </div>
    </motion.div>
  );
}
