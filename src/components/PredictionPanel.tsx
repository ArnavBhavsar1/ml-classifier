import React, { useState, useEffect } from 'react';
import { classifier } from '../lib/ml';
import { SPECIES_COLORS, Species } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Activity } from 'lucide-react';

export function PredictionPanel() {
  const [features, setFeatures] = useState({
    sepalLength: 5.1,
    sepalWidth: 3.5,
    petalLength: 1.4,
    petalWidth: 0.2,
  });
  const [prediction, setPrediction] = useState<Species | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  useEffect(() => {
    handlePredict();
  }, [features]);

  const handlePredict = () => {
    const species = classifier.predict([
      features.sepalLength,
      features.sepalWidth,
      features.petalLength,
      features.petalWidth,
    ]);
    setPrediction(species);
  };

  const handleTrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      classifier.train();
      handlePredict();
      setIsTraining(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 mb-8 border-b-2 border-slate-100 pb-4">
          <Activity size={16} className="text-black" />
          <h3 className="font-sans font-black text-xs uppercase tracking-[0.2em]">Feature Input Unit</h3>
        </div>

        <div className="space-y-6">
          {(Object.entries(features) as [keyof typeof features, number][]).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
                  {key.toString().replace(/([A-Z])/g, ' $1')}
                </label>
                <span className="text-[11px] font-mono bg-black text-white px-1.5 py-0.5">{value.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={key.toString().includes('Width') ? 0.1 : 4.0}
                max={key.toString().includes('Width') ? 4.5 : 8.5}
                step="0.1"
                value={value}
                onChange={(e) => setFeatures(f => ({ ...f, [key]: parseFloat(e.target.value) }))}
                className="w-full h-1.5 bg-slate-100 rounded-none appearance-none cursor-pointer accent-black"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleTrain}
          disabled={isTraining}
          className="mt-10 w-full py-4 bg-black text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-900 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isTraining ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu size={14} />
            </motion.div>
          ) : (
            <Zap size={14} />
          )}
          {isTraining ? 'RE-CALIBRATING...' : 'EXECUTE RETRAIN'}
        </button>
      </div>

      <div className="bg-black text-white p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(100,116,139,0.5)]">
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">Live Inference Stream</h3>
          </div>

          <div className="py-12 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {prediction && (
                <motion.div
                  key={prediction}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="space-y-6"
                >
                  <div 
                    className="w-16 h-1 bg-white mb-6 mx-auto"
                    style={{ backgroundColor: SPECIES_COLORS[prediction] }}
                  />
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-slate-500 block mb-2">CLASSIFICATION_RESULT</span>
                    <h2 className="text-5xl font-black uppercase tracking-tighter italic">{prediction}</h2>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="bg-slate-900 p-4 font-mono">
          <div className="flex justify-between text-[9px] text-slate-500 uppercase mb-2">
            <span>Latent Space</span>
            <span>0.003ms</span>
          </div>
          <div className="flex gap-0.5 h-1">
             {[...Array(20)].map((_, i) => (
               <div key={i} className={`flex-1 ${i < 15 ? 'bg-green-500' : 'bg-slate-800'}`}></div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
