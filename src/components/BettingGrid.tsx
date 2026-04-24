/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight, Calendar, Users, Trophy } from 'lucide-react';
import { useBetting, Selection } from '../contexts/BettingContext';

const GAMES = [
  { id: 'm1', sport: 'Football', league: 'Premier League', teamA: 'Man City', teamB: 'Liverpool', odds: [1.85, 3.40, 4.20], time: '16:30' },
  { id: 'm2', sport: 'Football', league: 'Bundesliga', teamA: 'Bayern', teamB: 'Dortmund', odds: [1.45, 4.80, 6.50], time: '14:30' },
  { id: 'm3', sport: 'Basketball', league: 'NBA', teamA: 'Lakers', teamB: 'Warriors', odds: [1.90, 1.90], time: '22:00', type: 'basket' },
  { id: 'm4', sport: 'Football', league: 'Serie A', teamA: 'Inter', teamB: 'Milan', odds: [2.10, 3.20, 3.50], time: '19:45' },
  { id: 'm5', sport: 'Tennis', league: 'Atp Madrid', teamA: 'Alcaraz', teamB: 'Sinner', odds: [1.65, 2.20], time: '15:00', type: 'tennis' },
  { id: 'm6', sport: 'Football', league: 'Ligue 1', teamA: 'PSG', teamB: 'Monaco', odds: [1.35, 5.20, 8.00], time: '20:00' },
];

export default function BettingGrid() {
  const { selections, addSelection, removeSelection } = useBetting();

  const handleBetClick = (game: typeof GAMES[0], oddIndex: number) => {
    const isSelection = game.odds.length === 3;
    const selecKey = isSelection ? (oddIndex === 0 ? '1' : oddIndex === 1 ? 'X' : '2') : (oddIndex === 0 ? '1' : '2');
    const selecName = selecKey === '1' ? game.teamA : selecKey === '2' ? game.teamB : 'Empate';
    
    const existing = selections.find(s => s.matchId === game.id && s.selection === selecKey);
    
    if (existing) {
      removeSelection(game.id);
    } else {
      const newSelection: Selection = {
        matchId: game.id,
        matchName: `${game.teamA} vs ${game.teamB}`,
        selection: selecKey,
        selectionName: selecName,
        odds: game.odds[oddIndex]
      };
      addSelection(newSelection);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="font-sans font-bold text-lg flex items-center gap-2 mb-2 leading-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            AO VIVO AGORA
          </h3>
          <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> HOJE, 24 ABR</span>
            <span className="flex items-center gap-1.5"><Users size={14} /> 124 MERCADOS</span>
          </div>
        </div>
        <button 
          onClick={() => document.dispatchEvent(new CustomEvent('openInfo', { detail: 'TODOS OS JOGOS AO VIVO' }))}
          className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest hover:underline"
        >
          VER TUDO <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid gap-3">
        {GAMES.map((game, idx) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group relative bg-surface-900 border border-surface-800 hover:bg-surface-800/50 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="text-center md:text-left min-w-[80px]">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{game.sport}</div>
                <div className="text-lg font-mono font-bold text-slate-400">{game.time}</div>
              </div>
              
              <div className="flex-1 md:flex-none">
                <div className="text-[10px] text-primary mb-1 font-black uppercase tracking-widest">{game.league}</div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center md:items-start gap-1">
                     <div className="flex items-center gap-3">
                        <Trophy size={14} className="text-slate-500" />
                        <span className="font-bold text-white text-sm">{game.teamA}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Trophy size={14} className="text-slate-500" />
                        <span className="font-bold text-white text-sm">{game.teamB}</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
               {game.odds.map((odd, i) => {
                 const selecKey = game.odds.length === 3 ? (i === 0 ? '1' : i === 1 ? 'X' : '2') : (i === 0 ? '1' : '2');
                 const isActive = selections.some(s => s.matchId === game.id && s.selection === selecKey);
                 
                 return (
                   <button 
                    key={i}
                    onClick={() => handleBetClick(game, i)}
                    className={`flex-1 md:flex-none min-w-[90px] h-12 rounded font-mono font-bold transition-all border group/odd ${
                      isActive 
                        ? 'bg-primary text-surface-950 border-primary' 
                        : 'bg-surface-800 hover:bg-primary hover:text-surface-950 border-surface-700'
                    }`}
                   >
                     <span className={`text-[10px] font-bold mb-0.5 block leading-none ${isActive ? 'text-surface-950/60' : 'text-slate-500 group-hover/odd:text-surface-950/60'}`}>
                       {game.odds.length === 3 ? (i === 0 ? '1' : i === 1 ? 'X' : '2') : (i === 0 ? 'H' : 'A')}
                     </span>
                     <span className={`font-mono font-bold ${isActive ? 'text-surface-950' : 'text-primary group-hover/odd:text-surface-950'}`}>
                       {odd.toFixed(2)}
                     </span>
                   </button>
                 );
               })}
               <button 
                onClick={() => document.dispatchEvent(new CustomEvent('openInfo', { detail: 'DETALHES DO EVENTO' }))}
                className="w-12 h-12 bg-surface-800 rounded flex items-center justify-center hover:bg-surface-700 transition-all border border-surface-700 text-slate-500"
               >
                  <ChevronRight size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
