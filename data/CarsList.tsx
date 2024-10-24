// Define a type for Car
interface Car {
  id: number;
  name: string;
  image: string;
  charges: number;
}

// Define the CarsList array with Car type
const CarsList: Car[] = [
  {
    id: 1,
    name: "Economy",
    image: "/11.png",
    charges: 1,
  },
  {
    id: 2,
    name: "MiniVan",
    image: "/22.png",
    charges: 1.2,
  },
  {
    id: 3,
    name: "Comfort",
    image: "/33.png",
    charges: 1.5,
  },
  {
    id: 4,
    name: "Luxury",
    image: "/44.png",
    charges: 2,
  },
  {
    id: 5,
    name: "Electric",
    image: "/55.png",
    charges: 2.2,
  },
];

export default CarsList;
