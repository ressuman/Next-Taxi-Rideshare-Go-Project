"use client";

import { useContext } from "react";
import AutocompleteAddress from "./autocomplete-address";
import Cars from "./cars";
import PaymentCards from "./payment-cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
//import { convertToSubcurrency } from "@/utils/subCurrency";

export default function Booking() {
  const router = useRouter();

  const { carAmount } = useContext(SelectedCarAmountContext) ?? {};

  const handleBookClick = () => {
    if (carAmount) {
      router.push(`/payment?amount=${carAmount}`);
    }
  };

  // const handleBookClick = () => {
  //   if (carAmount) {
  //     // Convert to subcurrency before passing in URL
  //     router.push(`/payment?amount=${convertToSubcurrency(Number(carAmount))}`);
  //   }
  // };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Booking</h2>

      <div
        className="border-[1px] p-5
        rounded-md"
      >
        <AutocompleteAddress />
        <Cars />
        <PaymentCards />
        <button
          type="submit"
          className={`w-full p-1 rounded-md mt-4 ${
            carAmount ? "bg-yellow-400" : "bg-gray-200 cursor-not-allowed"
          }`}
          disabled={!carAmount}
          onClick={handleBookClick}
        >
          Book
        </button>
      </div>
    </div>
  );
}
