/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';

export interface Selection {
  matchId: string;
  matchName: string;
  selection: string; // "1", "X", "2"
  selectionName: string; // e.g. "Real Madrid"
  odds: number;
}

interface BettingContextType {
  selections: Selection[];
  addSelection: (selection: Selection) => void;
  removeSelection: (matchId: string) => void;
  clearSelections: () => void;
}

const BettingContext = createContext<BettingContextType | undefined>(undefined);

export const BettingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selections, setSelections] = useState<Selection[]>([]);

  const addSelection = (selection: Selection) => {
    // Only one selection per match for simplicity
    setSelections(prev => {
      const filtered = prev.filter(s => s.matchId !== selection.matchId);
      return [...filtered, selection];
    });
  };

  const removeSelection = (matchId: string) => {
    setSelections(prev => prev.filter(s => s.matchId !== matchId));
  };

  const clearSelections = () => setSelections([]);

  return (
    <BettingContext.Provider value={{ selections, addSelection, removeSelection, clearSelections }}>
      {children}
    </BettingContext.Provider>
  );
};

export const useBetting = () => {
  const context = useContext(BettingContext);
  if (context === undefined) {
    throw new Error('useBetting must be used within a BettingProvider');
  }
  return context;
};
