// import { createContext } from "react";

// export const SelectedCarAmountContext = createContext<any>(null);

import { createContext, Dispatch, SetStateAction } from "react";

// Create context with type safety for car amount and its setter
export const SelectedCarAmountContext = createContext<{
  carAmount: string | null;
  setCarAmount: Dispatch<SetStateAction<string | null>>;
} | null>(null);
