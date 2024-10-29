import CheckOutForm from "@/components/Payment/check-out-form";
import { SelectedCarAmountContext } from "@/context/selected-car-amount-context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";

export default function PaymentPage() {
  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const options: any = {
    mode: "payment",
    amount: carAmount,
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm />
    </Elements>
  );
}
