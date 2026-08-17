'use client';

import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import SubscriptionPlansGrid from '@/features/provider/subscriptions/presentation/components/SubscriptionPlansGrid';
import { useSubscription } from '@/features/provider/subscriptions/presentation/context/SubscriptionContext';
import { subscriptionPlans } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

export default function BrowsePlansPage() {
  const { activePlan } = useSubscription();

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">Choose a Plan</h1>
            <p className="page-subtitle">Pick the plan that works best for your business</p>
          </div>
          <BackButton href="/subscriptions" className="shrink-0" />
        </div>

        <SubscriptionPlansGrid plans={subscriptionPlans} activePlanId={activePlan?.id ?? null} />
      </main>
    </div>
  );
}
