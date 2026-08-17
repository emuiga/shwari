import ProviderSubscriptionsPage from '@/features/provider/subscriptions/presentation/pages/ProviderSubscriptionsPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getMySubscriptionServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page() {
  const subscription = await getMySubscriptionServer();
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <ProviderSubscriptionsPage subscription={subscription} />
    </RequireRole>
  );
}
