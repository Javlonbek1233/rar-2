import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Compass, Heart, Github } from 'lucide-react';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'WorldExplorer — Dunyo Davlatlari Ma’lumotlar Platformasi',
  description: 'Barcha dunyo davlatlarini organing, qidiring, hududiga kora saralang hamda sevimlilarga saqlang.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="bg-[#09090b] text-[#fafafa] selection:bg-indigo-500/30 selection:text-[#fafafa] min-h-screen flex flex-col">
        {/* Sticky blur header nav */}
        <header id="main-header" className="sticky top-0 z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-[#27272a] shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group cursor-pointer transition-transform duration-150 active:scale-95">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/20 group-hover:bg-indigo-500 group-hover:rotate-12 transition-all duration-300">
                <Compass size={18} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm tracking-tight text-[#fafafa] leading-none">
                  WorldExplorer
                </span>
                <span className="font-sans text-[10px] font-medium text-slate-500 mt-0.5 leading-none tracking-wider uppercase">
                  Ma’lumotlar Platformasi
                </span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="flex items-center gap-1.5 sm:gap-2" id="header-nav">
              <Link 
                href="/"
                className="px-3.5 py-2 font-sans font-semibold text-xs text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] rounded-xl transition-all duration-150"
              >
                Bosh Sahifa
              </Link>
              
              <Link 
                href="/favorites"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 font-sans font-semibold text-xs bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] hover:border-slate-700 text-rose-500 hover:text-rose-400 rounded-xl transition-all duration-150 cursor-pointer"
              >
                <Heart size={14} className="stroke-[2.2] fill-rose-500/20" />
                <span>Sevimlilar</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Global Page Wrapper Container */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>

        {/* Modular Custom Footer */}
        <footer id="main-footer" className="bg-[#09090b] border-t border-[#27272a] py-6 md:py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="font-sans text-[11px] font-semibold text-[#52525b] uppercase tracking-wider">
                WorldExplorer &copy; {new Date().getFullYear()}
              </p>
              <p className="font-sans text-xs text-[#a1a1aa] mt-1">
                Dunyo davlatlarining geografik va demografik koshifi.
              </p>
            </div>

            <div className="flex items-center gap-6 text-[#52525b]">
              <span className="font-sans text-[11px] flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#a1a1aa]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></span>
                REST Countries API
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#fafafa] transition-colors duration-150"
                aria-label="GitHub repository"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
