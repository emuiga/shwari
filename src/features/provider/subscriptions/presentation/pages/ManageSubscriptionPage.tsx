import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import ManageSubscriptionPanel from '@/features/provider/subscriptions/presentation/components/ManageSubscriptionPanel';
import type { Invoice, ProviderSubscription } from '@/features/provider/subscriptions/data/types';

interface ManageSubscriptionPageProps {
  subscription: ProviderSubscription | null;
  invoices: Invoice[];
}

export default function ManageSubscriptionPage({ subscription, invoices }: ManageSubscriptionPageProps) {
  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">Manage Subscription</h1>
            <p className="page-subtitle">Details of your current plan</p>
          </div>
          <BackButton href="/subscriptions" className="shrink-0" />
        </div>

        <ManageSubscriptionPanel subscription={subscription} invoices={invoices} />
      </main>
    </div>
  );
}
