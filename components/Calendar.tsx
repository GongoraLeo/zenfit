
import React from 'react';
import { DailyData } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  sessions: DailyData;
  onDayClick: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ sessions, onDayClick }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDays = daysInMonth(year, month);
  const startDay = (firstDayOfMonth(year, month) + 6) % 7; // Adjust to start Monday

  const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);
  const paddingArray = Array.from({ length: startDay }, (_, i) => i);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-slate-800">
          {monthNames[month]} <span className="text-slate-400 font-medium">{year}</span>
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button 
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-4 text-center">
        {dayNames.map(d => (
          <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{d}</div>
        ))}
        
        {paddingArray.map(p => <div key={`p-${p}`} />)}
        
        {daysArray.map(d => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const daySessions = sessions[dateStr] || [];
          const hasGym = daySessions.some(s => s.type === 'gym');
          const hasRunning = daySessions.some(s => s.type === 'running');
          const isToday = new Date().toISOString().split('T')[0] === dateStr;

          return (
            <button
              key={d}
              onClick={() => onDayClick(dateStr)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 group
                ${isToday ? 'bg-indigo-50 border-2 border-indigo-200' : 'hover:bg-slate-50 border-2 border-transparent'}
              `}
            >
              <span className={`text-sm md:text-lg font-bold ${isToday ? 'text-indigo-600' : 'text-slate-700'}`}>
                {d}
              </span>
              
              <div className="flex gap-1 mt-1">
                {hasGym && <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>}
                {hasRunning && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>}
              </div>
              
              {/* Tooltip hint on hover (hidden on mobile) */}
              <div className="hidden md:group-hover:block absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {daySessions.length > 0 ? `${daySessions.length} actividades` : 'Sin actividad'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
