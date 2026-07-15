interface IconProps {
  className?: string;
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11l8-7 8 7v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z" />
    </svg>
  );
}
