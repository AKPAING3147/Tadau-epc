export type DayType = 'Day-1' | 'Day-2' | 'Day-3';

export interface TimeSlot {
  start: number; // Hour in 24h format (e.g., 8 for 08:00)
  end: number;   // Hour in 24h format (e.g., 12 for 12:00, 24 for 24:00/00:00)
  label: string; // e.g., "8:00 AM - 12:00 PM"
}

export interface ScheduleDay {
  date: number; // Day of the month (1-31)
  dayType: DayType;
  slots: TimeSlot[];
}

export interface DayConfiguration {
  id: DayType;
  slots: TimeSlot[];
  color: string;
}

export const DAY_CONFIGS: Record<DayType, DayConfiguration> = {
  'Day-1': {
    id: 'Day-1',
    slots: [
      { start: 0, end: 4, label: "12:00 AM - 04:00 AM" },
      { start: 12, end: 16, label: "12:00 PM - 04:00 PM" }
    ],
    // Neon Cyan (Jedi/R2D2)
    color: 'bg-cyan-900/40 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
  },
  'Day-2': {
    id: 'Day-2',
    slots: [
      { start: 8, end: 12, label: "08:00 AM - 12:00 PM" },
      { start: 20, end: 24, label: "08:00 PM - 12:00 AM" }
    ],
    // Neon Green (Yoda/Luke)
    color: 'bg-green-900/40 text-green-300 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
  },
  'Day-3': {
    id: 'Day-3',
    slots: [
      { start: 4, end: 8, label: "04:00 AM - 08:00 AM" },
      { start: 16, end: 20, label: "04:00 PM - 08:00 PM" }
    ],
    // Neon Red (Sith)
    color: 'bg-red-900/40 text-red-300 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
  }
};