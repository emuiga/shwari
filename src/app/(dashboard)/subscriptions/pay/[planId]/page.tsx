import SubscriptionPaymentPage from '@/features/provider/subscriptions/presentation/pages/SubscriptionPaymentPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getPlanServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  const plan = await getPlanServer(planId);
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <SubscriptionPaymentPage plan={plan} />
    </RequireRole>
  );
}
