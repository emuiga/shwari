'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';

export default function RequireRole({
  role,
  children,
}: {
  role: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { role: activeRole } = useActiveRole();

  useEffect(() => {
    if (activeRole !== null && activeRole !== role) {
      router.replace('/dashboard');
    }
  }, [activeRole, role, router]);

  if (activeRole !== role) return null;
  return <>{children}</>;
}
