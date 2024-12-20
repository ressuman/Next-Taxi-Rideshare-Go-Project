"use client";

import CheckOutForm from "@/components/Payment/check-out-form";
import { convertToSubcurrency } from "@/utils/subCurrency";
import { useUser } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const { user, isLoaded } = useUser();

  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_PUBLISHABLE_KEY!
  );

  // Convert the raw dollar amount to cents using `convertToSubcurrency`
  const stripeAmount = amount
    ? convertToSubcurrency(Number(amount))
    : undefined;

  const displayAmount = amount ? parseFloat(amount).toFixed(2) : "0.00"; // Display in dollars for UI

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: stripeAmount,
    currency: "usd",
  };

  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          Welcome{isLoaded ? ", " : " "}
          {user?.firstName ?? "Valued User"} 👋🏻
        </h1>
        <h2 className="text-2xl">
          has requested <span className="font-bold"> ${displayAmount}</span>
        </h2>
      </div>
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm amount={stripeAmount} />
      </Elements>
    </div>
  );
}
