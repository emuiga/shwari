import { StarIcon } from '@/components/icons';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className = 'h-3.5 w-3.5' }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className={`${className} ${index < Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}
