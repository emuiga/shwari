export type PrimaryRole = 'CUSTOMER' | 'SERVICE_PROVIDER';

export interface ApiEnvelope<T> {
  success: boolean;
  code: string;
  description: string;
  data: T | null;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  primaryRole: PrimaryRole;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
}

export interface ResendConfirmationRequest {
  email: string;
}

export interface ConfirmEmailRequest {
  token: string;
  password: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginChallengeResponse {
  challengeId: string;
  maskedEmail: string;
  message: string;
}

export interface VerifyLoginMfaRequest {
  challengeId: string;
  code: string;
}

export interface VerifyLoginMfaResponse {
  role: PrimaryRole | string;
}

export interface ResendLoginMfaRequest {
  challengeId: string;
}

export interface ForgotPasswordRequest {
  identifier: string;
}

export interface ForgotPasswordResponse {
  challengeId: string;
  message: string;
}

export interface ResetPasswordRequest {
  challengeId: string;
  token: string;
  newPassword: string;
}

export interface SwitchProfileRequest {
  role: PrimaryRole;
}

export interface SwitchProfileResponse {
  role: PrimaryRole | string;
}

export interface UserProfile {
  id?: string;
  email?: string;
  phone?: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  locale?: string | null;
}
