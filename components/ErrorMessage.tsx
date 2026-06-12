'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorMessage({
  message = "Ma'lumotlarni yuklab bo'lmadi. Iltimos, internet aloqasini tekshiring va qayta urinib ko'ring.",
  onRetry,
  title = "Xatolik yuz berdi"
}: ErrorMessageProps) {
  return (
    <div 
      id="error-container"
      className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-12 bg-[#18181b] border border-rose-900/30 rounded-2xl shadow-xl"
    >
      <div className="p-3 bg-rose-950/25 rounded-full text-rose-500 mb-4 animate-pulse">
        <AlertTriangle size={32} />
      </div>
      <h3 className="font-sans font-semibold text-lg text-rose-400 mb-2">{title}</h3>
      <p className="font-sans text-sm text-[#a1a1aa] mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          id="error-retry-button"
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-950/20 active:bg-rose-950/45 hover:bg-rose-900/40 text-rose-400 font-sans font-medium text-sm rounded-xl transition duration-150 shadow-sm border border-rose-900/50 cursor-pointer"
        >
          <RotateCcw size={16} />
          Qayta urinish
        </button>
      )}
    </div>
  );
}
