import LeadReviewPage from '@/features/provider/leads/presentation/pages/LeadReviewPage';
import RequireRole from '@/features/auth/presentation/components/RequireRole';

export default async function Page({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  return (
    <RequireRole role="SERVICE_PROVIDER">
      <LeadReviewPage leadId={leadId} />
    </RequireRole>
  );
}
