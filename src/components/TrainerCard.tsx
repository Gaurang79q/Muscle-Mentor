import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, IndianRupee, ShieldCheck } from 'lucide-react';
import { Trainer } from '../types';
import { cn } from '../lib/utils';

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={trainer.avatar} 
          alt={trainer.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {trainer.isVerified && (
            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg" title="Verified Trainer">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}
          <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" /> {trainer.averageRating > 0 ? trainer.averageRating : 'New'}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">{trainer.name}</h3>
          <div className="flex flex-wrap gap-2">
            {trainer.specialization.slice(0, 2).map((spec, i) => (
              <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-red-600 px-2 py-0.5 rounded text-white">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider">{trainer.experience} Years Exp</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider">{trainer.mode}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Starting from</div>
            <div className="text-white font-black text-xl flex items-center">
              <IndianRupee className="w-4 h-4" /> {trainer.charges}
              <span className="text-xs text-zinc-500 font-normal lowercase ml-1">/session</span>
            </div>
          </div>
          <Link 
            to={`/trainer/${trainer.id}`} 
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
