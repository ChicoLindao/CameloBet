/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Instagram, Youtube, Facebook, ShieldCheck, HeartPulse, CreditCard, Trophy, X } from 'lucide-react';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { BettingProvider } from './contexts/BettingContext';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BettingGrid from './components/BettingGrid';
import BetSlip from './components/BetSlip';
import { motion } from 'motion/react';

export default function App() {
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenInfo = (e: any) => setModalTitle(e.detail);
    document.addEventListener('openInfo', handleOpenInfo);
    return () => document.removeEventListener('openInfo', handleOpenInfo);
  }, []);

  const openInfo = (title: string) => setModalTitle(title);
  const scrollToGames = () => {
    document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FirebaseProvider>
      <BettingProvider>
        <div className="min-h-screen bg-surface-950 selection:bg-primary selection:text-surface-950 font-sans">
          <Header />
          
          <main>
            <Hero />
            
            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
               {[
                 { icon: ShieldCheck, label: '100% SEGURO', sub: 'Certificado SSL' },
                 { icon: CreditCard, label: 'PIX NA HORA', sub: 'Saques instantâneos' },
                 { icon: HeartPulse, label: 'JOGO RESPONSÁVEL', sub: 'Saúde em primeiro lugar' },
                 { icon: ShieldCheck, label: 'LICENCIADO', sub: 'Regulação Curacao' },
               ].map((stat, i) => (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   key={i} 
                   className="bg-surface-900 p-6 rounded-xl border border-surface-800 flex flex-col items-center text-center gap-3 cursor-pointer hover:bg-surface-800 transition-colors"
                   onClick={() => openInfo(stat.label)}
                 >
                   <stat.icon className="text-primary" size={24} />
                   <div className="space-y-1">
                     <div className="text-[10px] font-black tracking-widest uppercase text-white">{stat.label}</div>
                     <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.sub}</div>
                   </div>
                 </motion.div>
               ))}
            </div>

            <div id="jogos-section">
              <BettingGrid />
            </div>
            
            {/* Promotions section */}
            <section id="promo-section" className="max-w-7xl mx-auto px-4 py-16">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group relative h-64 rounded-xl overflow-hidden bg-surface-900 border border-surface-800 p-10 flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700" />
                  <span className="bg-surface-950 text-primary text-[10px] font-black px-2 py-1 rounded w-fit uppercase mb-4 tracking-widest">Parceria de Sucesso</span>
                  <h2 className="font-display font-black text-4xl mb-4 tracking-tighter uppercase italic text-white line-tight">INDIQUE<br /><span className="text-primary">E GANHE</span></h2>
                  <button 
                    onClick={() => openInfo('INDIQUE E GANHE')}
                    className="w-fit bg-white text-surface-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-amber-50 transition-colors shadow-lg shadow-primary/20"
                  >
                    SAIBA MAIS
                  </button>
                </div>
                <div className="group relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-surface-900 border border-surface-800 p-10 flex flex-col justify-center">
                  <div className="absolute right-0 bottom-0 opacity-10">
                     <Trophy size={160} className="text-white" />
                  </div>
                  <span className="bg-surface-950 text-primary text-[10px] font-black px-2 py-1 rounded w-fit uppercase mb-4 tracking-widest">Bônus de Boas-vindas</span>
                  <h2 className="font-display font-black text-4xl mb-4 tracking-tighter uppercase italic text-white leading-tight">PRIMEIRO<br /><span className="text-primary">DEPÓSITO</span></h2>
                  <button 
                    onClick={() => openInfo('BÔNUS DE 100%')}
                    className="w-fit bg-primary text-surface-950 px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                  >
                    GARANTIR AGORA
                  </button>
                </div>
              </div>
            </section>
          </main>

          <footer className="h-12 bg-surface-900 border-t border-surface-800 flex items-center justify-between px-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <div>© 2026 CAMELO BET • LICENÇA CURAÇAO NO. 8048/JAZ</div>
            <div className="flex gap-6">
              <button onClick={() => openInfo('Jogo Responsável')} className="hover:text-primary transition-colors uppercase">Jogo Responsável</button>
              <button onClick={() => openInfo('Suporte 24/7')} className="hover:text-primary transition-colors uppercase">Suporte 24/7</button>
              <button onClick={() => openInfo('Termos e Condições')} className="hover:text-primary transition-colors uppercase">Termos e Condições</button>
            </div>
          </footer>

          {/* Simple Info Modal */}
          {modalTitle && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-surface-950/90 backdrop-blur-sm" onClick={() => setModalTitle(null)} />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full max-w-lg bg-surface-900 border border-surface-800 rounded-3xl p-8 shadow-2xl"
              >
                <button 
                  onClick={() => setModalTitle(null)}
                  className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                  <X />
                </button>
                <h2 className="text-2xl font-display font-black italic uppercase tracking-tighter text-primary mb-4">{modalTitle}</h2>
                <div className="text-slate-400 space-y-4 font-medium leading-relaxed">
                  <p>Esta seção de <span className="text-white">"{modalTitle}"</span> está sendo preparada por nossa equipe de camelos inteligentes.</p>
                  <p>Em breve você terá acesso completo a todas as regras, funcionalidades e suporte personalizado da Camelo Bet.</p>
                  <p className="text-sm border-t border-surface-800 pt-4 opacity-50 italic">© 2026 Camelo Bet Group.</p>
                </div>
                <button 
                  onClick={() => setModalTitle(null)}
                  className="w-full mt-8 bg-surface-800 hover:bg-surface-700 text-white font-bold py-4 rounded-xl transition-all"
                >
                  ENTENDIDO
                </button>
              </motion.div>
            </div>
          )}

          <BetSlip />
        </div>
      </BettingProvider>
    </FirebaseProvider>
  );
}

