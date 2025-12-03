import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, User, Users, Rocket, PenTool, Sticker } from 'lucide-react';
import { INSPIRATION_PROMPTS } from '../constants';
import { AnalysisMode } from '../types';

interface IdeaInputProps {
  onAnalyze: (idea: string, mode: AnalysisMode) => void;
  isLoading: boolean;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onAnalyze, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState<AnalysisMode>(AnalysisMode.STARTUP);
  const [placeholder, setPlaceholder] = useState(INSPIRATION_PROMPTS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAnalyze(idea, mode);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10 px-4">
      
      {/* Tools / Stickers Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
          
          <button 
            type="button"
            onClick={() => setMode(AnalysisMode.PERSONAL)}
            className={`relative group transition-all duration-300 transform hover:-translate-y-2 ${
                mode === AnalysisMode.PERSONAL ? 'scale-110 rotate-[-2deg] z-10' : 'scale-100 opacity-70 hover:opacity-100 hover:rotate-2'
            }`}
          >
             <div className={`px-4 py-2 rounded-sm border-2 font-marker text-sm shadow-lg flex items-center gap-2 ${
                 mode === AnalysisMode.PERSONAL ? 'bg-pink-500 border-white text-white' : 'bg-zinc-800 border-zinc-600 text-zinc-400'
             }`}>
                <User className="w-4 h-4" />
                <span>MEU BLOQUEIO</span>
             </div>
             {/* Sticker shine */}
             {mode === AnalysisMode.PERSONAL && <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-sm pointer-events-none"></div>}
          </button>

          <button 
            type="button"
            onClick={() => setMode(AnalysisMode.PARTNERS)}
            className={`relative group transition-all duration-300 transform hover:-translate-y-2 ${
                mode === AnalysisMode.PARTNERS ? 'scale-110 rotate-[2deg] z-10' : 'scale-100 opacity-70 hover:opacity-100 hover:rotate-[-2deg]'
            }`}
          >
             <div className={`px-4 py-2 rounded-full border-2 font-marker text-sm shadow-lg flex items-center gap-2 ${
                 mode === AnalysisMode.PARTNERS ? 'bg-blue-500 border-white text-white' : 'bg-zinc-800 border-zinc-600 text-zinc-400'
             }`}>
                <Users className="w-4 h-4" />
                <span>PARA SÓCIOS</span>
             </div>
          </button>

          <button 
            type="button"
            onClick={() => setMode(AnalysisMode.STARTUP)}
            className={`relative group transition-all duration-300 transform hover:-translate-y-2 ${
                mode === AnalysisMode.STARTUP ? 'scale-110 rotate-[-1deg] z-10' : 'scale-100 opacity-70 hover:opacity-100 hover:rotate-[3deg]'
            }`}
          >
             <div className={`px-4 py-2 rounded-sm border-2 font-marker text-sm shadow-lg flex items-center gap-2 ${
                 mode === AnalysisMode.STARTUP ? 'bg-brand-yellow border-white text-black' : 'bg-zinc-800 border-zinc-600 text-zinc-400'
             }`}>
                <Rocket className="w-4 h-4" />
                <span>MODO STARTUP</span>
             </div>
          </button>
      </div>

      <form onSubmit={handleSubmit} className="relative group perspective-1000">
        
        {/* The Notebook Page */}
        <div className="relative bg-paper-white text-ink-black rounded-sm p-1 sm:p-2 shadow-paper-shadow transform transition-transform duration-500 hover:rotate-[0.5deg]">
          
          {/* Tape at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 tape-strip z-20"></div>

          <div className="border-2 border-dashed border-zinc-300 p-4 sm:p-8 bg-[size:20px_20px] bg-grid-paper rounded-sm min-h-[220px] relative">
            
            {/* Header doodles */}
            <div className="flex justify-between items-start mb-4 opacity-50 select-none pointer-events-none">
                 <span className="font-hand text-zinc-400 text-sm rotate-[-2deg]">Data: Hoje</span>
                 <span className="font-hand text-zinc-400 text-sm rotate-[1deg]">No. 001</span>
            </div>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              disabled={isLoading}
              className="w-full bg-transparent text-ink-black placeholder-zinc-400 text-2xl sm:text-3xl p-2 min-h-[160px] outline-none resize-none font-hand leading-[2.5rem]"
              placeholder={placeholder}
              style={{
                  backgroundImage: 'linear-gradient(transparent 95%, #e5e7eb 95%)',
                  backgroundSize: '100% 2.5rem',
                  lineHeight: '2.5rem'
              }}
            />
            
            <div className="flex justify-between items-end mt-6">
              <div className="flex flex-col">
                 <span className="text-xs font-hand text-zinc-400 tracking-wide rotate-1 ml-2">
                    {idea.length > 0 ? `${idea.length} caracteres de genialidade` : 'O papel aceita tudo...'}
                 </span>
                 <svg className="w-24 h-4 text-zinc-300 ml-[-10px]" viewBox="0 0 100 10">
                     <path d="M0 5 Q 50 10 100 5" stroke="currentColor" fill="none" strokeWidth="2" />
                 </svg>
              </div>

              <button
                type="submit"
                disabled={!idea.trim() || isLoading}
                className={`group relative px-6 py-4 font-marker text-xl tracking-widest transition-all duration-300 transform hover:-translate-y-1 hover:rotate-2 ${
                  idea.trim() && !isLoading
                    ? 'bg-black text-white hover:bg-zinc-800 shadow-[4px_4px_0px_#FACC15]'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 animate-spin text-brand-yellow" />
                    <span>RABISCANDO...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>MATERIALIZAR</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements behind */}
        <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-zinc-800 rounded-sm rotate-2"></div>
      </form>
    </div>
  );
};

export default IdeaInput;