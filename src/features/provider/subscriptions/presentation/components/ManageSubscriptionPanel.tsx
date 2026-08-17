import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import BillingHistoryTable from '@/features/provider/subscriptions/presentation/components/BillingHistoryTable';
import { BILLING_CYCLE_LABELS, formatDate } from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import { formatKes } from '@/lib/formatKes';
import type { Invoice, ProviderSubscription } from '@/features/provider/subscriptions/data/types';

interface ManageSubscriptionPanelProps {
  subscription: ProviderSubscription | null;
  invoices: Invoice[];
}

export default function ManageSubscriptionPanel({ subscription, invoices }: ManageSubscriptionPanelProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <SectionHeader title="Plan Information" className="flex-1" />
          <Link
            href="/subscriptions/plans"
            className="shrink-0 rounded-control border border-border bg-white px-4 py-2 text-xs font-semibold text-body hover:bg-surface-muted"
          >
            Adjust plan
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          <DetailField label="Plan Name" value={subscription?.planName ?? 'Free plan'} />
          <DetailField
            label="Billing Cycle"
            value={subscription?.billingCycle ? (BILLING_CYCLE_LABELS[subscription.billingCycle] ?? subscription.billingCycle) : '—'}
          />
          <DetailField
            label="Status"
            value={
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                  subscription ? 'bg-primary-subtle text-primary-emphasis' : 'bg-surface-muted text-body'
                }`}
              >
                {subscription?.status ?? 'Free'}
              </span>
            }
          />
          <DetailField label="Renews On" value={formatDate(subscription?.currentPeriodEnd)} />
          <DetailField label="Price" value={subscription?.price != null ? formatKes(subscription.price) : 'KES 0'} />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Billing History" />
        <BillingHistoryTable records={invoices} hidePlanColumn />
      </section>
    </div>
  );
}
