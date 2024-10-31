import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  // const { currency, email, amount, paymentMethodType } = request.body;

  // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: amount,
  //   currency: currency,
  //   payment_method_types: [paymentMethodType],
  //   receipt_email: email,
  // });

  // return {
  //   status: 200,
  //   body: {
  //     client_secret: paymentIntent.client_secret,
  //   },
  // };

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-08-22",
  });
  // const request = await fetch("https://api.stripe.com/v1/payment_intents", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     amount: 100,
  //     currency: "usd",
  //     email: "3Tj5O@example.com",
  //     paymentMethodType: "card",
  //   }),
  // });
  const data: any = await request.json();

  const amount = data.amount;
  //const currency = data.currency;
  //const email = data.email;
  //const paymentMethodType = data.paymentMethodType;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      //currency: currency,
      //payment_method_types: [paymentMethodType],
      //receipt_email: email,
    });

    return NextResponse.json(paymentIntent.client_secret, { success: true });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
