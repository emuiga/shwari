import { CompareProvider } from '@/features/client/saved/presentation/context/CompareContext';
import DashboardShell from '@/features/client/shared/presentation/components/DashboardShell';
import { MessagesProvider } from '@/features/client/messages/presentation/context/MessagesContext';
import { SavedServicesProvider } from '@/features/client/saved/presentation/context/SavedServicesContext';
import { ServiceRequestsProvider } from '@/features/client/requests/presentation/context/ServiceRequestsContext';
import { SidebarProvider } from '@/lib/context/SidebarContext';

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
