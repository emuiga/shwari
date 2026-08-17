import PlanDetailPage from '@/features/provider/subscriptions/presentation/pages/PlanDetailPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default async function Page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <PlanDetailPage planId={planId} />
    </RequireRole>
  );
}
