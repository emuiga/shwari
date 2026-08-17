import Link from 'next/link';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import SubscriptionPlanCard from '@/features/provider/subscriptions/presentation/components/SubscriptionPlanCard';
import type { ProviderSubscription } from '@/features/provider/subscriptions/data/types';

interface ProviderSubscriptionsPageProps {
  subscription: ProviderSubscription | null;
}

export default function ProviderSubscriptionsPage({ subscription }: ProviderSubscriptionsPageProps) {
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
          <SubscriptionPlanCard subscription={subscription} manageHref="/subscriptions/manage" />
        </div>
      </main>
    </div>
  );
}
