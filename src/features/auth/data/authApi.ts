import type {
  ApiEnvelope,
  ConfirmEmailRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginChallengeResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  ResendConfirmationRequest,
  ResendLoginMfaRequest,
  ResetPasswordRequest,
  SwitchProfileRequest,
  SwitchProfileResponse,
  VerifyLoginMfaRequest,
  VerifyLoginMfaResponse,
} from '@/features/auth/data/types';

export class ApiError extends Error {}

async function post<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
): Promise<TResponse> {
  const response = await fetch(`/api/auth${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const envelope = (await response.json().catch(() => null)) as ApiEnvelope<TResponse> | null;

  if (!envelope || !response.ok || !envelope.success) {
    throw new ApiError(envelope?.description ?? 'Something went wrong. Please try again.');
  }

  return envelope.data as TResponse;
}

export function register(payload: RegisterRequest) {
  return post<RegisterResponse>('/register', payload);
}

export function resendConfirmation(payload: ResendConfirmationRequest) {
  return post<{ message: string }>('/resend-confirmation', payload);
}

export function confirmEmail(payload: ConfirmEmailRequest) {
  return post<{ message: string }>('/confirm-email', payload);
}

export function login(payload: LoginRequest) {
  return post<LoginChallengeResponse>('/login', payload);
}

export function verifyLoginMfa(payload: VerifyLoginMfaRequest) {
  return post<VerifyLoginMfaResponse>('/login/verify-mfa', payload);
}

export function resendLoginMfa(payload: ResendLoginMfaRequest) {
  return post<{ message: string }>('/login/resend-mfa', payload);
}

export function forgotPassword(payload: ForgotPasswordRequest) {
  return post<ForgotPasswordResponse>('/password/forgot', payload);
}

export function resetPassword(payload: ResetPasswordRequest) {
  return post<{ message: string }>('/password/reset', payload);
}

export function switchProfile(payload: SwitchProfileRequest) {
  return post<SwitchProfileResponse>('/switch-profile', payload);
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' });
}
