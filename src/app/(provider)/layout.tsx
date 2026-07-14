import { SidebarProvider } from '@/features/dashboard/presentation/context/SidebarContext';
import ProviderShell from '@/features/provider/presentation/components/ProviderShell';
import { ServiceListingsProvider } from '@/features/provider/presentation/context/ServiceListingsContext';

export default function ProviderGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServiceListingsProvider>
      <SidebarProvider>
        <ProviderShell>{children}</ProviderShell>
      </SidebarProvider>
    </ServiceListingsProvider>
  );
}
