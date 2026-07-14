'use client';

import type { ReactNode } from 'react';
import ProviderBottomNav from '@/features/provider/presentation/components/ProviderBottomNav';
import ProviderSidebar from '@/features/provider/presentation/components/ProviderSidebar';
import { useSidebar } from '@/features/dashboard/presentation/context/SidebarContext';

export default function ProviderShell({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-white">
      <ProviderSidebar />
      <div className={`pb-16 transition-all duration-300 lg:pb-0 ${isOpen ? 'lg:pl-60' : 'lg:pl-[72px]'}`}>
        {children}
      </div>
      <ProviderBottomNav />
    </div>
  );
}
