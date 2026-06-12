'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

interface BorderCountryProps {
  cca3: string;
  name: string;
  flagUrl?: string;
  flagPng?: string; // fallback flags image
}

export default function BorderCountry({ cca3, name, flagUrl, flagPng }: BorderCountryProps) {
  return (
    <Link href={`/country/${cca3.toLowerCase()}`} passHref legacyBehavior>
      <motion.a
        id={`border-country-${cca3}`}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#18181b] border border-[#27272a] hover:border-indigo-500/50 hover:bg-[#27272a]/80 rounded-xl transition-all duration-150 text-[#fafafa] font-sans font-semibold text-xs shadow-sm cursor-pointer"
      >
        {flagPng ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={flagPng}
            alt={`${name} flag`}
            className="w-5 h-3.5 object-cover rounded shadow-sm shrink-0 border border-zinc-800"
            referrerPolicy="no-referrer"
          />
        ) : flagUrl ? (
          <span className="text-sm shrink-0" role="img" aria-label={`${name} flag`}>{flagUrl}</span>
        ) : null}
        <span className="truncate max-w-[130px]">{name}</span>
      </motion.a>
    </Link>
  );
}
