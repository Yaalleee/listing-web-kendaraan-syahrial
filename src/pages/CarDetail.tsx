import { useParams, Link } from "react-router-dom";
import { cars } from "../data/car";

export default function CarDetail() {
  const { id } = useParams();
  const car = cars.find((c) => c.id === Number(id));

  if (!car) return <h2>Car not found</h2>;

  return (
    <div className="detailPage">
      <Link to="/" className="back">← Back</Link>

      <div className="detailCard">
        <img src={car.image} />

        <div className="detailInfo">
          <h1>{car.name}</h1>
          <span className="badge">{car.category}</span>
          <h3>{car.price}</h3>
          <p>{car.description}</p>
        </div>
      </div>
    </div>
  );
}