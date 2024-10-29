"use client";

import Booking from "@/components/Booking/booking";
import MapboxMap from "@/components/Map/mapbox-map";
import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { DirectionsDataContext } from "@/context/directions-data-context";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { UserLocationContext } from "@/context/user-location-context";
import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);
  const [directionsData, setDirectionsData] = useState<any>([]);
  const [carAmount, setCarAmount] = useState<any>();

  useEffect(() => {
    getUserLocation();
  }, []);

  function getUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => console.error("Error fetching user location:", error),
      { enableHighAccuracy: true }
    );
  }

  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordinatesContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCoordinatesContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <DirectionsDataContext.Provider
              value={{ directionsData, setDirectionsData }}
            >
              <SelectedCarAmountContext.Provider
                value={{ carAmount, setCarAmount }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="">
                    <Booking />
                  </div>

                  <div
                    className="col-span-2
        "
                  >
                    <MapboxMap />
                  </div>
                </div>
              </SelectedCarAmountContext.Provider>
            </DirectionsDataContext.Provider>
          </DestinationCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
