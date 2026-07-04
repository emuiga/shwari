export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!local || !domain) return email;
  return `${local.slice(0, 3)}${'*'.repeat(Math.max(local.length - 3, 0))}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 3) return phone;
  return `${digits.slice(0, 4)}${'*'.repeat(Math.max(digits.length - 6, 0))}${digits.slice(-2)}`;
}
