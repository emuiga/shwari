'use client';

import { useEffect, useState } from 'react';

type Status = 'checking' | 'operational' | 'degraded';

export default function SystemStatusBadge() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/health/backend')
      .then((response) => {
        if (!cancelled) setStatus(response.ok ? 'operational' : 'degraded');
      })
      .catch(() => {
        if (!cancelled) setStatus('degraded');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'checking') return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
      <span
        className={`h-1.5 w-1.5 rounded-full ${status === 'operational' ? 'bg-green-400' : 'bg-amber-400'}`}
      />
      {status === 'operational' ? 'All systems operational' : 'Experiencing issues'}
    </span>
  );
}
