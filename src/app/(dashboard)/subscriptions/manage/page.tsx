import ManageSubscriptionPage from '@/features/provider/subscriptions/presentation/pages/ManageSubscriptionPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';
import { getMyInvoicesServer, getMySubscriptionServer } from '@/features/provider/subscriptions/data/subscriptionApi.server';

export default async function Page() {
  const [subscription, invoices] = await Promise.all([getMySubscriptionServer(), getMyInvoicesServer()]);
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <ManageSubscriptionPage subscription={subscription} invoices={invoices} />
    </RequireRole>
  );
}
