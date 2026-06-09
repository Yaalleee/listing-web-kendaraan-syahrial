import type { Car } from "../data/car";


interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  return (
    <div className="cardModern">
      <div className="imageWrap">
        <img src={car.image} alt={car.name} />
        <span className="badge">{car.category}</span>
      </div>

      <div className="content">
        <h2>{car.name}</h2>
        <p className="price">{car.price}</p>
        <p className="desc">{car.description}</p>

        <button className="btn">View Detail</button>
      </div>
    </div>
  );
}