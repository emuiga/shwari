'use client';

import type { ReactNode } from 'react';
import DashboardSidebar from '@/features/dashboard/presentation/components/DashboardSidebar';
import { useSidebar } from '@/features/dashboard/presentation/context/SidebarContext';

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardSidebar />
      <div className={`transition-all duration-300 ${isOpen ? 'pl-60' : 'pl-[72px]'}`}>{children}</div>
    </div>
  );
}
