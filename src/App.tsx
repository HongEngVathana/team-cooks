/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { DashboardSummary } from './components/DashboardSummary';
import { YearSummaryCard } from './components/YearSummaryCard';
import { AnnualCalendar } from './components/AnnualCalendar';
import { QuickView } from './components/QuickView';
import { TeamMembers } from './components/TeamMembers';
import { ActionButtons } from './components/ActionButtons';
import { DateModal } from './components/DateModal';
import { StatsModal } from './components/StatsModal';
import { SettingsModal } from './components/SettingsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileActionsDrawer } from './components/MobileActionsDrawer';

import {
  INITIAL_MEMBERS,
  getStoredMembers,
  saveMembers,
  getStoredSchedule,
  saveSchedule,
  generateYearSchedule,
  calculateStats,
  exportScheduleToCSV,
  formatDateKey,
} from './services/scheduleService';
import { TeamMember, DayAssignment, ScheduleMap } from './types/schedule';

export default function App() {
  const [year, setYear] = useState<number>(2026);
  const [members, setMembers] = useState<TeamMember[]>(getStoredMembers);
  const [schedule, setSchedule] = useState<ScheduleMap>(() => getStoredSchedule(2026, INITIAL_MEMBERS));

  // Reference Date matching the screenshot: Nov 7, 2026 (Saturday)
  const defaultReferenceDate = '2026-11-07';
  const [selectedDate, setSelectedDate] = useState<string>(defaultReferenceDate);

  // Active Navigation & Modals
  const [activeTab, setActiveTab] = useState<'calendar' | 'statistics' | 'settings'>('calendar');
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMobileActionsDrawerOpen, setIsMobileActionsDrawerOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<'calendar' | 'quickview' | 'team'>('calendar');

  // Filter state
  const [filteredMemberId, setFilteredMemberId] = useState<string | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync schedule whenever year or members change
  useEffect(() => {
    const loaded = getStoredSchedule(year, members);
    setSchedule(loaded);
  }, [year, members]);

  // Handle header tab changes
  const handleTabChange = (tab: 'calendar' | 'statistics' | 'settings') => {
    setActiveTab(tab);
    if (tab === 'statistics') {
      setIsStatsModalOpen(true);
    } else if (tab === 'settings') {
      setIsSettingsModalOpen(true);
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    return calculateStats(year, schedule, members);
  }, [year, schedule, members]);

  // Selected Day Assignment for Quick View
  const selectedAssignment = useMemo(() => {
    if (schedule[selectedDate]) {
      return schedule[selectedDate];
    }
    // Fallback: lookup by date key or return first available
    return schedule[defaultReferenceDate] || Object.values(schedule)[0] || null;
  }, [schedule, selectedDate]);

  // Today's Assignment for Dashboard Summary Card:
  // In reference screenshot:
  // Today's Cooking = ចិន
  // Today's Dishwashing = ជា
  // Next Day = Nov 8, 2026 (Sun)
  // We locate or construct this matching display
  const todaySummaryAssignment = useMemo<DayAssignment>(() => {
    // If selected date is active, use selected date or default reference
    if (selectedAssignment) {
      return selectedAssignment;
    }
    return {
      date: '2026-11-07',
      year: 2026,
      month: 10,
      day: 7,
      dayOfWeek: 6,
      cookId: 'm3',
      cookName: 'ចិន',
      dishId: 'm4',
      dishName: 'ជា',
      isCompletedCook: false,
      isCompletedDish: false,
    };
  }, [selectedAssignment]);

  // Next Day Assignment
  const nextDayAssignment = useMemo<DayAssignment | null>(() => {
    if (!selectedAssignment) return null;
    const current = new Date(selectedAssignment.year, selectedAssignment.month, selectedAssignment.day);
    current.setDate(current.getDate() + 1);
    const nextKey = formatDateKey(current.getFullYear(), current.getMonth(), current.getDate());
    return schedule[nextKey] || null;
  }, [selectedAssignment, schedule]);

  // Jump to today (Nov 7, 2026 or real system date)
  const handleJumpToToday = useCallback(() => {
    setYear(2026);
    setSelectedDate('2026-11-07');
    showToast('Jumped to Today (Nov 7, 2026)');
  }, []);

  // Generate new schedule
  const handleGenerateSchedule = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateYearSchedule(year, members);
      setSchedule(generated);
      saveSchedule(year, generated);
      setIsGenerating(false);
      showToast(`Generated fair kitchen schedule for ${year}!`);
    }, 350);
  }, [year, members]);

  // Export to CSV
  const handleExportCSV = useCallback(() => {
    exportScheduleToCSV(year, schedule);
    showToast(`Exported ${year} schedule to CSV`);
  }, [year, schedule]);

  // Print schedule
  const handlePrintSchedule = useCallback(() => {
    window.print();
  }, []);

  // Update a single day assignment (from DateModal)
  const handleSaveAssignment = useCallback((updated: DayAssignment) => {
    setSchedule((prev) => {
      const next = { ...prev, [updated.date]: updated };
      saveSchedule(year, next);
      return next;
    });
    showToast(`Updated schedule for ${updated.date}`);
  }, [year]);

  // Toggle completion in Quick View
  const handleToggleCompleteCook = useCallback(() => {
    if (!selectedAssignment) return;
    const updated: DayAssignment = {
      ...selectedAssignment,
      isCompletedCook: !selectedAssignment.isCompletedCook,
    };
    handleSaveAssignment(updated);
  }, [selectedAssignment, handleSaveAssignment]);

  const handleToggleCompleteDish = useCallback(() => {
    if (!selectedAssignment) return;
    const updated: DayAssignment = {
      ...selectedAssignment,
      isCompletedDish: !selectedAssignment.isCompletedDish,
    };
    handleSaveAssignment(updated);
  }, [selectedAssignment, handleSaveAssignment]);

  // Save updated members
  const handleUpdateMembers = useCallback((updatedMembers: TeamMember[]) => {
    setMembers(updatedMembers);
    saveMembers(updatedMembers);
    // Regenerate schedule with new member names
    const regenerated = generateYearSchedule(year, updatedMembers);
    setSchedule(regenerated);
    saveSchedule(year, regenerated);
    showToast('Updated team members & refreshed schedule!');
  }, [year]);

  // Reset to default reference schedule
  const handleResetSchedule = useCallback(() => {
    localStorage.removeItem(`our_kitchen_schedule_v2_${year}`);
    const fresh = generateYearSchedule(year, INITIAL_MEMBERS);
    setSchedule(fresh);
    saveSchedule(year, fresh);
    setMembers(INITIAL_MEMBERS);
    saveMembers(INITIAL_MEMBERS);
    setSelectedDate('2026-11-07');
    showToast('Reset schedule to default reference state');
  }, [year]);

  // Mobile navigation handler
  const handleNavigateMobileSection = useCallback((section: 'calendar' | 'quickview' | 'team') => {
    setActiveMobileSection(section);
    let targetId = '';
    if (section === 'calendar') targetId = 'calendar-section';
    else if (section === 'quickview') targetId = 'quickview-section';
    else if (section === 'team') targetId = 'team-section';

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfdfc] flex flex-col antialiased text-gray-800 pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-5 right-5 z-50 bg-[#113e2e] text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenMobileActions={() => setIsMobileActionsDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1536px] w-full mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-5 flex flex-col gap-4 md:gap-5">
        {/* Hero Kitchen Banner */}
        <section aria-label="Our Kitchen Schedule Banner" className="print-break-inside-avoid">
          <HeroBanner />
        </section>

        {/* Dashboard 2-Column Split: Main Calendar Area (Left) & Sidebar (Right) */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Left Main Column: Dashboard Summary Cards + Annual Calendar */}
          <div className="w-full lg:w-[73%] xl:w-[75%] flex flex-col gap-4">
            {/* Dashboard Summary Cards */}
            <DashboardSummary
              todayAssignment={todaySummaryAssignment}
              nextDayAssignment={nextDayAssignment}
              onTodayClick={() => setIsDateModalOpen(true)}
              onNextDayClick={() => {
                if (nextDayAssignment) {
                  setSelectedDate(nextDayAssignment.date);
                }
              }}
            />

            {/* Annual Calendar Grid */}
            <AnnualCalendar
              year={year}
              onYearChange={setYear}
              schedule={schedule}
              selectedDate={selectedDate}
              onSelectDate={(dateKey) => {
                setSelectedDate(dateKey);
              }}
              members={members}
              filteredMemberId={filteredMemberId}
              onFilterMemberChange={setFilteredMemberId}
              onJumpToToday={handleJumpToToday}
            />
          </div>

          {/* Right Sidebar Column */}
          <aside className="w-full lg:w-[27%] xl:w-[25%] flex flex-col gap-4 shrink-0">
            {/* This Year Summary Card */}
            <YearSummaryCard
              avgCookingDays={61}
              avgDishwashingDays={61}
            />

            {/* Quick View Card */}
            <QuickView
              assignment={selectedAssignment}
              onEditClick={() => setIsDateModalOpen(true)}
              onToggleCompleteCook={handleToggleCompleteCook}
              onToggleCompleteDish={handleToggleCompleteDish}
            />

            {/* Team Members List */}
            <TeamMembers
              members={members}
              stats={stats}
              selectedMemberFilter={filteredMemberId}
              onSelectMemberFilter={setFilteredMemberId}
            />

            {/* Action Buttons */}
            <ActionButtons
              onGenerateSchedule={handleGenerateSchedule}
              onExportCSV={handleExportCSV}
              onPrintSchedule={handlePrintSchedule}
              isGenerating={isGenerating}
            />
          </aside>
        </div>
      </main>

      {/* Date Edit Modal */}
      <DateModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        assignment={selectedAssignment}
        members={members}
        onSaveAssignment={handleSaveAssignment}
      />

      {/* Statistics Modal */}
      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => {
          setIsStatsModalOpen(false);
          setActiveTab('calendar');
        }}
        year={year}
        stats={stats}
        schedule={schedule}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => {
          setIsSettingsModalOpen(false);
          setActiveTab('calendar');
        }}
        members={members}
        onUpdateMembers={handleUpdateMembers}
        onResetSchedule={handleResetSchedule}
      />

      {/* Mobile Bottom Navigation Bar (Visible only on < 768px) */}
      <MobileBottomNav
        activeSection={activeMobileSection}
        onNavigateSection={handleNavigateMobileSection}
        onOpenStats={() => setIsStatsModalOpen(true)}
        onOpenActions={() => setIsMobileActionsDrawerOpen(true)}
      />

      {/* Mobile Actions Bottom Sheet / Drawer */}
      <MobileActionsDrawer
        isOpen={isMobileActionsDrawerOpen}
        onClose={() => setIsMobileActionsDrawerOpen(false)}
        onGenerateSchedule={handleGenerateSchedule}
        onExportCSV={handleExportCSV}
        onPrintSchedule={handlePrintSchedule}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        isGenerating={isGenerating}
      />
    </div>
  );
}
