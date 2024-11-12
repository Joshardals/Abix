"use client"; // Indicates that this file should be processed on the client side only

import { Checkout } from "./Checkout"; // Imports the Checkout component from a specific path

import { formatPrice, formatSubCurrency } from "@/lib/utils"; // Imports utility functions to format prices
import { loadStripe } from "@stripe/stripe-js"; // Imports function to load Stripe.js
import { Elements } from "@stripe/react-stripe-js"; // Imports Elements component to integrate Stripe Elements
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Imports hooks from Next.js for routing and path handling
import { useEffect, useRef, useState } from "react"; // Imports React hooks for managing component state and side effects

// Checks if the Stripe public key is defined in environment variables
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined"); // Throws an error if the public key is not defined
}

// Loads Stripe with the public key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutContainer() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full bg-gray">
      {/* Container for total price */}
      <div className="maxCenter mb-4">
        <h2 className="font-bold text-2xl">
          Your Total: {formatPrice(Number(amount))}{" "}
          {/* Displays the formatted price */}
        </h2>
      </div>

      {/* Container for the Stripe Elements checkout form */}
      <div className="w-full max-w-[50rem]">
        <Elements
          stripe={stripePromise} // Passes the Stripe instance to Elements
          options={{
            mode: "payment", // Sets the mode to payment
            amount: formatSubCurrency(Number(amount)), // Sets the amount in cents for Stripe
            currency: "usd", // Sets the currency to USD
          }}
        >
          <Checkout amount={Number(amount)} from={from || ""} to={to || ""} />{" "}
          {/* Renders the Checkout component with event details */}
        </Elements>
      </div>
    </div>
  );
}
