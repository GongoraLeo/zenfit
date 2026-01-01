
import React, { useState } from 'react';
import { WorkoutSession, ActivityType, Routine } from '../types';
import { X, Plus, Trash2, Dumbbell, Activity, Timer, Ruler, Save, Zap, ListPlus } from 'lucide-react';
import { RunningForm } from './RunningForm';
import { GymForm } from './GymForm';

interface DayDetailProps {
  date: string;
  sessions: WorkoutSession[];
  routines: Routine[];
  onClose: () => void;
  onAddSession: (session: WorkoutSession) => void;
  onDeleteSession: (date: string, sessionId: string) => void;
}

export const DayDetail: React.FC<DayDetailProps> = ({ date, sessions, routines, onClose, onAddSession, onDeleteSession }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [initialData, setInitialData] = useState<any>(null);

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const applyRoutine = (routine: Routine) => {
    setSelectedType(routine.type);
    if (routine.type === 'running') {
      setInitialData(routine.running);
    } else {
      setInitialData(routine.gym);
    }
    setIsAdding(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-800 capitalize">{formattedDate}</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{sessions.length} Actividades registradas</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[75vh] space-y-6">
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="flat-card p-5 rounded-2xl flex items-start justify-between group bg-white">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl shadow-sm ${session.type === 'gym' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {session.type === 'gym' ? <Dumbbell /> : <Activity />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-2">
                      {session.type === 'gym' ? 'Sesión de Fuerza' : (session.running?.isInterval ? 'Running Intervalos' : 'Running Continuo')}
                    </h4>
                    
                    {session.type === 'running' && session.running && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-600 text-sm">
                        <span className="flex items-center gap-1.5 font-bold"><Ruler className="w-4 h-4 text-emerald-500" /> {session.running.distance} km</span>
                        <span className="flex items-center gap-1.5 font-bold"><Timer className="w-4 h-4 text-emerald-500" /> {session.running.timeMinutes} min</span>
                        {session.running.isInterval && (
                          <span className="flex items-center gap-1.5 font-bold text-emerald-600"><Zap className="w-3.5 h-3.5" /> {session.running.intervalCount} series</span>
                        )}
                        {session.running.description && <p className="w-full mt-2 text-xs italic opacity-75 border-l-2 border-emerald-100 pl-3">{session.running.description}</p>}
                      </div>
                    )}

                    {session.type === 'gym' && session.gym && (
                      <div className="space-y-3">
                        {session.gym.exercises.map(ex => (
                          <div key={ex.id} className="text-sm">
                            <span className="font-bold text-slate-700 block mb-1">{ex.name}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {ex.sets.map((s, idx) => (
                                <span key={s.id} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold border border-slate-200">
                                  {s.reps}x{s.weight}kg
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => onDeleteSession(date, session.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-rose-400 hover:text-rose-600 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {isAdding ? (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              {!selectedType ? (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center">Selecciona tipo de actividad</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setSelectedType('running')}
                      className="p-6 border-2 border-emerald-100 bg-emerald-50 rounded-2xl hover:border-emerald-300 hover:scale-[1.02] transition-all flex flex-col items-center gap-3 shadow-sm"
                    >
                      <Activity className="text-emerald-600 w-10 h-10" />
                      <span className="font-bold text-emerald-700">Running</span>
                    </button>
                    <button 
                      onClick={() => setSelectedType('gym')}
                      className="p-6 border-2 border-blue-100 bg-blue-50 rounded-2xl hover:border-blue-300 hover:scale-[1.02] transition-all flex flex-col items-center gap-3 shadow-sm"
                    >
                      <Dumbbell className="text-blue-600 w-10 h-10" />
                      <span className="font-bold text-blue-700">Gimnasio</span>
                    </button>
                  </div>
                  
                  {routines.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ListPlus className="w-4 h-4" /> Aplicar Rutina Guardada
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {routines.map(r => (
                          <button
                            key={r.id}
                            onClick={() => applyRoutine(r)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${r.type === 'gym' ? 'border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100' : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}
                          >
                            {r.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-4 text-slate-400">
                    <button onClick={() => { setSelectedType(null); setInitialData(null); }} className="text-xs font-bold hover:text-slate-600 flex items-center gap-1 uppercase tracking-wider">
                      &larr; Volver
                    </button>
                    <span className="text-xs opacity-50">/</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Nueva Actividad de {selectedType === 'gym' ? 'Gimnasio' : 'Running'}</span>
                  </div>
                  {selectedType === 'running' ? (
                    <RunningForm 
                      initialData={initialData}
                      onSave={(data) => {
                        onAddSession({ id: crypto.randomUUID(), date, type: 'running', running: data });
                        setIsAdding(false); setSelectedType(null); setInitialData(null);
                      }} 
                      onCancel={() => { setIsAdding(false); setSelectedType(null); setInitialData(null); }} 
                    />
                  ) : (
                    <GymForm 
                      initialData={initialData}
                      onSave={(data) => {
                        onAddSession({ id: crypto.randomUUID(), date, type: 'gym', gym: data });
                        setIsAdding(false); setSelectedType(null); setInitialData(null);
                      }} 
                      onCancel={() => { setIsAdding(false); setSelectedType(null); setInitialData(null); }} 
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-400 hover:bg-indigo-50 transition-all group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Añadir Actividad</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
