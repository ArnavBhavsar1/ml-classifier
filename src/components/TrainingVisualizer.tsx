import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { IRIS_DATASET } from '../data/iris';
import { SPECIES_COLORS } from '../types';

export function TrainingVisualizer() {
  const data = IRIS_DATASET.map(d => ({
    x: d.petalLength,
    y: d.petalWidth,
    species: d.species,
    sepalLength: d.sepalLength,
    sepalWidth: d.sepalWidth
  }));

  return (
    <div className="h-[400px] w-full border border-slate-200 p-6 bg-white">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="font-sans font-black text-2xl uppercase tracking-tighter leading-tight">Feature Analysis</h3>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Petal Dimensions / Variance Projection</p>
        </div>
        <div className="flex gap-4 p-2 bg-slate-50 border border-slate-100">
          {Object.entries(SPECIES_COLORS).map(([species, color]) => (
            <div key={species} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-mono uppercase font-bold text-slate-600 tracking-tight">{species}</span>
            </div>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="75%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Petal Length" 
            unit="cm" 
            tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#64748b' }}
            tickLine={{ stroke: '#cbd5e1' }}
            axisLine={{ stroke: '#000', strokeWidth: 1 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Petal Width" 
            unit="cm" 
            tick={{ fontSize: 9, fontFamily: 'monospace', fill: '#64748b' }}
            tickLine={{ stroke: '#cbd5e1' }}
            axisLine={{ stroke: '#000', strokeWidth: 1 }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3', stroke: '#000' }} 
            contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', color: '#000', fontFamily: 'monospace', fontSize: '9px', fontWeight: 'bold' }}
          />
          <Scatter name="Iris Specimen" data={data}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={SPECIES_COLORS[entry.species as keyof typeof SPECIES_COLORS]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
