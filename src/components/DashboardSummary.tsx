import React from 'react';
import { ChefHat, Disc, Calendar, ChevronRight } from 'lucide-react';
import { DayAssignment } from '../types/schedule';

interface DashboardSummaryProps {
  todayAssignment: DayAssignment | null;
  nextDayAssignment: DayAssignment | null;
  onNextDayClick?: () => void;
  onTodayClick?: () => void;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  todayAssignment,
  nextDayAssignment,
  onNextDayClick,
  onTodayClick,
}) => {
  // Format next day date text, e.g. "Nov 8, 2026 (Sun)"
  let nextDayText = 'Nov 8, 2026 (Sun)';
  if (nextDayAssignment) {
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][nextDayAssignment.month];
    const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][nextDayAssignment.dayOfWeek];
    nextDayText = `${monthShort} ${nextDayAssignment.day}, ${nextDayAssignment.year} (${dayShort})`;
  }

  const cookName = todayAssignment?.cookName || 'ចិន';
  const dishName = todayAssignment?.dishName || 'ជា';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3.5">
      {/* 1. Today's Cooking Card */}
      <div
        onClick={onTodayClick}
        className="cursor-pointer bg-[#ecf7f1] border border-[#d6efdf] rounded-2xl p-3 md:p-4 relative overflow-hidden flex items-center justify-between transition-all hover:shadow-xs active:scale-[0.99] group min-h-[72px]"
      >
        <div className="flex items-center gap-3 md:gap-3.5 z-10 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A8D5F] flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <ChefHat className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] md:text-xs font-semibold text-gray-600 tracking-tight block">
              Today's Cooking
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#1A8D5F] leading-tight mt-0.5 truncate">
              {cookName}
            </h3>
          </div>
        </div>

        {/* Chef Hat Watermark Background */}
        <div className="absolute -right-2 -bottom-2 text-[#1A8D5F]/15 pointer-events-none transform -rotate-12">
          <ChefHat className="w-16 h-16 md:w-20 md:h-20" />
        </div>
      </div>

      {/* 2. Today's Dishwashing Card */}
      <div
        onClick={onTodayClick}
        className="cursor-pointer bg-[#edf5ff] border border-[#d5e6fd] rounded-2xl p-3 md:p-4 relative overflow-hidden flex items-center justify-between transition-all hover:shadow-xs active:scale-[0.99] group min-h-[72px]"
      >
        <div className="flex items-center gap-3 md:gap-3.5 z-10 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <Disc className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] md:text-xs font-semibold text-gray-600 tracking-tight block">
              Today's Dishwashing
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-[#2563eb] leading-tight mt-0.5 truncate">
              {dishName}
            </h3>
          </div>
        </div>

        {/* Dish Plate Watermark Background */}
        <div className="absolute -right-2 -bottom-2 text-[#2563eb]/15 pointer-events-none">
          <Disc className="w-16 h-16 md:w-20 md:h-20" />
        </div>
      </div>

      {/* 3. Next Day Card */}
      <div
        onClick={onNextDayClick}
        className="cursor-pointer bg-[#f6f2fc] border border-[#e8dcf7] rounded-2xl p-3 md:p-4 relative overflow-hidden flex items-center justify-between transition-all hover:shadow-xs active:scale-[0.99] group min-h-[72px]"
      >
        <div className="flex items-center gap-3 md:gap-3.5 z-10 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] md:text-xs font-semibold text-gray-600 tracking-tight block">
              Next Day
            </span>
            <h3 className="text-sm md:text-base font-extrabold text-[#201c3d] leading-tight mt-0.5 truncate">
              {nextDayText}
            </h3>
          </div>
        </div>

        {/* Right Arrow Chevron */}
        <div className="text-[#7c3aed] pr-1 group-hover:translate-x-1 transition-transform shrink-0">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
