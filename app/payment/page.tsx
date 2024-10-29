"use client";

import CheckOutForm from "@/components/Payment/check-out-form";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentPage() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const options: any = {
    mode: "payment",
    amount: 1059,
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm />
    </Elements>
  );
}
