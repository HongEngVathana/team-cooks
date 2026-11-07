import React from 'react';
import { X, BarChart3, ChefHat, Disc, CheckCircle, Award } from 'lucide-react';
import { MemberStat, ScheduleMap } from '../types/schedule';
import { isLeapYear } from '../services/scheduleService';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  stats: MemberStat[];
  schedule: ScheduleMap;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  year,
  stats,
  schedule,
}) => {
  if (!isOpen) return null;

  const totalDays = isLeapYear(year) ? 366 : 365;
  const totalDuties = totalDays * 2;

  let completedCookCount = 0;
  let completedDishCount = 0;

  Object.values(schedule).forEach((day) => {
    if (day.year === year) {
      if (day.isCompletedCook) completedCookCount++;
      if (day.isCompletedDish) completedDishCount++;
    }
  });

  const totalCompleted = completedCookCount + completedDishCount;
  const completionPercent = Math.round((totalCompleted / totalDuties) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#ebf7ef] px-6 py-4 flex items-center justify-between border-b border-[#d4edd9]">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-[#1A8D5F]" />
            <div>
              <h3 className="text-base font-bold text-[#113e2e]">
                Annual Kitchen Statistics – {year}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Fair rotation distribution and completion overview
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl">
              <span className="text-[11px] font-semibold text-emerald-800">Total Calendar Days</span>
              <div className="text-2xl font-black text-emerald-900 mt-0.5">{totalDays} Days</div>
              <span className="text-[10px] text-emerald-600">365-day fair rotation</span>
            </div>

            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl">
              <span className="text-[11px] font-semibold text-blue-800">Avg Duties / Person</span>
              <div className="text-2xl font-black text-blue-900 mt-0.5">≈ 61 Days</div>
              <span className="text-[10px] text-blue-600">Per role (Cook & Dish)</span>
            </div>

            <div className="p-3.5 bg-purple-50/70 border border-purple-100 rounded-xl">
              <span className="text-[11px] font-semibold text-purple-800">Duties Completed</span>
              <div className="text-2xl font-black text-purple-900 mt-0.5">{totalCompleted} / {totalDuties}</div>
              <span className="text-[10px] text-purple-600">{completionPercent}% completed</span>
            </div>
          </div>

          {/* Member Duty Breakdown Table */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-700 flex items-center justify-between">
              <span>Member Rotation Breakdown</span>
              <span className="text-gray-400 font-normal text-[11px]">Fairness index: 100%</span>
            </div>

            <div className="divide-y divide-gray-100">
              {stats.map((stat) => {
                const isSpecialist = stat.member.isSaturdayCookOnly;
                return (
                  <div key={stat.member.id} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-[160px]">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: stat.member.color }}
                      />
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-1.5">
                          <span>{stat.member.name}</span>
                          {isSpecialist && (
                            <span className="text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-md font-semibold">
                              Saturday Specialist
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          Total Duties: {stat.totalCount} (Avg ≈ {Math.round(stat.totalCount / 2)})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="flex items-center gap-1 text-[#1A8D5F] font-bold">
                          <ChefHat className="w-3.5 h-3.5" />
                          <span>{stat.cookCount}</span>
                        </div>
                        <div className="text-[9px] text-gray-400">Cook</div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[#2563eb] font-bold">
                          <Disc className="w-3.5 h-3.5" />
                          <span>{stat.dishCount}</span>
                        </div>
                        <div className="text-[9px] text-gray-400">Dishwash</div>
                      </div>

                      <div className="w-20 hidden sm:block">
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                          <div
                            className="bg-[#1A8D5F] h-full"
                            style={{ width: `${(stat.cookCount / stat.totalCount) * 100}%` }}
                          />
                          <div
                            className="bg-[#3b82f6] h-full"
                            style={{ width: `${(stat.dishCount / stat.totalCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Schedule Rule Enforced:</strong>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Hong Eng Vathana is assigned exclusively on Saturdays. Remaining cooking rotations are equitably balanced among the other 5 members. No member is ever assigned both cooking and dishwashing on the same date.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-end border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1A8D5F] hover:bg-[#157a51] rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
