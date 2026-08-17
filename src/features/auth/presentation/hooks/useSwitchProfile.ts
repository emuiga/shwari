'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError, switchProfile } from '@/features/auth/data/authApi';
import { useActiveRole } from '@/features/auth/presentation/context/ActiveRoleContext';
import type { PrimaryRole } from '@/features/auth/data/types';

export function useSwitchProfile() {
  const router = useRouter();
  const { memberships, setActiveRole } = useActiveRole();
  const [switching, setSwitching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function switchTo(role: PrimaryRole) {
    setSwitching(true);
    setError(null);
    try {
      const result = await switchProfile({ role });
      setActiveRole({ role: result.role, memberships });
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not switch profile. Please try again.');
    } finally {
      setSwitching(false);
    }
  }

  return { switchTo, switching, error };
}
