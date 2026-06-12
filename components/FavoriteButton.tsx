'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FavoriteButtonProps {
  cca3: string;
  className?: string;
  iconSize?: number;
}

export default function FavoriteButton({ cca3, className = '', iconSize = 18 }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isInitialized } = useFavorites();
  const active = isFavorite(cca3);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(cca3);
  };

  if (!isInitialized) {
    return (
      <div 
        className={`w-9 h-9 rounded-full bg-zinc-800/80 animate-pulse ${className}`}
      />
    );
  }

  return (
    <motion.button
      id={`favorite-button-${cca3}`}
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all border shadow-md
        ${active 
          ? 'bg-rose-950/20 border-rose-900/30 text-rose-500 hover:bg-rose-950/30 hover:text-rose-400' 
          : 'bg-[#09090b]/80 backdrop-blur-md border-[#27272a] text-zinc-400 hover:text-rose-500 hover:bg-[#18181b]/95 hover:border-rose-500/30'
        } ${className}`}
      aria-label={active ? "Sevimli ro'yxatdan o'chirish" : "Sevimli ro'yxatga qo'shish"}
    >
      <Heart 
        size={iconSize} 
        className={`transition-colors duration-200 ${active ? 'fill-rose-500 stroke-[2.2]' : 'stroke-[1.8]'}`} 
      />
    </motion.button>
  );
}
