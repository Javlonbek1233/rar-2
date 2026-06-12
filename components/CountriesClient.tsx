'use client';

import { useState, useMemo, useEffect } from 'react';
import { Country, Region, SortKey } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import SortDropdown from './SortDropdown';
import CountryCard from './CountryCard';
import StatCard from './StatCard';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Globe2, Layers, Landmark } from 'lucide-react';
import { formatNumber, formatArea } from '@/utils/formatters';

interface CountriesClientProps {
  initialCountries: Country[];
}

const ITEMS_PER_PAGE = 24;

export default function CountriesClient({ initialCountries }: CountriesClientProps) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');
  const [sortBy, setSortBy] = useState<SortKey>('name-asc');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Debounced search to ensure snappy layout transitions
  const debouncedSearch = useDebounce(search, 300);

  // Reset page pagination length whenever filters are altered
  useEffect(() => {
    const resetCount = () => {
      setVisibleCount(ITEMS_PER_PAGE);
    };
    setTimeout(resetCount, 0);
  }, [debouncedSearch, selectedRegion, sortBy]);

  // Compute filtered & sorted countries
  const filteredAndSortedCountries = useMemo(() => {
    let result = [...initialCountries];

    // Filter by Region
    if (selectedRegion !== 'All') {
      result = result.filter(
        (c) => c.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    // Filter by Search Query
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase().trim();
      result = result.filter((c) => {
        const matchesName = c.name.common.toLowerCase().includes(q) || 
                            c.name.official.toLowerCase().includes(q);
        
        const matchesCapital = c.capital && c.capital.some(cap => cap.toLowerCase().includes(q));
        const matchesCode = c.cca3.toLowerCase() === q || c.cca2?.toLowerCase() === q;

        return matchesName || matchesCapital || matchesCode;
      });
    }

    // Sort Results
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common);
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common);
        case 'population-desc':
          return b.population - a.population;
        case 'population-asc':
          return a.population - b.population;
        case 'area-desc':
          return b.area - a.area;
        case 'area-asc':
          return a.area - b.area;
        default:
          return 0;
      }
    });

    return result;
  }, [initialCountries, debouncedSearch, selectedRegion, sortBy]);

  // Calculate live statistics of current dataset
  const stats = useMemo(() => {
    const subset = filteredAndSortedCountries;
    const totalPopulation = subset.reduce((acc, c) => acc + (c.population || 0), 0);
    const totalArea = subset.reduce((acc, c) => acc + (c.area || 0), 0);
    
    // Determine unique subregions or general region coverage
    const regionsSet = new Set(subset.map(c => c.region || '').filter(Boolean));
    const maxPopCountry = subset.length > 0 
      ? subset.reduce((prev, current) => (prev.population > current.population) ? prev : current) 
      : null;

    return {
      count: subset.length,
      totalPopulation,
      totalArea,
      uniqueRegionsCount: regionsSet.size,
      densest: maxPopCountry ? maxPopCountry.name.common : 'Mavjud emas',
    };
  }, [filteredAndSortedCountries]);

  // Countries currently being rendered
  const visibleCountries = useMemo(() => {
    return filteredAndSortedCountries.slice(0, visibleCount);
  }, [filteredAndSortedCountries, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const hasMore = filteredAndSortedCountries.length > visibleCount;

  return (
    <div className="space-y-8" id="countries-client-root">
      {/* Search and Filters Strip */}
      <section className="bg-[#18181b] border border-[#27272a] rounded-3xl p-5 md:p-6 space-y-4 shadow-xl shadow-black/20" id="filters-strip">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <SearchBar value={search} onChange={setSearch} />
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <span className="font-sans text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider block self-center">
              Saralash:
            </span>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Region filtering row */}
        <div className="pt-2 border-t border-[#27272a]">
          <RegionFilter selected={selectedRegion} onChange={setSelectedRegion} />
        </div>
      </section>

      {/* Live Statistics Cards Dashboard Grid */}
      <section id="statistics-bento-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Davlatlar Soni"
          value={stats.count}
          icon={<Globe2 size={18} />}
          subtitle={selectedRegion === 'All' ? "Butun dunyo bo'ylab" : `${selectedRegion} regionida`}
          color="indigo"
        />
        <StatCard
          title="Jami Aholi"
          value={formatNumber(stats.totalPopulation)}
          icon={<Users size={18} />}
          subtitle="Mezon hisobi bo’yicha"
          color="emerald"
        />
        <StatCard
          title="Umumiy Maydon"
          value={formatArea(stats.totalArea)}
          icon={<Layers size={18} />}
          subtitle="Yer maydoni kvadrat kilometrda"
          color="indigo"
        />
        <StatCard
          title="Eng ko'p aholi"
          value={stats.densest}
          icon={<Landmark size={18} />}
          subtitle="Dataset ichidagi eng yirik"
          color="rose"
        />
      </section>

      {/* Results Title Info */}
      <div className="flex items-center justify-between pb-2 border-b border-[#27272a]">
        <h2 className="font-sans font-bold text-lg text-[#fafafa]">
          Davlatlar Ro&apos;yxati 
          <span className="ml-2 py-0.5 px-2 bg-[#18181b] border border-[#27272a] text-[#fafafa] rounded-lg text-xs font-semibold font-mono">
            {filteredAndSortedCountries.length}
          </span>
        </h2>
        {debouncedSearch && (
          <span className="font-sans text-xs text-[#a1a1aa]">
            &quot;{debouncedSearch}&quot; qidiruv natijasi
          </span>
        )}
      </div>

      {/* Countries Grid with Animations */}
      {visibleCountries.length > 0 ? (
        <div className="space-y-8">
          <motion.div
            id="countries-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {visibleCountries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Trigger */}
          {hasMore && (
            <div className="flex justify-center pt-4" id="load-more-section">
              <motion.button
                id="load-more-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={loadMore}
                className="px-8 py-3.5 bg-[#18181b] border border-[#27272a] text-[#fafafa] hover:border-indigo-500/50 hover:bg-[#27272a] font-sans font-semibold text-xs rounded-xl shadow-lg transition-all duration-150 cursor-pointer"
              >
                Ko&apos;proq davlatlarni ko&apos;rsatish
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 bg-[#18181b]/30 rounded-3xl border border-dashed border-[#27272a]"
          id="empty-state-container"
        >
          <div className="max-w-md mx-auto">
            <span className="text-4xl mb-4 block" role="img" aria-label="No results">🗺️</span>
            <h3 className="font-sans font-bold text-[#fafafa] text-base mb-1">Mos keluvchi davlat topilmadi</h3>
            <p className="font-sans text-xs text-[#a1a1aa] mb-6">
              Iltimos, boshqa qidiruv so&apos;zlarini yoki filtr shartlarini sinab ko&apos;ring.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedRegion('All');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-semibold text-xs rounded-xl transition duration-150 cursor-pointer"
            >
              Qidiruvni tozalash
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
