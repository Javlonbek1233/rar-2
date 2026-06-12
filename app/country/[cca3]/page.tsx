import { getCountryByCca3, getCountriesByCodes } from '@/lib/api';
import { formatNumber, formatArea, formatList } from '@/utils/formatters';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BorderCountry from '@/components/BorderCountry';
import FavoriteButton from '@/components/FavoriteButton';
import StatCard from '@/components/StatCard';
import { 
  ArrowLeft, 
  Map, 
  Users, 
  Compass, 
  CircleDollarSign, 
  Languages, 
  Globe2, 
  Building2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    cca3: string;
  }>;
}

/**
 * Generate metadata dynamically for Search Engines
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cca3 = resolvedParams.cca3;
  const country = await getCountryByCca3(cca3);

  if (!country) {
    return {
      title: 'Davlat Topilmadi | WorldExplorer',
      description: 'WorldExplorer platformasida ushbu davlat topilmadi.',
    };
  }

  return {
    title: `${country.name.common} — Dunyo Davlatlari Encyklopediyasi`,
    description: `${country.name.common} (poytaxti: ${formatList(country.capital)}). Aholisi: ${formatNumber(country.population)}, maydoni: ${formatArea(country.area)}. WorldExplorer sahifasida batafsil ma'lumot.`,
  };
}

export default async function CountryDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cca3 = resolvedParams.cca3;
  
  // Load primary country details
  const country = await getCountryByCca3(cca3);
  if (!country) {
    notFound();
  }

  // Load border country profiles (name and flags) synchronously in parallel on server
  const bordersList = country.borders || [];
  const borderCountryObjects = bordersList.length > 0 
    ? await getCountriesByCodes(bordersList)
    : [];

  // Parse helper fields
  const nativeNames = country.name.nativeName 
    ? Object.values(country.name.nativeName).map((n) => n.common)
    : [];
  const uniqueNativeNames = Array.from(new Set(nativeNames));

  const currenciesList = country.currencies
    ? Object.values(country.currencies).map((curr) => `${curr.name} (${curr.symbol || ''})`)
    : [];

  const languagesList = country.languages
    ? Object.values(country.languages)
    : [];

  // Calculate population density
  const density = country.area > 0 
    ? Math.round(country.population / country.area)
    : 0;

  return (
    <div className="space-y-10" id={`country-detail-root-${cca3.toLowerCase()}`}>
      
      {/* Upper Navigation Strip */}
      <section className="flex items-center justify-between py-2 border-b border-[#27272a]" id="detail-nav-strip">
        <Link href="/" passHref legacyBehavior>
          <a className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 hover:bg-[#27272a]/80 rounded-xl font-sans font-semibold text-xs text-[#fafafa] transition duration-150 shadow-sm cursor-pointer">
            <ArrowLeft size={14} className="stroke-[2.5]" />
            Orqaga qaytish
          </a>
        </Link>

        {/* Favorite toggle specifically stylized */}
        <div className="flex items-center gap-3">
          <span className="font-sans text-[11px] text-[#a1a1aa] font-semibold tracking-wider uppercase hidden sm:inline">
            Sevimlilarga qo&apos;shish:
          </span>
          <FavoriteButton cca3={country.cca3} iconSize={20} className="w-10 h-10 border-[#27272a]" />
        </div>
      </section>

      {/* Main Flag + Intro Header layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="detail-main-header">
        {/* Left Side: Large Flag + Coat of arms */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-[#27272a] bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={country.flags.png}
              alt={country.flags.alt || `${country.name.common} bayrog'i`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Coat of arms panel if available */}
          {country.coatOfArms && (country.coatOfArms.png || country.coatOfArms.svg) && (
            <div className="bg-[#18181b] border border-[#27272a] rounded-2xl p-5 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="font-sans font-bold text-xs text-[#fafafa] block">
                  Rasmiy Davlat Gerbi
                </span>
                <span className="font-sans text-[10px] text-[#a1a1aa] block">
                  Milliy ramz va gerb shakli
                </span>
              </div>
              <div className="w-16 h-16 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={country.coatOfArms.png || country.coatOfArms.svg}
                  alt={`${country.name.common} gerbi`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Vital Profile Data */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#fafafa] tracking-tight">
                {country.name.common}
              </h1>
              <span className="py-1 px-2.5 bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 text-xs font-mono font-bold rounded-lg leading-none">
                {country.cca3}
              </span>
            </div>
            <p className="font-sans text-sm text-[#a1a1aa] font-medium">
              Rasmiy nomi: <span className="text-[#fafafa] font-semibold">{country.name.official}</span>
            </p>
          </div>

          {/* Native names list */}
          {uniqueNativeNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-sans text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider mr-1">
                Mahalliy Nomlari:
              </span>
              {uniqueNativeNames.slice(0, 4).map((name, i) => (
                <span 
                  key={i} 
                  className="bg-zinc-800 text-zinc-300 font-sans font-semibold text-[11px] px-2.5 py-1 rounded-lg border border-zinc-700/50"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          {/* Quick specs grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#27272a]">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-semibold text-[#a1a1aa] uppercase tracking-widest block">Region & Subregion</span>
              <span className="text-sm font-sans font-semibold text-[#fafafa] block">
                {country.region} {country.subregion ? `(${country.subregion})` : ''}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-sans font-semibold text-[#a1a1aa] uppercase tracking-widest block">Mustaqillik / TLD</span>
              <span className="text-sm font-sans font-semibold text-[#fafafa] block text-ellipsis overflow-hidden">
                {country.tld ? formatList(country.tld) : 'Mavjud emas'}
              </span>
            </div>
          </div>

          {/* Interactive Map Button link */}
          {country.maps?.googleMaps && (
            <div className="pt-2">
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs rounded-xl transition duration-150 shadow-lg border border-indigo-500/30 cursor-pointer"
              >
                <Map size={14} />
                Google Xaritada ko&apos;rish
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Bento Grid layout for detailed numbers */}
      <section id="bento-details" className="pt-8 border-t border-[#27272a]">
        <h3 className="font-sans font-extrabold text-lg text-[#fafafa] mb-6">Mamlakat Ko&apos;rsatkichlari</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            title="Aholi soni"
            value={formatNumber(country.population)}
            icon={<Users size={16} />}
            subtitle="Jami ro'yxatga olingan aholi"
            color="indigo"
          />
          <StatCard
            title="Maydoni"
            value={formatArea(country.area)}
            icon={<Compass size={16} />}
            subtitle="Yer resurs ko'rsatkichi"
            color="emerald"
          />
          <StatCard
            title="Aholi Zichligi"
            value={`${density} kishi / km²`}
            icon={<TrendingUp size={16} />}
            subtitle="O'rtacha zichlik nisbati"
            color="indigo"
          />
          <StatCard
            title="Poytaxt"
            value={formatList(country.capital, 'Mavjud emas')}
            icon={<Building2 size={16} />}
            subtitle="Ma'muriy boshqaruv markazi"
            color="amber"
          />
          <StatCard
            title="Pul Birligi (Valyuta)"
            value={formatList(currenciesList, 'Mavjud emas')}
            icon={<CircleDollarSign size={16} />}
            subtitle="Milliy valyuta qabulgohi"
            color="purple"
          />
          <StatCard
            title="Tillar"
            value={formatList(languagesList, 'Mavjud emas')}
            icon={<Languages size={16} />}
            subtitle="So'zlashuvchi rasmiy tillar"
            color="rose"
          />
          <StatCard
            title="Vaqt Zonasi"
            value={formatList(country.timezones, 'Mavjud emas')}
            icon={<Globe2 size={16} />}
            subtitle="Timezone ko'rsatkichi"
            color="slate"
          />
          {country.latlng && (
            <StatCard
              title="Koordinatalar"
              value={`${country.latlng[0].toFixed(2)}°, ${country.latlng[1].toFixed(2)}°`}
              icon={<MapPin size={16} />}
              subtitle="Kenglik hamda uzunlik nuqtasi"
              color="slate"
            />
          )}
        </div>
      </section>

      {/* Border Countries list */}
      <section id="border-countries-section" className="pt-8 border-t border-[#27272a] space-y-4">
        <h3 className="font-sans font-extrabold text-lg text-[#fafafa]">
          Chegaradosh qo&apos;shni davlatlar
        </h3>
        
        {borderCountryObjects.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {borderCountryObjects.map((bc) => (
              <BorderCountry
                key={bc.cca3}
                cca3={bc.cca3}
                name={bc.name.common}
                flagPng={bc.flags.png}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 bg-[#18181b]/40 rounded-2xl border border-[#27272a] inline-block w-full">
            <span className="text-[#a1a1aa] font-sans text-xs">
              Ushbu davlat hech qanday quruqlik chegara davlatlariga ega emas (masalan, orol davlat).
            </span>
          </div>
        )}
      </section>

    </div>
  );
}
