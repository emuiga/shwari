import ProviderHeader from '@/features/provider/shared/presentation/components/ProviderHeader';
import EmptyState from '@/features/provider/shared/presentation/components/EmptyState';

interface ProviderComingSoonPageProps {
  title: string;
}

export default function ProviderComingSoonPage({ title }: ProviderComingSoonPageProps) {
  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <h1 className="page-title">{title}</h1>
        <EmptyState className="mt-10" title="This section is coming soon." />
      </main>
    </div>
  );
}
