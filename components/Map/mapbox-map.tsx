"use client";

import { UserLocationContext } from "@/context/user-location-context";
import { useContext, useEffect, useRef } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./markers";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";

export default function MapboxMap() {
  //const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const mapRef = useRef<any>();
  const { userLocation } = useContext(UserLocationContext) || {};
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );

  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation && (
          <Map
            ref={mapRef}
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
