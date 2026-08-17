import PlanDetailPage from '@/features/provider/subscriptions/presentation/pages/PlanDetailPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getMySubscriptionServer, getPlanServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  const [plan, subscription] = await Promise.all([getPlanServer(planId), getMySubscriptionServer()]);
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <PlanDetailPage plan={plan} subscription={subscription} />
    </RequireRole>
  );
}
