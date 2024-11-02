import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useContext } from "react";
import { Marker } from "react-map-gl";

export default function Markers() {
  const { user } = useUser();

  const { sourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { destinationCoordinates } =
    useContext(DestinationCoordinatesContext) ?? {};

  let userInitials = "";
  if (user?.firstName) {
    userInitials = `${user.firstName[0]}`;
    if (user.lastName) {
      userInitials += `${user.lastName[0]}`;
    }
  } else {
    userInitials = user?.username?.[0]?.toUpperCase() ?? "";
  }

  return (
    <div>
      {sourceCoordinates && (
        <Marker
          longitude={sourceCoordinates?.lng}
          latitude={sourceCoordinates?.lat}
          anchor="bottom"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/location.png"
              alt="location pin"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
              {userInitials}
            </span>
          </div>
        </Marker>
      )}

      {destinationCoordinates && (
        <Marker
          longitude={destinationCoordinates?.lng}
          latitude={destinationCoordinates?.lat}
          anchor="bottom"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/pin.png"
              alt="location pin"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
              {userInitials}
            </span>
          </div>
        </Marker>
      )}
    </div>
  );
}
