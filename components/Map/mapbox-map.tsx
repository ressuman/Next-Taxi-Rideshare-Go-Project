"use client";

import { UserLocationContext } from "@/context/user-location-context";
import { useCallback, useContext, useEffect, useRef } from "react";
import Map, { MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./markers";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { DirectionsDataContext } from "@/context/directions-data-context";
import MapboxRoute from "./mapbox-route";
import DistanceTime from "./distanceTime";

export default function MapboxMap() {
  const mapRef = useRef<MapRef | null>(null);
  const { userLocation } = useContext(UserLocationContext) ?? {};
  const { sourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { destinationCoordinates } =
    useContext(DestinationCoordinatesContext) ?? {};
  const { directionsData, setDirectionsData } =
    useContext(DirectionsDataContext) ?? {};

  const getDirectionRoute = useCallback(async () => {
    if (!sourceCoordinates || !destinationCoordinates) {
      console.error("Source or destination coordinates are missing");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_DIRECTIONS_URL}/${sourceCoordinates.lng},${sourceCoordinates.lat};${destinationCoordinates.lng},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`;

    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Mapbox API error: ${res.statusText}`);
      }

      const result = await res.json();
      console.log("Full result:", result);
      console.log("Routes:", result.routes);

      setDirectionsData?.(result);
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  }, [sourceCoordinates, destinationCoordinates, setDirectionsData]);

  // Fly to source coordinates when they are available
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  // Fly to destination coordinates and fetch the route when both are available
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
      if (sourceCoordinates) {
        getDirectionRoute();
      }
    }
  }, [destinationCoordinates, sourceCoordinates, getDirectionRoute]);

  return (
    <div className="p-5  h-[calc(100vh-100px)] mb-16">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden h-full ">
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
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionsData?.routes && (
              <MapboxRoute
                coordinates={directionsData?.routes[0]?.geometry?.coordinates}
              />
            )}
          </Map>
        )}
      </div>
      <div className="absolute bottom-[-85%] md:bottom-[50px] z-20 md:right-[30px] right-[1.25rem] pl-5 md:pl-0">
        <DistanceTime />
      </div>
    </div>
  );
}
