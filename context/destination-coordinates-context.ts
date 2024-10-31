// import { createContext } from "react";

// export const DestinationCoordinatesContext = createContext<any>(null);

import { createContext, Dispatch, SetStateAction } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface DestinationCoordinatesContextType {
  destinationCoordinates: Coordinates[];
  setDestinationCoordinates: Dispatch<SetStateAction<Coordinates[]>>;
}

export const DestinationCoordinatesContext =
  createContext<DestinationCoordinatesContextType | null>(null);
