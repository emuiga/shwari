'use client';

import { useEffect, useState } from 'react';

export function useResendTimer(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const reset = () => setRemaining(seconds);

  return { remaining, canResend: remaining === 0, reset };
}
