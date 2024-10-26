import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { UserLocationContext } from "@/context/user-location-context";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useContext } from "react";
import { Marker } from "react-map-gl";

export default function Markers() {
  const { user } = useUser();

  const { userLocation, setUserLocation } =
    useContext(UserLocationContext) || {};
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );

  const userInitials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`
    : user?.username?.[0]?.toUpperCase() || "";

  return (
    <div>
      {/* <Marker
        longitude={userLocation?.lng}
        latitude={userLocation?.lat}
        anchor="bottom"
      > */}
      {/* <img src="./pin.png" className="w-10 h-10" alt="pin" /> */}
      {/* <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white font-bold rounded-full">
                {userInitials}
              </div> */}
      {/* <div className="relative w-10 h-10"> */}
      {/* <img
                  src="/pin.png"
                  alt="location pin"
                  className="w-full h-full"
                /> */}
      {/* <Image
            src="/pin.png"
            alt="location pin"
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          /> */}
      {/* <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
            {userInitials}
          </span> */}
      {/* </div>
      </Marker> */}

      {sourceCoordinates?.length !== 0 && (
        <Marker
          longitude={sourceCoordinates?.lng}
          latitude={sourceCoordinates?.lat}
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

      {destinationCoordinates?.length !== 0 && (
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