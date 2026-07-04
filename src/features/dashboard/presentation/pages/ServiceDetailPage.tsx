import Link from 'next/link';
import { notFound } from 'next/navigation';
import DashboardHeader from '@/features/dashboard/presentation/components/DashboardHeader';
import MaskIcon from '@/features/dashboard/presentation/components/MaskIcon';
import { MoreIcon } from '@/features/dashboard/presentation/components/icons';
import ProviderPanel from '@/features/dashboard/presentation/components/ProviderPanel';
import SafetyTips from '@/features/dashboard/presentation/components/SafetyTips';
import ServiceImageGallery from '@/features/dashboard/presentation/components/ServiceImageGallery';
import ServiceTabs from '@/features/dashboard/presentation/components/ServiceTabs';
import StarRating from '@/features/dashboard/presentation/components/StarRating';
import {
  formatKes,
  getServiceById,
  getSimilarServices,
} from '@/features/dashboard/presentation/lib/mockServices';

interface ServiceDetailPageProps {
  serviceId: string;
}

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const service = getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  const similarServices = getSimilarServices(service);

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardHeader />

      <main className="px-6 py-6">
        <nav className="mb-6 text-xs text-gray-400">
          <Link href="/dashboard" className="hover:text-gray-600">
            Explore Services
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-gray-600">{service.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <ServiceImageGallery images={service.images} alt={service.title} />
            <ServiceTabs reviews={service.reviews} similarServices={similarServices} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between">
                <p className="text-2xl font-bold text-gray-900">{formatKes(service.price)}</p>
                <div className="flex items-center gap-3 text-gray-400">
                  <StarRating rating={service.rating} reviewCount={service.reviewCount} />
                  <MaskIcon
                    label="Save"
                    maskClassName="[mask-image:url('/icons/bookmark.png')] [-webkit-mask-image:url('/icons/bookmark.png')]"
                    className="h-4 w-4"
                  />
                  <MoreIcon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-1 text-base font-medium text-gray-700">{service.title}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">Service Categories</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {service.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">Moving Locations</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {service.locations.map((location) => (
                  <span
                    key={location}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>

            <ProviderPanel provider={service.provider} />
            <SafetyTips />
          </div>
        </div>
      </main>
    </div>
  );
}
