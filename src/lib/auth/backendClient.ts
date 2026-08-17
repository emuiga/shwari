export interface BackendResult<T> {
  status: number;
  success: boolean;
  code: string;
  description: string;
  data: T | null;
}

export async function fetchBackend<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<BackendResult<T>> {
  const baseUrl = process.env.BACKEND_API_URL || process.env.BACKEND_URL;
  if (!baseUrl) {
    return {
      status: 500,
      success: false,
      code: 'E00500',
      description: 'Server is misconfigured (missing BACKEND_API_URL). Please contact support.',
      data: null,
    };
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/v1${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      cache: 'no-store',
    });
  } catch {
    return {
      status: 502,
      success: false,
      code: 'E00502',
      description: 'Could not reach the server. Please check your connection and try again.',
      data: null,
    };
  }

  const body = await response.json().catch(() => null);

  return {
    status: response.status,
    success: Boolean(body?.success),
    code: body?.code ?? 'E00000',
    description: body?.description ?? 'Something went wrong. Please try again.',
    data: body?.data ?? null,
  };
}
