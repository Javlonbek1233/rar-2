'use client';

import { SortKey } from '@/types';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: SortKey;
  onChange: (key: SortKey) => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'name-asc', label: 'Nomi bo’yicha (A \u2192 Z)' },
  { value: 'name-desc', label: 'Nomi bo’yicha (Z \u2192 A)' },
  { value: 'population-desc', label: 'Aholisi (Ko’pdan \u2192 Kamga)' },
  { value: 'population-asc', label: 'Aholisi (Kamdan \u2192 Ko’pga)' },
  { value: 'area-desc', label: 'Maydoni (Kattadan \u2192 Kichikka)' },
  { value: 'area-asc', label: 'Maydoni (Kichikdan \u2192 Kattaga)' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div 
      id="sort-dropdown-container"
      className="relative flex items-center bg-[#09090b] border border-[#27272a] rounded-xl px-3 py-2 shadow-sm focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all duration-150"
    >
      <div className="text-[#a1a1aa] mr-2 flex items-center pointer-events-none">
        <ArrowUpDown size={15} />
      </div>
      
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="appearance-none font-sans font-medium text-xs text-[#fafafa] bg-transparent outline-none pr-6 cursor-pointer focus:outline-none"
        aria-label="Saralash turi"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#18181b] text-[#fafafa] font-sans">
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom Chevron Indicator */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#a1a1aa]">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
