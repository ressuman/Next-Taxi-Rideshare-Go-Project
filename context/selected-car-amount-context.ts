// import { createContext } from "react";

// export const SelectedCarAmountContext = createContext<any>(null);

import { createContext, Dispatch, SetStateAction } from "react";

interface SelectedCarAmountContextType {
  carAmount: number;
  setCarAmount: Dispatch<SetStateAction<number>>;
}

export const SelectedCarAmountContext =
  createContext<SelectedCarAmountContextType | null>(null);
