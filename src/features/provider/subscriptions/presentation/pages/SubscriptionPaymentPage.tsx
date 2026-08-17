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
import PaymentMethodIcon, { type PaymentMethod } from '@/features/provider/subscriptions/presentation/components/PaymentMethodIcon';
import { useSubscription } from '@/features/provider/subscriptions/presentation/context/SubscriptionContext';
import { getSubscriptionPlanById, subscriptionPlans } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface SubscriptionPaymentPageProps {
  planId: string;
}

type Phase = 'input' | 'waiting' | 'completed';

function stripCountryPrefix(value: string): string {
  const digitsOnly = value.replace(/[^\d]/g, '');
  if (digitsOnly.startsWith('254')) return digitsOnly.slice(3);
  if (digitsOnly.startsWith('0')) return digitsOnly.slice(1);
  return digitsOnly;
}

export default function SubscriptionPaymentPage({ planId }: SubscriptionPaymentPageProps) {
  const router = useRouter();
  const { subscribeToPlan } = useSubscription();

  const initialPlan = getSubscriptionPlanById(planId);
  if (!initialPlan) {
    notFound();
  }

  const [selectedPlanId, setSelectedPlanId] = useState(initialPlan.id);
  const [method, setMethod] = useState<PaymentMethod>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [phase, setPhase] = useState<Phase>('input');

  const selectedPlan = getSubscriptionPlanById(selectedPlanId) ?? initialPlan;
  const canSubmit = method === 'mpesa' ? phoneNumber.trim().length >= 9 : cardNumber.trim().length >= 12;

  function handleSubmit() {
    setPhase('waiting');
    setTimeout(() => {
      subscribeToPlan(selectedPlan.id);
      setPhase('completed');
      toast.success('Payment completed successfully', {
        description: `You are now subscribed to the ${selectedPlan.name}.`,
      });
    }, 1800);
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
          <BackButton href={`/subscriptions/plans/${initialPlan.id}`} className="shrink-0" />
        </div>

        <div className="mx-auto max-w-4xl space-y-8">
          <section className="space-y-4">
            <SectionHeader title="Order Summary" />
            <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
              <div className="flex items-center justify-between border-b border-border-soft py-3">
                <span className="text-sm text-subtle">Subscription Plan</span>
                <select
                  value={selectedPlanId}
                  onChange={(event) => setSelectedPlanId(event.target.value)}
                  className="rounded-control border border-border bg-surface-muted px-2 py-1.5 text-sm font-semibold text-ink"
                >
                  {subscriptionPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
              <DetailField label="Amount to pay" value={selectedPlan.priceLabel} />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeader title="Payment Method" />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMethod('mpesa')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-control border py-2.5 text-sm font-semibold ${
                  method === 'mpesa' ? 'border-primary bg-primary-subtle text-primary-emphasis' : 'border-border text-subtle hover:bg-surface-muted'
                }`}
              >
                <PaymentMethodIcon method="mpesa" className="h-5 w-auto" />
                M-PESA
              </button>
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-control border py-2.5 text-sm font-semibold ${
                  method === 'card' ? 'border-primary bg-primary-subtle text-primary-emphasis' : 'border-border text-subtle hover:bg-surface-muted'
                }`}
              >
                <PaymentMethodIcon method="card" className="h-5 w-auto" />
                Card
              </button>
            </div>

            {method === 'mpesa' ? (
              <div className="mx-auto max-w-sm">
                <label className="text-xs font-semibold text-subtle" htmlFor="phone">
                  M-PESA Phone Number
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
                    You will receive an M-PESA prompt on your phone. Enter your PIN to confirm payment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto grid max-w-sm gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-subtle" htmlFor="card-number">
                    Card number
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="card-number"
                      type="text"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      placeholder="1234 1234 1234 1234"
                      className="w-full rounded-control border border-border bg-surface-muted py-2.5 pl-3 pr-24 text-sm text-ink placeholder:text-faint"
                    />
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                      <PaymentMethodIcon method="card" className="h-5 w-auto" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-subtle" htmlFor="expiry">
                    Expiration date
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM / YY"
                    className="mt-1 w-full rounded-control border border-border bg-surface-muted px-3 py-2.5 text-sm text-ink placeholder:text-faint"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-subtle" htmlFor="cvv">
                    Security code
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="cvv"
                      type="text"
                      placeholder="CVC"
                      className="w-full rounded-control border border-border bg-surface-muted py-2.5 pl-3 pr-9 text-sm text-ink placeholder:text-faint"
                    />
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path strokeLinecap="round" d="M14 15h4M2 10h20" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!canSubmit}
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
                <p className="mt-1 text-sm text-subtle">
                  {method === 'mpesa'
                    ? `Enter your M-PESA PIN on ${phoneNumber} to complete the payment.`
                    : 'Confirming your card payment.'}
                </p>
              </>
            ) : (
              <>
                <CheckCircleIcon className="mx-auto h-14 w-14 text-primary" />
                <p className="mt-3 text-base font-bold text-ink">Payment Successful</p>
                <p className="mt-1 text-sm text-subtle">
                  You are now subscribed to the {selectedPlan.name}. Your receipt will appear in your billing history.
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
