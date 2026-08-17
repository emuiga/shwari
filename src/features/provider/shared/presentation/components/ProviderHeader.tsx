'use client';

import MaskIcon from '@/components/MaskIcon';
import ProviderProfileMenu from '@/features/provider/shared/presentation/components/ProviderProfileMenu';

export default function ProviderHeader() {
  return (
    <header className="flex items-center justify-end border-b border-border-soft bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-subtle hover:bg-surface-muted"
        >
          <MaskIcon
            label="Notifications"
            maskClassName="[mask-image:url('/icons/notification.png')] [-webkit-mask-image:url('/icons/notification.png')]"
            className="h-4 w-4"
          />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-white">
            2
          </span>
        </button>

        <ProviderProfileMenu />
      </div>
    </header>
  );
}
