'use client';

import type { ReactNode } from 'react';
import ProviderBottomNav from '@/features/provider/shared/presentation/components/ProviderBottomNav';
import ProviderSidebar from '@/features/provider/shared/presentation/components/ProviderSidebar';
import { useSidebar } from '@/lib/context/SidebarContext';

export default function ProviderShell({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-white lg:bg-[#F5FFF9]">
      <ProviderSidebar />
      <div className={`pb-16 transition-all duration-300 lg:pb-0 ${isOpen ? 'lg:pl-60' : 'lg:pl-[72px]'}`}>
        {children}
      </div>
      <ProviderBottomNav />
    </div>
  );
}
