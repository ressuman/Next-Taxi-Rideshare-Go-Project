import { createContext, Dispatch, SetStateAction } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

// Create context with type safety for coordinates and the setter function
export const DestinationCoordinatesContext = createContext<{
  destinationCoordinates: Coordinates | null;
  setDestinationCoordinates: Dispatch<SetStateAction<Coordinates | null>>;
} | null>(null);
