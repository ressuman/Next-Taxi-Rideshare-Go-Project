// import { createContext } from "react";

// export const UserLocationContext = createContext(null);

import { createContext, Dispatch, SetStateAction } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface UserLocationContextProps {
  userLocation: Location | null;
  setUserLocation: Dispatch<SetStateAction<Location | null>>;
}

export const UserLocationContext =
  createContext<UserLocationContextProps | null>(null);
