import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import { CheckIcon } from '@/features/provider/shared/presentation/components/icons';
import PaymentMethodIcon from '@/features/provider/subscriptions/presentation/components/PaymentMethodIcon';
import {
  BILLING_CYCLE_LABELS,
  formatPlanPrice,
  getAvailableCycles,
  getPlanFeatures,
} from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import type { ProviderSubscription, SubscriptionPlan } from '@/features/provider/subscriptions/data/types';

interface PlanDetailPageProps {
  plan: SubscriptionPlan | null;
  subscription: ProviderSubscription | null;
}

export default function PlanDetailPage({ plan, subscription }: PlanDetailPageProps) {
  if (!plan) {
    notFound();
  }

  const isActive = subscription?.planId === plan.id;
  const cycles = getAvailableCycles(plan);
  const features = getPlanFeatures(plan);

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">{plan.name}</h1>
            <p className="page-subtitle">{plan.description ?? 'Details of this plan'}</p>
          </div>
          <BackButton href="/subscriptions/plans" className="shrink-0" />
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <SectionHeader title="Plan Information" className="flex-1" />
              {isActive ? (
                <Link
                  href="/subscriptions/manage"
                  className="shrink-0 rounded-control bg-primary-subtle px-4 py-2 text-xs font-semibold text-primary-emphasis hover:bg-green-200"
                >
                  Manage
                </Link>
              ) : (
                <Link
                  href={`/subscriptions/pay/${plan.id}`}
                  className="shrink-0 rounded-control bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-strong"
                >
                  <span className="sm:hidden">Subscribe</span>
                  <span className="hidden sm:inline">Subscribe to this Plan</span>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              <DetailField label="Plan Name" value={plan.name} />
              <DetailField label="Service Listings" value={plan.maxAds === -1 ? 'Unlimited' : `Up to ${plan.maxAds ?? 0}`} />
              <DetailField
                label="Status"
                value={
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                      isActive ? 'bg-primary-subtle text-primary-emphasis' : 'bg-surface-muted text-body'
                    }`}
                  >
                    {isActive ? 'Current Plan' : 'Available Plan'}
                  </span>
                }
              />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader title="Pricing" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cycles.map((cycle) => (
                <div key={cycle} className="rounded-control border border-border-soft p-3 text-center">
                  <p className="text-xs text-subtle">{BILLING_CYCLE_LABELS[cycle] ?? cycle}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{formatPlanPrice(plan, cycle)}</p>
                </div>
              ))}
            </div>
          </section>

          {features.length > 0 && (
            <section className="space-y-4">
              <SectionHeader title="What's Included" />
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={`${feature}-${index}`} className="flex items-center gap-2 text-sm text-body">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-primary-strong" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {!isActive && (
            <section className="space-y-4">
              <SectionHeader title="Choose Payment Method" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <div className="flex items-center gap-3">
                  <PaymentMethodIcon method="MPESA" className="h-6 w-auto" />
                  <PaymentMethodIcon method="KCB" className="h-6 w-auto" />
                </div>
                <span className="text-sm text-subtle">Selected on the payment step</span>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
