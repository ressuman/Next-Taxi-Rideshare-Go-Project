"use client";

import { UserLocationContext } from "@/context/user-location-context";
import { useContext } from "react";
//import { Map } from "react-map-gl";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function MapboxMap() {
  //const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { userLocation } = useContext(UserLocationContext) || {};
  const { user } = useUser();

  const userInitials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ""}`
    : user?.username?.[0]?.toUpperCase() || "";

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation && (
          <Map
            mapboxAccessToken={
              process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN
            }
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 520, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={userLocation?.lng}
              latitude={userLocation?.lat}
              anchor="bottom"
            >
              {/* <img src="./pin.png" className="w-10 h-10" alt="pin" /> */}
              {/* <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white font-bold rounded-full">
                {userInitials}
              </div> */}
              <div className="relative w-10 h-10">
                {/* <img
                  src="/pin.png"
                  alt="location pin"
                  className="w-full h-full"
                /> */}
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
          </Map>
        )}
      </div>
    </div>
  );
}
