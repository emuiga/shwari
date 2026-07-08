import { CompareProvider } from '@/features/dashboard/presentation/context/CompareContext';
import DashboardShell from '@/features/dashboard/presentation/components/DashboardShell';
import { MessagesProvider } from '@/features/dashboard/presentation/context/MessagesContext';
import { SavedServicesProvider } from '@/features/dashboard/presentation/context/SavedServicesContext';
import { ServiceRequestsProvider } from '@/features/dashboard/presentation/context/ServiceRequestsContext';
import { SidebarProvider } from '@/features/dashboard/presentation/context/SidebarContext';

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompareProvider>
      <SavedServicesProvider>
        <ServiceRequestsProvider>
          <MessagesProvider>
            <SidebarProvider>
              <DashboardShell>{children}</DashboardShell>
            </SidebarProvider>
          </MessagesProvider>
        </ServiceRequestsProvider>
      </SavedServicesProvider>
    </CompareProvider>
  );
}
