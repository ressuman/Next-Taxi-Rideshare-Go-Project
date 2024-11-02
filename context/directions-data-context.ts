import { createContext, Dispatch, SetStateAction } from "react";

// Define the type for geometry
export type GeometryType =
  | "LineString"
  | "Point"
  | "Polygon"
  | "MultiLineString"
  | "MultiPoint"
  | "MultiPolygon";

// Define the type for direction data
export interface DirectionsData {
  distance: number;
  duration: number;
  routes: Array<{
    distance: number;
    duration: number;
    geometry: {
      type: GeometryType;
      coordinates: Array<[number, number]>;
    };
  }>;
}

// Create context with type safety for direction data and the setter function
export const DirectionsDataContext = createContext<{
  directionsData: DirectionsData | null;
  setDirectionsData: Dispatch<SetStateAction<DirectionsData | null>>;
} | null>(null);
