'use client';

import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import { DownloadIcon } from '@/features/provider/shared/presentation/components/icons';
import { formatKes } from '@/lib/formatKes';
import { getBillingRecordById } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface BillingReceiptDetailPageProps {
  receiptId: string;
}

export default function BillingReceiptDetailPage({ receiptId }: BillingReceiptDetailPageProps) {
  const record = getBillingRecordById(receiptId);
  if (!record) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="page-title truncate">Receipt {record.receiptNumber}</h1>
          <BackButton href="/subscriptions" className="shrink-0" />
        </div>

        <div className="w-full max-w-md rounded-card border border-border-soft bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-subtle">Amount</p>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                record.paymentStatus === 'Paid' ? 'bg-primary-subtle text-primary-strong' : 'bg-danger-soft text-danger'
              }`}
            >
              {record.paymentStatus}
            </span>
          </div>
          <p className="mt-1 text-2xl font-bold text-ink">{formatKes(record.amount)}</p>

          <dl className="mt-5 space-y-3 border-t border-border-soft pt-5">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-subtle">Receipt number</dt>
              <dd className="font-medium text-ink">{record.receiptNumber}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-subtle">Subscription plan</dt>
              <dd className="font-medium text-ink">{record.subscriptionPlan}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-subtle">Billing date</dt>
              <dd className="font-medium text-ink">{record.billingDate}</dd>
            </div>
          </dl>

          <button
            type="button"
            disabled={record.paymentStatus !== 'Paid'}
            onClick={() => toast.success('Receipt downloaded', { description: `Receipt ${record.receiptNumber} has been downloaded.` })}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DownloadIcon className="h-4 w-4" />
            {record.paymentStatus === 'Paid' ? 'Download Receipt' : 'Payment Pending'}
          </button>
        </div>
      </main>
    </div>
  );
}
