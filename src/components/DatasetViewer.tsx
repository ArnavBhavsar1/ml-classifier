import React from 'react';
import { IRIS_DATASET } from '../data/iris';
import { SPECIES_COLORS } from '../types';

export function DatasetViewer() {
  return (
    <div className="bg-white border text-black overflow-hidden border-slate-200">
      <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] border-b border-black text-black py-2 px-3 text-[9px] font-mono font-bold uppercase tracking-widest bg-slate-50">
        <div>ID</div>
        <div>S.L.</div>
        <div>S.W.</div>
        <div>P.L.</div>
        <div>P.W.</div>
        <div>Species</div>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {IRIS_DATASET.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr] py-2 px-3 border-b border-slate-100 items-center hover:bg-slate-50 transition-colors cursor-default"
          >
            <div className="font-mono text-[9px] text-slate-400">#{String(i + 1).padStart(3, '0')}</div>
            <div className="font-mono text-[10px]">{row.sepalLength.toFixed(1)}</div>
            <div className="font-mono text-[10px]">{row.sepalWidth.toFixed(1)}</div>
            <div className="font-mono text-[10px]">{row.petalLength.toFixed(1)}</div>
            <div className="font-mono text-[10px]">{row.petalWidth.toFixed(1)}</div>
            <div className="flex items-center gap-1.5 line-clamp-1">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: SPECIES_COLORS[row.species] }}
              />
              <span className="font-mono text-[9px] uppercase">{row.species}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
