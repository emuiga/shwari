'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface SavedServicesContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  removeSaved: (id: string) => void;
  clearSaved: () => void;
}

const SavedServicesContext = createContext<SavedServicesContextValue | null>(null);

export function SavedServicesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  function toggleSaved(id: string) {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
    );
  }

  function isSaved(id: string) {
    return savedIds.includes(id);
  }

  function removeSaved(id: string) {
    setSavedIds((current) => current.filter((savedId) => savedId !== id));
  }

  function clearSaved() {
    setSavedIds([]);
  }

  return (
    <SavedServicesContext.Provider value={{ savedIds, isSaved, toggleSaved, removeSaved, clearSaved }}>
      {children}
    </SavedServicesContext.Provider>
  );
}

export function useSavedServices() {
  const context = useContext(SavedServicesContext);
  if (!context) {
    throw new Error('useSavedServices must be used within a SavedServicesProvider');
  }
  return context;
}
