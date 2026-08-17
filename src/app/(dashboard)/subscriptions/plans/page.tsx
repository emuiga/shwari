import BrowsePlansPage from '@/features/provider/subscriptions/presentation/pages/BrowsePlansPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getMySubscriptionServer, getPlansServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page() {
  const [plans, subscription] = await Promise.all([getPlansServer(), getMySubscriptionServer()]);
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <BrowsePlansPage plans={plans} activePlanId={subscription?.planId ?? null} />
    </RequireRole>
  );
}
