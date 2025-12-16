import React from 'react';
import { getDayTypeForDate, formatTimeBurmese, toBurmeseNum } from '../utils/scheduleLogic';
import { DAY_CONFIGS } from '../types';

interface CalendarViewProps {
  theme: 'star-wars' | 'simple';
}

const ThreeDayView: React.FC<CalendarViewProps> = ({ theme }) => {
  const today = new Date();
  const isSW = theme === 'star-wars';
  
  // Generate next 3 days
  const next3Days = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d,
      dayType: getDayTypeForDate(d.getDate())
    };
  });

  const weekDaysBurmese = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
  const monthsBurmese = ["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "သြဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 text-center">
         <h3 className={`text-xl font-burmese ${isSW ? 'text-space-yellow' : 'text-gray-100'}`}>၃ ရက်စာ ခန့်မှန်းချိန်</h3>
      </div>

      <div className="space-y-4">
        {next3Days.map((day, index) => {
          const config = DAY_CONFIGS[day.dayType];
          const isToday = index === 0;
          const dayName = weekDaysBurmese[day.date.getDay()];
          const dayDate = `${monthsBurmese[day.date.getMonth()]} ${toBurmeseNum(day.date.getDate())}`;

          return (
            <div 
              key={index} 
              className={`relative p-4 transition-all ${
                isSW 
                  ? `border-l-4 bg-space-panel/50 backdrop-blur-sm ${isToday ? 'border-space-yellow bg-space-yellow/5' : 'border-gray-700'}`
                  : `rounded-xl border bg-gray-800 ${isToday ? 'border-yellow-500/50 shadow-md' : 'border-gray-700'}`
              }`}
            >
              {/* Day Header */}
              <div className="flex justify-between items-center mb-3">
                 <div>
                    <h4 className={`font-bold font-burmese text-lg ${isToday ? (isSW ? 'text-white' : 'text-white') : 'text-gray-400'}`}>
                      {index === 0 ? 'ယနေ့' : (index === 1 ? 'မနက်ဖြန်' : dayName)}
                    </h4>
                    <p className="text-xs text-gray-500 font-burmese">{dayDate}</p>
                 </div>
                 <div className={`px-2 py-1 rounded text-xs font-bold border ${
                    isSW ? 'font-sci' : 'font-sans'
                 } ${
                     day.dayType === 'Day-1' ? 'border-cyan-500 text-cyan-500' :
                     day.dayType === 'Day-2' ? 'border-green-500 text-green-500' :
                     'border-red-500 text-red-500'
                 }`}>
                   {day.dayType}
                 </div>
              </div>

              {/* Slots */}
              <div className="space-y-2">
                 {config.slots.map((slot, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                       <div className={`w-1.5 h-1.5 rounded-full ${isToday ? (isSW ? 'bg-space-yellow animate-pulse' : 'bg-yellow-400') : 'bg-gray-600'}`}></div>
                       <span className={`text-sm font-burmese ${isSW ? 'text-gray-300' : 'text-gray-300'}`}>
                          {formatTimeBurmese(slot.start, slot.end)}
                       </span>
                    </div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeDayView;