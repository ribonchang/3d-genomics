/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dna, Scissors, Link, Database, PieChart, Activity } from 'lucide-react';

// --- CHIA-PET WORKFLOW DIAGRAM ---
export const ChiAPETDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: <Dna size={24} />, label: "Crosslinking", desc: "Fix chromatin in vivo" },
    { icon: <Scissors size={24} />, label: "Fragmentation", desc: "Sonication & Ligation" },
    { icon: <Link size={24} />, label: "Enrichment", desc: "Antibody Pull-down" },
    { icon: <Database size={24} />, label: "Sequencing", desc: "Paired-End Tags (PET)" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl border border-stone-200 my-8 shadow-sm">
      <h3 className="font-serif text-xl mb-6 text-stone-800">ChIA-PET Protocol</h3>
      
      <div className="w-full flex justify-between items-center relative max-w-lg mb-12">
         {/* Connecting Line */}
         <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -z-10"></div>
         
         {steps.map((s, idx) => (
           <div key={idx} className="flex flex-col items-center relative">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white
                  ${step >= idx ? 'border-nobel-gold text-nobel-gold scale-110' : 'border-stone-200 text-stone-300'}`}
              >
                {s.icon}
              </div>
              <div className={`absolute top-14 text-center w-24 transition-opacity duration-300 ${step === idx ? 'opacity-100' : 'opacity-40'}`}>
                <div className="text-xs font-bold uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[10px] text-stone-500">{s.desc}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="text-center p-4 bg-stone-50 rounded-lg text-stone-600 text-sm italic max-w-md">
        "Capturing genome-wide long-range interactions mediated by RNAPII"
      </div>
    </div>
  );
};

// --- INTERACTION TYPES DIAGRAM ---
export const InteractionTypesDiagram: React.FC = () => {
  // Data roughly based on Figure 3a of Nature 2013 paper
  // P-P: 44%, P-E: 43%, E-E: 13%
  const data = [
    { label: "Promoter-Promoter", value: 44, color: "bg-teal-500" },
    { label: "Promoter-Enhancer", value: 43, color: "bg-blue-500" },
    { label: "Enhancer-Enhancer", value: 13, color: "bg-indigo-500" },
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-stone-800 rounded-xl border border-stone-700 my-8">
      <h3 className="font-serif text-xl mb-6 text-white">Interaction Composition</h3>
      <p className="text-stone-400 text-sm mb-8 text-center">
        Distribution of RNAPII-mediated chromatin interactions in ESCs.
      </p>

      <div className="flex gap-4 items-end h-48 w-full max-w-md px-8">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
             <div className="text-white font-mono font-bold text-lg mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}%
             </div>
             <motion.div 
               className={`w-full ${item.color} rounded-t-lg opacity-80 hover:opacity-100 transition-opacity`}
               initial={{ height: 0 }}
               animate={{ height: `${item.value * 2}%` }}
               transition={{ duration: 1, delay: idx * 0.2 }}
             />
             <div className="text-[10px] text-stone-400 text-center uppercase tracking-wider font-medium h-8">
               {item.label}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CELL SPECIFICITY CHART ---
export const CellSpecificityChart: React.FC = () => {
    // Conceptual visualization of cell specific enhancers vs common promoters
    // Promoters (Common) vs Enhancers (Specific)
    const [view, setView] = useState<'promoters' | 'enhancers'>('promoters');

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-white text-stone-800 rounded-xl my-8 border border-stone-200 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-4 text-stone-900">Specificity Analysis</h3>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                    While promoters involved in interactions are largely shared across cell types (Common), the enhancers they connect to are highly specific to the cell lineage (Specific).
                </p>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setView('promoters')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'promoters' ? 'bg-nobel-gold text-white shadow-md' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                    >
                        Promoters (Common)
                    </button>
                    <button 
                        onClick={() => setView('enhancers')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'enhancers' ? 'bg-nobel-gold text-white shadow-md' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                    >
                        Enhancers (Specific)
                    </button>
                </div>
            </div>
            
            <div className="w-64 h-64 relative flex items-center justify-center bg-stone-50 rounded-full border border-stone-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 text-9xl font-serif text-stone-300">
                    {view === 'promoters' ? 'P' : 'E'}
                </div>
                
                {/* Venn Diagram Simulation */}
                <div className="relative w-48 h-48">
                    {view === 'promoters' ? (
                        <>
                           {/* High Overlap */}
                           <motion.div 
                             className="absolute inset-0 rounded-full bg-teal-500 mix-blend-multiply opacity-60"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                           <motion.div 
                             className="absolute inset-0 rounded-full bg-blue-500 mix-blend-multiply opacity-60"
                             initial={{ scale: 0, x: 20 }} animate={{ scale: 1, x: 10 }}
                           />
                           <motion.div 
                             className="absolute inset-0 rounded-full bg-rose-500 mix-blend-multiply opacity-60"
                             initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: -10, y: 10 }}
                           />
                           <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md">
                                ~70% Shared
                           </div>
                        </>
                    ) : (
                        <>
                           {/* Low Overlap / Distinct */}
                           <motion.div 
                             className="absolute top-0 left-0 w-24 h-24 rounded-full bg-teal-500 opacity-80"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                           <motion.div 
                             className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-blue-500 opacity-80"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                           <motion.div 
                             className="absolute top-10 right-0 w-24 h-24 rounded-full bg-rose-500 opacity-80"
                             initial={{ scale: 0 }} animate={{ scale: 1 }}
                           />
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-stone-600 text-xs">
                               High Specificity
                           </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}