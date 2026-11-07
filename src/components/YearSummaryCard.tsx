import React from 'react';
import { ChefHat } from 'lucide-react';

interface YearSummaryCardProps {
  avgCookingDays?: number;
  avgDishwashingDays?: number;
}

export const YearSummaryCard: React.FC<YearSummaryCardProps> = ({
  avgCookingDays = 61,
  avgDishwashingDays = 61,
}) => {
  return (
    <div className="bg-[#eaf7ee] border border-[#d2edd9] rounded-2xl p-4 shadow-xs">
      <h3 className="text-sm font-bold text-gray-900 mb-3 tracking-tight">
        This Year Summary
      </h3>

      <div className="flex items-center justify-between">
        {/* Cooking Stat */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1A8D5F] flex items-center justify-center text-white shrink-0 shadow-xs">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-gray-500 leading-none">
              Cooking
            </div>
            <div className="text-sm font-extrabold text-gray-900 mt-1">
              ≈ {avgCookingDays} Days
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-9 bg-[#cae6d2] mx-2" />

        {/* Dishwashing Stat */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#1A8D5F] flex items-center justify-center text-[#1A8D5F] shrink-0 p-1">
            <div className="w-3.5 h-3.5 rounded-full bg-[#1A8D5F]" />
          </div>
          <div>
            <div className="text-[11px] font-medium text-gray-500 leading-none">
              Dishwashing
            </div>
            <div className="text-sm font-extrabold text-gray-900 mt-1">
              ≈ {avgDishwashingDays} Days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
