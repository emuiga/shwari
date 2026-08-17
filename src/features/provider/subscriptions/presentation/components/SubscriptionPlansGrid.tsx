import PlanOptionCard from '@/features/provider/subscriptions/presentation/components/PlanOptionCard';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';
import type { SubscriptionPlan } from '@/features/provider/subscriptions/data/types';

interface SubscriptionPlansGridProps {
  plans: SubscriptionPlan[];
  activePlanId: string | null;
}

export default function SubscriptionPlansGrid({ plans, activePlanId }: SubscriptionPlansGridProps) {
  if (plans.length === 0) {
    return <EmptyState title="No plans available" description="Check back later for subscription plans." />;
  }

  const activeTierRank = plans.find((plan) => plan.id === activePlanId)?.tierRank ?? null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <PlanOptionCard
          key={plan.id}
          plan={plan}
          isActive={plan.id === activePlanId}
          isUpgrade={activeTierRank != null && (plan.tierRank ?? 0) > activeTierRank}
        />
      ))}
    </div>
  );
}
