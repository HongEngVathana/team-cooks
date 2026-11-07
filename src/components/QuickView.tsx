import React from 'react';
import { Zap, ChefHat, Disc, Check, Edit2 } from 'lucide-react';
import { DayAssignment } from '../types/schedule';

interface QuickViewProps {
  assignment: DayAssignment | null;
  onEditClick: () => void;
  onToggleCompleteCook: () => void;
  onToggleCompleteDish: () => void;
}

export const QuickView: React.FC<QuickViewProps> = ({
  assignment,
  onEditClick,
  onToggleCompleteCook,
  onToggleCompleteDish,
}) => {
  if (!assignment) {
    return (
      <div className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900 mb-3">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Quick View</span>
        </div>
        <div className="text-center py-6 text-xs text-gray-400">
          Select a date to view duties
        </div>
      </div>
    );
  }

  const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][assignment.month];
  const dayNameShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][assignment.dayOfWeek];

  return (
    <div id="quickview-section" className="bg-white border border-gray-200/90 rounded-2xl p-3.5 md:p-4 shadow-xs relative scroll-mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Quick View</span>
        </div>
        <button
          onClick={onEditClick}
          className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          title="Edit assignment"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-stretch gap-3">
        {/* Left: Date Display */}
        <div className="w-[84px] shrink-0 flex flex-col justify-center items-start pl-1 relative">
          {/* Subtle amber accent bar */}
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1" />
          <span className="text-xs font-semibold text-gray-500">
            {dayNameShort}
          </span>
          <span className="text-xl font-extrabold text-gray-900 leading-tight">
            {monthShort} {assignment.day}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {assignment.year}
          </span>
        </div>

        {/* Right: Duties */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Cooking Duty Card */}
          <div className="bg-[#eaf7ee] rounded-xl p-2.5 flex items-center justify-between border border-[#d5ecdc]/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#1A8D5F] flex items-center justify-center text-white shrink-0 shadow-xs">
                <ChefHat className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-500 font-medium leading-none">
                  Cooking
                </div>
                <div className="text-xs font-extrabold text-[#113e2e] leading-tight mt-0.5 truncate">
                  {assignment.cookName}
                </div>
              </div>
            </div>

            <button
              onClick={onToggleCompleteCook}
              title={assignment.isCompletedCook ? 'Mark incomplete' : 'Mark complete'}
              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                assignment.isCompletedCook
                  ? 'bg-[#1A8D5F] border-[#1A8D5F] text-white'
                  : 'border-gray-300 hover:border-[#1A8D5F] text-transparent hover:text-gray-300'
              }`}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Dishwashing Duty Card */}
          <div className="bg-[#edf7fd] rounded-xl p-2.5 flex items-center justify-between border border-[#d4eaf7]/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shrink-0 shadow-xs">
                <Disc className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-gray-500 font-medium leading-none">
                  Dishwashing
                </div>
                <div className="text-xs font-extrabold text-[#1e3a8a] leading-tight mt-0.5 truncate">
                  {assignment.dishName}
                </div>
              </div>
            </div>

            <button
              onClick={onToggleCompleteDish}
              title={assignment.isCompletedDish ? 'Mark incomplete' : 'Mark complete'}
              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                assignment.isCompletedDish
                  ? 'bg-[#3b82f6] border-[#3b82f6] text-white'
                  : 'border-gray-300 hover:border-[#3b82f6] text-transparent hover:text-gray-300'
              }`}
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
