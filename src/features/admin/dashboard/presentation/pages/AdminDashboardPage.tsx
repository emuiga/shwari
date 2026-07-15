import AdminHeader from '@/features/admin/shared/presentation/components/AdminHeader';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen w-full bg-white lg:bg-transparent">
      <AdminHeader />
      <main className="px-4 py-6 sm:px-6">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Overview of Movvapp activity</p>

        <div className="mt-10 rounded-2xl border border-gray-200 py-16 text-center">
          <p className="text-sm text-gray-500">Admin tools are coming soon.</p>
        </div>
      </main>
    </div>
  );
}
