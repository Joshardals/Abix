"use client"; // Indicates that this component will be executed on the client-side (browser).

import { ButtonInput } from "@/components/form/FormInput"; // Imports a custom button component used for user interaction.
import {
  createTicketInfo, // Function to create ticket information in the database.
} from "@/lib/actions/database.action"; // Imports functions that interact with the database.
import { formatPrice } from "@/lib/utils"; // Utility function to format price values.
import Link from "next/link"; // Imports the Link component from Next.js for navigation.
import { useSearchParams } from "next/navigation"; // Hook to access query parameters from the URL.
import { useEffect } from "react"; // Imports useEffect hook for side effects.
import { FaRegCircleCheck } from "react-icons/fa6"; // Imports a checkmark icon from React Icons for visual confirmation.

export default function PaymentSuccess() {
  // Retrieves query parameters from the URL.
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // Extracts the amount from query parameters.
  const from = searchParams.get("from"); // Extracts the event name from query parameters.
  const to = searchParams.get("to");

  useEffect(() => {
    // Function to handle completion of ticket processing after payment.
    const completeTicketProcessing = async () => {
      if (amount && from && to) {
        try {
          // Create ticket information in the database.
          await createTicketInfo({
            from, // Event name from the URL.
            to, // Event ID retrieved from localStorage.
            price: Number(amount), // Convert amount to a number for storage.
          });
        } catch (error) {
          // Logs any unexpected errors that occur during the process.
          console.log(`An unexpected error occurred: ${error}`);
        }
      }
    };

    // Call the function to complete ticket processing.
    completeTicketProcessing();
  }, [amount, from, to]); // Effect depends on amount and eventName; runs when these values change.

  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-4 max-w-[50rem] mx-auto text-center p-5 ">
      {/* Container styles: centers content, adds spacing, limits width, centers text, and adds padding. */}
      <FaRegCircleCheck className="text-green-700 size-10" />{" "}
      {/* Success icon with styling. */}
      <p className="font-semibold text-pretty">
        Payment Successful! 🎉 Thank you for your purchase. <br />
        You have successfully bought a ticket from <b>{from}</b> to <b>{to}</b>{" "}
        for <b>{formatPrice(Number(amount))}</b>. <br />
        We wish you a pleasant journey!
      </p>
      <Link href="/home">
        {/* Navigation button to return to events listing */}
        <ButtonInput variant="abix" label="Back Home" />
      </Link>
    </div>
  );
}
