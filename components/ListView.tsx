import React from 'react';
import { generateMonthSchedule, formatTimeBurmese, toBurmeseNum } from '../utils/scheduleLogic';
import { DAY_CONFIGS } from '../types';

interface ListViewProps {
  theme: 'star-wars' | 'simple';
}

const ListView: React.FC<ListViewProps> = ({ theme }) => {
  const schedule = generateMonthSchedule(31);
  const weekDays = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];
  const monthsBurmese = ["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "သြဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"];
  
  const isSW = theme === 'star-wars';

  return (
    <div className={`w-full max-w-5xl mx-auto border ${
      isSW 
        ? 'border-gray-800 bg-black/80 backdrop-blur-sm' 
        : 'border-gray-700 bg-gray-800 rounded-xl overflow-hidden'
    }`}>
      <div className={`p-4 border-b ${isSW ? 'border-gray-800 bg-space-panel' : 'border-gray-700 bg-gray-900/50'}`}>
        <h3 className={`font-bold font-burmese tracking-wider ${isSW ? 'text-space-yellow' : 'text-gray-100'}`}>📊 နေ့စဉ်စာရင်း</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300 font-burmese">
          <thead className={`text-xs uppercase border-b font-burmese tracking-widest ${
            isSW 
              ? 'text-space-blue bg-black border-gray-800' 
              : 'text-gray-400 bg-gray-900 border-gray-700'
          }`}>
            <tr>
              <th className="px-6 py-4">နေ့စွဲ</th>
              <th className="px-6 py-4">အလှည့်</th>
              <th className="px-6 py-4">မီးလာချိန်</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isSW ? 'divide-gray-800' : 'divide-gray-700'}`}>
            {schedule.map((day) => {
              const config = DAY_CONFIGS[day.dayType];
              const isToday = new Date().getDate() === day.date && new Date().getMonth() === 11;
              const dateObj = new Date(2024, 11, day.date);
              const dayName = weekDays[dateObj.getDay()];
              
              return (
                <tr key={day.date} className={`transition-colors hover:bg-white/5 ${
                  isToday 
                    ? (isSW ? 'bg-space-yellow/5' : 'bg-yellow-500/10') 
                    : ''
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${isToday ? (isSW ? 'text-space-yellow' : 'text-yellow-400') : 'text-white'}`}>
                            {toBurmeseNum(day.date)} <span className="text-sm font-normal">{monthsBurmese[11]}</span>
                        </span>
                        <span className="text-gray-500 text-xs font-burmese">{dayName}</span>
                        {isToday && <span className={`text-[10px] border px-1 font-burmese ${
                          isSW ? 'border-space-yellow text-space-yellow' : 'border-yellow-500 text-yellow-500 rounded'
                        }`}>ယနေ့</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold tracking-wider border bg-opacity-20 ${
                      isSW ? 'font-sci' : 'font-sans rounded'
                    } ${config.color.split(' ')[0]} ${config.color.split(' ')[2]} ${config.color.split(' ')[3]}`}>
                      {day.dayType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {day.slots.map((slot, i) => (
                        <span key={i} className={`inline-flex items-center px-3 py-1 text-xs font-medium font-burmese border ${
                          isSW 
                            ? 'border-gray-700 bg-gray-900 text-gray-300' 
                            : 'border-gray-600 bg-gray-700 text-gray-200 rounded'
                        }`}>
                          {formatTimeBurmese(slot.start, slot.end)}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;