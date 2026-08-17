import { z } from 'zod';

const PHONE_REGEX = /^\+?[0-9]{9,15}$/;

export const nameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters');

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .pipe(z.email('Enter a valid email address'));

export const phoneSchema = z
  .string()
  .trim()
  .min(1, 'Phone number is required')
  .regex(PHONE_REGEX, 'Enter a valid phone number, e.g. +254712345678');

export const identifierSchema = z
  .string()
  .trim()
  .min(1, 'Email or phone is required')
  .refine(
    (value) => z.email().safeParse(value).success || PHONE_REGEX.test(value),
    'Enter a valid email or phone number',
  );

export const registerDetailsSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}
