
import React, { useState, useEffect } from 'react';
import { RunningActivity } from '../types';
import { Save, RefreshCcw, Zap, Infinity } from 'lucide-react';

interface RunningFormProps {
  onSave: (data: RunningActivity) => void;
  onCancel: () => void;
  initialData?: RunningActivity;
}

export const RunningForm: React.FC<RunningFormProps> = ({ onSave, onCancel, initialData }) => {
  const [isInterval, setIsInterval] = useState(initialData?.isInterval || false);
  const [intervalCount, setIntervalCount] = useState(initialData?.intervalCount?.toString() || '1');
  const [intervalValue, setIntervalValue] = useState(initialData?.intervalValue?.toString() || '');
  const [intervalType, setIntervalType] = useState<'distance' | 'time'>(initialData?.intervalType || 'distance');
  
  const [distance, setDistance] = useState(initialData?.distance?.toString() || '');
  const [time, setTime] = useState(initialData?.timeMinutes?.toString() || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Auto-calculate totals when intervals change
  useEffect(() => {
    if (isInterval) {
      const count = parseInt(intervalCount) || 0;
      const val = parseFloat(intervalValue) || 0;
      if (intervalType === 'distance') {
        setDistance((count * val).toFixed(2));
      } else {
        setTime((count * val).toString());
      }
    }
  }, [isInterval, intervalCount, intervalValue, intervalType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      isInterval,
      intervalCount: isInterval ? parseInt(intervalCount) : undefined,
      intervalValue: isInterval ? parseFloat(intervalValue) : undefined,
      intervalType: isInterval ? intervalType : undefined,
      distance: parseFloat(distance) || 0,
      timeMinutes: parseInt(time) || 0,
      description
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setIsInterval(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${!isInterval ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
        >
          <Infinity className="w-4 h-4" /> Continuo
        </button>
        <button
          type="button"
          onClick={() => setIsInterval(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${isInterval ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
        >
          <Zap className="w-4 h-4" /> Intervalos
        </button>
      </div>

      {isInterval && (
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-[10px] font-bold text-emerald-700 uppercase mb-1">Repeticiones</label>
              <input 
                type="number"
                value={intervalCount}
                onChange={e => setIntervalCount(e.target.value)}
                className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-400 outline-none"
                placeholder="8"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-emerald-700 uppercase mb-1">
                Valor por Repetición ({intervalType === 'distance' ? 'km' : 'min'})
              </label>
              <div className="flex gap-2">
                <input 
                  type="number"
                  step="0.01"
                  value={intervalValue}
                  onChange={e => setIntervalValue(e.target.value)}
                  className="flex-1 bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm focus:border-emerald-400 outline-none"
                  placeholder={intervalType === 'distance' ? "0.40" : "2"}
                />
                <button
                  type="button"
                  onClick={() => setIntervalType(prev => prev === 'distance' ? 'time' : 'distance')}
                  className="bg-emerald-100 text-emerald-700 p-2 rounded-lg hover:bg-emerald-200"
                  title="Cambiar tipo de intervalo"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Distancia Total (km)</label>
          <input 
            type="number" 
            step="0.01"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            className={`w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-400 outline-none transition-all ${isInterval && intervalType === 'distance' ? 'opacity-50' : ''}`}
            placeholder="5.2"
            readOnly={isInterval && intervalType === 'distance'}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tiempo Total (min)</label>
          <input 
            type="number" 
            value={time}
            onChange={e => setTime(e.target.value)}
            className={`w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-400 outline-none transition-all ${isInterval && intervalType === 'time' ? 'opacity-50' : ''}`}
            placeholder="30"
            readOnly={isInterval && intervalType === 'time'}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Descripción / Recorrido</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-emerald-400 outline-none transition-all min-h-[80px]"
          placeholder="Ruta por el parque, series HIIT 400m..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="flex-[2] py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Guardar Registro
        </button>
      </div>
    </form>
  );
};
