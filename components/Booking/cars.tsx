import CarsList from "@/data/CarsList";
import Image from "next/image";
import { useState } from "react";

export default function Cars() {
  const [selectedCar, setSelectedCar] = useState();

  return (
    <div className="mt-3">
      <h2 className="font-medium text-[14px]">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {CarsList.map((car) => {
          return (
            <div
              key={car.id}
              className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${
                car.id === selectedCar ? "border-yellow-400 border-[2px]" : null
              }`}
            >
              <Image
                src={car.image}
                alt={car.name}
                width={75}
                height={90}
                className="w-full"
              />
              <h2 className="text-[10px] text-gray-500">{car.name}</h2>
              <span className="float-right font-medium text-black">
                {car.charges * 8}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
