export interface TeamMember {
  id: string;
  name: string;
  nameKhmer?: string;
  color: string;
  isSaturdayCookOnly?: boolean;
  unavailableDates?: string[]; // YYYY-MM-DD
}

export interface DayAssignment {
  date: string; // YYYY-MM-DD
  year: number;
  month: number; // 0-11
  day: number;
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  cookId: string;
  cookName: string;
  dishId: string;
  dishName: string;
  isCompletedCook?: boolean;
  isCompletedDish?: boolean;
  notes?: string;
  isManualOverride?: boolean;
}

export type ScheduleMap = Record<string, DayAssignment>; // Keyed by YYYY-MM-DD

export interface MemberStat {
  member: TeamMember;
  cookCount: number;
  dishCount: number;
  totalCount: number;
}
