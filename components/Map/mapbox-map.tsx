"use client";

import { UserLocationContext } from "@/context/user-location-context";
import { useContext } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./markers";

export default function MapboxMap() {
  //const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { userLocation } = useContext(UserLocationContext) || {};

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
            <Markers />
          </Map>
        )}
      </div>
    </div>
  );
}
