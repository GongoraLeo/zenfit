
import React, { useState } from 'react';
import { Routine, ActivityType, RunningActivity, GymActivity } from '../types';
import { Plus, ListTodo, Trash2, Dumbbell, Activity, Save, X } from 'lucide-react';
import { RunningForm } from './RunningForm';
import { GymForm } from './GymForm';

interface RoutinesManagerProps {
  routines: Routine[];
  onSaveRoutine: (routine: Routine) => void;
  onDeleteRoutine: (id: string) => void;
}

export const RoutinesManager: React.FC<RoutinesManagerProps> = ({ routines, onSaveRoutine, onDeleteRoutine }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null);
  const [routineName, setRoutineName] = useState('');

  const handleSave = (data: any) => {
    if (!routineName.trim()) {
      alert('Por favor, ponle un nombre a la rutina');
      return;
    }
    
    const newRoutine: Routine = {
      id: crypto.randomUUID(),
      name: routineName,
      type: selectedType as ActivityType,
      ...(selectedType === 'running' ? { running: data } : { gym: data })
    };
    
    onSaveRoutine(newRoutine);
    setIsCreating(false);
    setSelectedType(null);
    setRoutineName('');
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ListTodo className="text-indigo-600" /> Mis Rutinas
          </h2>
          <p className="text-slate-500 text-sm">Diseña y guarda tus entrenamientos favoritos</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            <Plus className="w-5 h-5" /> Nueva Rutina
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="flat-card p-6 md:p-8 rounded-3xl bg-white shadow-xl animate-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-800">Diseñar Nueva Rutina</h3>
            <button onClick={() => { setIsCreating(false); setSelectedType(null); }} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {!selectedType ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setSelectedType('running')}
                className="p-10 border-2 border-emerald-100 bg-emerald-50 rounded-2xl hover:border-emerald-300 transition-all flex flex-col items-center gap-4 group"
              >
                <Activity className="text-emerald-600 w-12 h-12 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-emerald-700">Rutina Running</span>
              </button>
              <button 
                onClick={() => setSelectedType('gym')}
                className="p-10 border-2 border-blue-100 bg-blue-50 rounded-2xl hover:border-blue-300 transition-all flex flex-col items-center gap-4 group"
              >
                <Dumbbell className="text-blue-600 w-12 h-12 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-blue-700">Rutina Gimnasio</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nombre de la Rutina</label>
                <input 
                  type="text"
                  value={routineName}
                  onChange={e => setRoutineName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-indigo-400 outline-none transition-all"
                  placeholder="Ej: Pierna Intensa, HIIT 5km, Torso-Pierna..."
                  autoFocus
                />
              </div>

              {selectedType === 'running' ? (
                <RunningForm onSave={handleSave} onCancel={() => setSelectedType(null)} />
              ) : (
                <GymForm onSave={handleSave} onCancel={() => setSelectedType(null)} />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routines.map(routine => (
            <div key={routine.id} className="flat-card p-6 rounded-2xl bg-white relative group">
              <div className={`p-2 w-fit rounded-lg mb-4 ${routine.type === 'gym' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {routine.type === 'gym' ? <Dumbbell className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{routine.name}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">
                {routine.type === 'gym' 
                  ? `${routine.gym?.exercises.length} ejercicios` 
                  : `${routine.running?.distance} km / ${routine.running?.timeMinutes} min`}
              </p>
              
              <button 
                onClick={() => onDeleteRoutine(routine.id)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="pt-4 border-t border-slate-50">
                 <p className="text-[10px] text-slate-400 italic">Esta rutina se puede aplicar desde el calendario al añadir una actividad.</p>
              </div>
            </div>
          ))}

          {routines.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <ListTodo className="mx-auto text-slate-200 w-12 h-12 mb-4" />
              <p className="text-slate-400 font-bold">No tienes rutinas guardadas.</p>
              <p className="text-slate-300 text-sm">Crea una para ahorrar tiempo al registrar tus entrenos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
