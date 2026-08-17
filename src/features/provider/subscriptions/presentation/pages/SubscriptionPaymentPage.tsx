'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import BackButton from '@/components/ui/BackButton';
import SectionHeader from '@/components/ui/SectionHeader';
import DetailField from '@/components/ui/DetailField';
import { CheckCircleIcon, PhoneIcon } from '@/components/icons';
import PaymentMethodIcon from '@/features/provider/subscriptions/presentation/components/PaymentMethodIcon';
import { ApiError } from '@/features/auth/data/authApi';
import { checkoutSubscription, payInvoice, type PaymentGateway } from '@/features/provider/subscriptions/data/subscriptionApi';
import {
  BILLING_CYCLE_LABELS,
  formatPlanPrice,
  getAvailableCycles,
  getDefaultCycle,
} from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import type { BillingCycle, SubscriptionPlan } from '@/features/provider/subscriptions/data/types';

interface SubscriptionPaymentPageProps {
  plan: SubscriptionPlan | null;
}

type Phase = 'input' | 'waiting' | 'completed';

function stripCountryPrefix(value: string): string {
  const digitsOnly = value.replace(/[^\d]/g, '');
  if (digitsOnly.startsWith('254')) return digitsOnly.slice(3);
  if (digitsOnly.startsWith('0')) return digitsOnly.slice(1);
  return digitsOnly;
}

export default function SubscriptionPaymentPage({ plan }: SubscriptionPaymentPageProps) {
  const router = useRouter();
  if (!plan) {
    notFound();
  }

  const cycles = getAvailableCycles(plan!);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(getDefaultCycle(plan!));
  const [gateway, setGateway] = useState<PaymentGateway>('MPESA');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phase, setPhase] = useState<Phase>('input');
  const [error, setError] = useState<string | null>(null);
  const canSubmit = phoneNumber.trim().length >= 9;

  async function handleSubmit() {
    setPhase('waiting');
    setError(null);
    try {
      const { invoice } = await checkoutSubscription({
        planId: plan!.id,
        billingCycle,
      });

      if (invoice?.id) {
        await payInvoice(invoice.id, gateway, `254${phoneNumber}`);
      }

      setPhase('completed');
      toast.success('Payment initiated successfully', {
        description: `You are now subscribed to the ${plan!.name}.`,
      });
    } catch (err) {
      setPhase('input');
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <nav className="mb-1 text-xs text-faint">
              <Link href="/subscriptions" className="hover:text-body">
                Home
              </Link>
              <span className="mx-1.5">/</span>
              <span className="text-body">Subscription</span>
            </nav>
            <h1 className="page-title truncate">Pay for a subscription</h1>
          </div>
          <BackButton href={`/subscriptions/plans/${plan.id}`} className="shrink-0" />
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <section className="space-y-4">
            <SectionHeader title="Order Summary" />
            <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              <div className="flex items-center justify-between border-b border-border-soft py-3">
                <span className="text-sm text-subtle">Subscription Plan</span>
                <span className="text-sm font-semibold text-ink">{plan.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border-soft py-3">
                <span className="text-sm text-subtle">Billing Cycle</span>
                <select
                  value={billingCycle}
                  onChange={(event) => setBillingCycle(event.target.value as BillingCycle)}
                  className="rounded-control border border-border bg-surface-muted px-2 py-1.5 text-sm font-semibold text-ink"
                >
                  {cycles.map((cycle) => (
                    <option key={cycle} value={cycle}>
                      {BILLING_CYCLE_LABELS[cycle] ?? cycle}
                    </option>
                  ))}
                </select>
              </div>
              <DetailField label="Amount to pay" value={formatPlanPrice(plan, billingCycle)} />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader title="Payment Method" />
            <div className="flex gap-3">
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

            <div className="mx-auto max-w-sm">
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
              <div className="mt-3 flex items-start gap-2 rounded-control border border-green-200 bg-primary-subtle px-3 py-2.5">
                <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs text-primary-emphasis">
                  You will receive a payment prompt on your phone. Enter your PIN to confirm payment.
                </p>
              </div>
            </div>
          </section>

          {error && <p className="text-center text-sm text-danger">{error}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!canSubmit || phase === 'waiting'}
              onClick={handleSubmit}
              className="rounded-control bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
            >
              Request Payment
            </button>
          </div>
        </div>
      </main>

      {phase !== 'input' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-card bg-white p-6 text-center shadow-xl">
            {phase === 'waiting' ? (
              <>
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-green-200 border-t-green-600" />
                <p className="mt-3 text-sm font-semibold text-ink">Waiting for payment confirmation…</p>
                <p className="mt-1 text-sm text-subtle">Enter your PIN on 254{phoneNumber} to complete the payment.</p>
              </>
            ) : (
              <>
                <CheckCircleIcon className="mx-auto h-14 w-14 text-primary" />
                <p className="mt-3 text-base font-bold text-ink">Payment Requested</p>
                <p className="mt-1 text-sm text-subtle">
                  You are now subscribed to the {plan.name}. Your receipt will appear in your billing history once payment is confirmed.
                </p>
                <button
                  type="button"
                  onClick={() => router.push('/subscriptions')}
                  className="mt-4 w-full rounded-control bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-strong"
                >
                  Back to Subscriptions
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
