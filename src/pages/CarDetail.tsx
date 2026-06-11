import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Car } from '../data/car';
import { fetchCarById } from '../data/car';
import '../styles/CarDetail.css';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadCar();
    }
  }, [id]);

  const loadCar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCarById(id!);
      if (data) {
        setCar(data);
      } else {
        setError('Mobil tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal memuat detail mobil');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <p>Memuat detail...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="detail-error">
        <div className="error-content">
          <h2>{error || 'Mobil tidak ditemukan'}</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Kembali ke Daftar
          </button>
        </div>
      </div>
    );
  }

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const specifications = [
    { label: 'Tahun', value: car.year || '-' },
    { label: 'Tipe', value: 'SUV' },
    { label: 'Transmisi', value: 'Otomatis' },
    { label: 'Bahan Bakar', value: 'Bensin' },
    { label: 'Kapasitas Mesin', value: '1500cc' },
    { label: 'Tenaga', value: '120 HP' },
  ];

  const features = [
    'AC Automatic',
    'Power Steering',
    'Power Windows',
    'Central Locking',
    'ABS',
    'Dual Airbag',
    'Bluetooth',
    'Rear Camera',
  ];

  return (
    <div className="car-detail-page">
      {/* Header */}
      <header className="detail-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-btn-header">
            ← Kembali
          </button>
        </div>
      </header>

      <main className="detail-main">
        <div className="container">
          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image">
              <img src={car.image || 'https://images.unsplash.com/photo-1606611013016-969c19f27081?w=800'} alt={`${car.brand} ${car.model}`} />
              <div className="year-badge-large">{car.year}</div>
            </div>
          </div>

          {/* Info Section */}
          <div className="detail-content">
            {/* Car Title & Pricing */}
            <div className="title-section">
              <div>
                <h1 className="car-title">
                  {car.brand} {car.model}
                </h1>
                <div className="rating-row">
                  {renderStars(car.rating || 4.5)}
                  {car.reviews && (
                    <span className="review-count">({car.reviews} ulasan)</span>
                  )}
                </div>
              </div>
              <div className="price-section">
                <p className="price-label">Harga</p>
                <p className="price-large">{formatPrice(car.price)}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="specs-section">
              <h2>Spesifikasi</h2>
              <div className="specs-grid">
                {specifications.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="features-section">
              <h2>Fitur Unggulan</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="description-section">
              <h2>Deskripsi</h2>
              <p>
                {car.description ||
                  `Mobil ${car.brand} ${car.model} merupakan pilihan sempurna untuk keluarga Anda.
                Dengan desain modern dan fitur lengkap, mobil ini menawarkan kenyamanan maksimal
                dalam setiap perjalanan. Efisiensi bahan bakar yang baik membuat mobil ini ekonomis
                dan ramah lingkungan.`}
              </p>
            </div>

            <div className="action-buttons">
              <button className="btn-primary">Hubungi Penjual</button>
              <button className="btn-secondary">Lihat Mobil Serupa</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
