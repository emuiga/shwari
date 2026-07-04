'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { MovingService } from '@/features/dashboard/presentation/lib/mockServices';

export const MAX_COMPARE_ITEMS = 3;

interface CompareContextValue {
  compareServices: MovingService[];
  isInCompare: (id: string) => boolean;
  toggleCompare: (service: MovingService) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompareFull: boolean;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareServices, setCompareServices] = useState<MovingService[]>([]);

  const value = useMemo<CompareContextValue>(
    () => ({
      compareServices,
      isInCompare: (id) => compareServices.some((service) => service.id === id),
      toggleCompare: (service) => {
        setCompareServices((current) => {
          if (current.some((item) => item.id === service.id)) {
            return current.filter((item) => item.id !== service.id);
          }
          if (current.length >= MAX_COMPARE_ITEMS) {
            return current;
          }
          return [...current, service];
        });
      },
      removeFromCompare: (id) => {
        setCompareServices((current) => current.filter((item) => item.id !== id));
      },
      clearCompare: () => setCompareServices([]),
      isCompareFull: compareServices.length >= MAX_COMPARE_ITEMS,
    }),
    [compareServices],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
