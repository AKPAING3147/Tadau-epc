import { DayType, DAY_CONFIGS, ScheduleDay } from '../types';

// Based on user data:
// Dec 1 = Day-2
// Dec 2 = Day-3
// Dec 3 = Day-1
// Dec 4 = Day-2 ...
const PATTERN: DayType[] = ['Day-2', 'Day-3', 'Day-1'];

export const getDayTypeForDate = (dayOfMonth: number): DayType => {
  const index = (dayOfMonth - 1) % 3;
  return PATTERN[index];
};

export const generateMonthSchedule = (daysInMonth: number): ScheduleDay[] => {
  const schedule: ScheduleDay[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const dayType = getDayTypeForDate(d);
    schedule.push({
      date: d,
      dayType,
      slots: DAY_CONFIGS[dayType].slots
    });
  }
  return schedule;
};

// Burmese Number Converter
export const toBurmeseNum = (n: number | string): string => {
  const nums = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
  return n.toString().replace(/[0-9]/g, (d) => nums[parseInt(d)]);
};

// Burmese Time Formatter
export const formatTimeBurmese = (start: number, end: number): string => {
  const formatSingle = (h: number) => {
    const period = h < 12 || h === 24 ? 'မနက်' : (h >= 16 ? 'ညနေ' : 'နေ့လည်'); 
    // Special adjustment for late night
    const displayPeriod = (h >= 19 || h === 0 || h === 24) ? 'ည' : period;
    
    let displayH = h % 12 || 12;
    return `${toBurmeseNum(displayH)}:${toBurmeseNum(0)}${toBurmeseNum(0)} ${displayPeriod}`;
  };

  // Simplified logic for "start - end"
  // e.g. 8:00 AM - 12:00 PM
  const s = start % 12 || 12;
  const e = end % 12 || 12;
  
  const pStart = (start < 12 || start === 24) ? 'မနက်' : (start >= 16 ? 'ညနေ' : 'နေ့လည်');
  const pEnd = (end < 12 || end === 24) ? 'မနက်' : (end >= 19 ? 'ည' : (end >= 16 ? 'ညနေ' : 'နေ့လည်'));

  // Special case for 12 AM
  const pStartFinal = (start === 0 || start === 24) ? 'ည' : pStart;

  return `${toBurmeseNum(s)} ${pStartFinal} - ${toBurmeseNum(e)} ${pEnd}`;
};

export const checkCurrentStatus = (currentHour: number, currentMinute: number, dayType: DayType) => {
  const slots = DAY_CONFIGS[dayType].slots;
  const timeVal = currentHour + (currentMinute / 60);

  let isPowerOn = false;
  let currentSlot = null;
  let nextSlot = null;

  const sortedSlots = [...slots].sort((a, b) => a.start - b.start);

  for (const slot of sortedSlots) {
    if (timeVal >= slot.start && timeVal < slot.end) {
      isPowerOn = true;
      currentSlot = slot;
      break;
    }
  }

  if (isPowerOn && currentSlot) {
    const endH = currentSlot.end % 12 || 12;
    const endP = (currentSlot.end < 12 || currentSlot.end === 24) ? 'မနက်' : (currentSlot.end >= 19 ? 'ည' : 'ညနေ');
    const timeStr = `${toBurmeseNum(endH)}:${toBurmeseNum(0)}${toBurmeseNum(0)} ${endP}`;

    return {
      isOn: true,
      message: `မီးလာချိန် ${timeStr} အထိ`,
      timeRemainingLabel: "မီးပြတ်ရန်",
      targetHour: currentSlot.end
    };
  } else {
    nextSlot = sortedSlots.find(s => s.start > timeVal);
    
    if (nextSlot) {
      return {
        isOn: false,
        message: `လာမည့်အချိန်: ${formatTimeBurmese(nextSlot.start, nextSlot.end)}`,
        timeRemainingLabel: "မီးပြန်လာမည့်အချိန်",
        targetHour: nextSlot.start
      };
    } else {
       return {
        isOn: false,
        message: "ဒီနေ့အတွက် မီးလာချိန်ကုန်ဆုံးပါပြီ",
        timeRemainingLabel: "မနက်ဖြန်ပြန်စစ်ပါ",
        targetHour: 24 
      };
    }
  }
};