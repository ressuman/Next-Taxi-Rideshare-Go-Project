"use client";

import Booking from "@/components/Booking/booking";
import MapboxMap from "@/components/Map/mapbox-map";
import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import {
  DirectionsData,
  DirectionsDataContext,
} from "@/context/directions-data-context";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
import {
  Coordinates,
  SourceCoordinatesContext,
} from "@/context/source-coordinates-context";
import { Location, UserLocationContext } from "@/context/user-location-context";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [sourceCoordinates, setSourceCoordinates] =
    useState<Coordinates | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] =
    useState<Coordinates | null>(null);

  const [directionsData, setDirectionsData] = useState<DirectionsData | null>(
    null
  );
  const [carAmount, setCarAmount] = useState<string | null>(null);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  // Get user location with high accuracy
  function fetchUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => console.error("Error fetching user location:", error),
      { enableHighAccuracy: true }
    );
  }

  // Use useMemo to memoize context values
  const userLocationValue = useMemo(
    () => ({ userLocation, setUserLocation }),
    [userLocation]
  );
  const sourceCoordinatesValue = useMemo(
    () => ({ sourceCoordinates, setSourceCoordinates }),
    [sourceCoordinates]
  );
  const destinationCoordinatesValue = useMemo(
    () => ({ destinationCoordinates, setDestinationCoordinates }),
    [destinationCoordinates]
  );
  const directionsDataValue = useMemo(
    () => ({ directionsData, setDirectionsData }),
    [directionsData]
  );
  const carAmountValue = useMemo(
    () => ({ carAmount, setCarAmount }),
    [carAmount]
  );

  return (
    <div>
      {/* Providing context values */}
      <UserLocationContext.Provider value={userLocationValue}>
        <SourceCoordinatesContext.Provider value={sourceCoordinatesValue}>
          <DestinationCoordinatesContext.Provider
            value={destinationCoordinatesValue}
          >
            <DirectionsDataContext.Provider value={directionsDataValue}>
              <SelectedCarAmountContext.Provider value={carAmountValue}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Booking component */}
                  <div>
                    <Booking />
                  </div>
                  {/* Mapbox Map component */}
                  <div className="col-span-2">
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
