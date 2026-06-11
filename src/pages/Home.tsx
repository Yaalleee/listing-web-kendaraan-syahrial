import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import type { Car } from '../data/car';
import { fetchCars, searchCars } from '../data/car';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cars on mount
  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCars();
      setCars(data);
    } catch (err) {
      setError('Gagal memuat data mobil. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      loadCars();
    } else {
      try {
        setLoading(true);
        const results = await searchCars(term);
        setCars(results);
      } catch (err) {
        setError('Gagal mencari mobil.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCarClick = (carId: string | number) => {
    navigate(`/car/${carId}`);
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="title">Listing Kendaraan</h1>
            <p className="subtitle">Temukan mobil impianmu di sini</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {/* Search Bar */}
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Cari mobil..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="cars-section">
            <div className="section-header">
              <h2>
                Mobil Tersedia{' '}
                {cars.length > 0 && <span className="count">({cars.length})</span>}
              </h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
              <div className="loading">
                <p>Memuat data...</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="empty-state">
                <p>Tidak ada mobil yang tersedia</p>
              </div>
            ) : (
              <div className="grid">
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    id={car.id as number}
                    brand={car.brand || 'Unknown'}
                    model={car.model || 'Unknown'}
                    year={car.year || new Date().getFullYear()}
                    price={car.price}
                    image={car.image}
                    rating={car.rating}
                    reviews={car.reviews}
                    onClick={() => handleCarClick(car.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
