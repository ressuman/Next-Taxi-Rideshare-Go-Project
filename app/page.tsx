"use client";

import Booking from "@/components/Booking/booking";
import MapboxMap from "@/components/Map/mapbox-map";
import { UserLocationContext } from "@/context/user-location-context";
import { useEffect, useState } from "react";

interface Location {
  lat: number;
  lng: number;
}

export default function HomePage() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  function getUserLocation(): void {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }

  return (
    <div className="">
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
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
      </UserLocationContext.Provider>
    </div>
  );
}
