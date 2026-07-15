import EditServiceListingPage from '@/features/provider/service-listing/presentation/pages/EditServiceListingPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <EditServiceListingPage id={id} />;
}
