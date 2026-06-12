import { getAllCountries } from '@/lib/api';
import CountriesClient from '@/components/CountriesClient';
import { Compass, MoveDown } from 'lucide-react';
import Link from 'next/link';
import { Country } from '@/types';

export const revalidate = 86400; // Cache the homepage for 24 hours on CDN

export default async function HomePage() {
  // Fetch countries server-side
  let countries: Country[] = [];
  let errorState: string | null = null;

  try {
    countries = await getAllCountries();
  } catch (error) {
    console.error('Failed to pre-fetch countries in homepage route:', error);
    errorState = "Ma'lumotlar platformasiga ulanishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.";
  }

  return (
    <div id="home-page-container" className="space-y-12">
      {/* Hero Section */}
      <section 
        id="home-hero"
        className="relative bg-gradient-to-br from-[#18181b] via-[#09090b] to-[#1e1b4b]/20 border border-[#27272a] rounded-[2.5rem] p-8 md:p-16 lg:p-20 overflow-hidden text-[#fafafa] shadow-xl"
      >
        {/* Abstract background blobs for premium feel */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-12 w-64 h-64 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Accent micro-badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 backdrop-blur-md rounded-full border border-indigo-500/20">
            <Compass size={12} className="text-indigo-400 animate-spin-slow" />
            <span className="font-sans text-[10px] font-bold tracking-wider uppercase text-indigo-300">
              Global Atlas &bull; Ochiq Ma&apos;lumotlar
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-sans font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
            Dunyoning barcha davlatlarini <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-300">bitta platformada</span> o&apos;rganing
          </h1>

          {/* Subheading */}
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-light">
            250 dan ortiq mamlakatlarning aholisi, gerbi, bayrog&apos;i, valyutasi, poytaxt manzillari va geografik chegaralarini o&apos;rganish uchun eng qulay va qidiruv filtrlariga boy zamonaviy qomusiy ensiklopediya.
          </p>

          {/* Call to Action Button */}
          <div className="pt-4 flex flex-wrap gap-4">
            <a 
              href="#filters-strip"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-sans font-bold text-xs px-6 py-4 rounded-xl transition duration-150 shadow-lg shadow-indigo-950/40 relative group cursor-pointer border border-indigo-500/30"
            >
              Mamlakatlarni kashf etish
              <MoveDown size={14} className="group-hover:translate-y-1 transition duration-150" />
            </a>
            
            <div className="inline-flex items-center gap-4 text-zinc-500 text-xs">
              <span className="font-mono text-zinc-300 font-semibold">250+</span> mamlakat
              <span className="inline-block w-1 h-1 bg-[#27272a] rounded-full" />
              <span className="font-mono text-zinc-300 font-semibold">7</span> kontinent
            </div>
          </div>
        </div>
      </section>

      {/* Main Countries Interactive Platform */}
      {errorState ? (
        <div className="text-center py-20 bg-rose-50 border border-rose-100 rounded-3xl" id="home-error-state">
          <p className="font-sans font-semibold text-rose-800 text-sm mb-2">{errorState}</p>
          <Link href="/" className="text-xs font-sans font-bold text-blue-600 hover:underline">
            Sahifani qayta yangilash
          </Link>
        </div>
      ) : (
        <CountriesClient initialCountries={countries} />
      )}
    </div>
  );
}
