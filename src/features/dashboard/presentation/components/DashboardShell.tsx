'use client';

import type { ReactNode } from 'react';
import DashboardBottomNav from '@/features/dashboard/presentation/components/DashboardBottomNav';
import DashboardSidebar from '@/features/dashboard/presentation/components/DashboardSidebar';
import { useSidebar } from '@/features/dashboard/presentation/context/SidebarContext';

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-white">
      <DashboardSidebar />
      <div className={`pb-16 transition-all duration-300 lg:pb-0 ${isOpen ? 'lg:pl-60' : 'lg:pl-[72px]'}`}>
        {children}
      </div>
      <DashboardBottomNav />
    </div>
  );
}
