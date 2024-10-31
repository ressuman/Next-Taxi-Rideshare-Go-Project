// import { createContext } from "react";

// export const DirectionsDataContext = createContext<any>(null);

import { createContext, Dispatch, SetStateAction } from "react";

interface DirectionStep {
  distance: number;
  instruction: string;
}

interface DirectionsDataContextType {
  directionsData: DirectionStep[];
  setDirectionsData: Dispatch<SetStateAction<DirectionStep[]>>;
}

export const DirectionsDataContext =
  createContext<DirectionsDataContextType | null>(null);
