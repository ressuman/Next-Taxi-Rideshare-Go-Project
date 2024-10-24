// Define a type for Payment Card
interface Card {
  id: number;
  name: string;
  image: string;
}

// Define the CardsList array with Card type
const CardsList: Card[] = [
  {
    id: 1,
    name: "Master Card",
    image: "/card.png",
  },
  {
    id: 2,
    name: "Visa Card",
    image: "/visa.png",
  },
  {
    id: 3,
    name: "Apple Pay",
    image: "/apple-pay.png",
  },
  {
    id: 4,
    name: "Google Pay",
    image: "/google-pay.png",
  },
  {
    id: 5,
    name: "Cash",
    image: "/cash.png",
  },
];

export default CardsList;
