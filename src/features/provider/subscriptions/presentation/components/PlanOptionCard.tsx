import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@/features/provider/shared/presentation/components/icons';
import type { SubscriptionPlan } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface PlanOptionCardProps {
  plan: SubscriptionPlan;
  isActive: boolean;
}

export default function PlanOptionCard({ plan, isActive }: PlanOptionCardProps) {
  return (
    <div className={`rounded-card border p-5 ${isActive ? 'border-green-200 bg-primary-subtle' : 'border-border bg-white'}`}>
      <Image src="/images/Logistics-rafiki.svg" alt="" width={160} height={120} className="mx-auto h-28 w-auto" />

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-bold text-ink">{plan.name}</p>
        <p className="text-sm font-semibold text-body">{plan.priceLabel}</p>
      </div>

      <ul className="mt-3 space-y-1.5">
        {plan.features.map((feature, index) => (
          <li key={`${feature}-${index}`} className="flex items-center gap-2 text-xs font-medium text-body">
            <CheckIcon className="h-3.5 w-3.5 shrink-0 text-primary-strong" />
            {feature}
          </li>
        ))}
      </ul>

      {isActive ? (
        <span className="mt-4 flex w-full items-center justify-center rounded-control border border-green-200 bg-primary-subtle py-2 text-sm font-semibold text-primary-emphasis">
          Active Subscription
        </span>
      ) : (
        <Link
          href={`/subscriptions/plans/${plan.id}`}
          className="mt-4 flex w-full items-center justify-center rounded-control border border-primary py-2 text-sm font-semibold text-primary-strong hover:bg-primary-subtle"
        >
          View Plan
        </Link>
      )}
    </div>
  );
}
