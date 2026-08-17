import BrowsePlansPage from '@/features/provider/subscriptions/presentation/pages/BrowsePlansPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default function Page() {
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <BrowsePlansPage />
    </RequireRole>
  );
}
