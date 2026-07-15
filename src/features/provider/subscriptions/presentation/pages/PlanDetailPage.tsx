'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import { CheckIcon } from '@/features/provider/shared/presentation/components/icons';
import PaymentMethodIcon from '@/features/provider/subscriptions/presentation/components/PaymentMethodIcon';
import { useSubscription } from '@/features/provider/subscriptions/presentation/context/SubscriptionContext';
import { getSubscriptionPlanById } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface PlanDetailPageProps {
  planId: string;
}

export default function PlanDetailPage({ planId }: PlanDetailPageProps) {
  const { activePlan } = useSubscription();
  const plan = getSubscriptionPlanById(planId);
  if (!plan) {
    notFound();
  }

  const isActive = activePlan?.id === plan.id;

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">{plan.name}</h1>
            <p className="page-subtitle">Details of this plan</p>
          </div>
          <BackButton href="/provider/subscriptions/plans" className="shrink-0" />
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <SectionHeader title="Plan Information" className="flex-1" />
              {isActive ? (
                <Link
                  href="/provider/subscriptions/manage"
                  className="shrink-0 rounded-md bg-green-100 px-4 py-2 text-xs font-semibold text-green-700 hover:bg-green-200"
                >
                  Manage
                </Link>
              ) : (
                <Link
                  href={`/provider/subscriptions/pay/${plan.id}`}
                  className="shrink-0 rounded-md bg-green-500 px-4 py-2 text-xs font-semibold text-white hover:bg-green-600"
                >
                  <span className="sm:hidden">Subscribe</span>
                  <span className="hidden sm:inline">Subscribe to this Plan</span>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              <DetailField label="Plan Name" value={plan.name} />
              <DetailField label="Billing Cycle" value={plan.billingCycle} />
              <DetailField
                label="Status"
                value={
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                      isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isActive ? 'Current Plan' : 'Available Plan'}
                  </span>
                }
              />
              <DetailField label="Price" value={plan.priceLabel} />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader title="What's Included" />
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={`${feature}-${index}`} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckIcon className="h-3.5 w-3.5 shrink-0 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {!isActive && (
            <section className="space-y-4">
              <SectionHeader title="Choose Payment Method" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="flex items-center gap-3">
                  <PaymentMethodIcon method="mpesa" className="h-6 w-auto" />
                  <PaymentMethodIcon method="card" className="h-6 w-auto" />
                </div>
                <span className="text-sm text-gray-500">Selected on the payment step</span>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
