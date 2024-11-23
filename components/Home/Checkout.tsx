import { useEffect, useState } from "react"; // Import hooks for managing state and side effects
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"; // Import Stripe Elements hooks and components for handling payments
import { formatPrice, formatSubCurrency } from "@/lib/utils"; // Utility functions for formatting price
import { ButtonInput } from "../form/FormInput"; // Custom button component for payment form submission
import { CheckoutSkeleton } from "../ui/CheckoutSkeleton"; // Skeleton loader component to show while loading payment form

// The Checkout component handles the payment process for an event
export function Checkout({
  amount, // The total payment amount
  from,   // The departure location
  to,     // The destination location
}: {
  amount: number;
  from: string;
  to: string;
}) {
  // `useStripe` gives access to the Stripe object for handling payment submission
  const stripe = useStripe();
  // `useElements` gives access to the elements object which is used to manage Stripe Elements
  const elements = useElements();

  // State to manage any error messages returned by Stripe during payment
  const [errorMessage, setErrorMessage] = useState<string>();
  // State to store the client secret needed for confirming the payment
  const [clientSecret, setClientSecret] = useState("");
  // State to manage loading state while payment is being processed
  const [loading, setLoading] = useState(false);

  // `useEffect` is used to fetch the payment intent when the component mounts or when the `amount` changes
  useEffect(() => {
    // Makes a request to the server to create a new payment intent when the amount changes
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Setting content type to JSON
      },
      // Sending the formatted amount to the server
      body: JSON.stringify({ amount: formatSubCurrency(amount) }),
    })
      .then((res) => res.json()) // Waits for the server response in JSON format
      .then((data) => {
        // Sets the client secret received from the server response
        setClientSecret(data.clientSecret);
      });
  }, [amount]); // Re-runs this effect whenever the `amount` changes

  // Handles the form submission when the user attempts to make a payment
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true); // Sets loading state to true to show the loading indicator

    // Checks if Stripe and elements are ready before proceeding
    if (!stripe || !elements) {
      return; // Stops execution if Stripe or elements are not available
    }

    try {
      // Submits the payment details to Stripe for processing
      const { error: submitError } = await elements.submit();

      // Handles any errors that occur during the payment submission
      if (submitError) {
        setErrorMessage(submitError.message); // Sets error message from Stripe
        setLoading(false); // Resets the loading state
        return;
      }

      console.log("Payment submitted successfully, confirming payment...");

      // Confirms the payment with Stripe, passing the client secret and return URL
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // Redirects the user to this URL after payment confirmation
          return_url: `https://abix.vercel.app/home/payment-success?amount=${amount}&from=${from}&to=${to}`,
        },
      });

      // Handles any errors that occur during payment confirmation
      if (error) {
        console.error("Payment Error:", error.message);
        setErrorMessage(error.message); // Sets the error message if payment confirmation fails
      } else {
        console.log("Payment confirmed successfully!"); // Logs successful payment confirmation
      }
    } catch (error: unknown) {
      // Catches any unexpected errors during payment processing
      console.error("Unexpected error during payment:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message); // Sets the error message if an unexpected error occurs
      }
    } finally {
      // Resets loading state after the payment process is complete
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      {/* If the client secret is available, display the payment form */}
      {clientSecret ? (
        <>
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold">
              Route: <span className="text-pretty">{from}</span> ➔{" "}
              <span className="text-pretty">{to}</span>
            </p>
          </div>
          {/* Stripe PaymentElement component to render the payment form */}
          <PaymentElement className="mb-4" />
          <div className="mt-4 flex items-center max-sm:flex-col gap-2">
            {/* Custom button component to complete the payment */}
            <ButtonInput
              label={`Complete Payment: ${formatPrice(amount)}`} // Displays the amount on the button
              loading={loading} // Passes the loading state to show a loading indicator on the button
              variant={"abix"} // Button style variant
            />
          </div>
        </>
      ) : (
        // If the client secret is not yet available, show a skeleton loader
        <CheckoutSkeleton />
      )}

      {/* If there's an error, display the error message */}
      {errorMessage && (
        <div className="text-center text-deepRed text-sm">{errorMessage}</div>
      )}
    </form>
  );
}
