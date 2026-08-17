import Image from 'next/image';
import Link from 'next/link';
import { formatKes } from '@/lib/formatKes';
import { formatDate } from '@/features/provider/subscriptions/presentation/lib/planDisplay';
import type { ProviderSubscription } from '@/features/provider/subscriptions/data/types';

interface SubscriptionPlanCardProps {
  subscription: ProviderSubscription | null;
  manageHref: string;
}

export default function SubscriptionPlanCard({ subscription, manageHref }: SubscriptionPlanCardProps) {
  const planName = subscription?.planName ?? 'Free plan';
  const priceLabel =
    subscription?.price != null
      ? `${formatKes(subscription.price)} / ${(subscription.billingCycle ?? '').toLowerCase()}`
      : 'KES 0 / month';

  return (
    <div className="w-full max-w-xs rounded-card border border-primary-subtle bg-white p-5 shadow-sm">
      <Image src="/images/Logistics-bro.svg" alt="" width={200} height={140} className="mx-auto h-32 w-auto" />

      <span className="inline-block rounded-full border border-green-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-primary-strong">
        {subscription ? (subscription.status ?? 'Current') : 'Free'}
      </span>

      <p className="mt-3 text-lg font-bold text-ink">{planName}</p>
      <p className="text-xs text-subtle">{priceLabel}</p>
      {subscription?.currentPeriodEnd && (
        <p className="mt-1 text-xs text-faint">Renews {formatDate(subscription.currentPeriodEnd)}</p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href="/subscriptions/plans"
          className="flex w-full items-center justify-center rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-strong"
        >
          Upgrade Plan
        </Link>
        <Link
          href={manageHref}
          className="flex w-full items-center justify-center rounded-control bg-primary-subtle px-4 py-2.5 text-sm font-semibold text-primary-emphasis hover:bg-green-200"
        >
          Manage Subscription
        </Link>
      </div>
    </div>
  );
}
