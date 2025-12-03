
import React, { useState, useEffect } from 'react';
import { analyzeIdea } from './services/geminiService';
import { AppState, AnalysisResult, AnalysisMode, User, CommunitySpark } from './types';
import { MOCK_COMMUNITY_SPARKS } from './constants';
import IdeaInput from './components/IdeaInput';
import AnalysisView from './components/AnalysisView';
import CommunityFeed from './components/CommunityFeed';
import AuthModal from './components/AuthModal';
import ProfileCard from './components/ProfileCard';
import { Zap, User as UserIcon, LogOut, PenTool } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  
  // Auth & Community State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [communitySparks, setCommunitySparks] = useState<CommunitySpark[]>(MOCK_COMMUNITY_SPARKS);
  
  // Dynamic Online Users Counter
  const [onlineUsers, setOnlineUsers] = useState(1420);

  // Restore session from local storage (simple mock persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('inspiroo_user');
    if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
    }

    // Simulate fluctuation in online users
    const interval = setInterval(() => {
        setOnlineUsers(prev => {
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            return prev + change;
        });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('inspiroo_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('inspiroo_user');
    setIsProfileOpen(false);
  };

  const handleAnalyze = async (rawIdea: string, mode: AnalysisMode) => {
    setAppState(AppState.THINKING);
    setApiKeyMissing(false);
    
    try {
      const result = await analyzeIdea(rawIdea, mode);
      setAnalysis(result);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      if (!process.env.API_KEY) {
        setApiKeyMissing(true);
      }
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setAppState(AppState.IDLE);
  };

  const handleSaveSpark = (sparkResult: AnalysisResult) => {
    if (!currentUser) {
        setIsAuthModalOpen(true);
        return;
    }

    const newSpark: CommunitySpark = {
        id: Math.random().toString(36).substr(2, 9),
        author: currentUser.name,
        concept: `${sparkResult.structure.title}: ${sparkResult.structure.one_liner}`,
        fullDescription: sparkResult.spark_translation,
        tags: ['Novo', 'Rascunho'],
        likes: 0,
        likedByCurrentUser: false
    };

    setCommunitySparks(prev => [newSpark, ...prev]);
    
    // Show simple toast feedback with yellow accent
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-zinc-900 border-2 border-brand-yellow text-white px-6 py-4 rounded-sm shadow-[4px_4px_0px_#FACC15] z-50 animate-bounce font-marker text-lg flex items-center gap-2 rotate-[-2deg]';
    toast.innerHTML = '<span class="text-brand-yellow">★</span> IDEIA COLADA NO MURAL!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Community Interactions
  const handleLike = (id: string) => {
    setCommunitySparks(prev => prev.map(spark => {
        if (spark.id === id) {
            const isLiked = !spark.likedByCurrentUser;
            return {
                ...spark,
                likedByCurrentUser: isLiked,
                likes: isLiked ? spark.likes + 1 : spark.likes - 1
            };
        }
        return spark;
    }));
  };

  const handleConnect = (id: string) => {
    alert(`Solicitação de conexão enviada para o criador da ideia #${id}! (Simulação)`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans overflow-x-hidden selection:bg-brand-yellow selection:text-black">
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-50 mix-blend-overlay opacity-20"></div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />

      {/* Profile Card (Modal/Overlay) */}
      {isProfileOpen && currentUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)}></div>
            <div className="relative z-10">
                 <ProfileCard user={currentUser} onClose={() => setIsProfileOpen(false)} onLogout={handleLogout} />
            </div>
        </div>
      )}

      {/* Background Doodles (Ambient) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
         <div className="absolute top-20 left-10 w-64 h-64 border-2 border-zinc-800 rounded-full animate-blob"></div>
         <div className="absolute bottom-40 right-20 w-40 h-40 border-2 border-zinc-800 rotate-45 animate-blob animation-delay-2000"></div>
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div onClick={handleReset} className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-white text-black p-2 shadow-[2px_2px_0px_#FACC15] transition-transform group-hover:rotate-12 group-hover:scale-110 border border-black">
                <Zap className="w-6 h-6 fill-black" />
            </div>
            <h1 className="text-2xl font-rock font-bold tracking-tight text-white group-hover:text-brand-yellow transition-colors -rotate-2">INSPIRØØ</h1>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-400">
            {currentUser ? (
                <div 
                    onClick={() => setIsProfileOpen(true)}
                    className="flex items-center gap-3 pl-4 border-l border-zinc-800 cursor-pointer group"
                >
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-white text-xs font-bold font-mono group-hover:text-brand-yellow transition-colors">{currentUser.name.toUpperCase()}</span>
                        <span className="text-[10px] text-brand-yellow font-marker">{currentUser.role || 'CRIATIVO'}</span>
                    </div>
                    <div className="w-10 h-10 rounded-sm bg-zinc-900 border-2 border-white/20 group-hover:border-brand-yellow transition-colors relative overflow-hidden rotate-2 group-hover:rotate-0">
                         <img src={currentUser.avatar} alt="Perfil" className="w-full h-full object-cover" />
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-white hover:text-black text-white px-5 py-2 transition-all text-xs font-bold uppercase tracking-wider font-mono clip-path-polygon"
                    style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)' }}
                >
                    <UserIcon className="w-3.5 h-3.5" />
                    Pegar Crachá
                </button>
            )}
        </div>
      </nav>

      <main className="relative z-10 px-4 pt-10 pb-20">
        
        {appState === AppState.IDLE && (
           <div className="text-center space-y-8 mb-16 animate-fade-in-up">
              
              {/* Trust/Connection Header */}
              <div className="inline-flex items-center gap-3 bg-zinc-900/80 backdrop-blur px-4 py-2 rounded-full border border-zinc-700 mb-6 rotate-[-1deg]">
                 <div className="flex -space-x-2">
                    <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt=""/>
                    <img className="w-6 h-6 rounded-full border border-black" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ane" alt=""/>
                 </div>
                 <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>{onlineUsers} CRIADORES ONLINE</span>
                 </div>
              </div>

              <div className="max-w-4xl mx-auto relative">
                <svg className="absolute -top-10 -left-10 w-24 h-24 text-zinc-700 animate-wiggle opacity-50 hidden md:block" viewBox="0 0 100 100">
                    <path d="M20 20 Q 50 10 80 20 Q 90 50 80 80 Q 50 90 20 80 Q 10 50 20 20" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                <h2 className="text-6xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter text-white relative z-10">
                    pense menos<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-200 relative">
                        CRIE MAIS
                        <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-yellow" viewBox="0 0 100 10" preserveAspectRatio="none">
                             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" fill="none" strokeWidth="4" />
                        </svg>
                    </span>
                </h2>
              </div>
              
              <p className="text-zinc-400 text-xl max-w-lg mx-auto font-hand leading-relaxed rotate-1">
                  Tire suas ideias da cabeça e <span className="bg-white text-black px-1 font-bold transform -skew-x-12 inline-block">mostre ao mundo</span>.
              </p>
           </div>
        )}

        {/* Interaction Zone */}
        <div className="min-h-[200px] flex flex-col items-center">
            {appState !== AppState.RESULT && (
                <div className={`w-full transition-all duration-700 ${appState === AppState.THINKING ? 'opacity-50 pointer-events-none scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
                    <IdeaInput onAnalyze={handleAnalyze} isLoading={appState === AppState.THINKING} />
                </div>
            )}

            {/* Loading State Overlay (Sketching Animation) */}
            {appState === AppState.THINKING && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pt-40 pointer-events-none">
                    <div className="relative">
                        <PenTool className="w-16 h-16 text-brand-yellow animate-bounce" />
                    </div>
                    <p className="mt-8 text-3xl font-marker text-white animate-pulse">RABISCANDO O FUTURO...</p>
                    <p className="text-lg text-zinc-500 mt-2 font-hand rotate-[-2deg]">Conectando pontos invisíveis</p>
                </div>
            )}

            {/* Error State */}
             {appState === AppState.ERROR && (
                <div className="mt-8 bg-paper-white text-ink-black px-8 py-6 max-w-md text-center rotate-1 shadow-paper-shadow relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500"></div>
                    <p className="font-marker text-2xl mb-2 text-red-600">A TINTA ACABOU!</p>
                    <p className="text-lg font-hand mb-4">
                      {apiKeyMissing 
                        ? "Precisamos da chave mestra (API Key). Verifique o código." 
                        : "Ocorreu um erro criativo. Tente amassar o papel e começar de novo."}
                    </p>
                    <button onClick={() => setAppState(AppState.IDLE)} className="text-sm border-2 border-black px-4 py-2 font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                        Amassar e tentar de novo
                    </button>
                </div>
            )}

            {/* Results View */}
            {appState === AppState.RESULT && analysis && (
                <AnalysisView result={analysis} onReset={handleReset} onSave={() => handleSaveSpark(analysis)} />
            )}
        </div>

        {/* Community Section (Only visible on IDLE) */}
        {appState === AppState.IDLE && (
            <CommunityFeed 
                sparks={communitySparks} 
                currentUser={currentUser}
                onLike={handleLike}
                onConnect={handleConnect}
                onRequireAuth={() => setIsAuthModalOpen(true)}
            />
        )}

      </main>

      <footer className="relative z-10 border-t border-zinc-900 bg-black py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 opacity-50">
                <span className="font-rock text-xl text-white">INSPIRØØ</span>
              </div>
              <p className="text-zinc-600 text-sm font-hand">
                  Manifesto Criativo v2.5 • <span className="text-brand-yellow">Plano B</span>.
              </p>
          </div>
      </footer>
    </div>
  );
};

export default App;
