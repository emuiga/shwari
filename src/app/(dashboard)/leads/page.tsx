import ProviderLeadsPage from '@/features/provider/leads/presentation/pages/ProviderLeadsPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default function Page() {
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <ProviderLeadsPage />
    </RequireRole>
  );
}
