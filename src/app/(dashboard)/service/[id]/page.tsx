import ServiceDetailPage from '@/features/client/service-detail/presentation/pages/ServiceDetailPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ServiceDetailPage serviceId={id} />;
}
