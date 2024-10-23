"use client";

import { useScreenHeight } from "@/hooks/useScreenHeight";
import AutocompleteAddress from "./autocomplete-address";

export default function Booking() {
  const screenHeight = useScreenHeight();

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>

      <div
        className="border-[1px] p-5
        rounded-md"
        style={{ height: `${screenHeight}px` }}
      >
        <AutocompleteAddress />
        <button
          type="submit"
          className="w-full bg-yellow-400
        p-1 rounded-md
        mt-4"
        >
          Book
        </button>
      </div>
    </div>
  );
}
