import React from 'react';
import { RefreshCw, Download, Printer } from 'lucide-react';

interface ActionButtonsProps {
  onGenerateSchedule: () => void;
  onExportCSV: () => void;
  onPrintSchedule: () => void;
  isGenerating?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerateSchedule,
  onExportCSV,
  onPrintSchedule,
  isGenerating = false,
}) => {
  return (
    <div className="flex flex-col gap-2.5 mt-4">
      {/* 1. Generate New Schedule Button */}
      <button
        onClick={onGenerateSchedule}
        disabled={isGenerating}
        className="w-full bg-[#1A8D5F] hover:bg-[#157a51] active:bg-[#0f603f] text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-70"
      >
        <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
        <span>Generate New Schedule</span>
      </button>

      {/* 2. Export to CSV Button */}
      <button
        onClick={onExportCSV}
        className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300/90 text-gray-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-2xs transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4 text-gray-600" />
        <span>Export to CSV</span>
      </button>

      {/* 3. Print Schedule Button */}
      <button
        onClick={onPrintSchedule}
        className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300/90 text-gray-700 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-2xs transition-colors cursor-pointer"
      >
        <Printer className="w-4 h-4 text-gray-600" />
        <span>Print Schedule</span>
      </button>
    </div>
  );
};
