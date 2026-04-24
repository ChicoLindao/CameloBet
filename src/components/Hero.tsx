/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Trophy, TrendingUp, Zap } from 'lucide-react';

import { useBetting, Selection } from '../contexts/BettingContext';

export default function Hero() {
  const { selections, addSelection, removeSelection } = useBetting();

  const handleFeaturedBet = (selecKey: string, odd: number) => {
    const selecName = selecKey === '1' ? 'Flamengo' : selecKey === '2' ? 'Palmeiras' : 'Empate';
    const isAlreadySelected = selections.some(s => s.matchId === 'featured-1' && s.selection === selecKey);

    if (isAlreadySelected) {
      removeSelection('featured-1');
    } else {
      const newSelection: Selection = {
        matchId: 'featured-1',
        matchName: 'Flamengo vs Palmeiras',
        selection: selecKey,
        selectionName: selecName,
        odds: odd
      };
      addSelection(newSelection);
    }
  };

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            onClick={() => document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
          >
            <Zap size={14} fill="currentColor" />
            <span className="text-[10px] font-bold tracking-widest uppercase">ODDS TURBINADAS HOJE</span>
          </div>
          
          <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 tracking-tighter uppercase italic">
            FLAMENGO vs <span className="gold-text-gradient">PALMEIRAS</span>
          </h1>
          
          <p className="font-sans text-lg text-slate-400 max-w-lg mb-8 leading-relaxed">
            Aposte com as melhores odds do mercado no maior clássico da rodada. Comece sua jornada agora.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-primary hover:bg-primary-hover text-surface-950 font-black rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-widest text-xs"
            >
              Apostar Agora
            </button>
            <button 
              onClick={() => document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-surface-800 hover:bg-surface-700 border border-surface-700 font-bold rounded-xl transition-all uppercase tracking-widest text-xs"
            >
              Ver Mercados
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface-950 bg-surface-800 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 123}`} alt="avatar" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-surface-950 bg-surface-900 flex items-center justify-center text-[10px] font-bold">
                +12K
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-tight">
              <span className="text-slate-200 font-bold">+12,000 usuários</span> ativos<br />apostando agora mesmo.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Card Mockup */}
          <div className="relative z-10 bg-gradient-to-br from-white/10 to-transparent p-[1px] rounded-[40px] border border-white/10 backdrop-blur-sm">
             <div className="bg-surface-900 rounded-[39px] p-8 aspect-square flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">FEEL THE POWER</span>
                    <h3 className="font-display font-black text-3xl mt-1 italic tracking-tighter text-white">DESTAQUE RODO</h3>
                  </div>
                  <div className="px-3 py-1 bg-red-600 rounded-full text-[10px] font-black italic flex items-center gap-1 text-white">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                </div>

                <div className="flex justify-between items-center py-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-surface-800 rounded-full flex items-center justify-center mb-2 mx-auto border border-surface-700 shadow-xl">
                      <Trophy size={32} className="text-primary" />
                    </div>
                    <span className="font-black text-[10px] tracking-widest uppercase">FLAMENGO</span>
                  </div>
                  <div className="text-5xl font-display font-black text-surface-800 italic">VS</div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-surface-800 rounded-full flex items-center justify-center mb-2 mx-auto border border-surface-700 shadow-xl">
                      <Trophy size={32} className="text-slate-400" />
                    </div>
                    <span className="font-black text-[10px] tracking-widest uppercase">PALMEIRAS</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div 
                    onClick={() => handleFeaturedBet('1', 1.85)}
                    className={`p-3 rounded-2xl text-center border cursor-pointer transition-all group ${
                      selections.some(s => s.matchId === 'featured-1' && s.selection === '1')
                        ? 'bg-primary text-surface-950 border-primary'
                        : 'bg-surface-800 border-surface-700 hover:bg-primary hover:text-surface-950'
                    }`}
                  >
                    <div className={`text-[10px] font-bold mb-0.5 ${selections.some(s => s.matchId === 'featured-1' && s.selection === '1') ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>1</div>
                    <div className={`text-lg font-mono font-bold ${selections.some(s => s.matchId === 'featured-1' && s.selection === '1') ? 'text-surface-950' : 'text-primary group-hover:text-inherit'}`}>1.85</div>
                  </div>
                  <div 
                    onClick={() => handleFeaturedBet('X', 3.40)}
                    className={`p-3 rounded-2xl text-center border cursor-pointer transition-all group ${
                      selections.some(s => s.matchId === 'featured-1' && s.selection === 'X')
                        ? 'bg-primary text-surface-950 border-primary'
                        : 'bg-surface-800 border-surface-700 hover:bg-primary hover:text-surface-950'
                    }`}
                  >
                    <div className={`text-[10px] font-bold mb-0.5 ${selections.some(s => s.matchId === 'featured-1' && s.selection === 'X') ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>X</div>
                    <div className={`text-lg font-mono font-bold ${selections.some(s => s.matchId === 'featured-1' && s.selection === 'X') ? 'text-surface-950' : 'text-primary group-hover:text-inherit'}`}>3.40</div>
                  </div>
                  <div 
                    onClick={() => handleFeaturedBet('2', 4.20)}
                    className={`p-3 rounded-2xl text-center border cursor-pointer transition-all group ${
                      selections.some(s => s.matchId === 'featured-1' && s.selection === '2')
                        ? 'bg-primary text-surface-950 border-primary'
                        : 'bg-surface-800 border-surface-700 hover:bg-primary hover:text-surface-950'
                    }`}
                  >
                    <div className={`text-[10px] font-bold mb-0.5 ${selections.some(s => s.matchId === 'featured-1' && s.selection === '2') ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>2</div>
                    <div className={`text-lg font-mono font-bold ${selections.some(s => s.matchId === 'featured-1' && s.selection === '2') ? 'text-surface-950' : 'text-primary group-hover:text-inherit'}`}>4.20</div>
                  </div>
                </div>
             </div>
          </div>

          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute -top-10 -right-10 bg-primary p-4 rounded-3xl shadow-2xl z-20 shadow-primary/20 cursor-pointer hover:scale-110 transition-transform"
          >
            <TrendingUp className="text-surface-950" size={32} />
          </motion.div>

          <motion.div 
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 left-4 bg-surface-900 border border-surface-700 p-5 rounded-3xl shadow-2xl z-20 flex items-center gap-4 border-l-4 border-l-success backdrop-blur-md"
          >
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Zap className="text-success" size={20} fill="currentColor" />
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">LIVE WIN</div>
              <div className="text-lg font-mono font-bold text-white">R$ 5.420,00</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
