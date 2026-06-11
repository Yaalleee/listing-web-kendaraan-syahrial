import { useState } from 'react';
import '../styles/CarCard.css';

interface CarCardProps {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  price?: number | string;
  rating?: number;
  reviews?: number;
  onClick?: () => void;
}

export default function CarCard({
  image,
  brand,
  model,
  year,
  price,
  rating = 4.5,
  reviews = 0,
  onClick
}: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number | string | undefined | null) => {
    // Handle null or undefined
    if (price === null || price === undefined || price === '') {
      return 'Rp 0';
    }
    
    // Convert to number if it's a string
    let numPrice: number;
    if (typeof price === 'string') {
      // Remove any non-digit characters except decimal point
      const cleaned = price.replace(/[^\d.]/g, '');
      numPrice = parseFloat(cleaned) || 0;
    } else {
      numPrice = Number(price) || 0;
    }
    
    // Format in Indonesian Rupiah
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.round(rating) ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`car-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="car-image-wrapper">
        <img src={image} alt={`${brand} ${model}`} className="car-image" />
        <div className="year-badge">{year}</div>
      </div>

      <div className="car-info">
        <div className="car-header">
          <h3 className="car-brand">{brand}</h3>
          <span className="car-model">{model}</span>
        </div>

        {rating > 0 && (
          <div className="rating-section">
            {renderStars(rating)}
            {reviews > 0 && <span className="review-count">({reviews})</span>}
          </div>
        )}

        <div className="car-footer">
          <p className="car-price">{formatPrice(price)}</p>
          <button className="view-btn">Lihat Detail</button>
        </div>
      </div>
    </div>
  );
}
