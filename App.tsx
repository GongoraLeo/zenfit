
import React, { useState, useEffect, useMemo } from 'react';
import { Calendar } from './components/Calendar';
import { DayDetail } from './components/DayDetail';
import { ProgressCharts } from './components/ProgressCharts';
import { RoutinesManager } from './components/RoutinesManager';
import { WorkoutSession, DailyData, Routine } from './types';
import { GoogleGenAI } from "@google/genai";
import { 
  Dumbbell, 
  Flame, 
  Calendar as CalendarIcon, 
  Activity, 
  Sparkles,
  Info,
  BarChart3,
  ListTodo
} from 'lucide-react';

type ViewMode = 'calendar' | 'progress' | 'routines';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<DailyData>(() => {
    const saved = localStorage.getItem('zenfit_sessions');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [routines, setRoutines] = useState<Routine[]>(() => {
    const saved = localStorage.getItem('zenfit_routines');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeView, setActiveView] = useState<ViewMode>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    localStorage.setItem('zenfit_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('zenfit_routines', JSON.stringify(routines));
  }, [routines]);

  const allSessions = useMemo(() => {
    return (Object.values(sessions) as WorkoutSession[][]).flat().sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [sessions]);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setIsDetailOpen(true);
  };

  const handleAddSession = (session: WorkoutSession) => {
    const date = session.date;
    setSessions(prev => {
      const daySessions = prev[date] || [];
      return {
        ...prev,
        [date]: [...daySessions, session]
      };
    });
  };

  const handleDeleteSession = (date: string, sessionId: string) => {
    setSessions(prev => {
      const daySessions = prev[date] || [];
      const updated = daySessions.filter(s => s.id !== sessionId);
      if (updated.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: updated
      };
    });
  };

  const analyzeProgress = async () => {
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const recentSessions = allSessions.slice(-8);
      const prompt = `Analiza mi progreso de entrenamiento basado en estas sesiones: ${JSON.stringify(recentSessions)}.
      Fíjate especialmente en si estoy alternando running y gimnasio.
      Dame un consejo motivador corto y minimalista para mejorar mi rendimiento. Máximo 2 frases en español.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      setAiInsight(response.text || "Sigue dándolo todo, la constancia es la clave del éxito.");
    } catch (error) {
      console.error("AI Error:", error);
      setAiInsight("Tu progreso es excelente. ¡La regularidad vence al talento!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-100">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">ZenFit</h1>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveView('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Calendario</span>
          </button>
          <button 
            onClick={() => setActiveView('routines')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'routines' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <ListTodo className="w-4 h-4" />
            <span className="hidden sm:inline">Rutinas</span>
          </button>
          <button 
            onClick={() => setActiveView('progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'progress' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Progreso</span>
          </button>
        </div>

        <button 
          onClick={analyzeProgress}
          disabled={isAnalyzing}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-indigo-100 transition-all border border-indigo-100"
        >
          {isAnalyzing ? (
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>Asesor AI</span>
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeView === 'calendar' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flat-card p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Sesiones</p>
                  <p className="text-2xl font-bold">{allSessions.length}</p>
                </div>
              </div>
              <div className="flat-card p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fuerza</p>
                  <p className="text-2xl font-bold">
                    {allSessions.filter(s => s.type === 'gym').length}
                  </p>
                </div>
              </div>
              <div className="flat-card p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Running</p>
                  <p className="text-2xl font-bold">
                    {allSessions.filter(s => s.type === 'running').length}
                  </p>
                </div>
              </div>
            </div>

            {aiInsight && (
              <div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl flex gap-4 items-start shadow-sm border-l-4 border-l-indigo-600">
                <div className="bg-indigo-600 p-2 rounded-lg shrink-0">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <p className="text-slate-700 italic leading-relaxed text-sm md:text-base">{aiInsight}</p>
              </div>
            )}

            <div className="flat-card p-6 md:p-8 rounded-3xl bg-white">
              <div className="flex items-center gap-2 mb-6">
                <CalendarIcon className="text-slate-400 w-5 h-5" />
                <h2 className="text-lg font-bold">Calendario de Actividad</h2>
              </div>
              <Calendar sessions={sessions} onDayClick={handleDayClick} />
            </div>
          </>
        )}

        {activeView === 'progress' && (
          <ProgressCharts allSessions={allSessions} />
        )}

        {activeView === 'routines' && (
          <RoutinesManager 
            routines={routines} 
            onSaveRoutine={(r) => setRoutines([...routines, r])}
            onDeleteRoutine={(id) => setRoutines(routines.filter(r => r.id !== id))}
          />
        )}
      </main>

      {isDetailOpen && selectedDate && (
        <DayDetail 
          date={selectedDate} 
          sessions={sessions[selectedDate] || []}
          routines={routines}
          onClose={() => setIsDetailOpen(false)}
          onAddSession={handleAddSession}
          onDeleteSession={handleDeleteSession}
        />
      )}
    </div>
  );
};

export default App;
