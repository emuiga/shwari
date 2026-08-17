import { PASSWORD_RULES } from '@/features/auth/presentation/lib/passwordRules';

interface PasswordRequirementsProps {
  password: string;
  passwordsMatch: boolean;
}

export default function PasswordRequirements({
  password,
  passwordsMatch,
}: PasswordRequirementsProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-body">
        Password Requirements
      </p>
      <ul className="space-y-1">
        {PASSWORD_RULES.map((rule) => (
          <li
            key={rule.label}
            className={`flex items-center gap-2 text-xs ${
              rule.test(password) ? 'text-primary-strong' : 'text-faint'
            }`}
          >
            <span>{rule.test(password) ? '✓' : '○'}</span>
            {rule.label}
          </li>
        ))}
        <li
          className={`flex items-center gap-2 text-xs ${
            passwordsMatch ? 'text-primary-strong' : 'text-faint'
          }`}
        >
          <span>{passwordsMatch ? '✓' : '○'}</span>
          Passwords match
        </li>
      </ul>
    </div>
  );
}
