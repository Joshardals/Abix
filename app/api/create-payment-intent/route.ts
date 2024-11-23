// Import tools for handling requests and sending responses
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Get Stripe secret key from the environment to talk to Stripe API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// This function handles POST requests, like creating a payment request
export async function POST(request: NextRequest) {
  try {
    // Get the payment amount from the request
    const { amount } = await request.json();

    // Tell Stripe to create a payment request with amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // The amount to charge (in cents)
      currency: "usd", // Using US dollars
      automatic_payment_methods: { enabled: true }, // Let Stripe figure out how to take the payment
    });

    // Send back the "secret key" needed for the client to finish the payment
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Something went wrong, show error in console for debugging
    console.error("Internal Server Error:", error);

    // Send back an error message to the user
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
