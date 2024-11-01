// import { createContext } from "react";

// export const UserLocationContext = createContext(null);

// // import { createContext, Dispatch, SetStateAction } from "react";

// // interface Location {
// //   lat: number;
// //   lng: number;
// // }

// // interface UserLocationContextProps {
// //   userLocation: Location | null;
// //   setUserLocation: Dispatch<SetStateAction<Location | null>>;
// // }

// // export const UserLocationContext =
// //   createContext<UserLocationContextProps | null>(null);

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
