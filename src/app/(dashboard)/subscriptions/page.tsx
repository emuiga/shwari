import ProviderSubscriptionsPage from '@/features/provider/subscriptions/presentation/pages/ProviderSubscriptionsPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default function Page() {
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <ProviderSubscriptionsPage />
    </RequireRole>
  );
}
