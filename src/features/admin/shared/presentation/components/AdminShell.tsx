'use client';

import type { ReactNode } from 'react';
import AdminBottomNav from '@/features/admin/shared/presentation/components/AdminBottomNav';
import AdminSidebar from '@/features/admin/shared/presentation/components/AdminSidebar';
import { useSidebar } from '@/lib/context/SidebarContext';

export default function AdminShell({ children }: { children: ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-white lg:bg-gray-50">
      <AdminSidebar />
      <div className={`pb-16 transition-all duration-300 lg:pb-0 ${isOpen ? 'lg:pl-60' : 'lg:pl-[72px]'}`}>{children}</div>
      <AdminBottomNav />
    </div>
  );
}
