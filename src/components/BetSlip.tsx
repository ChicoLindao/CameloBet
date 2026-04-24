/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Zap, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useBetting } from '../contexts/BettingContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { db, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';

export default function BetSlip() {
  const { selections, removeSelection, clearSelections } = useBetting();
  const { user, profile, login } = useFirebase();
  const [amountStr, setAmountStr] = useState('50,00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (selections.length === 0 && !successMsg) return null;

  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
  const amount = parseFloat(amountStr.replace(',', '.'));
  const potentialWin = amount * totalOdds;

  const handlePlaceBet = async () => {
    if (!user) {
      login();
      return;
    }

    if (!profile || profile.balance < amount) {
      alert('Saldo insuficiente!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Place bets sequentially or as an accumulator
      // For this demo, we'll treat it as a single accumulator if multiple or just one
      const betData = {
        userId: user.uid,
        matchId: selections.map(s => s.matchId).join(','),
        selection: selections.map(s => s.selection).join(','),
        odds: totalOdds,
        amount: amount,
        potentialReturn: potentialWin,
        status: 'pending',
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'bets'), betData);

      // Deduct balance
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        balance: increment(-amount)
      });

      setSuccessMsg('Aposta realizada com sucesso!');
      clearSelections();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (error) {
      handleFirestoreError(error, 'create', 'bets');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 md:p-8 z-40 w-full max-w-[320px] pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto bg-surface-900 rounded-xl border border-surface-800 shadow-2xl overflow-hidden shadow-primary/10"
      >
        <div className="p-4 border-b border-surface-800 bg-surface-950 flex justify-between items-center">
          <h3 className="font-bold text-[10px] tracking-widest uppercase text-slate-200">
            {successMsg ? 'SUCESSO' : 'MEU BILHETE'}
          </h3>
          {!successMsg && (
             <span className="bg-primary text-surface-950 font-black text-xs px-2 py-0.5 rounded-full">{selections.length}</span>
          )}
        </div>

        <div className="p-4 max-h-[300px] overflow-y-auto space-y-3">
          {successMsg ? (
            <div className="py-8 text-center">
               <Zap className="text-primary mx-auto mb-4 animate-bounce" size={48} fill="currentColor" />
               <p className="text-white font-bold">{successMsg}</p>
            </div>
          ) : (
            <AnimatePresence>
              {selections.map(selection => (
                <motion.div 
                  key={`${selection.matchId}-${selection.selection}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface-800 rounded-lg p-3 border-l-4 border-primary relative"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-white leading-tight">
                      {selection.selectionName} (Vencerá)
                    </span>
                    <button 
                      onClick={() => removeSelection(selection.matchId)}
                      className="text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">
                    {selection.matchName}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-primary font-bold">@ {selection.odds.toFixed(2)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!successMsg && (
          <div className="p-4 bg-surface-950 border-t border-surface-800 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">APOSTA TOTAL</span>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">R$</span>
                <input 
                  type="text" 
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="bg-surface-800 border border-surface-700 rounded px-2 py-1.5 pl-7 text-right text-xs w-24 font-mono font-bold text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="0,00"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">RETORNO ESTIMADO</span>
              <span className="text-sm font-mono font-bold text-primary">R$ {potentialWin.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>

            <button 
              onClick={handlePlaceBet}
              disabled={isSubmitting || amount <= 0}
              className="w-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover text-surface-950 font-black py-4 rounded-lg transition-all uppercase tracking-widest text-[10px] active:scale-95"
            >
              {isSubmitting ? 'PROCESSANDO...' : user ? 'Confirmar Aposta' : 'ENTRAR PARA APOSTAR'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
