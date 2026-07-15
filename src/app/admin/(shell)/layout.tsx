import { SidebarProvider } from '@/lib/context/SidebarContext';
import AdminShell from '@/features/admin/shared/presentation/components/AdminShell';

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminShell>{children}</AdminShell>
    </SidebarProvider>
  );
}
