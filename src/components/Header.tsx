/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { User, Wallet, Bell, Search, Menu, LogOut } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';

export default function Header() {
  const { user, profile, login, logout } = useFirebase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-900/80 backdrop-blur-md border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-surface-950">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M20 18.25C20 19.22 19.22 20 18.25 20H5.75C4.78 20 4 19.22 4 18.25V5.75C4 4.78 4.78 4 5.75 4H18.25C19.22 4 20 4.78 20 5.75V18.25ZM11.14 7L8.41 11.83L6 10L10.05 17H13.95L18 10L15.59 11.83L12.86 7H11.14Z" /></svg>
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-white">
              CAMELO<span className="text-primary">BET</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-sans text-xs font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-5 pt-5 mt-[-2px] cursor-pointer"
            >
              ESPORTES
            </button>
            <button 
              onClick={() => document.getElementById('jogos-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-5 cursor-pointer"
            >
              AO VIVO
            </button>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('openInfo', { detail: 'CASSINO ONLINE' }))}
              className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-5 cursor-pointer"
            >
              CASSINO
            </button>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('openInfo', { detail: 'PROMOÇÕES EXCLUSIVAS' }))}
              className="font-sans text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors py-5 cursor-pointer"
            >
              PROMOÇÕES
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">SALDO</span>
                <span className="font-mono text-sm font-bold text-white leading-none">R$ {profile?.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>

              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('openInfo', { detail: 'ADICIONAR SALDO' }))}
                className="bg-success hover:bg-emerald-400 text-surface-950 font-black px-6 py-2 rounded text-[10px] transition-colors uppercase tracking-widest active:scale-95"
              >
                DEPOSITAR
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-700 border border-surface-600 flex items-center justify-center overflow-hidden">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-black">{profile?.displayName?.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  title="Sair"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <button 
              onClick={login}
              className="px-6 py-2 bg-primary text-surface-950 font-black rounded uppercase tracking-widest text-[10px] hover:bg-primary-hover transition-all"
            >
              ENTRAR
            </button>
          )}

          <button className="md:hidden p-2 text-slate-400">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
