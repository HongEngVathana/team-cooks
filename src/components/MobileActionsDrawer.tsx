import React from 'react';
import { X, RefreshCw, Download, Printer, Settings } from 'lucide-react';

interface MobileActionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateSchedule: () => void;
  onExportCSV: () => void;
  onPrintSchedule: () => void;
  onOpenSettings: () => void;
  isGenerating?: boolean;
}

export const MobileActionsDrawer: React.FC<MobileActionsDrawerProps> = ({
  isOpen,
  onClose,
  onGenerateSchedule,
  onExportCSV,
  onPrintSchedule,
  onOpenSettings,
  isGenerating = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:hidden bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full bg-white rounded-t-3xl p-5 shadow-2xl border-t border-gray-200 animate-in slide-in-from-bottom duration-200">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div>
            <h3 className="text-base font-extrabold text-gray-900">
              Kitchen Actions
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">
              Manage, export, and automate schedule
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Items */}
        <div className="space-y-2.5">
          <button
            onClick={() => {
              onGenerateSchedule();
              onClose();
            }}
            disabled={isGenerating}
            className="w-full bg-[#1A8D5F] hover:bg-[#157a51] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate New Schedule</span>
          </button>

          <button
            onClick={() => {
              onExportCSV();
              onClose();
            }}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span>Export to CSV</span>
          </button>

          <button
            onClick={() => {
              onPrintSchedule();
              onClose();
            }}
            className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-2xs transition-colors"
          >
            <Printer className="w-4 h-4 text-gray-600" />
            <span>Print Schedule</span>
          </button>

          <button
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings & Team Rules</span>
          </button>
        </div>

        {/* Cancel */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-gray-500 text-center"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
