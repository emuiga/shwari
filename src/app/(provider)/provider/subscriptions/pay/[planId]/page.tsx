import SubscriptionPaymentPage from '@/features/provider/subscriptions/presentation/pages/SubscriptionPaymentPage';

export default async function Page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  return <SubscriptionPaymentPage planId={planId} />;
}
