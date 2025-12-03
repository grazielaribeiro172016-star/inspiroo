import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Zap, CheckSquare, ArrowRight, Loader, Paperclip, Pin } from 'lucide-react';
import { NEXT_STEPS_LIST } from '../constants';

interface AnalysisViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onSave: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result, onReset, onSave }) => {
  const [checkedSteps, setCheckedSteps] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const toggleStep = (step: string) => {
    const newSteps = new Set(checkedSteps);
    if (newSteps.has(step)) {
      newSteps.delete(step);
    } else {
      newSteps.add(step);
    }
    setCheckedSteps(newSteps);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onSave();
      setIsSaving(false);
      setIsSaved(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16 animate-fade-in pb-32 px-4">

      {/* 1. THE MANIFESTO */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-10 tape-strip z-20"></div>

        <div className="bg-paper-white text-ink-black p-8 md:p-12 shadow-paper-shadow rotate-[-1deg] relative overflow-hidden">

          <div className="absolute top-8 right-8 border-4 border-red-600 text-red-600 rounded-full w-24 h-24 flex items-center justify-center rotate-[-15deg] opacity-70 pointer-events-none">
            <span className="font-marker text-lg text-center leading-none">TOP<br/>SECRET</span>
          </div>

          <div className="relative z-10">
            <p className="font-mono text-xs text-zinc-400 mb-4 tracking-[0.2em] uppercase">
              Arquivo #2983 // Classificação: Visionário
            </p>

            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-[0.9] tracking-tighter uppercase">
              {result.structure.title}
            </h2>

            <div className="font-serif text-2xl md:text-3xl leading-relaxed text-zinc-800 space-y-4">
              <p className="relative">
                <span className="absolute -left-6 top-2 text-brand-yellow text-4xl font-hand hidden md:block">→</span>
                <span className="marker-highlight">
                  {result.spark_translation}
                </span>
              </p>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-black flex items-center gap-4">
              <span className="font-hand text-xl text-zinc-500">Assinado:</span>
              <span className="font-rock text-xl text-blue-600 rotate-[-2deg]">INSPIRØØ AI</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-zinc-800 rotate-2 -z-10 translate-y-2"></div>
      </div>

      {/* 2. MOODBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start relative">

        <svg className="absolute top-[-40px] left-[10%] w-20 h-20 text-white opacity-50 hidden lg:block" viewBox="0 0 100 100">
          <path d="M10 10 Q 50 80 90 90" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="5,5"/>
          <path d="M80 80 L 90 90 L 80 100" stroke="currentColor" fill="none" strokeWidth="2" />
        </svg>

        {/* Post-it Why Now */}
        <div className="lg:col-span-4 bg-[#fef3c7] text-black p-6 shadow-lg rotate-[-3deg] hover:rotate-0 transition-transform duration-300 relative min-h-[250px] flex flex-col">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm z-10"></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-zinc-400 z-0"></div>

          <h3 className="font-marker text-2xl mb-4 text-red-600 rotate-[-2deg]">Timing é tudo!</h3>
          <p className="font-hand text-2xl leading-tight flex-grow">
            {result.structure.why_now}
          </p>

          <div className="mt-4 flex justify-end">
            <div className="w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center rotate-12">
              <span className="font-marker text-red-600 text-xs">AGORA</span>
            </div>
          </div>
        </div>

        {/* Problem + Audience */}
        <div className="lg:col-span-8 bg-zinc-900 p-1 shadow-2xl rotate-[1deg] group">
          <div className="border border-white/20 p-8 h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-auto font-mono text-xs text-zinc-500">SYSTEM_ANALYSIS.EXE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              <div>
                <h3 className="font-mono text-brand-yellow text-xs mb-2 uppercase tracking-widest">&gt;&gt; Error / Problem</h3>
                <p className="font-display text-xl text-white leading-snug">"{result.structure.problem}"</p>
              </div>

              <div>
                <h3 className="font-mono text-pink-400 text-xs mb-2 uppercase tracking-widest">&gt;&gt; Target_User</h3>
                <p className="font-display text-xl text-white leading-snug">"{result.structure.target_audience}"</p>
              </div>

            </div>

            <div className="mt-8 bg-black/40 p-4 border-l-2 border-brand-yellow">
              <p className="font-hand text-2xl text-zinc-300 italic">"{result.structure.one_liner}"</p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. CREATIVE PATHS */}
      <div className="relative py-8">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-marker text-3xl text-white rotate-[-1deg]">
            <span className="bg-brand-yellow text-black px-2">3 CAMINHOS</span> DE ATAQUE
          </h3>
          <svg className="w-24 h-6 text-white" viewBox="0 0 100 20">
            <path d="M0 10 Q 50 -10 100 10" stroke="currentColor" fill="none" strokeWidth="3" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {result.creative_paths.map((path, idx) => (
            <div key={idx} className="bg-paper-white text-ink-black p-6 pb-12 shadow-lg relative group transition-all duration-300 hover:-translate-y-2 hover:rotate-1">

              <div className="absolute -top-3 right-6 text-zinc-400">
                <Paperclip className="w-8 h-8 rotate-12" />
              </div>

              <span className="absolute bottom-2 right-4 font-display text-6xl text-zinc-100 font-bold -z-0 group-hover:text-brand-yellow/20 transition-colors">
                0{idx + 1}
              </span>

              <h4 className="font-marker text-xl mb-3 text-zinc-800 relative z-10">Opção {['A','B','C'][idx]}</h4>
              <p className="font-hand text-xl font-semibold relative z-10 leading-snug">{path}</p>

            </div>
          ))}
        </div>
      </div>

      {/* 4. BLUEPRINT */}
      <div className="bg-[#1e3a8a] text-blue-50 p-2 rounded-sm shadow-2xl relative overflow-hidden">

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="relative p-6 sm:p-10 border-4 border-white/20 m-2">

          <div className="absolute bottom-4 right-4 border-2 border-white/30 p-2">
            <div className="font-mono text-[10px] text-blue-300">PROJETO: STARTUP</div>
            <div className="font-mono text-[10px] text-blue-300">STATUS: RASCUNHO</div>
          </div>

          <h3 className="font-display font-bold text-3xl mb-8 flex items-center gap-3">
            <div className="bg-white text-blue-900 p-2 rounded-sm"><Zap className="w-6 h-6" /></div>
            ARQUITETURA DE NEGÓCIO
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* MVP */}
            <div className="space-y-6">

              <div className="relative">
                <span className="font-mono text-xs text-blue-300 border border-blue-300 px-1 mb-2 inline-block">MÓDULO 01: MVP</span>
                <p className="font-pen text-3xl text-white leading-none transform -rotate-1">
                  {result.startup_evolution.first_feature}
                </p>

                <svg className="w-full h-4 text-brand-yellow mt-1 opacity-80" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 100 15 200 0" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
              </div>

              <div className="bg-blue-900/50 p-4 border border-blue-400/30 backdrop-blur-sm">
                <span className="font-mono text-xs text-blue-300 mb-2 block">PROTOCOLO DE VALIDAÇÃO</span>
                <ul className="space-y-2">
                  {result.startup_evolution.validation_steps.map((step, i) => (
                    <li key={i} className="flex items-center gap-3 font-hand text-xl text-blue-100">
                      <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px]">{i+1}</div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* PITCH */}
            <div className="space-y-6">

              <div className="relative p-6 bg-white text-blue-900 shadow-xl rotate-1">
                <div className="absolute -top-3 -left-3">
                  <Pin className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                <span className="font-marker text-lg opacity-50 block mb-2">ELEVATOR PITCH</span>
                <p className="font-hand text-2xl font-bold leading-tight">
                  "{result.startup_evolution.pitch_30s}"
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {result.startup_eolution?.business_models?.map((model, i) => (
                  <span key={i} className="px-3 py-1 bg-brand-yellow text-black font-mono text-sm font-bold border-b-2 border-black">
                    $ {model}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* 5. ACTION PLAN */}
      <div className="bg-paper-white p-8 md:p-12 rotate-[0.5deg] shadow-2xl relative max-w-4xl mx-auto border-t-8 border-brand-yellow">

        <div className="text-center mb-10">
          <h3 className="font-marker text-4xl mb-2 text-black">O QUE FAZER AGORA?</h3>
          <p className="font-hand text-2xl text-zinc-600">{result.hook_message}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 pl-4">
          {NEXT_STEPS_LIST.map((step) => {
            const isChecked = checkedSteps.has(step);
            return (
              <button
                key={step}
                onClick={() => toggleStep(step)}
                className="flex items-center gap-3 group text-left"
              >
                <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-all duration-200 ${
                  isChecked ? 'bg-black scale-110' : 'bg-transparent group-hover:border-brand-yellow'
                }`}>
                  {isChecked && <CheckSquare className="w-4 h-4 text-brand-yellow" />}
                </div>
                <span className={`font-hand text-xl ${
                  isChecked ? 'line-through decoration-2 decoration-red-500 text-zinc-400' : 'text-black'
                }`}>
                  {step}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t-2 border-dashed border-zinc-300">

          <button
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className={`px-10 py-4 font-marker text-2xl tracking-widest transition-all shadow-[8px_8px_0px_#000] border-2 border-black flex items-center gap-3 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] active:translate-y-0 active:shadow-none ${
              isSaved
                ? 'bg-zinc-200 text-zinc-400 cursor-default border-zinc-400 shadow-zinc-400'
                : 'bg-brand-yellow text-black'
            }`}
          >
            {isSaving ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                <span>COLANDO...</span>
              </>
            ) : isSaved ? (
              <>
                <CheckSquare className="w-6 h-6" />
                <span>SALVO!</span>
              </>
            ) : (
              <>
                <span>SALVAR IDEIA</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>

          <button
            onClick={onReset}
            className="font-hand text-xl underline decoration-wavy decoration-zinc-400 hover:text-brand-yellow transition-colors"
          >
            Amassar e começar outra
          </button>

        </div>

      </div>

    </div>
  );
};

export default AnalysisView;
