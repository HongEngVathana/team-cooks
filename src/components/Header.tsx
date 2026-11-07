import React from 'react';
import { Calendar, BarChart3, Settings, Leaf } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calendar' | 'statistics' | 'settings';
  onTabChange: (tab: 'calendar' | 'statistics' | 'settings') => void;
  onOpenMobileActions?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenMobileActions }) => {
  return (
    <header className="bg-white border-b border-gray-100/90 px-3.5 md:px-8 py-2.5 md:py-3.5 sticky top-0 z-40 md:static no-print backdrop-blur-md bg-white/95">
      <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand & Subtitle */}
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <img
            src="/kitchen-logo.png"
            alt="Our Kitchen Logo"
            className="w-9 h-9 md:w-10 md:h-10 object-contain rounded-xl shadow-xs shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-extrabold text-[#113e2e] tracking-tight leading-tight truncate">
              Our Kitchen
            </h1>
            <p className="text-[10px] md:text-[11px] text-gray-500 font-medium tracking-wide truncate">
              Weekly • Monthly • Yearly Schedule
            </p>
          </div>
        </div>

        {/* Center: Navigation (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => onTabChange('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-[#1A8D5F] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => onTabChange('statistics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'statistics'
                ? 'bg-[#1A8D5F] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Statistics</span>
          </button>

          <button
            onClick={() => onTabChange('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#1A8D5F] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Mobile quick actions (Top right on mobile) */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={() => onTabChange('statistics')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Statistics"
            aria-label="View Statistics"
          >
            <BarChart3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onTabChange('settings')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Motto (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-gray-700">
          <Leaf className="w-4 h-4 text-[#1A8D5F] fill-[#1A8D5F]/20" />
          <span>Share • Cook • Enjoy Together</span>
          <span className="text-red-500 text-sm">❤️</span>
        </div>
      </div>
    </header>
  );
};
