// import { createContext } from "react";

// export const SourceCoordinatesContext = createContext<any>(null);

import { createContext, Dispatch, SetStateAction } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface SourceCoordinatesContextType {
  sourceCoordinates: Coordinates[];
  setSourceCoordinates: Dispatch<SetStateAction<Coordinates[]>>;
}

export const SourceCoordinatesContext =
  createContext<SourceCoordinatesContextType | null>(null);
