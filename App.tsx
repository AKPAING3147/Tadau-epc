import React, { useState } from 'react';
import CurrentStatus from './components/CurrentStatus';
import CalendarView from './components/CalendarView'; // This is the 3-Day View
import ListView from './components/ListView';
import { Calendar, List, Sun, Moon } from 'lucide-react';

const App = () => {
  const [viewMode, setViewMode] = useState<'forecast' | 'list'>('forecast');
  const [theme, setTheme] = useState<'star-wars' | 'simple'>('star-wars');

  const isSW = theme === 'star-wars';

  const toggleTheme = () => {
    setTheme(prev => prev === 'star-wars' ? 'simple' : 'star-wars');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${
      isSW 
        ? 'star-bg selection:bg-space-yellow selection:text-black' 
        : 'bg-gray-900 text-gray-100 selection:bg-gray-700 selection:text-white'
    }`}>
      
      {/* Theme Toggle - Fixed top right */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all duration-300 ${
            isSW 
              ? 'bg-space-panel border border-space-yellow text-space-yellow hover:bg-space-yellow hover:text-black shadow-[0_0_10px_rgba(255,232,31,0.3)]' 
              : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          title={isSW ? "Switch to Simple Mode" : "Switch to Star Wars Mode"}
        >
          {isSW ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 py-8 relative">
        
        <div className="text-center mb-8 pt-6">
             <h1 className={`text-3xl md:text-5xl font-black uppercase tracking-[0.1em] transition-all duration-300 ${
               isSW 
                 ? 'text-space-yellow font-sci drop-shadow-[0_0_10px_rgba(255,232,31,0.5)]' 
                 : 'text-gray-100 font-sans'
             }`}>
               TadaU MEE LAR CHAIN
             </h1>
        </div>

        {/* Hero Section: Current Status */}
        <CurrentStatus theme={theme} />

        {/* View Toggle */}
        <div className="flex items-center justify-center mb-6 mt-8">
          <div className={`p-1 inline-flex gap-1 transition-all ${
            isSW 
              ? 'bg-black border border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.8)]' 
              : 'bg-gray-800 rounded-lg border border-gray-700'
          }`}>
            <button
              onClick={() => setViewMode('forecast')}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold transition-all font-burmese ${
                viewMode === 'forecast' 
                  ? (isSW ? 'bg-space-yellow text-black shadow-[0_0_10px_#FFE81F]' : 'bg-gray-600 text-white rounded shadow-sm')
                  : 'text-gray-500 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              ၃ ရက်စာ
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold transition-all font-burmese ${
                viewMode === 'list' 
                  ? (isSW ? 'bg-space-yellow text-black shadow-[0_0_10px_#FFE81F]' : 'bg-gray-600 text-white rounded shadow-sm')
                  : 'text-gray-500 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <List className="w-4 h-4" />
              စာရင်း
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="animate-fade-in w-full">
          {viewMode === 'forecast' ? <CalendarView theme={theme} /> : <ListView theme={theme} />}
        </div>

      </main>

      {/* Footer with Lightsaber Animation (Only in Star Wars mode) */}
      <footer className={`mt-auto py-12 text-center border-t transition-colors ${
        isSW ? 'bg-black border-gray-900' : 'bg-gray-900 border-gray-800'
      }`}>
        <div className="max-w-md mx-auto px-4 flex flex-col items-center">
           <a 
             href="https://akpaingportfolio.netlify.app/" 
             target="_blank" 
             rel="noopener noreferrer"
             className={`akp-link inline-block group cursor-pointer mb-6 ${isSW ? '' : 'hover:opacity-80'}`}
           >
             <div className={`text-sm tracking-[0.3em] uppercase mb-2 transition-colors ${
               isSW ? 'text-gray-400 font-sci group-hover:text-white' : 'text-gray-500 font-sans group-hover:text-gray-300'
             }`}>
               Made by AKP
             </div>
             {/* Lightsaber Blade Container - Only render in Star Wars mode */}
             {isSW && (
               <div className="saber-handle w-full h-1 bg-gray-800 rounded relative">
                  <div className="saber-blade"></div>
               </div>
             )}
             {!isSW && (
                <div className="w-full h-px bg-gray-800 group-hover:bg-gray-600 transition-colors"></div>
             )}
           </a>

           <a 
             href="https://www.facebook.com/share/p/17XdjNZQKJ/" 
             target="_blank" 
             rel="noopener noreferrer"
             className={`text-[10px] transition-colors ${
               isSW 
                 ? 'text-gray-600 font-sci tracking-wider hover:text-space-blue' 
                 : 'text-gray-600 font-sans hover:text-gray-400'
             }`}
           >
             Data from MESC-TadaU
           </a>
        </div>
      </footer>
    </div>
  );
};

export default App;