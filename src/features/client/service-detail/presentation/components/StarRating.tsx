interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1 text-sm text-body">
      <span className="text-amber-400">★</span>
      <span className="font-medium text-ink">{rating.toFixed(1)}</span>
      <span>({reviewCount})</span>
    </div>
  );
}
