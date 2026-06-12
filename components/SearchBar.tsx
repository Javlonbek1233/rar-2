'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Davlat nomi, poytaxti yoki alfa kodi bo'yicha qidiring..."
}: SearchBarProps) {
  return (
    <div 
      id="search-bar-wrapper"
      className="relative w-full max-w-lg group"
    >
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#a1a1aa] group-focus-within:text-indigo-400 transition-colors duration-200">
        <Search size={18} className="stroke-[2]" />
      </div>
      
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 text-sm font-sans font-normal text-[#fafafa] placeholder-zinc-500 bg-[#09090b] border border-[#27272a] rounded-2xl shadow-sm outline-none transition-all duration-200 focus:border-indigo-505 focus:border-[#4f46e5]/80 focus:ring-4 focus:ring-indigo-500/10"
      />

      {value && (
        <button
          id="search-clear-button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-3 flex items-center px-1 text-[#a1a1aa] hover:text-[#fafafa] cursor-pointer"
          aria-label="Qidiruvni tozalash"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
