import React from 'react';
import { Calendar, Zap, Users, BarChart3, SlidersHorizontal } from 'lucide-react';

interface MobileBottomNavProps {
  activeSection: 'calendar' | 'quickview' | 'team';
  onNavigateSection: (section: 'calendar' | 'quickview' | 'team') => void;
  onOpenStats: () => void;
  onOpenActions: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeSection,
  onNavigateSection,
  onOpenStats,
  onOpenActions,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-1.5 md:hidden no-print shadow-lg">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {/* 1. Calendar */}
        <button
          onClick={() => onNavigateSection('calendar')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeSection === 'calendar'
              ? 'text-[#1A8D5F] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Calendar</span>
        </button>

        {/* 2. Today / Quick View */}
        <button
          onClick={() => onNavigateSection('quickview')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeSection === 'quickview'
              ? 'text-amber-600 font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Zap className="w-5 h-5 fill-amber-500/20" />
          <span className="text-[10px] mt-0.5 tracking-tight">Today</span>
        </button>

        {/* 3. Team */}
        <button
          onClick={() => onNavigateSection('team')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
            activeSection === 'team'
              ? 'text-[#1A8D5F] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Team</span>
        </button>

        {/* 4. Statistics */}
        <button
          onClick={onOpenStats}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-gray-500 hover:text-gray-800 transition-all"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Stats</span>
        </button>

        {/* 5. Actions / More */}
        <button
          onClick={onOpenActions}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-gray-500 hover:text-gray-800 transition-all"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Actions</span>
        </button>
      </div>
    </nav>
  );
};
