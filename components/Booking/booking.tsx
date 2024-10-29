"use client";

import { useContext } from "react";
import AutocompleteAddress from "./autocomplete-address";
//import AutocompleteAddress from "./autocomplete-address1";
import Cars from "./cars";
import PaymentCards from "./payment-cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";

export default function Booking() {
  //const screenHeight = window.innerHeight * 0.72;

  const router: any = useRouter();

  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>

      <div
        className="border-[1px] p-5
        rounded-md"
        // style={{ height: `${screenHeight}` }}
      >
        {/* <AutocompleteAddress /> */}
        <AutocompleteAddress />
        <Cars />
        <PaymentCards />
        <button
          type="submit"
          className={`w-full bg-yellow-400 p-1 rounded-md
        mt-4 ${!carAmount ? "bg-gray-200" : ""}`}
          //disabled={!carAmount}
          onClick={() => router.push("/payment")}
        >
          Book
        </button>
      </div>
    </div>
  );
}
