import PricingPage from '@/features/landing/presentation/pages/PricingPage';
import { getPlansServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page() {
  const plans = await getPlansServer();
  return <PricingPage plans={plans} />;
}
