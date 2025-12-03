
import React from 'react';
import { User } from '../types';
import { X, LogOut, Shield, Zap, TrendingUp, Award } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClose, onLogout }) => {
  return (
    <div className="w-full max-w-md bg-[#09090b] text-white border-2 border-zinc-700 shadow-2xl relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-brand-yellow to-blue-500"></div>

      {/* Header / ID Badge */}
      <div className="relative p-6 pb-0 flex flex-col items-center z-10">
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1 hover:bg-zinc-800 rounded-full transition-colors"
        >
            <X className="w-5 h-5 text-zinc-400" />
        </button>

        <div className="w-24 h-24 rounded-full border-4 border-zinc-800 bg-zinc-900 overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.3)] relative group">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 border-4 border-black/20 rounded-full pointer-events-none"></div>
        </div>

        <h2 className="mt-4 text-2xl font-display font-black uppercase tracking-wider">{user.name}</h2>
        <div className="flex items-center gap-2 mt-1">
            <span className="px-3 py-0.5 bg-brand-yellow text-black font-mono text-xs font-bold uppercase tracking-widest rounded-sm">
                {user.role || 'CRIADOR'}
            </span>
            <span className="text-zinc-500 font-mono text-xs">LVL {user.level || 1}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-8 space-y-6 relative z-10">
          
          {/* XP Bar */}
          <div className="space-y-1">
             <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase">
                 <span>Progresso</span>
                 <span>{(user.xp || 0) + 240} / 1000 XP</span>
             </div>
             <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-brand-yellow to-yellow-600 w-[35%]"></div>
             </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center py-4 border-y border-zinc-800 bg-black/20">
              <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-purple-400">
                      <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold font-display">{user.stats?.creativity || 70}</div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">Criação</div>
              </div>
              <div className="space-y-1 border-x border-zinc-800">
                  <div className="mx-auto w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-blue-400">
                      <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold font-display">{user.stats?.vision || 70}</div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">Visão</div>
              </div>
              <div className="space-y-1">
                  <div className="mx-auto w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-green-400">
                      <Award className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-bold font-display">{user.stats?.execution || 70}</div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase">Execução</div>
              </div>
          </div>

          <div className="pt-2">
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 border border-red-900/50 text-red-500 hover:bg-red-900/20 py-3 text-sm font-mono uppercase tracking-widest transition-colors"
            >
                <LogOut className="w-4 h-4" />
                tá bom por hoje...
            </button>
          </div>
      </div>

      {/* Decorative ID Number */}
      <div className="absolute bottom-2 right-4 text-[10px] font-mono text-zinc-800 rotate-[-90deg] origin-bottom-right">
          ID: {user.id || '000-000'}
      </div>
    </div>
  );
};

export default ProfileCard;
