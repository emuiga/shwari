import LeadReviewPage from '@/features/provider/leads/presentation/pages/LeadReviewPage';

export default async function Page({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = await params;
  return <LeadReviewPage leadId={leadId} />;
}
