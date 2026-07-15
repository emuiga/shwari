interface MaskIconProps {
  maskClassName: string;
  className?: string;
  label: string;
}

export default function MaskIcon({ maskClassName, className, label }: MaskIconProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block bg-current [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${maskClassName} ${className ?? ''}`}
    />
  );
}
