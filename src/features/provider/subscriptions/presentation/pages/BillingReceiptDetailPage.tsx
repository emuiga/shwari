'use client';

import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import { DownloadIcon } from '@/features/provider/shared/presentation/components/icons';
import { formatKes } from '@/features/provider/service-listing/presentation/lib/mockServiceListings';
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
          <BackButton href="/provider/subscriptions" className="shrink-0" />
        </div>

        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">Amount</p>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                record.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}
            >
              {record.paymentStatus}
            </span>
          </div>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatKes(record.amount)}</p>

          <dl className="mt-5 space-y-3 border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">Receipt number</dt>
              <dd className="font-medium text-gray-900">{record.receiptNumber}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">Subscription plan</dt>
              <dd className="font-medium text-gray-900">{record.subscriptionPlan}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">Billing date</dt>
              <dd className="font-medium text-gray-900">{record.billingDate}</dd>
            </div>
          </dl>

          <button
            type="button"
            disabled={record.paymentStatus !== 'Paid'}
            onClick={() => toast.success('Receipt downloaded', { description: `Receipt ${record.receiptNumber} has been downloaded.` })}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DownloadIcon className="h-4 w-4" />
            {record.paymentStatus === 'Paid' ? 'Download Receipt' : 'Payment Pending'}
          </button>
        </div>
      </main>
    </div>
  );
}
