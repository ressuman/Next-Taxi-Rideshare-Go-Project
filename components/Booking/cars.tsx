"use client";

import { DirectionsDataContext } from "@/context/directions-data-context";
import CarsList from "@/data/CarsList";

import Image from "next/image";
import { useContext, useState } from "react";

// Define the Car type, ensuring consistency with CarsList
interface Car {
  id: number;
  name: string;
  image: string;
  charges: number;
}

export default function Cars({ onCarSelectAmount }: any) {
  const [selectedCar, setSelectedCar] = useState<number | undefined>(undefined);

  const { directionsData, setDirectionsData } = useContext(
    DirectionsDataContext
  );

  const getCost = (charges: number) => {
    if (!directionsData?.routes || directionsData.routes.length === 0)
      return "0.00";

    const distanceInKm = directionsData?.routes[0]?.distance / 1000;
    const timeInMinutes = directionsData?.routes[0]?.duration / 60;

    const trafficMultiplier = 1.2;

    const cost =
      charges * (distanceInKm + timeInMinutes * 0.1) * trafficMultiplier;
    return cost.toFixed(2);
  };

  return (
    <div className="mt-3">
      <h2 className="font-medium text-[14px]">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {CarsList.map((car: Car) => {
          return (
            <button
              type="button"
              key={car.id}
              className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${
                car.id === selectedCar ? "border-yellow-400 border-[2px]" : ""
              }`}
              onClick={() => {
                setSelectedCar(car.id);
                onCarSelectAmount(getCost(car.charges));
              }}
            >
              <Image
                src={car.image}
                alt={car.name}
                width={75}
                height={90}
                className="w-full"
              />
              <h2 className="text-[10px] text-gray-500">
                {car.name}
                {directionsData?.routes && (
                  <span className="float-right font-medium text-black">
                    {getCost(car.charges)} $
                  </span>
                )}
              </h2>
            </button>
          );
        })}
      </div>
    </div>
  );
}
