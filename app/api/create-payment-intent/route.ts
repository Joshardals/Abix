// Import necessary classes from the "next/server" module for handling HTTP requests and responses.
// NextRequest represents an incoming request, and NextResponse is used to return responses.
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Import the Stripe library and initialize it with the secret key from environment variables.
// This library is used to interact with Stripe's API for payment processing.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Define an asynchronous function to handle POST requests.
// This function is intended to create a payment intent with Stripe.
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request to extract the amount for the payment.
    const { amount } = await request.json();

    // Create a new payment intent using the Stripe API.
    // The payment intent represents a payment that needs to be confirmed.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount to be charged (in the smallest currency unit, e.g., cents)
      currency: "usd", // Currency of the payment
      automatic_payment_methods: { enabled: true }, // Automatically handle payment methods
    });

    // Return a JSON response containing the client secret for the payment intent.
    // The client secret is used on the client side to complete the payment.
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Log any errors to the console for debugging purposes.
    console.error("Internal Server Error:", error);

    // Return a JSON response with an error message and a 500 status code.
    // This indicates an internal server error occurred while processing the request.
    return NextResponse.json(
      { error: `Internal Server Error ${error}` },
      { status: 500 }
    );
  }
}
