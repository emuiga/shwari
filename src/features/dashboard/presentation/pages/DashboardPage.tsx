import CompareTray from '@/features/dashboard/presentation/components/CompareTray';
import DashboardHeader from '@/features/dashboard/presentation/components/DashboardHeader';
import SearchFilterBar from '@/features/dashboard/presentation/components/SearchFilterBar';
import ServiceSection from '@/features/dashboard/presentation/components/ServiceSection';
import { serviceSections } from '@/features/dashboard/presentation/lib/mockServices';

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />
      <SearchFilterBar />

      <main className="px-6">
        {serviceSections.map((section) => (
          <ServiceSection key={section.id} section={section} />
        ))}
      </main>

      <CompareTray />
    </div>
  );
}
