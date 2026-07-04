import Image from 'next/image';
import { PlusIcon } from '@/features/dashboard/presentation/components/icons';
import MaskIcon from '@/features/dashboard/presentation/components/MaskIcon';
import ProfileMenu from '@/features/dashboard/presentation/components/ProfileMenu';
import { getRandomAvatar } from '@/features/dashboard/presentation/lib/avatars';

export default function DashboardHeader() {
  const avatarSrc = getRandomAvatar();

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <Image src="/images/moving-truck-green.png" alt="" width={28} height={28} />
        <span className="font-heading text-lg font-bold text-gray-900">Movvapp</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Create"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Saved"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <MaskIcon
            label="Saved"
            maskClassName="[mask-image:url('/icons/bookmark.png')] [-webkit-mask-image:url('/icons/bookmark.png')]"
            className="h-4 w-4"
          />
        </button>
        <button
          type="button"
          aria-label="Share"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          <MaskIcon
            label="Share"
            maskClassName="[mask-image:url('/icons/send.png')] [-webkit-mask-image:url('/icons/send.png')]"
            className="h-4 w-4"
          />
        </button>
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
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            2
          </span>
        </button>

        <ProfileMenu avatarSrc={avatarSrc} />
      </div>
    </header>
  );
}
