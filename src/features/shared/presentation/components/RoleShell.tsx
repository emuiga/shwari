'use client';

import type { ReactNode } from 'react';
import DashboardShell from '@/features/client/shared/presentation/components/DashboardShell';
import ProviderShell from '@/features/provider/shared/presentation/components/ProviderShell';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';

export default function RoleShell({ children }: { children: ReactNode }) {
  const { role } = useActiveRole();
  return role === 'SERVICE_PROVIDER' ? (
    <ProviderShell>{children}</ProviderShell>
  ) : (
    <DashboardShell>{children}</DashboardShell>
  );
}
