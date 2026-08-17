const STORAGE_KEY = 'sm_pending_profile_name';

function normalize(identifier: string) {
  return identifier.trim().toLowerCase();
}

export function savePendingName(identifier: string, name: string) {
  if (typeof window === 'undefined') return;
  const entries = readAll();
  entries[normalize(identifier)] = name;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function consumePendingName(identifier: string): string | null {
  if (typeof window === 'undefined') return null;
  const entries = readAll();
  const key = normalize(identifier);
  const name = entries[key] ?? null;
  if (name) {
    delete entries[key];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
  return name;
}

function readAll(): Record<string, string> {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}
