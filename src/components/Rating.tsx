interface RatingProps {
  rating: number;
  reviews?: number;
  size?: 'small' | 'medium' | 'large';
}

export default function Rating({
  rating,
  reviews = 0,
  size = 'medium',
}: RatingProps) {
  const sizeClass = `rating-${size}`;

  return (
    <div className={`rating ${sizeClass}`}>
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`star ${i < Math.round(rating) ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
      <div className="rating-info">
        <span className="rating-value">{rating.toFixed(1)}</span>
        {reviews > 0 && <span className="review-count">({reviews} ulasan)</span>}
      </div>
    </div>
  );
}
