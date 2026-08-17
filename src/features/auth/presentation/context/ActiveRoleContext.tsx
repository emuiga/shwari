'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface ActiveRoleState {
  role: string | null;
  memberships: string[];
}

interface ActiveRoleContextValue extends ActiveRoleState {
  setActiveRole: (state: ActiveRoleState) => void;
}

const ActiveRoleContext = createContext<ActiveRoleContextValue | null>(null);

export function ActiveRoleProvider({
  initialRole,
  initialMemberships,
  children,
}: {
  initialRole: string | null;
  initialMemberships: string[];
  children: ReactNode;
}) {
  const [state, setState] = useState<ActiveRoleState>({
    role: initialRole,
    memberships: initialMemberships,
  });

  const value = useMemo<ActiveRoleContextValue>(
    () => ({ ...state, setActiveRole: setState }),
    [state],
  );

  return <ActiveRoleContext.Provider value={value}>{children}</ActiveRoleContext.Provider>;
}

export function useActiveRole() {
  const context = useContext(ActiveRoleContext);
  if (!context) {
    throw new Error('useActiveRole must be used within an ActiveRoleProvider');
  }
  return context;
}
