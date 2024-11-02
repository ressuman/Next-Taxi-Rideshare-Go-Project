import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for user location coordinates
export interface Location {
  lat: number;
  lng: number;
}

// Create context with type safety for user location and setter function
export const UserLocationContext = createContext<{
  userLocation: Location | null;
  setUserLocation: Dispatch<SetStateAction<Location | null>>;
} | null>(null);
