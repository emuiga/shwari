import PlanOptionCard from '@/features/provider/subscriptions/presentation/components/PlanOptionCard';
import type { SubscriptionPlan } from '@/features/provider/subscriptions/presentation/lib/mockSubscriptions';

interface SubscriptionPlansGridProps {
  plans: SubscriptionPlan[];
  activePlanId: string | null;
}

export default function SubscriptionPlansGrid({ plans, activePlanId }: SubscriptionPlansGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <PlanOptionCard key={plan.id} plan={plan} isActive={plan.id === activePlanId} />
      ))}
    </div>
  );
}
