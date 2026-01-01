
import React, { useState, useEffect } from 'react';
import { GymActivity, Exercise, Set } from '../types';
// Added missing 'Dumbbell' import from lucide-react
import { Save, Plus, Trash2, X, Dumbbell } from 'lucide-react';

interface GymFormProps {
  onSave: (data: GymActivity) => void;
  onCancel: () => void;
  initialData?: GymActivity;
}

export const GymForm: React.FC<GymFormProps> = ({ onSave, onCancel, initialData }) => {
  const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || []);
  const [currentExercise, setCurrentExercise] = useState('');

  const addExercise = () => {
    if (!currentExercise.trim()) return;
    const newEx: Exercise = {
      id: crypto.randomUUID(),
      name: currentExercise,
      sets: [{ id: crypto.randomUUID(), reps: 0, weight: 0 }]
    };
    setExercises([...exercises, newEx]);
    setCurrentExercise('');
  };

  const addSet = (exId: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exId) {
        return {
          ...ex,
          sets: [...ex.sets, { id: crypto.randomUUID(), reps: 0, weight: 0 }]
        };
      }
      return ex;
    }));
  };

  const updateSet = (exId: string, setId: string, field: 'reps' | 'weight', value: string) => {
    const val = parseFloat(value) || 0;
    setExercises(prev => prev.map(ex => {
      if (ex.id === exId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: val } : s)
        };
      }
      return ex;
    }));
  };

  const removeExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const removeSet = (exId: string, setId: string) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exId) {
        const newSets = ex.sets.filter(s => s.id !== setId);
        return { ...ex, sets: newSets.length > 0 ? newSets : [{ id: crypto.randomUUID(), reps: 0, weight: 0 }] };
      }
      return ex;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exercises.length === 0) return;
    onSave({ exercises });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={currentExercise}
          onChange={e => setCurrentExercise(e.target.value)}
          className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-400 outline-none transition-all"
          placeholder="Añadir ejercicio (ej: Press Banca)..."
          onKeyPress={(e) => e.key === 'Enter' && addExercise()}
        />
        <button 
          onClick={addExercise}
          type="button"
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {exercises.map((ex, exIdx) => (
          <div key={ex.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 animate-in slide-in-from-left-2 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-bold text-slate-700 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-5 h-5 rounded-full text-[9px] flex items-center justify-center font-bold">{exIdx + 1}</span>
                {ex.name}
              </h5>
              <button onClick={() => removeExercise(ex.id)} className="text-slate-300 hover:text-rose-500 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {ex.sets.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 w-4">#{idx+1}</span>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div className="relative">
                      <input 
                        type="number"
                        placeholder="Reps"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold focus:border-blue-300 outline-none"
                        value={s.reps || ''}
                        onChange={e => updateSet(ex.id, s.id, 'reps', e.target.value)}
                      />
                      <span className="absolute right-2 top-1.5 text-[8px] text-slate-400 font-bold uppercase pointer-events-none">Reps</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number"
                        step="0.1"
                        placeholder="Peso"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold focus:border-blue-300 outline-none"
                        value={s.weight || ''}
                        onChange={e => updateSet(ex.id, s.id, 'weight', e.target.value)}
                      />
                      <span className="absolute right-2 top-1.5 text-[8px] text-slate-400 font-bold uppercase pointer-events-none">Kg</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeSet(ex.id, s.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => addSet(ex.id)}
              type="button"
              className="mt-3 w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-400 text-[10px] font-bold hover:bg-white hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Añadir Serie
            </button>
          </div>
        ))}
        
        {exercises.length === 0 && (
          <div className="text-center py-10 opacity-40">
            <Dumbbell className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider">Añade ejercicios arriba</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button 
          onClick={onCancel}
          type="button"
          className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSubmit}
          disabled={exercises.length === 0}
          className={`flex-[2] py-3 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${exercises.length > 0 ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-100' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          <Save className="w-5 h-5" />
          Guardar Sesión
        </button>
      </div>
    </div>
  );
};
