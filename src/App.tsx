import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Activity, Target, ChevronRight, Binary, Terminal } from 'lucide-react';
import { DatasetViewer } from './components/DatasetViewer';
import { TrainingVisualizer } from './components/TrainingVisualizer';
import { PredictionPanel } from './components/PredictionPanel';

type Step = 'data' | 'training' | 'prediction';

export default function App() {
  const [activeStep, setActiveStep] = useState<Step>('data');

  const steps = [
    { id: 'data', label: 'Data Selection', icon: Database, description: 'Loading & Exploring the Iris Dataset', num: '01' },
    { id: 'training', label: 'Preprocessing', icon: Activity, description: 'Analyzing Feature Relationships', num: '02' },
    { id: 'prediction', label: 'Model Engine', icon: Target, description: 'Live Classification Predictions', num: '03' },
  ];

  return (
    <div className="h-screen w-screen bg-[#f0f1f3] flex flex-col font-sans overflow-hidden">
      {/* Top Header */}
      <header className="flex justify-between items-end border-b-[3px] border-black px-8 py-6 mb-0 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 w-fit mb-2">PROJECT_ID: ML-IRIS-2024</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-black leading-none">Machine Learning Pipeline</h1>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[11px] font-mono text-slate-500 uppercase mb-1 tracking-widest leading-none">Library: ml-knn / v3.0.0</div>
          <div className="flex items-center gap-2 justify-end">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-bold uppercase text-black">Kernel Status: Stable</span>
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail */}
        <aside className="w-64 border-r-2 border-slate-200 p-8 flex flex-col">
           <div className="space-y-8 flex-1">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id as Step)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-2xl font-serif italic ${activeStep === step.id ? 'text-black' : 'text-slate-300'}`}>{step.num}.</span>
                    <h2 className={`text-[10px] font-mono font-bold uppercase tracking-widest ${activeStep === step.id ? 'text-black' : 'text-slate-400'}`}>
                      {step.label}
                    </h2>
                  </div>
                  {activeStep === step.id && (
                     <div className="h-[2px] bg-black w-full" />
                  )}
                </button>
              ))}
           </div>

           <div className="pt-8 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-2 opacity-50">
                <Terminal size={12} strokeWidth={3} />
                <span className="text-[9px] font-mono font-bold uppercase">IRIS_SYS_V1.0</span>
              </div>
              <p className="text-[9px] font-mono text-slate-400 leading-tight uppercase">
                LOAD_STATE: VERIFIED<br/>
                MODEL_ID: K-NN_RADIAL<br/>
                RUNTIME: NODE_{process.version.split('.')[0] || 'V20_LTS'}
              </p>
           </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeStep === 'data' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                       <DatasetViewer />
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-[9px] font-mono uppercase text-slate-400 mb-2">METADATA_EXTRACT</div>
                        <h4 className="text-xl font-black uppercase tracking-tighter mb-4">iris_dataset</h4>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                           <div className="bg-slate-50 p-2 border border-slate-100">
                             <div className="text-[8px] uppercase font-bold text-slate-400 mb-1">Row Count</div>
                             <div className="text-sm font-mono font-black">150</div>
                           </div>
                           <div className="bg-slate-50 p-2 border border-slate-100">
                             <div className="text-[8px] uppercase font-bold text-slate-400 mb-1">Features</div>
                             <div className="text-sm font-mono font-black">4</div>
                           </div>
                        </div>
                        <p className="text-[10px] font-mono leading-relaxed text-slate-500 uppercase">
                          Source code: Fisher, R.A. "The use of multiple measurements in taxonomic problems" (1936).
                        </p>
                      </div>

                      <div className="p-4 bg-slate-900 text-white font-mono text-[9px] uppercase tracking-widest py-3">
                         <span className="flex items-center gap-2">
                           <Activity size={10} />
                           System_Bus: Active
                         </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 'training' && (
                  <div className="space-y-8">
                    <TrainingVisualizer />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="bg-white border-2 border-black p-5">
                          <h4 className="text-[10px] font-mono font-bold uppercase mb-3 text-slate-400 tracking-widest">Preprocessing_Log / v1.0</h4>
                          <p className="text-xs font-bold leading-relaxed uppercase">
                            Standardization complete. Feature scaling applied across all 4 parameters to ensure uniform Euclidean distance calculation.
                          </p>
                       </div>
                       <div className="bg-slate-900 text-white p-5 border-2 border-black">
                          <h4 className="text-[10px] font-mono font-bold uppercase mb-3 text-slate-500">Pipeline_Architecture</h4>
                          <div className="flex h-1.5 bg-slate-800 mb-3">
                             <div className="w-4/5 bg-white"></div>
                             <div className="w-1/5 bg-slate-700"></div>
                          </div>
                          <p className="text-[10px] font-mono leading-none flex justify-between uppercase">
                             <span>Comp_Load</span>
                             <span>80%/20%</span>
                          </p>
                       </div>
                    </div>
                  </div>
                )}

                {activeStep === 'prediction' && (
                  <PredictionPanel />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Footer Rail */}
      <footer className="flex justify-between items-center px-8 py-3 bg-white border-t-2 border-black text-[9px] font-mono text-slate-400 shrink-0">
        <span className="flex items-center gap-2">
          <ChevronRight size={10} className="text-black" />
          SYSTEM_TIMESTAMP: {new Date().toISOString().split('.')[0].replace('T', ' ')}
        </span>
        <div className="flex gap-8">
           <span className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-green-500"></div>
             CPU_LOAD: 12.4%
           </span>
           <span className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-blue-500"></div>
             MEM_USAGE: 2.1GB
           </span>
        </div>
      </footer>
    </div>
  );
}
