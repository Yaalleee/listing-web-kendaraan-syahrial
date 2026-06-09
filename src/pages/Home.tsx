import { useState } from "react";
import { cars } from "../data/car";
import CarCard from "../components/CarCard";
import { Link } from "react-router-dom";

const categories = ["ALL", "SUV", "MPV", "Sedan", "Sport"];

export default function Home() {
  const [filter, setFilter] = useState("ALL");

  const filteredCars =
    filter === "ALL"
      ? cars
      : cars.filter((car) => car.category === filter);

  return (
    <div className="page">
      <header className="header">
        <h1>Luxury Car Collection </h1>
        <p>Find your perfect ride with style</p>
      </header>

      {/* FILTER */}
      <div className="filterBar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid">
        {filteredCars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <CarCard car={car} />
          </Link>
        ))}
      </div>
    </div>
  );
}