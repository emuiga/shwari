import { CompareProvider } from '@/features/client/saved/presentation/context/CompareContext';
import { MessagesProvider } from '@/features/client/messages/presentation/context/MessagesContext';
import { SavedServicesProvider } from '@/features/client/saved/presentation/context/SavedServicesContext';
import { ServiceRequestsProvider } from '@/features/client/requests/presentation/context/ServiceRequestsContext';
import { ServiceListingsProvider } from '@/features/provider/service-listing/presentation/context/ServiceListingsContext';
import { SidebarProvider } from '@/lib/context/SidebarContext';
import { ActiveRoleProvider } from '@/features/auth/presentation/context/ActiveRoleContext';
import RoleShell from '@/features/shared/presentation/components/RoleShell';
import { redirect } from 'next/navigation';
import { getActiveRoleCookie } from '@/lib/auth/activeRoleCookie';
import {
  getMyProviderProfileServer,
  getMyServicesServer,
} from '@/features/provider/shared/data/providerProfileApi.server';

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeRole = await getActiveRoleCookie();
  const isProvider = activeRole?.role === 'SERVICE_PROVIDER';

  if (isProvider) {
    const providerProfile = await getMyProviderProfileServer();
    if (!providerProfile?.businessName) {
      redirect('/provider-onboarding');
    }
  }

  const services = isProvider ? await getMyServicesServer() : [];

  return (
    <ActiveRoleProvider
      initialRole={activeRole?.role ?? null}
      initialMemberships={activeRole?.memberships ?? []}
    >
      <CompareProvider>
        <SavedServicesProvider>
          <ServiceRequestsProvider>
            <MessagesProvider>
              <ServiceListingsProvider initialListings={services}>
                <SidebarProvider>
                  <RoleShell>{children}</RoleShell>
                </SidebarProvider>
              </ServiceListingsProvider>
            </MessagesProvider>
          </ServiceRequestsProvider>
        </SavedServicesProvider>
      </CompareProvider>
    </ActiveRoleProvider>
  );
}
