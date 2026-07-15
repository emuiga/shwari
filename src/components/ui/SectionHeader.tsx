interface SectionHeaderProps {
  title: string;
  className?: string;
}

export default function SectionHeader({ title, className = '' }: SectionHeaderProps) {
  return (
    <p className={`border-b border-gray-200 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 ${className}`}>
      {title}
    </p>
  );
}
