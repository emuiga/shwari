'use client';

import { useEffect, useState } from 'react';
import { isWithinOperatingHours, timeToMinutes } from '@/features/provider/shared/presentation/lib/operatingHours';
import type { ProviderAvailability } from '@/features/provider/shared/data/types';

export function useIsAvailableNow(
  availability: ProviderAvailability[],
  operatingHours: Record<string, string> | undefined,
) {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const now = new Date();
    const isoDay = now.getDay() === 0 ? 7 : now.getDay();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    if (availability.length > 0) {
      const todaySlot = availability.find((slot) => slot.dayOfWeek === isoDay);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- must read the real clock client-side, can't be derived at render/SSR time
      setIsAvailable(
        Boolean(todaySlot?.available) &&
          nowMinutes >= timeToMinutes(todaySlot!.startTime) &&
          nowMinutes < timeToMinutes(todaySlot!.endTime),
      );
      return;
    }

    if (operatingHours) {
      const dayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];
      const range = operatingHours[dayKey];
      setIsAvailable(Boolean(range) && isWithinOperatingHours(range, nowMinutes));
      return;
    }

    setIsAvailable(false);
  }, [availability, operatingHours]);

  return isAvailable;
}
