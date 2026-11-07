import React, { useState, useEffect } from 'react';
import { X, ChefHat, Disc, Calendar, CheckCircle, FileText } from 'lucide-react';
import { DayAssignment, TeamMember } from '../types/schedule';
import { MONTH_NAMES } from '../services/scheduleService';

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: DayAssignment | null;
  members: TeamMember[];
  onSaveAssignment: (updated: DayAssignment) => void;
}

export const DateModal: React.FC<DateModalProps> = ({
  isOpen,
  onClose,
  assignment,
  members,
  onSaveAssignment,
}) => {
  const [cookId, setCookId] = useState('');
  const [dishId, setDishId] = useState('');
  const [isCompletedCook, setIsCompletedCook] = useState(false);
  const [isCompletedDish, setIsCompletedDish] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (assignment) {
      setCookId(assignment.cookId);
      setDishId(assignment.dishId);
      setIsCompletedCook(!!assignment.isCompletedCook);
      setIsCompletedDish(!!assignment.isCompletedDish);
      setNotes(assignment.notes || '');
      setError(null);
    }
  }, [assignment]);

  if (!isOpen || !assignment) return null;

  const monthName = MONTH_NAMES[assignment.month];
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][assignment.dayOfWeek];

  const handleSave = () => {
    if (cookId === dishId) {
      setError('A person cannot be assigned to cook and wash dishes on the same day.');
      return;
    }

    const cook = members.find((m) => m.id === cookId);
    const dish = members.find((m) => m.id === dishId);

    const updated: DayAssignment = {
      ...assignment,
      cookId,
      cookName: cook ? cook.name : assignment.cookName,
      dishId,
      dishName: dish ? dish.name : assignment.dishName,
      isCompletedCook,
      isCompletedDish,
      notes: notes.trim(),
      isManualOverride: true,
    };

    onSaveAssignment(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#ebf7ef] px-6 py-4 flex items-center justify-between border-b border-[#d4edd9]">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#1A8D5F]" />
            <div>
              <h3 className="text-base font-bold text-[#113e2e]">
                {monthName} {assignment.day}, {assignment.year}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {weekday} • Kitchen Assignment
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

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* Cooking Assignment */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <ChefHat className="w-4 h-4 text-[#1A8D5F]" />
              <span>Cooking Assignment</span>
            </label>
            <select
              value={cookId}
              onChange={(e) => {
                setCookId(e.target.value);
                setError(null);
              }}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A8D5F]"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} {m.isSaturdayCookOnly ? '(Saturday Specialist)' : ''}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 pt-1 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isCompletedCook}
                onChange={(e) => setIsCompletedCook(e.target.checked)}
                className="rounded text-[#1A8D5F] focus:ring-[#1A8D5F]"
              />
              <span>Mark cooking as completed</span>
            </label>
          </div>

          {/* Dishwashing Assignment */}
          <div className="space-y-1.5 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <Disc className="w-4 h-4 text-[#3b82f6]" />
              <span>Dishwashing Assignment</span>
            </label>
            <select
              value={dishId}
              onChange={(e) => {
                setDishId(e.target.value);
                setError(null);
              }}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 pt-1 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isCompletedDish}
                onChange={(e) => setIsCompletedDish(e.target.checked)}
                className="rounded text-[#3b82f6] focus:ring-[#3b82f6]"
              />
              <span>Mark dishwashing as completed</span>
            </label>
          </div>

          {/* Notes */}
          <div className="space-y-1.5 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <FileText className="w-4 h-4 text-gray-500" />
              <span>Notes / Meal Plan</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Fried noodles, Khmer curry, guests visiting..."
              rows={2}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A8D5F]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-end gap-2 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-200/60 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1A8D5F] hover:bg-[#157a51] rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
