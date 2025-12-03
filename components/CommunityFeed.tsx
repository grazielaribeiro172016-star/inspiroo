
import React from 'react';
import { CommunitySpark, User } from '../types';
import { Heart, MessageCircle, User as UserIcon, Pin } from 'lucide-react';

interface CommunityFeedProps {
  sparks: CommunitySpark[];
  currentUser: User | null;
  onLike: (id: string) => void;
  onConnect: (id: string) => void;
  onRequireAuth: () => void;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ 
    sparks, 
    currentUser, 
    onLike, 
    onConnect, 
    onRequireAuth 
}) => {
  
  const handleInteraction = (action: () => void) => {
    if (!currentUser) {
        onRequireAuth();
    } else {
        action();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-32 px-4">
      <div className="flex items-end justify-between mb-12 border-b border-zinc-800 pb-4">
        <div>
            <h2 className="text-4xl font-marker text-white rotate-[-1deg]">MURAL COLETIVO</h2>
            <p className="text-zinc-500 font-hand text-xl mt-1">Ideias que acabaram de sair do papel.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sparks.map((spark, index) => {
           // Random rotation for natural feel
           const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1'];
           const rotation = rotations[index % rotations.length];

           return (
            <div key={spark.id} className={`bg-paper-white p-4 pb-8 shadow-paper-shadow transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl relative group ${rotation}`}>
                
                {/* Tape or Pin */}
                {index % 2 === 0 ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 tape-strip z-10"></div>
                ) : (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                        <Pin className="w-6 h-6 text-red-500 fill-red-500 drop-shadow-md" />
                    </div>
                )}

                <div className="flex items-center gap-3 mb-4 border-b border-dashed border-zinc-300 pb-3">
                    <div className="w-10 h-10 rounded-full border-2 border-zinc-200 overflow-hidden">
                         {/* Placeholder avatar logic if no image */}
                         <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                            <UserIcon className="w-5 h-5" />
                         </div>
                    </div>
                    <div>
                        <span className="font-hand font-bold text-lg text-black block leading-none">
                            {spark.author}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Visionário</span>
                    </div>
                </div>

                <div className="min-h-[120px]">
                    <h3 className="text-black font-display font-bold text-xl mb-2 leading-tight">
                        {spark.concept.split(':')[0]}
                    </h3>
                    
                    <p className="text-zinc-600 font-hand text-lg leading-snug">
                        {spark.fullDescription ? spark.fullDescription.substring(0, 100) + '...' : spark.concept}
                    </p>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                    {spark.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 px-2 py-1 border border-zinc-200">
                            #{tag}
                        </span>
                    ))}
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-black">
                    <button 
                        onClick={() => handleInteraction(() => onLike(spark.id))}
                        className={`flex items-center gap-2 font-hand text-lg transition-all ${
                            spark.likedByCurrentUser 
                            ? 'text-red-500 font-bold' 
                            : 'text-zinc-400 hover:text-black'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${spark.likedByCurrentUser ? 'fill-red-500' : ''}`} />
                        <span>{spark.likes}</span>
                    </button>

                    <button 
                        onClick={() => handleInteraction(() => onConnect(spark.id))}
                        className="font-marker text-sm text-black hover:text-brand-yellow hover:bg-black px-3 py-1 transition-colors"
                    >
                        TROCAR IDEIA →
                    </button>
                </div>
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default CommunityFeed;
