"use client"; // Indicates that this file should be processed on the client side only

import { Checkout } from "./Checkout"; // Imports the Checkout component from the same directory
import { formatPrice, formatSubCurrency } from "@/lib/utils"; // Imports utility functions for formatting prices
import { loadStripe } from "@stripe/stripe-js"; // Imports function to load the Stripe.js library
import { Elements } from "@stripe/react-stripe-js"; // Imports the Elements component to integrate Stripe Elements for secure payment forms
import { useSearchParams } from "next/navigation"; // Imports hook from Next.js for handling URL query parameters

// Checks if the Stripe public key is defined in environment variables
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined"); // Throws an error if the public key is not set
}

// Loads the Stripe.js instance with the public key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutContainer() {
  // Extracts the query parameters from the URL (amount, from, to)
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full bg-gray">
      {/* Container to display the total amount the user needs to pay */}
      <div className="maxCenter mb-4">
        <h2 className="font-bold text-2xl">
          Your Total: {formatPrice(Number(amount))}{" "}
          {/* Formats and displays the total amount using the formatPrice function */}
        </h2>
      </div>

      {/* Container for the Stripe Elements checkout form */}
      <div className="w-full max-w-[50rem]">
        {/* Elements component is used to wrap the Stripe Elements form */}
        <Elements
          stripe={stripePromise} // Passes the loaded Stripe instance to Elements
          options={{
            mode: "payment", // Sets the mode to 'payment' for processing a payment
            amount: formatSubCurrency(Number(amount)), // Converts the amount to sub-currency format (cents)
            currency: "usd", // Specifies the currency to be USD
          }}
        >
          {/* Renders the Checkout component with the necessary payment details */}
          <Checkout amount={Number(amount)} from={from || ""} to={to || ""} />
        </Elements>
      </div>
    </div>
  );
}
