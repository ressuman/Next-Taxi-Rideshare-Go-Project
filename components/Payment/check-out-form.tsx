import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckOutForm() {
  const stripe: any = useStripe();
  const elements: any = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await fetch("/api/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
        email: emailInput,
        amount: 100,
        paymentMethodType: "card",
      }),
    });

    const { client_secret: clientSecret } = await res.json();
    console.log(clientSecret);

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-3">
          <label htmlFor="email-input">Email</label>
          <div>
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              type="email"
              id="email-input"
              placeholder="johndoe@gmail.com"
            />
          </div>
        </div>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full bg-yellow-500 p-2 rounded-lg mt-2"
        >
          Pay
        </button>
        {/* Show error message to your customers */}
        {/* {errorMessage && <div>{errorMessage}</div>} */}
      </form>
    </div>
  );
}
