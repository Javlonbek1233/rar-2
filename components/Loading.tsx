'use client';

import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullPage?: boolean;
}

export default function Loading({ message = 'Ma’lumotlar yuklanmoqda...', fullPage = false }: LoadingProps) {
  const containerClasses = fullPage 
    ? "min-h-[70vh] w-full flex flex-col items-center justify-center py-12"
    : "w-full flex flex-col items-center justify-center py-16 px-4";

  return (
    <div id="loading-container" className={containerClasses}>
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-16 h-16 rounded-full bg-indigo-950/40"
        />

        {/* Rotating spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-indigo-500 relative z-10"
        >
          <Loader2 size={36} className="stroke-[2.5]" />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-sans text-sm font-medium text-[#a1a1aa] tracking-wide"
      >
        {message}
      </motion.p>
    </div>
  );
}
