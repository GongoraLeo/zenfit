
import React, { useMemo, useState } from 'react';
import { WorkoutSession } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, Cell
} from 'recharts';
import { Activity, Ruler, Timer, Weight, TrendingUp } from 'lucide-react';

interface ProgressChartsProps {
  allSessions: WorkoutSession[];
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({ allSessions }) => {
  const [daysFilter, setDaysFilter] = useState(30);

  const filteredSessions = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - (daysFilter * 24 * 60 * 60 * 1000));
    return allSessions.filter(s => new Date(s.date) >= cutoff);
  }, [allSessions, daysFilter]);

  const runningData = useMemo(() => {
    return filteredSessions
      .filter(s => s.type === 'running' && s.running)
      .map(s => ({
        fecha: new Date(s.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        distancia: s.running?.distance || 0,
        tiempo: s.running?.timeMinutes || 0
      }));
  }, [filteredSessions]);

  const gymVolumeData = useMemo(() => {
    const exerciseVolumes: { [name: string]: number } = {};
    filteredSessions.filter(s => s.type === 'gym' && s.gym).forEach(s => {
      s.gym?.exercises.forEach(ex => {
        const volume = ex.sets.reduce((acc, set) => acc + (set.reps * set.weight), 0);
        exerciseVolumes[ex.name] = (exerciseVolumes[ex.name] || 0) + volume;
      });
    });

    return Object.entries(exerciseVolumes)
      .map(([name, vol]) => ({ name, volumen: vol }))
      .sort((a, b) => b.volumen - a.volumen)
      .slice(0, 8); // Top 8 exercises
  }, [filteredSessions]);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> Mi Progreso
          </h2>
          <p className="text-slate-500 text-sm">Visualiza tus estadísticas de entrenamiento</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {[7, 30, 90].map(d => (
            <button
              key={d}
              onClick={() => setDaysFilter(d)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${daysFilter === d ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Últimos {d} días
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Running Chart */}
        <div className="flat-card p-6 rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2 text-emerald-600">
              <Activity className="w-5 h-5" /> Tendencia Running (km)
            </h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={runningData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                />
                <Line type="monotone" dataKey="distancia" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gym Volume Chart */}
        <div className="flat-card p-6 rounded-3xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2 text-blue-600">
              <Weight className="w-5 h-5" /> Volumen por Ejercicio (kg totales)
            </h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gymVolumeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="volumen" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                  {gymVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#2563eb' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {allSessions.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold">No hay datos suficientes para mostrar gráficos.</p>
          <p className="text-slate-300 text-sm">Registra algunos entrenamientos primero.</p>
        </div>
      )}
    </div>
  );
};
