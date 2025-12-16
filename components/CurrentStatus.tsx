import React, { useState, useEffect } from 'react';
import { Zap, ZapOff, Clock, Radio } from 'lucide-react';
import { getDayTypeForDate, checkCurrentStatus, toBurmeseNum } from '../utils/scheduleLogic';
import { DAY_CONFIGS } from '../types';

interface CurrentStatusProps {
  theme: 'star-wars' | 'simple';
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({ theme }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000 * 60); 
    return () => clearInterval(timer);
  }, []);

  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const dayType = getDayTypeForDate(currentDay);
  const status = checkCurrentStatus(currentHour, currentMinute, dayType);
  const dayConfig = DAY_CONFIGS[dayType];

  let hoursLeft = 0;
  let minsLeft = 0;
  
  if (status.targetHour <= 24) {
    const targetTimeVal = status.targetHour * 60;
    const currentTimeVal = (currentHour * 60) + currentMinute;
    const diff = targetTimeVal - currentTimeVal;
    
    if (diff > 0) {
      hoursLeft = Math.floor(diff / 60);
      minsLeft = Math.floor(diff % 60);
    }
  }

  const burmeseMonths = ["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "သြဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"];
  const burmeseDate = `${burmeseMonths[now.getMonth()]} ${toBurmeseNum(now.getDate())}`;

  const formatSlotLabel = (label: string) => {
    return label
      .replace(/AM/g, 'မနက်')
      .replace(/PM/g, 'ညနေ')
      .replace(/00/g, '၀၀')
      .replace(/04/g, '၀၄')
      .replace(/08/g, '၀၈')
      .replace(/12/g, '၁၂')
      .replace(/16/g, '၀၄')
      .replace(/20/g, '၀၈')
      .replace(/24/g, '၁၂')
      .replace(/-/g, 'မှ')
      .replace("ညနေ - ၁၂:၀၀ မနက်", "ည - ၁၂:၀၀ ည");
  };

  const isSW = theme === 'star-wars';

  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      {/* Card Container */}
      <div className={`relative transition-all duration-500 overflow-hidden ${
        isSW 
          ? `rounded-none border-2 ${status.isOn ? 'border-space-yellow shadow-[0_0_20px_rgba(255,232,31,0.3)] bg-space-panel/90' : 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)] bg-black/90'}`
          : `rounded-2xl border ${status.isOn ? 'border-yellow-500/50 bg-gray-800' : 'border-red-500/30 bg-gray-800'} shadow-lg`
      }`}>
        
        {/* Tech Decor Lines (Star Wars only) */}
        {isSW && (
          <>
            <div className="absolute top-0 left-0 w-2 h-2 bg-white z-10"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-white z-10"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-white z-10"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none animate-twinkle h-full w-full"></div>
          </>
        )}

        <div className="relative p-6 text-gray-100">
          <div className={`flex justify-between items-start mb-6 border-b pb-4 ${isSW ? 'border-gray-700' : 'border-gray-700'}`}>
            <div>
              <p className={`text-xs mb-2 flex items-center gap-2 ${isSW ? 'text-space-blue font-burmese' : 'text-gray-400 font-sans font-medium'}`}>
                 <Radio className="w-3 h-3 animate-pulse" />
                 စနစ်အခြေအနေ
              </p>
              <h2 className={`text-3xl font-bold font-burmese ${isSW ? 'tracking-wider drop-shadow-md' : ''}`}>
                {status.isOn 
                  ? <span className={isSW ? "text-space-yellow" : "text-yellow-400"}>မီးလာနေပါတယ်</span> 
                  : <span className={isSW ? "text-red-500" : "text-red-400"}>မီးပျက်နေပါတယ်</span>
                }
              </h2>
              <p className="text-xs text-gray-400 mt-1 font-burmese">
                 {burmeseDate}
              </p>
            </div>
            <div className={`p-4 ${
              isSW 
                ? `border-2 ${status.isOn ? 'border-space-yellow bg-space-yellow/10' : 'border-red-500 bg-red-900/20'}`
                : `rounded-full ${status.isOn ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`
            }`}>
              {status.isOn 
                ? <Zap className={`w-8 h-8 ${isSW ? 'text-space-yellow' : 'text-yellow-400'}`} /> 
                : <ZapOff className={`w-8 h-8 ${isSW ? 'text-red-500' : 'text-red-400'}`} />
              }
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`${isSW ? 'bg-black/40 border border-gray-700' : 'bg-gray-900/50 rounded-xl'} p-4`}>
              <div className={`flex items-center gap-2 mb-2 ${isSW ? 'text-space-blue' : 'text-gray-400'}`}>
                <Clock className="w-3 h-3" />
                <span className="text-[10px] font-burmese">{status.timeRemainingLabel}</span>
              </div>
              
              {status.targetHour === 24 && !status.isOn ? (
                 <div className="text-lg font-bold font-burmese text-gray-300">မနက်ဖြန်မှ ပြန်စစ်ပါ</div>
              ) : (
                <div className={`text-2xl font-bold font-burmese ${isSW ? 'text-white' : 'text-gray-100'}`}>
                  {toBurmeseNum(hoursLeft)} <span className="text-xs text-gray-500">နာရီ</span> : {toBurmeseNum(minsLeft.toString().padStart(2, '0'))} <span className="text-xs text-gray-500">မိနစ်</span>
                </div>
              )}
            </div>
            
            <div className={`${isSW ? 'bg-black/40 border border-gray-700' : 'bg-gray-900/50 rounded-xl'} p-4 flex flex-col justify-center`}>
               <span className="text-[10px] text-gray-500 font-burmese mb-1">ယနေ့အလှည့်</span>
               <span className={`text-xl font-bold ${isSW ? 'font-sci text-white' : 'font-sans text-gray-100'}`}>{dayType}</span>
            </div>
          </div>

          <div className={`mt-4 p-3 text-sm font-burmese ${
            isSW 
              ? 'border-l-2 border-space-blue bg-space-blue/5 text-gray-300' 
              : 'rounded-lg bg-gray-700/30 text-gray-300'
          }`}>
              {status.message}
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] text-gray-500 font-burmese">သတ်မှတ်ထားသောအချိန်များ</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dayConfig.slots.map((slot, idx) => (
                <div key={idx} className={`text-center py-2 px-1 text-xs font-burmese transition-all ${
                    // Highlight current slot if on
                    status.isOn && currentHour >= slot.start && currentHour < slot.end 
                    ? (isSW ? 'border-space-yellow bg-space-yellow text-black font-bold' : 'bg-yellow-500 text-gray-900 font-bold rounded shadow-sm')
                    : (isSW ? 'border border-gray-800 bg-black/50 text-gray-400' : 'bg-gray-700/50 text-gray-400 rounded')
                }`}>
                    {formatSlotLabel(slot.label)}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CurrentStatus;