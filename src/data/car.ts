export interface Car {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    price: "Rp 250.000.000",
    category: "MPV",
    description: "mobil keluarga yang nyaman dan luas untuk petualangan Anda bersama keluarga.",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800"
  },
  {
    id: 2,
    name: "Honda Civic",
    price: "Rp 600.000.000",
    category: "Sedan",
    description: "Sedan sporty dan elegan.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
  },
  {
    id: 3,
    name: "Suzuki Ertiga",
    price: "Rp 230.000.000",
    category: "MPV",
    description: "Mobil keluarga hemat BBM.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
  },
  {
    id: 4,
    name: "Toyota Fortuner",
    price: "Rp 700.000.000",
    category: "SUV",
    description: "SUV tangguh untuk segala medan.",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800"
  },
  {
  id: 5,
  name: "Mitsubishi Pajero Sport",
  price: "Rp 650.000.000",
  category: "SUV",
  description: "SUV premium nyaman dan bertenaga.",
  image:
    "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800"
}
];