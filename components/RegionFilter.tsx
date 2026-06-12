'use client';

import { Region } from '@/types';

interface RegionFilterProps {
  selected: Region;
  onChange: (region: Region) => void;
}

const REGIONS: { value: Region; label: string }[] = [
  { value: 'All', label: 'Barchasi' },
  { value: 'Africa', label: 'Afrika' },
  { value: 'Americas', label: 'Amerika' },
  { value: 'Asia', label: 'Osiyo' },
  { value: 'Europe', label: 'Yevropa' },
  { value: 'Oceania', label: 'Okeaniya' },
  { value: 'Antarctic', label: 'Antarktika' }
];

export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  return (
    <div 
      id="region-filter-wrapper"
      className="w-full flex items-center"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none scroll-smooth snap-x snap-mandatory">
        {REGIONS.map((region) => {
          const isSelected = selected === region.value;
          return (
            <button
              id={`region-pill-${region.value}`}
              key={region.value}
              onClick={() => onChange(region.value)}
              className={`px-4 py-2 font-sans font-medium text-xs rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer snap-start
                ${isSelected 
                  ? 'bg-indigo-600 text-[#fafafa] border border-indigo-500 shadow-md shadow-indigo-900/10' 
                  : 'bg-[#09090b] text-[#a1a1aa] border border-[#27272a] hover:bg-[#18181b] hover:text-[#fafafa]'
                }`}
            >
              {region.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
