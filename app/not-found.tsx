import Link from 'next/link';
import { Compass, MoveLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div id="not-found-container" className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl mb-6 animate-bounce">
        <Compass size={48} className="stroke-[1.8]" />
      </div>
      
      <h1 className="font-sans font-extrabold text-4xl text-slate-800 tracking-tight mb-2">
        404
      </h1>
      <h2 className="font-sans font-bold text-lg text-slate-700 mb-4">
        Sahifa topilmadi
      </h2>
      <p className="font-sans text-xs text-slate-400 max-w-sm mb-8 leading-relaxed">
        Siz qidirayotgan sayohat manzili yoki sahifa mavjud emas. Davlatlar haqida bosh sahifadan qidiring.
      </p>

      <Link href="/" passHref legacyBehavior>
        <a 
          id="not-found-back-home"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-sans font-semibold text-xs rounded-xl transition duration-150 shadow-sm"
        >
          <MoveLeft size={14} />
          Bosh sahifaga qaytish
        </a>
      </Link>
    </div>
  );
}
