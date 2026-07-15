'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { getSubscriptionPlanById, type SubscriptionPlan } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface SubscriptionContextValue {
  activePlan: SubscriptionPlan | null;
  subscribeToPlan: (planId: string) => void;
  cancelSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [activePlanId, setActivePlanId] = useState<string | null>(null);

  function subscribeToPlan(planId: string) {
    setActivePlanId(planId);
  }

  function cancelSubscription() {
    setActivePlanId(null);
  }

  const activePlan = activePlanId ? (getSubscriptionPlanById(activePlanId) ?? null) : null;

  return (
    <SubscriptionContext.Provider value={{ activePlan, subscribeToPlan, cancelSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
