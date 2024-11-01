// import { createContext } from "react";

// export const SourceCoordinatesContext = createContext<any>(null);

import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for source coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

// Create context with type safety for coordinates and the setter function
export const SourceCoordinatesContext = createContext<{
  sourceCoordinates: Coordinates | null;
  setSourceCoordinates: Dispatch<SetStateAction<Coordinates | null>>;
} | null>(null);
