'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import { DownloadIcon } from '@/features/provider/shared/presentation/components/icons';
import { PhoneIcon } from '@/components/icons';
import PaymentMethodIcon from '@/features/provider/subscriptions/presentation/components/PaymentMethodIcon';
import { ApiError } from '@/features/auth/data/authApi';
import { payInvoice, type PaymentGateway } from '@/features/provider/subscriptions/data/subscriptionApi';
import { formatDate } from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import { formatKes } from '@/lib/formatKes';
import type { Invoice } from '@/features/provider/subscriptions/data/types';

interface BillingReceiptDetailPageProps {
  invoice: Invoice | null;
}

const STATUS_STYLES: Record<string, string> = {
  PAID: 'bg-primary-subtle text-primary-strong',
  OPEN: 'bg-warning-soft text-warning',
  PENDING: 'bg-warning-soft text-warning',
  OVERDUE: 'bg-danger-soft text-danger',
  FAILED: 'bg-danger-soft text-danger',
};

function stripCountryPrefix(value: string): string {
  const digitsOnly = value.replace(/[^\d]/g, '');
  if (digitsOnly.startsWith('254')) return digitsOnly.slice(3);
  if (digitsOnly.startsWith('0')) return digitsOnly.slice(1);
  return digitsOnly;
}

export default function BillingReceiptDetailPage({ invoice }: BillingReceiptDetailPageProps) {
  const router = useRouter();
  if (!invoice) {
    notFound();
  }

  const isPaid = invoice.status === 'PAID';
  const isPayable = !isPaid;

  const [gateway, setGateway] = useState<PaymentGateway>('MPESA');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canPay = phoneNumber.trim().length >= 9;

  async function handlePay() {
    setPaying(true);
    setError(null);
    try {
      await payInvoice(invoice!.id, gateway, `254${phoneNumber}`);
      toast.success('Payment requested', {
        description: 'Enter your PIN on your phone to complete the payment.',
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="page-title truncate">Invoice {invoice.invoiceNumber ?? invoice.id}</h1>
            <p className="page-subtitle">Invoice details and payment status</p>
          </div>
          <BackButton href="/subscriptions" className="shrink-0" />
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          <section className="rounded-card border border-border-soft bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-faint">Amount due</p>
                <p className="mt-1 text-3xl font-bold text-ink">{invoice.amount != null ? formatKes(invoice.amount) : '—'}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[invoice.status ?? ''] ?? 'bg-surface-muted text-body'}`}>
                {invoice.status ?? 'Unknown'}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-12 border-t border-border-soft pt-5 sm:grid-cols-2">
              <DetailField label="Invoice number" value={invoice.invoiceNumber ?? invoice.id} />
              {invoice.planName && <DetailField label="Subscription plan" value={invoice.planName} />}
              <DetailField label="Billing date" value={formatDate(invoice.createdAt)} />
              {invoice.dueDate && <DetailField label="Due date" value={formatDate(invoice.dueDate)} />}
            </div>

            <a
              href={`/api/providers/me/invoices/${invoice.id}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-control border border-border-strong px-4 py-2.5 text-sm font-semibold text-body hover:bg-surface-muted"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Invoice
            </a>
          </section>

          {isPayable && (
            <section className="rounded-card border border-border-soft bg-white p-6 shadow-sm">
              <SectionHeader title="Pay this invoice" />

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setGateway('MPESA')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-control border py-2.5 text-sm font-semibold ${
                    gateway === 'MPESA' ? 'border-primary bg-primary-subtle text-primary-emphasis' : 'border-border text-subtle hover:bg-surface-muted'
                  }`}
                >
                  <PaymentMethodIcon method="MPESA" className="h-5 w-auto" />
                  M-PESA
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('KCB')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-control border py-2.5 text-sm font-semibold ${
                    gateway === 'KCB' ? 'border-primary bg-primary-subtle text-primary-emphasis' : 'border-border text-subtle hover:bg-surface-muted'
                  }`}
                >
                  <PaymentMethodIcon method="KCB" className="h-5 w-auto" />
                  KCB
                </button>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold text-subtle" htmlFor="phone">
                  Phone Number
                </label>
                <div className="mt-1 flex overflow-hidden rounded-control border border-border bg-surface-muted focus-within:border-green-400">
                  <span className="flex items-center gap-1.5 border-r border-border bg-surface-muted px-3 text-sm font-medium text-body">
                    <PhoneIcon className="h-4 w-4 text-faint" />
                    +254
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(stripCountryPrefix(event.target.value))}
                    placeholder="7XX XXX XXX"
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-faint"
                  />
                </div>
              </div>

              {error && <p className="mt-3 text-xs text-danger">{error}</p>}

              <button
                type="button"
                disabled={!canPay || paying}
                onClick={handlePay}
                className="mt-4 flex w-full items-center justify-center rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
              >
                {paying ? 'Requesting…' : `Pay ${invoice.amount != null ? formatKes(invoice.amount) : ''}`}
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
