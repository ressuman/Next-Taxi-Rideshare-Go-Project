"use client";

import { convertToSubcurrency } from "@/utils/subCurrency";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export default function CheckOutForm({
  amount,
}: {
  readonly amount: number | undefined;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const paymentAmount = amount ? (amount / 100).toFixed(2) : "0.00"; // Display amount in dollars

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (amount) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to create payment intent.");
          }
          return res.json();
        })
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => setErrorMessage(error.message));
    }
  }, [amount]);

  //const paymentAmount = amount ? (amount / 100).toFixed(2) : "0.00";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();

    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message ?? "An unknown error occurred");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${paymentAmount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message ?? "An unknown error occurred");
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white">
          <output className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </output>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-white rounded-lg shadow-lg p-6"
      >
        {clientSecret && <PaymentElement />}

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-yellow-500 p-2 rounded-lg mt-2 font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay $${paymentAmount}` : "Processing..."}
        </button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </div>
  );
}
