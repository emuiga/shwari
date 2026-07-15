'use client';

import MaskIcon from '@/components/MaskIcon';
import AdminProfileMenu from '@/features/admin/shared/presentation/components/AdminProfileMenu';

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-end border-b border-gray-100 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <MaskIcon
            label="Notifications"
            maskClassName="[mask-image:url('/icons/notification.png')] [-webkit-mask-image:url('/icons/notification.png')]"
            className="h-4 w-4"
          />
        </button>

        <AdminProfileMenu />
      </div>
    </header>
  );
}
