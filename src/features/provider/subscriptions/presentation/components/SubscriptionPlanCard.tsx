import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon } from '@/features/provider/shared/presentation/components/icons';
import type { CurrentPlan } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface SubscriptionPlanCardProps {
  plan: CurrentPlan;
  manageHref: string;
}

export default function SubscriptionPlanCard({ plan, manageHref }: SubscriptionPlanCardProps) {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
      <Image src="/images/Logistics-bro.svg" alt="" width={200} height={140} className="mx-auto h-32 w-auto" />

      <span className="inline-block rounded-full border border-green-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-green-600">
        Current
      </span>

      <p className="mt-3 text-lg font-bold text-gray-900">{plan.name}</p>
      <p className="text-xs text-gray-500">{plan.priceLabel}</p>

      <ul className="mt-3 space-y-1.5">
        {plan.features.map((feature, index) => (
          <li key={`${feature}-${index}`} className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <CheckIcon className="h-3.5 w-3.5 shrink-0 text-green-600" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={manageHref}
        className="mt-4 flex w-full items-center justify-center rounded-md bg-green-100 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-200"
      >
        Manage Subscription
      </Link>
    </div>
  );
}
