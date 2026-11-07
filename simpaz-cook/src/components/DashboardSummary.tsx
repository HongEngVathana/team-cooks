import React from 'react';
import { RemixIcon } from './RemixIcon';
import { DayAssignment } from '../types/schedule';
import { Language, TRANSLATIONS } from '../services/languageService';

interface DashboardSummaryProps {
  todayAssignment: DayAssignment | null;
  nextDayAssignment: DayAssignment | null;
  onNextDayClick?: () => void;
  onTodayClick?: () => void;
  language: Language;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  todayAssignment,
  nextDayAssignment,
  onNextDayClick,
  onTodayClick,
  language,
}) => {
  const t = TRANSLATIONS[language];

  let nextDayText = 'Nov 8, 2026 (Sun)';
  if (nextDayAssignment) {
    const monthShort = t.monthsShort[nextDayAssignment.month];
    const dayShort = t.weekdaysFull[nextDayAssignment.dayOfWeek];
    nextDayText = `${monthShort} ${nextDayAssignment.day}, ${nextDayAssignment.year} (${dayShort})`;
  }

  const cookName = todayAssignment?.cookName || 'ចិន';
  const dishName = todayAssignment?.dishName || 'ជា';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3.5">
      {/* 1. Today's Cooking Card */}
      <div
        onClick={onTodayClick}
        className="cursor-pointer bg-[#ecf7f1] dark:bg-emerald-950/25 border border-[#d6efdf] dark:border-emerald-800/50 rounded-2xl p-3 md:p-4 relative overflow-hidden flex items-center justify-between transition-all hover:shadow-xs active:scale-[0.99] group min-h-[72px]"
      >
        <div className="flex items-center gap-3 md:gap-3.5 z-10 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A8D5F] dark:bg-emerald-600 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <RemixIcon name="ri-restaurant-line" className="text-xl md:text-2xl" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] md:text-xs font-semibold text-gray-600 dark:text-emerald-200/80 tracking-tight block">
              {t.todaysCooking}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#1A8D5F] dark:text-emerald-400 leading-tight mt-0.5 truncate">
              {cookName}
            </h3>
          </div>
        </div>

        {/* Cooking Watermark Background */}
        <div className="absolute -right-2 -bottom-2 text-[#1A8D5F]/15 dark:text-emerald-400/10 pointer-events-none transform -rotate-12">
          <RemixIcon name="ri-restaurant-2-line" className="text-7xl md:text-8xl" />
        </div>
      </div>

      {/* 2. Today's Dishwashing Card */}
      <div
        onClick={onTodayClick}
        className="cursor-pointer bg-[#edf5ff] dark:bg-blue-950/25 border border-[#d5e6fd] dark:border-blue-800/50 rounded-2xl p-3 md:p-4 relative overflow-hidden flex items-center justify-between transition-all hover:shadow-xs active:scale-[0.99] group min-h-[72px]"
      >
        <div className="flex items-center gap-3 md:gap-3.5 z-10 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2563eb] dark:bg-blue-600 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <RemixIcon name="ri-disc-line" className="text-xl md:text-2xl" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] md:text-xs font-semibold text-gray-600 dark:text-blue-200/80 tracking-tight block">
              {t.todaysDishwashing}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#2563eb] dark:text-blue-400 leading-tight mt-0.5 truncate">
              {dishName}
            </h3>
          </div>
        </div>

        {/* Dish Plate Watermark Background */}
        <div className="absolute -right-2 -bottom-2 text-[#2563eb]/15 dark:text-blue-400/10 pointer-events-none">
          <RemixIcon name="ri-disc-line" className="text-7xl md:text-8xl" />
        </div>
      </div>

      {/* 3. Next Day Card */}
      <div
        onClick={onNextDayClick}
        className="cursor-pointer bg-[#f6f2fc] dark:bg-purple-950/25 border border-[#e8dcf7] dark:border-purple-800/50 rounded-2xl p-3 md:p-4 relative overflow-hidden flex items-center justify-between transition-all hover:shadow-xs active:scale-[0.99] group min-h-[72px]"
      >
        <div className="flex items-center gap-3 md:gap-3.5 z-10 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8b5cf6] dark:bg-purple-600 flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <RemixIcon name="ri-calendar-event-line" className="text-xl md:text-2xl" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] md:text-xs font-semibold text-gray-600 dark:text-purple-200/80 tracking-tight block">
              {t.nextDay}
            </span>
            <h3 className="text-sm md:text-base font-extrabold text-[#201c3d] dark:text-purple-300 leading-tight mt-0.5 truncate">
              {nextDayText}
            </h3>
          </div>
        </div>

        {/* Right Arrow Chevron */}
        <div className="text-[#7c3aed] dark:text-purple-400 pr-1 group-hover:translate-x-1 transition-transform shrink-0">
          <RemixIcon name="ri-arrow-right-s-line" className="text-2xl" />
        </div>
      </div>
    </div>
  );
};
