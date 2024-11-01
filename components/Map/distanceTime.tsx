import { DirectionsDataContext } from "@/context/directions-data-context";
import { useContext } from "react";

export default function DistanceTime() {
  const { directionsData } = useContext(DirectionsDataContext) ?? {};

  return (
    directionsData?.routes && (
      <div className="bg-yellow-500 p-3">
        <h2 className="text-yellow-100 opacity-80 text-[15px]">
          Distance:&nbsp;{""}
          <span className="font-bold mr-3 text-black ml-1">
            {(directionsData?.routes[0]?.distance / 1000).toFixed(2)} Kilometers
          </span>
          Duration:&nbsp;{""}
          <span className="font-bold text-black">
            {(directionsData?.routes[0]?.duration / 60).toFixed(2)} Minutes
          </span>
        </h2>{" "}
      </div>
    )
  );
}
