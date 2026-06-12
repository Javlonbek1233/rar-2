'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/components/ErrorMessage';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error under development servers
    console.error('Root boundary caught error:', error);
  }, [error]);

  return (
    <div className="py-24 flex items-center justify-center">
      <ErrorMessage
        title="Tizimda xatolik yuz berdi"
        message={error.message || "Bosh sahifa ma'lumotlarini yuklashda kutilmagan xatolik yuz berdi."}
        onRetry={() => reset()}
      />
    </div>
  );
}
