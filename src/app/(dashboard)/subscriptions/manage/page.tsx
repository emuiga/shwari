import ManageSubscriptionPage from '@/features/provider/subscriptions/presentation/pages/ManageSubscriptionPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default function Page() {
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <ManageSubscriptionPage />
    </RequireRole>
  );
}
