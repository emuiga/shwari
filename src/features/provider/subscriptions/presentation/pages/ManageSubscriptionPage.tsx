'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import ManageSubscriptionPanel from '@/features/provider/subscriptions/presentation/components/ManageSubscriptionPanel';
import CancelSubscriptionModal from '@/features/provider/subscriptions/presentation/components/CancelSubscriptionModal';
import { useSubscription } from '@/features/provider/subscriptions/presentation/context/SubscriptionContext';

export default function ManageSubscriptionPage() {
  const { activePlan, cancelSubscription } = useSubscription();
  const [showCancel, setShowCancel] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">Manage Subscription</h1>
            <p className="page-subtitle">Details of your current plan</p>
          </div>
          <BackButton href="/provider/subscriptions" className="shrink-0" />
        </div>

        <ManageSubscriptionPanel
          activePlan={activePlan}
          onCancel={() => setShowCancel(true)}
          onUpdatePayment={() => toast.info('Payment method management is coming soon.')}
        />
      </main>

      {showCancel && activePlan && (
        <CancelSubscriptionModal
          planName={activePlan.name}
          onCancel={() => setShowCancel(false)}
          onConfirm={() => {
            cancelSubscription();
            setShowCancel(false);
            toast.success('Subscription cancelled', {
              description: 'You have been moved back to the Free plan.',
            });
          }}
        />
      )}
    </div>
  );
}
