'use client';

import Link from 'next/link';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import SubscriptionPlanCard from '@/features/provider/subscriptions/presentation/components/SubscriptionPlanCard';
import { useSubscription } from '@/features/provider/subscriptions/presentation/context/SubscriptionContext';
import { currentPlan } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

export default function ProviderSubscriptionsPage() {
  const { activePlan } = useSubscription();
  const displayedPlan = activePlan
    ? { name: activePlan.name, priceLabel: `${activePlan.priceLabel} · ${activePlan.billingCycle}`, features: activePlan.features }
    : currentPlan;

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">Subscriptions</h1>
            <p className="page-subtitle">Manage your subscriptions</p>
          </div>
          <Link
            href="/subscriptions/plans"
            className="shrink-0 rounded-control bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-strong"
          >
            View Plans
          </Link>
        </div>

        <div className="mt-5">
          <SubscriptionPlanCard plan={displayedPlan} manageHref="/subscriptions/manage" />
        </div>
      </main>
    </div>
  );
}
