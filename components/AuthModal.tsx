
import React, { useState } from 'react';
import { User } from '../types';
import { X, Sparkles, UserPlus, LogIn, Dice5 } from 'lucide-react';
import { AVATAR_STYLES, USER_ROLES } from '../constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState(USER_ROLES[0].id);
  const [avatarSeed, setAvatarSeed] = useState(Math.random().toString());
  const [avatarStyle, setAvatarStyle] = useState(AVATAR_STYLES[0].id);

  if (!isOpen) return null;

  const handleRandomizeAvatar = () => {
    setAvatarSeed(Math.random().toString());
  };

  const handleSubmit = () => {
    const roleData = USER_ROLES.find(r => r.id === selectedRole);
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
      role: roleData?.label,
      avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`,
      bio: `Um ${roleData?.label} criativo explorando o INSPIRØØ.`,
      level: 1,
      xp: 0,
      stats: roleData?.stats
    };
    
    onLogin(mockUser);
    onClose();
  };

  const getAvatarUrl = () => `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${avatarSeed}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-paper-white text-ink-black rounded-sm shadow-2xl overflow-hidden">
        
        {/* Decorative Tape */}
        <div className="absolute -top-4 right-10 w-24 h-8 tape-strip z-20"></div>

        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors z-30">
            <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-10">
            
            {/* Header */}
            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter">PASSAPORTE CRIATIVO</h2>
                <p className="font-mono text-xs text-zinc-500 mt-2">EMISSÃO: INSPIRØØ AUTHORITY</p>
            </div>

            {step === 1 ? (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-marker text-lg block">COMO DEVEMOS TE CHAMAR?</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-100 border-b-2 border-zinc-300 focus:border-brand-yellow p-3 text-2xl font-hand outline-none transition-colors placeholder-zinc-400"
                            placeholder="Seu codinome..."
                            autoFocus
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="font-marker text-lg block">QUAL SEU SUPERPODER?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {USER_ROLES.map(role => (
                                <button
                                    key={role.id}
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`p-3 border-2 text-left transition-all ${
                                        selectedRole === role.id 
                                        ? 'border-black bg-brand-yellow shadow-[4px_4px_0px_#000]' 
                                        : 'border-zinc-200 hover:border-zinc-400 text-zinc-500'
                                    }`}
                                >
                                    <div className="font-bold font-display text-sm">{role.label}</div>
                                    <div className="text-[10px] font-mono mt-1 opacity-80">{role.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => { if(name) setStep(2) }}
                        disabled={!name}
                        className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-zinc-800 transition-all font-mono uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        SEGUE O BAILE →
                    </button>
                </div>
            ) : (
                <div className="space-y-6 text-center">
                     <label className="font-marker text-lg block">IDENTIDADE VISUAL</label>
                     
                     <div className="relative w-40 h-40 mx-auto bg-zinc-100 border-2 border-dashed border-zinc-300 rounded-full flex items-center justify-center group overflow-hidden">
                        <img src={getAvatarUrl()} className="w-full h-full object-cover" alt="Avatar" />
                        <button 
                            onClick={handleRandomizeAvatar}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Dice5 className="w-10 h-10 text-white animate-spin" />
                        </button>
                     </div>

                     <div className="flex justify-center gap-2 flex-wrap">
                        {AVATAR_STYLES.map(style => (
                            <button
                                key={style.id}
                                onClick={() => setAvatarStyle(style.id)}
                                className={`px-3 py-1 text-xs border rounded-full ${
                                    avatarStyle === style.id ? 'bg-black text-white' : 'bg-white border-zinc-300 text-zinc-500'
                                }`}
                            >
                                {style.name}
                            </button>
                        ))}
                     </div>

                     <button 
                        onClick={handleSubmit}
                        className="w-full bg-brand-yellow text-black border-2 border-black font-black py-4 mt-6 text-xl shadow-[6px_6px_0px_#000] hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all font-display uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        ASSINAR E ENTRAR
                    </button>
                    
                    <button onClick={() => setStep(1)} className="text-sm text-zinc-400 underline decoration-dotted">
                        Pera, deixa eu voltar
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
