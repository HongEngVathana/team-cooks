import React, { useState } from 'react';
import { X, Settings, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { TeamMember } from '../types/schedule';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  onUpdateMembers: (members: TeamMember[]) => void;
  onResetSchedule: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  members,
  onUpdateMembers,
  onResetSchedule,
}) => {
  const [localMembers, setLocalMembers] = useState<TeamMember[]>(members);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleMemberNameChange = (id: string, newName: string) => {
    setLocalMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name: newName } : m))
    );
  };

  const handleSave = () => {
    onUpdateMembers(localMembers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#ebf7ef] px-6 py-4 flex items-center justify-between border-b border-[#d4edd9]">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-[#1A8D5F]" />
            <div>
              <h3 className="text-base font-bold text-[#113e2e]">
                Kitchen Schedule Settings
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Team configuration & rotation parameters
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
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Rules Summary */}
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Active Rotation Rules:</span>
            </div>
            <ul className="text-[11px] text-emerald-800 space-y-1 list-disc pl-4">
              <li><strong>Hong Eng Vathana</strong>: Assigned cooking on Saturday (1x per week).</li>
              <li><strong>Other 5 Members</strong>: Rotate cooking evenly Sunday through Friday.</li>
              <li><strong>Dishwashing</strong>: Rotated fairly across all 6 members.</li>
              <li><strong>Zero Conflict</strong>: Never assigns cook and dishwasher to the same person on any date.</li>
            </ul>
          </div>

          {/* Team Members Editor */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Team Members ({localMembers.length})
            </label>
            <div className="space-y-2">
              {localMembers.map((m, idx) => (
                <div key={m.id} className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: m.color }}
                  />
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => handleMemberNameChange(m.id, e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1A8D5F]"
                  />
                  {m.isSaturdayCookOnly ? (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-1 rounded-md font-semibold whitespace-nowrap">
                      Sat Only
                    </span>
                  ) : (
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md whitespace-nowrap">
                      Member #{idx + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reset Schedule */}
          <div className="pt-3 border-t border-gray-100">
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Schedule to Default Reference State</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Are you sure you want to reset?</span>
                </div>
                <p className="text-rose-700 text-[11px]">
                  This will regenerate the entire schedule and clear any custom manual duty overrides.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      onResetSchedule();
                      setShowConfirmReset(false);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 text-xs cursor-pointer"
                  >
                    Yes, Reset Schedule
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-end gap-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1A8D5F] hover:bg-[#157a51] rounded-xl shadow-xs transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
