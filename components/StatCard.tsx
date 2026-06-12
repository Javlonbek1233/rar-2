'use client';

import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple' | 'slate';
}

const COLOR_CLASSES = {
  blue: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-blue-500/30',
    icon_bg: 'bg-blue-500/10 text-blue-400',
    title: 'text-[#fafafa]',
    subtitle: 'text-blue-400',
  },
  emerald: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-emerald-500/30',
    icon_bg: 'bg-emerald-500/10 text-emerald-400',
    title: 'text-[#fafafa]',
    subtitle: 'text-emerald-400',
  },
  amber: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-amber-500/30',
    icon_bg: 'bg-amber-500/10 text-amber-400',
    title: 'text-[#fafafa]',
    subtitle: 'text-amber-400',
  },
  rose: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-rose-500/30',
    icon_bg: 'bg-rose-500/10 text-rose-400',
    title: 'text-[#fafafa]',
    subtitle: 'text-rose-400',
  },
  indigo: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-indigo-500/30',
    icon_bg: 'bg-indigo-500/10 text-indigo-400',
    title: 'text-[#fafafa]',
    subtitle: 'text-indigo-400',
  },
  purple: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-purple-500/30',
    icon_bg: 'bg-purple-500/10 text-purple-400',
    title: 'text-[#fafafa]',
    subtitle: 'text-purple-400',
  },
  slate: {
    bg: 'bg-[#18181b] hover:bg-zinc-900 border-[#27272a] hover:border-zinc-700',
    icon_bg: 'bg-zinc-800 text-[#a1a1aa]',
    title: 'text-[#fafafa]',
    subtitle: 'text-[#a1a1aa]',
  },
};

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  className = '',
  color = 'slate',
}: StatCardProps) {
  const chosenColor = COLOR_CLASSES[color];

  return (
    <motion.div
      id={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      whileHover={{ y: -3, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between shadow-sm backdrop-blur-sm ${chosenColor.bg} ${className}`}
    >
      <div className="flex justify-between items-start mb-2.5">
        <span className={`font-sans font-medium text-xs tracking-wide uppercase ${chosenColor.subtitle}`}>
          {title}
        </span>
        {icon && (
          <div className={`p-2 rounded-xl flex items-center justify-center ${chosenColor.icon_bg}`}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <h4 className={`font-sans font-bold text-xl md:text-2xl leading-none tracking-tight mb-1.5 ${chosenColor.title}`}>
          {value}
        </h4>
        {subtitle && (
          <span className="font-sans text-[11px] text-zinc-500 leading-normal block">
            {subtitle}
          </span>
        )}
      </div>
    </motion.div>
  );
}
