import SubscriptionPaymentPage from '@/features/provider/subscriptions/presentation/pages/SubscriptionPaymentPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default async function Page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <SubscriptionPaymentPage planId={planId} />
    </RequireRole>
  );
}
