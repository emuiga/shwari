import { SidebarProvider } from '@/lib/context/SidebarContext';
import ProviderShell from '@/features/provider/shared/presentation/components/ProviderShell';
import { ServiceListingsProvider } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { SubscriptionProvider } from '@/features/provider/subscriptions/presentation/context/SubscriptionContext';

export default function ProviderGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceListingsProvider>
      <SubscriptionProvider>
        <SidebarProvider>
          <ProviderShell>{children}</ProviderShell>
        </SidebarProvider>
      </SubscriptionProvider>
    </ServiceListingsProvider>
  );
}
