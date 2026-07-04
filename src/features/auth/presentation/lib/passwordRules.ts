export interface PasswordRule {
  label: string;
  test: (password: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  { label: 'Should have atleast 8 characters', test: (p) => p.length >= 8 },
  {
    label: 'Should have atleast 1 special character',
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
  { label: 'Should have atleast 1 number', test: (p) => /\d/.test(p) },
  {
    label: 'Should have atleast 1 uppercase letter',
    test: (p) => /[A-Z]/.test(p),
  },
];
