import PlanDetailPage from '@/features/provider/subscriptions/presentation/pages/PlanDetailPage';

export default async function Page({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = await params;
  return <PlanDetailPage planId={planId} />;
}
