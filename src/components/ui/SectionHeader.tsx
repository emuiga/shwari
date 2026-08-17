interface SectionHeaderProps {
  title: string;
  className?: string;
}

export default function SectionHeader({ title, className = '' }: SectionHeaderProps) {
  return (
    <p className={`border-b border-border pb-2 text-xs font-semibold uppercase tracking-wide text-subtle ${className}`}>
      {title}
    </p>
  );
}
