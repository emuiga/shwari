'use client';

import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import PaymentMethodIcon from '@/features/provider/subscriptions/presentation/components/PaymentMethodIcon';
import BillingHistoryTable from '@/features/provider/subscriptions/presentation/components/BillingHistoryTable';
import { getPlanBillingHistory, type SubscriptionPlan } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface ManageSubscriptionPanelProps {
  activePlan: SubscriptionPlan | null;
  onCancel: () => void;
  onUpdatePayment: () => void;
}

export default function ManageSubscriptionPanel({ activePlan, onCancel, onUpdatePayment }: ManageSubscriptionPanelProps) {
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
          <DetailField label="Plan Name" value={activePlan ? activePlan.name : 'Free plan'} />
          <DetailField label="Billing Cycle" value={activePlan ? activePlan.billingCycle : '—'} />
          <DetailField
            label="Status"
            value={
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                  activePlan ? 'bg-primary-subtle text-primary-emphasis' : 'bg-surface-muted text-body'
                }`}
              >
                {activePlan ? 'Active' : 'Free'}
              </span>
            }
          />
          <DetailField label="Renews On" value={activePlan ? activePlan.renewsOn : '—'} />
          <DetailField label="Price" value={activePlan ? activePlan.priceLabel : 'KES 0'} />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader title="Payment Method" />
        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          <DetailField
            label="Method on file"
            value={
              <span className="flex items-center gap-2">
                <PaymentMethodIcon method="mpesa" className="h-5 w-auto" />
                <PaymentMethodIcon method="card" className="h-5 w-auto" />
                {activePlan ? 'M-PESA •••• 0789' : 'None'}
              </span>
            }
          />
          <div className="flex items-center justify-between border-b border-border-soft py-3">
            <span className="text-sm text-subtle">Change payment method</span>
            <button type="button" onClick={onUpdatePayment} className="rounded-control border border-border bg-white px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface-muted">
              Update
            </button>
          </div>
        </div>
      </section>

      {activePlan && (
        <section className="space-y-4">
          <SectionHeader title="Billing History" />
          <BillingHistoryTable records={getPlanBillingHistory(activePlan)} hidePlanColumn />
        </section>
      )}

      {activePlan && (
        <section className="space-y-4">
          <SectionHeader title="Cancellation" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-subtle">Cancelling stops your subscription at the end of the current billing cycle.</p>
            <button
              type="button"
              onClick={onCancel}
              className="shrink-0 self-start rounded-control bg-danger px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 sm:self-auto"
            >
              Cancel Plan
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
