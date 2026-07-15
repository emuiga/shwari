import ProviderHeader from '@/features/provider/presentation/components/ProviderHeader';

interface ProviderComingSoonPageProps {
  title: string;
}

export default function ProviderComingSoonPage({ title }: ProviderComingSoonPageProps) {
  return (
    <div className="min-h-screen w-full bg-white">
      <ProviderHeader />
      <main className="px-4 py-6 sm:px-6">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <div className="mt-10 rounded-2xl border border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">This section is coming soon.</p>
        </div>
      </main>
    </div>
  );
}
