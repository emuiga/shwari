interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export default function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
      <span className="whitespace-nowrap text-xs font-medium text-subtle">
        Step {step} of {totalSteps}
      </span>
    </div>
  );
}
